---
{
  "locale": "ru",
  "translationKey": "sdk/presentation/layouts",
  "course": "sdk",
  "lesson": "presentation",
  "draft": false,
  "order": 1,
  "title": "Экран сцены из JSON",
  "concept": "Вёрстка сцены",
  "description": "Опишем поле и счётчик в layout.json.",
  "takeaway": [
    "SDK создаёт элементы экрана по полю layout в SceneConfig."
  ],
  "sources": [
    {
      "title": "SDK · types.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/types.ts",
      "note": "Формат layout и узла."
    },
    {
      "title": "SDK · LayoutResolver.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/core/LayoutResolver.ts",
      "note": "Разрешение включений и проверка дерева."
    },
    {
      "title": "SDK · IncludeExpander.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/core/transformers/IncludeExpander.ts",
      "note": "Поверхностное объединение и защита от циклов."
    },
    {
      "title": "Block Puzzle · layout.json",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/assets/json/layouts/scenes/game/layout.json",
      "note": "Полный layout Block Puzzle."
    }
  ]
}
---

<aside class="lesson-note" aria-labelledby="layout-term"><span class="lesson-note__label">Термин</span><h3 id="layout-term">Вёрстка сцены (layout)</h3><p>Файл, в котором указано, что появится на экране и какие элементы находятся внутри других.</p></aside>

В `SceneConfig.layout` укажем путь к JSON. В `type` запишем тип элемента, в `props` его настройки, а в `children` вложенные элементы. Пример сокращён. [layout.json](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/assets/json/layouts/scenes/game/layout.json)

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

<figure class="sdk-figure is-tree"><div class="sdk-layout-tree"><strong class="sdk-tree-root">root <small>Container</small></strong><ul><li><code>score</code> · счёт</li><li><code>gameplay</code> · игровая область<ul><li><code>board</code> · поле</li></ul></li></ul></div></figure>
