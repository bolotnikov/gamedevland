---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Virtual Screen Instead of window.innerWidth Everywhere"
description: "How portrait and landscape virtual coordinate systems keep responsive game layout predictable."
seriesTitle: "Adaptive Layout for a Poki HTML5 Game"
seriesDescription: "A production workshop on making UI, screen, and gameplay adapt across Poki desktop, mobile, tablet, and iframe resolutions."
seriesSlug: "adaptive-layout-poki-en"
seriesTypeLabel: "Workshop series"
stepLabel: "Section"
step: 2
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
## 1. Virtual Screen Instead of window.innerWidth Everywhere

The main screen config is in `game/src/config/game.config.ts`:

```ts
screen: {
  land: { width: 960, height: 540 },
  port: { width: 540, height: 960 },
  dpr: 'auto',
  maxDpr: 2,
  render: {
    scaleFactor: GameRenderScalePolicy.resolveScaleFactor(),
  },
},
```

I define two base virtual coordinate systems:

- landscape: `960 x 540`
- portrait: `540 x 960`

It does not mean the game is always exactly this size. The engine reads the real viewport, detects orientation, and computes a virtual canvas that fills the available area.

Simplified code from `engine/screen/Scaler.ts`:

```ts
const isLand = viewport.width >= viewport.height;
const orientation = isLand ? 'land' : 'port';
const virt = isLand ? this.config.land : this.config.port;

const useWidth = fit === 'width' || (fit === 'auto' && isLand);
const useHeight = fit === 'height' || (fit === 'auto' && !isLand);

const canvasWidth = useWidth ? virt.width : Math.round(virt.height * (vw / vh));
const canvasHeight = useHeight ? virt.height : Math.round(virt.width * (vh / vw));
```

The idea is:

- in landscape, width is usually the stable axis;
- in portrait, height is usually the stable axis;
- the other axis is derived from the actual aspect ratio;
- gameplay code works in virtual coordinates;
- the canvas visually fills the viewport.

This keeps game layout predictable and avoids spreading browser dimensions across the codebase.
