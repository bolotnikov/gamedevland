import { locales, type LocaleCode } from '../i18n/locales';

/** Resolves a saved choice before the browser's supported language preferences. */
export class LanguagePreference {
  static resolve(saved: string | null, browserLanguages: readonly string[]): LocaleCode {
    const stored = locales.find(locale => locale.code === saved);
    if (stored) return stored.code;
    for (const language of browserLanguages) {
      const code = language.toLowerCase().split('-')[0];
      const supported = locales.find(locale => locale.code === code);
      if (supported) return supported.code;
    }
    return 'en';
  }
}
