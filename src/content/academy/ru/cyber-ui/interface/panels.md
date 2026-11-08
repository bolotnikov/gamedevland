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
  "description": "Выберем поверхность для информации, окна и счётчика.",
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

`PanelSurface.draw()` рисует спокойную информационную панель с боковой полоской. `TerminalGlass.draw()` добавляет срезанные углы, световые грани и полупрозрачные слои. `TerminalUi.plate()` подходит для простой плашки или счётчика.

Все три дописывают геометрию в [Graphics](https://pixijs.com/8.x/guides/components/scene-objects/graphics). Очищаем рисунок один раз перед перестроением.

```ts
import { Graphics } from 'pixi.js';
import { CyberPreset, PanelSurface, TerminalGlass, TerminalUi } from '@gamedevland/cyber-ui';

const g = app.stage.addChild(new Graphics());
const t = CyberPreset.palette;
g.clear();
PanelSurface.draw(g, { x: 24, y: 24, w: 200, h: 120 }, {
  surface: t.panel, edge: t.panelEdge, accent: t.accent,
});
TerminalGlass.draw(g, 240, 24, 200, 120, 12,
  t.panel, t.panelEdge, t.accent, t.text);
TerminalUi.plate(g, 24, 168, 160, 36, 7, t.inset, t.panelEdge);
TerminalUi.icon(g, 'credit', 44, 186, 18, t.accent);
```

У `PanelSurface` размеры передаются как `UiBounds` (`x`, `y`, `w`, `h`), цвета — как `PanelPalette` (`surface`, `edge`, `accent`).

У `TerminalGlass` после координат и размеров идут срез угла, заливка, рамка, акцент и светлый цвет. У `plate` — срез, заливка, рамка и необязательная прозрачность заливки. Срез автоматически ограничивается размером поверхности.

Текст и расположение содержимого задаёт приложение. Для кнопок применяем `ButtonSurface`; портреты и игровые карточки собираем из этих примитивов, они не являются отдельными панелями toolkit.
