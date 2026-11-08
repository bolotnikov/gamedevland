---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/button-price",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 6,
  "title": "Button label and price",
  "concept": "ButtonPrice.layout",
  "description": "Fit a localized label, currency icon, and amount into one row.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · ButtonPrice",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/ButtonPrice.ts",
      "note": "Public API parameters and behavior."
    }
  ]
}
---

`ButtonPrice.layout()` calculates positions for three elements and a common scale. A long label shrinks the whole row while preserving spacing and centering. The application creates the text objects and currency icon.

<details><summary>Example code</summary>

```ts
import { Container, Graphics, Text } from 'pixi.js';
import { ButtonPrice, ButtonSurface, CyberPreset, TerminalUi } from '@gamedevland/cyber-ui';

const button = app.stage.addChild(new Container());
const surface = button.addChild(new Graphics());
const t = CyberPreset.palette;
const label = button.addChild(new Text({ text: 'UPGRADE', style: { fontSize: 18, fill: t.background } }));
const amount = button.addChild(new Text({ text: '250', style: { fontSize: 18, fill: t.background } }));
label.anchor.set(0.5);
amount.anchor.set(0.5);

function redraw(width: number) {
  label.scale.set(1);
  amount.scale.set(1);
  const row = ButtonPrice.layout(width, label.width, amount.width, 18, 8, 12);
  ButtonSurface.draw(surface.clear(), {
    width, height: 56, variant: 'primary', enabled: true, selected: false,
  }, t);
  label.scale.set(row.scale);
  amount.scale.set(row.scale);
  label.position.set(row.labelX, 28);
  amount.position.set(row.amountX, 28);
  TerminalUi.icon(surface, 'credit', row.iconX, 28, row.iconSize, t.background);
}
redraw(248);
// After localization or resize, update text and call redraw() again.
```

</details>

Arguments are button width, measured label width, amount width, icon size, gap, and horizontal padding. The result contains `scale`, `labelX`, `iconX`, `amountX`, and `iconSize`.

Reset text scale to `1` before measuring again, so the calculation uses the original text width. Width and icon size must be positive. Other sizes are nonnegative, and padding cannot exceed half the width.
