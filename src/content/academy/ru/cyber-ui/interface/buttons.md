---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/buttons",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 4,
  "title": "Кнопки и состояния",
  "concept": "ButtonSurface",
  "description": "Соединим все варианты оформления с вводом и подписью.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · ButtonSurface",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/ButtonSurface.ts",
      "note": "Параметры и поведение публичного API."
    }
  ]
}
---

`ButtonSurface.draw()` рисует от локальной точки `(0, 0)`. Обязательные поля: `width`, `height`, `variant`, `enabled`, `selected`. `explicitAccent` включает полоску модуля, `ready` добавляет акцент доступной награды поверх выбранного оформления.

```ts
import { Graphics, Rectangle, Text } from 'pixi.js';
import { ButtonSurface, CyberPreset } from '@gamedevland/cyber-ui';

const button = app.stage.addChild(new Graphics());
const t = CyberPreset.palette;
const label = button.addChild(new Text({ text: 'CLAIM', style: { fill: t.text, fontSize: 18 } }));
label.anchor.set(0.5);
label.position.set(110, 28);
label.eventMode = 'none';
let enabled = true;
function redraw() {
  ButtonSurface.draw(button.clear(), {
    width: 220, height: 56, variant: 'module', enabled, selected: false,
    explicitAccent: true, ready: true,
  }, t);
  button.eventMode = enabled ? 'static' : 'none';
  button.hitArea = new Rectangle(0, 0, 220, 56);
  button.alpha = enabled ? 1 : 0.42;
}
button.on('pointertap', () => { enabled = false; redraw(); });
redraw();
```

<details><summary>Все варианты ButtonSurface</summary>

| Вариант | Оформление |
| --- | --- |
| `primary` | Сплошной акцент при `enabled`; иначе стекло |
| `module` | Стекло и боковая полоска при enabled, selected или explicitAccent |
| `danger` | Стекло с цветом danger |
| `icon` | Скруглённая подложка; selected меняет заливку и рамку |
| `nav` | Только лёгкая активная заливка и верхняя полоска |
| `segment` | Только заливка выбранного сегмента |
| `tab` | Отдельная рамка, заливка и активное подчёркивание |
| `switch` | Стеклянная подложка; ползунок добавляется через toggle |
| `utility` | Нижняя линия |
| `line` | Без подложки |

</details>

`enabled` меняет оформление, но не отключает [ввод PixiJS](https://pixijs.com/8.x/guides/components/events). Поэтому обновляем `eventMode`, прозрачность и подпись в приложении. В SDK используем `node.input`.

Для `switch` после `draw()` добавляем `ButtonSurface.toggle(button, width, height, selected, palette)`. Hover, pressed, клавиатурный focus и hit area принадлежат приложению. Общие подложки `nav` и `segment` разбираются в следующем уроке.
