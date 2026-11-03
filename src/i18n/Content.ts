import { getCollection } from 'astro:content';
import type { LocaleCode } from './locales';

export class Content {
	static async articles(locale: LocaleCode) { return (await getCollection('articles', ({ data }) => data.locale === locale && !data.draft)).sort((a,b) => b.data.pubDate.getTime()-a.data.pubDate.getTime()); }
	static async games(locale: LocaleCode) { return (await getCollection('games', ({ data }) => data.locale === locale && !data.draft)).sort((a,b) => a.data.order-b.data.order); }
	static async steps(locale: LocaleCode) { return (await getCollection('academy', ({ data }) => data.locale === locale)).sort((a,b) => a.data.order-b.data.order); }
}
