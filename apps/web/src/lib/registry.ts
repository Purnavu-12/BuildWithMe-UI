import data from '@/generated/registry.json';
import rawSources from '@/generated/sources.json';
import { componentSchema } from '../../../../packages/registry-schema/src/index';
export const components = data.map((item) => componentSchema.parse(item));
export const sources = rawSources as Record<string, { path: string; content: string }[]>;
export const getComponent = (id: string) => components.find((item) => item.id === id);
export const repositoryUrl = process.env.NEXT_PUBLIC_REPOSITORY_URL || '';
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
export const labels: Record<string, string> = {
  buttons: 'Buttons',
  text: 'Text & typography',
  cards: 'Cards & interaction',
  backgrounds: 'Backgrounds',
  ai: 'AI interfaces',
};
export const engineLabels: Record<string, string> = {
  css: 'CSS',
  motion: 'Motion',
  animejs: 'Anime.js',
};
