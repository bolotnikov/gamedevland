---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/signal-brackets",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 9,
  "title": "Brackets around an emblem",
  "concept": "SignalBrackets",
  "description": "Add moving brackets on either side of an emblem.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · SignalBrackets",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/SignalBrackets.ts",
      "note": "Public API parameters and behavior."
    },
    {
      "title": "Cyber UI Toolkit · TriangleLoader",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/TriangleLoader.ts",
      "note": "Public API parameters and behavior."
    }
  ]
}
---

`SignalBrackets.draw()` draws two brackets that move toward an emblem and back. Its parameters set the distance from the center, travel, size, and color.

To keep the brackets clear of the triangle loader, pass its outer radius: `loader.outerRadius(radius) * visualScale`. Bracket time is measured in milliseconds.

<details><summary>Bracket settings</summary>

`cycleMs` sets the cycle duration; `travel` the inward movement; `scale` the growth during motion; and `jitter` the shake. `distanceRatio` and `maxDistance` limit the distance from the center. `halfHeight`, `bevel`, and `strokeWidth` set the shape. `alpha`, `peakAlpha`, `markerSize`, and `markerAlpha` control opacity and markers.

</details>
