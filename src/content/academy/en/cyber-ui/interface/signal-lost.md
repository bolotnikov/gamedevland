---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/signal-lost",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 13,
  "title": "Signal loss animation",
  "concept": "SignalLost",
  "description": "Show a dimmed screen, strips, and an error message.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · SignalLost",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/SignalLost.ts",
      "note": "Public API parameters and behavior."
    },
    {
      "title": "Cyber UI Toolkit · FaultGlyph",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/FaultGlyph.ts",
      "note": "Public API parameters and behavior."
    }
  ]
}
---

`SignalLost.draw()` draws a signal loss screen: it dims the background and adds strips and an error symbol. The example repeats the animation with a short pause.

For one playback, increase `progress` from `0` to `1`. The drawing disappears completely at the end. Create the label as a separate `Text` object; the method returns its position `x/y`, opacity `fade`, and displacement `shift`.

When motion is disabled, show a static error symbol and text instead.
