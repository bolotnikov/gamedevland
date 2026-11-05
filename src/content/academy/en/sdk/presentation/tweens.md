---
{
  "locale": "en",
  "translationKey": "sdk/presentation/tweens",
  "course": "sdk",
  "lesson": "presentation",
  "draft": false,
  "order": 11,
  "title": "Animating the score display",
  "concept": "Tweens",
  "description": "Scale up the score display when points are awarded.",
  "takeaway": [
    "Stop the animation with killOwnedTweens() when disabling the component."
  ],
  "sources": [
    {
      "title": "SDK · types.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/tween/types.ts",
      "note": "Durations, playback handles, timelines, and completion on kill."
    },
    {
      "title": "SDK · NodeTweens.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/nodes/internal/NodeTweens.ts",
      "note": "The node’s tween methods."
    },
    {
      "title": "Block Puzzle · BlockPuzzleScoreComponent.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/components/BlockPuzzleScoreComponent.ts",
      "note": "Ownership of the score animation."
    }
  ]
}
---

<aside class="lesson-note" aria-labelledby="tween-term"><span class="lesson-note__label">Term</span><h3 id="tween-term">Tween</h3><p>A smooth change to a property over a set time. For example, reducing the scale from 1.18 to 1.</p></aside>


When points are awarded, scale up the score display. Then `scaleTo` restores its original size over `popDuration` seconds. Stop the previous animation before starting another. [BlockPuzzleScoreComponent.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/components/BlockPuzzleScoreComponent.ts#L70)

```ts
this.killOwnedTweens();
this.node.setScale(this.baseScale * this.config.popScale);
this.ownTween(
  this.node.tweens.scaleTo(this.baseScale, this.config.popDuration, {
    ease: 'back.out(2)',
  }),
);
```

<figure class="sdk-figure is-flow">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-cyan"><div><strong>Points awarded</strong><span>Scale up the score display</span></div></div>
    <div class="sdk-figure__item tone-violet"><div><strong>scaleTo</strong><span>Scale down smoothly</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>baseScale</strong><span>The display returns to its original size</span></div></div>
  </div>
</figure>
