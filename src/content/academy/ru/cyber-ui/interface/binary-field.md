---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/binary-field",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 6,
  "title": "Бинарный фон",
  "concept": "BinaryField",
  "description": "Добавим автоматически меняющийся бинарный фон.",
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
import type { Ticker } from 'pixi.js';
import { BinaryField, CyberPreset } from '@gamedevland/cyber-ui';

const pattern = app.stage.addChild(new Graphics());
const bounds = { x: 24, y: 24, w: 360, h: 120 };
let seconds = 0;
let frame = -1;
const tick = (ticker: Ticker) => {
  seconds += ticker.deltaMS / 1000;
  const next = Math.floor(seconds * 8);
  if (next === frame) return;
  frame = next;
  BinaryField.draw(pattern.clear(), bounds, 12, 9, 7291, frame);
  pattern.fill({ color: CyberPreset.palette.accent, alpha: 0.25 });
};
app.ticker.add(tick);
```

После `bounds` идут срез угла, размер ячейки, seed и номер кадра. Размер ячейки — не меньше 1. Для почти пустых границ шириной или высотой до 2 единиц внутренний узор не строится.

Узор обновляется восемь раз в секунду. При удалении экрана убираем callback через `app.ticker.remove(tick)`. При reduced motion оставляем кадр `0`. Seed сохраняется между кадрами: меняется номер кадра, а не источник случайных чисел.
