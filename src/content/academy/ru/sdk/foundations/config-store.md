---
{
  "locale": "ru",
  "translationKey": "sdk/foundations/config-store",
  "course": "sdk",
  "lesson": "foundations",
  "draft": false,
  "order": 9,
  "title": "Читаем конфигурацию игры",
  "concept": "ConfigStore и ConfigEntry",
  "description": "Отделим загрузку JSON от его проверки и использования.",
  "takeaway": [
    "Сначала загрузка и bootstrap, затем чтение через декодер.",
    "ConfigEntry сохраняет ID и схему рядом."
  ],
  "sources": [
    {
      "title": "SDK · ConfigStore.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/configs/core/ConfigStore.ts",
      "note": "Хранение и проверенное чтение."
    },
    {
      "title": "SDK · ConfigEntry.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/configs/services/ConfigEntry.ts",
      "note": "Контракт пути json/configs и декодера."
    },
    {
      "title": "SDK · SettingsService.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/configs/services/SettingsService.ts",
      "note": "Чтение отдельной настройки."
    },
    {
      "title": "Block Puzzle · scene.di.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/configs/scene.di.ts",
      "note": "Конфигурации передаются в конструкторы сервисов."
    }
  ]
}
---

<aside class="lesson-note is-green" aria-labelledby="lesson-purpose">
  <h3 id="lesson-purpose">Зачем это нужно</h3>
  <p>Настройки нужны разным частям игры. Если каждый сервис сам загружает и проверяет один и тот же JSON, код дублируется. Нужен общий способ получать подготовленные настройки.</p>
</aside>

`ConfigStore` хранит конфигурации, подготовленные движком. Чтобы прочитать размеры поля, ему нужны ID файла и декодер. `ConfigEntry` объединяет ID и декодер, чтобы не передавать их каждый раз отдельно.

Фрагмент `BlockPuzzleConfigEntries.Board` из [schemas.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/configs/schemas.ts#L18):

```ts
static readonly Board = new ConfigEntry(
  'json/configs/scenes/game/board.json',
  SchemaDecoder.object({
    width: SchemaDecoder.number({ integer: true, min: 1 }),
    height: SchemaDecoder.number({ integer: true, min: 1 }),
  }),
);
```

Получение проверенного значения в фабрике сервиса из [scene.di.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/configs/scene.di.ts#L30):

```ts
configs.get(
  BlockPuzzleConfigEntries.Board.fileId,
  BlockPuzzleConfigEntries.Board.decoder,
)
```

Здесь `configs` — ConfigStore, полученный через DI. Файл уже должен быть загружен и помещён в хранилище.

<figure class="sdk-figure is-flow"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">01</span><div><strong>AssetManager</strong><span>Получает JSON из файла</span></div></div><div class="sdk-figure__item tone-violet"><span class="sdk-figure__index">02</span><div><strong>bootstrapConfigBundles</strong><span>Размещает JSON в ConfigStore</span></div></div><div class="sdk-figure__item tone-green"><span class="sdk-figure__index">03</span><div><strong>ConfigEntry</strong><span>Связывает ID и декодер</span></div></div><div class="sdk-figure__item tone-amber"><span class="sdk-figure__index">04</span><div><strong>ConfigStore.get</strong><span>Возвращает проверенные размеры сервису</span></div></div></div><figcaption>Загрузка и проверка — две разные обязанности.</figcaption></figure>

`assets.preload` загружает ресурсы, а `system.boot.configs.engineStartBundles` объявляет, какие наборы конфигов подготовить для ConfigStore при старте. Для данных, нужных только конкретной сцене, есть `sceneEnterBundles`. Просто назвать набор `configs` недостаточно.

<a id="settings-and-catalogs" class="translation-anchor" aria-hidden="true"></a>
## Настройки и каталоги

`SettingsEntry` описывает отдельный ключ внутри файла, а `SettingsService.read(entry)` проверяет его собственным декодером. Это чтение авторских настроек, не сохранение прогресса игрока.

`DecodedConfigStore` полезен, когда проект уже имеет карту типов по ID и общий resolver декодеров. Его `getByEntry` принимает ConfigEntry. Для одного файла прямого `ConfigStore.get` достаточно — так сделано и в игре.

Стили текста подключаются через `layouts.textStylesConfigId` и проверяются `TextStylesConfigDecoder`. Настройки звука имеют свой декодер. Компоненты получают готовые настройки, без повторного чтения и проверки JSON.
