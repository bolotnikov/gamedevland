import { sdkCourse } from '../data/sdkCourse';
import { getCollection } from 'astro:content';
import type { LocaleCode } from './locales';

export class Content {
	static async articles(locale: LocaleCode) { return (await getCollection('articles', ({ data }) => data.locale === locale && !data.draft)).sort((a,b) => b.data.pubDate.getTime()-a.data.pubDate.getTime()); }
	static async games(locale: LocaleCode) { return (await getCollection('games', ({ data }) => data.locale === locale && !data.draft)).sort((a,b) => a.data.order-b.data.order); }
	static async steps(locale: LocaleCode, course = 'javascript', lesson?: string) {
		return (await getCollection('academy', ({ data }) => data.locale === locale
			&& data.course === course && (lesson === undefined || data.lesson === lesson)
			&& !data.draft && (course !== 'sdk' || sdkCourse.sections.some((section) => section.slug === data.lesson && section.published)))).sort((a,b) => a.data.order-b.data.order);
	}
}
