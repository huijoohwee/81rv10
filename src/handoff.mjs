import { readFile, realpath } from 'node:fs/promises';
import { join } from 'node:path';
import { command, git, fresh } from './ground.mjs';
import { digest, review, roles } from './compose.mjs';
export function assertReviewed(config, run, hash) {
  if (run.target !== config.target) throw Error('Target configuration changed. Review again.');
  if (run.status === 'cancelled' || !run.payload || hash !== run.reviewHash || review(run, run.payload).reviewHash !== hash) throw Error('Approval does not match the exact current proposal.');
  const expected = review(run, run.payload);
  if (digest(run.docs) !== digest(expected.docs) || digest(run.manifest) !== digest(expected.manifest)) throw Error('Stored bytes differ from reviewed content.');
}
export async function exportFiles(config, run, hash, save) {
  assertReviewed(config, run, hash); await fresh(config, run.evidence);
  const directory = join(config.state, 'exports', run.id);
  for (let i=0; i<roles.length; i++) await config.generation.writeGeneratedFile(join(directory, run.manifest[i].path),run.docs[roles[i]]);
  for (const m of run.manifest) if (digest(await readFile(join(directory,m.path),'utf8')) !== m.sha256) throw Error('Export content verification failed.');
  run.export = { directory, reviewHash: hash, verified: true }; await save(run); return run;
}
export async function handoff(config, run, hash, save) {
  assertReviewed(config, run, hash);
  if (run.handoff?.attempted) return observe(config, run, save); // A lost response never starts another lane.
  await fresh(config, run.evidence);
  if (await git(run.target, 'rev-parse', 'HEAD') !== run.base) throw Error('Target base changed. Create and review a new proposal.');
  const invoke = config.invoke || command;
  const os = args => invoke(process.execPath, [join(config.osRoot, 'bin/agentic-os.mjs'), ...args], run.target);
  try { await os(['doctor']); } catch { throw Error('Target is not admitted by agentic-os. Complete repository profile/setup and protected-PR policy first; no files were written.'); }
  run.handoff = { attempted: true, phase: 'admitting', scope: `lc-${run.id.slice(0, 12)}`, approvedHash: hash }; await save(run);
  try {
    const output = await os(['start', run.handoff.scope, '--device=launch-copilot', `--write=${run.manifest.map(m => m.path).join(',')}`]);
    const worktree = output.match(/^worktree (.+)$/m)?.[1];
    if (!worktree || await realpath(worktree) !== worktree) throw Error('Lane admission needs readback.');
    run.handoff.worktree = worktree; run.handoff.phase = 'writing'; await save(run);
    // Admission fetches the remote base: check it before writing the approved bytes.
    if (await git(worktree, 'rev-parse', 'HEAD') !== run.base) throw Error('Lane base changed during admission; review again.');
    await fresh(config, run.evidence);
    for (let i = 0; i < roles.length; i++) await config.generation.writeGeneratedFile(join(worktree, run.manifest[i].path), run.docs[roles[i]]);
    for (const m of run.manifest) if (digest(await readFile(join(worktree, m.path), 'utf8')) !== m.sha256) throw Error('Written content differs from approved content.');
    run.handoff.phase = 'files-written'; await save(run);
    await invoke('npm', ['run', 'check'], worktree);
    await fresh(config, run.evidence);
    run.handoff.phase = 'publishing'; await save(run);
    await invoke(process.execPath, [join(config.osRoot, 'bin/agentic-os.mjs'), 'land', `--message=docs: proposal ${run.slug}`], worktree);
    return observe(config, run, save);
  } catch (error) { run.handoff.phase = 'needs-readback'; run.handoff.error = error.message.slice(0, 500); await save(run); throw Error('Handoff stopped. Effects may be retained; use Read back. Do not create another lane.'); }
}
export async function observe(config, run, save) {
  if (!run.handoff?.attempted) return run;
  const ref = `agent/launch-copilot/${run.handoff.scope}`;
  const invoke = config.invoke || command;
  const records = JSON.parse(await invoke('gh', ['pr', 'list', '--state', 'all', '--head', ref, '--json', 'url,state,headRefOid,mergeCommit'], run.target));
  if (records.length > 1) throw Error('Multiple provider proposals require manual reconciliation.');
  const pr = records[0];
  if (pr) {
    const revision = pr.state === 'MERGED' ? pr.mergeCommit?.oid : pr.headRefOid;
    if (!/^[0-9a-f]{40}$/.test(revision || '')) throw Error('Provider revision is unavailable.');
    await invoke('git', ['-C', run.target, 'fetch', 'origin', revision]);
    for (const m of run.manifest) {
      // Preserve trailing newlines: git() trims command output, which is unsuitable for byte proof.
      const { execFileSync } = await import('node:child_process');
      const bytes = execFileSync('git', ['-C', run.target, 'show', `${revision}:${m.path}`], { maxBuffer: 100000 });
      if (digest(bytes.toString('utf8')) !== m.sha256) throw Error('Provider content differs from approved content.');
    }
    run.handoff = { ...run.handoff, phase: pr.state === 'MERGED' ? 'integrated' : pr.state === 'OPEN' ? 'pr-open' : 'pr-closed', pr: pr.url, revision, contentVerified: true };
  } else run.handoff.phase = 'needs-readback';
  await save(run); return run;
}
