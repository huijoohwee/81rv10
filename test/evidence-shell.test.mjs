import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { runInNewContext } from 'node:vm';

const read = name => readFile(new URL('../' + name, import.meta.url), 'utf8');
test('evidence modules and complete served assets respect the admitted budgets', async () => {
  const names = (await readdir(new URL('../app/', import.meta.url))).filter(name => name.endsWith('.mjs'));
  let bytes = 0, baselineBytes = 0;
  for (const name of names) {
    const source = await read('app/' + name); bytes += Buffer.byteLength(source);
    assert.ok(source.split('\n').length < 600, name);
    assert.ok(Buffer.byteLength(source) < 500000, name);
    try { baselineBytes += execFileSync('git', ['show', '438038865fd25c9d2a07ff50fcb75e2666e08b7c:app/' + name], { stdio: ['ignore', 'pipe', 'ignore'] }).length; } catch { /* New module. */ }
  }
  assert.deepEqual(names.filter(name => name.startsWith('evidence-')).sort(), ['evidence-kernel.mjs', 'evidence-replay.mjs', 'evidence-view.mjs']);
  assert.ok(bytes - baselineBytes <= 75000, `Added JS ${bytes - baselineBytes}`);
  console.log(JSON.stringify({ servedJavaScriptBytes: bytes, baselineBytes, addedJavaScriptBytes: bytes - baselineBytes, newProductModules: 3 }));
});
test('offline shell caches every local module and authored input without external resources', async () => {
  const source = await read('app/sw.mjs');
  const assets = [...source.matchAll(/'\.\/([^']*)'/gu)].map(match => match[1]);
  for (const name of ['evidence-kernel.mjs', 'evidence-replay.mjs', 'evidence-view.mjs', 'profiles/aviation-v1.json', 'profiles/workspaces.json', 'fixtures/aviation-synthetic-v1.json']) assert.ok(assets.includes(name), name);
  const config = JSON.parse(await read('app/profiles/workspaces.json'));
  for (const example of config.evidence.examples) {
    assert.match(example.path, /^\.\/fixtures\/[a-z0-9-]+\.json$/u);
    assert.ok(assets.includes(example.path.slice(2)), `Offline example missing: ${example.path}`);
  }
  for (const name of assets.filter(Boolean)) assert.ok(Buffer.byteLength(await read('app/' + name)) < 500000, name);
  for (const name of ['evidence-kernel.mjs', 'evidence-replay.mjs']) {
    const module = await read('app/' + name);
    assert.doesNotMatch(module, /\b(fetch|XMLHttpRequest|WebSocket|localStorage|indexedDB)\b|Date\.now|Math\.random/);
  }
});
test('native workspace connection is authored and preserves exact existing document ownership', async () => {
  const config = JSON.parse(await read('app/profiles/workspaces.json'));
  assert.equal(config.native.documentPath, 'docs/workspace-seeds/agentic-graph-game-flight-sim-demo.md');
  assert.deepEqual(config.native.parameters, { kgPreview: '1', kgLiveHero: '1' });
  const kernel = await read('app/evidence-kernel.mjs'), replay = await read('app/evidence-replay.mjs'), view = await read('app/evidence-view.mjs');
  assert.doesNotMatch(kernel + replay, /4213|Singapore|Flight Sim|registration|weather|aviation-evidence-bundle/);
  assert.doesNotMatch(view, /Singapore|Johor|Riau|aviation-singapore/);
});

