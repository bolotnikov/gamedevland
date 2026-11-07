---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/glitch-lifecycle",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 9,
  "title": "Distortion and lifecycle",
  "concept": "SurfaceGlitch · UiEffect",
  "description": "Add strips while preserving ownership of the original surface.",
  "takeaway": [
    "The effect removes its masks and copies, preserving the original Graphics."
  ],
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
glitch.update(0.2);
```

The last argument of `show()` is a delay in milliseconds; `update()` takes seconds. Calling `show()` again with the same key updates targets without restarting the schedule; a new key starts it over. The effect picks up changes to the original surface’s geometry and transform.

<figure class="sdk-figure is-flow"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>show → update</strong><span>Attach a target and advance time</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>hide / pause</strong><span>Remove temporary strips</span></div></div><div class="sdk-figure__item tone-green"><div><strong>dispose</strong><span>Release the effect’s resources</span></div></div></div></figure>

The shared `UiEffect` contract is `update`, `setActive`, `setReducedMotion`, and `dispose`. The last call is idempotent; the others throw after disposal. Reduced motion removes glitch distortion immediately. The application passes the preference, including when it changes.

We dispose of the effect before destroying surfaces. The target’s mask must remain unchanged while the glitch owns it. Text, neighboring objects, and snapshots of arbitrary containers are outside this effect’s scope.
