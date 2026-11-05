---
{
  "locale": "en",
  "translationKey": "sdk/presentation/custom-actions",
  "course": "sdk",
  "lesson": "presentation",
  "draft": false,
  "order": 7,
  "title": "A custom fade-out action",
  "concept": "BaseTypedAction",
  "description": "Change an element’s opacity over a set time.",
  "takeaway": [
    "Read the duration from JSON and pass the target opacity when running the action."
  ],
  "sources": [
    {
      "title": "SDK · BaseTypedAction.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/actions/BaseTypedAction.ts",
      "note": "The two schemas and the call to execute."
    },
    {
      "title": "SDK · BaseAction.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/actions/BaseAction.ts",
      "note": "Owned tweens, scope, and cancellation."
    },
    {
      "title": "SDK · types.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/tween/types.ts",
      "note": "TweenHandle and alphaTo."
    }
  ]
}
---

Create `FadeAction`. `configDecoder` validates the duration from JSON, and `inputDecoder` validates the opacity passed to `runAction`.

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

Register the class as `FadeAction`. In `actions.fade`, set `type: 'FadeAction'` and `data: { duration: 0.2 }`. Calling `runAction('fade', { alpha: 0 })` fades out the node in 0.2 seconds.

<figure class="sdk-figure is-flow">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-cyan"><div><strong>Configuration</strong><span>duration: 0.2</span></div></div>
    <div class="sdk-figure__item tone-violet"><div><strong>Run the action</strong><span>alpha: 0</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>Result</strong><span>The node fades out</span></div></div>
  </div>
</figure>
