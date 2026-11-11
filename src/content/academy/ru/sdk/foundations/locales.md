---
{
  "locale": "ru",
  "translationKey": "sdk/foundations/locales",
  "course": "sdk",
  "lesson": "foundations",
  "draft": false,
  "order": 11,
  "title": "Локализация текста игры",
  "concept": "LocalesService",
  "description": "Загрузим словари и получим строку по ключу.",
  "takeaway": [
    "Переводы должны быть подготовлены до чтения.",
    "Смена языка требует обновить отображаемые строки."
  ],
  "sources": [
    {
      "title": "SDK · LocalesService.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/configs/services/LocalesService.ts",
      "note": "Язык, lookup, параметры и поведение при отсутствии ключа."
    },
    {
      "title": "SDK · LocaleCatalog.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/configs/common/LocaleCatalog.ts",
      "note": "Поддерживаемые коды и ID словарей."
    },
    {
      "title": "SDK · LocalesBootstrapBootTask.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/core/boot/LocalesBootstrapBootTask.ts",
      "note": "Выбор языка при старте; словари загружаются отдельно."
    }
  ]
}
---

`LocalesService` получает переводы из ConfigStore. Загрузим словари `json/locales/en.json` и `json/locales/ru.json` до первого чтения строки. В русском словаре запишем `"score": "Очки: {value}"`.

После загрузки настроим выбор языка. Здесь `locales` — сервис по токену `SystemServices.LocalesService` из `@gamedevland/engine/di`:

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

`initialize` выбирает сохранённый язык, затем подсказку площадки, язык браузера или заданный default. `setLang` сохраняет ручной выбор.

<figure class="sdk-figure is-flow"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>Язык</strong><span>ru</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>Ключ и параметры</strong><span>score + { value: 120 }</span></div></div><div class="sdk-figure__item tone-green"><div><strong>Text</strong><span>«Очки: 120»</span></div></div></div></figure>

Для обновления надписей используем `locales.subscribe(handler)` и снимаем подписку при отключении компонента. Смена языка сама не переписывает Text-узлы. После установки перевода `label.fitTo(width, height)` может уменьшить шрифт до заданных границ.

Каталог также поддерживает `es`, `pt-BR`, `de`, `fr`, `it`, `tr`, `zh-CN`, `ja` и `ko`; игра выбирает свой набор в `supportedLocales`. Для каждого используемого языка нужен подготовленный словарь. Если ключа нет в текущем словаре и fallback-словарях, `t` возвращает ключ.
