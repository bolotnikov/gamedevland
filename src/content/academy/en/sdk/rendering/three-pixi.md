---
{
  "locale": "en",
  "translationKey": "sdk/rendering/three-pixi",
  "course": "sdk",
  "lesson": "rendering",
  "draft": false,
  "order": 4,
  "title": "Three + Pixi: world and UI",
  "concept": "HybridRendererModule",
  "description": "Place a Pixi UI over a 3D world.",
  "sources": [
    {
      "title": "SDK · HybridRendererModule.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/renderers/hybrid/HybridRendererModule.ts",
      "note": "Registering both renderers."
    },
    {
      "title": "SDK · HybridRuntime.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/renderers/hybrid/HybridRuntime.ts",
      "note": "Two canvases with a shared loop and separate trees."
    },
    {
      "title": "SDK · HybridHitTester.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/renderers/hybrid/HybridHitTester.ts",
      "note": "UI-first hit testing."
    }
  ]
}
---

When the game world is 3D but buttons and counters are easier to build in PixiJS, select `HybridRendererModule` from `@gamedevland/engine/renderers/hybrid`. Install `three`, `pixi.js` and `@types/three`.

Set `system.renderer: new HybridRendererModule()` in `GameConfig`. Define two separate roots in one layout:

```json
{
  "world": {
    "type": "Group",
    "children": {
      "camera": {
        "type": "PerspectiveCamera",
        "props": {
          "position": { "x": 0, "y": 2, "z": 5 },
          "lookAt": { "x": 0, "y": 0, "z": 0 },
          "near": 0.1, "far": 100, "fov": 50
        }
      }
    }
  },
  "ui": {
    "type": "Container",
    "children": { "score": { "type": "Text", "props": { "text": "0" } } }
  }
}
```

Set `SceneConfig.render` to `{ camera: 'world.camera' }`. Add game objects to `world` and interface elements to `ui`.

<figure class="sdk-figure is-compare"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>Upper canvas · Pixi</strong><span>Transparent UI, checked first</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>Lower canvas · Three</strong><span>3D world, receives input when the UI is not hit</span></div></div></div><figcaption>One update loop serves both canvases.</figcaption></figure>

The SDK combines them in one logical layout while keeping separate render trees. `Group` accepts Three children; `Container` accepts Pixi children. A Pixi text node cannot be placed inside a Three group. The camera moves the world while UI coordinates remain two-dimensional.
