import Link from 'next/link';
import { ArrowRight, ArrowUpRight, GitFork } from 'lucide-react';
import { InterfaceCosmos } from '@/components/interface-cosmos';
import { ChapterMiniature } from '@/components/interface-engine';
import { FrameworkExperiment } from '@/components/framework-experiment';
import { SourceOwnership } from '@/components/source-ownership';
import { Preview } from '@/components/preview';
import { getHomeStory } from '@/lib/home-story';
import { getComponent, siteUrl, sources } from '@/lib/registry';
import type { Framework } from '@/registry/schema';

export default function Home() {
  const story = getHomeStory();
  const tabs = getComponent('animated-tabs')!;
  const files = Object.fromEntries(
    Object.entries(sources[tabs.id]).map(([framework, entries]) => [
      framework,
      entries.map((entry) =>
        ('target' in entry ? String(entry.target) : entry.path).split('/').at(-1)!,
      ),
    ]),
  ) as Record<Framework, string[]>;
  const intro = (
    <header id="signal" className="kinetic-intro" data-cosmos-chapter="0">
      <p className="mono-label">PLAY WITH THE POSSIBILITIES</p>
      <h1>
        <span>Build the interface.</span>
        <em>Keep the source.</em>
      </h1>
      <p className="kinetic-lede">Expressive components. Three frameworks. Yours to change.</p>
      <div className="hero-actions">
        <Link className="button button-light" href="/components">
          Explore the collection <ArrowUpRight size={17} />
        </Link>
        <Link className="button button-ghost" href="/docs/installation">
          Start building <ArrowRight size={16} />
        </Link>
      </div>
    </header>
  );
  return (
    <main id="main-content" className="home-page cosmos-home kinetic-home">
      <InterfaceCosmos
        chapters={story.chapters}
        nodeCount={story.stats.designs}
        domainCount={story.stats.domains}
        intro={intro}
      >
        <article
          id="constellation"
          className="kinetic-chapter kinetic-paper constellation-chapter"
          data-cosmos-chapter="1"
        >
          <svg
            className="constellation-route"
            viewBox="0 0 1200 720"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M245 40H785Q840 40 840 95V280Q840 310 815 325L710 390Q685 405 685 435V490Q685 520 650 520H555" />
            <circle cx="245" cy="40" r="4" />
            <circle cx="840" cy="190" r="4" />
            <circle cx="685" cy="485" r="4" />
          </svg>
          <ChapterMiniature chapter={1} count={story.stats.designs} />
          <div className="kinetic-chapter-copy">
            <p className="chapter-index">02 / CONSTELLATION</p>
            <h2>
              Make a little motion.
              <br />
              Build a whole interface.
            </h2>
            <p>
              Real components, real source. From a simple interaction to a complete pattern, each
              design includes React, Vue, and Svelte implementations you can install, inspect, and
              make your own.
            </p>
            <Link className="chapter-link" href="/components">
              Browse components <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="kinetic-proof constellation-demo" data-theme="dark">
            <div className="constellation-card-meta">
              <span>UI COMPONENT</span>
              <span>REACT LIVE PREVIEW</span>
            </div>
            <div className="constellation-card-copy">
              <h3>Animated tabs</h3>
              <p>
                A clean, expressive tab component with animated indicators and smooth transitions.
              </p>
            </div>
            <Preview id="animated-tabs" initialTheme="dark" />
            <Link className="constellation-inspect" href="/components/animated-tabs">
              Explore code and props <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="kinetic-proof constellation-source" data-theme="dark">
            <div className="constellation-card-meta">
              <span>SOURCE</span>
              <span>3 FRAMEWORKS</span>
            </div>
            <SourceOwnership id="animated-tabs" site={siteUrl} files={files} />
          </div>
          <div className="constellation-collection">
            <p className="mono-label">A COLLECTION THAT COMES TOGETHER</p>
            <Preview id="stagger-reveal" initialTheme="dark" />
            <div className="kinetic-domain-links">
              {story.domains.slice(0, 4).map((domain) => (
                <Link key={domain.id} href={'/components?domain=' + domain.id}>
                  {domain.label}
                  <span>{domain.count}</span>
                  <ArrowUpRight size={14} />
                </Link>
              ))}
            </div>
          </div>
        </article>
        <article id="translation" className="kinetic-chapter" data-cosmos-chapter="2">
          <ChapterMiniature chapter={2} count={story.stats.designs} />
          <div className="kinetic-chapter-copy">
            <p className="chapter-index">03 / TRANSLATION</p>
            <h2>
              One intent.
              <br />
              Three dialects.
            </h2>
            <p>
              Change the framework. Keep the interaction. These tabs run in the framework you
              select, with the same selection, keyboard navigation, and readable content.
            </p>
            <Link className="chapter-link" href="/docs/frameworks">
              Read the parity policy <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="kinetic-proof">
            <FrameworkExperiment id="animated-tabs" />
            <Link className="chapter-link" href="/components/animated-tabs">
              Inspect Animated Tabs <ArrowUpRight size={15} />
            </Link>
          </div>
        </article>
        <article id="ownership" className="kinetic-chapter kinetic-paper" data-cosmos-chapter="3">
          <ChapterMiniature chapter={3} count={story.stats.designs} />
          <div className="kinetic-chapter-copy">
            <p className="chapter-index">04 / OWNERSHIP</p>
            <h2>
              Start fast.
              <br />
              Own every layer.
            </h2>
            <p>
              No hidden dependency on our website. Install the complete source, inspect the files,
              and change the details to fit your product. npm packages remain unpublished.
            </p>
          </div>
          <div className="kinetic-proof">
            <SourceOwnership id="animated-tabs" site={siteUrl} files={files} />
            <Link className="chapter-link" href="/docs/installation">
              Find your installation path <ArrowUpRight size={16} />
            </Link>
          </div>
        </article>
        <article id="open-orbit" className="kinetic-chapter" data-cosmos-chapter="4">
          <ChapterMiniature chapter={4} count={story.stats.designs} />
          <div className="kinetic-chapter-copy">
            <p className="chapter-index">05 / OPEN ORBIT</p>
            <h2>
              The system grows
              <br />
              in public.
            </h2>
            <p>
              Every interface starts with an idea. Every design keeps its creator, license, and
              history. Explore something, make it yours, and share what comes next.
            </p>
            <div className="provenance-readout">
              <span>
                <b>{story.provenance.original}</b> original
              </span>
              <span>
                <b>{story.provenance.adapted}</b> adapted
              </span>
              <span>
                <b>{story.provenance.remix}</b> remixed
              </span>
            </div>
            <Link className="button button-light" href="/contribute">
              Build with us <GitFork size={16} />
            </Link>
          </div>
          <div className="kinetic-proof">
            <p className="mono-label">START WITH A LITTLE IDEA</p>
            <Preview id="prompt-composer" />
            <p className="proof-note">A local demonstration. Your prompt stays in this browser.</p>
          </div>
        </article>
      </InterfaceCosmos>
      <section className="featured-section section-shell cosmos-afterglow">
        <div className="section-heading">
          <div>
            <p className="section-index">THE PLAYGROUND / SELECTED COMPONENTS</p>
            <h2>Go on. Try something.</h2>
          </div>
          <Link href="/components">
            View all {story.stats.designs} <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="featured-grid">
          {story.featured.map((item, index) => (
            <article key={item.id} className={'editorial-card editorial-card-' + (index + 1)}>
              <div className="featured-live-preview">
                <Preview id={item.id} />
                <b>{String(index + 1).padStart(2, '0')}</b>
                <span>REACT PREVIEW</span>
              </div>
              <Link href={'/components/' + item.id} className="editorial-info">
                <div>
                  <span>{item.domains[0].replaceAll('-', ' ')}</span>
                  <span>R · V · S</span>
                </div>
                <h3>
                  {item.title} <ArrowUpRight size={16} />
                </h3>
                <p>{item.summary}</p>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="domain-transmission section-shell">
        <div className="section-heading">
          <div>
            <p className="section-index">{story.stats.domains} PRODUCT DOMAINS</p>
            <h2>
              Find the right part
              <br />
              for your next idea.
            </h2>
          </div>
          <p className="coverage-note">
            From everyday actions to expressive motion. Explore by what you want to build.
          </p>
        </div>
        <div className="domain-list">
          {story.domains.map((domain, index) => (
            <Link key={domain.id} href={'/components?domain=' + domain.id}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{domain.label}</strong>
              <small>
                {domain.count} design{domain.count === 1 ? '' : 's'}
              </small>
              <ArrowUpRight size={16} />
            </Link>
          ))}
        </div>
      </section>
      <section className="cosmos-final section-shell">
        <p className="section-index">THE NEXT SIGNAL / YOURS</p>
        <h2>
          Small parts.
          <br />
          <span>Infinite possibilities.</span>
        </h2>
        <p>Find a component. Keep its source. Change what comes next.</p>
        <div className="hero-actions">
          <Link className="button button-light" href="/components">
            Enter the collection <ArrowRight size={17} />
          </Link>
          <Link className="button button-ghost" href="/docs/contributing">
            Make a contribution <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
