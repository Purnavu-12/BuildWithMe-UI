import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Braces, GitFork, Layers3, Package, Sparkles } from 'lucide-react';
import { ChapterMiniature, InterfaceCosmos } from '@/components/interface-cosmos';
import { InstallSwitcher } from '@/components/install-switcher';
import { Preview } from '@/components/preview';
import { getHomeStory } from '@/lib/home-story';

const frameworkExamples = [
  { name: 'React', meta: 'Next.js', code: "import { MagneticButton } from '@buildwithme/react'" },
  { name: 'Vue', meta: 'Nuxt', code: "import { MagneticButton } from '@buildwithme/vue'" },
  { name: 'Svelte', meta: 'SvelteKit', code: "import { MagneticButton } from '@buildwithme/svelte'" },
];

export default function Home() {
  const story = getHomeStory();
  return (
    <main id="main-content" className="home-page cosmos-home">
      <InterfaceCosmos chapters={story.chapters} nodeCount={story.stats.designs} domainCount={story.stats.domains}>
        <article id="signal" className="cosmos-chapter cosmos-signal" data-cosmos-chapter="0" data-active="true">
          <ChapterMiniature state="signal" />
          <p className="mono-label"><span /> OPEN COMPONENT ECOSYSTEM · INTERFACE COSMOS</p>
          <h1>Build the interface.<br /><em>Keep the source.</em></h1>
          <p className="cosmos-lede">One considered collection. Three framework expressions. Forty interface signals you can install, inspect, remix, and make your own.</p>
          <div className="hero-actions">
            <Link className="button button-light magnetic-action" href="/components">Explore the collection <ArrowRight size={16} /></Link>
            <Link className="button button-ghost" href="/docs/installation">Start building <ArrowUpRight size={15} /></Link>
          </div>
          <InstallSwitcher compact />
        </article>

        <article id="constellation" className="cosmos-chapter" data-cosmos-chapter="1">
          <ChapterMiniature state="constellation" />
          <p className="chapter-index">02 / CONSTELLATION</p>
          <h2>Forty signals.<br />Sixteen product orbits.</h2>
          <p>Actions, forms, dashboards, AI, commerce, media, documentation, and everything between them. The catalog is structured around what people build.</p>
          <div className="cosmos-stats"><span><b>{story.stats.designs}</b> designs</span><span><b>{story.stats.domains}</b> domains</span><span><b>{story.stats.implementations}</b> sources</span></div>
          <Link className="chapter-link" href="/components">Navigate the complete constellation <ArrowUpRight size={14}/></Link>
        </article>

        <article id="translation" className="cosmos-chapter" data-cosmos-chapter="2">
          <ChapterMiniature state="translation" />
          <p className="chapter-index">03 / TRANSLATION</p>
          <h2>One intent.<br />Three dialects.</h2>
          <p>The capability stays recognizable while each source follows its framework’s component model, state patterns, and server boundaries.</p>
          <div className="cosmos-code-stack">{frameworkExamples.map((item, index) => <div key={item.name}><span>0{index + 1}</span><b>{item.name}</b><small>{item.meta}</small><code>{item.code}</code></div>)}</div>
          <Link className="chapter-link" href="/docs/frameworks">Read the parity policy <ArrowUpRight size={14}/></Link>
        </article>

        <article id="ownership" className="cosmos-chapter" data-cosmos-chapter="3">
          <ChapterMiniature state="ownership" />
          <p className="chapter-index">04 / OWNERSHIP</p>
          <h2>Start fast.<br />Own every layer.</h2>
          <p>Use the package for momentum, land reviewed source in your project, or copy the exact implementation you need.</p>
          <InstallSwitcher />
          <div className="ownership-paths"><span><Package size={15}/> Package</span><span><Braces size={15}/> Source</span><span><Layers3 size={15}/> Copy</span></div>
        </article>

        <article id="open-orbit" className="cosmos-chapter" data-cosmos-chapter="4">
          <ChapterMiniature state="open-orbit" />
          <p className="chapter-index">05 / OPEN ORBIT</p>
          <h2>The system grows<br />in public.</h2>
          <p>Creator identity travels with every design. Original work stays lightweight; adaptations and remixes preserve the history that makes open source trustworthy.</p>
          <div className="provenance-readout"><span><b>{story.provenance.original}</b> original</span><span><b>{story.provenance.adapted}</b> adapted</span><span><b>{story.provenance.remix}</b> remixed</span></div>
          <div className="hero-actions"><Link className="button button-light" href="/contribute">Join the orbit <GitFork size={15}/></Link><Link className="button button-ghost" href="/ecosystem">Explore the ecosystem <Sparkles size={15}/></Link></div>
        </article>
      </InterfaceCosmos>

      <section className="featured-section section-shell cosmos-afterglow">
        <div className="section-heading"><div><p className="section-index">LIVE SIGNALS / SELECTED WORK</p><h2>Touch the system.</h2></div><Link href="/components">View all {story.stats.designs} <ArrowUpRight size={15}/></Link></div>
        <div className="featured-grid">{story.featured.map((item, index) => <Link href={`/components/${item.id}`} key={item.id} className={`editorial-card editorial-card-${index + 1}`}>
          <div className="featured-live-preview"><Preview id={item.id}/><b>{String(index + 1).padStart(2, '0')}</b><span>LIVE / {item.engines.join(' + ')}</span></div>
          <div className="editorial-info"><div><span>{item.domains[0].replaceAll('-', ' ')}</span><span>R · V · S</span></div><h3>{item.title}</h3><p>{item.summary}</p></div>
        </Link>)}</div>
      </section>

      <section className="domain-transmission section-shell">
        <div className="section-heading"><div><p className="section-index">COVERAGE / REAL REGISTRY DATA</p><h2>Every surface<br />has a coordinate.</h2></div><p className="coverage-note">A broad product vocabulary inspired by the open web, without affiliation claims or invented usage metrics.</p></div>
        <div className="domain-list">{story.domains.map((domain, index) => <Link key={domain.id} href={`/components?domain=${domain.id}`}><span>{String(index + 1).padStart(2, '0')}</span><strong>{domain.label}</strong><small>{domain.count} design{domain.count === 1 ? '' : 's'}</small><ArrowUpRight size={15}/></Link>)}</div>
      </section>

      <section className="cosmos-final section-shell">
        <p className="section-index">THE NEXT SIGNAL / YOURS</p><h2>Find a component.<br /><span>Change its trajectory.</span></h2><p>Install it in seconds, then make the source belong to your product.</p>
        <div className="hero-actions"><Link className="button button-light" href="/components">Enter the catalog <ArrowRight size={15}/></Link><Link className="button button-ghost" href="/docs/contributing">Build with us <ArrowUpRight size={15}/></Link></div>
      </section>
    </main>
  );
}
