---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/terminal-sweep",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 12,
  "title": "Сканирующая полоса",
  "concept": "TerminalSweep",
  "description": "Передадим прогресс и направление сканирования.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · TerminalSweep",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/TerminalSweep.ts",
      "note": "Параметры и поведение публичного API."
    }
  ]
}
---

`TerminalSweep.draw()` рисует сканирующую линию, угловые акценты и направляющие. `down` перемещает линию сверху вниз, `right` — слева направо. Значение по умолчанию — `down`.

```ts
import { Graphics } from 'pixi.js';
import { CyberPreset, TerminalSweep } from '@gamedevland/cyber-ui';

const g = app.stage.addChild(new Graphics());
const progress = 0.5;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
TerminalSweep.draw(g.clear(), 24, 24, 360, 180,
  progress, CyberPreset.palette.accent, reduced, 'right');
```

Прогресс находится в `[0, 1)`. Вне этого диапазона ничего не добавляется; сначала очищаем отдельный слой, чтобы убрать предыдущий кадр. Для цикла приложение может передавать `(elapsedSeconds % durationSeconds) / durationSeconds`.

С reduced motion остаются угловые акценты без движущейся линии. Пауза и завершение определяются приложением; helper не создаёт timer или ticker.
