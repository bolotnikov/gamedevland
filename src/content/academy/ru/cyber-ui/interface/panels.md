---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/panels",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 3,
  "title": "Панель и плашка",
  "concept": "TerminalGlass · TerminalUi",
  "description": "Разберём поверхности окон, карточек и кнопок из игры.",
  "takeaway": [
    "Сначала очищаем поверхность, затем добавляем все её слои."
  ],
  "sources": [
    {
      "title": "Cyber UI Toolkit · surfaces",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/TerminalGlass.ts",
      "note": "Порядок параметров стеклянной панели."
    },
    {
      "title": "PixiJS · Graphics",
      "url": "https://pixijs.com/8.x/guides/components/scene-objects/graphics",
      "note": "Накопление геометрии и clear()."
    }
  ]
}
---

`TerminalGlass.draw()` добавляет грани и полупрозрачные слои. `TerminalUi.plate()` рисует простую плашку со срезанными углами. Обе функции дописывают геометрию в [Graphics](https://pixijs.com/8.x/guides/components/scene-objects/graphics).

```ts
import { Graphics } from 'pixi.js';
import { CyberPreset, TerminalGlass, TerminalUi } from '@gamedevland/cyber-ui';

const g = app.stage.addChild(new Graphics());
const t = CyberPreset.palette;
g.position.set(24, 24);
g.clear();
TerminalGlass.draw(g, 0, 0, 360, 220, 12,
  t.panel, t.panelEdge, t.accent, t.text);
TerminalUi.plate(g, 20, 20, 140, 36, 7, t.inset, t.panelEdge);
TerminalUi.icon(g, 'credit', 40, 38, 18, t.accent);
```

Первые четыре числа после `g` — `x`, `y`, ширина и высота. Следующее — величина среза угла. Панель автоматически ограничивает срез относительно размеров.

Для дополнительных акцентов есть `TerminalGlass.focus()` и `TerminalUi.etch()`. Вызывай их после подложки. Не делай `clear()` между слоями одной панели: он удалит уже добавленную геометрию. Текст счётчика добавляется отдельным `Text` в приложении.

В AI Defender эти вызовы используются в разных сочетаниях: окно получает тень и стеклянную поверхность, плашка — плоскую заливку, квадратная кнопка — иконку по центру. Карточка агента и ячейка исследования добавляют состояние выбора; кнопка модуля — акцентную полоску.

В галерее показано оформление этих шести элементов. Игровые портреты не входят в тулкит: в карточке вместо них используется векторная иконка. В форме можно выбрать элемент, отключить стекло и изменить размеры и цвета.
