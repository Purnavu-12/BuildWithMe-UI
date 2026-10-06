import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BuildWithMe UI',
    short_name: 'BuildWithMe',
    description:
      'Kinetic Playground: expressive open component designs for React, Vue, and Svelte.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b0d10',
    theme_color: '#0b0d10',
    icons: [{ src: '/icon', sizes: '64x64', type: 'image/png' }],
  };
}
