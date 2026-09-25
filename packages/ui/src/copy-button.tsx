'use client';
import { useState } from 'react';
export function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [status, setStatus] = useState('');
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus('Copied');
    } catch {
      setStatus('Copy unavailable. Select the code and copy manually.');
    }
  }
  return (
    <span className="copy-control">
      <button className="small-button" onClick={copy} aria-label={`${label} to clipboard`}>
        {status === 'Copied' ? 'Copied ✓' : label}
      </button>
      <span className={status === 'Copied' ? 'sr-only' : 'copy-error'} role="status">
        {status}
      </span>
    </span>
  );
}
