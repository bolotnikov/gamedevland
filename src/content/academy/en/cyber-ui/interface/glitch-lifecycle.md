---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/glitch-lifecycle",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 11,
  "title": "Surface distortion",
  "concept": "SurfaceGlitch · UiEffect",
  "description": "Add brief horizontal strip shifts to a panel.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · SurfaceGlitch",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/SurfaceGlitch.ts",
      "note": "Target registration and deterministic timing."
    },
    {
      "title": "PixiJS · Graphics",
      "url": "https://pixijs.com/8.x/guides/components/scene-objects/graphics",
      "note": "Shared GraphicsContext and destruction."
    }
  ]
}
---

`SurfaceGlitch` briefly shifts individual strips of a `Graphics` object. Pass the panel and its dimensions to `show()`, then call `update()` every frame.

Add the panel to the scene first and keep it free of its own mask. The effect distorts only its drawing: a separate label next to the panel stays in place.

`hide()` removes the distortion. When the effect is no longer needed, call `dispose()` before removing the panel.

<details><summary>Settings and restarting</summary>

`durationMs` sets the pulse duration, `minDelayMs` the minimum pause, `spreadMs` the pause variation, and `seed` the initial value for a repeatable animation.

Pass a list of panels and a delay in milliseconds to `show(key, targets, revealDelayMs)`. The same `key` updates the list without restarting; a different key restarts the effect. Each list item contains `surface` and its local `x`, `y`, `w`, and `h`.

</details>
