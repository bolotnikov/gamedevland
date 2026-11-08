---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/surface-details",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 8,
  "title": "Линии и акценты поверхности",
  "concept": "focus · traces · etch · clippedRect",
  "description": "Добавим декор, не удаляя уже нарисованную панель.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · TerminalUi",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/TerminalUi.ts",
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

Сначала рисуем подложку, затем дописываем декоративные слои в тот же `Graphics`. `traces()` добавляет дорожки, `etch()` — короткие штрихи, `focus()` — угловые акценты и верхнюю полоску.

```ts
import { Graphics } from 'pixi.js';
import { CyberPreset, TerminalGlass, TerminalUi } from '@gamedevland/cyber-ui';

const g = app.stage.addChild(new Graphics());
const t = CyberPreset.palette;
const area = { x: 24, y: 24, w: 360, h: 180 };
g.clear();
TerminalUi.plate(g, area.x, area.y, area.w, area.h, 12, t.panel, t.panelEdge, 0.9);
TerminalUi.traces(g, area.x, area.y, area.w, area.h, t.accent);
TerminalUi.etch(g, area.x, area.y, area.w, area.h, t.accent);
TerminalGlass.focus(g, area.x, area.y, area.w, area.h, t.signal);
TerminalUi.clippedRect(g, area, 12, 24, 28, 360, 8);
g.fill({ color: t.accent, alpha: 0.2 });
```

`clippedRect(g, area, cut, x, y, w, h)` добавляет контур полосы с учётом срезанных боковых границ. Для него отдельно вызываем `fill()` или `stroke()`. По вертикали полосу размещаем внутри `area`: это не универсальная маска.

Последний аргумент `plate()` — прозрачность заливки от `0` до `1`; рамка рисуется отдельно. `etch()` ничего не добавляет при ширине меньше `70` или высоте меньше `28`. Между слоями не вызываем `clear()`.
