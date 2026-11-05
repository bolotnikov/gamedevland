---
{
  "locale": "ru",
  "translationKey": "sdk/scene-flow/runtime",
  "course": "sdk",
  "lesson": "scene-flow",
  "draft": false,
  "order": 12,
  "title": "Обновление и пауза игры",
  "concept": "Системы исполнения",
  "description": "Посмотрим, что SDK обновляет за кадр и как ставит игру на паузу.",
  "takeaway": [
    "Игра продолжится, когда исчезнут все причины паузы."
  ],
  "sources": [
    {
      "title": "SDK · RuntimeSystemPhase.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/runtime/RuntimeSystemPhase.ts",
      "note": "Порядок фаз обновления."
    },
    {
      "title": "SDK · EnginePauseController.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/core/runtime/EnginePauseController.ts",
      "note": "Объединение причин паузы."
    },
    {
      "title": "SDK · RuntimeActivity.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/core/runtime/RuntimeActivity.ts",
      "note": "Наблюдаемое состояние активности."
    },
    {
      "title": "SDK · SceneService.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/scenes/SceneService.ts",
      "note": "Контракт обновления сервиса."
    }
  ]
}
---

SDK обновляет вёрстку, сервисы сцены, физику, частицы и твины в заданном порядке. Игровой код подключается к обновлению через методы компонентов и сервисов.

<figure class="sdk-figure is-flow is-long"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">01</span><div><strong>layout</strong><span>Обновление узлов и включённых компонентов</span></div></div><div class="sdk-figure__item tone-violet"><span class="sdk-figure__index">02</span><div><strong>scene</strong><span>Сервисы сцены; FsmDrivenScene отправляет SceneTick</span></div></div><div class="sdk-figure__item tone-green"><span class="sdk-figure__index">03</span><div><strong>physics</strong><span>Сервисы физической фазы</span></div></div><div class="sdk-figure__item tone-amber"><span class="sdk-figure__index">04</span><div><strong>particles</strong><span>Обновление частиц</span></div></div><div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">05</span><div><strong>tweens</strong><span>Обновление анимаций движка</span></div></div></div><figcaption>Один кадр стандартного scheduler. dt в хуках сцены и компонентов передаётся в секундах.</figcaption></figure>

У компонентов метод обновления — `onUpdate(dt)`, у сервисов сцены — `onSceneTick(ctx)`. Сервис с `tickPhase: 'physics'` обновляется на этапе физики.

## Причины паузы

Пауза может происходить из-за неактивной страницы, ручного действия, платформы или рекламы. Итоговая пауза сохраняется, пока активна хотя бы одна причина. Завершение рекламы не должно возобновлять игру, если вкладка всё ещё неактивна.

`TweenManager.delayMs` останавливает отсчёт на время игровой паузы.

Чтобы узнать, приостановлена ли игра, прочитаем состояние активности:

```ts
const snapshot = this.node.engine.activity.getSnapshot();
const paused = snapshot.effectivePaused;
```

`activity.subscribe(handler)` сообщает о смене паузы. Метод возвращает функцию отписки.
