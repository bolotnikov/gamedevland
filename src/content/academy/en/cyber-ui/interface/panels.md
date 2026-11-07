---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/panels",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 3,
  "title": "Panels and plates",
  "concept": "TerminalGlass · TerminalUi",
  "description": "Explore the surfaces used for windows, cards, and buttons in the game.",
  "takeaway": [
    "Clear the surface first, then add all its layers."
  ],
  "sources": [
    {
      "title": "Cyber UI Toolkit · surfaces",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/TerminalGlass.ts",
      "note": "The order of glass panel parameters."
    },
    {
      "title": "PixiJS · Graphics",
      "url": "https://pixijs.com/8.x/guides/components/scene-objects/graphics",
      "note": "Accumulating geometry and clear()."
    }
  ]
}
---

`TerminalGlass.draw()` adds edges and translucent layers. `TerminalUi.plate()` draws a simple plate with clipped corners. Both append geometry to [Graphics](https://pixijs.com/8.x/guides/components/scene-objects/graphics).

```ts
import { Graphics } from 'pixi.js';
import { CyberPreset, TerminalGlass, TerminalUi } from '@gamedevland/cyber-ui';

const g = app.stage.addChild(new Graphics());
const t = CyberPreset.palette;
g.position.set(24, 24);
g.clear();
TerminalGlass.draw(g, 0, 0, 360, 220, 12,
  t.panel, t.panelEdge, t.accent, t.text);
TerminalUi.plate(g, 20, 20, 140, 36, 7, t.inset, t.panelEdge);
TerminalUi.icon(g, 'credit', 40, 38, 18, t.accent);
```

The first four numbers after `g` are `x`, `y`, width, and height. The next is the corner cut. The panel automatically limits the cut relative to its dimensions.

`TerminalGlass.focus()` and `TerminalUi.etch()` add accents after the background. Calling `clear()` between layers would remove the geometry already added. The application adds counter text as a separate `Text` object.

AI Defender combines these calls in several ways: a window gets a shadow and glass surface, a plate gets a flat fill, and a square button gets a centered icon. Agent cards and research cells add a selection state; module buttons add an accent stripe.

The gallery shows these six elements. Game portraits are not part of the toolkit: the card uses a vector icon instead. The form lets us select an element, turn off glass, and change dimensions and colors.
