---
{
  "locale": "en",
  "translationKey": "sdk/presentation/nodes",
  "course": "sdk",
  "lesson": "presentation",
  "draft": false,
  "order": 2,
  "title": "Finding and changing screen elements",
  "concept": "NodeBase",
  "description": "Find the score display and board by their names in JSON.",
  "takeaway": [
    "The lookup path follows the nesting in the JSON layout."
  ],
  "sources": [
    {
      "title": "SDK · NodeBase.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/nodes/NodeBase.ts",
      "note": "Node access methods and lookup."
    },
    {
      "title": "SDK · types.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/nodes/types.ts",
      "note": "Contracts for built-in node types."
    },
    {
      "title": "SDK · Engine.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/core/Engine.ts",
      "note": "Creating the WebGL renderer."
    },
    {
      "title": "SDK · TexturedRope.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/nodes/TexturedRope.ts",
      "note": "A specialized node with geometry and points."
    }
  ]
}
---

<aside class="lesson-note" aria-labelledby="node-term"><span class="lesson-note__label">Term</span><h3 id="node-term">Node</h3><p>An element in a layout. For example, Text displays text, and Container groups elements. The associated PixiJS object renders it and is available as view.</p></aside>


In this example, `board` is inside `gameplay`, while `score` is directly under the root. From the root node’s component, find both elements, update the score text, and show the board.

```ts
const board = this.node.getChildContainer('gameplay.board');
const label = this.node.getChildText('score');
label.setText('120');
board.setVisible(true);
```

<figure class="sdk-figure is-compare">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-cyan"><div><strong>root</strong><span>Start the lookup here</span></div></div>
    <div class="sdk-figure__item tone-violet"><div><strong>gameplay.board</strong><span>Show the board</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>score</strong><span>Update the score text</span></div></div>
  </div>
</figure>
