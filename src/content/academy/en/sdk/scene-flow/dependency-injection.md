---
{
  "locale": "en",
  "translationKey": "sdk/scene-flow/dependency-injection",
  "course": "sdk",
  "lesson": "scene-flow",
  "draft": false,
  "order": 2,
  "title": "Dependency Injection and tokens",
  "concept": "DI and tokens",
  "description": "Get a game service using a token.",
  "takeaway": [
    "A token is the key the container uses to find an object."
  ],
  "sources": [
    {
      "title": "SDK · tokens.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/di/tokens.ts",
      "note": "Typed token categories and SystemServices."
    },
    {
      "title": "Block Puzzle · BlockPuzzleServices.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/BlockPuzzleServices.ts",
      "note": "Game service tokens."
    },
    {
      "title": "Block Puzzle · StartBlockPuzzleSessionCommand.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/commands/StartBlockPuzzleSessionCommand.ts",
      "note": "Requesting a game service using its token."
    }
  ]
}
---

<aside class="lesson-note" aria-labelledby="dependency-injection">
  <span class="lesson-note__label">Term</span>
  <h3 id="dependency-injection">Dependency Injection (DI)</h3>
  <p>An object receives what it needs to work from outside. For example, configuration or another service can be passed through its constructor. These are called dependencies.</p>
</aside>

A token is a key the container uses to find an object. In Block Puzzle, the command that starts a session passes the `Gameplay` token to `getSceneService` and receives the game service. These excerpts show the relevant lines from [BlockPuzzleServices.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/BlockPuzzleServices.ts#L7-L13) and [StartBlockPuzzleSessionCommand.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/commands/StartBlockPuzzleSessionCommand.ts#L5-L9).

```ts
// BlockPuzzleServices.ts
export class BlockPuzzleServices {
  static readonly Gameplay = DiTokens.service<BlockPuzzleGameplayService>(
    'BlockPuzzleGameplayService',
  );
}

// StartBlockPuzzleSessionCommand.ts
this.getSceneService(BlockPuzzleServices.Gameplay).startSession();
```

<figure class="sdk-figure is-flow" aria-label="How the command gets the game service">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-violet"><div><strong>Token</strong><span>BlockPuzzleServices.Gameplay</span></div></div>
    <div class="sdk-figure__item tone-cyan"><div><strong>Request</strong><span>getSceneService passes the token to the container</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>Service</strong><span>The command calls startSession()</span></div></div>
  </div>
</figure>
