---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/sdk-components",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 10,
  "title": "A GameDevLand SDK component",
  "concept": "ToolkitComponent",
  "description": "Draw a panel in a node from layout JSON.",
  "takeaway": [
    "The SDK owns nodes and updates; the adapter forwards lifecycle events to effects."
  ],
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

Let’s install the adapter with a compatible SDK version:

```bash
npm install @gamedevland/cyber-ui @gamedevland/cyber-ui-sdk @gamedevland/engine@0.0.11 pixi.js
```

The component draws in `this.node.view`. Validated settings hold the dimensions; the parent layout sets the position. A complete typed [CyberPanel](https://github.com/gamedevland/cyber-ui-toolkit/blob/main/examples/sdk/src/CyberPanel.ts) is included in the package examples.

We register the class in `GlobalDiDefinition.registerComponents()`:

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

For animation, we extend `ToolkitComponent` and register an effect with `ownEffect()` in `onReady()`. The base `onUpdate()` passes seconds, enable/disable controls pausing, and detach disposes of effects. Overrides must call the base hooks; `onDetach()` must return `super.onDetach()`. We pass the player’s current preference to `setUiReducedMotion()`.

The component needs no new `Application` or ticker. `uiViewport` separates logical size, CSS size, and scale; the application sets each node’s dimensions.
