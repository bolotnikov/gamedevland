---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/triangle-loader",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 7,
  "title": "Animated loader",
  "concept": "TriangleLoader",
  "description": "Connect the triangle to the existing ticker.",
  "takeaway": [
    "update takes seconds; draw takes the current local dimensions."
  ],
  "sources": [
    {
      "title": "Cyber UI Toolkit · TriangleLoader",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/TriangleLoader.ts",
      "note": "Loader settings and borrowed Graphics."
    },
    {
      "title": "PixiJS · Ticker",
      "url": "https://pixijs.com/8.x/guides/components/ticker",
      "note": "Subscriptions and deltaMS."
    }
  ]
}
---

The loader receives two separate `Graphics` objects: triangle contours and particles. It clears them when drawing. Time comes from the existing [application ticker](https://pixijs.com/8.x/guides/components/ticker).

```ts
import { Graphics } from 'pixi.js';
import type { Ticker } from 'pixi.js';
import { CyberPreset, TriangleLoader } from '@gamedevland/cyber-ui';

const emblem = app.stage.addChild(new Graphics());
const dust = app.stage.addChild(new Graphics());
const loader = new TriangleLoader(CyberPreset.triangle);
const tick = (ticker: Ticker) => {
  loader.update(ticker.deltaMS / 1000);
  loader.draw(emblem, dust,
    { x: app.screen.width / 2, y: 120, radius: 64, scale: 1 },
    CyberPreset.trianglePalette);
};
app.ticker.add(tick);
```

Dividing by `1000` converts milliseconds to seconds. `ticker.deltaTime` is a different measure and cannot be passed as seconds. Changing dimensions in `draw()` does not reset the animation.

When removing the screen, we first remove the callback and dispose of the effect:

```ts
app.ticker.remove(tick);
loader.dispose();
```

Then we can destroy `emblem` and `dust`. The toolkit does not destroy the surfaces passed to it.
