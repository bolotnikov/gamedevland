---
{
  "locale": "ru",
  "translationKey": "sdk/presentation/actions",
  "course": "sdk",
  "lesson": "presentation",
  "draft": true,
  "order": 6,
  "title": "Действие запускается явно",
  "concept": "BaseAction",
  "description": "Именованное действие выполняет эффект на конкретном узле.",
  "takeaway": [
    "Действие выполняет локальный эффект; команда выполняет шаг сценария.",
    "Config действия и вход конкретного запуска разделены."
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

<aside class="lesson-note is-green" aria-labelledby="lesson-purpose">
  <h3 id="lesson-purpose">Зачем это нужно</h3>
  <p>Визуальный эффект нужен в конкретный момент и может повторяться на разных узлах. Вынесем его в отдельное действие, которое можно настроить и вызвать по имени.</p>
</aside>

Действие узла — операция, которую можно запустить по имени. В отличие от включённого компонента оно не получает постоянный onUpdate.

В Block Puzzle компонент эффектов слушает LinesCleared и запускает действие `lineClearBurst` для каждой очищенной клетки. Сам эффект задан в [layout.json](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/assets/json/layouts/scenes/game/layout.json):

```json
"actions": {
  "lineClearBurst": {
    "type": "PlayParticlesAction",
    "data": {
      "presetAssetId": "json/configs/scenes/game/line-clear-particles.json",
      "space": "local"
    }
  }
}
```

<figure class="sdk-figure is-flow"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">01</span><div><strong>LinesCleared</strong><span>Событие содержит очищенные клетки</span></div></div><div class="sdk-figure__item tone-violet"><span class="sdk-figure__index">02</span><div><strong>Компонент эффектов</strong><span>Вычисляет локальную позицию каждой клетки</span></div></div><div class="sdk-figure__item tone-green"><span class="sdk-figure__index">03</span><div><strong>lineClearBurst</strong><span>ID действия, прикреплённого к узлу effects</span></div></div><div class="sdk-figure__item tone-amber"><span class="sdk-figure__index">04</span><div><strong>PlayParticlesAction</strong><span>Тип поведения, который создаёт частицы</span></div></div></div><figcaption>ID экземпляра действия и его тип решают разные задачи.</figcaption></figure>

Запуск экземпляра в методе `playLineClear` из [BlockPuzzleBoardEffectsComponent.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/components/BlockPuzzleBoardEffectsComponent.ts#L54):

```ts
this.trackTask(
  this.node.runAction(this.config.actionId, {
    position: this.cellPosition(cell.row, cell.column),
  }),
);
```

`actionId` берётся из настроек компонента. Пресет задан в JSON, а позиция эффекта передаётся при запуске.

## Действие и команда

Действие принадлежит узлу и выполняет локальный эффект. Команда принадлежит сценарию FSM и вызывает операцию сервиса. Совпадение английского слова `actions` в FSM не меняет этого: `FSMConfig.actions` содержит имена **команд**, а `ElementConfig.actions` — описания **действий узла**.

`runAction` возвращает Promise. `cancelAction(id)` отменяет активную область действия и owned-твины. Это не универсальная остановка любых сторонних операций: действие само должно корректно очищать своё специфичное состояние.
