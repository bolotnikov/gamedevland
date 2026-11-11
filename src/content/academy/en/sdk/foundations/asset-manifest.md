---
{
  "locale": "en",
  "translationKey": "sdk/foundations/asset-manifest",
  "course": "sdk",
  "lesson": "foundations",
  "draft": false,
  "order": 6,
  "title": "Files, URLs and asset IDs",
  "concept": "Asset manifest",
  "description": "Connect project files to the names used by game code.",
  "takeaway": [
    "Game code uses the asset ID; the loader uses the URL.",
    "Describing an asset does not load it."
  ],
  "sources": [
    {
      "title": "SDK · AssetManifestBuilder.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/assets/AssetManifestBuilder.ts",
      "note": "ID and grouping rules."
    },
    {
      "title": "SDK · types.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/assets/types.ts",
      "note": "AssetDescriptor, BundleDescriptor and asset types."
    },
    {
      "title": "Block Puzzle · assets.manifest.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/config/assets.manifest.ts",
      "note": "The example's complete manifest."
    }
  ]
}
---

<aside class="lesson-note is-green" aria-labelledby="lesson-purpose">
  <h3 id="lesson-purpose">Why this is needed</h3>
  <p>File addresses may change after a build. Game code needs stable asset names to find images, audio and JSON regardless of their addresses in the build.</p>
</aside>

The manifest lists the game's assets. Each has an `id`, a type and a URL. Code uses a stable identifier; Vite produces the file's address in the build.

<aside class="lesson-note" aria-labelledby="asset-id"><span class="lesson-note__label">Term</span><h3 id="asset-id">Asset ID</h3><p>An asset's name inside the game, such as images/block.png. It does not have to match the file's URL after a build.</p></aside>

In [assets.manifest.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/config/assets.manifest.ts#L29), `import.meta.glob` collects file URLs and `AssetManifestBuilder` turns them into asset bundles. Here is that fragment with the result type specified through `glob<string>`:

```ts
const images = import.meta.glob<string>(
  '@game/assets/images/**/*.{png,jpg,jpeg,webp,avif}',
  { eager: true, query: '?url', import: 'default' },
);
```

Here, `eager: true` retrieves the URLs immediately. It does not load image content through AssetManager: those requests run when the corresponding bundle is loaded.

<figure class="sdk-figure is-flow"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">01</span><div><strong>game/assets/images/block.png</strong><span>Source file</span></div></div><div class="sdk-figure__item tone-violet"><span class="sdk-figure__index">02</span><div><strong>images/block.png</strong><span>Asset ID using the default strategy after /assets/</span></div></div><div class="sdk-figure__item tone-green"><span class="sdk-figure__index">03</span><div><strong>importedUrl</strong><span>Address prepared by Vite</span></div></div><div class="sdk-figure__item tone-amber"><span class="sdk-figure__index">04</span><div><strong>AssetManager</strong><span>Loaded image under a stable ID</span></div></div></div><figcaption>The identifier stays readable even if the build tool changes the output filename.</figcaption></figure>

A small bundle can be assembled manually:

```ts
const bundles = [{
  name: 'images',
  assets: [{ id: 'images/block.png', type: 'image', importedUrl: blockUrl }],
}] satisfies BundleDescriptor[];
```

`blockUrl` is the image URL imported with `?url`. Import the `BundleDescriptor` type from `@gamedevland/engine/assets`. For larger collections, `AssetManifestBuilder` assembles bundles without listing every file manually.

`BundleBuildPolicy` determines grouping. The game separates music and effects into `audio-music` and `audio-sfx`. The asset type selects the loader: `image`, `audio`, `json`, `font` or `model`. For GLB files, pass URLs in the `models` field of `AssetManifestBuilder`; the model loader is registered with the Three module. The SDK prepares the loaded image for a node; components do not need to create the texture individually.
