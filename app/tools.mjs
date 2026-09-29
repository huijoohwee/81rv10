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
  if (command.trim() !== capabilities[0].command) throw new Error(`Use ${capabilities[0].command}`);
  return invoke(capabilities[0].name, { dossier: JSON.stringify(dossier) });
}
