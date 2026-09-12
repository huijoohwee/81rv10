import { createServer } from 'node:http';
import { readFile, mkdir, open, unlink, realpath } from 'node:fs/promises';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { homedir } from 'node:os';
import { randomBytes, randomUUID } from 'node:crypto';
import { ground, git, fresh } from './ground.mjs';
import { compose, review, roles } from './compose.mjs';
import { handoff, observe, exportFiles } from './handoff.mjs';
const productRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export async function createApp(config) {
  const contract = JSON.parse(await readFile(join(productRoot,'integration-contract.json'),'utf8'));
  for (const [owner,root] of [['agentic-graph',config.graphRoot],['agentic-os',config.osRoot]]) if (await git(root,'rev-parse','HEAD') !== contract[owner].revision) throw Error(`${owner} revision changed. Update integration-contract.json and rerun owner integration checks.`);
  const token = randomBytes(24).toString('hex'); let busy = false, controller, canvasAssets, publishing = false;
  const generation = config.generation ||= await import(join(config.osRoot, 'bin/agentic-os-generation.mjs'));
  const save = r => generation.writeGeneratedFile(join(config.state, 'runs', `${r.id}.json`), JSON.stringify(r), { maxOutputBytes: 499999 });
  const load = async id => { if (!/^[a-f0-9-]{36}$/.test(id || '')) throw Error('Invalid proposal identity.'); return JSON.parse(await readFile(join(config.state, 'runs', `${id}.json`), 'utf8')); };
  async function bundle() {
    if (!canvasAssets) canvasAssets = (async () => {
      const esbuild = await import(join(config.graphRoot, 'node_modules/esbuild/lib/main.js'));
      const result = await esbuild.build({ entryPoints: [join(productRoot, 'web/canvas.jsx')], bundle: true, write: false, outdir: '/virtual', format: 'esm', platform: 'browser', minify: true, splitting: true,
        alias: { '@': join(config.graphRoot, 'canvas/src'), react: join(config.graphRoot, 'node_modules/react'), 'react-dom': join(config.graphRoot, 'node_modules/react-dom'), '@graph-panel': join(config.graphRoot, 'canvas/src/components/RichMediaPanel.tsx') },
        nodePaths: [join(config.graphRoot, 'node_modules')], external: ['maplibre-gl/dist/maplibre-gl.js'], define: { 'process.env.NODE_ENV': '"production"', 'import.meta.env': '{"DEV":false,"PROD":true,"BASE_URL":"/"}' }, loader: { '.md': 'text', '.svg': 'dataurl', '.png': 'dataurl', '.woff2': 'dataurl' }, logLevel: 'silent' });
      return new Map(result.outputFiles.map(f => [`/canvas/${f.path.split('/').pop()}`, f.contents]));
    })().catch(e => { canvasAssets = null; throw e; });
    return canvasAssets;
  }
  const server = createServer(async (req, res) => {
    const origin = `http://127.0.0.1:${server.address().port}`;
    const send = (status, data, type = 'application/json') => { res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer', 'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; frame-src 'self'; connect-src 'self'; frame-ancestors 'none'; object-src 'none'" }); res.end(type === 'application/json' ? JSON.stringify(data) : data); };
    try {
      if (req.headers.host !== new URL(origin).host) return send(403, { error: 'Invalid local host.' });
      const url = new URL(req.url, origin);
      if (req.method === 'GET') {
        if (url.pathname === '/api/config') return send(200, { token, repos: config.repos.map(({ id, label }) => ({ id, label })), model: config.model, target: config.target, busy });
        if (url.pathname === '/api/run') return send(200, await load(url.searchParams.get('id')));
        if (url.pathname === '/api/canvas') {
          const r = await load(url.searchParams.get('id'));
          const { serializeAgenticOsDocument } = await import(join(config.graphRoot, 'contracts/agentic-os-document.schema.js'));
          const nodes = r.evidence.nodes.map(n => ({ id: n.id, label: n.label, type: n.type, status: 'existing', properties: { ...n.properties, launchCopilotEvidence: n, explainedEdges: r.evidence.edges.filter(e => e.edge.source === n.id) } }));
          for (const role of roles) if (r.docs?.[role]) nodes.push({ id: `${r.cid}:${role}`, label: `NEW ${role.toUpperCase()}`, type: 'RichMediaPanel', status: 'proposed', properties: { output: r.docs[role], continuity_id: r.cid, revision: r.revision, sourceRefs: r.payload.sections[role].claimIds.map(id => r.payload.claims.find(c => c.id === id).ref) } });
          return send(200, serializeAgenticOsDocument({ canvasDocumentMarkdown: r.docs?.prd || r.requirement, flow: { nodes, edges: r.evidence.edges.map(e => e.edge) } }), 'application/octet-stream');
        }
        if (url.pathname.startsWith('/canvas/')) { const data = (await bundle()).get(url.pathname); return data ? send(200, data, url.pathname.endsWith('.css') ? 'text/css' : 'text/javascript') : send(404, { error: 'Asset not found.' }); }
        const files = { '/': ['index.html', 'text/html'], '/app.mjs': ['app.mjs', 'text/javascript'], '/style.css': ['style.css', 'text/css'], '/sw.js': ['sw.js', 'text/javascript'] };
        const file = files[url.pathname]; return file ? send(200, await readFile(join(productRoot, 'web', file[0])), file[1]) : send(404, { error: 'Not found.' });
      }
      if (req.method !== 'POST' || req.headers.origin !== origin || req.headers['x-lc-token'] !== token || !req.headers['content-type']?.startsWith('application/json')) return send(403, { error: 'A same-origin review session is required.' });
      let raw = ''; for await (const chunk of req) { raw += chunk; if (Buffer.byteLength(raw) > 64000) throw Error('Request exceeds budget.'); }
      const body = JSON.parse(raw);
      if (url.pathname === '/api/abort') { if (publishing) throw Error('Handoff has begun. Use readback after it settles.'); controller?.abort(); return send(200, { ok: true }); }
      if (busy) return send(409, { error: 'One operation is already running. Wait or cancel it.' });
      busy = true; controller = new AbortController(); const signal = AbortSignal.any([controller.signal, AbortSignal.timeout(90000)]);
      try {
        let run;
        if (url.pathname === '/api/ground') {
          if (!/^[a-z0-9]+(?:-[a-z0-9]+){0,7}$/.test(body.slug || '') || body.slug.length > 64) throw Error('Use a short lowercase-hyphen proposal name.');
          run = { id: randomUUID(), cid: `launch-copilot/${body.slug}`, revision: 'r1', slug: body.slug, title: body.slug.replaceAll('-', ' '), requirement: body.requirement, target: config.target, base: await git(config.target, 'rev-parse', 'HEAD'), status: 'grounded' };
          run.evidence = await ground(config, body.repo, body.requirement, signal);
        } else {
          run = await load(body.id);
          if (url.pathname === '/api/readback') return send(200, await observe(config, run, save));
          if (url.pathname === '/api/export') return send(200, await exportFiles(config,run,body.reviewHash,save));
          if (url.pathname === '/api/approve') { publishing = true; return send(200, await handoff(config, run, body.reviewHash, save)); }
          if (run.status === 'cancelled' || run.handoff?.attempted) throw Error('This proposal cannot be changed. Create a new revision.');
          if (url.pathname === '/api/cancel') run.status = 'cancelled';
          else if (url.pathname === '/api/compose') { await fresh(config, run.evidence); if (run.docs) run.revision = `r${Number(run.revision.slice(1)) + 1}`; Object.assign(run, await compose(config, run, signal)); }
          else if (url.pathname === '/api/revise') { await fresh(config, run.evidence); run.revision = `r${Number(run.revision.slice(1)) + 1}`; Object.assign(run, review(run, body.payload)); }
          else throw Error('Unknown action.');
        }
        signal.throwIfAborted(); await save(run); return send(200, run);
      } finally { busy = false; controller = null; publishing = false; }
    } catch (error) { send(400, { error: error.message.length > 700 ? 'Operation failed; inspect the local runtime.' : error.message }); }
  });
  return server;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const graphRoot = await realpath(process.env.LC_GRAPH_ROOT || '../agentic-graph'), osRoot = await realpath(process.env.LC_OS_ROOT || '../agentic-os');
  const modelSource = await readFile(join(graphRoot, 'canvas/src/lib/chatEndpointModels.ts'), 'utf8');
  const model = process.env.LC_MODEL || modelSource.match(/CHAT_OPENAI_MODEL_OPTIONS\s*=\s*\[\s*'([^']+)'/)?.[1];
  if (!model) throw Error('Graph model catalog could not be resolved; set LC_MODEL.');
  const statePath = resolve(process.env.LC_STATE || join(homedir(), '.local/state/launch-copilot'));
  await mkdir(statePath, { recursive: true, mode: 0o700 }); const state = await realpath(statePath);
  const graphUrl = process.env.LC_GRAPH_URL || 'http://127.0.0.1:5173';
  if (!/^http:\/\/127\.0\.0\.1:\d+$/.test(graphUrl)) throw Error('Graph proxy must be an explicit loopback origin.');
  const target = await realpath(process.env.LC_TARGET || productRoot);
  const repos = JSON.parse(process.env.LC_REPOS || JSON.stringify([{ id: 'launch-copilot', label: 'Launch Copilot', root: target, include: ['README.md', 'src/**/*.mjs'] }]));
  const server = await createApp({ graphRoot, osRoot, graphUrl, model, state, target, repos });
  const lock = await open(join(state, 'server.lock'), 'wx', 0o600); await lock.writeFile(String(process.pid));
  server.once('error', async error => { await lock.close(); await unlink(join(state,'server.lock')); console.error(error.message); process.exitCode = 1; });
  const close = () => server.close(async () => { await lock.close(); await unlink(join(state, 'server.lock')); process.exit(0); });
  process.on('SIGTERM', close); process.on('SIGINT', close);
  server.listen(Number(process.env.PORT || 4317), '127.0.0.1', () => console.log(`Launch Copilot: http://127.0.0.1:${server.address().port}`));
}
