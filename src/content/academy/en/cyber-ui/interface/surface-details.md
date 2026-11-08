---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/surface-details",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 8,
  "title": "Surface lines and accents",
  "concept": "focus · traces · etch · clippedRect",
  "description": "Add decoration without erasing the panel.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · TerminalUi",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/TerminalUi.ts",
      "note": "Public API parameters and behavior."
    },
    {
      "title": "Cyber UI Toolkit · TerminalGlass",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/TerminalGlass.ts",
      "note": "Public API parameters and behavior."
    }
  ]
}
---

Draw the background first, then append decorative layers to the same `Graphics`. `traces()` adds circuit lines, `etch()` adds short markings, and `focus()` adds corner accents and a top rail.

```ts
import { Graphics } from 'pixi.js';
import { CyberPreset, TerminalGlass, TerminalUi } from '@gamedevland/cyber-ui';

const g = app.stage.addChild(new Graphics());
const t = CyberPreset.palette;
const area = { x: 24, y: 24, w: 360, h: 180 };
g.clear();
TerminalUi.plate(g, area.x, area.y, area.w, area.h, 12, t.panel, t.panelEdge, 0.9);
TerminalUi.traces(g, area.x, area.y, area.w, area.h, t.accent);
TerminalUi.etch(g, area.x, area.y, area.w, area.h, t.accent);
TerminalGlass.focus(g, area.x, area.y, area.w, area.h, t.signal);
TerminalUi.clippedRect(g, area, 12, 24, 28, 360, 8);
g.fill({ color: t.accent, alpha: 0.2 });
```

`clippedRect(g, area, cut, x, y, w, h)` appends a strip path that respects the beveled side boundaries. Call `fill()` or `stroke()` afterward. Keep the strip vertically inside `area`; this helper is not a general mask.

The last `plate()` argument controls fill alpha from `0` to `1`; its border is drawn separately. `etch()` adds nothing below width `70` or height `28`. Do not call `clear()` between layers.
