'use client';

import Link from 'next/link';
import { FileCode2, FolderOpen } from 'lucide-react';
import { useState } from 'react';
import { frameworks, type Framework } from '@/registry/schema';
import { ComponentInstall } from './install-command';

export function SourceOwnership({
  id,
  site,
  files,
}: {
  id: string;
  site: string;
  files: Record<Framework, string[]>;
}) {
  const [framework, setFramework] = useState<Framework>('react');
  return (
    <div className="source-ownership">
      <div className="source-tabs" role="group" aria-label="Owned source framework">
        {frameworks.map((item) => (
          <button
            type="button"
            key={item}
            aria-pressed={item === framework}
            onClick={() => setFramework(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <details className="source-object" open>
        <summary>
          <FolderOpen size={19} />
          <strong>{id} /</strong>
          <span>{files[framework].length} files</span>
        </summary>
        <ul>
          {files[framework].map((file) => (
            <li key={file}>
              <FileCode2 size={16} />
              <code>{file}</code>
            </li>
          ))}
        </ul>
      </details>
      <ComponentInstall id={id} site={site} framework={framework} />
      <Link
        href={'/components/' + id + (framework === 'react' ? '' : '?framework=' + framework)}
        className="source-object-link"
      >
        Read every file ↗
      </Link>
    </div>
  );
}
