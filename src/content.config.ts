import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { GAME_RELEASE_PLATFORMS } from './data/gameReleasePlatform';
import { GAME_STATUSES } from './data/gameStatus';
import { localeCodes } from './i18n/locales';

const localized = { locale: z.enum(localeCodes), translationKey: z.string().min(1) };

const articles = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
	schema: z.object({
		...localized,
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
		tableOfContents: z.boolean().default(false),
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
			...localized,
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
			playableUrl: z.url().optional(),
			externalUrl: z.url().optional(),
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

const academy = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/academy' }),
	schema: z.object({
		...localized,
		course: z.literal('javascript'),
		lesson: z.literal('engine'),
		order: z.number().int().positive(),
		title: z.string(),
		concept: z.string(),
		description: z.string(),
		takeaway: z.union([z.string(), z.array(z.string())]).nullish(),
		simulation: z.enum(['runtime', 'pipeline', 'tokens', 'token-scanner', 'ast', 'lazy', 'bytecode', 'interpreter', 'interpreter-trace', 'jit', 'deopt', 'stack', 'frames', 'heap', 'heap-trace', 'references', 'reference-trace', 'gc', 'reachability-graph', 'leak', 'threads', 'performance', 'recap']).optional(),
		assessment: z.literal('quiz').optional(),
		sources: z.array(z.object({
			title: z.string(),
			url: z.url().refine((value) => {
				const url = new URL(value);
				return url.protocol === 'https:' && ['tc39.es', 'v8.dev', 'developer.chrome.com', 'html.spec.whatwg.org', 'dom.spec.whatwg.org', '262.ecma-international.org'].includes(url.hostname);
			}, 'Academy sources must use official documentation or specifications.'),
			note: z.string(),
		})).min(1),
	}),
});

const tutorials = defineCollection({
 loader: glob({ pattern: '**/*.md', base: './src/content/tutorials' }),
 schema: z.object({
  ...localized,
  title: z.string(), description: z.string(), seriesTitle: z.string(),
  seriesDescription: z.string(), seriesSlug: z.string(), step: z.number().int(),
  steps: z.array(z.object({ step: z.number().int(), slug: z.string(), title: z.string() })),
  seriesTypeLabel: z.string().optional(), stepLabel: z.string().optional(), readingTime: z.string(),
 }),
});

export const collections = {
	articles,
	games,
	academy,
	tutorials,
};
