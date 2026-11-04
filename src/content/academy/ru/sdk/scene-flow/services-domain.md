---
{
  "locale": "ru",
  "translationKey": "sdk/scene-flow/services-domain",
  "course": "sdk",
  "lesson": "scene-flow",
  "draft": true,
  "order": 5,
  "title": "Состояние партии и правила игры",
  "concept": "Сервис и домен",
  "description": "Сервис хранит текущую партию, доменные классы проверяют её правила.",
  "takeaway": [
    "Сервис организует операцию над состоянием.",
    "Домен проверяет правила, а представление показывает результат."
  ],
  "sources": [
    {
      "title": "SDK · BaseSceneService.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/scenes/BaseSceneService.ts",
      "note": "Доступность контекста сервиса."
    },
    {
      "title": "Block Puzzle · BlockPuzzleGameplayService.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/services/BlockPuzzleGameplayService.ts",
      "note": "Сессия, preview и применение хода."
    },
    {
      "title": "Block Puzzle · BlockPuzzleBoard.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/domain/BlockPuzzleBoard.ts",
      "note": "Правила поля без зависимости от PixiJS."
    }
  ]
}
---

<aside class="lesson-note is-green" aria-labelledby="lesson-purpose">
  <h3 id="lesson-purpose">Зачем это нужно</h3>
  <p>Правила игры должны работать независимо от экрана. Отделим их от работы со сценой, чтобы менять представление без переписывания правил.</p>
</aside>

`BaseSceneService` предоставляет контекст активной сцены. В Block Puzzle сервис Gameplay хранит текущую сессию: поле, доступные фигуры, очки и признак завершения.

<aside class="lesson-note" aria-labelledby="domain-model"><span class="lesson-note__label">Термин</span><h3 id="domain-model">Доменная модель</h3><p>Классы с правилами предметной области. Для Block Puzzle это размещение фигур, заполнение линий и расчёт очков.</p></aside>

Сервис объединяет несколько операций. Фрагмент метода `place` из [BlockPuzzleGameplayService.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/services/BlockPuzzleGameplayService.ts#L124):

```ts
const placedCells = session.board.place(shape, request.anchor);
session.slots.use(request.slotId);
const completedLines = session.board.findCompletedLines();
const clearedCells = session.board.collectCells(completedLines);
const boardBeforeClear = session.board.snapshot();
session.board.clear(clearedCells);
const boardAfterClear = session.board.snapshot();
```

До этого сервис проверяет наличие фигуры и `board.canPlace`. После — рассчитывает очки, пополняет слоты и отправляет события представлению.

<figure class="sdk-figure is-matrix"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>GameplayService</strong><span>Состояние партии и порядок операций</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>BlockPuzzleBoard</strong><span>Клетки, допустимость размещения и линии</span></div></div><div class="sdk-figure__item tone-green"><div><strong>BlockPuzzleSlots</strong><span>Какие фигуры доступны и какие использованы</span></div></div><div class="sdk-figure__item tone-amber"><div><strong>BlockPuzzleScoreRules</strong><span>Число очков за размещение и очистку</span></div></div><div class="sdk-figure__item tone-cyan"><div><strong>Компоненты</strong><span>Отображение результата и эффекты</span></div></div></div><figcaption>Каждый объект отвечает за свою часть одного хода.</figcaption></figure>

Контекст `sceneContext` доступен между входом и выходом сервиса. `sceneLayout` и `sceneDi` — готовые фасады. Доменным классам этот контекст не нужен: Board получает размеры, а ScoreRules — коэффициенты из конфигурации.

Запрос `previewPlacement` получает прогноз и не применяет ход. Метод `place` меняет состояние. Такое разделение позволяет подсвечивать размещение при движении указателя, не изменяя само поле.

При выходе Gameplay очищает ссылку на сессию. Глобальный рекорд при этом сохраняется через отдельный сервис прогресса.
