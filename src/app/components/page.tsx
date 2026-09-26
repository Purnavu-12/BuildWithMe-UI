import { Suspense } from 'react';
import { Catalog } from '@/components/catalog';
import { components, registryStats } from '@/lib/registry';

export const metadata = { title: 'Component collection', description: `Browse ${registryStats.designs} component designs across React, Vue, and Svelte.` };

export default function ComponentsPage() {
  const items = components.map(({ id,title,summary,domains,tags,status,engines,frameworks,installation,provenance })=>({id,title,summary,domains,tags,status,engines,frameworks,installation,provenance}));
  return <main id="main-content" className="catalog-page"><header className="catalog-intro"><div><p className="section-index">THE COLLECTION / {registryStats.designs}</p><h1>Find your<br/>next interaction.</h1></div><p>Search by job, framework, engine, or installation method. Every design includes React, Vue, and Svelte source.</p></header><Suspense fallback={<p className="empty-state">Preparing the collection…</p>}><Catalog items={items}/></Suspense></main>;
}
