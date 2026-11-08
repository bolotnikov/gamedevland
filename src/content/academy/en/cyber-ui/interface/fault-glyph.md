---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/fault-glyph",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 12,
  "title": "Animated error glyph",
  "concept": "FaultGlyph",
  "description": "Add a warning symbol with distortion.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · FaultGlyph",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/FaultGlyph.ts",
      "note": "Public API parameters and behavior."
    }
  ]
}
---

`FaultGlyph.draw()` draws a warning symbol. The `distortion` parameter shifts parts of the symbol and adds colored fragments. The example changes this value over time, so the symbol moves.

A larger `distortion` produces a stronger effect. At `0`, the symbol stays intact. Position uses the center coordinates; `scale` sets the size.

When motion is disabled, draw the symbol with zero distortion.
