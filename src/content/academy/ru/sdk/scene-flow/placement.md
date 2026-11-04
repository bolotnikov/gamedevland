---
{
  "locale": "ru",
  "translationKey": "sdk/scene-flow/placement",
  "course": "sdk",
  "lesson": "scene-flow",
  "draft": true,
  "order": 9,
  "title": "Один ход от запроса до результата",
  "concept": "Полный поток",
  "description": "Проследим состояние FSM, команду, изменение поля и события экрана.",
  "takeaway": [
    "Сервис применяет ход один раз и публикует результат.",
    "Представление использует снимки и события для отображения промежуточных состояний."
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

В методе `place` файла [BlockPuzzleGameplayService.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/services/BlockPuzzleGameplayService.ts#L112) порядок такой:

1. Проверить наличие фигуры и допустимость размещения.
2. Записать клетки, использовать слот и найти заполненные линии.
3. Сохранить снимок до очистки, очистить линии и сохранить снимок после.
4. Рассчитать очки, при необходимости выдать новые фигуры.
5. Отправить PlacementCompleted и события представлению.

Снимки до и после очистки нужны, чтобы анимация могла показать промежуточный результат, хотя доменное поле уже обновлено. Анимация не должна заново решать, какие клетки очищать.

## Что происходит с FSM

PlaceBlockCommand выполняется, пока состояние ещё `playing`. Событие результата ждёт в очереди. После команды FSM устанавливает `resolvingPlacement`, затем обрабатывает PlacementCompleted и входит в `checkingMoves`. Entry-команда проверяет доступные ходы.

При неверном размещении сервис отправляет PlacementRejected, и FSM возвращается в `playing`. Поле и очки не меняются. Ниже можно сравнить обе ветки и проследить порядок по стадиям.
