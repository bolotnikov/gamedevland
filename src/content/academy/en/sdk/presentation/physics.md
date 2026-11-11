---
{
  "locale": "en",
  "translationKey": "sdk/presentation/physics",
  "course": "sdk",
  "lesson": "presentation",
  "draft": false,
  "order": 14,
  "title": "Physics of a falling ball",
  "concept": "PhysicsManager",
  "description": "Calculate the ball’s position after one step.",
  "takeaway": [
    "The calculated coordinates can be passed to the sprite."
  ],
  "sources": [
    {
      "title": "SDK · PhysicsWorld.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/physics/PhysicsWorld.ts",
      "note": "Bodies, simulation steps, controls, and collisions."
    },
    {
      "title": "SDK · PhysicsSceneService.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/physics/PhysicsSceneService.ts",
      "note": "Fixed steps and the lifetime of the world."
    },
    {
      "title": "SDK · types.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/physics/types.ts",
      "note": "Snapshots and integration settings."
    }
  ]
}
---

<aside class="lesson-note" aria-labelledby="physics-body"><span class="lesson-note__label">Term</span><h3 id="physics-body">Physics body</h3><p>An object used to calculate movement and collisions. For example, a circle can be displayed as a ball sprite.</p></aside>


For built-in 2D physics, import `MatterPhysicsModule` from `@gamedevland/engine/physics` and register it through `system.modules: [new MatterPhysicsModule()]`. The renderer does not register physics itself.

Create a world and add a circular body. `world.step(1 / 60)` simulates one sixtieth of a second. `snapshots` contains the new coordinates. In a scene, `PhysicsSceneService` can update the world.

```ts
import { PhysicsServices } from '@gamedevland/engine/physics';

const manager = engine.di.get(PhysicsServices.Manager);
const world = manager.createWorld({ worldId: 'demo', config: {} });
world.setBounds({ x: 0, y: 0, width: 540, height: 960 });
const ball = world.addCircleBody({
  bodyId: 'ball', x: 270, y: 100, radius: 20,
});
const snapshots = world.step(1 / 60);
manager.disposeWorld('demo');
```

<figure class="sdk-figure is-flow">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-cyan"><div><strong>Body</strong><span>A circle with a fixed radius</span></div></div>
    <div class="sdk-figure__item tone-violet"><div><strong>world.step</strong><span>Calculate the motion</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>Sprite</strong><span>Show the ball at its new position</span></div></div>
  </div>
</figure>
