---
{
  "locale": "ru",
  "translationKey": "sdk/presentation/screen",
  "course": "sdk",
  "lesson": "presentation",
  "draft": false,
  "order": 3,
  "title": "Как вписать поле в экран",
  "concept": "ScreenManager",
  "description": "Сохраним поле целиком при смене размера окна.",
  "takeaway": [
    "Режим contain подбирает масштаб так, чтобы поле помещалось целиком."
  ],
  "sources": [
    {
      "title": "SDK · ScreenManager.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/screen/ScreenManager.ts",
      "note": "Размеры и преобразование координат."
    },
    {
      "title": "SDK · ResponsiveLayoutComponent.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/components/ResponsiveLayoutComponent.ts",
      "note": "Вписывание, ориентация и refresh."
    },
    {
      "title": "Block Puzzle · BlockPuzzleLayoutComponent.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/components/BlockPuzzleLayoutComponent.ts",
      "note": "Геометрия композиции игры."
    }
  ]
}
---

<aside class="lesson-note" aria-labelledby="virtual-screen"><span class="lesson-note__label">Термин</span><h3 id="virtual-screen">Игровые координаты</h3><p>Координаты, в которых расставляем элементы игры. При смене размера окна SDK пересчитывает, где они окажутся на экране.</p></aside>

В Block Puzzle компонент `ResponsiveLayoutComponent` подбирает масштаб поля и фигур. `contain` вписывает их в доступную область, а `padding` оставляет отступы по краям. [layout.json](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/assets/json/layouts/scenes/game/layout.json)

```json
"responsiveLayout": {
  "type": "ResponsiveLayoutComponent",
  "data": {
    "area": { "padding": { "top": 16, "right": 16, "bottom": 16, "left": 16 } },
    "scale": { "mode": "contain", "min": 0.45, "max": 1.08 }
  }
}
```

<figure class="sdk-figure"><div class="sdk-screens"><div class="sdk-screen is-land"><span class="sdk-screen__label">Горизонтальный экран</span><div class="sdk-screen__score">120 <small>счёт</small></div><div class="sdk-screen__area"><div class="sdk-screen__board">Поле</div><div class="sdk-screen__slots"><i></i><i></i><i></i></div></div></div><div class="sdk-screen is-port"><span class="sdk-screen__label">Вертикальный экран</span><div class="sdk-screen__score">120 <small>счёт</small></div><div class="sdk-screen__area"><div class="sdk-screen__board">Поле</div><div class="sdk-screen__slots"><i></i><i></i><i></i></div></div></div></div></figure>
