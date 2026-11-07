---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/installation",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 1,
  "title": "Adding the toolkit",
  "concept": "Core and SDK",
  "description": "Install the package and draw the first panel.",
  "takeaway": [
    "Core works with PixiJS 8 without GameDevLand SDK."
  ],
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

`@gamedevland/cyber-ui` draws panels, buttons, and icons in [PixiJS Graphics](https://pixijs.com/8.x/guides/components/scene-objects/graphics) objects. Core is enough for a regular Pixi project. We will use `@gamedevland/cyber-ui-sdk` later for components and actions in our SDK.

```bash
npm install pixi.js @gamedevland/cyber-ui
```

Let’s create an application in a TypeScript/Vite project and add a panel:

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

The panel uses vector geometry, so it needs no images. In the following examples, `app` refers to this application. In an SDK project, we use existing scene nodes instead of creating a second `Application`.

Development requires Node.js 22.12+. The packages are available on npm. To install a local build, run `npm run pack` in the toolkit repository and pass the resulting `.tgz` to `npm install`.
