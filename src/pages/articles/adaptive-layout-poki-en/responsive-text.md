---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Responsive Text Is About Readability"
description: "How text bounds and localization risk affect responsive UI in completion overlays."
seriesTitle: "Adaptive Layout for a Poki HTML5 Game"
seriesDescription: "A production workshop on making UI, screen, and gameplay adapt across Poki desktop, mobile, tablet, and iframe resolutions."
seriesSlug: "adaptive-layout-poki-en"
seriesTypeLabel: "Workshop series"
stepLabel: "Section"
step: 10
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
## 14. Responsive Text Is About Readability

Completion overlay text can become too wide in portrait. Before positioning, I reset scale and check text bounds:

```ts
private applyResponsiveTextScale(text: Text): void {
  if (this.node.screen.getOrientation() !== 'port') {
    return;
  }

  text.setScale(1, 1);
  const screenWidth = this.node.screen.getVirtualSize().width;
  const maxWidth = screenWidth * LevelCompletionOverlayComponent.PORT_TEXT_MAX_SCREEN_WIDTH_RATIO;
  const bounds = text.view.getLocalBounds();
  const width = Math.max(0, bounds.width);
  if (width <= 0 || width <= maxWidth) {
    return;
  }

  const scale = Math.max(0.01, maxWidth / width);
  text.setScale(scale, scale);
}
```

This is also important for localization. A string that fits in one language may be much longer in another.
