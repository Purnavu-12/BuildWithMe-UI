'use client';
import { useState } from 'react';
import { CopyButton } from './copy-button';
import type { Framework } from '@/registry/schema';

export function SourceViewer({ sources }: { sources: Record<Framework, { path: string; content: string }[]> }) {
  const [framework, setFramework] = useState<Framework>('react');
  const files = sources[framework];
  return (
    <div className="source-viewer">
      <div className="source-tabs" role="tablist" aria-label="Source framework">
        {(['react', 'vue', 'svelte'] as const).map((item) => <button key={item} role="tab" aria-selected={item === framework} onClick={() => setFramework(item)}>{item}</button>)}
      </div>
      <div className="source-toolbar"><span>{files[0].path.split('/').at(-1)}</span><CopyButton text={files[0].content} label="Copy source" /></div>
      <pre className="source-block" tabIndex={0}><code>{files[0].content}</code></pre>
    </div>
  );
}
