import { describe, expect, it } from 'vitest';
import { featuredComponentIds, getHomeStory, storyChapters } from '../../src/lib/home-story';
import { components } from '../../src/lib/registry';

describe('Interface Cosmos story configuration', () => {
  it('keeps the five chapters in narrative order with unique anchors', () => {
    expect(storyChapters.map((chapter) => chapter.id)).toEqual([
      'signal',
      'constellation',
      'translation',
      'ownership',
      'open-orbit',
    ]);
    expect(new Set(storyChapters.map((chapter) => chapter.id)).size).toBe(storyChapters.length);
  });

  it('resolves every featured component and derives honest registry counts', () => {
    const story = getHomeStory();
    expect(story.featured.map((component) => component.id)).toEqual(featuredComponentIds);
    expect(story.stats.designs).toBe(components.length);
    expect(story.stats.implementations).toBe(components.length * 3);
    expect(story.domains.reduce((sum, domain) => sum + domain.count, 0)).toBeGreaterThanOrEqual(components.length);
  });

  it('accounts for every provenance variant without inventing social metrics', () => {
    const story = getHomeStory();
    expect(story.provenance.original + story.provenance.adapted + story.provenance.remix).toBe(components.length);
  });

  it('keeps exact provenance for every imported design', () => {
    const adapted = components.filter((component) => component.provenance.type === 'adapted');
    expect(adapted).toHaveLength(15);
    for (const component of adapted) {
      if (component.provenance.type !== 'adapted') continue;
      expect(component.provenance.upstreamUrl).toMatch(/^https:\/\/github\.com\/(Ashutoshx7\/VengeanceUI|vercel\/(examples|registry-starter))\/blob\//);
      expect(component.provenance.upstreamLicense).toBe('MIT');
      expect(component.provenance.modification.length).toBeGreaterThan(30);
    }
  });
});
