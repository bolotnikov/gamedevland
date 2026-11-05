---
{
  "locale": "ru",
  "translationKey": "sdk/scene-flow/placement",
  "course": "sdk",
  "lesson": "scene-flow",
  "draft": false,
  "order": 10,
  "title": "FSM и команды на примере хода",
  "concept": "Полный поток",
  "description": "Проследим, что происходит после отпускания фигуры.",
  "takeaway": [
    "Сервис меняет поле, а экран показывает результат по событиям."
  ],
  "sources": [
    {
      "title": "Block Puzzle · BlockPuzzleGameplayService.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/services/BlockPuzzleGameplayService.ts",
      "note": "Порядок place и снимки результата."
    },
    {
      "title": "Block Puzzle · fsm.config.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/configs/fsm.config.ts",
      "note": "Переходы принятия и отклонения."
    },
    {
      "title": "SDK · SceneFSM.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/fsm/SceneFSM.ts",
      "note": "Очередь и выполнение команды до смены состояния."
    }
  ],
  "simulation": "sdk-placement"
}
---

Рассмотрим отпускание фигуры над допустимыми клетками. Компонент перетаскивания отправляет PlacementRequested с `slotId` и `anchor`. Далее управление переходит к [FSM игры](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/configs/fsm.config.ts).

<figure class="sdk-figure is-layers"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>Запрос</strong><span>DragComponent → PlacementRequested → PlaceBlockCommand</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>Проверка и запись</strong><span>Gameplay → Board / Slots / ScoreRules</span></div></div><div class="sdk-figure__item tone-green"><div><strong>Снимки результата</strong><span>boardBeforeClear, boardAfterClear, clearedCells, scoreDelta</span></div></div><div class="sdk-figure__item tone-amber"><div><strong>Экран</strong><span>BoardChanged, BlocksChanged, ScoreChanged и LinesCleared</span></div></div></div><figcaption>Команда меняет состояние игры через сервис. Экран реагирует на отдельные события результата.</figcaption></figure>

## Что происходит с FSM

`PlaceBlockCommand` выполняется в `playing`. Затем FSM переходит в `resolvingPlacement`, читает `PlacementCompleted` из очереди и в `checkingMoves` проверяет доступные ходы.

На схеме ниже разберём успешное размещение по шагам.
