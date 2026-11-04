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
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/configs/services/LocalesService.ts",
      "note": "Language, lookup, parameters and behavior when a key is missing."
    },
    {
      "title": "SDK · LocaleCatalog.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/configs/common/LocaleCatalog.ts",
      "note": "Supported language codes and dictionary IDs."
    },
    {
      "title": "SDK · LocalesBootstrapBootTask.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/core/boot/LocalesBootstrapBootTask.ts",
      "note": "Language selection at startup; dictionaries load separately."
    }
  ]
}
---

`LocalesService` gets translations from ConfigStore. `LocaleCatalog` supports `en` and `ru`, expecting the IDs `json/locales/en.json` and `json/locales/ru.json` respectively.

This localizes the game itself, rather than the course website. The public Block Puzzle project leaves some labels directly in the layout. The following example shows how to connect dictionaries in a new project.

Include both JSON files in the manifest as `json` and load them before accessing `LocalesService`. Add button and counter labels to the Russian dictionary:

```json
{
  "restart": "Начать заново",
  "score": "Очки: {value}"
}
```

In the component, select a language and substitute the score into the translation. Here, `label` is a Text node, and `SystemServices` is imported from `@gamedevland/engine/di`:

```ts
const locales = this.node.engine.di.get(SystemServices.LocalesService);
locales.setLang('ru');
label.setText(locales.t('score', { value: 120 }));
```

<figure class="sdk-figure is-flow"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">01</span><div><strong>Language</strong><span>ru</span></div></div><div class="sdk-figure__item tone-violet"><span class="sdk-figure__index">02</span><div><strong>Key and parameters</strong><span>score + { value: 120 }</span></div></div><div class="sdk-figure__item tone-green"><span class="sdk-figure__index">03</span><div><strong>Dictionary</strong><span><span lang="ru">«Очки: {value}»</span></span></div></div><div class="sdk-figure__item tone-amber"><span class="sdk-figure__index">04</span><div><strong>Result</strong><span><span lang="ru">«Очки: 120»</span></span></div></div></div><figcaption>The service selects a string; the visual component applies it to Text.</figcaption></figure>

`setLang` changes the current language but does not automatically rewrite existing Text nodes. The component must set the strings again. `getLang()` returns the current language, and `has(key)` checks whether a translation exists.

When looking up a string, the service checks the current dictionary and fallback. If the key is missing, it returns the key itself. A missing dictionary is different: accessing an unprepared file does not automatically load it successfully.

At startup, the engine can choose a language using the platform's hint. Dictionaries for the lookup order must be prepared in advance. Adding a language requires updating the SDK's catalog; a `de.json` file alone is not enough.
