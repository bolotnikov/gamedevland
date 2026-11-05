---
{
  "locale": "en",
  "translationKey": "sdk/scene-flow/diagnostics",
  "course": "sdk",
  "lesson": "scene-flow",
  "draft": false,
  "order": 13,
  "title": "SDK errors and diagnostics",
  "concept": "Diagnostics",
  "description": "Find the cause from the error code and details.",
  "takeaway": [
    "The error code tells us what the SDK could not find or process."
  ],
  "sources": [
    {
      "title": "SDK · index.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/errors/index.ts",
      "note": "Public diagnostic tools."
    },
    {
      "title": "SDK · DiBootstrapValidator.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/di/DiBootstrapValidator.ts",
      "note": "Checking DI connections at startup."
    },
    {
      "title": "Block Puzzle · GameDevtoolsApiService.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/debug/scenes/game/services/GameDevtoolsApiService.ts",
      "note": "The debug API and hook cleanup."
    }
  ]
}
---

`EngineError` includes a code, a subsystem, details, and the original cause. This helps distinguish a missing asset from an invalid token or bad input.

If the SDK cannot find an asset bundle, `AssetMissingRequired` identifies it by name. `DiProviderNotFound` means the token has no registration.

<figure class="sdk-figure is-matrix"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>Scene did not open</strong><span>scenes.map → SceneDiDefinition → layout ID</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>Component missing</strong><span>JSON type → registration in ComponentsGroup</span></div></div><div class="sdk-figure__item tone-green"><div><strong>Command did not run</strong><span>Current state → event in on → CommandsGroup</span></div></div><div class="sdk-figure__item tone-amber"><div><strong>Configuration could not be read</strong><span>Manifest → loading → bootstrap → decoder</span></div></div><div class="sdk-figure__item tone-cyan"><div><strong>Screen did not update</strong><span>Event → active subscription → correct node</span></div></div></div><figcaption>Follow the chain from the beginning to find the first broken link.</figcaption></figure>

<h2 id="отладка-block-puzzle">Debugging Block Puzzle</h2>

Block Puzzle has a debug service that sends `ResultReady` with a chosen score. This opens the results window without playing a full session. [GameDevtoolsApiService.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/debug/scenes/game/services/GameDevtoolsApiService.ts)
