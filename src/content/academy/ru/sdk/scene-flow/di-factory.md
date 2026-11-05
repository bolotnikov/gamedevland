---
{
  "locale": "ru",
  "translationKey": "sdk/scene-flow/di-factory",
  "course": "sdk",
  "lesson": "scene-flow",
  "draft": false,
  "order": 3,
  "title": "DI-фабрика игрового сервиса",
  "concept": "DI и фабрики",
  "description": "Передадим настройки игры и сервис прогресса в конструктор.",
  "takeaway": [
    "singletonFactory создаёт сервис один раз для контейнера сцены."
  ],
  "sources": [
    {
      "title": "SDK · DiContainer.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/di/DiContainer.ts",
      "note": "Разрешение зависимостей."
    },
    {
      "title": "Block Puzzle · scene.di.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/configs/scene.di.ts",
      "note": "Фабрика игрового сервиса и список сервисов сцены."
    }
  ]
}
---

При входе в сцену SDK запрашивает сервисы из `registerServices`. Для `Gameplay` контейнер вызывает фабрику (`provider.useFactory(this)`). Она передаёт в конструктор настройки поля, фигур, очков и сервис прогресса. [scene.di.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/configs/scene.di.ts#L27-L46)

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

<figure class="sdk-figure is-flow" aria-label="Как контейнер создаёт игровой сервис">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-violet"><div><strong>Запрос</strong><span>Контейнер получает токен Gameplay</span></div></div>
    <div class="sdk-figure__item tone-cyan"><div><strong>Вызов фабрики</strong><span>Фабрика передаёт зависимости в new BlockPuzzleGameplayService</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>Экземпляр</strong><span>Контейнер сохраняет сервис для следующих запросов</span></div></div>
  </div>
</figure>
