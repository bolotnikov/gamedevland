---
{
  "locale": "ru",
  "translationKey": "sdk/presentation/custom-actions",
  "course": "sdk",
  "lesson": "presentation",
  "draft": false,
  "order": 7,
  "title": "Своё действие для плавного скрытия",
  "concept": "BaseTypedAction",
  "description": "Меняем прозрачность элемента за заданное время.",
  "takeaway": [
    "Длительность берём из JSON, конечную прозрачность передаём при запуске."
  ],
  "sources": [
    {
      "title": "SDK · BaseTypedAction.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/actions/BaseTypedAction.ts",
      "note": "Две схемы и вызов execute."
    },
    {
      "title": "SDK · BaseAction.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/actions/BaseAction.ts",
      "note": "Owned-твины, scope и cancel."
    },
    {
      "title": "SDK · types.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/tween/types.ts",
      "note": "TweenHandle и alphaTo."
    }
  ]
}
---

Создадим `FadeAction`. `configDecoder` проверяет длительность из JSON, `inputDecoder` — прозрачность, переданную в `runAction`.

```ts
import { BaseTypedAction } from '@gamedevland/engine/layouts';
import { SchemaDecoder } from '@gamedevland/engine/validation';

export class FadeAction extends BaseTypedAction<
  { duration: number },
  { alpha: number }
> {
  protected override readonly configDecoder = SchemaDecoder.object({
    duration: SchemaDecoder.number({ min: 0 }),
  });
  protected override readonly inputDecoder = SchemaDecoder.object({
    alpha: SchemaDecoder.number({ min: 0, max: 1 }),
  });

  protected override async execute(input: { alpha: number }): Promise<void> {
    await this.ownTween(
      this.node.tweens.alphaTo(input.alpha, this.config.duration),
    );
  }
}
```

Зарегистрируем класс как `FadeAction`. В `actions.fade` укажем `type: 'FadeAction'` и `data: { duration: 0.2 }`. Вызов `runAction('fade', { alpha: 0 })` скроет узел за 0,2 секунды.

<figure class="sdk-figure is-flow">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-cyan"><div><strong>Настройка</strong><span>duration: 0.2</span></div></div>
    <div class="sdk-figure__item tone-violet"><div><strong>Запуск</strong><span>alpha: 0</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>Результат</strong><span>Узел плавно исчезает</span></div></div>
  </div>
</figure>
