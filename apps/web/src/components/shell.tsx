import Link from 'next/link';
import { ArrowUpRight, Braces, BookOpen, GitPullRequest } from 'lucide-react';
import { ThemeSelect } from './theme-provider';
import { repositoryUrl } from '@/lib/registry';
export function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="BuildWithMe UI home">
        <span className="brand-mark">
          <Braces size={21} />
        </span>
        <span>
          buildwithme<span className="brand-suffix">/ui</span>
        </span>
        <span className="version">v0.1</span>
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/components">Components</Link>
        <Link href="/docs/installation">Docs</Link>
        <Link href="/contribute" className="nav-contribute">
          Contribute <ArrowUpRight size={13} />
        </Link>
      </nav>
      <div className="header-actions">
        <details className="mobile-navigation">
          <summary>Menu</summary>
          <div>
            <Link href="/components">Components</Link>
            <Link href="/docs/installation">Documentation</Link>
            <Link href="/contribute">Contribute</Link>
          </div>
        </details>
        <ThemeSelect />
        {repositoryUrl ? (
          <a className="github-link" href={repositoryUrl} target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight size={13} />
          </a>
        ) : (
          <Link className="github-link" href="/contribute">
            Build with us <ArrowUpRight size={13} />
          </Link>
        )}
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <span>Built to be built upon.</span>
      <span>Open source. MIT licensed. Yours to make your own.</span>
      <Link href="/contribute">
        Build with us <ArrowUpRight size={12} />
      </Link>
    </footer>
  );
}
export function DocsNav() {
  return (
    <nav className="docs-nav" aria-label="Documentation">
      <p className="eyebrow">The handbook</p>
      <Link href="/docs/installation">
        <BookOpen size={15} /> Installation
      </Link>
      <Link href="/docs/engines">Animation engines</Link>
      <Link href="/docs/customization">Customization</Link>
      <Link href="/docs/contributing">
        <GitPullRequest size={15} /> Contributing
      </Link>
      <Link href="/docs/provenance">Attribution & provenance</Link>
      <Link href="/docs/agents">Working with agents</Link>
      <Link href="/components">← Back to components</Link>
    </nav>
  );
}
