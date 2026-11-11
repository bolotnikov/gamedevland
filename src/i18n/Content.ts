import { sdkCourse } from '../data/sdkCourse';
import { getCollection, type CollectionEntry } from 'astro:content';
import type { LocaleCode } from './locales';

export class Content {
	static async articles(locale: LocaleCode) { return (await getCollection('articles', ({ data }) => data.locale === locale && !data.draft)).sort((a,b) => b.data.pubDate.getTime()-a.data.pubDate.getTime()); }
	static async games(locale: LocaleCode) { return (await getCollection('games', ({ data }) => data.locale === locale && !data.draft)).sort((a,b) => a.data.order-b.data.order); }
	static isAcademyPublished(data: CollectionEntry<'academy'>['data']): boolean {
		return !data.draft && (data.course !== 'sdk'
			|| sdkCourse.sections.some((section) => section.slug === data.lesson && section.published));
	}
	static isAcademyVisible(data: CollectionEntry<'academy'>['data']): boolean {
		return this.isAcademyPublished(data)
			|| ((import.meta.env.DEV || import.meta.env.MODE === 'academy-preview') && ['sdk', 'cyber-ui'].includes(data.course) && data.locale === 'ru' && data.draft);
	}
	static sdkSections(steps: readonly CollectionEntry<'academy'>[]) {
		return sdkCourse.sections.filter((section) => section.published || steps.some(({ data }) => data.course === 'sdk' && data.lesson === section.slug));
	}
	static async steps(locale: LocaleCode, course = 'javascript', lesson?: string) {
		return (await getCollection('academy', ({ data }) => data.locale === locale
			&& data.course === course && (lesson === undefined || data.lesson === lesson)
			&& this.isAcademyVisible(data))).sort((a,b) => a.data.order-b.data.order);
	}
}
