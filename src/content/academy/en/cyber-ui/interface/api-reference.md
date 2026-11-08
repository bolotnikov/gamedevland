---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/api-reference",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 21,
  "title": "Public API reference",
  "concept": "Core · SDK adapter",
  "description": "Every class, method, and type linked to an example.",
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

All public core and adapter classes are listed below. Each link opens a short lesson with an example. Import from `@gamedevland/cyber-ui`; import `ToolkitComponent`, `PanelReveal`, and `UiViewport` from `@gamedevland/cyber-ui-sdk`.

<details><summary>Classes and methods</summary>

| API | Methods and fields | Purpose |
| --- | --- | --- |
| [`TerminalUi`](/academy/cyber-ui/interface/panels/) | `plate, icon, traces, etch, clippedRect` | Plates, icons, decoration, and paths |
| [`TerminalGlass`](/academy/cyber-ui/interface/panels/) | `draw, focus` | Glass and accents |
| [`PanelSurface`](/academy/cyber-ui/interface/panels/) | `draw` | Information panel |
| [`ButtonSurface`](/academy/cyber-ui/interface/buttons/) | `draw, segmentTrack, toggle` | 10 button variants and group backgrounds |
| [`ButtonPrice`](/academy/cyber-ui/interface/button-price/) | `layout` | Measured label and price row |
| [`CyberPreset`](/academy/cyber-ui/interface/icons-theme/) | `palette, triangle, trianglePalette, textEcho, glitch` | Frozen defaults |
| [`BinaryField`](/academy/cyber-ui/interface/binary-field/) | `draw` | Pattern from seed and integer frame |
| [`TriangleLoader`](/academy/cyber-ui/interface/triangle-loader/) | `update, draw, outerRadius` | Outlines and particles |
| [`SignalBrackets`](/academy/cyber-ui/interface/signal-brackets/) | `draw` | Brackets around an emblem |
| [`TerminalSweep`](/academy/cyber-ui/interface/terminal-sweep/) | `draw` | Scan down/right |
| [`TextEcho`](/academy/cyber-ui/interface/text-echo/) | `update, draw, offset` | Offset for main text and copy |
| [`SurfaceGlitch`](/academy/cyber-ui/interface/glitch-lifecycle/) | `show, update, hide` | Slices of a live Graphics |
| [`FaultGlyph`](/academy/cyber-ui/interface/fault-glyph/) | `draw` | Warning symbol |
| [`SignalLost`](/academy/cyber-ui/interface/signal-lost/) | `draw` | Fault overlay and label position |
| [`PanelTransition`](/academy/cyber-ui/interface/panel-reveal/) | `origin` | Opening and closing geometry |
| [`AnimatedEffect`](/academy/cyber-ui/interface/custom-effects/) | `elapsedSeconds, update, setActive, setReducedMotion, dispose` | Clock and lifecycle base |
| [`ToolkitComponent`](/academy/cyber-ui/interface/sdk-components/) | `ownEffect, setUiReducedMotion, uiViewport` | SDK adapter component |
| [`PanelReveal`](/academy/cyber-ui/interface/panel-reveal/) | `runAction` | SDK adapter action |

</details>

`TriangleLoader`, `TextEcho`, and `SurfaceGlitch` also expose `elapsedSeconds`, `setActive()`, `setReducedMotion()`, and `dispose()`. They inherit the shared lifecycle from `AnimatedEffect`.

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
| [`UiEffect`](/academy/cyber-ui/interface/custom-effects/) | `update, setActive, setReducedMotion, dispose` |
| [`UiViewport`](/academy/cyber-ui/interface/sdk-components/) | `width, height, cssWidth, cssHeight, scale` |

</details>

## Shared rules

- Position and dimensions use local logical PixiJS units. Surfaces use the top-left corner; icons use the center.
- `update()` takes seconds; `*Ms` fields and `SignalBrackets` time use milliseconds. `TerminalSweep` progress is `[0, 1)`; `SignalLost` progress is `[0, 1]`.
- Drawing appends geometry. Clear a layer before rebuilding it; `TriangleLoader.draw()` clears its two dedicated surfaces itself.
- Colors are numeric RGB. Decode external JSON through the application before calling typed APIs.
- The application owns text, layout, input, fonts, audio, pause, and reduced motion. Dispose effects before destroying their borrowed objects.

