import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { capabilities, invoke, invokeCommand, registerBrowserTools } from '../app/tools.mjs';
import { admit, inspect, canonicalJson, exportPack, sourceEvidence } from '../app/evidence-kernel.mjs';
import { replay } from '../app/evidence-replay.mjs';
import { handle, invokeEnvelope, MAX_REQUEST_BYTES, PROTOCOL_VERSION } from '../mcp.mjs';
import { projectVolume } from '../app/volume-project.mjs';
import volumeProfile from '../app/profiles/volume-v1.json' with { type: 'json' };
import volumeView from '../app/profiles/volume-view.json' with { type: 'json' };
import profile from '../app/profiles/aviation-v1.json' with { type: 'json' };

const bundle = await readFile(new URL('../app/fixtures/aviation-synthetic-v1.json', import.meta.url), 'utf8');
const fixture = JSON.parse(bundle);
const volumeBundle = await readFile(new URL('../app/fixtures/volume-singapore-synthetic-v1.json', import.meta.url), 'utf8');
const entityId = JSON.parse(volumeBundle).entities[0].id;
const factId = fixture.facts[0].id;
const flightId = fixture.entities[0].id;
const atUtc = fixture.facts.map(fact => fact.observed_at).sort().at(-1);
const root = new URL('..', import.meta.url);
const bytes = value => new TextEncoder().encode(value);
const call = (name, args, id = 1) => ({ jsonrpc: '2.0', id, method: 'tools/call', params: { name, arguments: args } });
function child(input, cli = false) {
  return spawnSync(process.execPath, ['mcp.mjs', ...(cli ? ['--invoke'] : [])], {
    cwd: root, input, encoding: 'utf8', timeout: 10000, maxBuffer: 16000000,
  });
}
function success(result) {
  assert.equal(result.error, undefined);
  assert.equal(result.status, 0, result.stderr);
  return JSON.parse(result.stdout);
}

test('one catalogue declares exact read aliases and bounded schemas', () => {
  assert.deepEqual(capabilities.map(tool => tool.name), [
    'drone_dashboard.inspect', 'drone_dashboard.resolve_owners', 'aviation.inspect', 'aviation.replay', 'aviation.source', 'volume.project',
  ]);
  for (const tool of capabilities.slice(2)) {
    assert.equal(tool.inputSchema.additionalProperties, false);
    assert.equal(tool.inputSchema.properties.bundle.maxLength, profile.limits.maxPackBytes);
  }
  const discovered = handle({ jsonrpc: '2.0', id: 1, method: 'tools/list' }).result.tools;
  assert.ok(discovered.every(tool => tool.annotations.readOnlyHint && !tool.annotations.openWorldHint));
});

test('inspection and replay share core, alias, CLI and MCP results', async () => {
  const admitted = await admit(bytes(bundle), profile);
  const volume = await admit(bytes(volumeBundle), volumeProfile);
  for (const [name, args, expected] of [
    ['aviation.inspect', { bundle }, inspect(admitted)],
    ['aviation.replay', { bundle, flightId, atUtc }, replay(admitted, flightId, atUtc)],
    ['aviation.source', { bundle, factId }, sourceEvidence(admitted, factId)],
    ['volume.project', { bundle: volumeBundle, entityId, atUtc: volumeView.ui.defaultAtUtc }, projectVolume(volume, entityId, volumeView.ui.defaultAtUtc, volumeView)],
  ]) {
    assert.deepEqual(await invoke(name, args), expected);
    const command = capabilities.find(tool => tool.name === name).command;
    assert.deepEqual(await invokeCommand(command, args), expected);
    assert.deepEqual(await invokeEnvelope({ name, arguments: args }), expected);
    const response = await handle(call(name, args));
    assert.equal(response.result.isError, undefined);
    assert.deepEqual(JSON.parse(response.result.content[0].text), expected);
    const cli = child(JSON.stringify({ name, arguments: args }), true);
    assert.deepEqual(success(cli), expected);
    assert.equal(cli.stdout, canonicalJson(expected) + '\n');
    const mcp = success(child(JSON.stringify(call(name, args)) + '\n'));
    assert.deepEqual(JSON.parse(mcp.result.content[0].text), expected);
  }
});

test('portable pack inspection preserves original and derived identities across transports', async () => {
  const admitted = await admit(bytes(bundle), profile);
  const pack = await exportPack(admitted);
  const text = typeof pack === 'string' ? pack : new TextDecoder().decode(pack);
  const expected = inspect(admitted);
  assert.deepEqual(await invoke('aviation.inspect', { bundle: text }), expected);
  assert.deepEqual(success(child(JSON.stringify({ name: 'aviation.inspect', arguments: { bundle: text } }), true)), expected);
});

