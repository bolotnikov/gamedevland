---
{
  "locale": "en",
  "translationKey": "sdk/scene-flow/scene-di",
  "course": "sdk",
  "lesson": "scene-flow",
  "draft": false,
  "order": 5,
  "title": "Scene dependencies and Scene DI",
  "concept": "SceneDiDefinition",
  "description": "Specify how to create a service and when to start it.",
  "takeaway": [
    "A scene service can use shared game dependencies."
  ],
  "sources": [
    {
      "title": "SDK · SceneDiDefinition.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/di/SceneDiDefinition.ts",
      "note": "Separate providers and services lists."
    },
    {
      "title": "SDK · SceneServiceHost.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/scenes/SceneServiceHost.ts",
      "note": "Calling lifecycle hooks on registered services."
    },
    {
      "title": "Block Puzzle · scene.di.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/configs/scene.di.ts",
      "note": "Geometry without lifecycle hooks and active scene services."
    }
  ]
}
---

<aside class="lesson-note is-green" aria-labelledby="lesson-purpose">
  <h3 id="lesson-purpose">Why this matters</h3>
  <p>Objects for the current session are needed until the scene closes. Shared services keep running across scene transitions. Separate their lifetimes so a new scene starts with its own state.</p>
</aside>

`SceneDiDefinition` describes the dependencies for one scene. Its key must match the key in `scenes.map`.

`GameSceneDi` has two separate lists. Here is a shortened example for one service. [scene.di.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/configs/scene.di.ts)

```ts
protected override registerProviders(registrar: ValuesGroupRegistrar): void {
  registrar.singletonClass(BlockPuzzleServices.Audio, BlockPuzzleAudioService);
}

protected override registerServices(services: SceneServiceTokenRegistry): void {
  services.add(BlockPuzzleServices.Audio);
}
```

`registerProviders` specifies how to create the service. In `registerServices`, list the services whose entry and exit methods the SDK should call.

<figure class="sdk-figure is-tree"><div class="sdk-scope"><div class="sdk-scope__global"><span>Shared across the game</span><strong>Global DI</strong><p>Systems · progress · behavior factories</p></div><div class="sdk-scope__scenes"><div><span>boot scene</span><strong>Loading</strong></div><div><span>game scene</span><strong>Gameplay · Geometry · Audio</strong></div></div></div><figcaption>The child container looks for a local registration first, then asks its parent.</figcaption></figure>

`Geometry` only calculates coordinates. We can request it by token even when it is absent from `registerServices`.

`GameDiDefinition` combines the registrations for the game and its scenes. The SDK checks the scene keys and verifies that each service has a registration.
