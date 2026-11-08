---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/panels",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 3,
  "title": "Panels and plates",
  "concept": "PanelSurface · TerminalGlass · TerminalUi",
  "description": "Choose a surface for information, a window, and a counter.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · PanelSurface",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/PanelSurface.ts",
      "note": "Public API parameters and behavior."
    },
    {
      "title": "Cyber UI Toolkit · TerminalGlass",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/TerminalGlass.ts",
      "note": "Public API parameters and behavior."
    },
    {
      "title": "Cyber UI Toolkit · TerminalUi",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/TerminalUi.ts",
      "note": "Public API parameters and behavior."
    }
  ]
}
---

`PanelSurface.draw()` draws a quiet information panel with a side rail. `TerminalGlass.draw()` adds beveled corners, highlights, and translucent layers. `TerminalUi.plate()` suits a simple plate or counter.

All three append geometry to [Graphics](https://pixijs.com/8.x/guides/components/scene-objects/graphics). Clear the drawing once before rebuilding it.

```ts
import { Graphics } from 'pixi.js';
import { CyberPreset, PanelSurface, TerminalGlass, TerminalUi } from '@gamedevland/cyber-ui';

const g = app.stage.addChild(new Graphics());
const t = CyberPreset.palette;
g.clear();
PanelSurface.draw(g, { x: 24, y: 24, w: 200, h: 120 }, {
  surface: t.panel, edge: t.panelEdge, accent: t.accent,
});
TerminalGlass.draw(g, 240, 24, 200, 120, 12,
  t.panel, t.panelEdge, t.accent, t.text);
TerminalUi.plate(g, 24, 168, 160, 36, 7, t.inset, t.panelEdge);
TerminalUi.icon(g, 'credit', 44, 186, 18, t.accent);
```

`PanelSurface` takes `UiBounds` (`x`, `y`, `w`, `h`) and `PanelPalette` (`surface`, `edge`, `accent`).

For `TerminalGlass`, position and size are followed by corner cut, fill, edge, accent, and light color. For `plate`, they are followed by corner cut, fill, edge, and optional fill alpha. The corner cut is limited by surface dimensions.

The application owns text and content placement. Use `ButtonSurface` for buttons. Portraits and game cards are compositions of these primitives, rather than separate toolkit panels.
