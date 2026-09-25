import type { DiscoveryItem } from '../../registry-schema/src/index';
export type Filters = { q?: string; category?: string; engine?: string };
export function searchComponents<T extends DiscoveryItem>(items: T[], filters: Filters): T[] {
  const terms = (filters.q ?? '').toLowerCase().trim().split(/\s+/).filter(Boolean);
  return items.filter((item) => {
    if (filters.category && filters.category !== 'all' && item.category !== filters.category)
      return false;
    if (filters.engine && filters.engine !== 'all' && item.engine !== filters.engine) return false;
    const text = [item.title, item.description, item.author.name, ...item.tags]
      .join(' ')
      .toLowerCase();
    return terms.every((term) => text.includes(term));
  });
}
