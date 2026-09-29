// Target-owned composition contracts. Owner programs, renderers and path admission remain external.
export const MAX_BYTES = 499999;
export const SCHEMA = 'agentic-drone-dashboard/dossier/v1';
export const points = Object.freeze(Array.from({ length: 6 }, (_, i) => Object.freeze({
  pointId: `P${i + 1}`, rackId: i < 3 ? 'A' : 'B', tierId: (i % 3) + 1,
  reviewState: 'unreviewed', reviewNote: '', capture: null,
})));
export function ownerUrl(value) {
  if (typeof value !== 'string' || value.length > 20000) throw new Error('Owner URL is too long.');
  const url = new URL(value);
  if (url.username || url.password || !['https:', 'http:'].includes(url.protocol)
    || (url.protocol === 'http:' && !['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)))
    throw new Error('Use HTTPS, or an HTTP localhost owner.');
  return url;
}
export function ownerLinks(graph, game, documentPath) {
  const g = ownerUrl(graph), x = game ? ownerUrl(game) : null;
  if (!documentPath || documentPath.length > 2048 || /[\\\x00-\x1f]/u.test(documentPath)
    || documentPath.split('/').some(part => part === '..')) throw new Error('Invalid Graph document path.');
  g.search = ''; g.hash = ''; g.searchParams.set('kgDoc', documentPath.replace(/^\/+/, ''));
  if (x) { x.search = '?drone=1'; x.hash = ''; }
  return { graph: g.href, game: x?.href || null };
}
export function replayUrl(value, graph) {
  const url = ownerUrl(value), owner = ownerUrl(graph);
  if (url.origin !== owner.origin || url.pathname !== owner.pathname
    || [...url.searchParams.keys()].join(',') !== 'kgLearningCanvas'
    || url.searchParams.get('kgLearningCanvas') !== 'drone'
    || !/^#flight=[A-Za-z0-9_-]{1,16000}$/u.test(url.hash))
    throw new Error('Paste the Canvas snapshot link exported by this Graph owner.');
  return url.href;
}
export async function digest(bytes) {
  return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', bytes)), b => b.toString(16).padStart(2, '0')).join('');
}
export async function inspectPath(bytes) {
  if (!(bytes instanceof Uint8Array) || bytes.byteLength > MAX_BYTES) throw new Error('Path must be smaller than 500 kB.');
  const raw = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  const v = JSON.parse(raw);
  if (!v || !['agentic-drone-flight-path/v1', 'agentic-drone-flight-path/v2'].includes(v.schema)
    || v.model !== 'kinematic' || v.physicalAircraft !== false || v.tickRate !== 60
    || v.coordinateFrame !== 'local-xz-altitude-m-heading-deg'
    || ![v.sourceDigest, v.sceneDigest].every(d => typeof d === 'string' && /^[a-f0-9]{64}$/u.test(d))
    || !Array.isArray(v.samples) || v.samples.length < 2 || v.samples.length > 7201)
    throw new Error('Expected a Graph simulated flight-path export.');
  // Metadata only: the Graph/GameXR owners validate samples before rendering or running.
  return { schema: v.schema, byteLength: bytes.byteLength, sha256: await digest(bytes),
    sourceDigest: v.sourceDigest, sceneDigest: v.sceneDigest, sampleCount: v.samples.length,
    validation: 'metadata-only; owner admission required', physicalAircraft: false };
}
export function newDossier() {
  return { schema: SCHEMA, missionId: 'rack-scout-fixture-01', environment: 'planning-fixture',
    physicalAircraft: false, calibration: null, path: null, receiverReceipt: null,
    points: points.map(p => ({ ...p })) };
}
export function readDossier(text) {
  if (new TextEncoder().encode(text).byteLength > MAX_BYTES) throw new Error('Dossier must be smaller than 500 kB.');
  const value = JSON.parse(text);
  const keys = 'calibration,environment,missionId,path,physicalAircraft,points,receiverReceipt,schema';
  if (!value || Object.keys(value).sort().join(',') !== keys || value.schema !== SCHEMA
    || value.missionId !== 'rack-scout-fixture-01' || value.environment !== 'planning-fixture'
    || value.physicalAircraft !== false || value.calibration !== null || value.receiverReceipt !== null
    || !Array.isArray(value.points) || value.points.length !== 6) throw new Error('Unsupported dossier.');
  if (value.path !== null) {
    const p = value.path;
    if (!p || Object.keys(p).sort().join(',') !== 'byteLength,physicalAircraft,sampleCount,sceneDigest,schema,sha256,sourceDigest,validation'
      || !['agentic-drone-flight-path/v1', 'agentic-drone-flight-path/v2'].includes(p.schema)
      || ![p.sha256, p.sourceDigest, p.sceneDigest].every(d => typeof d === 'string' && /^[a-f0-9]{64}$/u.test(d))
      || !Number.isInteger(p.byteLength) || p.byteLength < 1 || p.byteLength > MAX_BYTES
      || !Number.isInteger(p.sampleCount) || p.sampleCount < 2 || p.sampleCount > 7201
      || p.physicalAircraft !== false || p.validation !== 'metadata-only; owner admission required') throw new Error('Invalid path identity.');
  }
  value.points.forEach((p, i) => {
    if (!p || Object.keys(p).sort().join(',') !== 'capture,pointId,rackId,reviewNote,reviewState,tierId'
      || p.pointId !== points[i].pointId || p.rackId !== points[i].rackId || p.tierId !== points[i].tierId
      || !['unreviewed', 'clear', 'follow-up'].includes(p.reviewState)
      || typeof p.reviewNote !== 'string' || p.reviewNote.length > 1000) throw new Error('Invalid inspection point.');
    if (p.capture !== null) {
      const c = p.capture;
      if (!c || Object.keys(c).sort().join(',') !== 'byteLength,mediaType,name,provenance,sha256'
        || typeof c.name !== 'string' || c.name.length > 160 || !/^[a-f0-9]{64}$/u.test(c.sha256)
        || !Number.isInteger(c.byteLength) || c.byteLength < 1 || c.byteLength > MAX_BYTES
        || !['image/png', 'image/jpeg', 'image/webp'].includes(c.mediaType)
        || !['synthetic-fixture', 'operator-import; capture-unverified'].includes(c.provenance)) throw new Error('Invalid capture reference.');
    }
    if (p.reviewState !== 'unreviewed' && !p.capture) throw new Error('Review requires an attached capture reference.');
  });
  return value;
}
export function summary(dossier) {
  return { missionId: dossier.missionId, points: 6, attachments: dossier.points.filter(p => p.capture).length,
    reviewed: dossier.points.filter(p => p.capture && p.reviewState !== 'unreviewed').length,
    followUp: dossier.points.filter(p => p.reviewState === 'follow-up').length,
    physicalAircraft: false, receiver: 'unobserved', calibration: 'unmeasured' };
}
