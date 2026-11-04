---
{
  "locale": "ru",
  "translationKey": "sdk/presentation/screen",
  "course": "sdk",
  "lesson": "presentation",
  "draft": true,
  "order": 3,
  "title": "Виртуальный экран и адаптивность",
  "concept": "ScreenManager",
  "description": "Разделим размер окна, игровые координаты и размер отрисовки.",
  "takeaway": [
    "Виртуальные координаты, масштаб и DPR выполняют разные задачи.",
    "Адаптивность вписывает композицию с уже рассчитанными границами."
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

<aside class="lesson-note is-green" aria-labelledby="lesson-purpose">
  <h3 id="lesson-purpose">Зачем это нужно</h3>
  <p>Размеры и плотность пикселей экранов различаются, а окно может менять размер. Нужна общая система координат, чтобы размещение объектов и обработка ввода оставались согласованными.</p>
</aside>

`ScreenManager` рассчитывает виртуальную область и масштаб. Виртуальные координаты позволяют описывать игровую геометрию независимо от физической плотности пикселей экрана.

<aside class="lesson-note" aria-labelledby="virtual-screen"><span class="lesson-note__label">Термин</span><h3 id="virtual-screen">Виртуальные координаты</h3><p>Координаты, в которых игра располагает объекты. Движок переводит их в размер текущего canvas и обратно для ввода.</p></aside>

<figure class="sdk-figure"><div class="sdk-screens"><div class="sdk-screen is-land"><span class="sdk-screen__label">Горизонтальный экран</span><div class="sdk-screen__score">120 <small>счёт</small></div><div class="sdk-screen__area"><div class="sdk-screen__board">Поле</div><div class="sdk-screen__slots"><i></i><i></i><i></i></div></div></div><div class="sdk-screen is-port"><span class="sdk-screen__label">Вертикальный экран</span><div class="sdk-screen__score">120 <small>счёт</small></div><div class="sdk-screen__area"><div class="sdk-screen__board">Поле</div><div class="sdk-screen__slots"><i></i><i></i><i></i></div></div></div></div><figcaption>Одна композиция вписывается в разные области. Размеры клеток рассчитывает игра, масштаб композиции — responsive-компонент.</figcaption></figure>

`getViewportSize()` описывает окно, `getVirtualSize()` — игровую систему координат, `getScale()` — масштаб. DPR влияет на разрешение буфера рендера и не должен повторно умножать координаты фигуры.

В Block Puzzle `ResponsiveLayoutComponent` вписывает композицию поля и слотов. Фрагмент узла `gameplay` из [layout.json](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/assets/json/layouts/scenes/game/layout.json):

```json
"responsiveLayout": {
  "type": "ResponsiveLayoutComponent",
  "data": {
    "area": { "padding": { "top": 16, "right": 16, "bottom": 16, "left": 16 } },
    "scale": { "mode": "contain", "min": 0.45, "max": 1.08 }
  }
}
```

`contain` вписывает объект в область, `cover` покрывает её, `width` рассчитывает масштаб по ширине. `position` выравнивает объект, `orientation.land` и `.port` задают поправки для ориентации. `resize: 'stretch'` подходит для фона или блокирующей области.

Игровой `BlockPuzzleLayoutComponent` рассчитывает размеры композиции, а responsive-компонент вписывает готовые границы. Для входных данных используем `event.virtual`, затем переводим точку в локальные координаты нужного контейнера через `toLocalPosition`.

После изменения окна движок отправляет SCREEN_CHANGED. В игре счётчик заново получает базовый масштаб через `ResponsiveLayoutComponent.refresh()` и останавливает старый tween, чтобы анимация не спорила с новой вёрсткой.
