---
{
  "locale": "ru",
  "translationKey": "sdk/presentation/tweens",
  "course": "sdk",
  "lesson": "presentation",
  "draft": true,
  "order": 11,
  "title": "Анимация с явным владельцем",
  "concept": "Tweens",
  "description": "Движок обновляет анимацию, компонент определяет её время жизни.",
  "takeaway": [
    "Твин имеет владельца и определённую очистку.",
    "Завершение Promise не всегда означает достижение конечного значения."
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

Tween плавно изменяет числовые свойства за заданное время. SDK использует GSAP за фасадом TweenManager и предоставляет узлу короткие методы `node.tweens`.

<aside class="lesson-note" aria-labelledby="tween-term"><span class="lesson-note__label">Термин</span><h3 id="tween-term">Твин (tween)</h3><p>Изменение свойства от начального значения к конечному во времени. Например, возвращение масштаба счётчика после прибавления очков.</p></aside>

Фрагмент метода `playScorePop` из [BlockPuzzleScoreComponent.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/components/BlockPuzzleScoreComponent.ts#L70):

```ts
this.killOwnedTweens();
this.node.setScale(this.baseScale * this.config.popScale);
this.ownTween(
  this.node.tweens.scaleTo(this.baseScale, this.config.popDuration, {
    ease: 'back.out(2)',
  }),
);
```

<figure class="sdk-figure is-flow"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">01</span><div><strong>ScoreChanged</strong><span>Получены score и delta</span></div></div><div class="sdk-figure__item tone-violet"><span class="sdk-figure__index">02</span><div><strong>Начальное значение</strong><span>Масштаб увеличен на popScale</span></div></div><div class="sdk-figure__item tone-green"><span class="sdk-figure__index">03</span><div><strong>Tween</strong><span>Плавное возвращение к baseScale</span></div></div><div class="sdk-figure__item tone-amber"><span class="sdk-figure__index">04</span><div><strong>Disable / detach</strong><span>Owned-твин остановлен владельцем</span></div></div></div><figcaption>Перед новым эффектом предыдущий останавливается. baseScale берётся из актуальной responsive-вёрстки.</figcaption></figure>

В `TweenOptions` длительность и задержка задаются в секундах. `delayMs` — отдельный метод с миллисекундами. Для координат есть `moveTo`, `moveBy`, `moveAlongPath`, для прозрачности — `alphaTo`, для масштаба — `scaleTo`. `from`, `to`, `fromTo` работают с числовыми свойствами.

`timeline(setup)` собирает несколько стадий через TimelineBuilder. Handle поддерживает `pause`, `resume`, `reverse`, `progress`, `timeScale`, `seek` и `kill`. Через `groupId` можно объединить несколько анимаций для очистки.

## Завершение и остановка

`await handle` завершается и при обычном окончании, и при `kill`. Это не доказательство, что объект достиг конечной точки. Если после ожидания есть следующая стадия, проверим область жизни или отмену.

`ownTween` очищает анимацию при detach. При временном отключении компонента явный `killOwnedTweens()` остаётся ответственностью `onDisable`, как в счётчике игры. Общая runtime-пауза согласована с TweenManager, поэтому игровой tween не должен продолжать движение во время паузы.
