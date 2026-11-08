---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/text-echo",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 10,
  "title": "Colored text echo",
  "concept": "TextEcho",
  "description": "Add a colored copy that shifts slightly behind the text.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · TextEcho",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/TextEcho.ts",
      "note": "Offset, phase, and hiding the echo."
    }
  ]
}
---

For `TextEcho`, create two matching `Text` objects: the main label and a copy in another color. The effect shifts them in opposite directions and briefly reveals the copy.

`frameMs` sets the duration of one shift, `cycleMs` its repeat period, and `shift` its distance. Text, font, and color remain regular PixiJS properties.

`setReducedMotion(true)` hides the copy. `setActive(false)` pauses the animation on the current frame.

<details><summary>Additional parameters</summary>

In `draw(primary, echo, x, y, enabled, phaseOffsetMs)`, `enabled` can disable the echo and `phaseOffsetMs` can shift its starting phase. The effect is enabled by default, with a phase offset of `0`. `offset(phaseOffsetMs)` returns the displacement without drawing.

</details>
