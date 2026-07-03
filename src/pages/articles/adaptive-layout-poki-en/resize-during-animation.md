---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Resize During Animation Must Be Handled Explicitly"
description: "How active reveal animations are completed, cancelled, or restarted when the screen changes."
seriesTitle: "Adaptive Layout for a Poki HTML5 Game"
seriesDescription: "A production workshop on making UI, screen, and gameplay adapt across Poki desktop, mobile, tablet, and iframe resolutions."
seriesSlug: "adaptive-layout-poki-en"
seriesTypeLabel: "Workshop series"
stepLabel: "Section"
step: 9
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
## 13. Resize During Animation Must Be Handled Explicitly

Resize can happen during animation.

For example, completion overlay shows title and progress label near the artwork. If the screen changes during reveal, target coordinates become stale.

In `LevelCompletionOverlayComponent`:

```ts
this.unsubscribeScreenChanged = this.node.events.on(SharedUiEvents.ScreenChanged, () => {
  this.completeActiveRevealStateOnResize();
  this.syncDimmerLayout();
  void this.trackTask(this.syncTextLayoutAfterResize());
});
```

If reveal is active, I complete it into a valid state:

```ts
if (this.titleRevealActive) {
  void this.getRequiredTitle().runAction('completionTitleReveal', {
    mode: 'complete',
    targetX: this.resolveArtworkCenterX(),
    targetY: this.resolveTitleY(),
  });
  this.titleRevealActive = false;
}
```

Then text layout is recalculated using the new bounds.

`LevelCompletionButtonComponent` uses a similar idea: if resize happens during reveal, the tween is stopped, the button is moved to final scale, and idle animation is restarted.
