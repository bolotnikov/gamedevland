---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/glitch-lifecycle",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 14,
  "title": "Distortion and lifecycle",
  "concept": "SurfaceGlitch · UiEffect",
  "description": "Add strips while preserving ownership of the original surface.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · SurfaceGlitch",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/SurfaceGlitch.ts",
      "note": "Registering targets and deterministic time."
    },
    {
      "title": "PixiJS · Graphics",
      "url": "https://pixijs.com/8.x/guides/components/scene-objects/graphics",
      "note": "Sharing GraphicsContext and destruction."
    }
  ]
}
---

`SurfaceGlitch` shifts strips of a live surface. It temporarily adds masks and geometry copies. The original `Graphics` must be in a container and have no mask of its own.

```ts
import { Graphics } from 'pixi.js';
import { CyberPreset, SurfaceGlitch } from '@gamedevland/cyber-ui';

const surface = app.stage.addChild(new Graphics()
  .rect(0, 0, 220, 56).fill(CyberPreset.palette.accent));
const glitch = new SurfaceGlitch(CyberPreset.glitch);
glitch.show('menu', [{ surface, x: 0, y: 0, w: 220, h: 56 }], 200);
const tick = (ticker: import('pixi.js').Ticker) => {
  glitch.update(ticker.deltaMS / 1000);
};
app.ticker.add(tick);
// On screen removal: app.ticker.remove(tick); glitch.dispose();
```

The last argument of `show()` is a delay in milliseconds; `update()` takes seconds. Calling `show()` again with the same key updates targets without restarting the schedule; a new key starts it over. The effect picks up changes to the original surface’s geometry and transform.


The shared `UiEffect` contract is `update`, `setActive`, `setReducedMotion`, and `dispose`. The last call is idempotent; the others throw after disposal. Reduced motion removes glitch distortion immediately. The application passes the preference, including when it changes.

We dispose of the effect before destroying surfaces. The target’s mask must remain unchanged while the glitch owns it. Text, neighboring objects, and snapshots of arbitrary containers are outside this effect’s scope.

`GlitchOptions`: `durationMs` is pulse duration, `minDelayMs` is the minimum pause, `spreadMs` is pause variation, and `seed` is an integer 0–4294967295. `GlitchTarget` contains `surface` and local `x`, `y`, `w`, `h`. `hide()` releases targets and removes temporary strips.
