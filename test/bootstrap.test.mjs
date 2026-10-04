import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { validateRepositoryProfile } from 'agentic-os';

const json = async path => JSON.parse(await readFile(path, 'utf8'));
if (process.argv.includes('--budgets')) {
  const files = execFileSync('git', ['ls-files', '-z', '--cached', '--others', '--exclude-standard'], { encoding: 'utf8' }).split('\0').filter(Boolean);
  const removed = new Set(execFileSync('git', ['ls-files', '--deleted', '-z'], { encoding: 'utf8' }).split('\0'));
  const present = [...new Set(files)].filter(file => !removed.has(file));
  let bytes = 0;
  for (const file of present) {
    const data = await readFile(file); bytes += data.length;
    assert.ok(data.length < 500000, `${file}: exceeds 500 kB`);
    assert.ok(data.toString('utf8').split('\n').length < 600, `${file}: exceeds 599 lines`);
  }
  console.log(JSON.stringify({ files: present.length, bytes, bounds: 'each file <600 lines and <500 kB' }));
} else {
  test('native profile binds the target and requires protected checks', async () => {
    const profile = validateRepositoryProfile(await json('.agentic-os.json'));
    assert.equal(profile.repository, 'github.com/huijoohwee/81rv10');
    assert.deepEqual(profile.requiredChecks, ['budgets', 'test']);
    assert.ok(profile.capabilities.includes('protected-integration:pull-request'));
    assert.ok(Object.values(profile.cleanup).every(value => value === 'retain'));
  });
  test('consumer pins the exact owner and invokes its validator', async () => {
    const pkg = await json('package.json'), lock = await json('package-lock.json');
    const expected = 'github:huijoohwee/agentic-os#e0ef770860905830157e64c455f0a342084b6d25';
    assert.equal(pkg.devDependencies['agentic-os'], expected);
    assert.equal(lock.packages[''].devDependencies['agentic-os'], expected);
    assert.match(pkg.scripts.check, /node_modules\/agentic-os\/bin\/agentic-os-validation\.mjs run$/u);
    const policy = await json('.agentic-os-validation.json');
    assert.equal(policy.repository, 'github.com/huijoohwee/81rv10');
    assert.deepEqual(policy.fallback, ['budgets', 'test']);
  });
  test('committed planning reference is present and preserves the reference product', async () => {
    const plan = await readFile('docs/agentic-drone-dashboard/prd-tad-adr-mvp-gtm.md', 'utf8');
    assert.match(plan, /continuity_id: "agentic-drone-dashboard"/u);
    assert.match(plan, /VCC-01/u);
    assert.match(await readFile('README.md', 'utf8'), /Launch Copilot/u);
  });
}