test('all entry points reject unknown tools, mutation and invalid argument shapes', async () => {
  for (const [name, args] of [
    ['aviation.write', { bundle }], ['aviation.inspect', { bundle, run: true }],
    ['aviation.inspect', {}], ['aviation.inspect', { bundle: {} }],
    ['aviation.replay', { bundle, flightId, atUtc, throttle: 1 }],
    ['aviation.replay', { bundle, flightId: '', atUtc }],
    ['aviation.replay', { bundle, flightId, atUtc: 'not-utc' }],
    ['aviation.source', { bundle, factId: 'missing' }],
    ['aviation.source', { bundle, factId, entityId }],
    ['volume.project', { bundle, entityId, atUtc }],
    ['aviation.inspect', { bundle: volumeBundle }],
    ['volume.project', { bundle: volumeBundle, entityId, atUtc: volumeView.ui.defaultAtUtc, flightId }],
  ]) {
    await assert.rejects(async () => invoke(name, args));
    await assert.rejects(invokeEnvelope({ name, arguments: args }));
    const response = await handle(call(name, args));
    assert.equal(response.result.isError, true);
    const cli = child(JSON.stringify({ name, arguments: args }), true);
    assert.equal(cli.status, 1); assert.equal(cli.stdout, ''); assert.ok(cli.stderr.trim());
  }
  assert.throws(() => invokeCommand('/aviation.run @evidence #flight', { bundle }));
  assert.deepEqual(await invokeCommand('/aviation.inspect @evidence #flight', { bundle, flightId, atUtc }), await invoke('aviation.inspect', { bundle }));
  assert.throws(() => invokeCommand('/aviation.inspect @evidence #flight', { bundle, flightId, atUtc, write: true }));
  await assert.rejects(invokeEnvelope({ name: 'aviation.inspect', arguments: { bundle }, outputFile: '/tmp/no-write' }));
});

test('MCP rejects unsupported protocol revisions and malformed request shapes', () => {
  const initialize = version => ({ jsonrpc: '2.0', id: 7, method: 'initialize', params: { protocolVersion: version } });
  assert.equal(handle(initialize(PROTOCOL_VERSION)).result.protocolVersion, PROTOCOL_VERSION);
  for (const version of ['2025-03-26', '', undefined]) assert.equal(handle(initialize(version)).error.code, -32602);
  for (const request of [null, [], { ...initialize(PROTOCOL_VERSION), extra: true },
    { ...initialize(PROTOCOL_VERSION), id: {} }, { jsonrpc: '2.0', id: 1, method: 'tools/list', params: [] }])
    assert.equal(handle(request).error.code, -32600);
  assert.equal(handle({ jsonrpc: '2.0', id: 1, method: 'tools/list', params: { mutate: true } }).error.code, -32602);
  assert.equal(handle({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name: 'aviation.inspect', arguments: {}, extra: true } }).error.code, -32602);
  assert.equal(success(child(JSON.stringify(initialize('2099-01-01')) + '\n')).error.code, -32602);
});

test('stdio awaits each async request and keeps response order without Promise serialization', async () => {
  const messages = [call('aviation.inspect', { bundle }, 1), call('aviation.replay', { bundle, flightId, atUtc }, 2),
    { jsonrpc: '2.0', id: 3, method: 'ping' }];
  const result = child(messages.map(JSON.stringify).join('\n') + '\n');
  assert.equal(result.status, 0, result.stderr);
  const output = result.stdout.trim().split('\n').map(line => JSON.parse(line));
  assert.deepEqual(output.map(message => message.id), [1, 2, 3]);
  assert.deepEqual(JSON.parse(output[0].result.content[0].text), await invoke('aviation.inspect', { bundle }));
  assert.deepEqual(JSON.parse(output[1].result.content[0].text), await invoke('aviation.replay', { bundle, flightId, atUtc }));
});

test('original byte limit and escaped envelope limit are independently enforced', async () => {
  const padded = bundle + ' '.repeat(profile.limits.maxBytes - bytes(bundle).length);
  const expected = await invoke('aviation.inspect', { bundle: padded });
  const envelope = { name: 'aviation.inspect', arguments: { bundle: padded } };
  // Exercise worst-case JSON escapes through the actual executable, not only ASCII framing.
  const escaped = JSON.stringify(envelope).replace(/ {2,}/gu, spaces => '\\u0020'.repeat(spaces.length));
  assert.ok(bytes(escaped).length > 500000 && bytes(escaped).length < MAX_REQUEST_BYTES);
  assert.deepEqual(success(child(escaped, true)), expected);
  await assert.rejects(async () => invoke('aviation.inspect', { bundle: padded + ' ' }));
  assert.throws(() => invoke('aviation.inspect', { bundle: 'x'.repeat(profile.limits.maxPackBytes + 1) }));
  for (const cli of [false, true]) {
    const result = child(' '.repeat(MAX_REQUEST_BYTES + 1), cli);
    assert.equal(result.status, 1); assert.match(result.stderr, /Request too large/u);
  }
});

test('invalid UTF-8 and incomplete or multiple CLI envelopes fail visibly', () => {
  assert.equal(child(Buffer.from([255]), true).status, 1);
  assert.equal(success(child(Buffer.from([255, 10]))).error.code, -32700);
  assert.equal(child(JSON.stringify(call('aviation.inspect', { bundle }))).status, 1);
  assert.equal(child('{}\n{}', true).status, 1);
});

