import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight, Box, Braces, CircleDot, GitFork, Layers3, Sparkles } from 'lucide-react';
import { HeroVisual } from '@/components/hero-visual';
import { InstallSwitcher } from '@/components/install-switcher';
import { components, domainLabels, registryStats } from '@/lib/registry';

const featuredIds = ['command-palette', 'magnetic-button', 'aurora-field', 'prompt-composer', 'sortable-data-table', 'bento-hero'];
const featured = featuredIds.map((id) => components.find((item) => item.id === id)).filter(Boolean);
const domainEntries = Object.entries(domainLabels);

export default function Home() {
  return (
    <main id="main-content" className="home-page">
      <section className="hero-section">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="mono-label"><span /> OPEN COMPONENT ECOSYSTEM · V0.2</p>
          <h1>Build the interface.<br /><em>Keep the source.</em></h1>
          <p className="hero-description">
            One considered collection. Three native frameworks. Components you can install,
            inspect, remix, and make entirely your own.
          </p>
          <div className="hero-actions">
            <Link className="button button-light" href="/components">Explore the collection <ArrowRight size={16} /></Link>
            <Link className="button button-ghost" href="/docs/installation">Start building <ArrowUpRight size={15} /></Link>
          </div>
          <InstallSwitcher compact />
        </div>
        <HeroVisual />
        <div className="hero-rail">
          <span>SCROLL TO DISCOVER</span><ArrowDown size={14} />
        </div>
        <div className="hero-index" aria-hidden="true">40 / 120</div>
      </section>

      <section className="manifesto-section section-shell">
        <p className="section-index">01 / THE SYSTEM</p>
        <div className="manifesto-copy">
          <p className="mono-label">DESIGN ONCE · SPEAK EVERY FRAMEWORK</p>
          <h2>A library that meets your stack where it already lives.</h2>
          <p>Each design is rebuilt around the native conventions of React, Vue, and Svelte. Choose a package for speed or install the source when ownership matters.</p>
        </div>
        <div className="stat-grid">
          <div><strong>{registryStats.designs}</strong><span>component designs</span></div>
          <div><strong>{registryStats.implementations}</strong><span>native implementations</span></div>
          <div><strong>{registryStats.domains}</strong><span>product domains</span></div>
          <div><strong>{registryStats.frameworks}</strong><span>framework families</span></div>
        </div>
      </section>

      <section className="featured-section section-shell">
        <div className="section-heading">
          <div><p className="section-index">02 / SELECTED WORK</p><h2>Components with a point of view.</h2></div>
          <Link href="/components">View all {registryStats.designs} <ArrowUpRight size={15} /></Link>
        </div>
        <div className="featured-grid">
          {featured.map((item, index) => item ? (
            <Link href={`/components/${item.id}`} key={item.id} className={`editorial-card editorial-card-${index + 1}`}>
              <div className="editorial-visual" data-domain={item.domains[0]}>
                <span className="visual-orbit" /><span className="visual-line" /><span className="visual-dot" />
                <b>{String(index + 1).padStart(2, '0')}</b>
              </div>
              <div className="editorial-info">
                <div><span>{domainLabels[item.domains[0]]}</span><span>{item.frameworks ? 'R · V · S' : ''}</span></div>
                <h3>{item.title}</h3><p>{item.summary}</p>
              </div>
            </Link>
          ) : null)}
        </div>
      </section>

      <section className="framework-section section-shell">
        <div className="section-heading framework-heading">
          <div><p className="section-index">03 / THREE DIALECTS</p><h2>Native by design.<br />Consistent by intent.</h2></div>
          <p>Shared behavior and accessibility, expressed through each framework’s own component model.</p>
        </div>
        <div className="framework-panels">
          {[
            ['React', 'Next.js', "import { MagneticButton } from '@buildwithme/react'", '<MagneticButton label="Launch" />'],
            ['Vue', 'Nuxt', "import { MagneticButton } from '@buildwithme/vue'", '<MagneticButton label="Launch" />'],
            ['Svelte', 'SvelteKit', "import { MagneticButton } from '@buildwithme/svelte'", '<MagneticButton label="Launch" />'],
          ].map(([name, meta, line1, line2], index) => (
            <article key={name}>
              <div className="framework-title"><span>0{index + 1}</span><h3>{name}</h3><small>{meta}</small></div>
              <pre><code><span>{line1}</span>{'\n\n'}{line2}</code></pre>
              <Link href={`/docs/installation?framework=${name.toLowerCase()}`}>Setup guide <ArrowUpRight size={13} /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="domains-section section-shell">
        <div className="section-heading">
          <div><p className="section-index">04 / COVERAGE</p><h2>From first impression<br />to final interaction.</h2></div>
          <p className="coverage-note">Built for complete products, not a single visual niche.</p>
        </div>
        <div className="domain-list">
          {domainEntries.map(([id, label], index) => {
            const count = components.filter((item) => item.domains.includes(id as keyof typeof domainLabels)).length;
            return (
              <Link key={id} href={`/components?domain=${id}`}>
                <span>{String(index + 1).padStart(2, '0')}</span><strong>{label}</strong><small>{count} design{count === 1 ? '' : 's'}</small><ArrowUpRight size={15} />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="install-section section-shell">
        <div className="install-copy">
          <p className="section-index">05 / YOUR WAY IN</p>
          <h2>Start quickly.<br /><span>Own it completely.</span></h2>
          <p>Use the package when you want momentum. Pull in the source when you want control. Copy a single file when that is all you need.</p>
          <InstallSwitcher />
        </div>
        <div className="install-paths">
          <article><Box size={19} /><span>01</span><h3>Package</h3><p>Tree-shakeable framework packages with typed exports and shared theme tokens.</p></article>
          <article><Braces size={19} /><span>02</span><h3>Source</h3><p>Framework-specific registry artifacts that land directly in your project.</p></article>
          <article><Layers3 size={19} /><span>03</span><h3>Copy</h3><p>Readable source in the browser, ready to copy without another tool.</p></article>
        </div>
      </section>

      <section className="contribute-section section-shell">
        <div className="contribute-art" aria-hidden="true"><CircleDot /><GitFork /><Sparkles /></div>
        <div>
          <p className="section-index">06 / OPEN BY DEFAULT</p>
          <h2>Bring one idea.<br />We generate the busywork.</h2>
          <p>A typed manifest and three focused implementations replace manually maintained previews, README files, package maps, and documentation.</p>
          <Link className="button button-light" href="/contribute">Read the contribution guide <ArrowRight size={15} /></Link>
        </div>
      </section>
    </main>
  );
}
