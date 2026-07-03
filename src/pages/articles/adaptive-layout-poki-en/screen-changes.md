---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "One Source of Truth for Resize"
description: "How ScreenManager, ResizeScheduler, and SCREEN_CHANGED keep resize handling centralized and deterministic."
seriesTitle: "Adaptive Layout for a Poki HTML5 Game"
seriesDescription: "A production workshop on making UI, screen, and gameplay adapt across Poki desktop, mobile, tablet, and iframe resolutions."
seriesSlug: "adaptive-layout-poki-en"
seriesTypeLabel: "Workshop series"
stepLabel: "Section"
step: 3
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
## 2. One Source of Truth for Resize

`engine/screen/ScreenManager.ts` is responsible for screen state. It:

- reads `visualViewport` when available;
- listens to `resize` and `orientationchange`;
- recalculates the screen snapshot;
- updates the PIXI renderer;
- notifies subscribers.

Resize events do not immediately trigger every layout recalculation. They first go through `ResizeScheduler`:

```ts
request(): void {
  if (this.scheduled) return;
  this.scheduled = true;
  requestAnimationFrame(() => {
    this.scheduled = false;
    this.handler();
  });
}
```

This avoids redundant recalculations while the browser window is being resized or the device orientation is changing.

After the screen snapshot changes, the engine emits `SCREEN_CHANGED`. Game code reacts to this normalized event, not to native browser resize.

Example:

```ts
this.unsubscribeScreen = this.node.events.on(SharedUiEvents.ScreenChanged, () => {
  this.applyLayout();
});
```

This pattern is used in components like `LevelPanelComponent`, `ItemSceneLayoutComponent`, `LevelBackgroundComponent`, and `LevelCompletionOverlayComponent`.
