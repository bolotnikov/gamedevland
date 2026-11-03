---
title: "Adaptive Layout for a Poki HTML5 Game"
description: "How Stickers Merge adapts virtual screen size, UI composition, physics bounds, animation state, and readable text across desktop, mobile, and tablet resolutions."
pubDate: 2026-05-13
draft: false
tags:
  - html5
  - poki
  - responsive-layout
  - game-architecture
featured: false
readingTime: "13 min read"
coverImage: "/assets/adaptive-layout-poki-en.png"
coverAlt: "Adaptive HTML5 game layout across desktop and mobile screens"
category: workshop
---

In this article, I want to explain how responsive and adaptive layout works in my game [Stickers Merge](https://poki.com/en/g/stickers-merge).

## The Problem

Poki games need to work on desktop, mobile, and tablet. The [official Poki requirements](https://sdk.poki.com/new-requirements.html) say that on mobile the game should cover the entire screen in portrait or landscape, and supporting both orientations gives the best player experience. The game also has to scale to the full canvas across devices.

In real development this means:

- the game should not break inside different iframe sizes;
- portrait and landscape are two different UX cases;
- desktop players usually want to use screen width;
- mobile players often play in portrait and use screen height;
- UI should not just shrink until it becomes unreadable;
- gameplay space must be recalculated too, not only visual UI.

In `Stickers Merge`, I do not solve this with one giant resize handler. The responsive system is split into several layers.

## Overall Architecture

There are three levels:

1. **Engine screen layer** - calculates virtual canvas size, orientation, and emits `SCREEN_CHANGED`.
2. **Engine layout primitives** - reusable components for common responsive tasks: positioning, scaling, fitting by bounds.
3. **Game composition components** - scene-specific components that know the UX rules of the game: how many columns to show, where to put the panel, how to rebuild the physics playfield.

This split is important. The engine owns screen math and reusable layout operations. The game owns meaning and UX.

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

## Practical Recommendations

If I were building another HTML5 game for Poki, I would use the same approach:

1. **Start with virtual screen profiles.**
   Define portrait and landscape coordinate systems. Do not bind gameplay to `window.innerWidth`.

2. **Create one screen manager.**
   It should compute orientation, virtual size, viewport size, and emit one normalized screen-change event.

3. **Keep simple elements declarative.**
   Centering, edge positioning, full-screen backgrounds, and uniform scale should live in layout JSON.

4. **Use node components for complex scene composition.**
   A component may know scene UX rules, but it should not duplicate the whole engine layout system.

5. **Change the layout model between portrait and landscape.**
   Good game responsiveness is not always the same UI scaled down. Sometimes portrait needs a bottom panel and landscape needs a side panel.

6. **Recalculate gameplay bounds.**
   Physics, drag, spawn, collision, and tutorial targets must react to screen changes.

7. **Handle resize during animations.**
   Active tweens should be completed, cancelled, or restarted with new target values.

8. **Test more than popular resolutions.**
   Check ultra-wide, narrow portrait, tablet landscape, small iframes, and rotation during gameplay.

## Conclusion

For Poki, `canvas { width: 100%; height: 100%; }` is not enough.

A real responsive game needs to adapt:

- virtual coordinate system;
- layout JSON;
- scene composition;
- UI panels;
- gameplay bounds;
- object sizes;
- animations;
- text;
- input and drag state.

The formula I use in `Stickers Merge` is:

**the engine calculates the screen and provides reusable responsive primitives, while game components describe UX decisions for specific scenes.**

This keeps the code manageable and makes the game feel good on both a wide desktop screen and a phone in portrait orientation.
