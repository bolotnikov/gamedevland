---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/api-reference",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 16,
  "title": "API reference",
  "concept": "Core · SDK adapter",
  "description": "Find a method and an example of its use.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · core exports",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/index.ts",
      "note": "Public core exports."
    },
    {
      "title": "Cyber UI Toolkit · SDK exports",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/sdk/src/index.ts",
      "note": "Public adapter exports."
    }
  ]
}
---

This reference lists the library's classes and types. Follow a link to its example. The core package is `@gamedevland/cyber-ui`; `ToolkitComponent`, `PanelReveal`, and `UiViewport` come from `@gamedevland/cyber-ui-sdk`.

<details><summary>Classes and methods</summary>

| API | Methods and fields | Use |
| --- | --- | --- |
| [`TerminalUi`](/academy/cyber-ui/interface/panels/) | `plate, icon, traces, etch, clippedRect` | Plates, icons, decoration, and paths |
| [`TerminalGlass`](/academy/cyber-ui/interface/panels/) | `draw, focus` | Glass and accents |
| [`PanelSurface`](/academy/cyber-ui/interface/panels/) | `draw` | Information panels |
| [`ButtonSurface`](/academy/cyber-ui/interface/buttons/) | `draw, segmentTrack, toggle` | 10 button variants and shared tracks |
| [`ButtonPrice`](/academy/cyber-ui/interface/buttons/) | `layout` | Button label and price |
| [`CyberPreset`](/academy/cyber-ui/interface/icons-theme/) | `palette, triangle, trianglePalette, textEcho, glitch` | Default colors and settings |
| [`BinaryField`](/academy/cyber-ui/interface/binary-field/) | `draw` | Pattern from a seed and an integer frame |
| [`TriangleLoader`](/academy/cyber-ui/interface/triangle-loader/) | `update, draw, outerRadius` | Outlines and particles |
| [`SignalBrackets`](/academy/cyber-ui/interface/signal-brackets/) | `draw` | Brackets around an emblem |
| [`TerminalSweep`](/academy/cyber-ui/interface/panels/) | `draw` | Scanning down/right |
| [`TextEcho`](/academy/cyber-ui/interface/text-echo/) | `update, draw, offset` | Main text and echo displacement |
| [`SurfaceGlitch`](/academy/cyber-ui/interface/glitch-lifecycle/) | `show, update, hide` | Strips over a live Graphics object |
| [`FaultGlyph`](/academy/cyber-ui/interface/fault-glyph/) | `draw` | Warning symbol |
| [`SignalLost`](/academy/cyber-ui/interface/signal-lost/) | `draw` | Error screen and label position |
| [`PanelTransition`](/academy/cyber-ui/interface/panel-reveal/) | `origin` | Opening and closing geometry |
| [`AnimatedEffect`](/academy/cyber-ui/interface/api-reference/) | `elapsedSeconds, update, setActive, setReducedMotion, dispose` | Effect time and pause |
| [`ToolkitComponent`](/academy/cyber-ui/interface/sdk-components/) | `ownEffect, setUiReducedMotion, uiViewport` | SDK adapter component |
| [`PanelReveal`](/academy/cyber-ui/interface/panel-reveal/) | `runAction` | SDK adapter action |

</details>

`TriangleLoader`, `TextEcho`, and `SurfaceGlitch` also provide `elapsedSeconds`, `setActive()`, `setReducedMotion()`, and `dispose()`. These methods come from `AnimatedEffect`.

<details><summary>Types and fields</summary>

| Type | Fields / values |
| --- | --- |
| [`UiBounds`](/academy/cyber-ui/interface/panels/) | `x, y, w, h` |
| [`PanelPalette`](/academy/cyber-ui/interface/panels/) | `surface, edge, accent` |
| [`ButtonVariant`](/academy/cyber-ui/interface/buttons/) | `primary, module, danger, icon, nav, segment, tab, switch, utility, line` |
| [`ButtonSurfaceOptions`](/academy/cyber-ui/interface/buttons/) | `width, height, variant, enabled, selected, explicitAccent?, ready?` |
| [`ButtonPalette`](/academy/cyber-ui/interface/icons-theme/) | `background, panel, inset, panelEdge, signal, focus, accent, steel, sapphire, text, muted, danger` |
| [`TerminalIcon`](/academy/cyber-ui/interface/icons-theme/) | `27 names` |
| [`TriangleOptions`](/academy/cyber-ui/interface/triangle-loader/) | `cycleMs, spinDelayMs, spinDurationMs, layers, layerGap, layerLift, strokeWidth, haloWidth, haloAlpha, echoAlpha, particles, particleSize, particleSpread, particleAlpha, seed` |
| [`TrianglePalette`](/academy/cyber-ui/interface/triangle-loader/) | `accent, secondary, highlight, text` |
| [`TriangleLayout`](/academy/cyber-ui/interface/triangle-loader/) | `x, y, radius, scale` |
| [`TextEchoOptions`](/academy/cyber-ui/interface/text-echo/) | `frameMs, cycleMs, shift` |
| [`GlitchOptions`](/academy/cyber-ui/interface/glitch-lifecycle/) | `durationMs, minDelayMs, spreadMs, seed` |
| [`GlitchTarget`](/academy/cyber-ui/interface/glitch-lifecycle/) | `surface, x, y, w, h` |
| [`BracketOptions`](/academy/cyber-ui/interface/signal-brackets/) | `cycleMs, travel, scale, jitter, distanceRatio, maxDistance, halfHeight, bevel, strokeWidth, alpha, peakAlpha, markerSize, markerAlpha` |
| [`SignalPalette`](/academy/cyber-ui/interface/signal-lost/) | `background, danger, accent, highlight` |
| [`PanelTransitionInput`](/academy/cyber-ui/interface/panel-reveal/) | `offset, axis?, pivotX?, pivotY?, closing?` |
| [`UiEffect`](/academy/cyber-ui/interface/api-reference/) | `update, setActive, setReducedMotion, dispose` |
| [`UiViewport`](/academy/cyber-ui/interface/sdk-components/) | `width, height, cssWidth, cssHeight, scale` |

</details>

## General rules

- Coordinates and dimensions use local PixiJS logical units. Surfaces start at the top left; icons use their center.
- `update()` takes seconds; `*Ms` fields and `SignalBrackets` time use milliseconds. `TerminalSweep` progress is `[0, 1)`; `SignalLost` progress is `[0, 1]`.
- Drawing appends geometry. Clear the layer before rebuilding it; `TriangleLoader.draw()` clears its two dedicated surfaces itself.
- Colors are RGB numbers, such as `0x68e0cb`.
- Before removing scene objects, call `dispose()` on their effects.

<details><summary>Creating a custom effect</summary>

`AnimatedEffect` helps build a new animation: it tracks time and pauses updates.

```ts
import { AnimatedEffect } from '@gamedevland/cyber-ui';

export class PulsePhase extends AnimatedEffect {
  get alpha(): number {
    this.assertLive();
    return this.reducedMotion ? 1 : 0.8 + 0.2 * Math.sin(this.elapsedSeconds * 2);
  }
}

const effect = new PulsePhase();
effect.update(0.1);
console.log(effect.alpha);
effect.setActive(false);
effect.update(1);
console.log(effect.elapsedSeconds); // 0.1
// Before releasing the screen:
effect.dispose();
```

Custom behavior can override `onFrame()`, `onActivityChanged()`, `onMotionChanged()`, and `onDispose()`.

</details>
