---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/buttons",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": true,
  "order": 4,
  "title": "Кнопка и её состояние",
  "concept": "ButtonSurface",
  "description": "Соединим оформление кнопки с областью нажатия.",
  "takeaway": [
    "enabled меняет рисунок; блокировку ввода задаёт приложение."
  ],
  "sources": [
    {
      "title": "Cyber UI Toolkit · ButtonSurface",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/ButtonSurface.ts",
      "note": "Варианты и визуальные состояния."
    },
    {
      "title": "PixiJS · Events",
      "url": "https://pixijs.com/8.x/guides/components/events",
      "note": "eventMode, hitArea и pointertap."
    }
  ]
}
---

`ButtonSurface.draw()` рисует кнопку от локальной точки `(0, 0)`. Для работы нажатия отдельно зададим [область ввода](https://pixijs.com/8.x/guides/components/events).

```ts
import { Graphics, Rectangle } from 'pixi.js';
import { ButtonSurface, CyberPreset, TerminalUi } from '@gamedevland/cyber-ui';

const button = app.stage.addChild(new Graphics());
const t = CyberPreset.palette;
button.position.set(48, 160);
ButtonSurface.draw(button, {
  width: 220, height: 56, variant: 'primary',
  enabled: true, selected: false,
}, t);
TerminalUi.icon(button, 'play', 28, 28, 20, t.background);
button.hitArea = new Rectangle(0, 0, 220, 56);
button.eventMode = 'static';
button.on('pointertap', () => { console.log('Start requested'); });
```

Это ввод обычного Pixi-проекта. В SDK используется `node.input`. Текст, клавиатурная навигация, focus и действие кнопки остаются у приложения.

| Вариант | Когда применять |
| --- | --- |
| `primary`, `danger` | Основное или опасное действие |
| `module`, `icon` | Карточка модуля или кнопка с иконкой |
| `nav`, `segment` | Выбранный пункт или сегмент |
| `switch` | Подложка переключателя |
| `utility`, `line` | Нижняя линия или отсутствие подложки |

У `nav` и `segment` рисунок появляется при `selected: true`. Для ползунка переключателя дополнительно вызови `ButtonSurface.toggle(button, 220, 56, selected, t)`. При смене состояния очисти рисунок и обнови ввод и подпись.
