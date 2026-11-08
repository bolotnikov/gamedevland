---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/signal-lost",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 16,
  "title": "Signal lost overlay",
  "concept": "SignalLost",
  "description": "Combine an effect frame with a separate label.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · SignalLost",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/SignalLost.ts",
      "note": "Public API parameters and behavior."
    },
    {
      "title": "Cyber UI Toolkit · FaultGlyph",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/FaultGlyph.ts",
      "note": "Public API parameters and behavior."
    }
  ]
}
---

`SignalLost.draw()` adds dimming, tears, and a fault symbol. The application supplies progress in `[0, 1]`, retaining control over timing and activation.

```ts
import { Graphics, Text } from 'pixi.js';
import { CyberPreset, SignalLost } from '@gamedevland/cyber-ui';

const overlay = app.stage.addChild(new Graphics());
const label = app.stage.addChild(new Text({ text: 'SIGNAL LOST', style: { fontSize: 24 } }));
label.anchor.set(0.5);
const t = CyberPreset.palette;
const sample = SignalLost.draw(overlay.clear(), app.screen.width, app.screen.height, 0.5, {
  background: t.background, danger: t.danger, accent: t.accent, highlight: t.signal,
});
label.position.set(sample.x + sample.shift * 4, sample.y + 48);
label.alpha = sample.fade;
```

The result contains label center `x/y`, label alpha `fade`, and displacement `shift`. At progress `1`, the effect is fully faded. Restart from `0` for another run.

This helper has no reduced-motion flag. Use a static warning instead, such as `FaultGlyph` with zero distortion and separate text. The example slider exposes frames without automatic flashes.
