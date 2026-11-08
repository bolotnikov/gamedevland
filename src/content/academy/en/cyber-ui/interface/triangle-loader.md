---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/triangle-loader",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 8,
  "title": "Animated loader",
  "concept": "TriangleLoader",
  "description": "Add a rotating triangle and particles.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · TriangleLoader",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/TriangleLoader.ts",
      "note": "Loader settings and borrowed Graphics objects."
    },
    {
      "title": "PixiJS · Ticker",
      "url": "https://pixijs.com/8.x/guides/components/ticker",
      "note": "Ticker subscription and deltaMS."
    }
  ]
}
---

`TriangleLoader` draws in two `Graphics` objects: one for the triangle and one for particles. Reserve these objects for the loader: it clears both whenever it draws.

Call `update()` and `draw()` every frame. `update()` takes seconds, so divide PixiJS `ticker.deltaMS` by `1000`.

When the loader is no longer needed, remove its ticker handler and call `dispose()`. The `Graphics` objects can then be removed from the scene.

<details><summary>TriangleOptions settings</summary>

| Field | Purpose |
| --- | --- |
| `cycleMs`, `spinDelayMs`, `spinDurationMs` | Motion period, delay before rotation, rotation duration in ms |
| `layers`, `layerGap`, `layerLift` | Outline count (1-32), gap, and lift |
| `strokeWidth`, `haloWidth` | Line and halo width |
| `haloAlpha`, `echoAlpha` | Halo and echo opacity [0, 1] |
| `particles`, `particleSize`, `particleSpread`, `particleAlpha` | Count (0-1024), size, spread, and opacity [0, 1] |
| `seed` | Integer from 0 to 4294967295 for a repeatable pattern |

`TriangleLayout` contains `x`, `y`, and positive `radius` and `scale`. `TrianglePalette` contains `accent`, `secondary`, `highlight`, and `text`. For custom settings, copy `CyberPreset.triangle` and `CyberPreset.trianglePalette`. `outerRadius(radius)` calculates the space needed by the outer layers at scale 1.

</details>
