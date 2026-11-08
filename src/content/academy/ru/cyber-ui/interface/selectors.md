---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/selectors",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 5,
  "title": "Навигация, сегменты и вкладки",
  "concept": "nav · segment · tab",
  "description": "Соберём группу, в которой выбран один пункт.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · ButtonSurface",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/ButtonSurface.ts",
      "note": "Параметры и поведение публичного API."
    },
    {
      "title": "Cyber UI Toolkit · TerminalGlass",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/TerminalGlass.ts",
      "note": "Параметры и поведение публичного API."
    }
  ]
}
---

`nav` подходит для нижнего меню. Все пункты лежат на одной стеклянной панели, выбранный пункт получает лёгкую заливку и верхнюю полоску.

`segment` удобен для выбора периода — например, дня или недели. У группы одна рамка, а заливка есть только у выбранного сегмента. `tab` рисует отдельные вкладки, например для портретов персонажей.

В примере нажатие меняет выбранный пункт. За переключение страницы или содержимого отвечает обработчик этого нажатия в игре.
