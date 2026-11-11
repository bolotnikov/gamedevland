---
{
  "locale": "en",
  "translationKey": "sdk/foundations/locales",
  "course": "sdk",
  "lesson": "foundations",
  "draft": false,
  "order": 11,
  "title": "Localizing game text",
  "concept": "LocalesService",
  "description": "Load dictionaries and look up a string by key.",
  "takeaway": [
    "Translations must be prepared before they are read.",
    "Changing the language requires updating displayed strings."
  ],
  "sources": [
    {
      "title": "SDK · LocalesService.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/configs/services/LocalesService.ts",
      "note": "Language, lookup, parameters and behavior when a key is missing."
    },
    {
      "title": "SDK · LocaleCatalog.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/configs/common/LocaleCatalog.ts",
      "note": "Supported language codes and dictionary IDs."
    },
    {
      "title": "SDK · LocalesBootstrapBootTask.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/core/boot/LocalesBootstrapBootTask.ts",
      "note": "Language selection at startup; dictionaries load separately."
    }
  ]
}
---

`LocalesService` gets translations from ConfigStore. Load `json/locales/en.json` and `json/locales/ru.json` before reading the first string. In the Russian dictionary, add `"score": "Очки: {value}"`.

After loading, configure language selection. Here, `locales` is the service resolved with `SystemServices.LocalesService` from `@gamedevland/engine/di`:

```ts
locales.initialize({
  supportedLocales: ['en', 'ru'],
  defaultLocale: 'en',
  deviceLocale: engine.platform.getPreferredLocale(),
  storageKey: 'sdk-game:language',
});

locales.setLang('ru');
label.setText(locales.t('score', { value: 120 }));
```

`initialize` selects the saved language, then the platform hint, browser language or configured default. `setLang` saves a manual choice.

<figure class="sdk-figure is-flow"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>Language</strong><span>ru</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>Key and parameters</strong><span>score + { value: 120 }</span></div></div><div class="sdk-figure__item tone-green"><div><strong>Text</strong><span lang="ru">«Очки: 120»</span></div></div></div></figure>

Use `locales.subscribe(handler)` to update labels and unsubscribe when the component is disabled. Changing the language does not rewrite Text nodes automatically. After setting a translation, `label.fitTo(width, height)` can shrink the font to fit the given bounds.

The catalog also supports `es`, `pt-BR`, `de`, `fr`, `it`, `tr`, `zh-CN`, `ja` and `ko`; the game selects its subset in `supportedLocales`. Each used language needs a prepared dictionary. If a key is missing from the current and fallback dictionaries, `t` returns the key.
