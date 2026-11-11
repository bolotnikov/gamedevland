---
{
  "locale": "en",
  "translationKey": "sdk/rendering/renderers",
  "course": "sdk",
  "lesson": "rendering",
  "draft": false,
  "order": 1,
  "title": "Four rendering modes",
  "concept": "Renderer selection",
  "description": "Choose how PixiJS and Three.js render the game.",
  "sources": [
    {
      "title": "SDK · GameConfig.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/core/GameConfig.ts",
      "note": "Required renderer selection."
    },
    {
      "title": "SDK · package.json",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/package.json",
      "note": "Public modules and optional Pixi and Three dependencies."
    },
    {
      "title": "SDK · MIGRATION_RENDERERS.md",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/MIGRATION_RENDERERS.md",
      "note": "Four ways to configure rendering."
    }
  ]
}
---

Select rendering once in `GameConfig.system.renderer`. The SDK supports four options:

| Mode | Module | What it renders |
| --- | --- | --- |
| Pixi-only | `PixiRendererModule` | A 2D game using PixiJS |
| Three-only | `ThreeRendererModule` | A 3D game using Three.js |
| Three + Pixi | `HybridRendererModule` | A 3D world with a Pixi UI overlay |
| Pixi + Three-as-texture | `PixiThreeTextureRendererModule` | A Pixi game with 3D inside a sprite texture |

For example, select Three for a new project:

```ts
import { ThreeRendererModule } from '@gamedevland/engine/renderers/three';

// Inside GameConfig:
system: { renderer: new ThreeRendererModule() },
```

The module registers rendering and standard node types. Scenes, FSMs, commands and asset loading use shared APIs. Switching renderers during the game is not supported.

For Pixi, install `pixi.js`; for Three, install `three` and `@types/three`. Both combined options need all three packages. Install the SDK without a version suffix: `npm install @gamedevland/engine @gamedevland/vite`.

The next four lessons cover each mode separately. Then we will load a GLB and set the update order for the camera, world and UI.
