---
{
  "locale": "en",
  "translationKey": "sdk/foundations/config-store",
  "course": "sdk",
  "lesson": "foundations",
  "draft": false,
  "order": 9,
  "title": "Reading game configuration",
  "concept": "ConfigStore and ConfigEntry",
  "description": "Separate loading JSON from validating and using it.",
  "takeaway": [
    "Load and bootstrap first, then read through a decoder.",
    "ConfigEntry keeps the ID and schema together."
  ],
  "sources": [
    {
      "title": "SDK · ConfigStore.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/configs/core/ConfigStore.ts",
      "note": "Storage and validated reads."
    },
    {
      "title": "SDK · ConfigEntry.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/configs/services/ConfigEntry.ts",
      "note": "The json/configs path and decoder contract."
    },
    {
      "title": "SDK · SettingsService.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/configs/services/SettingsService.ts",
      "note": "Reading an individual setting."
    },
    {
      "title": "Block Puzzle · scene.di.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/configs/scene.di.ts",
      "note": "Configurations passed into service constructors."
    }
  ]
}
---

<aside class="lesson-note is-green" aria-labelledby="lesson-purpose">
  <h3 id="lesson-purpose">Why this is needed</h3>
  <p>Different parts of a game need settings. If each service loads and validates the same JSON itself, code is duplicated. We need a shared way to obtain prepared settings.</p>
</aside>

`ConfigStore` holds configurations prepared by the engine. To read the board dimensions, it needs the file ID and a decoder. `ConfigEntry` combines the ID and decoder so they do not have to be passed separately every time.

The `BlockPuzzleConfigEntries.Board` fragment from [schemas.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/configs/schemas.ts#L18):

```ts
static readonly Board = new ConfigEntry(
  'json/configs/scenes/game/board.json',
  SchemaDecoder.object({
    width: SchemaDecoder.number({ integer: true, min: 1 }),
    height: SchemaDecoder.number({ integer: true, min: 1 }),
  }),
);
```

Obtaining a validated value in the service factory in [scene.di.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/configs/scene.di.ts#L30):

```ts
configs.get(
  BlockPuzzleConfigEntries.Board.fileId,
  BlockPuzzleConfigEntries.Board.decoder,
)
```

Here, `configs` is ConfigStore obtained through DI. The file must already have been loaded and placed in the store.

<figure class="sdk-figure is-flow"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">01</span><div><strong>AssetManager</strong><span>Reads JSON from a file</span></div></div><div class="sdk-figure__item tone-violet"><span class="sdk-figure__index">02</span><div><strong>bootstrapConfigBundles</strong><span>Places JSON in ConfigStore</span></div></div><div class="sdk-figure__item tone-green"><span class="sdk-figure__index">03</span><div><strong>ConfigEntry</strong><span>Connects an ID and decoder</span></div></div><div class="sdk-figure__item tone-amber"><span class="sdk-figure__index">04</span><div><strong>ConfigStore.get</strong><span>Returns validated dimensions to the service</span></div></div></div><figcaption>Loading and validation are separate responsibilities.</figcaption></figure>

`assets.preload` loads assets, while `system.boot.configs.engineStartBundles` declares which configuration bundles to prepare for ConfigStore at startup. `sceneEnterBundles` handles data needed only by a particular scene. Simply naming a bundle `configs` is not enough.

<a id="настройки-и-каталоги" class="translation-anchor" aria-hidden="true"></a>
## Settings and catalogs

`SettingsEntry` describes an individual key within a file, and `SettingsService.read(entry)` validates it with its own decoder. This reads author-defined settings; it does not save player progress.

`DecodedConfigStore` is useful when a project already has a type map by ID and a shared decoder resolver. Its `getByEntry` accepts a ConfigEntry. A direct `ConfigStore.get` is enough for one file, as used in the game.

Text styles are connected through `layouts.textStylesConfigId` and validated by `TextStylesConfigDecoder`. Audio settings have their own decoder. Components receive prepared settings without reading and validating the JSON again.
