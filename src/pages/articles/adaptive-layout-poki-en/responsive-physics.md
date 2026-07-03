---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Gameplay Physics Is Responsive Too"
description: "Why physics bounds, drag state, spawn positions, and collision space must react to screen changes."
seriesTitle: "Adaptive Layout for a Poki HTML5 Game"
seriesDescription: "A production workshop on making UI, screen, and gameplay adapt across Poki desktop, mobile, tablet, and iframe resolutions."
seriesSlug: "adaptive-layout-poki-en"
seriesTypeLabel: "Workshop series"
stepLabel: "Section"
step: 7
readingTime: "2 min read"
steps:
  - step: 1
    slug: ""
    title: "Problem and Architecture"
  - step: 2
    slug: "virtual-screen"
    title: "Virtual Screen"
  - step: 3
    slug: "screen-changes"
    title: "Screen Changes"
  - step: 4
    slug: "layout-primitives"
    title: "Layout Primitives"
  - step: 5
    slug: "scene-composition"
    title: "Scene Composition"
  - step: 6
    slug: "level-panel"
    title: "Level Panel"
  - step: 7
    slug: "responsive-physics"
    title: "Responsive Physics"
  - step: 8
    slug: "object-sizing"
    title: "Object Sizing"
  - step: 9
    slug: "resize-during-animation"
    title: "Resize During Animation"
  - step: 10
    slug: "responsive-text"
    title: "Responsive Text"
  - step: 11
    slug: "recommendations"
    title: "Recommendations"
---
## 11. Gameplay Physics Is Responsive Too

A common mistake in HTML5 games: UI is responsive, but gameplay logic still uses old bounds.

In `Stickers Merge`, physics bounds are recalculated when the screen changes.

`LevelPhysicsBoundsResolver` uses current virtual size and layout:

```ts
const virtualSize = this.screen.getVirtualSize();
const leftInset = this.screen.getOrientation() === 'land'
  ? this.resolveLandLeftInset(layout, virtualSize)
  : 0;

const localTopLeft = playfield.view.toLocal({ x: leftInset, y: 0 }, root.view);
const localTopRight = playfield.view.toLocal({ x: virtualSize.width, y: 0 }, root.view);
const localBottomLeft = playfield.view.toLocal({ x: leftInset, y: virtualSize.height }, root.view);
```

In landscape, bounds start after the left panel. In portrait, bounds start at zero because the panel is at the bottom.

On `SCREEN_CHANGED`, the FSM runs:

```ts
[SharedUiEvents.ScreenChanged]: {
  actions: ['RebuildLevelStickersOnResizeCommand'],
},
```

The command calls:

```ts
await this.getSceneService<LevelStickerResizeRebuildService>(
  GameServices.LevelStickerResizeRebuildService,
).rebuildFromCurrentScene({
  layout: this.layout,
  stickersLayer: this.getStickersLayer(),
});
```

The service:

- cleans up active drag;
- captures current sticker state;
- recalculates physics bounds;
- removes old physics bodies;
- spawns stickers again in the new layout;
- warms up the physics simulation;
- marks stickers as settled.

```ts
const stickersSnapshot = this.captureSnapshot();
this.physics.setBounds(this.boundsResolver.resolveFromLayout(params.layout));
await this.mergeService.consumeManyByIds(stickersSnapshot.map((entry) => entry.id));

const respawnedRecords = await this.spawnFlowService.spawnBatch({
  layer: params.stickersLayer,
  physics: this.physics,
  registrar: this.registrar,
  entries: stickersSnapshot,
  mode: 'packed_visible',
});
```

Responsive gameplay means visual resize is not enough. Physics, spawn positions, collision bounds, and drag state must respond too.
