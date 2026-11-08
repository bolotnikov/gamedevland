---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/binary-field",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 9,
  "title": "Binary background",
  "concept": "BinaryField",
  "description": "Add an automatically changing binary background.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · BinaryField",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/BinaryField.ts",
      "note": "Seed, frame, and pattern construction."
    }
  ]
}
---

`BinaryField.draw()` builds a pattern of zeros and ones. It does not track time: the application passes an integer frame number. The same dimensions, seed, and frame produce the same geometry.

```ts
import { Graphics } from 'pixi.js';
import type { Ticker } from 'pixi.js';
import { BinaryField, CyberPreset } from '@gamedevland/cyber-ui';

const pattern = app.stage.addChild(new Graphics());
const bounds = { x: 24, y: 24, w: 360, h: 120 };
let seconds = 0;
let frame = -1;
const tick = (ticker: Ticker) => {
  seconds += ticker.deltaMS / 1000;
  const next = Math.floor(seconds * 8);
  if (next === frame) return;
  frame = next;
  BinaryField.draw(pattern.clear(), bounds, 12, 9, 7291, frame);
  pattern.fill({ color: CyberPreset.palette.accent, alpha: 0.25 });
};
app.ticker.add(tick);
```

After `bounds`, the arguments are corner cut, cell size, seed, and frame number. Cell size must be at least 1. For nearly empty bounds with a width or height of 2 units or less, no inner pattern is drawn.

The pattern updates eight times per second. When removing the screen, we remove the callback with `app.ticker.remove(tick)`. With reduced motion, we keep frame `0`. The seed stays the same between frames: the frame number changes, not the source of random numbers.
