---
{
  "locale": "ru",
  "translationKey": "sdk/presentation/actions",
  "course": "sdk",
  "lesson": "presentation",
  "draft": false,
  "order": 6,
  "title": "Как запустить действие",
  "concept": "BaseAction",
  "description": "Вызовем эффект для очищенной клетки.",
  "takeaway": [
    "В JSON задаём действие, в коде вызываем его по имени."
  ],
  "sources": [
    {
      "title": "SDK · BaseAction.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/actions/BaseAction.ts",
      "note": "Запуск, cancel и очистка."
    },
    {
      "title": "SDK · NodeActions.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/nodes/internal/NodeActions.ts",
      "note": "Именной runAction и cancelAction."
    },
    {
      "title": "Block Puzzle · BlockPuzzleBoardEffectsComponent.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/components/BlockPuzzleBoardEffectsComponent.ts",
      "note": "Вызов эффекта по клеткам."
    }
  ]
}
---

<aside class="lesson-note" aria-labelledby="action-term"><span class="lesson-note__label">Термин</span><h3 id="action-term">Действие узла</h3><p>Эффект, который запускаем по имени. Например, вспышка при очистке клетки.</p></aside>

В `layout.json` эффект записан под именем `lineClearBurst`. Когда клетка очищается, компонент вызывает `runAction` и передаёт координаты клетки. [layout.json](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/assets/json/layouts/scenes/game/layout.json) · [BlockPuzzleBoardEffectsComponent.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/components/BlockPuzzleBoardEffectsComponent.ts)

```ts
this.trackTask(
  this.node.runAction(this.config.actionId, {
    position: this.cellPosition(cell.row, cell.column),
  }),
);
```

<figure class="sdk-figure is-flow">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-cyan"><div><strong>LinesCleared</strong><span>Линия очищена</span></div></div>
    <div class="sdk-figure__item tone-violet"><div><strong>runAction</strong><span>Передаём имя действия и координаты</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>PlayParticlesAction</strong><span>На клетке появляются частицы</span></div></div>
  </div>
</figure>
