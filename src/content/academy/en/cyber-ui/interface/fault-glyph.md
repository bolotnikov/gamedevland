---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/fault-glyph",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 15,
  "title": "Fault symbol",
  "concept": "FaultGlyph",
  "description": "Draw a warning symbol and set its distortion.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · FaultGlyph",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/FaultGlyph.ts",
      "note": "Public API parameters and behavior."
    }
  ]
}
---

`FaultGlyph.draw()` builds a warning symbol from three horizontal sections. `distortion` shifts these sections and adds colored fragments. A value of `0` produces an intact, still symbol.

```ts
import { Graphics } from 'pixi.js';
import { CyberPreset, FaultGlyph } from '@gamedevland/cyber-ui';

const g = app.stage.addChild(new Graphics());
const t = CyberPreset.palette;
FaultGlyph.draw(g.clear(), 240, 160, t.danger, t.signal, 1, 8, 6);
```

Arguments are `Graphics`, center `x/y`, primary color, echo color, alpha in `[0, 1]`, distortion, and positive scale. Scale is optional and defaults to `1`.

Warning text and application behavior remain host-owned. For reduced motion, supply distortion `0`; this helper has no separate lifecycle.
