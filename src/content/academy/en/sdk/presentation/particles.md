---
{
  "locale": "en",
  "translationKey": "sdk/presentation/particles",
  "course": "sdk",
  "lesson": "presentation",
  "draft": false,
  "order": 13,
  "title": "Particles when cells clear",
  "concept": "ParticlesManager",
  "description": "Show a flash at each cleared cell.",
  "takeaway": [
    "Set the particle appearance in JSON and pass coordinates when running the action."
  ],
  "sources": [
    {
      "title": "SDK · ParticlesManager.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/particles/ParticlesManager.ts",
      "note": "Emitter lifetime and subtree cleanup."
    },
    {
      "title": "SDK · ParticleEmitterComponent.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/components/ParticleEmitterComponent.ts",
      "note": "A persistent emitter on a node."
    },
    {
      "title": "SDK · DisplacementFilterComponent.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/components/DisplacementFilterComponent.ts",
      "note": "Filter ownership and shared textures."
    },
    {
      "title": "Block Puzzle · line-clear-particles.json",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/assets/json/configs/scenes/game/line-clear-particles.json",
      "note": "The Block Puzzle flash preset."
    }
  ]
}
---

<aside class="lesson-note" aria-labelledby="particle-preset"><span class="lesson-note__label">Term</span><h3 id="particle-preset">Particle preset</h3><p>A file that describes how particles look and move, including how many appear and how quickly they disappear.</p></aside>


When a line clears, run the action with the cell coordinates. With `space: 'local'`, the coordinates are relative to the effect container. [BlockPuzzleBoardEffectsComponent.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/components/BlockPuzzleBoardEffectsComponent.ts#L54)

```ts
this.trackTask(
  this.node.runAction(this.config.actionId, {
    position: this.cellPosition(cell.row, cell.column),
  }),
);
```

<figure class="sdk-figure is-flow">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-cyan"><div><strong>Cleared cell</strong><span>Calculate its coordinates</span></div></div>
    <div class="sdk-figure__item tone-violet"><div><strong>PlayParticlesAction</strong><span>Reads the particle settings</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>Flash</strong><span>Appears at the cell</span></div></div>
  </div>
</figure>
