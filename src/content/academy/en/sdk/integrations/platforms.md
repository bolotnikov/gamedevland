---
{
  "locale": "en",
  "translationKey": "sdk/integrations/platforms",
  "course": "sdk",
  "lesson": "integrations",
  "draft": false,
  "order": 1,
  "title": "Choosing a game platform",
  "concept": "PlatformManager",
  "description": "Select a platform when building the game.",
  "takeaway": [
    "VITE_PLATFORM selects the platform, and PlatformManager forwards the game’s calls to it."
  ],
  "sources": [
    {
      "title": "SDK · PlatformCatalog.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/platforms/shared/PlatformCatalog.ts",
      "note": "Supported platforms."
    },
    {
      "title": "SDK · types.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/platforms/types.ts",
      "note": "Signals, ads, and the reward result."
    },
    {
      "title": "SDK · PlatformManager.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/platforms/PlatformManager.ts",
      "note": "Adapter calls and ad hooks."
    },
    {
      "title": "SDK · GameViteConfigFactory.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/vite/src/GameViteConfigFactory.ts",
      "note": "Selecting the platform build."
    },
    {
      "title": "SDK · PlaygamaPlatformAdapter.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/platforms/internal/playgama/PlaygamaPlatformAdapter.ts",
      "note": "Bridge initialization, saves, advertising and host pause."
    }
  ]
}
---

<aside class="lesson-note" aria-labelledby="platform-term"><span class="lesson-note__label">Term</span><h3 id="platform-term">Game platform</h3><p>A site that hosts the game. It can show ads and receive updates about loading and gameplay.</p></aside>


For Poki, set `VITE_PLATFORM=poki` when building. The game calls the same `PlatformManager` methods across platforms. For example, `gameplayStart()` signals that a session has started and `gameplayStop()` signals that it has ended.

For Playgama Bridge, select `VITE_PLATFORM=playgama`. Add `playgama-bridge-config.json` to `game/public/`; its minimal content is `{}`. The build tools load Bridge before the game. Game code continues to use `engine.platform`; Bridge detects the host platform.

Bridge saves are prepared before platform initialization finishes. With `platform-exclusive`, the engine uses them without substituting browser records. Set the `namespace` through `system.persistence`.

<figure class="sdk-figure is-flow">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-cyan"><div><strong>VITE_PLATFORM=poki</strong><span>Select the platform at build time</span></div></div>
    <div class="sdk-figure__item tone-violet"><div><strong>PlatformManager</strong><span>The game reports that a session has started</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>Poki</strong><span>Receives the signal</span></div></div>
  </div>
</figure>
