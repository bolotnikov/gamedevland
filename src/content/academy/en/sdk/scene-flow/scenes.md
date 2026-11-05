---
{
  "locale": "en",
  "translationKey": "sdk/scene-flow/scenes",
  "course": "sdk",
  "lesson": "scene-flow",
  "draft": false,
  "order": 1,
  "title": "Scenes and SceneManager",
  "concept": "SceneConfig and BaseScene",
  "description": "A scene sets up its environment and delegates game behavior to other objects.",
  "takeaway": [
    "SceneConfig describes how the SDK sets up the scene.",
    "The scene class stays small by using the shared lifecycle."
  ],
  "sources": [
    {
      "title": "SDK · BaseScene.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/scenes/BaseScene.ts",
      "note": "The order of scene entry and exit."
    },
    {
      "title": "SDK · SceneManager.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/scenes/SceneManager.ts",
      "note": "The transition queue, scene stack, and parameters."
    },
    {
      "title": "Block Puzzle · scene.config.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/configs/scene.config.ts",
      "note": "Game scene configuration."
    }
  ]
}
---

`SceneConfig` describes the scene's key, class, assets, layout, and FSM. Block Puzzle defines its game scene in this configuration. [scene.config.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/configs/scene.config.ts)

```ts
import { GameScene } from '../../GameScene';

import { GameFsm } from './fsm.config';

import type { SceneConfig } from '@gamedevland/engine/core';

export class GameSceneDefinition {
  static readonly config: SceneConfig = {
    key: 'game',
    useClass: GameScene,
    layout: 'json/layouts/scenes/game/layout.json',
    fsm: GameFsm.config,
  };
}
```

`BaseScene` provides a shared lifecycle. `FsmDrivenScene` adds ready and update events so the FSM can manage the game flow.

<figure class="sdk-figure is-flow is-scene-lifecycle" aria-label="Lifecycle of a scene with a layout">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-cyan">
      <span class="sdk-figure__index">01</span>
      <div><strong>preload()</strong><span>Loads assets from <code>SceneConfig.assets</code>.</span></div>
    </div>
    <div class="sdk-figure__item tone-violet">
      <span class="sdk-figure__index">02</span>
      <div>
        <strong>onEnter()</strong>
        <ol class="sdk-scene-enter-steps">
          <li>Creates the scene DI container and builds the layout</li>
          <li>Prepares the configurations and starts services</li>
          <li>Activates components and starts the FSM if configured</li>
          <li>Calls <code>create()</code>. In <code>FsmDrivenScene</code>, this method sends <code>SceneReady</code>.</li>
        </ol>
      </div>
    </div>
    <div class="sdk-figure__item tone-amber">
      <span class="sdk-figure__index">03</span>
      <div><strong>onExit()</strong><span>Stops the FSM and releases scene services, particles, layout, and DI.</span></div>
    </div>
  </div>
</figure>

<aside class="lesson-note" aria-labelledby="scene-layout-requirement">
  <span class="lesson-note__label">Important</span>
  <h3 id="scene-layout-requirement">A scene with an FSM</h3>
  <p>In <code>BaseScene</code>, services and the FSM start when a <code>layout</code> is set. The blank project in the first section runs its scene without a layout. For a scene with an FSM, set <code>layout</code> and use <code>FsmDrivenScene</code>.</p>
</aside>

In the public project, `GameScene` simply passes the configuration to its base class. Piece placement logic lives elsewhere.

<h2 id="переходы-между-сценами">Scene transitions</h2>

`SceneManager.start(key)` opens the initial scene. `replace(key, options)` replaces the top scene, `push` adds a scene to the stack, and `pop` removes the top one. Only the top scene updates, and only while it is unpaused. Transitions run through a queue, and lifecycle hooks have a timeout.

Pass input to the new scene through `options.params`. A command reads it from `sceneParams` and validates it with `decodeSceneParams`. Transition parameters are separate from the current session state.
