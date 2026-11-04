---
{
  "locale": "en",
  "translationKey": "sdk/foundations/boot",
  "course": "sdk",
  "lesson": "foundations",
  "draft": false,
  "order": 5,
  "title": "From engine startup to the game scene",
  "concept": "Loading and readiness",
  "description": "Separate engine startup from preparing assets for the game scene.",
  "sources": [
    {
      "title": "SDK · Engine.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/core/Engine.ts",
      "note": "Preparing the engine and opening the initial scene."
    },
    {
      "title": "SDK · BaseScene.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/scenes/BaseScene.ts",
      "note": "Automatic scene preloading, layout building and scene entry."
    },
    {
      "title": "SDK · ConfigBootstrapper.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/core/boot/ConfigBootstrapper.ts",
      "note": "Loading JSON bundles and placing their data in ConfigStore."
    },
    {
      "title": "SDK · AssetManager.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/assets/AssetManager.ts",
      "note": "The difference between loadBundle and loadRequiredBundle; loading JSON on demand."
    }
  ]
}
---

<aside class="lesson-note is-green" aria-labelledby="lesson-purpose">
  <h3 id="lesson-purpose">Why this is needed</h3>
  <p>Entering boot does not mean a game can begin yet. The SDK performs the preloading defined in the configuration. The project's service then requests game bundles and initiates the transition to game.</p>
</aside>

<figure class="sdk-figure is-flow" aria-label="Engine startup, loading in boot and the transition to game">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">01</span><div><strong>Engine.run → boot</strong><span>The SDK loads configs and opens the initial scene from <a href="https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/config/game.config.ts" target="_blank" rel="noopener noreferrer">game.config.ts</a>.</span></div></div>
    <div class="sdk-figure__item tone-violet"><span class="sdk-figure__index">02</span><div><strong>Loading in boot</strong><span><a href="https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/boot/services/BootPreloadService.ts" target="_blank" rel="noopener noreferrer">BootPreloadService</a> requests game bundles and emits PreloadCompleted.</span></div></div>
    <div class="sdk-figure__item tone-green"><span class="sdk-figure__index">03</span><div><strong>Transition to game</strong><span>In response to the event, the <a href="https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/boot/commands/OpenGameSceneCommand.ts" target="_blank" rel="noopener noreferrer">transition command</a> calls scenes.start('game').</span></div></div>
  </div>
  <figcaption>boot and game are scene keys in scenes.map. The project defines the transition between them.</figcaption>
</figure>
