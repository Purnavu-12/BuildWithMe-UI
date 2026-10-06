import { components, domainLabels, registryStats } from '@/lib/registry';

export const storyChapters = [
  { id: 'signal', index: '01', label: 'Signal' },
  { id: 'constellation', index: '02', label: 'Constellation' },
  { id: 'translation', index: '03', label: 'Translation' },
  { id: 'ownership', index: '04', label: 'Ownership' },
  { id: 'open-orbit', index: '05', label: 'Open orbit' },
] as const;

export const featuredComponentIds = [
  'animated-tabs',
  'folder-preview',
  'stagger-reveal',
  'prompt-composer',
  'sortable-data-table',
  'wave-grid-background',
] as const;

export function getHomeStory() {
  const featured = featuredComponentIds.map((id) => {
    const component = components.find((item) => item.id === id);
    if (!component) throw new Error(`Interface Cosmos references missing component: ${id}`);
    return component;
  });
  const domains = Object.entries(domainLabels).map(([id, label]) => ({
    id,
    label,
    count: components.filter((item) => item.domains.includes(id as keyof typeof domainLabels))
      .length,
  }));
  const provenance = components.reduce(
    (counts, item) => ({ ...counts, [item.provenance.type]: counts[item.provenance.type] + 1 }),
    { original: 0, adapted: 0, remix: 0 },
  );
  return { chapters: storyChapters, featured, domains, provenance, stats: registryStats };
}
