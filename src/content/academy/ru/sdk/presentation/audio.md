---
{
  "locale": "ru",
  "translationKey": "sdk/presentation/audio",
  "course": "sdk",
  "lesson": "presentation",
  "draft": false,
  "order": 12,
  "title": "Звук при размещении фигуры",
  "concept": "AudioManager",
  "description": "Воспроизведём короткий звук после успешного хода.",
  "takeaway": [
    "playSfx запускает эффект, playMusic запускает музыку."
  ],
  "sources": [
    {
      "title": "SDK · AudioManager.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/audio/AudioManager.ts",
      "note": "Каналы, handles, пауза и unloadSource."
    },
    {
      "title": "SDK · types.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/audio/types.ts",
      "note": "Параметры воспроизведения и результат."
    },
    {
      "title": "Block Puzzle · BlockPuzzleAudioService.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/services/BlockPuzzleAudioService.ts",
      "note": "Подписки на игровые события."
    }
  ]
}
---

Добавим звук в список ресурсов. В Block Puzzle сервис звука слушает `PlacementCompleted`. По этому событию он вызывает `engine.audio.playSfx` с именем звука. При выходе из сцены сервис снимает подписку. [BlockPuzzleAudioService.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/services/BlockPuzzleAudioService.ts#L20)

```ts
ctx.engine.events.on(BlockPuzzleEvents.PlacementCompleted, () => {
  this.playSfx(AudioAssetIds.Placed);
});
```

<figure class="sdk-figure is-flow">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-cyan"><div><strong>PlacementCompleted</strong><span>Фигура размещена</span></div></div>
    <div class="sdk-figure__item tone-violet"><div><strong>playSfx</strong><span>Запускаем звук по ID</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>Звук</strong><span>Игрок слышит подтверждение</span></div></div>
  </div>
</figure>
