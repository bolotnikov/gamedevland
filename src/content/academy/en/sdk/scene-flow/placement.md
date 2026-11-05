---
{
  "locale": "en",
  "translationKey": "sdk/scene-flow/placement",
  "course": "sdk",
  "lesson": "scene-flow",
  "draft": false,
  "order": 10,
  "title": "FSM and commands during a move",
  "concept": "The full sequence",
  "description": "Follow what happens after the player releases a piece.",
  "takeaway": [
    "The service updates the board, and the screen shows the result in response to events."
  ],
  "sources": [
    {
      "title": "Block Puzzle · BlockPuzzleGameplayService.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/services/BlockPuzzleGameplayService.ts",
      "note": "Order of operations in place and result snapshots."
    },
    {
      "title": "Block Puzzle · fsm.config.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/configs/fsm.config.ts",
      "note": "Transitions for accepted and rejected placements."
    },
    {
      "title": "SDK · SceneFSM.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/fsm/SceneFSM.ts",
      "note": "The event queue and command execution before a state change."
    }
  ],
  "simulation": "sdk-placement"
}
---

Suppose the player releases a piece over valid cells. The drag component sends PlacementRequested with `slotId` and `anchor`. The game's FSM takes over. [Game FSM](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/configs/fsm.config.ts)

<figure class="sdk-figure is-layers"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>Request</strong><span>DragComponent → PlacementRequested → PlaceBlockCommand</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>Validate and apply</strong><span>Gameplay → Board / Slots / ScoreRules</span></div></div><div class="sdk-figure__item tone-green"><div><strong>Result snapshots</strong><span>boardBeforeClear, boardAfterClear, clearedCells, scoreDelta</span></div></div><div class="sdk-figure__item tone-amber"><div><strong>Screen</strong><span>BoardChanged, BlocksChanged, ScoreChanged, and LinesCleared</span></div></div></div><figcaption>The command changes game state through the service. The screen responds to separate result events.</figcaption></figure>

<h2 id="что-происходит-с-fsm">What the FSM does</h2>

`PlaceBlockCommand` runs in `playing`. The FSM then enters `resolvingPlacement`, takes `PlacementCompleted` from the queue, and checks available moves in `checkingMoves`.

The diagram below walks through a successful placement.
