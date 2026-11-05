---
{
  "locale": "ru",
  "translationKey": "sdk/presentation/tweens",
  "course": "sdk",
  "lesson": "presentation",
  "draft": false,
  "order": 11,
  "title": "Анимация счётчика",
  "concept": "Tweens",
  "description": "Увеличим счётчик при начислении очков.",
  "takeaway": [
    "При отключении компонента остановим анимацию через killOwnedTweens()."
  ],
  "sources": [
    {
      "title": "SDK · types.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/tween/types.ts",
      "note": "Длительности, handle, timeline и завершение при kill."
    },
    {
      "title": "SDK · NodeTweens.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/nodes/internal/NodeTweens.ts",
      "note": "Фасад узла."
    },
    {
      "title": "Block Puzzle · BlockPuzzleScoreComponent.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/components/BlockPuzzleScoreComponent.ts",
      "note": "Владение анимацией счёта."
    }
  ]
}
---

<aside class="lesson-note" aria-labelledby="tween-term"><span class="lesson-note__label">Термин</span><h3 id="tween-term">Твин (tween)</h3><p>Плавное изменение свойства за заданное время. Например, уменьшение масштаба с 1,18 до 1.</p></aside>

При начислении очков увеличим масштаб счётчика. Затем `scaleTo` вернёт прежний размер за `popDuration` секунд. Перед новой анимацией остановим предыдущую. [BlockPuzzleScoreComponent.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/components/BlockPuzzleScoreComponent.ts#L70)

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
    <div class="sdk-figure__item tone-cyan"><div><strong>Новые очки</strong><span>Увеличиваем счётчик</span></div></div>
    <div class="sdk-figure__item tone-violet"><div><strong>scaleTo</strong><span>Плавно уменьшаем</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>baseScale</strong><span>Счётчик вернулся к прежнему размеру</span></div></div>
  </div>
</figure>
