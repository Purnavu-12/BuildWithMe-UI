import Link from 'next/link';
import type { CSSProperties } from 'react';
import { ArrowUpRight, Braces, Orbit, Package, ScanLine } from 'lucide-react';
import { components, domainLabels, engineLabels, registryStats } from '@/lib/registry';

export const metadata = { title: 'Ecosystem', description: 'Frameworks, product domains, engines, provenance, and installation paths supported by BuildWithMe UI.' };

export default function EcosystemPage() {
  const engines = Object.entries(engineLabels).map(([id, label]) => ({ id, label, count: components.filter((item) => item.engines.some((engine) => engine === id)).length }));
  const licenses = new Set(components.map((item) => item.provenance.license)).size;
  const provenance = components.reduce((counts, item) => ({ ...counts, [item.provenance.type]: counts[item.provenance.type] + 1 }), { original: 0, adapted: 0, remix: 0 });
  return <main id="main-content" className="ecosystem-page">
    <header className="ecosystem-hero ecosystem-cosmos-hero"><div><p className="section-index">THE ECOSYSTEM / OPEN SOURCE</p><h1>One source field.<br/>Every product surface.</h1><p>BuildWithMe connects framework sources, motion engines, product domains, and installation choices without claiming affiliation with the projects that inspired its coverage.</p></div><div className="ecosystem-orbit" aria-hidden="true"><Orbit/><i/><i/><i/><span>{registryStats.designs}<small>designs</small></span></div></header>
    <section className="ecosystem-readout" aria-label="Registry statistics"><span><b>{registryStats.designs}</b> designs</span><span><b>{registryStats.implementations}</b> framework sources</span><span><b>{registryStats.domains}</b> domains</span><span><b>{licenses}</b> licenses</span></section>
    <section className="ecosystem-grid ecosystem-frameworks">{[
      ['01','React / Next.js','Typed React 19 sources with explicit client boundaries and package or source installation.'],
      ['02','Vue / Nuxt','Vue 3 single-file sources with composition patterns and Nuxt-ready usage.'],
      ['03','Svelte / SvelteKit','Svelte 5 sources with semantic controls and portable component styles.'],
    ].map(([index,title,text])=><article className="ecosystem-card" key={title}><span>{index}</span><h2>{title}</h2><p>{text}</p><Link href={`/docs/frameworks`}>Framework guide <ArrowUpRight size={13}/></Link></article>)}</section>
    <section className="ecosystem-section"><div className="section-heading"><div><p className="section-index">MOTION LAYERS / DECLARED PER DESIGN</p><h2>Use the smallest<br/>engine that fits.</h2></div><p className="coverage-note">CSS handles simple effects. Motion and Anime.js orchestrate interaction. Three.js is reserved for immersive product moments.</p></div><div className="engine-map">{engines.map((engine, index)=><Link href={`/components?engine=${engine.id}`} key={engine.id}><span>0{index+1}</span><b>{engine.label}</b><em>{engine.count} designs</em><i style={{'--engine-count':engine.count} as CSSProperties}/></Link>)}</div></section>
    <section className="ecosystem-section install-constellation"><div className="section-heading"><div><p className="section-index">INSTALLATION / THREE ENTRY PATHS</p><h2>Momentum or<br/>complete ownership.</h2></div></div><div className="install-paths-grid"><article><Package/><span>01</span><h3>Package</h3><p>Tree-shakeable exports for the fastest start.</p></article><article><Braces/><span>02</span><h3>Registry source</h3><p>Framework-specific files installed into your project.</p></article><article><ScanLine/><span>03</span><h3>Direct copy</h3><p>Readable source with its license and creator context.</p></article></div></section>
    <section className="ecosystem-section"><div className="section-heading"><div><p className="section-index">PROVENANCE / TRACEABLE BY DESIGN</p><h2>History travels<br/>with the source.</h2></div></div><div className="provenance-readout ecosystem-provenance"><span><b>{provenance.original}</b> original</span><span><b>{provenance.adapted}</b> adapted</span><span><b>{provenance.remix}</b> remixed</span></div></section>
    <section className="ecosystem-section"><div className="section-heading"><div><p className="section-index">COVERAGE / {components.length} DESIGNS</p><h2>Browse by what<br/>you are building.</h2></div></div><div className="domain-list">{Object.entries(domainLabels).map(([id,label],index)=><Link key={id} href={`/components?domain=${id}`}><span>{String(index+1).padStart(2,'0')}</span><strong>{label}</strong><small>{components.filter((item)=>item.domains.includes(id as keyof typeof domainLabels)).length}</small><ArrowUpRight size={14}/></Link>)}</div></section>
  </main>;
}
