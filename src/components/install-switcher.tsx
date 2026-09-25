'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import type { Framework } from '@/registry/schema';

const commands: Record<Framework, string> = {
  react: 'pnpm add @buildwithme/react',
  vue: 'pnpm add @buildwithme/vue',
  svelte: 'pnpm add @buildwithme/svelte',
};

export function InstallSwitcher({ compact = false }: { compact?: boolean }) {
  const [framework, setFramework] = useState<Framework>('react');
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(commands[framework]);
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
          <button key={item} role="tab" aria-selected={framework === item} onClick={() => setFramework(item)}>
            {item === 'react' ? 'React' : item[0].toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>
      <button className="install-command" onClick={copy} aria-label={`Copy ${commands[framework]}`}>
        <code><span>$</span> {commands[framework]}</code>
        {copied ? <Check size={15} /> : <Copy size={15} />}
      </button>
      <span className="copy-status" role="status" aria-live="polite">{copied ? 'Copied' : ''}</span>
    </div>
  );
}