test('transport never replaces unpaired Unicode in otherwise valid original bundle text', async () => {
  const malformed = bundle.replace(fixture.dataset.title, '\ud800');
  assert.notEqual(malformed, bundle);
  assert.throws(() => invoke('aviation.inspect', { bundle: malformed }), /without replacement/u);
  assert.equal((await handle(call('aviation.inspect', { bundle: malformed }))).result.isError, true);
  const result = child(JSON.stringify({ name: 'aviation.inspect', arguments: { bundle: malformed } }), true);
  assert.equal(result.status, 1); assert.match(result.stderr, /without replacement/u);
});

test('typed admission failures retain core code and path through MCP and CLI', async () => {
  const args = { bundle, flightId, atUtc: 'not-utc' };
  let failure;
  try { await invoke('aviation.replay', args); } catch (error) { failure = error; }
  assert.equal(failure.code, 'UTC');
  const expected = { error: { code: failure.code, message: failure.message, path: failure.path } };
  const response = await handle(call('aviation.replay', args));
  assert.equal(response.result.isError, true);
  assert.deepEqual(JSON.parse(response.result.content[0].text), expected);
  const cli = child(JSON.stringify({ name: 'aviation.replay', arguments: args }), true);
  assert.equal(cli.status, 1); assert.equal(cli.stdout, '');
  assert.equal(cli.stderr, canonicalJson(expected) + '\n');
});

test('actual browser adapter reports unavailable API with usable local fallback', async () => {
  for (const context of [undefined, null, {}, { registerTool: false }]) {
    const reports = [];
    const result = await registerBrowserTools(context, { report: message => reports.push(message) });
    assert.deepEqual(result, { status: 'unavailable', registeredCount: 0, totalCount: 6 });
    assert.equal(reports.length, 1);
    assert.match(reports[0], /WebMCP unavailable.*read-only command.*CLI.*stdio MCP/u);
  }
});

test('actual browser adapter reports rejected and partial registration truthfully', async () => {
  for (const acknowledged of [0, 2]) {
    const reports = [], attempts = [];
    const result = await registerBrowserTools({ registerTool: async tool => {
      attempts.push(tool.name);
      if (attempts.length > acknowledged) throw new Error('Registration denied');
    } }, { report: message => reports.push(message) });
    assert.deepEqual(result, { status: acknowledged ? 'partial' : 'failed', registeredCount: acknowledged, totalCount: 6 });
    assert.deepEqual(attempts, capabilities.slice(0, acknowledged + 1).map(tool => tool.name));
    assert.equal(reports.length, 1);
    assert.match(reports[0], new RegExp(`failed after ${acknowledged} of 6 tools: Registration denied`));
    assert.match(reports[0], /visible read-only command/u);
    assert.doesNotMatch(reports[0], /tools registered/u);
  }
});

test('actual registered browser execute awaits context resolution and shared inspection/replay', async () => {
  const registered = new Map(), reports = [], resolutions = [];
  const result = await registerBrowserTools({ registerTool: async tool => {
    await Promise.resolve(); registered.set(tool.name, tool);
  } }, {
    resolveArgs: async (name, args) => {
      await Promise.resolve(); resolutions.push({ name, args });
      return name === 'aviation.inspect' && args.bundle === undefined ? { ...args, bundle } : args;
    },
    report: message => reports.push(message),
  });
  assert.deepEqual(result, { status: 'registered', registeredCount: 6, totalCount: 6 });
  assert.equal(reports.length, 1); assert.match(reports[0], /tools registered \(6\/6\)/u);
  assert.deepEqual([...registered.keys()], capabilities.map(tool => tool.name));
  for (const tool of capabilities) {
    const adapter = registered.get(tool.name);
    assert.deepEqual(adapter.inputSchema, tool.inputSchema);
    assert.deepEqual(adapter.annotations, { readOnlyHint: true, destructiveHint: false, openWorldHint: false });
    assert.equal(Object.hasOwn(adapter, 'command'), false);
  }
  for (const [name, args] of [['aviation.inspect', { bundle }], ['aviation.replay', { bundle, flightId, atUtc }]]) {
    const output = await registered.get(name).execute(args);
    assert.deepEqual(output, { content: [{ type: 'text', text: JSON.stringify(await invoke(name, args)) }] });
    assert.deepEqual(resolutions.at(-1), { name, args });
  }
  assert.deepEqual(JSON.parse((await registered.get('aviation.inspect').execute({})).content[0].text), await invoke('aviation.inspect', { bundle }));
  await assert.rejects(registered.get('aviation.replay').execute({ bundle, flightId, atUtc: 'not-utc' }), error => error.code === 'UTC');
  await assert.rejects(registered.get('aviation.inspect').execute({ bundle, mutate: true }));
});


test('async tool admission owns the complete caller query before yielding', async () => {
  const args = { bundle, factId }, expected = await invoke('aviation.source', args);
  const pending = invoke('aviation.source', args); args.factId = 'replaced'; args.bundle = '{}';
  assert.deepEqual(await pending, expected);
});
