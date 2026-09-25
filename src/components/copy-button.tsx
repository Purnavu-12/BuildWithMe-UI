'use client';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
  async function copy() {
    try { await navigator.clipboard.writeText(text); setState('copied'); window.setTimeout(() => setState('idle'), 1600); }
    catch { setState('failed'); }
  }
  return <button className="copy-button" onClick={copy} aria-label={label}>{state === 'copied' ? <Check size={14} /> : <Copy size={14} />}<span>{state === 'copied' ? 'Copied' : state === 'failed' ? 'Copy failed' : label}</span></button>;
}
