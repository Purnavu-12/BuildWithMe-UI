'use client';
import { useState } from 'react';
import { CopyButton } from './copy-button';
import type { Framework } from '@/registry/schema';

const packages: Record<Framework, string> = { react: '@buildwithme/react', vue: '@buildwithme/vue', svelte: '@buildwithme/svelte' };
export function ComponentInstall({ id, site }: { id: string; site: string }) {
  const [framework, setFramework] = useState<Framework>('react');
  const [method, setMethod] = useState<'npm' | 'source'>('npm');
  const origin = site || 'http://localhost:3000';
  const command = method === 'npm' ? `pnpm add ${packages[framework]}` : `pnpm dlx shadcn@latest add ${origin}/r/${framework}/${id}.json`;
  return <div className="component-install"><div className="source-tabs">{(['react','vue','svelte'] as const).map((item)=><button key={item} aria-selected={framework===item} onClick={()=>setFramework(item)}>{item}</button>)}</div><div className="source-tabs"><button aria-selected={method==='npm'} onClick={()=>setMethod('npm')}>npm package</button><button aria-selected={method==='source'} onClick={()=>setMethod('source')}>own the source</button></div><div className="source-toolbar"><code>{command}</code><CopyButton text={command} label="Copy command" /></div></div>;
}
