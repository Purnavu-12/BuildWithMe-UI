import fs from 'node:fs/promises';
import path from 'node:path';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pnpm = process.env.npm_execpath;
if (!pnpm) throw new Error('Run with pnpm test:install.');
async function run(args: string[], cwd: string) {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(process.execPath, [pnpm!, ...args], {
      cwd,
      stdio: 'inherit',
      env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
    });
    child.on('error', reject);
    child.on('exit', (code) =>
      code === 0 ? resolve() : reject(new Error(`${args.join(' ')} failed (${code})`)),
    );
  });
}
await run(['registry:build'], root);
const registry = JSON.parse(
  await fs.readFile(path.join(root, 'apps/web/public/registry.json'), 'utf8'),
) as {
  items: {
    name: string;
    dependencies: string[];
    files: { path: string; target: string; content: string }[];
  }[];
};
await fs.mkdir(path.join(root, 'tmp'), { recursive: true });
const fixture = await fs.mkdtemp(path.join(root, 'tmp/install-smoke-'));
const write = async (file: string, content: string) => {
  const target = path.join(fixture, file);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, content);
};
await write(
  'package.json',
  JSON.stringify({
    name: 'buildwithme-install-smoke',
    private: true,
    version: '0.0.0',
    packageManager: 'pnpm@10.28.1',
    scripts: { build: 'next build' },
    dependencies: {
      next: '16.3.6',
      react: '19.3.0',
      'react-dom': '19.3.0',
      clsx: '2.1.1',
      'tailwind-merge': '3.5.0',
      'lucide-react': '0.468.0',
    },
    devDependencies: {
      typescript: '5.9.3',
      '@types/node': '22.19.1',
      '@types/react': '19.2.7',
      '@types/react-dom': '19.2.3',
      tailwindcss: '4.3.3',
      '@tailwindcss/postcss': '4.3.3',
    },
  }),
);
await write(
  'pnpm-workspace.yaml',
  'packages: []\nonlyBuiltDependencies:\n  - sharp\n  - esbuild\n',
);
await write(
  'tsconfig.json',
  JSON.stringify({
    compilerOptions: {
      target: 'ES2022',
      lib: ['dom', 'dom.iterable', 'esnext'],
      strict: true,
      noEmit: true,
      module: 'esnext',
      moduleResolution: 'bundler',
      jsx: 'react-jsx',
      esModuleInterop: true,
      skipLibCheck: true,
      resolveJsonModule: true,
      plugins: [{ name: 'next' }],
      paths: { '@/*': ['./*'] },
    },
    include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
    exclude: ['node_modules'],
  }),
);
await write(
  'components.json',
  JSON.stringify({
    $schema: 'https://ui.shadcn.com/schema.json',
    style: 'new-york',
    rsc: true,
    tsx: true,
    tailwind: { config: '', css: 'app/globals.css', baseColor: 'neutral', cssVariables: true },
    aliases: {
      components: '@/components',
      utils: '@/lib/utils',
      ui: '@/components/ui',
      lib: '@/lib',
      hooks: '@/hooks',
    },
  }),
);
await write('next.config.mjs', 'export default {turbopack:{root:process.cwd()}};\n');
await write('postcss.config.mjs', "export default {plugins:{'@tailwindcss/postcss':{}}};\n");
await write(
  'app/globals.css',
  "@import 'tailwindcss';\nbody {background:#10110f;color:#eee;font-family:sans-serif}main{max-width:1000px;margin:auto}section{padding:25px;border-bottom:1px solid #444}\n",
);
await write(
  'lib/utils.ts',
  "import {clsx,type ClassValue} from 'clsx';import {twMerge} from 'tailwind-merge';export function cn(...inputs:ClassValue[]){return twMerge(clsx(inputs))}\n",
);
await write(
  'app/layout.tsx',
  "import './globals.css';export default function Layout({children}:{children:React.ReactNode}){return <html lang='en'><body>{children}</body></html>}\n",
);
const server = createServer(async (req, res) => {
  const match = /^\/r\/([a-z0-9-]+)\.json$/.exec(req.url ?? '');
  const item = match ? registry.items.find((i) => i.name === match[1]) : undefined;
  if (!item) {
    res.writeHead(404);
    res.end();
    return;
  }
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(item));
});
await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
const address = server.address();
if (!address || typeof address === 'string') throw new Error('No fixture registry address');
try {
  await run(['install', '--no-frozen-lockfile'], fixture);
  await run(
    [
      'dlx',
      'shadcn@4.21.0',
      'add',
      ...registry.items.map((i) => `http://127.0.0.1:${address.port}/r/${i.name}.json`),
      '--yes',
    ],
    fixture,
  );
  for (const item of registry.items) {
    for (const file of item.files) {
      const installed = await fs.readFile(path.join(fixture, file.target), 'utf8');
      if (installed.includes('../../shared/') || installed.includes('@buildwithme/'))
        throw new Error(`Workspace leak in ${file.target}`);
      if (!installed.trim()) throw new Error(`Empty source: ${file.target}`);
    }
  }
  await write(
    'app/page.tsx',
    `${registry.items.map((item, i) => `import Component${i} from '@/components/buildwithme/${item.name}/${item.name}';`).join('\n')}\nexport default function Page(){return <main><h1>Clean installation: 25 components</h1>${registry.items.map((item, i) => `<section><h2>${item.name}</h2><Component${i}/></section>`).join('')}</main>}`,
  );
  await run(['build'], fixture);
  await fs.writeFile(
    path.join(root, 'tmp/install-smoke-result.json'),
    JSON.stringify(
      { fixture, components: registry.items.length, cli: 'shadcn@4.21.0', passed: true },
      null,
      2,
    ),
  );
  console.log(
    `PASS: ${registry.items.length} components installed through shadcn and built in ${fixture}`,
  );
} finally {
  server.close();
}
