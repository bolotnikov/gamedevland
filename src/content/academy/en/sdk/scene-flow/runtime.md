---
{
  "locale": "en",
  "translationKey": "sdk/scene-flow/runtime",
  "course": "sdk",
  "lesson": "scene-flow",
  "draft": false,
  "order": 12,
  "title": "Game updates and pausing",
  "concept": "Runtime systems",
  "description": "See what the SDK updates each frame and how it pauses the game.",
  "takeaway": [
    "The game resumes when all pause reasons have cleared."
  ],
  "sources": [
    {
      "title": "SDK · RuntimeSystemPhase.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/runtime/RuntimeSystemPhase.ts",
      "note": "Order of update phases."
    },
    {
      "title": "SDK · EnginePauseController.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/core/runtime/EnginePauseController.ts",
      "note": "Combining pause reasons."
    },
    {
      "title": "SDK · RuntimeActivity.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/core/runtime/RuntimeActivity.ts",
      "note": "Observable activity state."
    },
    {
      "title": "SDK · SceneService.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/scenes/SceneService.ts",
      "note": "The service update contract."
    }
  ]
}
---

The SDK updates the layout, scene services, physics, particles, and tweens in a fixed order. It then runs presentation updates in `camera → world → ui` order and renders the frame. All selected renderers share one update loop. Game code takes part through component and service update methods.

<figure class="sdk-figure is-flow is-long"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">01</span><div><strong>layout</strong><span>Updates nodes and enabled components</span></div></div><div class="sdk-figure__item tone-violet"><span class="sdk-figure__index">02</span><div><strong>scene</strong><span>Updates scene services. FsmDrivenScene emits SceneTick.</span></div></div><div class="sdk-figure__item tone-green"><span class="sdk-figure__index">03</span><div><strong>physics</strong><span>Updates services in the physics phase</span></div></div><div class="sdk-figure__item tone-amber"><span class="sdk-figure__index">04</span><div><strong>particles</strong><span>Updates particles</span></div></div><div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">05</span><div><strong>tweens</strong><span>Updates engine animations</span></div></div></div><figcaption>One frame of the standard scheduler. Scene and component hooks receive dt in seconds.</figcaption></figure>

Components use `onUpdate(dt)`, and scene services use `onSceneTick(ctx)`. A service with `tickPhase: 'physics'` updates during the physics phase.

<h2 id="причины-паузы">Pause reasons</h2>

An inactive tab, a manual action, the platform, or an ad can pause the game. The game stays paused while any reason is active. When an ad ends, the game stays paused if the tab is still inactive. Losing focus while the page remains visible does not pause the game by itself.

`TweenManager.delayMs` stops counting while the game is paused.

Read the activity state to check whether the game is paused.

```ts
const snapshot = this.node.engine.activity.getSnapshot();
const paused = snapshot.effectivePaused;
```

`activity.subscribe(handler)` reports changes to the pause state and returns a function that unsubscribes.
