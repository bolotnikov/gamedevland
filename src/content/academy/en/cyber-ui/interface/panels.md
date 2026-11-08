---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/panels",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 3,
  "title": "Panels and plates",
  "concept": "PanelSurface · TerminalGlass · TerminalUi",
  "description": "Choose a surface, add decorative lines and a scanning sweep.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · PanelSurface",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/PanelSurface.ts",
      "note": "Public API parameters and behavior."
    },
    {
      "title": "Cyber UI Toolkit · TerminalGlass",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/TerminalGlass.ts",
      "note": "Public API parameters and behavior."
    },
    {
      "title": "Cyber UI Toolkit · TerminalUi",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/TerminalUi.ts",
      "note": "Public API parameters and behavior."
    }
  ]
}
---

`TerminalGlass` suits a window, `PanelSurface` an information block, and a simple `plate` a counter. Circuit traces, etched lines, and corner accents can be added over a panel. The Decoration control shows these options.

The scanning sweep moves from top to bottom or left to right. Its direction and duration set the panel's animation.

Call `clear()` once before redrawing. Then draw the surface and its decoration: clearing between them would remove the lines already drawn.

<details><summary>Drawing methods</summary>

| Method | Adds |
| --- | --- |
| `PanelSurface.draw()` | A rectangular panel with a side rail |
| `TerminalGlass.draw()` | Glass with cut corners and highlights |
| `TerminalUi.plate()` | A simple plate |
| `TerminalUi.traces()` | Circuit board traces |
| `TerminalUi.etch()` | Short decorative lines |
| `TerminalGlass.focus()` | Corner accents and a top rail |
| `TerminalUi.clippedRect()` | A strip clipped to the panel's cut corners |
| `TerminalSweep.draw()` | A moving scanning sweep |

`PanelSurface` takes dimensions `{ x, y, w, h }` and colors `{ surface, edge, accent }`. `TerminalGlass` and `plate` also take a corner cut size. After `clippedRect()`, call `fill()` or `stroke()` to draw its path.

</details>
