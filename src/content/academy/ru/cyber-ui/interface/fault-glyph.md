---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/fault-glyph",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 15,
  "title": "Знак ошибки",
  "concept": "FaultGlyph",
  "description": "Нарисуем предупреждение и зададим искажение.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · FaultGlyph",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/FaultGlyph.ts",
      "note": "Параметры и поведение публичного API."
    }
  ]
}
---

`FaultGlyph.draw()` строит знак предупреждения из трёх горизонтальных частей. `distortion` сдвигает их и добавляет цветные фрагменты. При `0` получается неподвижный целый знак.

```ts
import { Graphics } from 'pixi.js';
import { CyberPreset, FaultGlyph } from '@gamedevland/cyber-ui';

const g = app.stage.addChild(new Graphics());
const t = CyberPreset.palette;
FaultGlyph.draw(g.clear(), 240, 160, t.danger, t.signal, 1, 8, 6);
```

Аргументы: `Graphics`, центр `x/y`, основной цвет, цвет эха, прозрачность `[0, 1]`, искажение и положительный масштаб. Масштаб необязателен, по умолчанию `1`.

Текст предупреждения и его игровое действие задаёт приложение. При reduced motion передаём `distortion: 0`; отдельного lifecycle у этого helper нет.
