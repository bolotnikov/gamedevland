import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { GAME_RELEASE_PLATFORMS } from './data/gameReleasePlatform';
import { GAME_STATUSES } from './data/gameStatus';

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

const screenshotSchema = z.object({
	title: z.string(),
	landscapeSrc: z.string(),
	landscapeAlt: z.string(),
	portraitSrc: z.string(),
	portraitAlt: z.string(),
});

const promoVideoSchema = z.object({
	mp4: z.string(),
	poster: z.string(),
});

const games = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/games' }),
	schema: z
		.object({
			title: z.string(),
			description: z.string(),
			status: z.enum(GAME_STATUSES),
			releasePlatform: z.enum(GAME_RELEASE_PLATFORMS).optional(),
			releaseDate: z.coerce.date().optional(),
			releaseYear: z.number().int().min(1970).max(2100).optional(),
			genre: z.string(),
			platforms: z.array(z.string()).default([]),
			technologies: z.array(z.string()).default([]),
			roles: z.array(z.string()).default([]),
			iconImage: z.string(),
			iconAlt: z.string(),
			coverImage: z.string().optional(),
			coverAlt: z.string().optional(),
			logoImage: z.string().optional(),
			screenshots: z.array(screenshotSchema).default([]),
			promoVideo: promoVideoSchema.optional(),
			playableUrl: z.string().url().optional(),
			externalUrl: z.string().url().optional(),
			articleUrl: z.string().regex(/^\//).optional(),
			orientation: z.enum(['landscape', 'portrait', 'adaptive']).default('landscape'),
			embedAspectRatio: z.string().default('16 / 9'),
			fitEmbedToViewport: z.boolean().default(false),
			order: z.number().int().default(0),
			draft: z.boolean().default(false),
		})
		.refine(({ releaseDate, releaseYear }) => !(releaseDate && releaseYear), {
			message: 'Use either releaseDate or releaseYear, not both.',
		})
		.refine(({ coverImage, coverAlt }) => Boolean(coverImage) === Boolean(coverAlt), {
			message: 'Provide coverImage and coverAlt together.',
		}),
});

export const collections = {
	articles,
	games,
};
