---
{
  "locale": "ru",
  "translationKey": "sdk/presentation/audio",
  "course": "sdk",
  "lesson": "presentation",
  "draft": true,
  "order": 12,
  "title": "Звук реагирует на события игры",
  "concept": "AudioManager",
  "description": "Разделим музыку, эффекты, загрузку и политику паузы.",
  "takeaway": [
    "Игровые события выбирают звук; AudioManager управляет воспроизведением.",
    "Снятие подписки и остановка фоновой музыки — отдельные решения владельца."
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

`AudioManager` предоставляет каналы музыки и звуковых эффектов. Сервис игры связывает события партии со звуками; алгоритм размещения не зависит от аудиобиблиотеки.

Сокращённый фрагмент подписки из метода `onEnter` файла [BlockPuzzleAudioService.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/services/BlockPuzzleAudioService.ts#L20):

```ts
ctx.engine.events.on(BlockPuzzleEvents.PlacementCompleted, () => {
  this.playSfx(AudioAssetIds.Placed);
});
```

Полный сервис сохраняет функцию отписки в `eventOffs` и вызывает её на выходе. Его `playSfx` обращается к `sceneContext.engine.audio.playSfx(assetId)`.

<figure class="sdk-figure is-compare"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>music</strong><span>playMusic → фоновая композиция → настройки канала</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>sfx</strong><span>playSfx → отдельный эффект → handle конкретного воспроизведения</span></div></div></div><figcaption>Музыка и эффекты используют один менеджер, но разные каналы управления.</figcaption></figure>

Перед воспроизведением аудиоресурс должен быть зарегистрирован и подготовлен. `preloadInBackground` прогревает источник. Браузер может требовать пользовательский жест для начала звука; `unlock()` позволяет разблокировать аудио в подходящем обработчике ввода.

`playMusic` и `playSfx` могут вернуть `undefined`, например при выключенном канале. Если handle получен, доступны `stopByHandle`, `pauseByHandle`, `setHandleVolume`, `setHandleRate` и `seekHandle`.

## Настройки и очистка

`setMasterVolume`, `setChannelVolume` и `applyVolumeOverrides` управляют уровнем звука. `setMusicEnabled`, `setSfxEnabled` и `setMuted` задают пользовательскую политику. Runtime-пауза и platform-muted учитываются менеджером отдельно.

`stopAll(channel)` останавливает воспроизведения канала, `unloadSource(id)` освобождает источник. Не следует останавливать всю музыку при удалении любого компонента кнопки: действие очистки должно соответствовать владельцу.

В исходном Block Puzzle выход AudioService снимает подписки. Для новой сцены отдельно решаем, должна ли фоновая музыка продолжаться через переход или принадлежать только ей.
