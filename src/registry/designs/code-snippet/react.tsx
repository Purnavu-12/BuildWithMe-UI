// Adapted from https://github.com/vercel/examples/blob/main/internal/packages/ui/src/snippet.tsx under MIT. Copyright (c) Vercel, Inc..
'use client';
import { useState } from 'react';
import { useAnimation } from '../../shared/use-animation';
import '../../shared/base.css';
import './code-snippet.css';
export default function CodeSnippet({
  label = 'Code snippet',
  paused = false,
}: {
  label?: string;
  paused?: boolean;
}) {
  const { ref, active } = useAnimation(paused);
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const code = 'import AnimatedTabs from "./animated-tabs/react";\n<AnimatedTabs />';
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setFailed(false);
    } catch {
      setFailed(true);
    }
  }
  return (
    <div ref={ref} className="bw-demo" data-active={active}>
      <figure className="adapt-snippet">
        <figcaption>
          {label}
          <span>TSX</span>
        </figcaption>
        <pre tabIndex={0}>
          <code>{code}</code>
        </pre>
        <button type="button" onClick={copy}>
          {copied ? 'Copied' : 'Copy source'}
        </button>
        {failed ? (
          <label>
            Clipboard unavailable. Copy manually.
            <textarea readOnly value={code} onFocus={(event) => event.currentTarget.select()} />
          </label>
        ) : null}
      </figure>
    </div>
  );
}
