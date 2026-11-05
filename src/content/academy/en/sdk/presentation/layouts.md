---
{
  "locale": "en",
  "translationKey": "sdk/presentation/layouts",
  "course": "sdk",
  "lesson": "presentation",
  "draft": false,
  "order": 1,
  "title": "Building a scene from JSON",
  "concept": "Scene layout",
  "description": "Describe the board and score display in layout.json.",
  "takeaway": [
    "The SDK creates screen elements from the layout field in SceneConfig."
  ],
  "sources": [
    {
      "title": "SDK · types.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/types.ts",
      "note": "The layout and node format."
    },
    {
      "title": "SDK · LayoutResolver.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/core/LayoutResolver.ts",
      "note": "Resolving includes and validating the tree."
    },
    {
      "title": "SDK · IncludeExpander.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/core/transformers/IncludeExpander.ts",
      "note": "Shallow merging and cycle protection."
    },
    {
      "title": "Block Puzzle · layout.json",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/assets/json/layouts/scenes/game/layout.json",
      "note": "The full Block Puzzle layout."
    }
  ]
}
---

<aside class="lesson-note" aria-labelledby="layout-term"><span class="lesson-note__label">Term</span><h3 id="layout-term">Scene layout</h3><p>A file that lists what appears on screen and which elements are nested inside others.</p></aside>


Set `SceneConfig.layout` to the path to the JSON file. Use `type` for the element type, `props` for its settings, and `children` for nested elements. The example is shortened. [layout.json](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/assets/json/layouts/scenes/game/layout.json)

```json
{
  "root": {
    "type": "Container",
    "children": {
      "score": { "type": "Text", "props": { "text": "0", "anchor": 0.5 } },
      "gameplay": {
        "type": "Container",
        "children": { "board": { "type": "Container" } }
      }
    }
  }
}
```

<figure class="sdk-figure is-tree"><div class="sdk-layout-tree"><strong class="sdk-tree-root">root <small>Container</small></strong><ul><li><code>score</code> · score</li><li><code>gameplay</code> · play area<ul><li><code>board</code> · board</li></ul></li></ul></div></figure>
