---
{
  "locale": "en",
  "translationKey": "sdk/rendering/three-texture",
  "course": "sdk",
  "lesson": "rendering",
  "draft": false,
  "order": 5,
  "title": "Pixi + Three-as-texture: 3D in a sprite",
  "concept": "PixiThreeTextureRendererModule",
  "description": "Render a 3D object inside a Pixi screen.",
  "sources": [
    {
      "title": "SDK · ThreeViewport.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-11/packages/engine/src/renderers/hybrid/ThreeViewport.ts",
      "note": "Declarative viewport and access to the Three layout."
    },
    {
      "title": "SDK · ThreeViewportComponent.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-11/packages/engine/src/renderers/hybrid/ThreeViewportComponent.ts",
      "note": "Scene preparation, rendering, resize and cleanup."
    }
  ]
}
---

For a 3D menu item or a board inside a Pixi game, select `PixiThreeTextureRendererModule` from `@gamedevland/engine/renderers/hybrid`: `system.renderer: new PixiThreeTextureRendererModule()`. It needs `pixi.js`, `three` and `@types/three`.

Add a `ThreeViewport` to the JSON layout. The SDK creates a separate Three canvas and assigns its image to a Pixi sprite texture:

```json
{
  "itemPreview": {
    "type": "ThreeViewport",
    "props": {
      "width": 400,
      "height": 400,
      "resolution": 1.5,
      "sceneLayout": "json/layouts/previews/item.json",
      "camera": "world.camera"
    }
  }
}
```

`sceneLayout` is the JSON asset ID containing Three nodes: groups, models, a camera and lights. `camera` names a camera inside that file. See the [Three layout example](https://github.com/gamedevland/sdk/blob/sdk-2026-11-11/examples/three-viewport/preview.json). Each viewport has its own graph and IDs; do not declare `children` on the `ThreeViewport` itself.

<figure class="sdk-figure is-flow"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>Three layout</strong><span>Models, camera and lights</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>Texture</strong><span>A copy of the Three scene image</span></div></div><div class="sdk-figure__item tone-green"><div><strong>ThreeViewport</strong><span>Pixi position, scale, opacity and input</span></div></div></div></figure>

In a component's `onReady`, access nodes through `viewport.world.requireNode(id, ThreeNode)`. The default is on-demand rendering: call `viewport.invalidate()` after changing 3D objects. For continuous animation, set `renderMode: "always"` in props.

`viewport.resize(width, height, resolution)` changes the texture size and camera projection. `resolution` must be between 0.25 and 2. Destroying the node releases the embedded layout, GLB instances, renderer and texture. Resources created by a game component remain that component's responsibility.

Input stays on the Pixi sprite: Three raycasting inside the image is not automatic. Transferring the image requires copying pixels. `ThreeTextureSurface` remains available for custom rendering in code.
