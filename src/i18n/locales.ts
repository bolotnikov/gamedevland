/** Add a locale here, its message catalog, and its content translations together. */
export const locales = [
	{ code: 'en', label: 'EN', name: 'English', prefix: '', dateLocale: 'en-US' },
	{ code: 'ru', label: 'RU', name: 'Русский', prefix: '/ru', dateLocale: 'ru-RU' },
] as const;
export type LocaleCode = (typeof locales)[number]['code'];
export const localeCodes = locales.map(({ code }) => code);
