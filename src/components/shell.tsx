import Link from 'next/link';
import { ArrowUpRight, BookOpen, Github, GitPullRequest } from 'lucide-react';
import { ThemeSelect } from './theme-provider';
import { CommandSearch } from './command-search';
import { components, domainLabels, repositoryUrl, registryStats } from '@/lib/registry';

const searchItems = [
  ...components.map((item) => ({
    title: item.title,
    description: item.summary,
    href: `/components/${item.id}`,
    meta: item.domains.map((domain) => domainLabels[domain]).join(' · '),
  })),
  {
    title: 'Installation',
    description: 'Packages, source registry, and manual copying.',
    href: '/docs/installation',
    meta: 'Documentation',
  },
  {
    title: 'Framework parity',
    description: 'React, Vue, and Svelte support.',
    href: '/docs/frameworks',
    meta: 'Documentation',
  },
  {
    title: 'Motion and accessibility',
    description: 'Animation ownership, fallbacks, and reduced motion.',
    href: '/docs/motion',
    meta: 'Documentation',
  },
  {
    title: 'Contributing',
    description: 'Create and validate a new design.',
    href: '/contribute',
    meta: 'Open source',
  },
];

export function Header() {
  return (
    <header className="site-header">
      <Link prefetch={false} href="/" className="brand" aria-label="BuildWithMe UI home">
        <span className="brand-glyph" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        <span>BUILDWITHME</span>
        <small>/ UI</small>
      </Link>
      <nav aria-label="Main navigation">
        <Link prefetch={false} href="/components">
          Components
        </Link>
        <Link prefetch={false} href="/ecosystem">
          Ecosystem
        </Link>
        <Link prefetch={false} href="/docs/installation">
          Docs
        </Link>
        <Link prefetch={false} href="/contribute">
          Contribute
        </Link>
      </nav>
      <div className="header-actions">
        <CommandSearch items={searchItems} />
        <details className="mobile-navigation">
          <summary>Menu</summary>
          <div>
            <Link prefetch={false} href="/components">
              Components
            </Link>
            <Link prefetch={false} href="/ecosystem">
              Ecosystem
            </Link>
            <Link prefetch={false} href="/docs/installation">
              Documentation
            </Link>
            <Link prefetch={false} href="/contribute">
              Contribute
            </Link>
          </div>
        </details>
        <ThemeSelect />
        {repositoryUrl ? (
          <a className="header-link" href={repositoryUrl} target="_blank" rel="noreferrer">
            <Github size={13} /> GitHub <ArrowUpRight size={12} />
          </a>
        ) : (
          <Link prefetch={false} className="header-link" href="/contribute">
            Open source <ArrowUpRight size={12} />
          </Link>
        )}
      </div>
      <span className="header-source-count" aria-hidden="true">
        SOURCE / {registryStats.designs}:{registryStats.implementations}
      </span>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <span className="brand-glyph" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        <strong>BUILDWITHME / UI</strong>
      </div>
      <p>
        Open-source components for React, Vue, and Svelte.
        <br />
        MIT licensed. Built to be built upon.
      </p>
      <div className="footer-links">
        <Link prefetch={false} href="/components">
          Components
        </Link>
        <Link prefetch={false} href="/docs/installation">
          Documentation
        </Link>
        <Link prefetch={false} href="/contribute">
          Contribute
        </Link>
        <a href={repositoryUrl} target="_blank" rel="noreferrer">
          <Github size={13} /> GitHub
        </a>
      </div>
      <span className="footer-mark" aria-hidden="true">
        BWM
        <br />
        /UI
      </span>
    </footer>
  );
}

export function DocsNav() {
  return (
    <nav className="docs-nav" aria-label="Documentation">
      <p className="mono-label">HANDBOOK / 02</p>
      <Link prefetch={false} href="/docs/installation">
        <BookOpen size={15} /> Installation
      </Link>
      <Link prefetch={false} href="/docs/frameworks">
        Frameworks
      </Link>
      <Link prefetch={false} href="/docs/customization">
        Customization
      </Link>
      <Link prefetch={false} href="/docs/motion">
        Motion & accessibility
      </Link>
      <Link prefetch={false} href="/docs/contributing">
        <GitPullRequest size={15} /> Contributing
      </Link>
      <Link prefetch={false} href="/docs/provenance">
        Attribution & provenance
      </Link>
      <Link prefetch={false} href="/docs/agents">
        Working with agents
      </Link>
      <a href={repositoryUrl} target="_blank" rel="noreferrer">
        <Github size={14} /> GitHub repository
      </a>
      <Link prefetch={false} href="/components">
        ← Components
      </Link>
    </nav>
  );
}
