import type { MetadataRoute } from 'next';
import { components } from '@/lib/registry';
import { docs } from '@/lib/docs';

export default function sitemap(): MetadataRoute.Sitemap {
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://build-with-me-ui.vercel.app';
  const fixed = ['', '/components', '/ecosystem', '/contribute'];
  return [
    ...fixed.map((path, index) => ({ url: `${site}${path}`, priority: index === 0 ? 1 : 0.8 })),
    ...components.map((item) => ({ url: `${site}/components/${item.id}`, priority: 0.7 })),
    ...Object.keys(docs).map((slug) => ({ url: `${site}/docs/${slug}`, priority: 0.6 })),
  ];
}
