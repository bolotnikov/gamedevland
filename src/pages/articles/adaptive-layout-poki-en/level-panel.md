---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Level Panel and Artwork Rules"
description: "How the gameplay panel changes from a portrait bottom panel to a landscape side panel, and how artwork fits inside it."
seriesTitle: "Adaptive Layout for a Poki HTML5 Game"
seriesDescription: "A production workshop on making UI, screen, and gameplay adapt across Poki desktop, mobile, tablet, and iframe resolutions."
seriesSlug: "adaptive-layout-poki-en"
seriesTypeLabel: "Workshop series"
stepLabel: "Section"
step: 6
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
## 9. Level Scene: Bottom Panel in Portrait, Left Panel in Landscape

The gameplay scene is the most important part.

In `LevelPanelComponent`, the panel uses:

- portrait: full width and 33% height;
- landscape: 33% width and full height.

```ts
const panelHeight = orientation === 'port'
  ? Math.max(1, Math.round(screen.height * LevelPanelLayoutMetrics.PANEL_HEIGHT_RATIO))
  : Math.max(1, Math.round(screen.height));

const panelWidth = orientation === 'port'
  ? Math.max(1, Math.round(screen.width))
  : Math.max(1, Math.round(screen.width * LevelPanelLayoutMetrics.PANEL_WIDTH_RATIO));
```

This is not only responsive. It changes the layout model.

Why:

- on mobile portrait, a bottom album panel is easier to read and tap around;
- on desktop and wide landscape, a left vertical panel uses screen width better;
- the playfield gets more useful space;
- the album preview stays large enough.

Metrics are stored separately:

```ts
export class LevelPanelLayoutMetrics {
  static readonly PANEL_HEIGHT_RATIO = 0.33;
  static readonly PANEL_WIDTH_RATIO = 0.33;
  static readonly ARTWORK_HEIGHT_RATIO = 0.9;
  static readonly ARTWORK_WIDTH_RATIO = 0.9;
}
```

This makes UX proportions easy to tune.

## 10. Artwork Inside the Panel Has Its Own Rules

`LevelPanelArtworkComponent` fits the album artwork inside the panel.

In portrait, size depends on panel height:

```ts
const artworkWidth = orientation === 'port'
  ? Math.max(
      1,
      Math.round(textureWidth * ((panelHeight * LevelPanelLayoutMetrics.ARTWORK_HEIGHT_RATIO) / textureHeight)),
    )
  : Math.max(1, Math.round(panelWidth * LevelPanelLayoutMetrics.ARTWORK_WIDTH_RATIO));
```

In landscape, size depends on panel width.

This is why "just scale by screen width" is not enough. The artwork lives inside a UI container, and that container changes shape.
