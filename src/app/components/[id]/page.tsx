import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { components, domainLabels, engineLabels, getComponent, siteUrl, sources } from '@/lib/registry';
import { Preview } from '@/components/preview';
import { SourceViewer } from '@/components/source-viewer';
import { ComponentInstall } from '@/components/install-command';

export function generateStaticParams() { return components.map(({ id }) => ({ id })); }
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; const item = getComponent(id); return { title: item?.title ?? 'Component not found', description: item?.summary }; }

export default async function Detail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; const item = getComponent(id); if (!item) notFound();
  return <main id="main-content" className="detail-page">
    <header className="detail-title"><Link href="/components" className="detail-back"><ArrowLeft size={12}/> COLLECTION / {String(components.indexOf(item)+1).padStart(2,'0')}</Link><div className="detail-lede"><div><p className="mono-label">{item.domains.map((domain)=>domainLabels[domain]).join(' · ')} / {item.engines.map((engine)=>engineLabels[engine]).join(' + ')}</p><h1>{item.title}</h1></div><p>{item.summary}</p></div></header>
    <section className="detail-workbench">
      <div className="detail-preview"><Preview id={id} controls /></div>
      <aside className="detail-panel">
        <div className="framework-picker">{(['react','vue','svelte'] as const).map((framework)=><Link key={framework} href={`/preview/${id}/${framework}`}>{framework}</Link>)}</div>
        <section className="detail-section"><h2>Install</h2><p>Choose the package for speed or add the source directly to your project.</p><ComponentInstall id={id} site={siteUrl}/></section>
        <section className="detail-section"><h2>Accessibility</h2><p>{item.accessibility.summary}</p><ul>{item.accessibility.features.map((feature)=><li key={feature}>{feature}</li>)}</ul></section>
        <section className="detail-section"><h2>Component API</h2><div className="table-scroll"><table className="props-table"><thead><tr><th>Prop</th><th>Type</th><th>Default</th></tr></thead><tbody>{item.props.map((prop)=><tr key={prop.name}><td><code>{prop.name}</code></td><td>{prop.type}</td><td>{prop.default}</td></tr>)}</tbody></table></div></section>
        <section className="detail-section"><details className="provenance-details"><summary>Creator, license, and provenance</summary><p><span className="creator-chip">BY {item.provenance.creator.name}</span></p><p>{item.provenance.type === 'original' ? 'Original MIT-licensed implementation.' : item.provenance.type === 'adapted' ? `Adapted from ${item.provenance.upstreamAuthor}. ${item.provenance.modification}` : `Remixed from ${item.provenance.parent}. ${item.provenance.modification}`}</p></details></section>
        <Link className="button button-ghost" href="/docs/contributing">Remix this component <ArrowUpRight size={13}/></Link>
      </aside>
    </section>
    <section className="detail-section" style={{padding:'60px clamp(24px,5vw,80px)'}}><p className="section-index">SOURCE / THREE NATIVE IMPLEMENTATIONS</p><h2 style={{fontSize:28,textTransform:'none',letterSpacing:'-.04em',marginTop:18}}>Readable source, with nothing hidden.</h2><SourceViewer sources={sources[id]}/></section>
  </main>;
}
