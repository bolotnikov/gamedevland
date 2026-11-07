---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/buttons",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 4,
  "title": "Buttons and their state",
  "concept": "ButtonSurface",
  "description": "Connect a button’s appearance to its hit area.",
  "takeaway": [
    "enabled changes the drawing; the application controls whether input is blocked."
  ],
  "sources": [
    {
      "title": "Cyber UI Toolkit · ButtonSurface",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/ButtonSurface.ts",
      "note": "Variants and visual states."
    },
    {
      "title": "PixiJS · Events",
      "url": "https://pixijs.com/8.x/guides/components/events",
      "note": "eventMode, hitArea, and pointertap."
    }
  ]
}
---

`ButtonSurface.draw()` draws a button from the local point `(0, 0)`. To handle presses, we set up its [hit area](https://pixijs.com/8.x/guides/components/events) separately.

```ts
import { Graphics, Rectangle } from 'pixi.js';
import { ButtonSurface, CyberPreset, TerminalUi } from '@gamedevland/cyber-ui';

const button = app.stage.addChild(new Graphics());
const t = CyberPreset.palette;
button.position.set(48, 160);
ButtonSurface.draw(button, {
  width: 220, height: 56, variant: 'primary',
  enabled: true, selected: false,
}, t);
TerminalUi.icon(button, 'play', 28, 28, 20, t.background);
button.hitArea = new Rectangle(0, 0, 220, 56);
button.eventMode = 'static';
button.on('pointertap', () => { console.log('Start requested'); });
```

This is input handling for a regular Pixi project. The SDK uses `node.input`. Text, keyboard navigation, focus, and the button’s action remain the application’s responsibility.

| Variant | Use |
| --- | --- |
| `primary`, `danger` | Main or destructive action |
| `module`, `icon` | Module card or icon button |
| `nav`, `segment` | Selected navigation item or segment |
| `switch` | Toggle background |
| `utility`, `line` | Bottom line or no background |

For `nav` and `segment`, the drawing appears when `selected: true`. To add the toggle thumb, we also call `ButtonSurface.toggle(button, 220, 56, selected, t)`. When state changes, we clear the drawing and update input and the label.
