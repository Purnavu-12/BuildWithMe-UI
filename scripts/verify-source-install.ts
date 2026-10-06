import fs from 'node:fs/promises';
import path from 'node:path';
import { build } from 'vite';
import vue from '@vitejs/plugin-vue';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { createInstallFixture } from './install-fixture';

/** Compile the actual public artifacts outside the authored registry tree. */
export async function verifySourceInstall() {
  const root = process.cwd();
  const registry = JSON.parse(
    await fs.readFile(path.join(root, 'public/registry.json'), 'utf8'),
  ) as {
    items: {
      name: string;
      meta: { framework: string };
      files: { target: string; content: string }[];
    }[];
  };
  const fixture = await createInstallFixture(root, 'source-install-');
  for (const framework of ['react', 'vue', 'svelte']) {
    const entries: Record<string, string> = {};
    const directory = path.join(fixture, framework);
    for (const item of registry.items.filter((item) => item.meta.framework === framework)) {
      for (const file of item.files) {
        const destination = path.resolve(directory, file.target);
        if (!destination.startsWith(directory + path.sep))
          throw new Error('Invalid artifact target');
        await fs.mkdir(path.dirname(destination), { recursive: true });
        await fs.writeFile(destination, file.content);
      }
      const extension =
        framework === 'react' ? 'react.tsx' : framework === 'vue' ? 'vue.vue' : 'svelte.svelte';
      entries[item.name] = path.join(directory, 'components/buildwithme', item.name, extension);
    }
    await build({
      configFile: false,
      root: directory,
      publicDir: false,
      logLevel: 'warn',
      plugins: framework === 'vue' ? [vue()] : framework === 'svelte' ? [svelte()] : [],
      build: {
        outDir: path.join(directory, 'dist'),
        lib: { entry: entries, formats: ['es'] },
        rollupOptions: {
          external: [
            'react',
            'react/jsx-runtime',
            'react-dom',
            'motion/react',
            'animejs',
            'vue',
            /^svelte(?:\/|$)/,
          ],
          output: { entryFileNames: '[name].js' },
        },
      },
    });
  }
  return { fixture, artifacts: registry.items.length };
}
