import { it, expect } from 'vitest';
import { searchComponents } from '../../packages/search/src/index';
import type { DiscoveryItem } from '../../packages/registry-schema/src/index';
const items: DiscoveryItem[] = [
  {
    id: 'magnetic',
    title: 'Magnetic button',
    description: 'Spring-loaded action',
    category: 'buttons',
    engine: 'motion',
    tags: ['pointer'],
    author: { name: 'Asha' },
  },
  {
    id: 'dots',
    title: 'Dot grid',
    description: 'Subtle background',
    category: 'backgrounds',
    engine: 'css',
    tags: ['canvas'],
    author: { name: 'Kai' },
  },
];
it('combines engine, category and all query terms', () => {
  expect(
    searchComponents(items, { q: '  ASHA pointer ', category: 'buttons', engine: 'motion' }),
  ).toEqual([items[0]]);
  expect(searchComponents(items, { q: 'action', engine: 'css' })).toEqual([]);
});
it('returns all items for clear filters and no matches for unknown filters', () => {
  expect(searchComponents(items, { q: ' ', category: 'all', engine: 'all' })).toEqual(items);
  expect(searchComponents(items, { category: 'unknown' })).toEqual([]);
});
