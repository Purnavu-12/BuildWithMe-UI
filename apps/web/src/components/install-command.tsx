'use client';
import { useEffect, useState } from 'react';
import { CopyButton } from '../../../../packages/ui/src/copy-button';
export function InstallCommand({ id, site }: { id: string; site: string }) {
  const [origin, setOrigin] = useState(site);
  useEffect(() => {
    if (!site) setOrigin(window.location.origin);
  }, [site]);
  const command = `pnpm dlx shadcn@latest add ${origin || '<your-site-url>'}/r/${id}.json`;
  return (
    <div className="install-command">
      <code>{command}</code>
      <CopyButton text={command} label="Copy command" />
    </div>
  );
}
