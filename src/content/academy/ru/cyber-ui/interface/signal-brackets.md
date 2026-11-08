---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/signal-brackets",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 11,
  "title": "Скобки вокруг эмблемы",
  "concept": "SignalBrackets",
  "description": "Настроим движение скобок и место для центрального рисунка.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · SignalBrackets",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/SignalBrackets.ts",
      "note": "Параметры и поведение публичного API."
    },
    {
      "title": "Cyber UI Toolkit · TriangleLoader",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/TriangleLoader.ts",
      "note": "Параметры и поведение публичного API."
    }
  ]
}
---

`SignalBrackets.draw()` рисует две скобки вокруг центра. Приложение передаёт прошедшие миллисекунды и радиус, который нужно оставить свободным. Для загрузчика этот радиус получаем через `loader.outerRadius(radius) * visualScale`.

```ts
import { Graphics } from 'pixi.js';
import { CyberPreset, SignalBrackets } from '@gamedevland/cyber-ui';
import type { BracketOptions } from '@gamedevland/cyber-ui';

const g = app.stage.addChild(new Graphics());
const options: BracketOptions = {
  cycleMs: 2400, travel: 12, scale: 0.08, jitter: 1,
  distanceRatio: 0.3, maxDistance: 200, halfHeight: 48, bevel: 10,
  strokeWidth: 2, alpha: 0.45, peakAlpha: 1, markerSize: 8, markerAlpha: 0.7,
};
let elapsedMs = 0;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const tick = (ticker: import('pixi.js').Ticker) => {
  elapsedMs += ticker.deltaMS;
  SignalBrackets.draw(g.clear(), options, app.screen.width, 160,
    64, 1, elapsedMs, 90, reduced,
    CyberPreset.palette.accent, CyberPreset.palette.signal);
};
app.ticker.add(tick);
// On screen removal: app.ticker.remove(tick);
```

После настроек передаём ширину, `centerY`, свободный радиус, визуальный масштаб, время, длительность дискретного кадра, reduced motion и два цвета.

`cycleMs` задаёт период, `travel` — ход внутрь, `scale` — дополнительное увеличение, `jitter` — дрожание. `distanceRatio` и `maxDistance` ограничивают расстояние от центра. Остальные поля задают форму, толщину и прозрачность; alpha-поля лежат в `[0, 1]`. При reduced motion скобки остаются неподвижными.
