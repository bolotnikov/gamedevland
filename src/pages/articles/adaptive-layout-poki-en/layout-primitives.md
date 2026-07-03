---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Declarative Layout Primitives"
description: "How simple responsive positioning, background fill, intro scaling, and popup fitting stay declarative in layout JSON."
seriesTitle: "Adaptive Layout for a Poki HTML5 Game"
seriesDescription: "A production workshop on making UI, screen, and gameplay adapt across Poki desktop, mobile, tablet, and iframe resolutions."
seriesSlug: "adaptive-layout-poki-en"
seriesTypeLabel: "Workshop series"
stepLabel: "Section"
step: 4
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
## 3. Simple Responsive Tasks Are Declarative

If an element only needs to be centered, placed near the right edge, or stretched as a background, I do not write a custom TypeScript component.

The engine already has layout components:

- `ResponsiveNodePositionComponent`
- `ResponsiveNodeSizeComponent`
- `FitStackLayoutComponent`

For example, the settings button is always near the right edge:

```json
{
  "components": {
    "responsivePosition": {
      "type": "ResponsiveNodePositionComponent",
      "enabled": true,
      "data": {
        "mode": "screen",
        "position": {
          "right": 10
        }
      }
    }
  }
}
```

This comes from `game/assets/json/layouts/features/settings/_button.json`.

The loading indicator is centered:

```json
{
  "type": "ResponsiveNodePositionComponent",
  "enabled": true,
  "data": {
    "mode": "screen",
    "position": {
      "cx": 0,
      "cy": 0
    }
  }
}
```

These cases belong in layout JSON. It is simpler and keeps runtime code focused.

## 4. Background Fill Is Part of the Game Layout

Several scenes use a background built from `gradient` and `pattern`. It must fill the whole virtual screen.

Example from `game/assets/json/layouts/scenes/item/layout.json`:

```json
{
  "responsiveNodeSize": {
    "type": "ResponsiveNodeSizeComponent",
    "enabled": true,
    "data": {
      "mode": "fill_width_height_ratio",
      "minScale": 1,
      "maxScale": 1,
      "fill": {
        "resizeTargets": ["gradient", "pattern"],
        "widthPercent": 1,
        "heightRatio": 1,
        "minHeightPx": 1,
        "maxHeightPx": 5000,
        "horizontalAlign": "left",
        "verticalAlign": "top"
      }
    }
  }
}
```

The background is not a DOM background. It is part of the scene layout and uses the same coordinate system as all other game elements.

## 5. Uniform Scale for the Intro Scene

The boot scene has an intro animation with stickers and a logo. It does not need a completely different composition per orientation. Centering and uniform scaling are enough.

Example from `game/assets/json/layouts/scenes/boot/layout.json`:

```json
{
  "responsivePosition": {
    "type": "ResponsiveNodePositionComponent",
    "enabled": true,
    "data": {
      "mode": "screen",
      "position": {
        "cx": 0,
        "cy": 0
      }
    }
  },
  "responsiveSize": {
    "type": "ResponsiveNodeSizeComponent",
    "enabled": true,
    "data": {
      "mode": "uniform_scale",
      "minScale": 0.68,
      "maxScale": 1,
      "uniform": {
        "axis": "min",
        "referenceScreenWidthPx": 720,
        "referenceScreenHeightPx": 1280
      }
    }
  }
}
```

`axis: "min"` means that the most restrictive axis drives the scale.

This is a good approach for:

- logos;
- intro animation groups;
- decorative groups;
- small UI blocks that do not need composition changes.

## 6. Fit by Real Bounds for Popup UI

For popup UI, I use `fit_bounds`.

The problem with popups is that their real size depends on content: background, labels, buttons, spacing. If you only scale by reference width, narrow screens may clip the popup.

Settings popup:

```json
{
  "responsiveSize": {
    "type": "ResponsiveNodeSizeComponent",
    "enabled": true,
    "data": {
      "mode": "fit_bounds",
      "minScale": 0.25,
      "maxScale": 3,
      "fit": {
        "primaryAxisByOrientation": {
          "port": "width",
          "land": "height"
        },
        "widthPercent": 0.9,
        "heightPercent": 0.9,
        "topPaddingPx": 12,
        "bottomPaddingPx": 12,
        "leftPaddingPx": 12,
        "rightPaddingPx": 12,
        "alignX": "center",
        "alignY": "center",
        "offsetYPx": 10
      }
    }
  }
}
```

In portrait, the popup fits by width. In landscape, it fits by height. This is more precise than using one universal scale rule.

Inside the engine, `fit_bounds` measures the actual subtree:

```ts
const bounds = targetNode.view.getLocalBounds();
const availableWidth = widthBeforePadding - fit.leftPaddingPx - fit.rightPaddingPx;
const availableHeight = heightBeforePadding - fit.topPaddingPx - fit.bottomPaddingPx;
const widthFitScale = availableWidth / bounds.width;
const heightFitScale = availableHeight / bounds.height;
const scale = this.clampScale(fitScale, config.minScale, config.maxScale);
```

This comes from `engine/layouts/components/ResponsiveNodeSizeComponent.ts`.

The important part: the component uses real rendered bounds, not a guessed size.
