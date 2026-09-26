import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BuildWithMe UI',
    short_name: 'BuildWithMe',
    description: 'Open component designs for React, Vue, and Svelte.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050505',
    theme_color: '#050505',
    icons: [{ src: '/icon', sizes: '64x64', type: 'image/png' }],
  };
}
