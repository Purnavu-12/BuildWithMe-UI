import type { ComponentManifest } from '@/registry/schema';
export type SearchFilters = { q?: string; domain?: string; framework?: string; engine?: string; method?: string };
export function searchComponents(items: ComponentManifest[], filters: SearchFilters) {
  const query = (filters.q ?? '').trim().toLowerCase();
  const terms = query.split(/\s+/).filter(Boolean);
  return items.filter((item) => {
    const searchable = [item.id,item.title,item.summary,...item.tags,...item.domains,item.provenance.creator.name].join(' ').toLowerCase();
    return terms.every((term)=>searchable.includes(term)) && (!filters.domain||filters.domain==='all'||item.domains.includes(filters.domain as never)) && (!filters.framework||filters.framework==='all'||filters.framework in item.frameworks) && (!filters.engine||filters.engine==='all'||item.engines.includes(filters.engine as never)) && (!filters.method||filters.method==='all'||item.installation[filters.method as keyof typeof item.installation]);
  });
}
