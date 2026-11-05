---
{
  "locale": "en",
  "translationKey": "sdk/scene-flow/di-factory",
  "course": "sdk",
  "lesson": "scene-flow",
  "draft": false,
  "order": 3,
  "title": "A DI factory for the game service",
  "concept": "DI and factories",
  "description": "Pass the game settings and progress service to the constructor.",
  "takeaway": [
    "singletonFactory creates the service once per scene container."
  ],
  "sources": [
    {
      "title": "SDK · DiContainer.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/di/DiContainer.ts",
      "note": "Dependency resolution."
    },
    {
      "title": "Block Puzzle · scene.di.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/configs/scene.di.ts",
      "note": "The game service factory and the list of scene services."
    }
  ]
}
---

When a scene opens, the SDK requests the services listed in `registerServices`. For `Gameplay`, the container calls the factory (`provider.useFactory(this)`). The factory passes the board, piece, and scoring settings and the progress service to the constructor. [scene.di.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/configs/scene.di.ts#L27-L46)

```ts
registrar.singletonFactory(BlockPuzzleServices.Gameplay, (container) => {
  const configs = container.get<ConfigStore>(SystemServices.ConfigStore);
  return new BlockPuzzleGameplayService(
    configs.get(
      BlockPuzzleConfigEntries.Board.fileId,
      BlockPuzzleConfigEntries.Board.decoder,
    ),
    configs.get(
      BlockPuzzleConfigEntries.Shapes.fileId,
      BlockPuzzleConfigEntries.Shapes.decoder,
    ),
    configs.get(
      BlockPuzzleConfigEntries.Scoring.fileId,
      BlockPuzzleConfigEntries.Scoring.decoder,
    ),
    container.get<BlockPuzzlePlayerProgressService>(
      CommonServices.Progress,
    ),
  );
});
```

<figure class="sdk-figure is-flow" aria-label="How the container creates the game service">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-violet"><div><strong>Request</strong><span>The container receives the Gameplay token</span></div></div>
    <div class="sdk-figure__item tone-cyan"><div><strong>Call the factory</strong><span>The factory passes dependencies to new BlockPuzzleGameplayService</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>Instance</strong><span>The container keeps the service for later requests</span></div></div>
  </div>
</figure>
