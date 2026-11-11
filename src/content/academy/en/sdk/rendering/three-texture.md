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
      "title": "SDK · PixiThreeTextureRendererModule.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/renderers/hybrid/PixiThreeTextureRendererModule.ts",
      "note": "Pixi as the main renderer, with GLB loading."
    },
    {
      "title": "SDK · ThreeTextureSurface.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/renderers/hybrid/ThreeTextureSurface.ts",
      "note": "Texture creation, render, resize, resolution limits and cleanup."
    }
  ]
}
---

For a rotating menu item or a 3D board inside a Pixi game, select `PixiThreeTextureRendererModule` from `@gamedevland/engine/renderers/hybrid`. It needs `pixi.js`, `three` and `@types/three`.

Set `system.renderer: new PixiThreeTextureRendererModule()` in `GameConfig`. A Pixi sprite component creates a `ThreeTextureSurface`: a separate Three canvas that is not added to the page. Its image becomes the sprite texture.

Inside the component, prepare a Three.js `scene` and `camera`. Then connect them to the sprite; size and resolution come from the component's validated JSON configuration:

```ts
const surface = new ThreeTextureSurface({
  width: this.config.width,
  height: this.config.height,
  resolution: this.config.resolution,
});
this.ownDisposer(() => surface.dispose());
this.node.setTexture(surface.texture);
surface.render(scene, camera);
```

Import `ThreeTextureSurface` from `/renderers/hybrid`. The component extends `BaseTypedComponent<Config, Sprite>` and declares `nodeType = Sprite`; import `Sprite` from `/renderers/pixi`.

<figure class="sdk-figure is-flow"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>Three scene</strong><span>render(scene, camera)</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>Texture</strong><span>A copy of the image</span></div></div><div class="sdk-figure__item tone-green"><div><strong>Pixi sprite</strong><span>Position, scale, opacity and input</span></div></div></div></figure>

Call `render` again after changing the 3D scene; a still image needs no repeated pixel upload. On size changes, call `surface.resize(width, height, resolution)` and update the camera. `resolution` must be between 0.25 and 2.

Input stays on the Pixi sprite: objects inside the image do not automatically receive Three raycasts. The component separately releases its own geometry, materials and GLB instances; `surface.dispose()` releases only the renderer and Pixi texture. Do not destroy shared GLB resources manually. Transferring the image between WebGL contexts requires copying pixels.
