'use client';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import {
  Search,
  ArrowUpRight,
  ArrowRight,
  Layers,
  MousePointer2,
  Type,
  Square,
  Grid2X2,
  Sparkles,
  SlidersHorizontal,
  X,
  Command,
  GitPullRequest,
} from 'lucide-react';
import { searchComponents } from '../../../../packages/search/src/index';
import type { DiscoveryItem } from '../../../../packages/registry-schema/src/index';
import { Preview } from './preview';
const groups = [
  { id: 'all', label: 'All components', icon: Layers },
  { id: 'buttons', label: 'Buttons', icon: MousePointer2 },
  { id: 'text', label: 'Text & typography', icon: Type },
  { id: 'cards', label: 'Cards & interaction', icon: Square },
  { id: 'backgrounds', label: 'Backgrounds', icon: Grid2X2 },
  { id: 'ai', label: 'AI interfaces', icon: Sparkles },
];
const engineNames: Record<string, string> = { css: 'CSS', motion: 'Motion', animejs: 'Anime.js' };
export function Catalog({ items, home = false }: { items: DiscoveryItem[]; home?: boolean }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const q = params.get('q') ?? '';
  const category = params.get('category') ?? 'all';
  const engine = params.get('engine') ?? 'all';
  const [drawer, setDrawer] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const filtered = searchComponents(items, { q, category, engine });
  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value && value !== 'all') next.set(key, value);
    else next.delete(key);
    router.replace(`${pathname}${next.size ? '?' + next.toString() : ''}`, { scroll: false });
  }
  useEffect(() => {
    function keyboard(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        search.current?.focus();
      }
    }
    document.addEventListener('keydown', keyboard);
    return () => document.removeEventListener('keydown', keyboard);
  }, []);
  useEffect(() => {
    if (drawer) dialog.current?.showModal();
    else if (dialog.current?.open) dialog.current.close();
  }, [drawer]);
  const filters = (mobile = false) => (
    <>
      <p className="sidebar-label">Explore the library</p>
      <div className="category-list">
        {groups.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            aria-pressed={category === id}
            onClick={() => {
              update('category', id);
              if (mobile) setDrawer(false);
            }}
          >
            <Icon size={16} />
            <span>{label}</span>
            <span className="category-count">
              {id === 'all' ? items.length : items.filter((i) => i.category === id).length}
            </span>
          </button>
        ))}
      </div>
      <div className="sidebar-divider" />
      <p className="sidebar-label">Under the hood</p>
      <div className="engine-list">
        {['all', 'css', 'motion', 'animejs'].map((id) => (
          <button key={id} aria-pressed={engine === id} onClick={() => update('engine', id)}>
            <span className={`engine-dot ${id}`} />
            {id === 'all' ? 'All engines' : engineNames[id]}
            <span className="radio-dot" />
          </button>
        ))}
      </div>
      <div className="sidebar-note">
        <GitPullRequest size={20} />
        <h3>Your idea belongs here.</h3>
        <p>Good interfaces get better when we build them together.</p>
        <Link href="/contribute">
          Contribute a component <ArrowUpRight size={13} />
        </Link>
      </div>
      <Link className="sidebar-docs" href="/docs/installation">
        First time here? Start with the docs <ArrowUpRight size={12} />
      </Link>
    </>
  );
  return (
    <div className="catalog-layout">
      <aside className="catalog-sidebar">{filters()}</aside>
      <main id="main-content" className="catalog-main">
        <section className="catalog-hero">
          <div className="hero-kicker">
            <span className="status-dot" /> THE OPEN-SOURCE INTERFACE COLLECTION
          </div>
          <h1>
            {home ? (
              <>
                A little less from scratch.
                <br />
                <span>A lot more possibility.</span>
              </>
            ) : (
              <>
                Find your next
                <br />
                <span>building block.</span>
              </>
            )}
          </h1>
          <p>
            Thoughtful components. Playful interactions. Source you own.
            <br className="desktop-break" /> Made by builders, for whatever you’re building next.
          </p>
          <div className="hero-meta">
            <span>
              <span className="tiny-plus">+</span> {items.length} components
            </span>
            <span>3 animation engines</span>
            <span>100% open source</span>
          </div>
          <div className="hero-aside" aria-hidden="true">
            <span>LESS REINVENTING.</span>
            <span>MORE MAKING.</span>
            <ArrowUpRight size={36} strokeWidth={1} />
          </div>
        </section>
        {home && category === 'all' && engine === 'all' && !q ? (
          <section className="featured-strip" aria-label="Featured components">
            <Link href="/components/magnetic-button">
              <span className="featured-index">01 / INTERACTION</span>
              <strong>
                Small details.
                <br />
                Big difference.
              </strong>
              <span className="featured-cta">
                Meet the magnetic button <ArrowUpRight size={14} />
              </span>
              <span className="featured-orbit" aria-hidden="true">
                <MousePointer2 size={24} />
              </span>
            </Link>
            <Link href="/components/prompt-composer">
              <span className="featured-index">02 / AI INTERFACES</span>
              <strong>
                A better beginning
                <br />
                for your next idea.
              </strong>
              <span className="featured-cta">
                Explore AI components <ArrowUpRight size={14} />
              </span>
              <span className="featured-ai" aria-hidden="true">
                <Sparkles size={32} strokeWidth={1} />
              </span>
            </Link>
          </section>
        ) : null}
        <section className="catalog-section" aria-label="Component collection">
          <div className="collection-heading">
            <div>
              <span className="eyebrow">THE COLLECTION</span>
              <h2>
                {groups.find((g) => g.id === category)?.label ?? 'Components'}
                <span>{filtered.length.toString().padStart(2, '0')}</span>
              </h2>
            </div>
            <span className="collection-hint">A starting point. Make it yours.</span>
          </div>
          <div className="search-row">
            <label className="search-box">
              <Search size={17} />
              <span className="sr-only">Search components</span>
              <input
                ref={search}
                value={q}
                onChange={(e) => update('q', e.target.value)}
                placeholder="Find your next building block…"
                aria-label="Search components"
              />
              <kbd>
                <Command size={11} /> K
              </kbd>
            </label>
            <button ref={trigger} className="filter-trigger" onClick={() => setDrawer(true)}>
              <SlidersHorizontal size={16} /> Filters
            </button>
            <label className="desktop-engine">
              <span className="sr-only">Filter by engine</span>
              <select
                value={engine}
                onChange={(e) => update('engine', e.target.value)}
                aria-label="Filter by engine"
              >
                <option value="all">All engines</option>
                <option value="css">CSS</option>
                <option value="motion">Motion</option>
                <option value="animejs">Anime.js</option>
              </select>
            </label>
          </div>
          {q || category !== 'all' || engine !== 'all' ? (
            <div className="active-filters">
              <span role="status">{filtered.length} matching components</span>
              <button onClick={() => router.replace(pathname, { scroll: false })}>
                Reset filters <X size={12} />
              </button>
            </div>
          ) : (
            <p className="sr-only" role="status">
              {filtered.length} components
            </p>
          )}
          <div className="component-grid">
            {filtered.map((item, index) => (
              <article key={item.id} className={`component-card card-${item.category}`}>
                <div className="card-preview">
                  <Preview id={item.id} />
                  <span className="card-number">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <Link href={`/components/${item.id}`} className="card-details">
                  <div>
                    <h3>
                      {item.title}
                      <ArrowUpRight size={14} />
                    </h3>
                    <p>{item.description}</p>
                  </div>
                  <div className="card-footer">
                    <span>{groups.find((g) => g.id === item.category)?.label}</span>
                    <span className="engine-badge">
                      <i className={`engine-dot ${item.engine}`} />
                      {engineNames[item.engine]}
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
          {!filtered.length ? (
            <div className="empty-state">
              <Search size={28} />
              <h3>No components found. Yet.</h3>
              <p>Try a different phrase or give your search a little more room.</p>
              <button
                className="primary-button"
                onClick={() => router.replace(pathname, { scroll: false })}
              >
                Clear all filters <ArrowRight size={15} />
              </button>
            </div>
          ) : null}
        </section>
        <section className="contribution-banner">
          <div>
            <span className="eyebrow">BETTER, TOGETHER</span>
            <h2>
              The next great component
              <br />
              could be yours.
            </h2>
          </div>
          <Link className="primary-button" href="/contribute">
            Build with us <ArrowUpRight size={16} />
          </Link>
        </section>
      </main>
      <dialog
        ref={dialog}
        className="filter-dialog"
        onCancel={() => setDrawer(false)}
        onClose={() => {
          setDrawer(false);
          trigger.current?.focus();
        }}
        aria-label="Component filters"
      >
        <div className="dialog-heading">
          <h2>Find your component</h2>
          <button
            className="icon-button"
            onClick={() => setDrawer(false)}
            aria-label="Close filters"
          >
            <X size={20} />
          </button>
        </div>
        {filters(true)}
      </dialog>
    </div>
  );
}
