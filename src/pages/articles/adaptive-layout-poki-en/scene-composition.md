---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Scene Composition and Catalog Grid"
description: "How scene-specific components adapt album composition and catalog columns by orientation."
seriesTitle: "Adaptive Layout for a Poki HTML5 Game"
seriesDescription: "A production workshop on making UI, screen, and gameplay adapt across Poki desktop, mobile, tablet, and iframe resolutions."
seriesSlug: "adaptive-layout-poki-en"
seriesTypeLabel: "Workshop series"
stepLabel: "Section"
step: 5
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
## 7. Complex Scene Composition Stays in Game Components

Some scenes need more than centering and scaling. The item scene has an album, title, progress bar, and buttons.

`ItemSceneLayoutComponent` describes the composition:

```ts
private applyLayout(): void {
  const orientation = this.node.screen.getOrientation();
  const screen = this.node.screen.getVirtualSize();
  this.applyButtonScale(orientation);
  this.positionAlbumStage(screen.width, screen.height, orientation);
  this.sizeTitleCover(screen.width);
  this.sizeAlbumProgress();
  this.positionAlbumProgress();
  this.positionTitle();
  this.positionPlayButton(screen.height);
  this.positionAlbumsButton(screen.height);
}
```

The album size uses different axes:

```ts
const targetScale = orientation === 'port'
  ? (screenWidth * this.config.portImageWidthScreenPercent) / frameWidth
  : (screenHeight * this.config.landImageHeightScreenPercent) / frameHeight;

albumStage.setScale(targetScale, targetScale);
albumStage.setPosition(Math.round(screenWidth / 2), Math.round(screenHeight / 2));
```

In portrait, width matters more. In landscape, height matters more.

The layout JSON exposes this as config:

```json
{
  "landImageHeightScreenPercent": 0.6,
  "portImageWidthScreenPercent": 0.6,
  "landPlayButtonScale": 1,
  "portPlayButtonScale": 1
}
```

This is adaptive layout, not just responsive scaling.

## 8. Catalog Grid: Different Columns per Orientation

The items scene changes the album catalog grid:

- landscape: 5 columns;
- portrait: 2 columns.

Config:

```json
{
  "itemsAlbumsGrid": {
    "type": "ItemsAlbumsGridComponent",
    "enabled": true,
    "data": {
      "landColumns": 5,
      "portColumns": 2,
      "horizontalPaddingPx": 48,
      "bottomPaddingPx": 48,
      "columnGapPx": 28,
      "rowGapPx": 28,
      "maxScale": 1
    }
  }
}
```

Code:

```ts
private resolveColumns(): number {
  return this.node.screen.getOrientation() === 'land'
    ? this.config.landColumns
    : this.config.portColumns;
}
```

After that, the grid measures cards, computes the total grid size, and fits the result into the available area:

```ts
const fitScale = ScreenFitLayoutResolver.resolveScale({
  contentWidth: gridWidth <= 0 ? 1 : gridWidth,
  contentHeight: gridHeight <= 0 ? 1 : gridHeight,
  availableWidth,
  availableHeight,
  minScale: 0,
  maxScale: this.config.maxScale,
});
```

This is a practical pattern:

1. Choose the UX structure for the current orientation.
2. Measure the actual content.
3. Fit the result into the screen.
