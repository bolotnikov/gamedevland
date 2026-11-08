---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/panel-reveal",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 19,
  "title": "Revealing a panel",
  "concept": "PanelReveal",
  "description": "Attach an action to a separate wrapper.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · PanelReveal",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/sdk/src/PanelReveal.ts",
      "note": "Input decoding, tweens, and transform restoration."
    }
  ]
}
---

`PanelReveal` uses SDK tweens. To keep animation and layout from changing the same transform at once, we give the panel a separate `Container` for its reveal.

In `GlobalDiDefinition.registerServices()`, we register the action:

```ts
import { DiTokens } from '@gamedevland/engine/di';
import { PanelReveal } from '@gamedevland/cyber-ui-sdk';

registrar.transientClass(DiTokens.action('PanelReveal'), PanelReveal);
```

Then add it to the wrapper in the layout:

```json
{
  "type": "Container",
  "actions": { "reveal": { "type": "PanelReveal" } }
}
```

From the component that owns this node, we call:

```ts
void this.node.runAction('reveal', {
  duration: 240,
  delay: 0,
  offset: 8,
  axis: 'down',
});
```

`duration` and `delay` use milliseconds; `offset` uses local units. Valid ranges are 1–2000 for duration, 0–1000 for delay, and 0–16 for offset. The axis can be `down`, `right`, or `zoom`. Without an axis, the action changes opacity and position without compression. `closing: true` starts closing.

The action accounts for the original position, scale, and opacity. Running it again replaces its tweens; cancellation restores the original state. Other code must not move this wrapper during the animation. With reduced motion, we choose a static state. The call schedules tweens; its completion does not mean the animation has ended.

`pivotX` and `pivotY` are the local point used to calculate displacement during compression; both default to `0`. In a standalone Pixi project, use `PanelTransition.origin({ offset: 8, axis: 'zoom', pivotX: 160, pivotY: 90, closing: false })`: the result contains `x`, `y`, `scaleX`, `scaleY`, and `alpha`. The application interpolates and applies these values.
