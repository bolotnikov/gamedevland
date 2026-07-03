import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		draft: z.boolean().default(false),
		tags: z.array(z.string()).default([]),
		featured: z.boolean().default(false),
		readingTime: z.string(),
		coverImage: z.string().optional(),
		coverAlt: z.string().optional(),
		thumbnailImage: z.string().optional(),
		thumbnailAlt: z.string().optional(),
		category: z.enum(['technical', 'monetization', 'template', 'workshop']).default('technical'),
	}),
});

export const collections = {
	articles,
};
