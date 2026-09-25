'use client';
import { useState } from 'react';
import { CopyButton } from '../../../../packages/ui/src/copy-button';
export function SourceViewer({ files }: { files: { path: string; content: string }[] }) {
  const [selected, setSelected] = useState(0);
  return (
    <div className="source-viewer">
      <div className="source-toolbar">
        <label>
          <span className="sr-only">Source file</span>
          <select
            aria-label="Source file"
            value={selected}
            onChange={(e) => setSelected(Number(e.target.value))}
          >
            {files.map((file, i) => (
              <option key={file.path} value={i}>
                {file.path.split('/').at(-1)}
              </option>
            ))}
          </select>
        </label>
        <CopyButton text={files[selected].content} label="Copy source" />
      </div>
      <pre tabIndex={0}>
        <code>{files[selected].content}</code>
      </pre>
    </div>
  );
}
