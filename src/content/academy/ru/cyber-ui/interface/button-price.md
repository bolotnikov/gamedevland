---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/button-price",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 6,
  "title": "Подпись и цена кнопки",
  "concept": "ButtonPrice.layout",
  "description": "Уместим локализованную подпись, валюту и сумму в одну строку.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · ButtonPrice",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/ButtonPrice.ts",
      "note": "Параметры и поведение публичного API."
    }
  ]
}
---

`ButtonPrice.layout()` вычисляет положение трёх элементов и общий масштаб. Длинная подпись уменьшает всю строку, сохраняя зазоры и центрирование. Сами текстовые объекты и иконку создаёт приложение.

<details><summary>Код примера</summary>

```ts
import { Container, Graphics, Text } from 'pixi.js';
import { ButtonPrice, ButtonSurface, CyberPreset, TerminalUi } from '@gamedevland/cyber-ui';

const button = app.stage.addChild(new Container());
const surface = button.addChild(new Graphics());
const t = CyberPreset.palette;
const label = button.addChild(new Text({ text: 'UPGRADE', style: { fontSize: 18, fill: t.background } }));
const amount = button.addChild(new Text({ text: '250', style: { fontSize: 18, fill: t.background } }));
label.anchor.set(0.5);
amount.anchor.set(0.5);

function redraw(width: number) {
  label.scale.set(1);
  amount.scale.set(1);
  const row = ButtonPrice.layout(width, label.width, amount.width, 18, 8, 12);
  ButtonSurface.draw(surface.clear(), {
    width, height: 56, variant: 'primary', enabled: true, selected: false,
  }, t);
  label.scale.set(row.scale);
  amount.scale.set(row.scale);
  label.position.set(row.labelX, 28);
  amount.position.set(row.amountX, 28);
  TerminalUi.icon(surface, 'credit', row.iconX, 28, row.iconSize, t.background);
}
redraw(248);
// After localization or resize, update text and call redraw() again.
```

</details>

Аргументы по порядку: ширина кнопки, измеренная ширина подписи, ширина суммы, размер иконки, зазор и горизонтальный отступ. Возвращаются `scale`, `labelX`, `iconX`, `amountX`, `iconSize`.

Перед повторным измерением возвращаем масштаб текста к `1`. Иначе измерим уже уменьшенную строку. Ширина и размер иконки должны быть положительными; остальные размеры — неотрицательными, отступ — не больше половины ширины.
