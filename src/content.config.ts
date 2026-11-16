import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const cases = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/cases' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    product: z.string(),
    role: z.string(),
    team: z.string(),
    timeline: z.string(),
    platform: z.string(),
    tags: z.array(z.string()),
    metrics: z.array(z.object({ value: z.string(), label: z.string(), source: z.string() })),
    cover: image().optional(),
    nda: z.boolean().default(false),
    order: z.number(),
    project: z.string().optional(),
  }),
});

export const collections = { cases };
