---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/binary-field",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": true,
  "order": 6,
  "title": "Бинарный фон",
  "concept": "BinaryField",
  "description": "Получим воспроизводимый узор из seed и номера кадра.",
  "takeaway": [
    "draw добавляет контуры; цвет и прозрачность задаёт fill."
  ],
  "sources": [
    {
      "title": "Cyber UI Toolkit · BinaryField",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/BinaryField.ts",
      "note": "Seed, frame и построение узора."
    }
  ]
}
---

`BinaryField.draw()` строит узор нулей и единиц. Он не считает время: приложение передаёт целый номер кадра. Одинаковые размеры, seed и кадр дают одинаковую геометрию.

```ts
import { Graphics } from 'pixi.js';
import { BinaryField, CyberPreset } from '@gamedevland/cyber-ui';

const pattern = app.stage.addChild(new Graphics());
const bounds = { x: 24, y: 24, w: 360, h: 120 };
BinaryField.draw(pattern.clear(), bounds, 12, 9, 7291, 0);
pattern.fill({ color: CyberPreset.palette.accent, alpha: 0.18 });
```

После `bounds` идут срез угла, размер ячейки, seed и номер кадра. Размер ячейки — не меньше 1. Для почти пустых границ шириной или высотой до 2 единиц внутренний узор не строится.

Для анимации накапливай секунды в своём владельце экрана и вычисляй `Math.floor(elapsedSeconds * 8)`. Перестраивай рисунок, когда этот номер изменился. При паузе не меняй время, при reduced motion оставь кадр `0`. Не используй случайный seed на каждом кадре: потеряется воспроизводимость.
