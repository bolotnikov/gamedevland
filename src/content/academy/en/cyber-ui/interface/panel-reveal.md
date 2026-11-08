---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/panel-reveal",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 15,
  "title": "Opening and closing a panel",
  "concept": "PanelReveal",
  "description": "Add motion and an opacity change when a window opens.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · PanelReveal",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/sdk/src/PanelReveal.ts",
      "note": "Input decoding, tweens, and transform restoration."
    }
  ]
}
---

`PanelTransition.origin()` defines the starting state of a panel reveal. `down` expands it vertically, `right` horizontally, and `zoom` scales the whole panel. Without an axis, the panel appears with a small shift and no compression.

The example's toggle opens and closes the panel. Direction and duration control its animation.

<details><summary>PanelReveal action for GameDevLand SDK</summary>

Register the action in `registerServices()`:

```ts
import { DiTokens } from '@gamedevland/engine/di';
import { PanelReveal } from '@gamedevland/cyber-ui-sdk';

registrar.transientClass(DiTokens.action('PanelReveal'), PanelReveal);
```

Attach it to a separate panel container:

```json
{
  "type": "Container",
  "actions": { "reveal": { "type": "PanelReveal" } }
}
```

Run it from that node's component:

```ts
void this.node.runAction('reveal', {
  duration: 240,
  delay: 0,
  offset: 8,
  axis: 'down',
});
```

`duration` is 1-2000 ms; `delay` is 0-1000 ms; `offset` is 0-16. `axis` selects the direction; `closing: true` closes the panel. `pivotX` and `pivotY` define the point around which it compresses.

Keep other code from moving this container while the action runs. Running it again replaces the animation; cancellation restores the original position.

</details>
