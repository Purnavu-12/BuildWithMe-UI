import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { compile } from 'svelte/compiler';

const root = process.cwd();
const pnpmExecutable = process.env.npm_execpath;
if (!pnpmExecutable) throw new Error('Run this script through pnpm.');
const pnpmPath: string = pnpmExecutable;
async function run(args: string[], cwd = root) {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(process.execPath, [pnpmPath, ...args], {
      cwd,
      stdio: 'inherit',
      env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
    });
    child.on('error', reject);
    child.on('exit', (code: number | null) => code === 0 ? resolve() : reject(new Error(`${args.join(' ')} failed (${code})`)));
  });
}

await run(['packages:build']);
const registry = JSON.parse(await fs.readFile(path.join(root,'public','registry.json'),'utf8')) as {items:{name:string;files:{content:string}[];meta:{framework:string}}[]};
if(registry.items.length!==120)throw new Error(`Expected 120 registry artifacts; received ${registry.items.length}`);
for(const item of registry.items){for(const file of item.files){if(!file.content.trim())throw new Error(`${item.name}/${item.meta.framework}: empty source`);if(file.content.includes('@buildwithme/')||file.content.includes('../../shared/'))throw new Error(`${item.name}/${item.meta.framework}: workspace path leaked`)}}

const packages = ['react','vue','svelte'];
for(const framework of packages){const directory=path.join(root,'.release',framework);const pkg=JSON.parse(await fs.readFile(path.join(directory,'package.json'),'utf8')) as {exports:Record<string,unknown>};if(Object.keys(pkg.exports).filter((key)=>key!=='.'&&key!=='./styles.css').length!==40)throw new Error(`${framework}: package parity failed`)}

const svelteDist=path.join(root,'.release','svelte','dist');
for(const file of (await fs.readdir(svelteDist)).filter((name)=>name.endsWith('.svelte'))){const source=await fs.readFile(path.join(svelteDist,file),'utf8');compile(source,{filename:file,generate:'client'});}

const fixture=await fs.mkdtemp(path.join(root,'tmp','react-package-'));
await fs.writeFile(path.join(fixture,'package.json'),JSON.stringify({name:'buildwithme-react-smoke',private:true,scripts:{build:'next build'},dependencies:{'@buildwithme/react':`file:${path.join(root,'.release','react').replaceAll('\\','/')}`,next:'16.3.6',react:'19.3.0','react-dom':'19.3.0',motion:'13.4.4',animejs:'4.5.0'},devDependencies:{typescript:'5.9.3','@types/react':'19.2.7','@types/react-dom':'19.2.3','@types/node':'22.19.1'}}));
await fs.mkdir(path.join(fixture,'app'),{recursive:true});
await fs.writeFile(path.join(fixture,'app','layout.tsx'),"import '@buildwithme/react/styles.css';export default function Layout({children}:{children:React.ReactNode}){return <html><body>{children}</body></html>}");
await fs.writeFile(path.join(fixture,'app','page.tsx'),"import * as UI from '@buildwithme/react';export default function Page(){return <main><h1>40 components installed</h1>{Object.entries(UI).map(([name,Component])=><section key={name}><h2>{name}</h2><Component /></section>)}</main>}");
await fs.writeFile(path.join(fixture,'tsconfig.json'),JSON.stringify({compilerOptions:{target:'ES2022',lib:['dom','esnext'],strict:true,noEmit:true,module:'esnext',moduleResolution:'bundler',jsx:'react-jsx',skipLibCheck:true,plugins:[{name:'next'}]},include:['**/*.ts','**/*.tsx','.next/types/**/*.ts'],exclude:['node_modules']}));
await fs.writeFile(path.join(fixture,'next.config.mjs'),"export default {turbopack:{root:process.cwd()}};");
await run(['install','--no-frozen-lockfile'],fixture);
await run(['build'],fixture);
await fs.writeFile(path.join(root,'tmp','install-smoke-result.json'),JSON.stringify({designs:40,sourceArtifacts:120,packages,reactFixture:fixture,passed:true},null,2));
console.log('PASS: 120 source artifacts, three 40-export packages, Svelte compilation, and a clean Next.js package build.');
