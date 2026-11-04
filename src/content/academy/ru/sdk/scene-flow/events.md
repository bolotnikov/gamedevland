---
{
  "locale": "ru",
  "translationKey": "sdk/scene-flow/events",
  "course": "sdk",
  "lesson": "scene-flow",
  "draft": true,
  "order": 6,
  "title": "Передаём события",
  "concept": "EventBus",
  "description": "Отправитель сообщает факт, а подписчики выбирают свою реакцию.",
  "takeaway": [
    "emit получает data; подписчик читает payload.",
    "Подписка имеет владельца и явную отписку."
  ],
  "sources": [
    {
      "title": "SDK · types.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/events/types.ts",
      "note": "data на входе и payload у подписчиков."
    },
    {
      "title": "SDK · EventBus.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/events/EventBus.ts",
      "note": "Синхронная доставка, отписка и отсутствие await Promise."
    },
    {
      "title": "SDK · EngineEventBridge.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/core/EngineEventBridge.ts",
      "note": "Доставка событий в активную FSM."
    }
  ]
}
---

<aside class="lesson-note is-green" aria-labelledby="lesson-purpose">
  <h3 id="lesson-purpose">Зачем это нужно</h3>
  <p>На одно изменение игры могут реагировать счётчик, звук и визуальные эффекты. Событие сообщает об изменении всем подписчикам, а отправителю не нужно обращаться к каждому из них напрямую.</p>
</aside>

`EventBus` связывает сервисы, компоненты и FSM через события. После изменения очков сервис не ищет Text-узел: он отправляет `ScoreChanged`.

Фрагмент отправки события из [BlockPuzzleGameplayService.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/services/BlockPuzzleGameplayService.ts#L222):

```ts
this.sceneContext.engine.events.emit({
  type: BlockPuzzleEvents.ScoreChanged,
  data: { score: this.getSession().score, delta },
});
```

Публичный метод `emit` принимает **data**. Подписчик получает `AppEvent`, где те же данные находятся в **payload**. Сократим обработчик из [BlockPuzzleScoreComponent.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/components/BlockPuzzleScoreComponent.ts#L58):

```ts
const off = this.node.events.on(BlockPuzzleEvents.ScoreChanged, (event) => {
  const payload = SchemaDecoder.decode(
    event.payload,
    BlockPuzzleEventSchemas.ScoreChanged,
    BlockPuzzleEvents.ScoreChanged,
  );
  this.node.setText(String(payload.score));
});
```

Подписка и обновление текста объединены для примера; в исходном компоненте это разные методы. Функцию `off` нужно сохранить и вызвать при отключении компонента.

<figure class="sdk-figure is-flow"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">01</span><div><strong>Отправитель</strong><span>emit({ type, data })</span></div></div><div class="sdk-figure__item tone-violet"><span class="sdk-figure__index">02</span><div><strong>EventBus</strong><span>Преобразует data → payload</span></div></div><div class="sdk-figure__item tone-green"><span class="sdk-figure__index">03</span><div><strong>Подписчик</strong><span>AppEvent → декодер → действие</span></div></div><div class="sdk-figure__item tone-amber"><span class="sdk-figure__index">04</span><div><strong>FSM</strong><span>EngineEventBridge ставит событие в очередь активной FSM</span></div></div></div><figcaption>Шина меняет оболочку события; сама полезная нагрузка не становится проверенной автоматически.</figcaption></figure>

`on(type, handler)` подписывает на конкретное событие, `onAny(handler)` — на все. Оба возвращают функцию отписки. Возврат Promise из подписчика не превращает `emit` в ожидаемую транзакцию: `emit` возвращает `void`.

Синхронные исключения подписчиков EventBus перехватывает. Promise подписчика он не ожидает; отклонение нельзя считать автоматически обработанным. Для последовательного сценария используем команды FSM, а для асинхронной подписки явно обрабатываем результат.

Имя события описывает запрос или факт. `PlacementRequested` ещё не подтверждает ход; `PlacementCompleted` означает, что сервис применил изменения.
