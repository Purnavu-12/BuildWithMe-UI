// Adapted from https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/folder-preview.tsx under MIT. Copyright (c) Ashutoshx7.
'use client';
import { useAnimation } from '../../shared/use-animation';
import '../../shared/base.css';
import './folder-preview.css';

const defaultFiles = ['manifest.ts', 'react.tsx', 'styles.css'];
export default function FolderPreview({
  label = 'Folder preview',
  paused = false,
  files = defaultFiles,
}: {
  label?: string;
  paused?: boolean;
  files?: string[];
}) {
  const { ref, active } = useAnimation(paused);
  return (
    <div ref={ref} className="bw-demo" data-active={active}>
      <details className="adapt-folder">
        <summary>
          {label}
          <span>{files.length} files</span>
        </summary>
        <div>
          <i aria-hidden="true" />
          <i aria-hidden="true" />
          <i aria-hidden="true" />
          <ul className="bw-folder-files">
            {files.map((file, index) => (
              <li key={`${file}-${index}`}>{file}</li>
            ))}
          </ul>
        </div>
      </details>
    </div>
  );
}
