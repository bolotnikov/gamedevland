---
{
  "locale": "ru",
  "translationKey": "sdk/scene-flow/services-domain",
  "course": "sdk",
  "lesson": "scene-flow",
  "draft": false,
  "order": 6,
  "title": "Сервисы сцены и правила игры",
  "concept": "Сервис и правила игры",
  "description": "Храним партию в сервисе, а правила игры описываем отдельно.",
  "takeaway": [
    "Сервис ведёт партию, правила игры определяют результат хода."
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

В Block Puzzle сервис `Gameplay` хранит поле, доступные фигуры, очки и состояние партии.

<aside class="lesson-note" aria-labelledby="domain-model"><span class="lesson-note__label">Термин</span><h3 id="domain-model">Доменная модель</h3><p>Код с правилами игры. В Block Puzzle он определяет, куда можно поставить фигуру, какие линии очистить и сколько очков начислить.</p></aside>

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

`previewPlacement` проверяет, поместится ли фигура. Поле меняется только при вызове `place`.
