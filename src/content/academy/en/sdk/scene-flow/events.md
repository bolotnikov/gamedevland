---
{
  "locale": "en",
  "translationKey": "sdk/scene-flow/events",
  "course": "sdk",
  "lesson": "scene-flow",
  "draft": false,
  "order": 7,
  "title": "Events and EventBus",
  "concept": "EventBus",
  "description": "The sender announces a change, and subscribers decide how to respond.",
  "takeaway": [
    "Send the data in data and read it from event.payload."
  ],
  "sources": [
    {
      "title": "SDK · types.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/events/types.ts",
      "note": "Input data and the payload seen by subscribers."
    },
    {
      "title": "SDK · EventBus.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/events/EventBus.ts",
      "note": "Synchronous delivery, unsubscribing, and Promise handling."
    },
    {
      "title": "SDK · EngineEventBridge.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/core/EngineEventBridge.ts",
      "note": "Delivering events to the active FSM."
    }
  ]
}
---

<aside class="lesson-note is-green" aria-labelledby="lesson-purpose">
  <h3 id="lesson-purpose">Why this matters</h3>
  <p>A score display, a sound, and a visual effect can all respond to the same change. An event notifies every subscriber so the sender can make a single call.</p>
</aside>

`EventBus` connects services, components, and the FSM through events. When the score changes, the service sends `ScoreChanged`. The text node can respond on its own.

The service sends the event as shown below. [BlockPuzzleGameplayService.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/services/BlockPuzzleGameplayService.ts#L222)

```ts
this.sceneContext.engine.events.emit({
  type: BlockPuzzleEvents.ScoreChanged,
  data: { score: this.getSession().score, delta },
});
```

The public `emit` method takes **data**. The subscriber receives an `AppEvent` with the same data in **payload**. Here is a shortened handler. [BlockPuzzleScoreComponent.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/components/BlockPuzzleScoreComponent.ts#L58)

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

The example combines subscribing and updating the text. The original component puts them in separate methods. Save the `off` function and call it when disabling the component.

<figure class="sdk-figure is-flow"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">01</span><div><strong>Sender</strong><span>emit({ type, data })</span></div></div><div class="sdk-figure__item tone-violet"><span class="sdk-figure__index">02</span><div><strong>EventBus</strong><span>Moves data to payload</span></div></div><div class="sdk-figure__item tone-green"><span class="sdk-figure__index">03</span><div><strong>Subscriber</strong><span>AppEvent → decoder → action</span></div></div><div class="sdk-figure__item tone-amber"><span class="sdk-figure__index">04</span><div><strong>FSM</strong><span>EngineEventBridge queues the event in the active FSM</span></div></div></div><figcaption>The bus changes the event wrapper. Validate the payload separately.</figcaption></figure>

`on` subscribes to one event type, and `onAny` subscribes to all events. Both return a function that unsubscribes.

`emit` continues while asynchronous handlers finish. Use FSM commands when execution order matters.
