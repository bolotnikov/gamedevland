---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/icons-theme",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 6,
  "title": "Иконки и цвета",
  "concept": "TerminalIcon · CyberPreset",
  "description": "Выберем иконку и изменим цвет интерфейса.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · TerminalUi",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/TerminalUi.ts",
      "note": "Полный набор имён и геометрия иконок."
    },
    {
      "title": "Cyber UI Toolkit · CyberPreset",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/CyberPreset.ts",
      "note": "Неизменяемые настройки по умолчанию."
    }
  ]
}
---

`TerminalUi.icon()` рисует иконку по имени. После имени передаём координаты её центра, размер и цвет. Тип `TerminalIcon` помогает выбрать допустимое имя в редакторе.

Цвета по умолчанию находятся в `CyberPreset.palette`. Чтобы изменить тему, создаём копию палитры: `{ ...CyberPreset.palette, accent: 0x68e0cb }`. Саму исходную палитру менять нельзя.

<details><summary>Все иконки и цвета</summary>

```text
chip battle agents skills quests gear bolt calendar credit capsule key left right exit play lock chest check speed target burst repair heart scan snow boss flag
```
`ButtonPalette` содержит `background`, `panel`, `inset`, `panelEdge`, `signal`, `focus`, `accent`, `steel`, `sapphire`, `text`, `muted`, `danger`. Например, `signal` задаёт полоску выбранного `nav`, а `sapphire` — заливку выбранного `segment`.

</details>
