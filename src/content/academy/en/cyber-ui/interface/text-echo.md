---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/text-echo",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 8,
  "title": "Text color echo",
  "concept": "TextEcho",
  "description": "Offset two existing text objects.",
  "takeaway": [
    "The application owns text content and fonts."
  ],
  "sources": [
    {
      "title": "Cyber UI Toolkit · TextEcho",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/TextEcho.ts",
      "note": "Offset, phase, and hiding the echo."
    }
  ]
}
---

`TextEcho` does not create a label. The application passes the main `Text` and its colored copy with matching content and anchor. The effect changes their positions and the copy’s visibility.

```ts
import { Text } from 'pixi.js';
import { CyberPreset, TextEcho } from '@gamedevland/cyber-ui';

const copy = app.stage.addChild(new Text({
  text: 'SYSTEM READY', style: { fill: 0xffd65c },
}));
const title = app.stage.addChild(new Text({
  text: 'SYSTEM READY', style: { fill: 0x70ccff },
}));
copy.anchor.set(0.5);
title.anchor.set(0.5);
const effect = new TextEcho(CyberPreset.textEcho);
effect.update(0.09);
effect.draw(title, copy, 240, 120);
```

In a running screen, we call `update(deltaSeconds)` and `draw()` from our update loop. The `frameMs`, `cycleMs`, and `shift` parameters control the period and offset. `offset(phaseOffsetMs)` returns the offset without changing the objects.

`setReducedMotion(true)` produces zero offset and hides the copy on the next `draw()`. `setActive(false)` stops time but does not hide the frozen frame. When removing the screen, we call `dispose()` before destroying the text.
