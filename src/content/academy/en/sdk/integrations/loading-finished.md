---
{
  "locale": "en",
  "course": "sdk",
  "lesson": "integrations",
  "draft": false,
  "translationKey": "sdk/integrations/loading-finished",
  "order": 2,
  "title": "Signaling that loading is complete",
  "concept": "loadingFinished",
  "description": "Tell the platform when the game is ready to play.",
  "takeaway": [
    "With a separate loading scene, send the signal after switching to the game scene."
  ],
  "sources": [
    {
      "title": "SDK · Engine.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/core/Engine.ts",
      "note": "Automatic loadingFinished after entering the initial scene and the autoLoadingFinished setting."
    },
    {
      "title": "SDK · PlatformManager.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/platforms/PlatformManager.ts",
      "note": "Passing loadingFinished to the platform adapter."
    }
  ]
}
---

By default, the SDK reports that the game is ready after entering the first scene. If that scene displays a loading screen, set `system.boot.autoLoadingFinished: false` in `GameConfig`. Once the assets have loaded and the game scene is open, call the method yourself.

```ts
this.sceneContext.engine.platform.loadingFinished();
```

<figure class="sdk-figure is-flow">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-cyan"><div><strong>Loading scene</strong><span>Load the assets</span></div></div>
    <div class="sdk-figure__item tone-violet"><div><strong>Game scene</strong><span>Open the game</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>loadingFinished()</strong><span>The platform knows the game is ready</span></div></div>
  </div>
</figure>
