import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.join(process.cwd(), '.release');
const discovery = JSON.parse(await fs.readFile(path.join(process.cwd(), 'public', 'index.v2.json'), 'utf8')) as { items: unknown[] };
const expected = discovery.items.length;
const tarballRoot = path.join(root, 'tarballs');
const portableTarballRoot = tarballRoot.replaceAll('\\', '/');
await fs.rm(tarballRoot, { recursive: true, force: true });
await fs.mkdir(tarballRoot, { recursive: true });
for (const framework of ['react', 'vue', 'svelte']) {
  const directory = path.join(root, framework);
  const pkg = JSON.parse(await fs.readFile(path.join(directory, 'package.json'), 'utf8')) as { name: string; exports: Record<string, unknown> };
  if (pkg.name !== `@buildwithme/${framework}`) throw new Error(`${framework}: invalid package name`);
  const componentExports = Object.keys(pkg.exports).filter((key) => key !== '.' && key !== './styles.css');
  if (componentExports.length !== expected) throw new Error(`${framework}: expected ${expected} component exports, received ${componentExports.length}`);
  const files = await fs.readdir(path.join(directory, 'dist'));
  if (!files.length) throw new Error(`${framework}: empty package output`);
  for (const [exportName, definition] of Object.entries(pkg.exports)) {
    if (typeof definition !== 'object' || !definition || !('types' in definition)) continue;
    const typePath = String((definition as { types: string }).types).replace(/^\.\//, '');
    try { await fs.access(path.join(directory, typePath)); }
    catch { throw new Error(`${framework}: missing declaration for ${exportName}: ${typePath}`); }
  }
  const pack = process.platform === 'win32'
    ? spawnSync(process.env.ComSpec ?? 'cmd.exe', ['/d', '/s', '/c', `pnpm pack --pack-destination ${portableTarballRoot}`], { cwd: directory, encoding: 'utf8' })
    : spawnSync('pnpm', ['pack', '--pack-destination', tarballRoot], { cwd: directory, encoding: 'utf8' });
  if (pack.status !== 0) throw new Error(`${framework}: pnpm pack failed\n${pack.stderr}`);
}
const tarballs = (await fs.readdir(tarballRoot)).filter((file) => file.endsWith('.tgz'));
if (tarballs.length !== 3) throw new Error(`Expected 3 tarballs, received ${tarballs.length}`);
for (const tarball of tarballs) {
  const listing = spawnSync('tar', ['-tf', path.join(tarballRoot, tarball)], { encoding: 'utf8' });
  if (listing.status !== 0 || !listing.stdout.includes('package/package.json') || !listing.stdout.includes('package/LICENSE')) throw new Error(`${tarball}: invalid packed contents`);
}
console.log(`Packed and inspected three tarballs with ${expected} exports per framework.`);
