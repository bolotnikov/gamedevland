---
{
  "locale": "ru",
  "translationKey": "sdk/presentation/drag",
  "course": "sdk",
  "lesson": "presentation",
  "draft": false,
  "order": 10,
  "title": "Перетаскивание фигуры",
  "concept": "Перетаскивание",
  "description": "Подсветим клетки, а затем разместим фигуру.",
  "takeaway": [
    "Предпросмотр показывает место. Ход применяется после отпускания."
  ],
  "sources": [
    {
      "title": "Block Puzzle · BlockPuzzleDragComponent.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/components/BlockPuzzleDragComponent.ts",
      "note": "Реальный жест и preview исходной игры."
    },
    {
      "title": "SDK · index.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/interactions/index.ts",
      "note": "Публичные элементы общего drag API."
    },
    {
      "title": "SDK · DragInputBridgeComponent.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/interactions/components/DragInputBridgeComponent.ts",
      "note": "Преобразование фаз, pointercancel и координат."
    }
  ]
}
---

Пока игрок тянет фигуру, `BlockPuzzleDragComponent` двигает её изображение. Он переводит точку указателя в координаты поля и вызывает `previewPlacement`, чтобы подсветить клетки. При отпускании компонент отправляет `PlacementRequested`, а при отмене убирает подсветку. [BlockPuzzleDragComponent.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/components/BlockPuzzleDragComponent.ts)

<figure class="sdk-figure is-flow">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-cyan"><div><strong>Взяли фигуру</strong><span>Запоминаем выбранную фигуру</span></div></div>
    <div class="sdk-figure__item tone-violet"><div><strong>Двигаем</strong><span>Подсвечиваем клетки под ней</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>Отпустили</strong><span>Отправляем запрос на ход</span></div></div>
  </div>
</figure>

Чтобы передавать ввод в FSM в другой игре, можно подключить `DragInputBridgeComponent`. В его настройках укажем `eventType`. Компонент отправит это событие с координатами при начале, движении и завершении жеста.
