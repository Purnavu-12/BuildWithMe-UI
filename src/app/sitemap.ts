import type { MetadataRoute } from 'next';
import { components } from '@/lib/registry';
import { docs } from '@/lib/docs';

export default function sitemap(): MetadataRoute.Sitemap {
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  if (!site) return [];
  const fixed = ['', '/components', '/ecosystem', '/contribute'];
  return [
    ...fixed.map((path, index) => ({ url: `${site}${path}`, priority: index === 0 ? 1 : .8 })),
    ...components.map((item) => ({ url: `${site}/components/${item.id}`, priority: .7 })),
    ...Object.keys(docs).map((slug) => ({ url: `${site}/docs/${slug}`, priority: .6 })),
  ];
}
