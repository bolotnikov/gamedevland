---
{
  "locale": "en",
  "translationKey": "sdk/presentation/typed-components",
  "course": "sdk",
  "lesson": "presentation",
  "draft": false,
  "order": 5,
  "title": "Validating component settings",
  "concept": "BaseTypedComponent",
  "description": "Check the scale and duration of the score animation.",
  "takeaway": [
    "The validated settings are available in this.config."
  ],
  "sources": [
    {
      "title": "SDK · BaseTypedComponent.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/layouts/components/BaseTypedComponent.ts",
      "note": "Decoding before onInit."
    },
    {
      "title": "Block Puzzle · BlockPuzzleScoreComponent.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/components/BlockPuzzleScoreComponent.ts",
      "note": "The game’s typed component."
    },
    {
      "title": "SDK · ComponentsGroup.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/di/ComponentsGroup.ts",
      "note": "Registering the component type."
    }
  ]
}
---

Use `configDecoder` to specify which values are allowed in `data` from JSON. In this example, the scale must be at least 1 and the duration must be at least 0. The SDK validates the settings before `onInit`. Adapt the example from [BlockPuzzleScoreComponent.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/components/BlockPuzzleScoreComponent.ts#L14):

```ts
import { BaseTypedComponent } from '@gamedevland/engine/layouts';
import { Text } from '@gamedevland/engine/renderers/pixi';
import { SchemaDecoder, type InferDecoded } from '@gamedevland/engine/validation';

const ConfigDecoder = SchemaDecoder.object({
  popScale: SchemaDecoder.number({ min: 1 }),
  popDuration: SchemaDecoder.number({ min: 0 }),
});

type BlockPuzzleScoreConfig = InferDecoded<typeof ConfigDecoder>;

export class BlockPuzzleScoreComponent extends BaseTypedComponent<
  BlockPuzzleScoreConfig,
  Text
> {
  protected readonly nodeType = Text;
  protected override readonly configDecoder = ConfigDecoder;
}
```

<figure class="sdk-figure is-flow">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-cyan"><div><strong>data</strong><span>Settings in JSON</span></div></div>
    <div class="sdk-figure__item tone-violet"><div><strong>configDecoder</strong><span>Validates the numbers</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>this.config</strong><span>The component receives its settings</span></div></div>
  </div>
</figure>
