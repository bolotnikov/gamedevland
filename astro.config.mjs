// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeRaw from 'rehype-raw';
import rehypeExternalLinks from 'rehype-external-links';
import { locales } from './src/i18n/locales';

/** @type {import('rehype-external-links').Options} */
const externalLinkOptions = {
	target: '_blank',
	rel: ['noopener', 'noreferrer'],
	test: (element) => typeof element.properties.href === 'string'
		&& new URL(element.properties.href, 'https://gamedev.land').origin !== 'https://gamedev.land',
};

// https://astro.build/config
export default defineConfig({
	site: 'https://gamedev.land',
	markdown: {
		shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
		rehypePlugins: [rehypeRaw, [rehypeExternalLinks, externalLinkOptions]],
	},
	integrations: [sitemap({ i18n: { defaultLocale: 'en', locales: Object.fromEntries(locales.map(({ code }) => [code, code])) } })],
});
