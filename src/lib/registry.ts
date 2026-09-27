import data from '@/generated/registry.json';
import rawSources from '@/generated/sources.json';
import { componentManifestSchema, domainLabels, frameworks, engines } from '@/registry/schema';
import type { Framework } from '@/registry/schema';

export const components = data.map((item) => componentManifestSchema.parse(item));
export const sources = rawSources as Record<
  string,
  Record<Framework, { path: string; content: string }[]>
>;
export const getComponent = (id: string) => components.find((item) => item.id === id);
export const repositoryUrl =
  process.env.NEXT_PUBLIC_REPOSITORY_URL || 'https://github.com/Purnavu-12/BuildWithMe-UI';
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://build-with-me-ui.vercel.app';
export { domainLabels, frameworks, engines };

export const frameworkLabels: Record<Framework, string> = {
  react: 'React / Next.js',
  vue: 'Vue / Nuxt',
  svelte: 'Svelte / SvelteKit',
};

export const engineLabels: Record<string, string> = {
  css: 'CSS',
  motion: 'Motion',
  animejs: 'Anime.js',
  three: 'Three.js',
};

export const registryStats = {
  designs: components.length,
  implementations: components.length * frameworks.length,
  domains: new Set(components.flatMap((item) => item.domains)).size,
  frameworks: frameworks.length,
};
