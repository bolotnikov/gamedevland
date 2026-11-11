---
{
  "locale": "en",
  "translationKey": "sdk/rendering/three-only",
  "course": "sdk",
  "lesson": "rendering",
  "draft": false,
  "order": 3,
  "title": "Three-only: a 3D scene",
  "concept": "ThreeRendererModule",
  "description": "Create a cube and a camera in JSON.",
  "sources": [
    {
      "title": "SDK · ThreeSchemas.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/renderers/three/ThreeSchemas.ts",
      "note": "Node types, strict properties and camera settings."
    },
    {
      "title": "SDK · ThreeElements.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/renderers/three/ThreeElements.ts",
      "note": "Creating geometry, materials and cameras."
    },
    {
      "title": "SDK · ThreeHitTester.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/renderers/three/ThreeHitTester.ts",
      "note": "Finding the nearest visible interactive node."
    }
  ]
}
---

For a 3D game without a Pixi UI, select `ThreeRendererModule` from `@gamedevland/engine/renderers/three`. Install the library with `npm install three` and the types with `npm install --save-dev @types/three`. This mode does not need PixiJS.

Set `system.renderer: new ThreeRendererModule()` in `GameConfig`. In the scene layout, create a cube and a camera:

```json
{
  "world": {
    "type": "Group",
    "children": {
      "cube": {
        "type": "Mesh",
        "props": {
          "geometry": { "type": "box" },
          "material": { "type": "basic", "color": "#40aacc" }
        }
      },
      "camera": {
        "type": "PerspectiveCamera",
        "props": {
          "position": { "x": 0, "y": 2, "z": 5 },
          "lookAt": { "x": 0, "y": 0, "z": 0 },
          "near": 0.1, "far": 100, "fov": 50
        }
      }
    }
  }
}
```

Set `SceneConfig.render` to `{ camera: 'world.camera' }`. The `basic` material displays its color without lighting; add a light for a `standard` material.

<figure class="sdk-figure is-compare"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>Group</strong><span>Groups Three nodes</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>Camera</strong><span>world.camera → one canvas</span></div></div></div></figure>

Position and scale use `{ x, y, z }` vectors; rotations use radians. Y points up, the ground lies in XZ, and distances use meters. Only `Group` accepts authored child nodes in JSON.

A component declares `nodeType = ThreeNode` or `ThreeGroup` and changes the object through `this.node.view`. `node.input` finds the nearest visible interactive node by casting a ray from the camera. Hitting part of a GLB resolves to its owning `Model` node.
