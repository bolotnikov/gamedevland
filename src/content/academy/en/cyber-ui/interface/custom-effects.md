---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/custom-effects",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 20,
  "title": "Custom effects and lifecycle",
  "concept": "AnimatedEffect · UiEffect",
  "description": "Reuse the shared clock and pause lifecycle.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · AnimatedEffect",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/AnimatedEffect.ts",
      "note": "Public API parameters and behavior."
    },
    {
      "title": "Cyber UI Toolkit · types",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/types.ts",
      "note": "Public API parameters and behavior."
    }
  ]
}
---

`UiEffect` declares four methods: `update(deltaSeconds)`, `setActive(active)`, `setReducedMotion(reduced)`, and `dispose()`. Applications and `ToolkitComponent` can manage different effects through the same contract.

`AnimatedEffect` implements the `elapsedSeconds` clock, pause, and idempotent disposal. A subclass supplies only its own behavior.

```ts
import { AnimatedEffect } from '@gamedevland/cyber-ui';

export class PulsePhase extends AnimatedEffect {
  get alpha(): number {
    this.assertLive();
    return this.reducedMotion ? 1 : 0.8 + 0.2 * Math.sin(this.elapsedSeconds * 2);
  }
}

const effect = new PulsePhase();
effect.update(0.1);
console.log(effect.alpha);
effect.setActive(false);
effect.update(1);
console.log(effect.elapsedSeconds); // 0.1
// Before releasing the screen:
effect.dispose();
```

`update()` accepts finite, nonnegative seconds. `setActive(false)` freezes time. Reduced motion sets a preference; the subclass chooses a still result.

Protected hooks are `onFrame()`, `onActivityChanged(active)`, `onMotionChanged()`, and `onDispose()`. Working methods throw after disposal; disposing again is allowed. The base class creates no ticker and does not destroy application objects.
