'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import type { Framework } from '@/registry/schema';

export function InstallSwitcher({ compact = false }: { compact?: boolean }) {
  const [framework, setFramework] = useState<Framework>('react');
  const [copied, setCopied] = useState(false);
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://build-with-me-ui.vercel.app';
  const command = `pnpm dlx shadcn@latest add ${origin}/r/${framework}/magnetic-button.json`;
  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }
  return (
    <div className={compact ? 'install-switcher compact' : 'install-switcher'}>
      <div className="install-tabs" role="tablist" aria-label="Choose framework">
        {(['react', 'vue', 'svelte'] as const).map((item) => (
          <button
            key={item}
            role="tab"
            aria-selected={framework === item}
            onClick={() => setFramework(item)}
          >
            {item === 'react' ? 'React' : item[0].toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>
      <div className="install-availability">
        <i /> SOURCE REGISTRY · AVAILABLE <span>NPM · UNPUBLISHED</span>
      </div>
      <button
        className="install-command"
        onClick={copy}
        aria-label={`Copy source installation command for ${framework}`}
      >
        <code>
          <span>$</span> {command}
        </code>
        {copied ? <Check size={15} /> : <Copy size={15} />}
      </button>
      <span className="copy-status" role="status" aria-live="polite">
        {copied ? 'Copied' : ''}
      </span>
    </div>
  );
}
