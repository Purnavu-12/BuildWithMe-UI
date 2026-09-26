import { z } from 'zod';

export const frameworks = ['react', 'vue', 'svelte'] as const;
export const engines = ['css', 'motion', 'animejs', 'three'] as const;
export const domains = [
  'actions',
  'forms',
  'navigation',
  'overlays',
  'feedback',
  'data-display',
  'data-visualization',
  'layout',
  'marketing',
  'typography',
  'backgrounds',
  'media',
  'commerce',
  'ai',
  'developer-tools',
  'workflows',
] as const;

export const domainLabels: Record<(typeof domains)[number], string> = {
  actions: 'Actions & buttons',
  forms: 'Forms & input',
  navigation: 'Navigation',
  overlays: 'Overlays',
  feedback: 'Feedback & status',
  'data-display': 'Data display',
  'data-visualization': 'Data visualization',
  layout: 'Layout & cards',
  marketing: 'Marketing & hero',
  typography: 'Text & typography',
  backgrounds: 'Backgrounds & motion',
  media: 'Media',
  commerce: 'Commerce',
  ai: 'AI interfaces',
  'developer-tools': 'Docs & developer tools',
  workflows: 'Workflows',
};

const text = z.string().trim().min(1);
const httpUrl = z.url().refine((value) => /^https?:\/\//.test(value), 'Use an HTTP(S) URL');
const dependencyMap = z.record(
  z.string().regex(/^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/),
  z.string().regex(/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/, 'Pin an exact version'),
);
const verificationCapabilities = z.object({
  props: z.boolean(),
  events: z.boolean(),
  composition: z.boolean(),
  keyboard: z.boolean(),
  labels: z.boolean(),
  state: z.boolean(),
  reducedMotion: z.boolean(),
  styling: z.boolean(),
  errorRecovery: z.boolean(),
});
const frameworkSource = z.object({
  source: text,
  exportName: text,
  usage: text,
  dependencies: dependencyMap,
  verification: z.object({
    status: z.enum(['provisional', 'verified']),
    capabilities: verificationCapabilities,
  }).optional(),
});
const creator = z.object({ name: text, url: httpUrl.optional() });
const provenance = z.discriminatedUnion('type', [
  z.object({ type: z.literal('original'), creator, license: text }),
  z.object({
    type: z.literal('adapted'),
    creator,
    license: text,
    upstreamUrl: httpUrl,
    upstreamAuthor: text,
    upstreamLicense: text,
    modification: text,
  }),
  z.object({
    type: z.literal('remix'),
    creator,
    license: text,
    parent: text,
    modification: text,
  }),
]);

export const componentManifestSchema = z.object({
  schemaVersion: z.literal(2),
  id: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
  title: text,
  summary: text,
  domains: z.array(z.enum(domains)).min(1),
  tags: z.array(text).min(1),
  status: z.enum(['stable', 'new', 'experimental']),
  engines: z.array(z.enum(engines)).min(1),
  frameworks: z.object({
    react: frameworkSource,
    vue: frameworkSource,
    svelte: frameworkSource,
  }),
  installation: z.object({ npm: z.boolean(), source: z.boolean(), copy: z.boolean() }),
  accessibility: z.object({ summary: text, features: z.array(text).min(1) }),
  props: z.array(z.object({ name: text, type: text, default: z.string(), description: text })),
  provenance,
  related: z.array(text).default([]),
  style: text.optional(),
  preview: text.optional(),
});

export type ComponentManifest = z.infer<typeof componentManifestSchema>;
export type Framework = (typeof frameworks)[number];
export type Domain = (typeof domains)[number];

export function defineManifest<const T extends ComponentManifest>(manifest: T): T {
  return manifest;
}
