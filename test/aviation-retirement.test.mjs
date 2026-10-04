import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import { capabilities, invoke, invokeCommand, registerBrowserTools } from '../app/tools.mjs';
import { newDossier, summary } from '../app/contracts.mjs';
import { server } from '../server.mjs';

const read = path => readFile(new URL('../' + path, import.meta.url), 'utf8');
const names = ['drone_dashboard.inspect', 'drone_dashboard.resolve_owners'];

test('retired aviation surfaces and dependencies are absent while drone controls and tools remain', async () => {
  const html = await read('app/index.html'), controller = await read('app/app.mjs');
  assert.match(html, /<title>Agentic Drone Dashboard · Rack scout<\/title>/);
  assert.doesNotMatch(html, /(?:evidence|volume|analysis|native)-workspace|<iframe\b|flight-sim-demo/);
  assert.doesNotMatch(controller, /evidence-kernel|evidence-view|volume-view|analysis-view|workspaceConnections|flight-sim-demo/);
  for (const name of ['native-frame', 'load-surface', 'close-surface', 'export-dossier', 'points', 'offline-remove']) {
    assert.ok(html.includes(`id="${name}"`), name);
  }
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/gu)].map(match => match[1]));
  for (const [, id] of controller.matchAll(/\$\('([^']+)'\)/gu)) assert.ok(ids.has(id), `Controller references missing ${id}`);
  const files = (await readdir(new URL('../app/', import.meta.url), { withFileTypes: true }))
    .filter(entry => entry.isFile()).map(entry => entry.name).sort();
  assert.deepEqual(files, ['app.mjs', 'contracts.mjs', 'index.html', 'style.css', 'sw.mjs', 'tools.mjs']);
  for (const name of ['app.mjs', 'contracts.mjs', 'tools.mjs']) {
    for (const [, dependency] of (await read('app/' + name)).matchAll(/(?:from\s+|import\()['"]([^'"]+)['"]/gu)) {
      assert.match(dependency, /^\.\//u, `Unexpected runtime dependency: ${dependency}`);
    }
  }
  assert.deepEqual(capabilities.map(tool => tool.name), names);
  assert.deepEqual(invokeCommand('/drone.inspect @dashboard #mission', newDossier()), summary(newDossier()));
  for (const tool of ['aviation.inspect', 'aviation.replay', 'aviation.source', 'volume.project', 'arrival.evaluate', 'route.benchmark', 'notice.triage']) {
    assert.throws(() => invoke(tool, {}), /Unsupported capability/);
  }
  const registered = [];
  await registerBrowserTools({ registerTool: tool => registered.push(tool) });
  assert.deepEqual(registered.map(tool => tool.name), names);
  const result = await registered[0].execute({});
  assert.deepEqual(JSON.parse(result.content[0].text), summary(newDossier()));
  assert.equal(JSON.parse(await read('package.json')).scripts.evidence, undefined);
});

test('retired modules, profiles and examples cannot be served by the drone shell', async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    for (const path of ['/evidence-kernel.mjs', '/evidence-view.mjs', '/volume-project.mjs', '/volume-view.mjs',
      '/analysis-view.mjs', '/arrival-analysis.mjs', '/route-benchmark.mjs', '/notice-triage.mjs',
      '/profiles/aviation-v1.json', '/profiles/workspaces.json', '/profiles/analysis-workspaces.json',
      '/fixtures/aviation-singapore-v1.json', '/fixtures/volume-singapore-synthetic-v1.json',
      '/fixtures/route-singapore-synthetic-v1.json', '/fixtures/notice-singapore-synthetic-v1.json']) {
      assert.equal((await fetch(base + path)).status, 404, path);
    }
    assert.match(await (await fetch(base)).text(), /id="export-dossier"/);
    assert.equal((await fetch(base + '/tools.mjs')).status, 200);
  } finally { await new Promise(resolve => server.close(resolve)); }
});

test('drone-only worker caches no retired assets and removes only obsolete shell caches', async () => {
  const events = {}, deleted = [], assets = [];
  let claimed = false;
  runInNewContext(await read('app/sw.mjs'), {
    URL, self: { location: new URL('http://localhost:4199/sw.mjs'), skipWaiting: async () => {},
      clients: { claim: async () => { claimed = true; } }, addEventListener: (name, listener) => { events[name] = listener; } },
    caches: { open: async () => ({ addAll: async paths => { assets.push(...paths); } }),
      keys: async () => ['unrelated-cache', 'drone-dashboard-shell-v0.3.3-evidence', 'drone-dashboard-shell-v0.3.4-evidence', 'drone-dashboard-shell-v0.3.4-drone-only'],
      delete: async name => { deleted.push(name); return true; } },
    fetch: () => { throw new Error('No external fetch during cache preparation.'); },
  });
  let pending;
  events.install({ waitUntil: task => { pending = task; } }); await pending;
  assert.deepEqual(assets, ['./', './index.html', './style.css', './app.mjs', './contracts.mjs', './tools.mjs']);
  events.activate({ waitUntil: task => { pending = task; } }); await pending;
  assert.equal(claimed, true);
  assert.deepEqual(deleted, ['drone-dashboard-shell-v0.3.3-evidence', 'drone-dashboard-shell-v0.3.4-evidence']);
  events.fetch({ request: { method: 'GET', url: 'http://localhost:4199/evidence-kernel.mjs' },
    respondWith: () => assert.fail('Retired resources must not be answered from an old cache.') });
});
