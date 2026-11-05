---
{
  "locale": "en",
  "translationKey": "sdk/presentation/actions",
  "course": "sdk",
  "lesson": "presentation",
  "draft": false,
  "order": 6,
  "title": "Running an action",
  "concept": "BaseAction",
  "description": "Play an effect for a cleared cell.",
  "takeaway": [
    "Define the action in JSON, then call it by name in code."
  ],
  "sources": [
    {
      "title": "SDK · BaseAction.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/actions/BaseAction.ts",
      "note": "Starting, canceling, and cleaning up an action."
    },
    {
      "title": "SDK · NodeActions.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/nodes/internal/NodeActions.ts",
      "note": "Running or canceling an action by name."
    },
    {
      "title": "Block Puzzle · BlockPuzzleBoardEffectsComponent.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/components/BlockPuzzleBoardEffectsComponent.ts",
      "note": "Running an effect for each cell."
    }
  ]
}
---

<aside class="lesson-note" aria-labelledby="action-term"><span class="lesson-note__label">Term</span><h3 id="action-term">Node action</h3><p>An effect you run by name, such as a flash when a cell is cleared.</p></aside>


In `layout.json`, the effect is named `lineClearBurst`. When a cell clears, the component calls `runAction` with the cell coordinates. [layout.json](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/assets/json/layouts/scenes/game/layout.json) · [BlockPuzzleBoardEffectsComponent.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/components/BlockPuzzleBoardEffectsComponent.ts)

```ts
this.trackTask(
  this.node.runAction(this.config.actionId, {
    position: this.cellPosition(cell.row, cell.column),
  }),
);
```

<figure class="sdk-figure is-flow">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-cyan"><div><strong>LinesCleared</strong><span>The line is cleared</span></div></div>
    <div class="sdk-figure__item tone-violet"><div><strong>runAction</strong><span>Pass the action name and coordinates</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>PlayParticlesAction</strong><span>Particles appear at the cell</span></div></div>
  </div>
</figure>
