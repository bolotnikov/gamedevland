---
{
  "locale": "en",
  "translationKey": "sdk/presentation/drag",
  "course": "sdk",
  "lesson": "presentation",
  "draft": false,
  "order": 10,
  "title": "Dragging a piece",
  "concept": "Dragging",
  "description": "Highlight the cells, then place the piece.",
  "takeaway": [
    "The preview shows where the piece will go. Releasing it applies the move."
  ],
  "sources": [
    {
      "title": "Block Puzzle · BlockPuzzleDragComponent.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/components/BlockPuzzleDragComponent.ts",
      "note": "The drag gesture and preview in the original game."
    },
    {
      "title": "SDK · index.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/interactions/index.ts",
      "note": "Public types and classes for dragging."
    },
    {
      "title": "SDK · DragInputBridgeComponent.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/interactions/components/DragInputBridgeComponent.ts",
      "note": "Converting drag phases, pointer cancellation, and coordinates."
    }
  ]
}
---

While the player drags a piece, `BlockPuzzleDragComponent` moves its image. It converts the pointer position to board coordinates and calls `previewPlacement` to highlight cells. Releasing the piece sends `PlacementRequested`, and canceling the gesture clears the highlight. [BlockPuzzleDragComponent.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/components/BlockPuzzleDragComponent.ts)

<figure class="sdk-figure is-flow">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-cyan"><div><strong>Pick up a piece</strong><span>Remember the selected piece</span></div></div>
    <div class="sdk-figure__item tone-violet"><div><strong>Drag</strong><span>Highlight the cells underneath</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>Release</strong><span>Request the move</span></div></div>
  </div>
</figure>

To forward drag input to an FSM in another game, attach `DragInputBridgeComponent`. Set `eventType` in its configuration. The component sends that event with coordinates when the drag starts, moves, and ends.
