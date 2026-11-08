---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/sdk-components",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 17,
  "title": "A GameDevLand SDK component",
  "concept": "ToolkitComponent",
  "description": "Draw a panel in a node from layout JSON.",
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

The `@gamedevland/cyber-ui-sdk` adapter is only needed for GameDevLand SDK. `ToolkitComponent` connects core effects to node updates, pause, and removal. A standalone PixiJS project does not need it.

The component draws in `this.node.view`. Validated settings hold the dimensions; the parent layout sets the position. A complete typed [CyberPanel](https://github.com/gamedevland/cyber-ui-toolkit/blob/main/examples/sdk/src/CyberPanel.ts) is included in the package examples.

We register the class in `GlobalDiDefinition.registerComponents()`:

Create the `CyberPanel.ts` component:

<details><summary>Example code</summary>

```ts
import { CyberPreset, TerminalGlass } from '@gamedevland/cyber-ui';
import { ToolkitComponent } from '@gamedevland/cyber-ui-sdk';
import { SchemaDecoder as S } from '@gamedevland/engine/validation';

import type { Graphics } from '@gamedevland/engine/layouts';
import type { InferDecoded } from '@gamedevland/engine/validation';

const configDecoder = S.object({
  width: S.number({ min: 48 }),
  height: S.number({ min: 28 }),
  cut: S.number({ min: 0 }),
});

/** Attach to a Graphics node; its parent owns positioning and application input. */
export class CyberPanel extends ToolkitComponent<InferDecoded<typeof configDecoder>, Graphics> {
  protected readonly configDecoder = configDecoder;

  protected override onReady(): void {
    const { width, height, cut } = this.config;
    const palette = CyberPreset.palette;
    TerminalGlass.draw(
      this.node.view.clear(),
      0,
      0,
      width,
      height,
      cut,
      palette.panel,
      palette.panelEdge,
      palette.accent,
      palette.text,
    );
  }
}
```

</details>

Register it in `GlobalDiDefinition.registerComponents()`:

```ts
group.add('CyberPanel', CyberPanel);
```

Then attach it to a `Graphics` node:

```json
{
  "type": "Graphics",
  "components": {
    "panel": {
      "type": "CyberPanel",
      "data": { "width": 320, "height": 180, "cut": 12 }
    }
  }
}
```

The `Graphics` element factory must also be registered in the project. Text uses separate nodes, input goes through `node.input`, and player intent goes through events and the FSM.

The next lesson connects effects and pause.
