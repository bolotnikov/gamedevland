---
{
  "locale": "ru",
  "translationKey": "sdk/presentation/typed-components",
  "course": "sdk",
  "lesson": "presentation",
  "draft": true,
  "order": 5,
  "title": "Пишем типизированный компонент",
  "concept": "BaseTypedComponent",
  "description": "Проверим data из JSON до использования его полей.",
  "takeaway": [
    "Конфигурация компонента и payload события проверяются разными схемами.",
    "Авторские значения остаются в JSON."
  ],
  "sources": [
    {
      "title": "SDK · BaseTypedComponent.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/components/BaseTypedComponent.ts",
      "note": "Декодирование до onInit."
    },
    {
      "title": "Block Puzzle · BlockPuzzleScoreComponent.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/components/BlockPuzzleScoreComponent.ts",
      "note": "Реальный typed-компонент игры."
    },
    {
      "title": "SDK · ComponentsGroup.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/di/ComponentsGroup.ts",
      "note": "Регистрация типа поведения."
    }
  ]
}
---

<aside class="lesson-note is-green" aria-labelledby="lesson-purpose">
  <h3 id="lesson-purpose">Зачем это нужно</h3>
  <p>Настройки компонента приходят из JSON, где могут отсутствовать поля или оказаться неверные значения. Проверим их до запуска поведения, чтобы дальше работать с готовыми данными нужного типа.</p>
</aside>

`BaseTypedComponent<TConfig, TNode>` декодирует config перед `onInit`. Подкласс получает проверенное `this.config` и нужный тип узла.

В [BlockPuzzleScoreComponent.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/components/BlockPuzzleScoreComponent.ts#L14) схема счётчика требует допустимый масштаб и длительность. Сокращённый каркас:

```ts
const ConfigDecoder = SchemaDecoder.object({
  popScale: SchemaDecoder.number({ min: 1 }),
  popDuration: SchemaDecoder.number({ min: 0 }),
});

type BlockPuzzleScoreConfig = InferDecoded<typeof ConfigDecoder>;

export class BlockPuzzleScoreComponent extends BaseTypedComponent<
  BlockPuzzleScoreConfig,
  Text
> {
  protected override readonly configDecoder = ConfigDecoder;
}
```

Полная реализация также подписывается на ScoreChanged, проверяет payload и обновляет Text.

<figure class="sdk-figure is-compare"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>data в JSON</strong><span>popScale, popDuration → configDecoder → this.config</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>Событие ScoreChanged</strong><span>event.payload → схема события → score и delta</span></div></div></div><figcaption>Статические настройки и события приходят по разным границам и проверяются отдельно.</figcaption></figure>

Для простого примера создадим `CaptionComponent`: он проверит настройку и выведет текст на узле.

```ts
import { BaseTypedComponent } from '@gamedevland/engine/layouts';
import type { Text } from '@gamedevland/engine/layouts';
import { SchemaDecoder } from '@gamedevland/engine/validation';

export class CaptionComponent extends BaseTypedComponent<{ text: string }, Text> {
  protected override readonly configDecoder = SchemaDecoder.object({
    text: SchemaDecoder.string({ nonEmpty: true }),
  });

  protected override onReady(): void {
    this.node.setText(this.config.text);
  }
}
```

Зарегистрируем его через `ComponentsGroup.add('CaptionComponent', CaptionComponent)`. В Text-узле добавим `components.caption` с `type: 'CaptionComponent'` и `data: { text: 'Начать игру' }`. Текст появится после активации дерева.

Generic `Text` описывает ожидаемый узел, но не заменяет правильное размещение компонента. Подключение к Container вместо Text — ошибка композиции. Для универсального компонента с требованиями к типу узла нужна явная проверка на границе.
