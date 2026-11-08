---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/buttons",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 4,
  "title": "Buttons and states",
  "concept": "ButtonSurface",
  "description": "Connect every skin variant to input and a label.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · ButtonSurface",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/ButtonSurface.ts",
      "note": "Public API parameters and behavior."
    }
  ]
}
---

`ButtonSurface.draw()` paints from local `(0, 0)`. Required fields are `width`, `height`, `variant`, `enabled`, and `selected`. `explicitAccent` enables the module rail; `ready` overlays an available-reward highlight on the chosen skin.

```ts
import { Graphics, Rectangle, Text } from 'pixi.js';
import { ButtonSurface, CyberPreset } from '@gamedevland/cyber-ui';

const button = app.stage.addChild(new Graphics());
const t = CyberPreset.palette;
const label = button.addChild(new Text({ text: 'CLAIM', style: { fill: t.text, fontSize: 18 } }));
label.anchor.set(0.5);
label.position.set(110, 28);
label.eventMode = 'none';
let enabled = true;
function redraw() {
  ButtonSurface.draw(button.clear(), {
    width: 220, height: 56, variant: 'module', enabled, selected: false,
    explicitAccent: true, ready: true,
  }, t);
  button.eventMode = enabled ? 'static' : 'none';
  button.hitArea = new Rectangle(0, 0, 220, 56);
  button.alpha = enabled ? 1 : 0.42;
}
button.on('pointertap', () => { enabled = false; redraw(); });
redraw();
```

<details><summary>All ButtonSurface variants</summary>

| Variant | Skin |
| --- | --- |
| `primary` | Solid accent when enabled; glass otherwise |
| `module` | Glass with a side rail when enabled, selected, or explicitAccent |
| `danger` | Glass using danger color |
| `icon` | Rounded inset; selected changes fill and edge |
| `nav` | Subtle active fill and top rail only |
| `segment` | Selected segment fill only |
| `tab` | Separate border, fill, and active underline |
| `switch` | Glass background; add the knob with toggle |
| `utility` | Bottom rule |
| `line` | No background |

</details>

`enabled` changes appearance but does not disable [PixiJS input](https://pixijs.com/8.x/guides/components/events). The application updates `eventMode`, opacity, and label styling. SDK projects use `node.input`.

For `switch`, append `ButtonSurface.toggle(button, width, height, selected, palette)` after `draw()`. Hover, pressed state, keyboard focus, and hit areas belong to the application. The next lesson covers shared `nav` and `segment` backgrounds.
