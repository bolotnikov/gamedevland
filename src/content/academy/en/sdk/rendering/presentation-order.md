---
{
  "locale": "en",
  "translationKey": "sdk/rendering/presentation-order",
  "course": "sdk",
  "lesson": "rendering",
  "draft": false,
  "order": 7,
  "title": "Updating the camera, world and UI",
  "concept": "onPresentation",
  "description": "Apply changes after physics and animation.",
  "sources": [
    {
      "title": "SDK · BaseComponent.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/layouts/components/BaseComponent.ts",
      "note": "onPresentation, enabled state and subscription cleanup."
    },
    {
      "title": "SDK · PresentationScheduler.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/runtime/PresentationScheduler.ts",
      "note": "camera/world/ui ordering and layout scoping."
    }
  ]
}
---

If a camera updates before an object moves, it can lag by one frame. The SDK runs `onPresentation` after physics and tweens, before rendering. Set the order of related changes to `camera → world → ui`.

In a Three node component, register a presentation update in `onReady`:

```ts
import { BaseComponent } from '@gamedevland/engine/layouts';
import { ThreeNode } from '@gamedevland/engine/renderers/three';

export class FollowPositionComponent extends BaseComponent<ThreeNode> {
  protected readonly nodeType = ThreeNode;

  protected override onReady(): void {
    const target = this.node.engine.getRequiredActiveLayout().requireNode('world.target', ThreeNode);
    this.onPresentation(() => {
      this.node.setPosition(target.view.position);
    }, { phase: 'world' });
  }
}
```

Both nodes are in the same group here: we copy the local position of `world.target`. Use the `camera` phase for the camera and `ui` for labels over the world.

<figure class="sdk-figure is-flow"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>camera</strong><span>Update the camera</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>world</strong><span>Apply object presentation</span></div></div><div class="sdk-figure__item tone-green"><div><strong>ui</strong><span>Update the interface</span></div></div></div><figcaption>The SDK then renders the frame.</figcaption></figure>

The subscription is scoped to the layout and component lifetime: it does not run while the component is disabled and is removed on detach. Within a phase, `order` sets numeric ordering. The callback is synchronous; the engine does not await a returned Promise.
