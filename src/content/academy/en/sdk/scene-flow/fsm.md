---
{
  "locale": "en",
  "translationKey": "sdk/scene-flow/fsm",
  "course": "sdk",
  "lesson": "scene-flow",
  "draft": false,
  "order": 8,
  "title": "Scene states and the FSM",
  "concept": "FSM",
  "description": "The current state determines which events are handled and which commands run.",
  "takeaway": [
    "The SDK follows actions → target → entry.",
    "The FSM handles a service event after the current transition."
  ],
  "sources": [
    {
      "title": "SDK · types.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/fsm/types.ts",
      "note": "Fields available in FSMConfig."
    },
    {
      "title": "SDK · SceneFSM.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/fsm/SceneFSM.ts",
      "note": "Actions before target, the event queue, and entry."
    },
    {
      "title": "Block Puzzle · fsm.config.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/configs/fsm.config.ts",
      "note": "States in the original game."
    }
  ]
}
---

<aside class="lesson-note is-green" aria-labelledby="lesson-purpose">
  <h3 id="lesson-purpose">Why this matters</h3>
  <p>The game accepts different events during a move and after it finishes. We can keep these rules in one configuration.</p>
</aside>

`SceneFSM` holds the current state and the transition rules. `FSMConfig` contains the initial state, the `states` map, `entry` commands, and event handlers under `on`.

<aside class="lesson-note" aria-labelledby="fsm-term"><span class="lesson-note__label">Term</span><h3 id="fsm-term">Finite state machine (FSM)</h3><p>A finite set of states with rules for switching between them when events arrive. One state is active at a time.</p></aside>

Here is an excerpt from the game configuration. [fsm.config.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/configs/fsm.config.ts#L29)

```ts
playing: {
  on: {
    [BlockPuzzleEvents.PlacementRequested]: {
      target: 'resolvingPlacement',
      actions: ['PlaceBlockCommand'],
    },
    [BlockPuzzleEvents.RestartRequested]: {
      actions: ['RestartBlockPuzzleCommand'],
    },
  },
},
```

<figure class="sdk-figure is-flow"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">01</span><div><strong>playing</strong><span>Accepts PlacementRequested</span></div></div><div class="sdk-figure__item tone-violet"><span class="sdk-figure__index">02</span><div><strong>resolvingPlacement</strong><span>Waits for the result event</span></div></div><div class="sdk-figure__item tone-green"><span class="sdk-figure__index">03</span><div><strong>checkingMoves</strong><span>Runs CheckBlockPuzzleMovesCommand on entry</span></div></div><div class="sdk-figure__item tone-amber"><span class="sdk-figure__index">04</span><div><strong>playing or ended</strong><span>MovesAvailable continues the game. GameOver ends it.</span></div></div></div><figcaption>This is the path for a successful move. A rejected placement returns from resolvingPlacement to playing.</figcaption></figure>

The FSM ignores events absent from the current state's `on` handlers. A rule with `actions` and no `target` runs the commands and keeps the current state. `RestartRequested` works this way.

<h2 id="порядок-перехода">Transition order</h2>

The SDK runs the `actions` in order. It then switches to the `target` and runs the new state's `entry` commands. So while PlaceBlockCommand runs, the current state is still `playing`.

Events sent by a command wait in the queue. For example, the FSM handles `PlacementCompleted` after it changes state.
