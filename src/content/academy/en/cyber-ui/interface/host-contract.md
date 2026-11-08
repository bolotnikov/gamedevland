---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/host-contract",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 2,
  "title": "Who controls the interface",
  "concept": "Responsibilities",
  "description": "Separate appearance, data, and interaction.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · README",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit#readme",
      "note": "Local dimensions and resource ownership contracts."
    },
    {
      "title": "PixiJS · Container",
      "url": "https://pixijs.com/8.x/guides/components/scene-objects/container",
      "note": "Object hierarchy and transforms."
    }
  ]
}
---

The toolkit receives a surface and its parameters. It does not choose the screen size, load fonts, or call game commands. The same panel can therefore appear in a menu, shop, or combat HUD.

<figure class="sdk-boundary">
  <div class="sdk-boundary__modules">
    <section class="sdk-boundary__module-group is-cyan"><h4>The application decides</h4><ul><li><code>layout</code><span>Size and position</span></li><li><code>content</code><span>Text and data</span></li><li><code>input</code><span>Press and action</span></li><li><code>time</code><span>Pause and motion</span></li></ul></section>
    <section class="sdk-boundary__module-group is-green"><h4>The toolkit draws</h4><ul><li><code>surface</code><span>Background and edges</span></li><li><code>icon</code><span>Vector symbol</span></li><li><code>state</code><span>Item selection</span></li><li><code>effect</code><span>Animation frame</span></li></ul></section>
  </div><figcaption>Scene objects remain owned by the application. An effect releases only the resources it creates.</figcaption>
</figure>

Coordinates use the [container’s](https://pixijs.com/8.x/guides/components/scene-objects/container) local logical units. If the parent is scaled by two, the panel and its icons scale together. There is no need to pass physical canvas pixels instead of local dimensions.

We redraw a static surface when its size, palette, or state changes. Animation needs continuous ticker updates; a stationary frame does not.
