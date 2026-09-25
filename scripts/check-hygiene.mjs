import { execFileSync } from 'node:child_process';
const files = execFileSync('git', ['ls-files'], { encoding: 'utf8' }).trim().split('\n');
const forbidden =
  /(^|\/)(node_modules|\.next|dist|coverage|playwright-report|test-results|tmp|\.turbo)(\/|$)|(^|\/)(package-lock\.json|yarn\.lock|bun\.lockb?|AGENT\.local\.md|USER\.md|PROJECT_PLAN[^/]*\.md|BOOTSTRAP_PROMPT\.md|INITIAL_PLAN\.md|MASTER_PROMPT\.md|ROADMAP_DRAFT\.md|\.env(?:\..*)?)$/;
const bad = files.filter((f) => forbidden.test(f) && !f.endsWith('.env.example'));
if (bad.length) {
  console.error('Forbidden tracked files:', bad.join('\n'));
  process.exitCode = 1;
} else console.log('Tracked-file hygiene passed.');
