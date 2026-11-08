---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/selectors",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 5,
  "title": "Navigation, segments, and tabs",
  "concept": "nav · segment · tab",
  "description": "Build a group with one selected item.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · ButtonSurface",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/ButtonSurface.ts",
      "note": "Public API parameters and behavior."
    },
    {
      "title": "Cyber UI Toolkit · TerminalGlass",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/TerminalGlass.ts",
      "note": "Public API parameters and behavior."
    }
  ]
}
---

`nav` suits a bottom menu. All items share one glass panel; the selected item gets a subtle fill and a top rail.

`segment` suits a period selector, such as day or week. The group has one border, and only the selected segment has a fill. `tab` draws separate tabs, for example for character portraits.

Tapping the example changes the selected item. The game's tap handler decides which page or content to open.
