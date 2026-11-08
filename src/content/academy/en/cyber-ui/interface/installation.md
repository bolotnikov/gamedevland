---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/installation",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 1,
  "title": "Install for PixiJS or the SDK",
  "concept": "Core and SDK",
  "description": "Choose a package and run the UI without a game engine.",
  "sources": [
    {
      "title": "Cyber UI Toolkit",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit",
      "note": "Packages, requirements, and public API."
    },
    {
      "title": "PixiJS · Graphics",
      "url": "https://pixijs.com/8.x/guides/components/scene-objects/graphics",
      "note": "Creating and adding a vector surface."
    }
  ]
}
---

The two packages separate drawing from game-engine integration.

| Package | Provides | When to use it |
| --- | --- | --- |
| `@gamedevland/cyber-ui` | Panels, buttons, icons, and every visual effect | Any PixiJS 8 project |
| `@gamedevland/cyber-ui-sdk` | `ToolkitComponent` and the `PanelReveal` action | A GameDevLand SDK project |

Without the SDK, the entire core visual API works the same way. The application manages layout, input, effect updates, pause, and cleanup. The adapter connects effects to the SDK component lifecycle and adds an action using SDK tweens.

For a standalone TypeScript/Vite project, install only PixiJS and core:

```bash
npm install pixi.js @gamedevland/cyber-ui
```

Create `main.ts` and add a panel:

```ts
import { Application, Graphics } from 'pixi.js';
import { CyberPreset, TerminalGlass } from '@gamedevland/cyber-ui';

const app = new Application();
await app.init({ width: 480, height: 320, background: 0x07111d });
document.body.appendChild(app.canvas);

const panel = app.stage.addChild(new Graphics());
const t = CyberPreset.palette;
TerminalGlass.draw(panel, 24, 24, 432, 272, 12,
  t.panel, t.panelEdge, t.accent, t.text);
```

The following examples use this `app`. For animation, pass `ticker.deltaMS / 1000` to `effect.update()`. On screen removal, unregister the callback and call `effect.dispose()`.

For a GameDevLand SDK project, also install the adapter and a compatible engine:

```bash
npm install pixi.js @gamedevland/cyber-ui @gamedevland/cyber-ui-sdk @gamedevland/engine@0.0.11
```

Use existing SDK nodes and its update loop; no second `Application` is needed. The final lessons cover adapter components and actions. Development requires Node.js 22.12+.