for (const scenario of ['hit', 'miss', 'open-failure', 'match-failure']) {
  test(`actual offline fetch handler: ${scenario}`, async () => {
    const handlers = new Map(), calls = { open: [], match: [], fetch: [] };
    const cached = { body: 'cached revision' }, online = { body: 'online recovery' };
    const request = { method: 'GET', url: 'http://localhost:4199/evidence-view.mjs' };
    runInNewContext(await read('app/sw.mjs'), {
      URL,
      self: { location: new URL('http://localhost:4199/sw.mjs'), addEventListener: (type, handler) => handlers.set(type, handler) },
      caches: { open: async name => {
        calls.open.push(name);
        if (scenario === 'open-failure') throw new Error('Cache storage unavailable');
        return { match: async path => {
          calls.match.push(path);
          if (scenario === 'match-failure') throw new Error('Cache read failed');
          return scenario === 'hit' ? cached : undefined;
        } };
      } },
      fetch: async input => { calls.fetch.push(input); return online; },
    }, { filename: 'app/sw.mjs', timeout: 1000 });
    const responses = [];
    handlers.get('fetch')({ request, respondWith: response => responses.push(response) });
    assert.equal(responses.length, 1);
    assert.equal(await responses[0], scenario === 'hit' ? cached : online);
    assert.equal(calls.open.length, 1);
    assert.match(calls.open[0], /^drone-dashboard-shell-/u);
    assert.deepEqual(calls.match, scenario === 'open-failure' ? [] : ['/evidence-view.mjs']);
    assert.deepEqual(calls.fetch, scenario === 'hit' ? [] : [request]);
  });
}

function worker(state) {
  const listeners = new Set();
  return { state, addEventListener: (_, fn) => listeners.add(fn), removeEventListener: (_, fn) => listeners.delete(fn),
    transition(next) { this.state = next; for (const fn of [...listeners]) fn(); }, listeners };
}
async function preparation(reg) {
  const source = await read('app/app.mjs'), elements = {}, reports = [], timers = new Set();
  let readyReads = 0;
  const $ = id => elements[id] ||= {};
  runInNewContext(source.slice(source.indexOf("$('offline-enable').onclick"), source.indexOf("$('offline-remove').onclick")), {
    $, guard: fn => fn, notice: value => reports.push(value),
    navigator: { serviceWorker: { register: async () => reg,
      get ready() { readyReads++; return Promise.resolve(reg); } } },
    setTimeout: fn => { timers.add(fn); return fn; }, clearTimeout: fn => timers.delete(fn),
  }, { filename: 'app/app.mjs#offline-enable', timeout: 1000 });
  return { run: $('offline-enable').onclick, reports, timers, readyReads: () => readyReads };
}
const settle = () => new Promise(resolve => setImmediate(resolve));

test('offline preparation awaits update and activation over an old worker', async () => {
  let release;
  const next = worker('installing'), reg = { active: worker('activated'),
    update: () => new Promise(resolve => { release = resolve; }) };
  const view = await preparation(reg), pending = view.run();
  await settle(); assert.equal(view.readyReads(), 0);
  reg.installing = next; release(); await settle();
  assert.equal(view.reports.length, 0); next.transition('installed'); await settle();
  assert.equal(view.readyReads(), 0);
  next.transition('activated'); await pending;
  assert.match(view.reports[0], /Save.*reload.*prepared revision/u);
  assert.equal(view.readyReads(), 1); assert.equal(view.timers.size, 0); assert.equal(next.listeners.size, 0);
});

test('offline preparation waits for an activating active worker', async () => {
  const active = worker('activating'), view = await preparation({ active, update: async () => {} });
  const pending = view.run(); await settle();
  assert.equal(view.readyReads(), 0); assert.equal(view.reports.length, 0);
  active.transition('activated'); await pending;
  assert.equal(view.reports.length, 1); assert.equal(view.timers.size, 0);
});

for (const failure of ['redundant', 'update-failure']) test(`offline preparation rejects ${failure} without success`, async () => {
  const active = worker('activated'), installing = worker('redundant');
  const view = await preparation({ active, installing, update: async () => {
    if (failure === 'update-failure') throw new Error('Update fetch failed');
  } });
  await assert.rejects(view.run(), failure === 'redundant' ? /installation failed/u : /Update fetch failed/u);
  assert.equal(view.readyReads(), 0); assert.equal(view.reports.length, 0);
 assert.equal(view.timers.size, 0); assert.equal(installing.listeners.size, 0);
});
