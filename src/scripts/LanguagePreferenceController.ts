import { locales, type LocaleCode } from '../i18n/locales';
import { LanguagePreference } from './LanguagePreference';

/** Persists language choices and selects the preferred language at the site entry. */
export class LanguagePreferenceController {
  private static readonly key = 'gamedevland:locale:v1';

  constructor() {
    const languages = navigator.languages?.length ? navigator.languages : navigator.language ? [navigator.language] : [];
    const preferred = LanguagePreference.resolve(this.read(), languages);
    this.save(preferred);
    document.addEventListener('click', event => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>('[data-language-link]');
      const language = locales.find(locale => locale.code === link?.hreflang);
      if (language) this.save(language.code);
    });
    // Explicit language URLs remain directly addressable, including shared lesson links.
    if (location.pathname !== '/' || document.documentElement.lang === preferred) return;
    const alternate = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${preferred}"]`);
    if (!alternate) return;
    const target = new URL(alternate.href);
    location.replace(target.pathname + location.search + location.hash);
  }

  private read(): string | null {
    try { return localStorage.getItem(LanguagePreferenceController.key); }
    catch { return 'en'; }
  }

  private save(code: LocaleCode): void {
    try { localStorage.setItem(LanguagePreferenceController.key, code); }
    catch { /* Browser language and ordinary links still work without storage. */ }
  }
}
