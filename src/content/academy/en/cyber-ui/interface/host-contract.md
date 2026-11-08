---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/host-contract",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 2,
  "title": "Using UI elements",
  "concept": "PixiJS elements",
  "description": "Add visual styles to PixiJS objects.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · README",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit#readme",
      "note": "Local dimensions and resource ownership."
    },
    {
      "title": "PixiJS · Container",
      "url": "https://pixijs.com/8.x/guides/components/scene-objects/container",
      "note": "Object hierarchy and transforms."
    }
  ]
}
---

The library draws in a regular `Graphics` object. We create the object, add it to the scene, and call a method such as `TerminalGlass.draw()` for a panel. Text uses a separate `Text` object; PixiJS or the game engine handles input.

<figure class="sdk-boundary"><div class="sdk-boundary__modules">
<section class="sdk-boundary__module-group is-cyan"><h4>Library</h4><ul><li><code>Graphics</code><span>Draws panels and icons</span></li><li><code>update()</code><span>Updates an effect</span></li></ul></section>
<section class="sdk-boundary__module-group is-green"><h4>Game code</h4><ul><li><code>Text</code><span>Adds a label</span></li><li><code>pointertap</code><span>Handles a tap</span></li></ul></section>
</div></figure>

Coordinates are relative to the [container](https://pixijs.com/8.x/guides/components/scene-objects/container). Scaling it by two scales the panel, text, and icons together.

A static panel needs redrawing only when its size or color changes. Animation updates every frame.
