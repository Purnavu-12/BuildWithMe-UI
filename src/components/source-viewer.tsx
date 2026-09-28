'use client';

import { useRef, useState } from 'react';
import { CopyButton } from './copy-button';
import type { Framework } from '@/registry/schema';

const FRAMEWORKS: readonly Framework[] = ['react', 'vue', 'svelte'];

export function SourceViewer({ sources }: { sources: Record<Framework, { path: string; content: string }[]> }) {
  const [framework, setFramework] = useState<Framework>('react');
  const tabRefs = useRef<Record<Framework, HTMLButtonElement | null>>({
    react: null,
    vue: null,
    svelte: null,
  });

  const files = sources[framework];
  const activeTabId = `source-tab-${framework}`;
  const tabpanelId = 'source-tabpanel';

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, item: Framework) {
    const currentIndex = FRAMEWORKS.indexOf(item);
    let nextIndex = -1;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      nextIndex = (currentIndex + 1) % FRAMEWORKS.length;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      nextIndex = (currentIndex - 1 + FRAMEWORKS.length) % FRAMEWORKS.length;
    } else if (event.key === 'Home') {
      event.preventDefault();
      nextIndex = 0;
    } else if (event.key === 'End') {
      event.preventDefault();
      nextIndex = FRAMEWORKS.length - 1;
    }

    if (nextIndex !== -1) {
      const nextFramework = FRAMEWORKS[nextIndex];
      setFramework(nextFramework);
      tabRefs.current[nextFramework]?.focus();
    }
  }

  return (
    <div className="source-viewer">
      <div className="source-tabs" role="tablist" aria-label="Source framework">
        {FRAMEWORKS.map((item) => (
          <button
            key={item}
            id={`source-tab-${item}`}
            ref={(el) => {
              tabRefs.current[item] = el;
            }}
            role="tab"
            aria-selected={item === framework}
            aria-controls={tabpanelId}
            tabIndex={item === framework ? 0 : -1}
            onClick={() => setFramework(item)}
            onKeyDown={(e) => handleKeyDown(e, item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div id={tabpanelId} role="tabpanel" aria-labelledby={activeTabId}>
        <div className="source-toolbar">
          <span>{files[0].path.split('/').at(-1)}</span>
          <CopyButton text={files[0].content} label="Copy source" />
        </div>
        <pre className="source-block" tabIndex={0}>
          <code>{files[0].content}</code>
        </pre>
      </div>
    </div>
  );
}
