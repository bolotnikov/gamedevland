---
{
  "locale": "en",
  "translationKey": "sdk/scene-flow/providers",
  "course": "sdk",
  "lesson": "scene-flow",
  "draft": false,
  "order": 4,
  "title": "DI providers and object lifetimes",
  "concept": "Providers and lifetimes",
  "description": "Decide when to create an object and when to reuse it.",
  "takeaway": [
    "A singleton keeps the object it creates. A transient creates a new object for each request."
  ],
  "sources": [
    {
      "title": "SDK · ValuesGroupRegistrar.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/di/ValuesGroupRegistrar.ts",
      "note": "Registration methods."
    },
    {
      "title": "SDK · DiContainer.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/di/DiContainer.ts",
      "note": "Singleton caching in the container that owns the provider and override rules."
    },
    {
      "title": "Block Puzzle · di.providers.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/config/di.providers.ts",
      "note": "Registration of four categories in the game."
    }
  ]
}
---

<aside class="lesson-note is-green" aria-labelledby="lesson-purpose">
  <h3 id="lesson-purpose">Why this matters</h3>
  <p>Some objects can be created once and shared across the game. Others need a new instance for each request. We choose the appropriate lifetime when registering them in the DI container.</p>
</aside>

For each object, we add a rule called a **provider** to the DI container. It specifies the token and how to get the object. The container can return a supplied value, instantiate a class, or call a factory. Registration also determines whether the container keeps the object for later requests or creates a new one each time.

For example, the game can share one progress service. If there are two counters on screen, each needs its own component to control its text.

<figure class="sdk-figure is-matrix"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>singletonValue</strong><span>Returns an existing value</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>singletonClass</strong><span>Creates an object from a class once</span></div></div><div class="sdk-figure__item tone-green"><div><strong>singletonFactory</strong><span>Calls the factory once</span></div></div><div class="sdk-figure__item tone-amber"><div><strong>transientClass</strong><span>Creates an object from a class for each request</span></div></div></div><figcaption>A singleton keeps the object. A transient creates a new one.</figcaption></figure>

Here is the shortened component registration. [di.providers.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/config/di.providers.ts#L59)

```ts
group.add('BlockPuzzleScoreComponent', BlockPuzzleScoreComponent);
```

Register the component in `ComponentsGroup` under the same name as `type` in the JSON. A node is an element on screen, such as the text in a counter. If we attach the component to two text nodes, the SDK creates a separate component object for each.

A singleton registered globally is shared across the game. A singleton registered in a scene container is recreated each time the scene opens.
