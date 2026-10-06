'use client';
import { Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(text);
      setState('copied');
      timer.current = setTimeout(() => setState('idle'), 1600);
    } catch {
      setState('failed');
    }
  }
  return (
    <span className="copy-control">
      <button type="button" className="copy-button" onClick={copy} aria-label={label}>
        {state === 'copied' ? <Check size={14} /> : <Copy size={14} />}
        <span>{state === 'copied' ? 'Copied' : label}</span>
      </button>
      <span className={state === 'failed' ? 'copy-failure' : 'sr-only'} role="status">
        {state === 'copied'
          ? 'Copied to clipboard.'
          : state === 'failed'
            ? 'Clipboard unavailable. Focus the text below and copy it manually, or try again.'
            : ''}
      </span>
      {state === 'failed' ? (
        <textarea
          className="copy-manual"
          aria-label="Text to copy manually"
          readOnly
          value={text}
          onFocus={(event) => event.currentTarget.select()}
        />
      ) : null}
    </span>
  );
}
