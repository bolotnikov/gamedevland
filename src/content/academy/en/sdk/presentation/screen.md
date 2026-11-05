---
{
  "locale": "en",
  "translationKey": "sdk/presentation/screen",
  "course": "sdk",
  "lesson": "presentation",
  "draft": false,
  "order": 3,
  "title": "Fitting the board to the screen",
  "concept": "ScreenManager",
  "description": "Keep the whole board visible when the window changes size.",
  "takeaway": [
    "The contain mode scales the board so it fits entirely."
  ],
  "sources": [
    {
      "title": "SDK · ScreenManager.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/screen/ScreenManager.ts",
      "note": "Dimensions and coordinate conversion."
    },
    {
      "title": "SDK · ResponsiveLayoutComponent.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/components/ResponsiveLayoutComponent.ts",
      "note": "Fitting, orientation, and refresh."
    },
    {
      "title": "Block Puzzle · BlockPuzzleLayoutComponent.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/components/BlockPuzzleLayoutComponent.ts",
      "note": "The geometry of the game layout."
    }
  ]
}
---

<aside class="lesson-note" aria-labelledby="virtual-screen"><span class="lesson-note__label">Term</span><h3 id="virtual-screen">Game coordinates</h3><p>The coordinates used to place game elements. When the window changes size, the SDK recalculates where those elements appear on screen.</p></aside>


In Block Puzzle, `ResponsiveLayoutComponent` scales the board and pieces. `contain` fits them inside the available area, and `padding` leaves space around the edges. [layout.json](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/assets/json/layouts/scenes/game/layout.json)

```json
"responsiveLayout": {
  "type": "ResponsiveLayoutComponent",
  "data": {
    "area": { "padding": { "top": 16, "right": 16, "bottom": 16, "left": 16 } },
    "scale": { "mode": "contain", "min": 0.45, "max": 1.08 }
  }
}
```

<figure class="sdk-figure"><div class="sdk-screens"><div class="sdk-screen is-land"><span class="sdk-screen__label">Landscape screen</span><div class="sdk-screen__score">120 <small>score</small></div><div class="sdk-screen__area"><div class="sdk-screen__board">Board</div><div class="sdk-screen__slots"><i></i><i></i><i></i></div></div></div><div class="sdk-screen is-port"><span class="sdk-screen__label">Portrait screen</span><div class="sdk-screen__score">120 <small>score</small></div><div class="sdk-screen__area"><div class="sdk-screen__board">Board</div><div class="sdk-screen__slots"><i></i><i></i><i></i></div></div></div></div></figure>
