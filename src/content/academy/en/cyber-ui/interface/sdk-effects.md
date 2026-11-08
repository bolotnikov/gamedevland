---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/sdk-effects",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 18,
  "title": "Effects inside a component",
  "concept": "ToolkitComponent · ownEffect",
  "description": "Connect a loader to node updates, pause, and removal.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · ToolkitComponent",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/sdk/src/ToolkitComponent.ts",
      "note": "Effect ownership and component methods."
    }
  ]
}
---

`ownEffect()` gives the component responsibility for effect updates and disposal. Create `LoadingEmblem.ts`: the loader draws into two child nodes and receives time from the SDK.

<details><summary>Example code</summary>

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

</details>

Register `group.add('LoadingEmblem', LoadingEmblem)` in `registerComponents()`, then add the wrapper to the layout:

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

The application calls `setMotionPreference()` after loading preferences and whenever they change. Enable/disable pauses the effect; detach disposes it. Preserve `super` calls in overridden hooks and return its result from `onDetach()`.

`uiViewport` contains logical `width/height`, CSS dimensions `cssWidth/cssHeight`, and `scale`. Layout sets the node position; this emblem uses local center `(0, 0)`.
