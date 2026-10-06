'use client';

import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { CopyButton } from './copy-button';
import { frameworks, type Framework } from '@/registry/schema';

export type SourceFiles = Record<Framework, { path: string; content: string; target?: string }[]>;

export function SourceViewer({
  sources,
  framework: controlledFramework,
  onFrameworkChange,
  usage,
}: {
  sources: SourceFiles;
  framework?: Framework;
  onFrameworkChange?: (framework: Framework) => void;
  usage?: string;
}) {
  const [localFramework, setLocalFramework] = useState<Framework>('react');
  const [selectedFile, setSelectedFile] = useState(0);
  const framework = controlledFramework ?? localFramework;
  const files = sources[framework];
  const file = files[Math.min(selectedFile, files.length - 1)];
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function choose(next: Framework) {
    setSelectedFile(0);
    if (onFrameworkChange) onFrameworkChange(next);
    else setLocalFramework(next);
  }
  function navigate(event: KeyboardEvent<HTMLButtonElement>, current: number) {
    const next =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? 2
          : event.key === 'ArrowRight'
            ? (current + 1) % 3
            : event.key === 'ArrowLeft'
              ? (current + 2) % 3
              : -1;
    if (next < 0) return;
    event.preventDefault();
    choose(frameworks[next]);
    tabs.current[next]?.focus();
  }
  return (
    <div className="source-viewer">
      {controlledFramework === undefined ? (
        <div className="source-tabs" role="tablist" aria-label="Source framework">
          {frameworks.map((item, index) => (
            <button
              key={item}
              ref={(element) => {
                tabs.current[index] = element;
              }}
              id={`${id}-${item}`}
              role="tab"
              aria-selected={item === framework}
              aria-controls={`${id}-panel`}
              tabIndex={item === framework ? 0 : -1}
              onClick={() => choose(item)}
              onKeyDown={(event) => navigate(event, index)}
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}
      <div
        id={`${id}-panel`}
        role={controlledFramework === undefined ? 'tabpanel' : 'region'}
        aria-labelledby={controlledFramework === undefined ? `${id}-${framework}` : undefined}
        aria-label={controlledFramework === undefined ? undefined : `${framework} source files`}
      >
        {usage ? (
          <div className="source-usage">
            <div className="source-toolbar">
              <span>Usage / source installation</span>
              <CopyButton text={usage} label="Copy usage" />
            </div>
            <pre tabIndex={0}>
              <code>{usage}</code>
            </pre>
          </div>
        ) : null}
        <div className="source-file-picker" aria-label="Included source files">
          {files.map((entry, index) => (
            <button
              key={entry.path}
              type="button"
              aria-pressed={index === selectedFile}
              onClick={() => setSelectedFile(index)}
            >
              {(entry.target ?? entry.path).split('/').at(-1)}
            </button>
          ))}
        </div>
        {file ? (
          <>
            <div className="source-toolbar">
              <span title={file.path}>{file.target ?? file.path}</span>
              <CopyButton text={file.content} label="Copy source" />
            </div>
            <pre className="source-block" tabIndex={0}>
              <code>{file.content}</code>
            </pre>
          </>
        ) : (
          <p role="status">No source files are available for this framework.</p>
        )}
        <p className="source-closure-note">
          Install the registry item to receive all {files.length} files and their declared
          dependencies. Copying one file may require the other files shown here.
        </p>
      </div>
    </div>
  );
}
