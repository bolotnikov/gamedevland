---
{
  "locale": "en",
  "translationKey": "sdk/scene-flow/services-domain",
  "course": "sdk",
  "lesson": "scene-flow",
  "draft": false,
  "order": 6,
  "title": "Scene services and game rules",
  "concept": "Services and game rules",
  "description": "Keep the session in a service and define the game rules separately.",
  "takeaway": [
    "The service manages the session, and the rules determine the result of a move."
  ],
  "sources": [
    {
      "title": "SDK · BaseSceneService.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/scenes/BaseSceneService.ts",
      "note": "Availability of the service context."
    },
    {
      "title": "Block Puzzle · BlockPuzzleGameplayService.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/services/BlockPuzzleGameplayService.ts",
      "note": "The session, placement preview, and applying a move."
    },
    {
      "title": "Block Puzzle · BlockPuzzleBoard.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/domain/BlockPuzzleBoard.ts",
      "note": "Board rules independent of PixiJS."
    }
  ]
}
---

<aside class="lesson-note is-green" aria-labelledby="lesson-purpose">
  <h3 id="lesson-purpose">Why this matters</h3>
  <p>The game rules should work independently of the screen. Separate them from scene code so we can change how the game looks without rewriting the rules.</p>
</aside>

In Block Puzzle, the `Gameplay` service stores the board, available pieces, score, and session state.

<aside class="lesson-note" aria-labelledby="domain-model"><span class="lesson-note__label">Term</span><h3 id="domain-model">Domain model</h3><p>The code that implements the game rules. In Block Puzzle, it decides where a piece can go, which lines to clear, and how many points to award.</p></aside>

The service coordinates several operations. This excerpt shows part of the `place` method. [BlockPuzzleGameplayService.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/services/BlockPuzzleGameplayService.ts#L124)

```ts
const placedCells = session.board.place(shape, request.anchor);
session.slots.use(request.slotId);
const completedLines = session.board.findCompletedLines();
const clearedCells = session.board.collectCells(completedLines);
const boardBeforeClear = session.board.snapshot();
session.board.clear(clearedCells);
const boardAfterClear = session.board.snapshot();
```

Before these operations, the service checks that the piece exists and calls `board.canPlace`. Afterward, it calculates the score, refills slots, and sends events to the display components.

<figure class="sdk-figure is-matrix"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>GameplayService</strong><span>Session state and the order of operations</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>BlockPuzzleBoard</strong><span>Cells, valid placements, and lines</span></div></div><div class="sdk-figure__item tone-green"><div><strong>BlockPuzzleSlots</strong><span>Which pieces are available or used</span></div></div><div class="sdk-figure__item tone-amber"><div><strong>BlockPuzzleScoreRules</strong><span>Points for placing pieces and clearing lines</span></div></div><div class="sdk-figure__item tone-cyan"><div><strong>Components</strong><span>Showing the result and playing effects</span></div></div></div><figcaption>Each object handles one part of the move.</figcaption></figure>

`previewPlacement` checks whether a piece fits. The board changes only when `place` runs.
