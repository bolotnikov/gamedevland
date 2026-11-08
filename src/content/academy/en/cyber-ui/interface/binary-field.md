---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/binary-field",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 7,
  "title": "Binary background",
  "concept": "BinaryField",
  "description": "Add a changing pattern of zeros and ones.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · BinaryField",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/BinaryField.ts",
      "note": "Seed, frame number, and pattern generation."
    }
  ]
}
---

`BinaryField.draw()` draws a pattern from a frame number. In the example, the frame changes eight times per second. Symbol size, frame rate, and opacity can be adjusted separately.

The `seed` parameter sets the initial pattern. The same dimensions, `seed`, and frame number produce the same pattern. To keep it changing consistently, preserve `seed` and increase only the frame number.

After `draw()`, call `fill()` with the chosen color. When animation is disabled, keep frame `0`.
