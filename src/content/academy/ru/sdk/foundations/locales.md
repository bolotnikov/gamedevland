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
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/configs/services/LocalesService.ts",
      "note": "Язык, lookup, параметры и поведение при отсутствии ключа."
    },
    {
      "title": "SDK · LocaleCatalog.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/configs/common/LocaleCatalog.ts",
      "note": "Поддерживаемые коды и ID словарей."
    },
    {
      "title": "SDK · LocalesBootstrapBootTask.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/core/boot/LocalesBootstrapBootTask.ts",
      "note": "Выбор языка при старте; словари загружаются отдельно."
    }
  ]
}
---

`LocalesService` получает переводы из ConfigStore. Каталог `LocaleCatalog` поддерживает `en` и `ru`; для них ожидаются ID `json/locales/en.json` и `json/locales/ru.json`.

В отличие от курса на сайте, это локализация самой игры. Публичный Block Puzzle оставляет часть надписей прямо в layout. Следующий пример показывает, как подключить словари в новом проекте.

Оба JSON включим в манифест как `json` и загрузим до обращения к `LocalesService`. В русский словарь добавим надписи для кнопки и счётчика:

```json
{
  "restart": "Начать заново",
  "score": "Очки: {value}"
}
```

В компоненте выберем язык и подставим очки в перевод. Здесь `label` — узел Text, а `SystemServices` импортирован из `@gamedevland/engine/di`:

```ts
const locales = this.node.engine.di.get(SystemServices.LocalesService);
locales.setLang('ru');
label.setText(locales.t('score', { value: 120 }));
```

<figure class="sdk-figure is-flow"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">01</span><div><strong>Язык</strong><span>ru</span></div></div><div class="sdk-figure__item tone-violet"><span class="sdk-figure__index">02</span><div><strong>Ключ и параметры</strong><span>score + { value: 120 }</span></div></div><div class="sdk-figure__item tone-green"><span class="sdk-figure__index">03</span><div><strong>Словарь</strong><span>«Очки: {value}»</span></div></div><div class="sdk-figure__item tone-amber"><span class="sdk-figure__index">04</span><div><strong>Результат</strong><span>«Очки: 120»</span></div></div></div><figcaption>Сервис выбирает строку; визуальный компонент применяет её к Text.</figcaption></figure>

`setLang` меняет текущий язык, но не переписывает автоматически уже нарисованные Text-узлы. Компонент должен повторно установить строки. `getLang()` возвращает текущий язык, `has(key)` проверяет наличие перевода.

При поиске строки сервис проверяет текущий словарь и fallback. Если ключ не найден, возвращает сам ключ. Отсутствующий словарь — другая ситуация: обращение к неподготовленному файлу не заменяется автоматически успешной загрузкой.

При старте движок может выбрать язык с учётом подсказки платформы. Словари для используемого порядка поиска должны быть подготовлены заранее. Добавление нового языка потребует обновления каталога SDK; одного файла `de.json` недостаточно.
