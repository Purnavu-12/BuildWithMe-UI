'use client';

import Link from 'next/link';
import { useDeferredValue, useMemo, useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowUpRight, Search, SlidersHorizontal, X } from 'lucide-react';
import { Preview } from './preview';
import { domainLabels } from '@/registry/schema';

type Item = {
  id: string; title: string; summary: string; domains: string[]; tags: string[];
  status: string; engines: string[]; frameworks: Record<string, unknown>;
  installation: { npm: boolean; source: boolean; copy: boolean };
  provenance: { creator: { name: string } };
};

export function Catalog({ items }: { items: Item[] }) {
  const router = useRouter(); const pathname = usePathname(); const params = useSearchParams();
  const [query, setQuery] = useState(params.get('q') ?? '');
  const [domain, setDomain] = useState(params.get('domain') ?? 'all');
  const [framework, setFramework] = useState(params.get('framework') ?? 'all');
  const [engine, setEngine] = useState(params.get('engine') ?? 'all');
  const [method, setMethod] = useState(params.get('method') ?? 'all');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  function update(next: Record<string,string>) {
    const values = { q: query, domain, framework, engine, method, ...next };
    const search = new URLSearchParams(); Object.entries(values).forEach(([key,value])=>{if(value && value !== 'all')search.set(key,value)});
    startTransition(()=>router.replace(`${pathname}${search.size ? `?${search}` : ''}`, { scroll: false }));
  }
  const filtered = useMemo(() => items.filter((item) => {
    const haystack = [item.title,item.summary,...item.tags,...item.domains,item.provenance.creator.name].join(' ').toLowerCase();
    return (!deferredQuery || haystack.includes(deferredQuery)) && (domain==='all'||item.domains.includes(domain)) && (framework==='all'||framework in item.frameworks) && (engine==='all'||item.engines.includes(engine)) && (method==='all'||item.installation[method as keyof typeof item.installation]);
  }), [deferredQuery,domain,framework,engine,method,items]);
  function reset(){setQuery('');setDomain('all');setFramework('all');setEngine('all');setMethod('all');router.replace(pathname,{scroll:false})}
  const active = query || domain!=='all'||framework!=='all'||engine!=='all'||method!=='all';
  return <>
    <div className="catalog-controls">
      <label className="catalog-search"><Search size={14}/><span className="sr-only">Search components</span><input value={query} onChange={(event)=>{setQuery(event.target.value);update({q:event.target.value})}} placeholder={`Search ${items.length} designs, domains, tags, or creators…`}/></label>
      <div className="catalog-filter-drawer">
        <button type="button" className="filter-drawer-trigger" aria-expanded={filtersOpen} aria-controls="catalog-filters" onClick={()=>setFiltersOpen((value)=>!value)}><SlidersHorizontal size={14} aria-hidden="true"/> Filters</button>
        <div className="catalog-filters" id="catalog-filters">
        <select aria-label="Filter by product domain" value={domain} onChange={(e)=>{setDomain(e.target.value);update({domain:e.target.value})}}><option value="all">All domains</option>{Object.entries(domainLabels).map(([id,label])=><option key={id} value={id}>{label}</option>)}</select>
        <select aria-label="Filter by framework" value={framework} onChange={(e)=>{setFramework(e.target.value);update({framework:e.target.value})}}><option value="all">All frameworks</option><option value="react">React</option><option value="vue">Vue</option><option value="svelte">Svelte</option></select>
        <select aria-label="Filter by engine" value={engine} onChange={(e)=>{setEngine(e.target.value);update({engine:e.target.value})}}><option value="all">All engines</option><option value="css">CSS</option><option value="motion">Motion</option><option value="animejs">Anime.js</option></select>
        <select aria-label="Filter by installation" value={method} onChange={(e)=>{setMethod(e.target.value);update({method:e.target.value})}}><option value="all">Any install</option><option value="npm">npm</option><option value="source">Source</option><option value="copy">Copy</option></select>
        </div>
      </div>
      {active ? <div className="active-filters"><span role="status">{filtered.length} matching designs</span><button onClick={reset}>Reset <X size={11}/></button></div> : <span className="sr-only" role="status">{filtered.length} designs</span>}
    </div>
    <section className="component-grid" aria-label="Component collection">
      {filtered.map((item,index)=><article className="component-card" key={item.id}><div className="card-preview"><Preview id={item.id}/><span className="card-number">{String(index+1).padStart(2,'0')}</span></div><Link className="card-details" href={`/components/${item.id}`}><h3>{item.title}<ArrowUpRight size={14}/></h3><p>{item.summary}</p><div className="card-footer"><span>{domainLabels[item.domains[0] as keyof typeof domainLabels]}</span><span>R · V · S</span></div></Link></article>)}
      {!filtered.length ? <div className="empty-state"><Search size={28}/><h2>No design matches that combination.</h2><p>Remove a filter or search with a broader phrase.</p><button className="button button-light" onClick={reset}>Clear filters</button></div>:null}
    </section>
  </>;
}
