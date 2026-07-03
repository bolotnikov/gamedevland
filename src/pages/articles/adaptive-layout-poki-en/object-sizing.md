---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Game Object Size Depends on Orientation"
description: "How sticker size follows the axis that defines useful gameplay space in each orientation."
seriesTitle: "Adaptive Layout for a Poki HTML5 Game"
seriesDescription: "A production workshop on making UI, screen, and gameplay adapt across Poki desktop, mobile, tablet, and iframe resolutions."
seriesSlug: "adaptive-layout-poki-en"
seriesTypeLabel: "Workshop series"
stepLabel: "Section"
step: 8
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
## 12. Game Object Size Depends on Orientation

Sticker size is not scaled the same way in every orientation.

In `LevelStickerSizeResolver`:

```ts
private resolveScale(): number {
  if (this.screen.getOrientation() === 'land') {
    return this.resolveLandscapeScale();
  }

  return this.resolvePortraitScale();
}
```

In portrait, scale grows from virtual width:

```ts
const virtualWidth = this.screen.getVirtualSize().width;
const extraRatio = Math.max(
  0,
  (virtualWidth - LevelStickerSizeResolver.BASELINE_VIRTUAL_WIDTH) /
    LevelStickerSizeResolver.BASELINE_VIRTUAL_WIDTH,
);
```

In landscape, scale grows from virtual height:

```ts
const virtualHeight = this.screen.getVirtualSize().height;
```

The object size follows the axis that actually defines useful gameplay space.
