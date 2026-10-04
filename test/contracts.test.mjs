import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { newDossier, readDossier, summary, inspectPath, ownerLinks, replayUrl, MAX_BYTES } from '../app/contracts.mjs';
import { invoke, invokeCommand } from '../app/tools.mjs';
import { handle } from '../mcp.mjs';
import { server } from '../server.mjs';
const fixture = { schema: 'agentic-drone-flight-path/v1', model: 'kinematic', physicalAircraft: false,
  tickRate: 60, coordinateFrame: 'local-xz-altitude-m-heading-deg', sourceDigest: 'a'.repeat(64), sceneDigest: 'b'.repeat(64), samples: [[0, 0, 0, 0, 0], [1, 0, 0, 0, 0]] };
const bytes = s => new TextEncoder().encode(s);
test('portable dossier roundtrips without manufacturing observations', () => {
  const d = newDossier(), restored = readDossier(JSON.stringify(d));
  assert.deepEqual(restored, d); assert.deepEqual(summary(d), { missionId: 'rack-scout-fixture-01', points: 6, attachments: 0, reviewed: 0, followUp: 0, physicalAircraft: false, receiver: 'unobserved', calibration: 'unmeasured' });
});
test('dossier rejects fake receiver, physical state, point aliases and unsupported evidence', () => {
  for (const mutate of [d => d.receiverReceipt = { accepted: true }, d => d.physicalAircraft = true,
    d => d.points[0].pointId = 'P2', d => d.points[0].reviewState = 'clear',
    d => d.points[0].reviewNote = 'a'.repeat(1001), d => d.calibration = { metres: 1 }, d => d.admin = true]) {
    const d = newDossier(); mutate(d); assert.throws(() => readDossier(JSON.stringify(d)));
  }
});
test('operator review retains unverified provenance and no device claim', () => {
  const d = newDossier(); d.points[0].capture = { name: '<script>.png', byteLength: 100, mediaType: 'image/png', sha256: 'c'.repeat(64), provenance: 'operator-import; capture-unverified' };
  d.points[0].reviewState = 'follow-up'; d.points[0].reviewNote = 'Needs another image.';
  assert.equal(summary(readDossier(JSON.stringify(d))).followUp, 1);
  d.points[0].capture.provenance = 'measured-onboard'; assert.throws(() => readDossier(JSON.stringify(d)));
});
test('flight metadata identity is byte-exact and explicitly not owner admission', async () => {
  const text = JSON.stringify(fixture), a = await inspectPath(bytes(text)), b = await inspectPath(bytes(text + '\n'));
  assert.notEqual(a.sha256, b.sha256); assert.equal(a.sourceDigest, b.sourceDigest);
  assert.equal(a.validation, 'metadata-only; owner admission required');
  const d = newDossier(); d.path = a; assert.deepEqual(readDossier(JSON.stringify(d)).path, a);
});
test('unknown, physical and oversized flight metadata fail', async () => {
  for (const value of [{ ...fixture, physicalAircraft: true }, { ...fixture, schema: 'drone/v999' }, { ...fixture, sourceDigest: 'unknown' }, { ...fixture, samples: [] }]) await assert.rejects(inspectPath(bytes(JSON.stringify(value))));
  await assert.rejects(inspectPath(new Uint8Array(MAX_BYTES + 1)));
  await assert.rejects(inspectPath(new Uint8Array([255])));
});
test('owner links discard query credentials; reject traversal and active URL schemes', () => {
  const links = ownerLinks('http://127.0.0.1:4198/?token=secret#state', 'https://local.example/gamexr/?pair=secret', 'docs/route.py');
  assert.equal(links.graph, 'http://127.0.0.1:4198/?kgDoc=docs%2Froute.py');
  assert.equal(links.game, 'https://local.example/gamexr/?drone=1');
  for (const bad of ['javascript:alert(1)', 'file:///etc/passwd', 'https://name:pass@example.org', 'http://public.example']) assert.throws(() => ownerLinks(bad, null, 'docs/a.py'));
  for (const path of ['../private', 'docs/../secret', 'x\\y', '']) assert.throws(() => ownerLinks('http://localhost/', null, path));
});
test('replay admission binds exact origin, base path and owner query', () => {
  assert.equal(replayUrl('http://localhost:4198/?kgLearningCanvas=drone#flight=abc_1', 'http://localhost:4198/'), 'http://localhost:4198/?kgLearningCanvas=drone#flight=abc_1');
  for (const bad of ['https://evil.example/?kgLearningCanvas=drone#flight=abc', 'http://localhost:4198/other?kgLearningCanvas=drone#flight=abc', 'http://localhost:4198/?kgLearningCanvas=drone&run=1#flight=abc', 'http://localhost:4198/?kgLearningCanvas=drone#flight=']) assert.throws(() => replayUrl(bad, 'http://localhost:4198/'));
});
test('invocation parity and mutation refusal', () => {
  assert.deepEqual(invokeCommand('/drone.inspect @dashboard #mission', newDossier()), invoke('drone_dashboard.inspect'));
  assert.throws(() => invoke('gamexr.control_runtime', { throttle: 1 }));
  assert.throws(() => invoke('drone_dashboard.inspect', { arm: true }));
  assert.throws(() => invokeCommand('/drone.run @dashboard #mission', newDossier()));
});
test('MCP read-only discovery, structured errors and actual stdio transport', () => {
  const list = handle({ jsonrpc: '2.0', id: 1, method: 'tools/list' });
  assert.deepEqual(list.result.tools.map(t => t.name), ['drone_dashboard.inspect', 'drone_dashboard.resolve_owners']);
  assert.ok(list.result.tools.every(t => t.annotations.readOnlyHint));
  assert.equal(handle({ jsonrpc: '2.0', id: 2, method: 'tools/call', params: { name: 'arm' } }).result.isError, true);
  assert.equal(handle({ jsonrpc: '2.0', method: 'notifications/initialized' }), null);
  const child = spawnSync(process.execPath, ['mcp.mjs'], { cwd: new URL('..', import.meta.url), encoding: 'utf8', input: JSON.stringify({ jsonrpc: '2.0', id: 3, method: 'initialize', params: { protocolVersion: '2024-11-05' } }) + '\n' });
  assert.equal(child.status, 0); assert.equal(JSON.parse(child.stdout).result.serverInfo.name, 'agentic-drone-dashboard');
});
test('local server serves only the public shell and refuses writes', async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    const page = await fetch(base); assert.equal(page.status, 200); assert.match(await page.text(), /Agentic Drone Dashboard/);
    assert.equal((await fetch(base + '/package.json')).status, 404);
    assert.equal((await fetch(base + '/..%2fpackage.json')).status, 404);
    assert.equal((await fetch(base, { method: 'POST', body: 'arm' })).status, 405);
    assert.match(page.headers.get('content-security-policy'), /object-src 'none'/);
  } finally { await new Promise(resolve => server.close(resolve)); }
});
