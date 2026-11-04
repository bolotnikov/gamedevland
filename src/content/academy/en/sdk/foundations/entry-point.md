---
{
  "locale": "en",
  "translationKey": "sdk/foundations/entry-point",
  "course": "sdk",
  "lesson": "foundations",
  "draft": false,
  "order": 3,
  "title": "Starting a game from code",
  "concept": "Engine.run and GameConfig",
  "description": "Trace how the project configuration reaches the engine when Block Puzzle starts.",
  "takeaway": [
    "The project passes a container and GameConfig to Engine.run.",
    "The SDK prepares the engine and opens the initial scene from the game configuration."
  ],
  "sources": [
    {
      "title": "Block Puzzle · main.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/main.ts",
      "note": "Importing Engine from the SDK and starting it with the project configuration."
    },
    {
      "title": "Block Puzzle · game.config.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/config/game.config.ts",
      "note": "Game settings, assets, dependencies and the initial boot scene."
    },
    {
      "title": "SDK · Engine.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/core/Engine.ts",
      "note": "Engine.run creates the engine, prepares the canvas and passes GameConfig to startup."
    }
  ]
}
---

In [game/src/main.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/main.ts), `Engine` is imported from the SDK and `BlockPuzzleGameConfig` from the game project. The imports and startup call are shown below; the original file's page-load check is omitted:

```ts
import { Engine } from '@gamedevland/engine';

import { BlockPuzzleGameConfig } from './config/game.config';

void Engine.run('#app', BlockPuzzleGameConfig.config);
```

The first argument, `'#app'`, points to the HTML container `<div id="app"></div>`: the engine adds its canvas there. The second argument is the [game configuration](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/config/game.config.ts). It defines system settings, assets, scenes and project dependencies.

`Engine.run` creates and prepares the engine using these settings, then opens the initial scene. In Block Puzzle, `scenes.initial` is `'boot'`, so the project's loading scene opens first.

<figure class="sdk-figure is-flow" aria-label="The project passes configuration to Engine.run; the SDK prepares the engine and opens the boot scene selected by the project">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-violet"><span class="sdk-figure__index">01</span><div><strong>Game configuration</strong><span>The project defines system, assets, scenes and di</span></div></div>
    <div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">02</span><div><strong>Engine.run</strong><span>The SDK prepares systems and the canvas</span></div></div>
    <div class="sdk-figure__item tone-green"><span class="sdk-figure__index">03</span><div><strong>The boot scene</strong><span>The SDK opens the scene selected by the project</span></div></div>
  </div>
  <figcaption>The project describes the game; the SDK performs the shared startup process.</figcaption>
</figure>

Game classes, assets and rules remain in the project. The SDK provides the mechanism for connecting and starting them. To run another game, pass a different configuration to the same `Engine.run`.
