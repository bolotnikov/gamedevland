---
{
  "locale": "ru",
  "translationKey": "sdk/scene-flow/runtime",
  "course": "sdk",
  "lesson": "scene-flow",
  "draft": true,
  "order": 11,
  "title": "Обновление и пауза игры",
  "concept": "Системы исполнения",
  "description": "Движок задаёт порядок обновления и объединяет причины паузы.",
  "takeaway": [
    "Обновление имеет явный порядок и единицы dt.",
    "Игра возобновляется только после снятия всех причин паузы."
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

`BaseComponent.onUpdate(dt)` подходит для поведения конкретного узла. `SceneService.onSceneTick(ctx)` — для сценового сервиса, подключённого через lifecycle-список DI. У сервиса можно указать `tickPhase: 'physics'`; это не меняет длительность кадра само по себе.

## Причины паузы

Пауза может происходить из-за неактивной страницы, ручного действия, платформы или рекламы. Итоговая пауза сохраняется, пока активна хотя бы одна причина. Завершение рекламы не должно возобновлять игру, если вкладка всё ещё неактивна.

Движок согласует остановку scheduler, сцен, твинов и звука. `TweenManager.delayMs` учитывает игровую паузу; браузерный `setTimeout` не заменяет его для игровой задержки.

Чтобы узнать, приостановлена ли игра, прочитаем состояние активности:

```ts
const snapshot = this.node.engine.activity.getSnapshot();
const paused = snapshot.effectivePaused;
```

`activity.subscribe(handler)` возвращает отписку и позволяет реагировать даже тогда, когда сценовый ticker приостановлен. Подписку снимает её владелец. У конкретного Engine есть `setPaused` и `isPaused`; не следует добавлять приведения типа только для обхода более узкого контракта SceneRuntime.
