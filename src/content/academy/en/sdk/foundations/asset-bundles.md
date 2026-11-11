---
{
  "locale": "en",
  "translationKey": "sdk/foundations/asset-bundles",
  "course": "sdk",
  "lesson": "foundations",
  "draft": false,
  "order": 7,
  "title": "Loading the required bundles",
  "concept": "AssetManager",
  "description": "Control when assets load and how their results are accessed.",
  "takeaway": [
    "A bundle loads by its previously registered name.",
    "Owning a scene does not mean owning all shared assets."
  ],
  "sources": [
    {
      "title": "SDK · AssetManager.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/assets/AssetManager.ts",
      "note": "loadBundle, loadRequiredBundle, load, has, get and loading controls."
    },
    {
      "title": "SDK · BaseScene.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/scenes/BaseScene.ts",
      "note": "Scene preloading and the absence of automatic shared asset removal."
    },
    {
      "title": "Block Puzzle · BootPreloadRequestFactory.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/boot/configs/BootPreloadRequestFactory.ts",
      "note": "The Block Puzzle bundle list."
    },
    {
      "title": "Block Puzzle · BootPreloadService.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/boot/services/BootPreloadService.ts",
      "note": "The original runPreload method, which loads bundles sequentially."
    }
  ]
}
---

<aside class="lesson-note is-green" aria-labelledby="lesson-purpose">
  <h3 id="lesson-purpose">Why this is needed</h3>
  <p>Not every asset is needed at startup. Grouping assets into bundles lets us load the required files before opening a scene instead of waiting for the entire game to load at once.</p>
</aside>

`AssetManager` registers assets, loads them and stores the results. A bundle is a named group of assets that can be loaded together.

The `runPreload` method in [BootPreloadService.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/boot/services/BootPreloadService.ts#L53) loads assets sequentially:

```ts
await this.sceneContext.engine.bootstrapConfigBundles(request.configBundles);
for (const bundleName of request.assetBundles) {
  await this.assets.loadBundle(bundleName);
}
```

This code explicitly defines the order of the groups. AssetManager limits requests through concurrency, retry and timeout settings. These settings do not make a missing asset an acceptable result.

<figure class="sdk-figure is-compare"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>Registered</strong><span>The engine knows the type and address. The content may not be loaded yet.</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>Loaded</strong><span>get(id) can return the result. The consumer still checks its type.</span></div></div></div><figcaption>Both stages are needed: a manifest entry and a successful load.</figcaption></figure>

<a id="загрузка-сцены" class="translation-anchor" aria-hidden="true"></a>
## Scene loading

If a bundle is needed when entering a scene, list it in `SceneConfig.assets`:

```ts
assets: {
  bundles: ['images', 'fonts'],
  ids: ['json/layouts/scenes/game/layout.json'],
},
```

This is part of a scene definition. Bundle names and IDs must exist in the manifest. `loadBundle` rejects unknown names, so a typo is detected immediately.

`load(ids)` loads individual IDs. `has(id)` checks for a loaded result, and `get(id)` returns it. For JSON, we then use a decoder; for images, a standard Pixi node or `TextureAssetResolver` from `@gamedevland/engine/renderers/pixi`.

After loading, `loadRequiredBundle(name)` checks that every result is present. An ordinary `loadBundle` call does not guarantee that every file loaded: individual loader failures are handled inside the coordinator. Use `loadRequiredBundle` for required assets.

For required individual files, use `loadRequired(ids, { signal })`; `loadRequiredBundle(name, { signal })` accepts the same cancellation signal. `BaseScene.preload` uses required loading for assets listed in `SceneConfig.assets`.

Leaving a scene does not clear the shared cache: the next scene may use the same files. `assets.unload(id)` explicitly removes an asset. Release all GLB instances first; an asset with live instances stays in the cache.
