---
{
  "locale": "ru",
  "translationKey": "sdk/presentation/physics",
  "course": "sdk",
  "lesson": "presentation",
  "draft": false,
  "order": 14,
  "title": "Физика падающего шара",
  "concept": "PhysicsManager",
  "description": "Рассчитаем положение шара после одного шага.",
  "takeaway": [
    "Координаты из результата расчёта можно передать спрайту."
  ],
  "sources": [
    {
      "title": "SDK · PhysicsWorld.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/physics/PhysicsWorld.ts",
      "note": "Тела, шаг, управление и столкновения."
    },
    {
      "title": "SDK · PhysicsSceneService.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/physics/PhysicsSceneService.ts",
      "note": "Фиксированный шаг и lifecycle мира."
    },
    {
      "title": "SDK · types.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/physics/types.ts",
      "note": "Snapshots и параметры интеграции."
    }
  ]
}
---

<aside class="lesson-note" aria-labelledby="physics-body"><span class="lesson-note__label">Термин</span><h3 id="physics-body">Физическое тело</h3><p>Объект для расчёта движения и столкновений. Например, круг, который можно показать на экране спрайтом шара.</p></aside>

Для встроенной 2D-физики подключим `MatterPhysicsModule` из `@gamedevland/engine/physics` через `system.modules: [new MatterPhysicsModule()]`. Renderer сам физику не подключает.

Создадим мир и добавим круглое тело. `world.step(1 / 60)` выполнит расчёт за одну шестидесятую секунды. В `snapshots` получим новые координаты. В сцене можно поручить обновление `PhysicsSceneService`.

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
    <div class="sdk-figure__item tone-cyan"><div><strong>Тело</strong><span>Круг с заданным радиусом</span></div></div>
    <div class="sdk-figure__item tone-violet"><div><strong>world.step</strong><span>Рассчитываем движение</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>Спрайт</strong><span>Показываем шар в новых координатах</span></div></div>
  </div>
</figure>
