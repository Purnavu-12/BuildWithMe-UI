'use client';

import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { frameworks, type Framework } from '@/registry/schema';
import { FrameworkPreview } from './framework-preview';
import { Preview } from './preview';

/** A real runtime is loaded only when the visitor requests that framework. */
export function FrameworkExperiment({ id }: { id: string }) {
  const [framework, setFramework] = useState<Framework>('react');
  const uid = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? 2
          : event.key === 'ArrowRight'
            ? (index + 1) % 3
            : event.key === 'ArrowLeft'
              ? (index + 2) % 3
              : -1;
    if (next < 0) return;
    event.preventDefault();
    setFramework(frameworks[next]);
    buttons.current[next]?.focus();
  }
  return (
    <div className="framework-experiment">
      <div className="source-tabs" role="tablist" aria-label="Story preview framework">
        {frameworks.map((item, index) => (
          <button
            key={item}
            ref={(element) => {
              buttons.current[index] = element;
            }}
            type="button"
            id={uid + '-' + item}
            role="tab"
            aria-selected={framework === item}
            aria-controls={uid + '-panel'}
            tabIndex={framework === item ? 0 : -1}
            onClick={() => setFramework(item)}
            onKeyDown={(event) => navigate(event, index)}
          >
            {item}
          </button>
        ))}
      </div>
      <div id={uid + '-panel'} role="tabpanel" aria-labelledby={uid + '-' + framework}>
        {framework === 'react' ? (
          <Preview key={framework} id={id} controls />
        ) : (
          <FrameworkPreview key={framework} id={id} framework={framework} />
        )}
      </div>
    </div>
  );
}
