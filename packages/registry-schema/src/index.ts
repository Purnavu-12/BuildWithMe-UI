import { z } from 'zod';
export const categories = ['buttons', 'text', 'cards', 'backgrounds', 'ai'] as const;
export const engines = ['css', 'motion', 'animejs'] as const;
export const categoryLabels: Record<string, string> = {
  buttons: 'Buttons',
  text: 'Text & typography',
  cards: 'Cards & interaction',
  backgrounds: 'Backgrounds',
  ai: 'AI interfaces',
};
const nonempty = z.string().trim().min(1);
const sourceUrl = z.url().refine(value=>/^https?:\/\//.test(value),'Use an HTTP(S) source URL');
export const componentSchema = z
  .object({
    schemaVersion: z.literal(1),
    id: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/),
    title: nonempty,
    description: nonempty,
    category: z.enum(categories),
    framework: z.literal('react'),
    engine: z.enum(engines),
    tags: z.array(nonempty).min(1),
    files: z.array(nonempty).min(1),
    preview: nonempty,
    dependencies: z.record(z.string().regex(/^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/), z.string().regex(/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/,'Pin an exact package version')),
    author: z.object({ name: nonempty, url: sourceUrl.optional() }),
    license: z.literal('MIT'),
    origin: z.enum(['original', 'adapted']),
    sourceUrl: sourceUrl.optional(),
    adaptations: z.array(nonempty),
    parent: nonempty.optional(),
    usage: nonempty,
    accessibility: nonempty,
    props: z.array(
      z.object({ name: nonempty, type: nonempty, default: z.string(), description: nonempty }),
    ),
  })
  .superRefine((v, ctx) => {
    if (v.origin === 'adapted' && !v.sourceUrl)
      ctx.addIssue({
        code: 'custom',
        path: ['sourceUrl'],
        message: 'Adaptations require a source URL',
      });
    if(v.origin==='adapted'&&!v.adaptations.length)ctx.addIssue({code:'custom',path:['adaptations'],message:'Describe the adaptations'});
  });
export type RegistryComponent = z.infer<typeof componentSchema>;
export type DiscoveryItem = Pick<
  RegistryComponent,
  'id' | 'title' | 'description' | 'category' | 'engine' | 'tags' | 'author'
>;
