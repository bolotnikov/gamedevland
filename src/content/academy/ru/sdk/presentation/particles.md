---
{
  "locale": "ru",
  "translationKey": "sdk/presentation/particles",
  "course": "sdk",
  "lesson": "presentation",
  "draft": false,
  "order": 13,
  "title": "Частицы при очистке клеток",
  "concept": "ParticlesManager",
  "description": "Покажем вспышку на месте каждой очищенной клетки.",
  "takeaway": [
    "В JSON задаём вид частиц, при запуске передаём координаты."
  ],
  "sources": [
    {
      "title": "SDK · ParticlesManager.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/particles/ParticlesManager.ts",
      "note": "Жизненный цикл эмиттеров и очистка поддерева."
    },
    {
      "title": "SDK · ParticleEmitterComponent.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/layouts/components/ParticleEmitterComponent.ts",
      "note": "Постоянный эмиттер на узле."
    },
    {
      "title": "SDK · DisplacementFilterComponent.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/layouts/components/DisplacementFilterComponent.ts",
      "note": "Владение фильтром и общая текстура."
    },
    {
      "title": "Block Puzzle · line-clear-particles.json",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/assets/json/configs/scenes/game/line-clear-particles.json",
      "note": "Пресет вспышки Block Puzzle."
    }
  ]
}
---

<aside class="lesson-note" aria-labelledby="particle-preset"><span class="lesson-note__label">Термин</span><h3 id="particle-preset">Настройки частиц (пресет)</h3><p>Файл, в котором описано, как выглядят и движутся частицы. Например, сколько их появляется и как быстро они исчезают.</p></aside>

`ParticleEmitterComponent`, `DisplacementFilterComponent` и `PlayParticlesAction` импортируем из `@gamedevland/engine/renderers/pixi`. Они работают с Pixi-узлами; Three-эффекты создаёт компонент Three-узла.

При очистке линии вызовем действие с координатами клетки. Если в настройках указано `space: 'local'`, координаты отсчитываются от контейнера эффекта. [BlockPuzzleBoardEffectsComponent.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/components/BlockPuzzleBoardEffectsComponent.ts#L54)

```ts
this.trackTask(
  this.node.runAction(this.config.actionId, {
    position: this.cellPosition(cell.row, cell.column),
  }),
);
```

<figure class="sdk-figure is-flow">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-cyan"><div><strong>Очищенная клетка</strong><span>Вычисляем её координаты</span></div></div>
    <div class="sdk-figure__item tone-violet"><div><strong>PlayParticlesAction</strong><span>Берёт вид частиц из настроек</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>Вспышка</strong><span>Появляется в клетке</span></div></div>
  </div>
</figure>
