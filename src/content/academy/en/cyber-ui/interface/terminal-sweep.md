---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/terminal-sweep",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 12,
  "title": "Scanning sweep",
  "concept": "TerminalSweep",
  "description": "Supply scan progress and direction.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · TerminalSweep",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/TerminalSweep.ts",
      "note": "Public API parameters and behavior."
    }
  ]
}
---

`TerminalSweep.draw()` adds a scanning line, corner accents, and rails. `down` moves from top to bottom; `right` moves from left to right. The default is `down`.

```ts
import { Graphics } from 'pixi.js';
import { CyberPreset, TerminalSweep } from '@gamedevland/cyber-ui';

const g = app.stage.addChild(new Graphics());
const progress = 0.5;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
TerminalSweep.draw(g.clear(), 24, 24, 360, 180,
  progress, CyberPreset.palette.accent, reduced, 'right');
```

Progress is in `[0, 1)`. Outside that range the helper adds nothing; clear the dedicated layer first to remove the previous frame. A looping host can supply `(elapsedSeconds % durationSeconds) / durationSeconds`.

Reduced motion leaves corner accents without a moving line. The application controls pause and completion; the helper creates no timer or ticker.
