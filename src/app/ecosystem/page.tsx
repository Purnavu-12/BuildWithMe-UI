import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { components, domainLabels, registryStats } from '@/lib/registry';

export const metadata = { title: 'Ecosystem', description: 'Frameworks, product domains, engines, and installation paths supported by BuildWithMe UI.' };
export default function EcosystemPage(){return <main id="main-content" className="ecosystem-page"><header className="ecosystem-hero"><p className="section-index">THE ECOSYSTEM / OPEN SOURCE</p><h1>One catalog.<br/>Every product surface.</h1><p>BuildWithMe-UI connects native framework components, animation engines, product domains, and installation choices without claiming affiliation with the open-source projects it supports.</p></header><section className="ecosystem-grid">{[
['01','React / Next.js','Typed React 19 components, App Router-safe client boundaries, and package or source installation.'],
['02','Vue / Nuxt','Vue 3 single-file components with native reactivity and Nuxt-ready usage.'],
['03','Svelte / SvelteKit','Svelte 5 components built around runes, semantic controls, and portable styles.'],
['04',`${registryStats.domains} product domains`,'Actions, forms, navigation, overlays, dashboards, commerce, AI, documentation, workflows, and more.'],
['05','Four motion layers','CSS for simple effects, Motion and Anime.js for orchestration, and Three.js for immersive product moments.'],
['06','Three ways to install','Tree-shakeable npm packages, framework-specific source registry items, and direct code copying.'],
].map(([index,title,text])=><article className="ecosystem-card" key={title}><span>{index}</span><h2>{title}</h2><p>{text}</p></article>)}</section><section className="section-shell" style={{paddingTop:40}}><div className="section-heading"><div><p className="section-index">COVERAGE / {components.length} DESIGNS</p><h2>Browse by what<br/>you are building.</h2></div></div><div className="domain-list">{Object.entries(domainLabels).map(([id,label],index)=><Link key={id} href={`/components?domain=${id}`}><span>{String(index+1).padStart(2,'0')}</span><strong>{label}</strong><small>{components.filter((item)=>item.domains.includes(id as keyof typeof domainLabels)).length}</small><ArrowUpRight size={14}/></Link>)}</div></section></main>}
