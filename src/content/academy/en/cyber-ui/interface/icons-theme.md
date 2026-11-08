---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/icons-theme",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 6,
  "title": "Icons and colors",
  "concept": "TerminalIcon · CyberPreset",
  "description": "Choose an icon and change the UI colors.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · TerminalUi",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/TerminalUi.ts",
      "note": "The complete icon names and their geometry."
    },
    {
      "title": "Cyber UI Toolkit · CyberPreset",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/CyberPreset.ts",
      "note": "Immutable default settings."
    }
  ]
}
---

`TerminalUi.icon()` draws an icon by name. The remaining arguments are its center coordinates, size, and color. The `TerminalIcon` type helps select a valid name in the editor.

Default colors live in `CyberPreset.palette`. To change the theme, create a palette copy: `{ ...CyberPreset.palette, accent: 0x68e0cb }`. Keep the original palette unchanged.

<details><summary>All icons and colors</summary>

```text
chip battle agents skills quests gear bolt calendar credit capsule key left right exit play lock chest check speed target burst repair heart scan snow boss flag
```

`ButtonPalette` contains `background`, `panel`, `inset`, `panelEdge`, `signal`, `focus`, `accent`, `steel`, `sapphire`, `text`, `muted`, and `danger`. For example, `signal` colors the selected `nav` rail, while `sapphire` fills the selected `segment`.

</details>
