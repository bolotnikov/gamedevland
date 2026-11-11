---
{
  "locale": "ru",
  "translationKey": "sdk/rendering/presentation-order",
  "course": "sdk",
  "lesson": "rendering",
  "draft": false,
  "order": 7,
  "title": "Обновление камеры, мира и UI",
  "concept": "onPresentation",
  "description": "Применим изменения после физики и анимаций.",
  "sources": [
    {
      "title": "SDK · BaseComponent.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/layouts/components/BaseComponent.ts",
      "note": "onPresentation, enabled и очистка подписки."
    },
    {
      "title": "SDK · PresentationScheduler.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/runtime/PresentationScheduler.ts",
      "note": "Порядок camera/world/ui и привязка к layout."
    }
  ]
}
---

Если камера обновляется до движения объекта, она может отстать на кадр. SDK выполняет `onPresentation` после физики и твинов, перед отрисовкой. Для связанных изменений зададим порядок `camera → world → ui`.

В компоненте Three-узла подключим изменение вида в `onReady`:

```ts
import { BaseComponent } from '@gamedevland/engine/layouts';
import { ThreeNode } from '@gamedevland/engine/renderers/three';

export class FollowPositionComponent extends BaseComponent<ThreeNode> {
  protected readonly nodeType = ThreeNode;

  protected override onReady(): void {
    const target = this.node.engine.getRequiredActiveLayout().requireNode('world.target', ThreeNode);
    this.onPresentation(() => {
      this.node.setPosition(target.view.position);
    }, { phase: 'world' });
  }
}
```

Здесь оба узла находятся в одной группе: копируем локальную позицию `world.target`. Для камеры используем фазу `camera`, для надписей поверх мира — `ui`.

<figure class="sdk-figure is-flow"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>camera</strong><span>Обновляем камеру</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>world</strong><span>Применяем вид объектов</span></div></div><div class="sdk-figure__item tone-green"><div><strong>ui</strong><span>Обновляем интерфейс</span></div></div></div><figcaption>Затем SDK рисует кадр.</figcaption></figure>

Подписка привязана к layout и сроку жизни компонента: при отключении она не выполняется, при удалении снимается. Внутри одной фазы параметр `order` задаёт числовой порядок. Обработчик синхронный; Promise движок не ожидает.
