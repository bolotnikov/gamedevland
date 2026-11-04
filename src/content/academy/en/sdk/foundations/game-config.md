---
{
  "locale": "en",
  "translationKey": "sdk/foundations/game-config",
  "course": "sdk",
  "lesson": "foundations",
  "draft": false,
  "order": 4,
  "title": "Game configuration",
  "concept": "GameConfig",
  "description": "Connect engine systems, assets, scenes and DI in one place.",
  "takeaway": [
    "GameConfig is the application's composition root.",
    "Geometry and rule values live in separate game configurations."
  ],
  "sources": [
    {
      "title": "SDK · GameConfig.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/core/GameConfig.ts",
      "note": "Configuration fields and types."
    },
    {
      "title": "Block Puzzle · game.config.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/config/game.config.ts",
      "note": "Configuration connections in Block Puzzle."
    }
  ]
}
---

`GameConfig` describes game startup. It is passed to `Engine.run` and defines which systems and scenes to prepare. In Block Puzzle, it is the static field `BlockPuzzleGameConfig.config`.

A shortened version of [game.config.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/config/game.config.ts#L10):

```ts
static readonly config: GameConfig = {
  system: {
    canvasBackground: '#1d57c8',
    screen: {
      land: { width: 960, height: 540 },
      port: { width: 540, height: 960 },
      dpr: 'auto',
      maxDpr: 2,
    },
    boot: { configs: { engineStartBundles: ['configs'] } },
  },
  assets: { bundles: BlockPuzzleAssetsManifest.bundles, preload: ['configs'] },
  scenes: {
    initial: 'boot',
    map: { boot: BootSceneDefinition.config, game: GameSceneDefinition.config },
  },
  di: new BlockPuzzleDiDefinitionRoot(),
};
```

<figure class="sdk-figure is-matrix"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>system</strong><span>Screen, audio, startup policy and persistence</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>assets</strong><span>Known assets and what to load before the first scene</span></div></div><div class="sdk-figure__item tone-green"><div><strong>scenes</strong><span>Initial key and scene definitions</span></div></div><div class="sdk-figure__item tone-amber"><div><strong>di</strong><span>Classes and factories used to supply dependencies</span></div></div></div><figcaption>The configuration connects project parts; it does not contain the piece placement rules.</figcaption></figure>

The `land` and `port` dimensions define virtual screen profiles. They do not fix the browser size: ScreenManager calculates the scale for the current window. `maxDpr` limits rendering density, not the cell dimensions in the game rules.

The optional `layouts.textStylesConfigId` field connects a catalog of text styles. `data` stores arbitrary application data; an unknown structure still needs schema validation when read.

The `scenes.initial` key must exist in `scenes.map`. Each key needs a matching `SceneDiDefinition`. Broken connections are detected at startup, rather than after the first move.
