import Link from 'next/link';
import { ArrowUpRight, BookOpen, GitPullRequest } from 'lucide-react';
import { ThemeSelect } from './theme-provider';
import { repositoryUrl } from '@/lib/registry';

export function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="BuildWithMe UI home">
        <span className="brand-glyph" aria-hidden="true"><i /><i /></span>
        <span>BUILDWITHME</span><small>/ UI</small>
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/components">Components</Link>
        <Link href="/ecosystem">Ecosystem</Link>
        <Link href="/docs/installation">Docs</Link>
        <Link href="/contribute">Contribute</Link>
      </nav>
      <div className="header-actions">
        <details className="mobile-navigation">
          <summary>Menu</summary>
          <div>
            <Link href="/components">Components</Link><Link href="/ecosystem">Ecosystem</Link>
            <Link href="/docs/installation">Documentation</Link><Link href="/contribute">Contribute</Link>
          </div>
        </details>
        <ThemeSelect />
        {repositoryUrl ? (
          <a className="header-link" href={repositoryUrl} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={12} /></a>
        ) : (
          <Link className="header-link" href="/contribute">Open source <ArrowUpRight size={12} /></Link>
        )}
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div><span className="brand-glyph" aria-hidden="true"><i /><i /></span><strong>BUILDWITHME / UI</strong></div>
      <p>Open-source components for React, Vue, and Svelte.<br />MIT licensed. Built to be built upon.</p>
      <div className="footer-links"><Link href="/components">Components</Link><Link href="/docs/installation">Documentation</Link><Link href="/contribute">Contribute</Link></div>
      <span className="footer-mark" aria-hidden="true">BWM<br />/UI</span>
    </footer>
  );
}

export function DocsNav() {
  return (
    <nav className="docs-nav" aria-label="Documentation">
      <p className="mono-label">HANDBOOK / 02</p>
      <Link href="/docs/installation"><BookOpen size={15} /> Installation</Link>
      <Link href="/docs/frameworks">Frameworks</Link>
      <Link href="/docs/customization">Customization</Link>
      <Link href="/docs/contributing"><GitPullRequest size={15} /> Contributing</Link>
      <Link href="/docs/provenance">Attribution & provenance</Link>
      <Link href="/docs/agents">Working with agents</Link>
      <Link href="/components">← Components</Link>
    </nav>
  );
}
