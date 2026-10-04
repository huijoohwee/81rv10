import { newDossier, readDossier, summary, ownerLinks } from './contracts.mjs';
export const capabilities = [
  { name: 'drone_dashboard.inspect', description: 'Inspect a supplied local scouting dossier; no device access.',
    inputSchema: { type: 'object', properties: { dossier: { type: 'string', maxLength: 499999 } }, additionalProperties: false },
    command: '/drone.inspect @dashboard #mission' },
  { name: 'drone_dashboard.resolve_owners', description: 'Resolve explicit native-owner links. Does not navigate or execute a program.',
    inputSchema: { type: 'object', required: ['graph', 'documentPath'], properties: {
      graph: { type: 'string', maxLength: 4096 }, game: { type: 'string', maxLength: 4096 }, documentPath: { type: 'string', maxLength: 2048 },
    }, additionalProperties: false }, command: '/drone.owners @dashboard #reuse' },
];
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
  throw new Error('Unsupported capability. Device commands are not exposed.');
}
export function invokeCommand(command, dossier) {
  if (typeof command !== 'string' || command.trim() !== capabilities[0].command) throw new Error(`Use ${capabilities[0].command}`);
  return invoke(capabilities[0].name, { dossier: JSON.stringify(dossier) });
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
