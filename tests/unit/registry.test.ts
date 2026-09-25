import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {
  validateEntries,
  safePath,
  importsOf,
  loadRegistry,
} from '../../packages/validator/src/index';
import { scaffold } from '../../scripts/new-component';
import type { RegistryComponent } from '../../packages/registry-schema/src/index';
let root: string;
let item: RegistryComponent;
beforeEach(async () => {
  root = await fs.mkdtemp(path.join(os.tmpdir(), 'bwm-validator-'));
  await fs.writeFile(
    path.join(root, 'demo.tsx'),
    "import {useState} from 'react'; export default function Demo(){return null}",
  );
  item = {
    schemaVersion: 1,
    id: 'demo',
    title: 'Demo',
    description: 'A demo',
    category: 'buttons',
    framework: 'react',
    engine: 'css',
    tags: ['button'],
    files: ['demo.tsx'],
    preview: 'demo.tsx',
    dependencies: {},
    author: { name: 'Test contributor' },
    license: 'MIT',
    origin: 'original',
    adaptations: [],
    usage: '<Demo />',
    accessibility: 'Keyboard supported.',
    props: [],
  };
});
afterEach(async () => {
  await fs.rm(root, { recursive: true, force: true });
});
describe('registry validation', () => {
  it('accepts a complete entry', async () => {
    expect((await validateEntries([item], root)).errors).toEqual([]);
  });
  it.each([
    '../x.tsx',
    'C:/x.tsx',
    'C:\\x.tsx',
    '/x.tsx',
    'a/../../x',
    'a\\x.tsx',
    'a//x',
    './x',
    'a\0b',
  ])('rejects unsafe path %s', (p) => expect(safePath(p)).toBe(false));
  it('reports schema, category, engine, provenance and license errors', async () => {
    for (const field of ['category', 'engine', 'origin', 'license', 'author', 'accessibility']) {
      expect((await validateEntries([{ ...item, [field]: null }], root)).errors.join()).toContain(
        'Invalid schema',
      );
    }
  });
  it('requires attribution source for adaptations', async () => {
    expect((await validateEntries([{ ...item, origin: 'adapted' }], root)).errors.join()).toContain(
      'source URL',
    );
  });
  it('rejects duplicates', async () => {
    expect((await validateEntries([item, item], root)).errors.join()).toContain('duplicate');
  });
  it('rejects collisions after flattening filenames',async()=>{
    const result=await validateEntries([{...item,files:['demo.tsx','sub/demo.tsx']}],root);
    expect(result.errors.join()).toContain('duplicate distribution filename');
  });
  it('rejects executable source links and unpinned dependencies',async()=>{
    expect((await validateEntries([{...item,sourceUrl:'javascript:alert(1)'}],root)).errors.join()).toContain('HTTP(S)');
    expect((await validateEntries([{...item,dependencies:{motion:'latest'}}],root)).errors.join()).toContain('exact package version');
  });
  it('rejects missing files', async () => {
    expect(
      (await validateEntries([{ ...item, files: ['missing.tsx'] }], root)).errors.join(),
    ).toContain('missing');
  });
  it('rejects unsafe metadata paths', async () => {
    expect(
      (await validateEntries([{ ...item, files: ['../private.tsx'] }], root)).errors.join(),
    ).toContain('unsafe path');
  });
  it('rejects undeclared package and alias imports', async () => {
    for (const spec of ['motion/react', '@private/pkg', '@/hidden']) {
      await fs.writeFile(path.join(root, 'demo.tsx'), `import thing from '${spec}';`);
      expect((await validateEntries([item], root)).errors.join()).toContain('undeclared import');
    }
  });
  it('requires engine dependency', async () => {
    expect((await validateEntries([{ ...item, engine: 'motion' }], root)).errors.join()).toContain(
      'missing engine dependency',
    );
  });
  it('requires all local imports in the distribution', async () => {
    await fs.writeFile(path.join(root, 'demo.tsx'), "import './missing.css';");
    expect((await validateEntries([item], root)).errors.join()).toContain('unlisted relative');
  });
  it('detects broken and cyclic lineage', async () => {
    expect((await validateEntries([{ ...item, parent: 'absent' }], root)).errors.join()).toContain(
      'broken parent',
    );
    expect(
      (
        await validateEntries(
          [
            { ...item, parent: 'other' },
            { ...item, id: 'other', parent: 'demo' },
          ],
          root,
        )
      ).errors.join(),
    ).toContain('cyclic');
  });
  it('inspects reexports, dynamic imports and require', () => {
    expect(
      importsOf("export * from 'one'; import('two'); require('three'); import(variable)"),
    ).toEqual(['one', 'two', 'three', '__dynamic_import_not_allowed__']);
  });
  it('validates the complete original collection', async () => {
    const result = await loadRegistry();
    expect(result.errors).toEqual([]);
    expect(result.items).toHaveLength(25);
  });
});
describe('contributor scaffold', () => {
  it('creates a discoverable, valid entry and prevents overwrites', async () => {
    await fs.mkdir(path.join(root, 'registry/shared'), { recursive: true });
    for (const f of ['use-animation.ts', 'base.css', 'LICENSE'])
      await fs.copyFile(
        path.join(process.cwd(), 'registry/shared', f),
        path.join(root, 'registry/shared', f),
      );
    await scaffold(root, 'new-button', 'buttons', 'css');
    expect((await loadRegistry(root)).errors).toEqual([]);
    await expect(scaffold(root, 'new-button')).rejects.toThrow('already exists');
    await expect(scaffold(root, '../bad')).rejects.toThrow('kebab');
    await expect(scaffold(root, 'fine', 'bad')).rejects.toThrow('Invalid');
  });
});
