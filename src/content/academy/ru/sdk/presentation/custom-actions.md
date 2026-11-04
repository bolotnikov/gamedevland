---
{
  "locale": "ru",
  "translationKey": "sdk/presentation/custom-actions",
  "course": "sdk",
  "lesson": "presentation",
  "draft": true,
  "order": 7,
  "title": "Создаём собственное действие",
  "concept": "BaseTypedAction",
  "description": "Опишем статическую длительность и проверяемый вход одного запуска.",
  "takeaway": [
    "Настройки экземпляра и вход запуска имеют отдельные схемы.",
    "ownTween задаёт владельца анимации."
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

`BaseTypedAction<TConfig, TInput>` проверяет две границы: `data` из JSON и payload запуска. Добавим действие `FadeAction`, которое плавно меняет прозрачность узла:

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

Зарегистрируем `FadeAction` в DI, чтобы движок мог создавать его по имени:

```ts
registrar.transientClass(DiTokens.action('FadeAction'), FadeAction);
```

`DiTokens` импортируем из `@gamedevland/engine/di`. В layout подключим действие к узлу и зададим длительность:

```json
"actions": {
  "fade": { "type": "FadeAction", "data": { "duration": 0.2 } }
}
```

<figure class="sdk-figure is-compare"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>Настройка экземпляра</strong><span>duration: 0.2 → configDecoder</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>Вход запуска</strong><span>alpha: 0 → inputDecoder → execute</span></div></div></div><figcaption>Один класс можно использовать на разных узлах с разной настройкой длительности.</figcaption></figure>

Из компонента этого узла вызовем `await this.node.runAction('fade', { alpha: 0 })`. За 0.2 секунды прозрачность дойдёт до нуля. `ownTween` связывает анимацию с действием: cancel и detach останавливают её.

FadeAction после ожидания не выполняет новых мутаций. Если действие содержит несколько последовательных стадий, между ними используем `continueActionScope` или проверку версии, чтобы отменённый запуск не продолжил работу. При необходимости `onCancel` восстанавливает локальное визуальное состояние; базовый cancel сам по себе не обязан возвращать alpha к исходному значению.
