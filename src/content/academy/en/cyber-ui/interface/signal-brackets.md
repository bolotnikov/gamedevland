---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/signal-brackets",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 11,
  "title": "Brackets around an emblem",
  "concept": "SignalBrackets",
  "description": "Configure bracket motion and clearance for the central drawing.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · SignalBrackets",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/SignalBrackets.ts",
      "note": "Public API parameters and behavior."
    },
    {
      "title": "Cyber UI Toolkit · TriangleLoader",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/TriangleLoader.ts",
      "note": "Public API parameters and behavior."
    }
  ]
}
---

`SignalBrackets.draw()` draws two brackets around the center. The application supplies elapsed milliseconds and a radius to keep clear. For the loader, obtain this radius with `loader.outerRadius(radius) * visualScale`.

```ts
import { Graphics } from 'pixi.js';
import { CyberPreset, SignalBrackets } from '@gamedevland/cyber-ui';
import type { BracketOptions } from '@gamedevland/cyber-ui';

const g = app.stage.addChild(new Graphics());
const options: BracketOptions = {
  cycleMs: 2400, travel: 12, scale: 0.08, jitter: 1,
  distanceRatio: 0.3, maxDistance: 200, halfHeight: 48, bevel: 10,
  strokeWidth: 2, alpha: 0.45, peakAlpha: 1, markerSize: 8, markerAlpha: 0.7,
};
let elapsedMs = 0;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const tick = (ticker: import('pixi.js').Ticker) => {
  elapsedMs += ticker.deltaMS;
  SignalBrackets.draw(g.clear(), options, app.screen.width, 160,
    64, 1, elapsedMs, 90, reduced,
    CyberPreset.palette.accent, CyberPreset.palette.signal);
};
app.ticker.add(tick);
// On screen removal: app.ticker.remove(tick);
```

After the options, pass width, `centerY`, clearance radius, visual scale, elapsed time, discrete frame duration, reduced motion, and two colors.

`cycleMs` sets the period, `travel` the inward movement, `scale` the additional enlargement, and `jitter` the displacement. `distanceRatio` and `maxDistance` constrain center distance. Other fields control shape, line width, and opacity; alpha fields are in `[0, 1]`. Reduced motion keeps the brackets still.
