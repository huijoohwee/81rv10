import { newDossier, readDossier, summary, ownerLinks } from './contracts.mjs';
import evidenceProfile from './profiles/aviation-v1.json' with { type: 'json' };
const bundleLimit = evidenceProfile.limits.maxPackBytes;
export const capabilities = [
  { name: 'drone_dashboard.inspect', description: 'Inspect a supplied local scouting dossier; no device access.',
    inputSchema: { type: 'object', properties: { dossier: { type: 'string', maxLength: 499999 } }, additionalProperties: false },
    command: '/drone.inspect @dashboard #mission' },
  { name: 'drone_dashboard.resolve_owners', description: 'Resolve explicit native-owner links. Does not navigate or execute a program.',
    inputSchema: { type: 'object', required: ['graph', 'documentPath'], properties: {
      graph: { type: 'string', maxLength: 4096 }, game: { type: 'string', maxLength: 4096 }, documentPath: { type: 'string', maxLength: 2048 },
    }, additionalProperties: false }, command: '/drone.owners @dashboard #reuse' },
  { name: 'aviation.inspect', description: 'Inspect a supplied permitted evidence bundle. No enrichment or operational advice.',
    inputSchema: { type: 'object', required: ['bundle'], properties: {
      bundle: { type: 'string', maxLength: bundleLimit },
    }, additionalProperties: false }, command: '/aviation.inspect @evidence #flight' },
  { name: 'aviation.replay', description: 'Read a flight record at an explicit UTC time without interpolation or external calls.',
    inputSchema: { type: 'object', required: ['bundle', 'flightId', 'atUtc'], properties: {
      bundle: { type: 'string', maxLength: bundleLimit }, flightId: { type: 'string', minLength: 1, maxLength: 128 },
      atUtc: { type: 'string', minLength: 1, maxLength: 32 },
    }, additionalProperties: false }, command: '/aviation.replay @evidence #flight' },
  { name: 'aviation.source', description: 'Inspect the exact retained source and resolved original record for one fact.',
    inputSchema: { type: 'object', required: ['bundle', 'factId'], properties: {
      bundle: { type: 'string', maxLength: bundleLimit }, factId: { type: 'string', minLength: 1, maxLength: 128 },
    }, additionalProperties: false }, command: '/aviation.source @evidence #fact' },
  { name: 'volume.project', description: 'Project a supplied structured volume at an explicit UTC time and compatible vertical reference.',
    inputSchema: { type: 'object', required: ['bundle', 'entityId', 'atUtc'], properties: {
      bundle: { type: 'string', maxLength: bundleLimit }, entityId: { type: 'string', minLength: 1, maxLength: 128 },
      atUtc: { type: 'string', minLength: 1, maxLength: 32 },
    }, additionalProperties: false }, command: '/volume.project @evidence #volume' },
];
async function readEvidence(name, args, bytes) {
  const { admit, inspect, sourceEvidence } = await import('./evidence-kernel.mjs');
  if (name === 'volume.project') {
    const [{ default: profile }, { default: view }, { projectVolume }] = await Promise.all([
      import('./profiles/volume-v1.json', { with: { type: 'json' } }),
      import('./profiles/volume-view.json', { with: { type: 'json' } }), import('./volume-project.mjs'),
    ]);
    return projectVolume(await admit(bytes, profile), args.entityId, args.atUtc, view);
  }
  const admitted = await admit(bytes, evidenceProfile);
  if (name === 'aviation.inspect') return inspect(admitted);
  if (name === 'aviation.source') return sourceEvidence(admitted, args.factId);
  const { replay } = await import('./evidence-replay.mjs');
  return replay(admitted, args.flightId, args.atUtc);
}
export function invoke(name, args = {}) {
  if (!args || typeof args !== 'object' || Array.isArray(args)) throw new Error('Arguments must be an object.');
  if (name === capabilities[0].name) {
    if (Object.keys(args).some(k => k !== 'dossier') || (args.dossier !== undefined && typeof args.dossier !== 'string')) throw new Error('Unsupported inspection arguments.');
    return summary(args.dossier === undefined ? newDossier() : readDossier(args.dossier));
  }
  if (name === capabilities[1].name) {
    if (Object.keys(args).some(k => !['graph', 'game', 'documentPath'].includes(k))) throw new Error('Unsupported owner arguments.');
    return ownerLinks(args.graph, args.game, args.documentPath);
  }
  const schema = capabilities.find(tool => tool.name === name)?.inputSchema;
  if (schema?.properties.bundle) {
    if (Object.keys(args).some(key => !Object.hasOwn(schema.properties, key))
      || schema.required.some(key => !Object.hasOwn(args, key))
      || Object.entries(args).some(([key, value]) => typeof value !== 'string'
        || value.length > schema.properties[key].maxLength
        || (schema.properties[key].minLength && !value.trim())))
      throw new Error('Unsupported evidence arguments. Supply a bounded bundle and the declared query.');
    const owned = { ...args }, bytes = new TextEncoder().encode(owned.bundle);
    if (bytes.byteLength > bundleLimit || new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(bytes) !== owned.bundle)
      throw new Error('Bundle must contain bounded valid Unicode text without replacement.');
    return readEvidence(name, owned, bytes);
  }
  throw new Error('Unsupported capability. Device commands are not exposed.');
}
export function invokeCommand(command, context) {
  if (typeof command !== 'string') throw new Error('Command must be a string.');
  const tool = capabilities.find(candidate => candidate.command === command.trim());
  if (!tool || tool.name === 'drone_dashboard.resolve_owners') throw new Error('Unsupported command. Use a declared inspection or replay alias.');
  if (tool.name === 'drone_dashboard.inspect') return invoke(tool.name, { dossier: JSON.stringify(context) });
  const allowed = tool.name.startsWith('aviation.') ? ['bundle', 'flightId', 'atUtc', 'factId'] : ['bundle', 'entityId', 'atUtc'];
  if (!context || typeof context !== 'object' || Array.isArray(context)
    || Object.keys(context).some(key => !allowed.includes(key))) throw new Error('Unsupported evidence context.');
  return invoke(tool.name, Object.fromEntries(tool.inputSchema.required.map(key => [key, context[key]])));
}

export async function registerBrowserTools(modelContext, { resolveArgs = (_name, args) => args, report = () => {} } = {}) {
  const totalCount = capabilities.length;
  if (typeof modelContext?.registerTool !== 'function') {
    report('WebMCP unavailable in this browser. Use the visible read-only command, local CLI or stdio MCP adapter.');
    return { status: 'unavailable', registeredCount: 0, totalCount };
  }
  let registeredCount = 0;
  try {
    for (const { command, ...tool } of capabilities) {
      await modelContext.registerTool({ ...tool,
        annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false },
        execute: async args => {
          const input = await resolveArgs(tool.name, args);
          const result = await invoke(tool.name, input);
          return { content: [{ type: 'text', text: JSON.stringify(result) }] };
        },
      });
      registeredCount += 1;
    }
  } catch (error) {
    report(`WebMCP registration failed after ${registeredCount} of ${totalCount} tools: ${error instanceof Error ? error.message : String(error)}. Use the visible read-only command instead.`);
    return { status: registeredCount ? 'partial' : 'failed', registeredCount, totalCount };
  }
  report(`Read-only WebMCP tools registered (${registeredCount}/${totalCount}). The same tools are available through the command forms and local MCP adapter.`);
  return { status: 'registered', registeredCount, totalCount };
}
