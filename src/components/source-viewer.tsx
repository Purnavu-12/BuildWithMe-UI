'use client';

import { useId, useRef, useState } from 'react';
import { CopyButton } from './copy-button';
import type { Framework } from '@/registry/schema';

const frameworks = ['react', 'vue', 'svelte'] as const;

export function SourceViewer({
  sources,
}: {
  sources: Record<Framework, { path: string; content: string }[]>;
}) {
  const [framework, setFramework] = useState<Framework>('react');
  const files = sources[framework];

  const id = useId();
  const panelId = `${id}-source-panel`;

  const tabRefs = useRef<Record<Framework, HTMLButtonElement | null>>({
    react: null,
    vue: null,
    svelte: null,
  });

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    currentFramework: Framework,
  ) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      return;
    }

    event.preventDefault();

    const currentIndex = frameworks.indexOf(currentFramework);
    const direction = event.key === 'ArrowRight' ? 1 : -1;

    const nextIndex =
      (currentIndex + direction + frameworks.length) % frameworks.length;

    const nextFramework = frameworks[nextIndex];

    setFramework(nextFramework);
    tabRefs.current[nextFramework]?.focus();
  }

  return (
    <div className="source-viewer">
      <div
        className="source-tabs"
        role="tablist"
        aria-label="Source framework"
      >
        {frameworks.map((item) => {
          const tabId = `${id}-source-tab-${item}`;
          const isActive = item === framework;

          return (
            <button
              key={item}
              ref={(element) => {
                tabRefs.current[item] = element;
              }}
              id={tabId}
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setFramework(item)}
              onKeyDown={(event) => handleKeyDown(event, item)}
            >
              {item}
            </button>
          );
        })}
      </div>

      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={`${id}-source-tab-${framework}`}
      >
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