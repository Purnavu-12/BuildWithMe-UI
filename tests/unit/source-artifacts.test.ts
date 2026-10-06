import { afterEach, describe, expect, it } from 'vitest';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { collectSourceFiles, sourceImports } from '../../scripts/source-artifacts';

const roots: string[] = [];
afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => fs.rm(root, { recursive: true, force: true })));
});

async function fixture(files: Record<string, string>) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'bwm-artifact-'));
  roots.push(root);
  for (const [name, content] of Object.entries(files)) {
    const target = path.join(root, name);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, content);
  }
  return root;
}

describe('independent source installation', () => {
  it('does not treat displayed code or dynamic image bindings as dependency imports', () => {
    expect(
      sourceImports(`const example = 'import Tabs from "./example"';\nimport './actual.css';`),
    ).toEqual(['./actual.css']);
    expect(
      sourceImports(
        `<script setup>import image from './image';</script><template><img :src="image.src" /></template>`,
      ),
    ).toEqual(['./image']);
  });
  it('finds side-effect CSS, type imports, dynamic imports, and SFC style sources', () => {
    expect(
      sourceImports(
        "import './base.css'; import type { Props } from './props'; import('./extra'); <style src='./theme.css'></style>",
      ),
    ).toEqual(['./base.css', './props', './extra', './theme.css']);
  });

  it('includes transitive styles and helpers and rewrites imports at every level', async () => {
    const root = await fixture({
      'designs/example/vue.vue':
        "<script setup lang='ts'>import { observe } from '../../shared/lifecycle'; import './example.css';</script><template><button>Try</button></template>",
      'designs/example/example.css':
        "@import '../../shared/base.css'; .example { color: inherit; }",
      'shared/lifecycle.ts':
        "import type { Options } from './options'; export function observe(_: Options) {}",
      'shared/options.ts': 'export interface Options { paused: boolean }',
      'shared/base.css': '.example button { font: inherit; }',
    });
    const files = await collectSourceFiles(root, 'designs/example/vue.vue');
    expect(files.map((file) => file.name)).toEqual([
      'vue.vue',
      'lifecycle.ts',
      'options.ts',
      'example.css',
      'base.css',
    ]);
    expect(files[0].content).toContain("from './lifecycle'");
    expect(files.find((file) => file.name === 'example.css')?.content).toContain(
      "@import './base.css'",
    );
    expect(files.every((file) => !file.content.includes('../../shared'))).toBe(true);
  });

  it('rejects incomplete dependency closures and filename collisions', async () => {
    const root = await fixture({
      'designs/example/react.tsx': "import './missing.css'; export default function Example() {}",
    });
    await expect(collectSourceFiles(root, 'designs/example/react.tsx')).rejects.toThrow(
      'missing.css',
    );
    await fs.writeFile(
      path.join(root, 'designs/example/react.tsx'),
      "import '../../shared/one.ts'; import './one.ts'",
    );
    await fs.mkdir(path.join(root, 'shared'));
    await fs.writeFile(path.join(root, 'shared/one.ts'), 'export const one = 1');
    await fs.writeFile(path.join(root, 'designs/example/one.ts'), 'export const one = 2');
    await expect(collectSourceFiles(root, 'designs/example/react.tsx')).rejects.toThrow(
      'collision',
    );
  });

  it('rejects dependencies escaping the registry boundary', async () => {
    const root = await fixture({ 'designs/example/react.tsx': "import '../../../../private.ts'" });
    await expect(collectSourceFiles(root, 'designs/example/react.tsx')).rejects.toThrow('outside');
  });

  it('embeds original raster assets as portable source modules without a network dependency', async () => {
    const root = await fixture({
      'designs/example/assets.ts':
        "import image from '../../shared/signal.webp'; export const src = image;",
      'shared/signal.webp': 'RIFF-demo',
    });
    const files = await collectSourceFiles(root, 'designs/example/assets.ts');
    expect(files[0].content).toContain("from './signal-image'");
    expect(files[1].name).toBe('signal-image.ts');
    expect(files[1].content).toContain('data:image/webp;base64,');
  });
});
