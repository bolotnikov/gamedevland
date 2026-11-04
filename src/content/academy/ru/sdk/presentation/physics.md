---
{
  "locale": "ru",
  "translationKey": "sdk/presentation/physics",
  "course": "sdk",
  "lesson": "presentation",
  "draft": true,
  "order": 14,
  "title": "Физический мир и его представление",
  "concept": "PhysicsManager",
  "description": "Расчёт движения отделён от узлов, которые показывают результат.",
  "takeaway": [
    "Физика рассчитывает состояние; компонент обновляет изображение.",
    "У мира один владелец обновления и очистки."
  ],
  "sources": [
    {
      "title": "SDK · PhysicsWorld.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/physics/PhysicsWorld.ts",
      "note": "Тела, шаг, управление и столкновения."
    },
    {
      "title": "SDK · PhysicsSceneService.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/physics/PhysicsSceneService.ts",
      "note": "Фиксированный шаг и lifecycle мира."
    },
    {
      "title": "SDK · types.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/physics/types.ts",
      "note": "Snapshots и параметры интеграции."
    }
  ]
}
---

В Block Puzzle физика не нужна: фигуры размещаются по клеткам. SDK также предоставляет `PhysicsManager` для игр с движением и столкновениями. Рассмотрим простой пример с падающим шаром.

Создадим физический мир, зададим границы и добавим шар. Пустой `config` включает стандартные настройки:

```ts
const manager = new PhysicsManager();
const world = manager.createWorld({ worldId: 'demo', config: {} });
world.setBounds({ x: 0, y: 0, width: 540, height: 960 });
const ball = world.addCircleBody({
  bodyId: 'ball', x: 270, y: 100, radius: 20,
});
const snapshots = world.step(1 / 60);
manager.disposeWorld('demo');
```

Фрагмент требует импорт `PhysicsManager` из `@gamedevland/engine/physics`. Он показывает API без рендера. `ball` — handle тела, `snapshots` — рассчитанные положения после одного шага.

<figure class="sdk-figure is-layers"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>PhysicsWorld</strong><span>Тела, материалы, границы, столкновения</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>Шаг расчёта</strong><span>dt в секундах → новые координаты и углы</span></div></div><div class="sdk-figure__item tone-green"><div><strong>PhysicsBodySnapshot</strong><span>bodyId, x, y, angleRad и параметры движения</span></div></div><div class="sdk-figure__item tone-amber"><div><strong>Компонент представления</strong><span>Обновляет свой узел по результату расчёта</span></div></div></div><figcaption>Тело и Sprite связаны игровым кодом по ID, а не являются одним объектом.</figcaption></figure>

Доступны прямоугольники, круги, полигоны и составные тела. Методы управляют скоростью, силой, импульсом, положением, статичностью и сном. `onCollision` возвращает отписку. События collisionStart и collisionActive содержат пары ID тел.

## Подключение к сцене

Для реальной сцены используем `PhysicsSceneService`, зарегистрированный провайдером и lifecycle-сервисом. Он создаёт мир на входе, обновляет в фазе `physics` и удаляет на выходе. Через `resolveBounds`, `onWorldReady` и `onWorldStep` подключаются границы, тела и обработка snapshots.

Сервис использует фиксированный шаг 1/60 секунды и ограничивает число догоняющих шагов до шести за обновление. Это защита от неограниченной работы после длинного кадра, а не гарантия одинакового результата при любых условиях исполнения. Не вызываем дополнительный `world.step` параллельно этому сервису.
