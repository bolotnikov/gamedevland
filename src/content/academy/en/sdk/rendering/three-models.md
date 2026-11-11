---
{
  "locale": "en",
  "translationKey": "sdk/rendering/three-models",
  "course": "sdk",
  "lesson": "rendering",
  "draft": false,
  "order": 6,
  "title": "Loading GLB models",
  "concept": "ModelAsset",
  "description": "Add a ready-made 3D object to a Three scene.",
  "sources": [
    {
      "title": "SDK · AssetManifestTypes.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/assets/AssetManifestTypes.ts",
      "note": "The manifest models field."
    },
    {
      "title": "SDK · GlbLoader.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/renderers/three/GlbLoader.ts",
      "note": "Supported GLB format and limitations."
    },
    {
      "title": "SDK · ModelAsset.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/renderers/three/ModelAsset.ts",
      "note": "Shared GPU resources and acquire/release."
    }
  ]
}
---

Place `tree.glb` in `game/assets/models/`. GLB stores a 3D object and its resources in one file. The SDK loader accepts static GLB 2.0 without animation, skinning, external files or required extensions.

Pass a `models` field to `AssetManifestBuilder` with file URLs collected by `import.meta.glob<string>('@game/assets/models/**/*.glb', { eager: true, query: '?url', import: 'default' })`. The default policy creates the `models` bundle.

Add `'models'` to `SceneConfig.assets.bundles`, then add a tree to the `Group` node's `children`:

```json
"tree": {
  "type": "Model",
  "props": {
    "asset": "models/tree.glb",
    "position": { "x": 2, "y": 0, "z": 0 }
  }
}
```

<figure class="sdk-figure is-compare"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>GLB</strong><span>Shared geometry, materials and textures</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>Model</strong><span>A separate hierarchy for each tree</span></div></div><div class="sdk-figure__item tone-green"><div><strong>Removal</strong><span>The node releases its instance</span></div></div></div></figure>

`Model` nodes share the file's resources, so those resources must not be destroyed manually for one tree. A node releases its instance when removed. Then `assets.unload('models/tree.glb')` can remove the asset from the cache.

For a custom Three scene inside a Pixi texture, retrieve the `ModelAsset`, call `acquire()` and add its `view` to the scene. The component removes the object from the scene and calls `release()` during cleanup. Live instances prevent eviction of the shared asset.
