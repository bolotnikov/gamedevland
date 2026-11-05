---
{
  "locale": "en",
  "translationKey": "sdk/presentation/audio",
  "course": "sdk",
  "lesson": "presentation",
  "draft": false,
  "order": 12,
  "title": "Sound when a piece lands",
  "concept": "AudioManager",
  "description": "Play a short sound after a successful move.",
  "takeaway": [
    "playSfx plays a sound effect, and playMusic plays music."
  ],
  "sources": [
    {
      "title": "SDK · AudioManager.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/audio/AudioManager.ts",
      "note": "Channels, playback handles, pausing, and unloadSource."
    },
    {
      "title": "SDK · types.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/audio/types.ts",
      "note": "Playback options and return value."
    },
    {
      "title": "Block Puzzle · BlockPuzzleAudioService.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/services/BlockPuzzleAudioService.ts",
      "note": "Subscribing to game events."
    }
  ]
}
---

Add the sound to the asset list. In Block Puzzle, the audio service listens for `PlacementCompleted` and calls `engine.audio.playSfx` with the sound ID. It unsubscribes when the scene closes. [BlockPuzzleAudioService.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/services/BlockPuzzleAudioService.ts#L20)

```ts
ctx.engine.events.on(BlockPuzzleEvents.PlacementCompleted, () => {
  this.playSfx(AudioAssetIds.Placed);
});
```

<figure class="sdk-figure is-flow">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-cyan"><div><strong>PlacementCompleted</strong><span>A piece was placed</span></div></div>
    <div class="sdk-figure__item tone-violet"><div><strong>playSfx</strong><span>Play the sound by ID</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>Sound</strong><span>The player hears confirmation</span></div></div>
  </div>
</figure>
