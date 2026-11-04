---
{
  "locale": "ru",
  "translationKey": "sdk/scene-flow/fsm",
  "course": "sdk",
  "lesson": "scene-flow",
  "draft": true,
  "order": 7,
  "title": "Описываем состояния сцены",
  "concept": "FSM",
  "description": "Состояние определяет, какие события сейчас обрабатываются и какие команды запускаются.",
  "takeaway": [
    "actions → target → entry — порядок перехода SDK.",
    "Событие сервиса обрабатывается после текущего перехода."
  ],
  "sources": [
    {
      "title": "SDK · types.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/fsm/types.ts",
      "note": "Доступные поля FSMConfig."
    },
    {
      "title": "SDK · SceneFSM.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/fsm/SceneFSM.ts",
      "note": "Actions перед target, очередь и entry."
    },
    {
      "title": "Block Puzzle · fsm.config.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/configs/fsm.config.ts",
      "note": "Состояния исходной игры."
    }
  ]
}
---

<aside class="lesson-note is-green" aria-labelledby="lesson-purpose">
  <h3 id="lesson-purpose">Зачем это нужно</h3>
  <p>Доступные действия зависят от текущего состояния игры. Опишем состояния и переходы в одном месте, чтобы порядок игрового процесса был виден без поиска разрозненных проверок.</p>
</aside>

`SceneFSM` хранит текущее состояние и правила переходов. В `FSMConfig` есть начальное состояние, карта `states`, команды входа `entry` и обработчики событий `on`.

<aside class="lesson-note" aria-labelledby="fsm-term"><span class="lesson-note__label">Термин</span><h3 id="fsm-term">Конечный автомат (FSM)</h3><p>Описание поведения через конечный набор состояний и переходов по событиям. Одновременно активно одно состояние.</p></aside>

Фрагмент [fsm.config.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/configs/fsm.config.ts#L29):

```ts
playing: {
  on: {
    [BlockPuzzleEvents.PlacementRequested]: {
      target: 'resolvingPlacement',
      actions: ['PlaceBlockCommand'],
    },
    [BlockPuzzleEvents.RestartRequested]: {
      actions: ['RestartBlockPuzzleCommand'],
    },
  },
},
```

<figure class="sdk-figure is-flow"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">01</span><div><strong>playing</strong><span>Принимает PlacementRequested</span></div></div><div class="sdk-figure__item tone-violet"><span class="sdk-figure__index">02</span><div><strong>resolvingPlacement</strong><span>Ожидает событие результата</span></div></div><div class="sdk-figure__item tone-green"><span class="sdk-figure__index">03</span><div><strong>checkingMoves</strong><span>При входе запускает CheckBlockPuzzleMovesCommand</span></div></div><div class="sdk-figure__item tone-amber"><span class="sdk-figure__index">04</span><div><strong>playing или ended</strong><span>MovesAvailable продолжает игру; GameOver завершает её</span></div></div></div><figcaption>Основная ветка успешного хода. Отклонённое размещение возвращает resolvingPlacement → playing.</figcaption></figure>

Если событие не объявлено в текущем `on`, FSM его игнорирует. Если у правила есть `actions`, но нет `target`, команды выполняются без смены состояния. Именно так устроен RestartRequested.

## Порядок перехода

В этом SDK сначала последовательно выполняются `actions`. Затем устанавливается `target`, после чего выполняется `entry` нового состояния. Поэтому внутри PlaceBlockCommand текущим состоянием ещё будет `playing`.

События, отправленные командой, попадают в очередь FSM. Они обрабатываются после завершения текущего перехода и уже видят новое состояние. Это позволяет сервису отправить PlacementCompleted прямо во время выполнения команды.

`FsmDrivenScene` отправляет SceneReady после подготовки сцены и SceneTick при обновлении. Дополнительные `exit`, guards и иерархические состояния не входят в показанный FSMConfig — при проектировании используем фактически доступный контракт.
