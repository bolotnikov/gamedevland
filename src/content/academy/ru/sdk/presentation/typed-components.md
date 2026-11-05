---
{
  "locale": "ru",
  "translationKey": "sdk/presentation/typed-components",
  "course": "sdk",
  "lesson": "presentation",
  "draft": false,
  "order": 5,
  "title": "Проверка настроек компонента",
  "concept": "BaseTypedComponent",
  "description": "Проверим масштаб и длительность анимации счётчика.",
  "takeaway": [
    "Проверенные значения доступны в this.config."
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

Укажем в `configDecoder`, какие значения допустимы в `data` из JSON. В примере масштаб должен быть не меньше 1, а длительность не меньше 0. SDK проверит настройки до `onInit`. [BlockPuzzleScoreComponent.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/components/BlockPuzzleScoreComponent.ts#L14)

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

<figure class="sdk-figure is-flow">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-cyan"><div><strong>data</strong><span>Настройки в JSON</span></div></div>
    <div class="sdk-figure__item tone-violet"><div><strong>configDecoder</strong><span>Проверяет числа</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>this.config</strong><span>Компонент получает настройки</span></div></div>
  </div>
</figure>
