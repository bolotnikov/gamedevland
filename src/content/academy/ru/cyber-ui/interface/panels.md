---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/panels",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 3,
  "title": "Панели и плашки",
  "concept": "PanelSurface · TerminalGlass · TerminalUi",
  "description": "Выберем подложку, добавим линии и сканирующую полосу.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · PanelSurface",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/PanelSurface.ts",
      "note": "Параметры и поведение публичного API."
    },
    {
      "title": "Cyber UI Toolkit · TerminalGlass",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/TerminalGlass.ts",
      "note": "Параметры и поведение публичного API."
    },
    {
      "title": "Cyber UI Toolkit · TerminalUi",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/TerminalUi.ts",
      "note": "Параметры и поведение публичного API."
    }
  ]
}
---

Для окна подойдёт `TerminalGlass`, для информационного блока — `PanelSurface`, для счётчика — простая `plate`. Поверх панели можно добавить дорожки, штрихи и выделение углов. В примере эти варианты выбираются в поле «Оформление».

Сканирующая полоса движется сверху вниз или слева направо. Меняем направление и длительность прохода, чтобы подобрать анимацию для панели.

Перед перерисовкой вызываем `clear()` один раз. Затем добавляем подложку и все её украшения: очистка между ними удалит уже нарисованные линии.

<details><summary>Методы рисования</summary>

| Метод | Что добавляет |
| --- | --- |
| `PanelSurface.draw()` | Прямоугольную панель с боковой полоской |
| `TerminalGlass.draw()` | Стекло со срезанными углами и бликами |
| `TerminalUi.plate()` | Простую плашку |
| `TerminalUi.traces()` | Дорожки, похожие на линии платы |
| `TerminalUi.etch()` | Короткие декоративные штрихи |
| `TerminalGlass.focus()` | Угловые акценты и верхнюю полоску |
| `TerminalUi.clippedRect()` | Полосу, которая учитывает срезанные края панели |
| `TerminalSweep.draw()` | Движущуюся сканирующую полосу |

`PanelSurface` принимает размеры `{ x, y, w, h }` и цвета `{ surface, edge, accent }`. У `TerminalGlass` и `plate` также задаётся размер срезанного угла. Для контура `clippedRect()` отдельно вызываем `fill()` или `stroke()`.

</details>
