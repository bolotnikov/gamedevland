---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/installation",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 1,
  "title": "Adding Cyber UI to a project",
  "concept": "Core and SDK",
  "description": "Choose a package and draw the first panel.",
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

Cyber UI Toolkit has two packages. The core package provides panels, buttons, icons, and effects for any PixiJS project. The second package is an optional adapter for GameDevLand SDK.

<figure class="sdk-boundary cyber-packages">
  <div class="sdk-boundary__modules">
    <section class="sdk-boundary__module-group is-cyan">
      <h4>Core package</h4>
      <p class="cyber-packages__name"><code>@gamedevland/cyber-ui</code></p>
      <ul><li><strong>Panels</strong></li><li><strong>Buttons</strong></li><li><strong>Icons</strong></li><li><strong>Effects</strong></li></ul>
      <p class="cyber-packages__use">Works with PixiJS 8. No game engine required.</p>
    </section>
    <section class="sdk-boundary__module-group is-green">
      <h4>Optional SDK adapter</h4>
      <p class="cyber-packages__name"><code>@gamedevland/cyber-ui-sdk</code></p>
      <ul><li><code>ToolkitComponent</code><span>Effects in engine components</span></li><li><code>PanelReveal</code><span>Panel transitions</span></li></ul>
      <p class="cyber-packages__use">Add alongside the core package for GameDevLand SDK projects.</p>
    </section>
  </div>
</figure>

Without a game engine, PixiJS and the core package are enough:

```bash
npm install pixi.js @gamedevland/cyber-ui
```

In `main.ts`, create a PixiJS application and a glass panel:

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

The remaining examples use this same `app`.

For a GameDevLand SDK game, also install the adapter:

```bash
npm install pixi.js @gamedevland/cyber-ui @gamedevland/cyber-ui-sdk @gamedevland/engine@0.0.11
```

In an SDK game, we draw in the scene's existing nodes. The adapter helps update effects and stop them when the scene closes. The SDK lesson covers its setup.
