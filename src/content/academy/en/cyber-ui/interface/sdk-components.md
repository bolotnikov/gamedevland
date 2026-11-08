---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/sdk-components",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 14,
  "title": "Connecting to GameDevLand SDK",
  "concept": "ToolkitComponent",
  "description": "Add the loader to an engine component.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · SDK guide",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/sdk/README.md",
      "note": "Component registration and a layout example."
    },
    {
      "title": "Cyber UI Toolkit · ToolkitComponent",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/sdk/src/ToolkitComponent.ts",
      "note": "Effect ownership, reduced motion, and detach."
    }
  ]
}
---

This lesson is for games using GameDevLand SDK. The preceding examples are enough for a regular PixiJS project.

Create a `LoadingEmblem` component. It draws the triangle in two child nodes. `ownEffect()` lets the engine update the effect with the component, pause it, and dispose of it when the scene closes.

```ts
import { CyberPreset, TriangleLoader } from '@gamedevland/cyber-ui';
import { ToolkitComponent } from '@gamedevland/cyber-ui-sdk';
import type { Container } from '@gamedevland/engine/layouts';
import { SchemaDecoder as S } from '@gamedevland/engine/validation';
import type { InferDecoded } from '@gamedevland/engine/validation';

const configDecoder = S.object({ radius: S.number({ min: 1 }) });

export class LoadingEmblem extends ToolkitComponent<InferDecoded<typeof configDecoder>, Container> {
  protected readonly configDecoder = configDecoder;
  private readonly loader = new TriangleLoader(CyberPreset.triangle);

  protected override onReady(): void {
    this.ownEffect(this.loader);
  }
  protected override onUpdate(deltaSeconds: number): void {
    super.onUpdate(deltaSeconds);
    this.loader.draw(
      this.node.getChildGraphics('emblem').view,
      this.node.getChildGraphics('dust').view,
      { x: 0, y: 0, radius: this.config.radius, scale: 1 },
      CyberPreset.trianglePalette,
    );
  }
  setMotionPreference(reduced: boolean): void {
    this.setUiReducedMotion(reduced);
  }
}
```

Register the component in `registerComponents()`:

```ts
group.add('LoadingEmblem', LoadingEmblem);
```

Attach it to a container in the layout:

```json
{
  "type": "Container",
  "components": { "loading": { "type": "LoadingEmblem", "data": { "radius": 64 } } },
  "children": {
    "emblem": { "type": "Graphics" },
    "dust": { "type": "Graphics" }
  }
}
```

Pass the motion preference through `setMotionPreference()`. In `onUpdate()`, call `super.onUpdate(deltaSeconds)` first: it updates the effect, then we draw the new frame.

`uiViewport` returns the game screen dimensions (`width`, `height`), browser dimensions (`cssWidth`, `cssHeight`), and scale (`scale`).
