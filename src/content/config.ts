import { defineCollection, z } from 'astro:content';

const reviews = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    verdict: z.string().max(160),
    action: z.enum(['adopt', 'experiment', 'watch', 'ignore']),
    depth: z.enum(['quick', 'deep']),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    stack: z.array(z.string()),
    sources: z.array(
      z.object({
        label: z.string(),
        url: z.string().url(),
      }),
    ),
    description: z.string(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { reviews };
