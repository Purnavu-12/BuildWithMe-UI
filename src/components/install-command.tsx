'use client';
import { useState } from 'react';
import { CopyButton } from './copy-button';
import type { Framework } from '@/registry/schema';

const packages: Record<Framework, string> = {
  react: '@buildwithme/react',
  vue: '@buildwithme/vue',
  svelte: '@buildwithme/svelte',
};
export function ComponentInstall({
  id,
  site,
  framework: controlledFramework,
  onFrameworkChange,
}: {
  id: string;
  site: string;
  framework?: Framework;
  onFrameworkChange?: (framework: Framework) => void;
}) {
  const [localFramework, setLocalFramework] = useState<Framework>('react');
  const framework = controlledFramework ?? localFramework;
  const setFramework = onFrameworkChange ?? setLocalFramework;
  const [method, setMethod] = useState<'npm' | 'source'>('source');
  const origin = site || 'https://build-with-me-ui.vercel.app';
  const command =
    method === 'npm'
      ? `pnpm add ${packages[framework]}`
      : `pnpm dlx shadcn@latest add ${origin}/r/${framework}/${id}.json`;
  return (
    <div className="component-install">
      {!controlledFramework ? (
        <div className="source-tabs" aria-label="Installation framework">
          {(['react', 'vue', 'svelte'] as const).map((item) => (
            <button key={item} aria-pressed={framework === item} onClick={() => setFramework(item)}>
              {item}
            </button>
          ))}
        </div>
      ) : null}
      <div className="source-tabs" aria-label="Installation method">
        <button aria-pressed={method === 'npm'} aria-disabled="true" disabled>
          npm · unpublished
        </button>
        <button aria-pressed={method === 'source'} onClick={() => setMethod('source')}>
          own the source
        </button>
      </div>
      <div className="source-toolbar">
        <code tabIndex={0}>{command}</code>
        <CopyButton text={command} label="Copy command" />
      </div>
    </div>
  );
}
