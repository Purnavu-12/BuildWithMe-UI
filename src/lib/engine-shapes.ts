export type EngineMode = 'assemble' | 'explore' | 'translate';
export const engineModes = [
  {
    id: 'assemble',
    label: 'Assemble',
    description: 'Source parts come together into one interface.',
  },
  {
    id: 'explore',
    label: 'Explore',
    description: 'One source opens into a constellation of possibilities.',
  },
  {
    id: 'translate',
    label: 'Translate',
    description: 'The same idea takes three framework expressions.',
  },
] as const;

export function enginePoint(index: number, count: number, chapter: number) {
  const angle = (index / Math.max(count, 1)) * Math.PI * 2;
  if (chapter === 1)
    return {
      x: Math.cos(angle) * (3.3 + (index % 3) * 0.22),
      y: Math.sin(angle) * 1.65,
      z: Math.sin(angle * 2) * 0.65,
    };
  if (chapter === 2) {
    const branch = index % 3;
    const local = (Math.floor(index / 3) / Math.ceil(count / 3)) * Math.PI * 2;
    return {
      x: (branch - 1) * 3.05 + Math.cos(local) * 0.8,
      y: Math.sin(local) * 0.9,
      z: Math.cos(local * 2) * 0.25,
    };
  }
  if (chapter === 3)
    return {
      x: ((index % 11) - 5) * 0.66,
      y: 1.1 - Math.floor(index / 11) * 0.43,
      z: Math.sin(index) * 0.12,
    };
  if (chapter === 4)
    return { x: Math.cos(angle) * 3.6, y: Math.sin(angle) * 1.55, z: Math.sin(angle * 3) * 0.5 };
  return {
    x: (((index * 37 + 11) % 100) / 100 - 0.5) * 10.4,
    y: (((index * 53 + 7) % 100) / 100 - 0.5) * 3.55,
    z: ((index % 3) - 1) * 0.25,
  };
}
