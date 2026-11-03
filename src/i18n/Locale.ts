import { z } from 'astro/zod';
import { locales, type LocaleCode } from './locales';

const messageSchema = z.record(z.string(), z.string());
const catalogs = import.meta.glob('./messages/*.json', { eager: true, import: 'default' });

export class Locale {
	private readonly messages: Record<string, string>;
	constructor(readonly code: LocaleCode) {
		this.messages = messageSchema.parse(catalogs[`./messages/${code}.json`]);
	}
	static forPath(pathname: string): Locale {
		const language = locales.find(({ prefix }) => prefix && (pathname === prefix || pathname.startsWith(`${prefix}/`)));
		return new Locale(language?.code ?? 'en');
	}
	static fromDocument(): Locale {
		const language = locales.find(({ code }) => code === document.documentElement.lang);
		return new Locale(language?.code ?? 'en');
	}
	t(source: string, values: Record<string, string | number> = {}): string {
		const key = source.replace(/\s+/g, ' ').trim();
		if (!/\p{L}/u.test(key)) return source;
		const message = this.messages[key];
		if (message === undefined) throw new Error(`Missing ${this.code} translation: ${key}`);
		const result = message.replace(/\{(\w+)\}/g, (match, name: string) => String(values[name] ?? match));
		return (/^\s/.test(source) ? ' ' : '') + result + (/\s$/.test(source) ? ' ' : '');
	}
	path(input: string, target: LocaleCode = this.code): string {
		if (!input.startsWith('/') || input.startsWith('//')) return input;
		const definition = locales.find(({ code }) => code === target);
		if (!definition) throw new Error(`Unsupported locale: ${target}`);
		let path = input;
		for (const { prefix } of locales) {
			if (prefix && (path === prefix || path.startsWith(`${prefix}/`))) { path = path.slice(prefix.length) || '/'; break; }
		}
		return `${definition.prefix}${path}`;
	}
	get dateLocale(): string { return locales.find(({ code }) => code === this.code)?.dateLocale ?? 'en-US'; }
}
