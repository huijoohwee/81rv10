import { capabilities, invoke } from './app/tools.mjs';
// MCP JSON-RPC newline transport; no child processes, browser access or device commands.
export function handle(message) {
  if (message.jsonrpc !== '2.0' || typeof message.method !== 'string') throw new Error('Invalid request.');
  if (message.id === undefined) return null;
  const result = value => ({ jsonrpc: '2.0', id: message.id, result: value });
  if (message.method === 'initialize') return result({ protocolVersion: '2024-11-05',
    capabilities: { tools: {} }, serverInfo: { name: 'agentic-drone-dashboard', version: '0.1.0' } });
  if (message.method === 'ping') return result({});
  if (message.method === 'tools/list') return result({ tools: capabilities.map(({ command, ...tool }) => ({ ...tool, annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false } })) });
  if (message.method === 'tools/call') {
    try { return result({ content: [{ type: 'text', text: JSON.stringify(invoke(message.params?.name, message.params?.arguments)) }] }); }
    catch (error) { return result({ isError: true, content: [{ type: 'text', text: error.message }] }); }
  }
  return { jsonrpc: '2.0', id: message.id, error: { code: -32601, message: 'Method not found' } };
}
if (process.argv[1] === new URL(import.meta.url).pathname) {
  let pending = Buffer.alloc(0);
  process.stdin.on('data', chunk => {
    pending = Buffer.concat([pending, chunk]);
    let end;
    while ((end = pending.indexOf(10)) >= 0) {
      const line = pending.subarray(0, end); pending = pending.subarray(end + 1);
      if (line.byteLength > 500000) { process.stderr.write('Request too large\n'); process.exit(1); }
      try { const response = handle(JSON.parse(line.toString('utf8'))); if (response) process.stdout.write(JSON.stringify(response) + '\n'); }
      catch { process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Invalid JSON-RPC request' } }) + '\n'); }
    }
    if (pending.byteLength > 500000) { process.stderr.write('Request too large\n'); process.exit(1); }
  });
}
