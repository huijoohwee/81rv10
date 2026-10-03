import { fileURLToPath } from 'node:url';
import { capabilities, invoke } from './app/tools.mjs';

export const PROTOCOL_VERSION = '2024-11-05';
// Six-byte JSON escapes for every permitted pack byte, plus bounded query metadata.
export const MAX_REQUEST_BYTES = 12010000;
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const only = (value, keys) => object(value) && Object.keys(value).every(key => keys.includes(key));
const fault = (id, code, message) => ({ jsonrpc: '2.0', id, error: { code, message } });
const toolResult = value => ({ content: [{ type: 'text', text: JSON.stringify(value) }] });
const errorResult = error => ({ error: { code: error.code || 'TOOL_ERROR', message: error.message, path: error.path || '' } });
const toolError = error => ({ isError: true, ...toolResult(errorResult(error)) });

// One shared dispatcher; synchronous drone calls remain synchronous for existing consumers.
export function handle(message) {
  if (!only(message, ['jsonrpc', 'id', 'method', 'params']) || message.jsonrpc !== '2.0'
    || typeof message.method !== 'string' || message.method.length > 128
    || (message.id !== undefined && message.id !== null && typeof message.id !== 'string' && typeof message.id !== 'number')
    || (typeof message.id === 'number' && !Number.isFinite(message.id))
    || (typeof message.id === 'string' && message.id.length > 128)
    || (message.params !== undefined && !object(message.params))) return fault(null, -32600, 'Invalid request.');
  if (message.id === undefined) return null;
  const result = value => ({ jsonrpc: '2.0', id: message.id, result: value });
  const params = message.params ?? {};
  if (message.method === 'initialize') {
    if (!only(params, ['protocolVersion', 'capabilities', 'clientInfo']) || params.protocolVersion !== PROTOCOL_VERSION
      || (params.capabilities !== undefined && !object(params.capabilities))
      || (params.clientInfo !== undefined && (!only(params.clientInfo, ['name', 'version'])
        || !['name', 'version'].every(key => typeof params.clientInfo[key] === 'string' && params.clientInfo[key].length <= 128))))
      return fault(message.id, -32602, `Supported protocolVersion: ${PROTOCOL_VERSION}.`);
    return result({ protocolVersion: PROTOCOL_VERSION, capabilities: { tools: {} },
      serverInfo: { name: 'agentic-drone-dashboard', version: '0.3.0' } });
  }
  if (message.method === 'ping' || message.method === 'tools/list') {
    if (Object.keys(params).length) return fault(message.id, -32602, 'Unsupported parameters.');
    return result(message.method === 'ping' ? {} : { tools: capabilities.map(({ command, ...tool }) => ({ ...tool,
      annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false } })) });
  }
  if (message.method === 'tools/call') {
    if (!only(params, ['name', 'arguments']) || typeof params.name !== 'string' || params.name.length > 128
      || (params.arguments !== undefined && !object(params.arguments))) return fault(message.id, -32602, 'Invalid tool call.');
    try {
      const value = invoke(params.name, params.arguments);
      return value?.then ? value.then(output => result(toolResult(output)), error => result(toolError(error))) : result(toolResult(value));
    } catch (error) { return result(toolError(error)); }
  }
  return fault(message.id, -32601, 'Method not found');
}

export async function invokeEnvelope(envelope) {
  if (!only(envelope, ['name', 'arguments']) || typeof envelope.name !== 'string' || envelope.name.length > 128
    || !object(envelope.arguments)) throw new Error('Expected {name, arguments} for one declared read tool.');
  return await invoke(envelope.name, envelope.arguments);
}
const parse = bytes => JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
async function write(value) {
  const { canonicalJson } = await import('./app/evidence-kernel.mjs');
  const text = canonicalJson(value) + '\n';
  if (!process.stdout.write(text)) await new Promise(resolve => process.stdout.once('drain', resolve));
}
async function runCli() {
  const chunks = []; let length = 0;
  for await (const chunk of process.stdin) {
    length += chunk.byteLength;
    if (length > MAX_REQUEST_BYTES) throw new Error('Request too large.');
    chunks.push(chunk);
  }
  await write(await invokeEnvelope(parse(Buffer.concat(chunks, length))));
}
async function runMcp() {
  let chunks = [], length = 0;
  for await (const chunk of process.stdin) {
    let offset = 0;
    while (offset < chunk.byteLength) {
      const end = chunk.indexOf(10, offset);
      const piece = chunk.subarray(offset, end < 0 ? chunk.byteLength : end);
      length += piece.byteLength;
      if (length > MAX_REQUEST_BYTES) throw new Error('Request too large.');
      chunks.push(piece);
      if (end < 0) break;
      const line = Buffer.concat(chunks, length); chunks = []; length = 0; offset = end + 1;
      let message;
      try { message = parse(line); }
      catch { await write(fault(null, -32700, 'Invalid JSON-RPC request')); continue; }
      const response = await handle(message);
      if (response) await write(response);
    }
  }
  if (length) throw new Error('MCP messages must end with a newline.');
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv.length > 3 || (process.argv[2] !== undefined && process.argv[2] !== '--invoke')) throw new Error('Use --invoke or newline MCP stdin.');
    await (process.argv[2] === '--invoke' ? runCli() : runMcp());
  } catch (error) { process.stderr.write(JSON.stringify(errorResult(error)) + '\n'); process.exitCode = 1; }
}
