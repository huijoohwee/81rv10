import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { readFile, realpath } from 'node:fs/promises';
import { join, matchesGlob } from 'node:path';
const exec = promisify(execFile);
export async function command(file, args, cwd, signal) {
  return (await exec(file, args, { cwd, signal, timeout: 120000, maxBuffer: 2 * 1024 * 1024 })).stdout.trim();
}
export const git = (root, ...args) => command('git', ['-C', root, ...args]);
const safePath = p => !/(^|\/)(\.|node_modules|vendor|dist)|(^|[._/-])(secret|credentials|token|private[._-]?key)([._/-]|$)|\.(pem|key|p12)$/i.test(p);
export async function ground(config, repoId, query, signal) {
  const started = performance.now();
  if (typeof query !== 'string' || query.trim().length < 8 || query.length > 2000) throw Error('Requirement must contain 8–2000 characters.');
  const repo = config.repos.find(r => r.id === repoId);
  if (!repo) throw Error('Select a configured source repository.');
  const root = await realpath(repo.root), head = await git(root, 'rev-parse', 'HEAD');
  const files = (await git(root, 'ls-files', '-z')).split('\0').filter(p => p && safePath(p) && repo.include.some(g => matchesGlob(p, g)));
  if (!files.length || files.length > 200) throw Error('Select a scope containing 1–200 tracked source files.');
  const limits = { paths: files, maxEntries: 201, maxBytes: 2000000, maxFileBytes: 200000 };
  const before = config.generation.generationManifest(root, limits);
  const { createAgentGraphRuntime } = await import(join(config.graphRoot, 'mcp/agent-graph/runtime.mjs'));
  const runtime = createAgentGraphRuntime({ agenticGraphRoot: config.graphRoot, allowedRoots: [root], outputRoot: join(config.state, 'graph') });
  const snapshot = await runtime.ingest({ rootPath: root, include: files, maxFiles: 200, maxFileBytes: 200000, maxTotalBytes: 2000000, maxDurationMs: 30000, projectionLimit: 12, strict: true }, { signal });
  if (!snapshot.ok) throw Error(`Graph ingest: ${snapshot.error?.code || JSON.stringify(snapshot.error)}`);
  const binding = { graphId: snapshot.graphId, expectedSnapshotDigest: snapshot.snapshotDigest };
  const stop = new Set('help need needs want wants with from that this have make launch sellable reviewed under over into one our your we'.split(' '));
  const terms = [...new Set((query.toLowerCase().match(/[\p{L}\p{N}_-]+/gu) || []).filter(w => w.length > 2 && !stop.has(w)))].slice(0,16).join(' ');
  const found = await runtime.query({ ...binding, mode: 'search', query: terms || query, limit: 8, maxDurationMs: 10000 }, { signal });
  if (!found.ok) throw Error('Graph query refused the snapshot.');
  const nodes = new Map(found.results.nodes.map(({ node }) => [node.id, node])), edges = [];
  for (const { edge } of found.results.edges.slice(0, 20)) {
    signal?.throwIfAborted();
    const explained = await runtime.explainEdge({ ...binding, edgeId: edge.id, maxDurationMs: 10000 }, { signal });
    if (!explained.ok) throw Error('Graph could not explain a selected relation.');
    const ends = [explained.source, explained.target].filter(Boolean);
    if (new Set([...nodes.keys(), ...ends.map(n => n.id)]).size > 12) continue;
    for (const node of ends) nodes.set(node.id, node);
    if (nodes.has(edge.source) && nodes.has(edge.target)) edges.push(explained);
  }
  const after = config.generation.generationManifest(root, limits);
  if (before.digest !== after.digest || head !== await git(root, 'rev-parse', 'HEAD')) throw Error('Source changed during grounding. Refresh evidence.');
  for (const e of edges) if (after.files.find(f => f.path === e.evidence.sourcePath)?.sha256 !== e.evidence.sourceDigest) throw Error('Explained edge does not match the current source hash.');
  const evidence = [];
  for (const node of nodes.values()) {
    const path = node.properties?.['corpus:sourcePath'];
    const file = after.files.find(f => f.path === path);
    if (!file) continue;
    const span = edges.find(e => e.edge.target === node.id && e.evidence.sourcePath === path)?.evidence.sourceSpan;
    const line = Number(node.properties['corpus:lineStart'] || span?.lineStart) || null;
    const excerpt = line ? (await readFile(join(root, path), 'utf8')).split('\n').slice(line - 1, line + 3).join('\n').slice(0, 800) : 'The graph owner did not emit a source span for this node. Its file membership is known; behavior is unverified.';
    evidence.push({ id: node.id, label: node.label, type: node.type, owner: repo.id, path, line, sha256: file.sha256, excerpt, properties: node.properties });
  }
  const ids = new Set(evidence.map(n => n.id));
  return { repo: repo.id, root, head, query, terms, ...binding, sourceManifest: after, include: files, nodes: evidence, metrics: { elapsedMs: Math.round(performance.now()-started), modelCalls: 0 },
    edges: edges.filter(e => ids.has(e.edge.source) && ids.has(e.edge.target)),
    completeness: { corpus: snapshot.completeness, query: found.completeness, selectedNodes: evidence.length, selectedEdges: edges.length, bounded: true },
    gaps: evidence.length ? ['Lexical matches are candidates, not proof of complete business impact.', 'Source evidence does not validate buyer demand or live payment readiness.'] : ['No relevant source nodes found. All implementation claims must be NEW.'] };
}
export async function fresh(config, evidence) {
  const repo = config.repos.find(r => r.id === evidence.repo);
  if (!repo || await realpath(repo.root) !== evidence.root) throw Error('Source configuration changed.');
  const manifest = config.generation.generationManifest(evidence.root, { paths: evidence.include, maxEntries: 201, maxBytes: 2000000, maxFileBytes: 200000 });
  if (manifest.digest !== evidence.sourceManifest.digest || await git(evidence.root, 'rev-parse', 'HEAD') !== evidence.head) throw Error('Stale source: ground and review again.');
}
