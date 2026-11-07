---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/triangle-loader",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": true,
  "order": 7,
  "title": "Анимированный загрузчик",
  "concept": "TriangleLoader",
  "description": "Подключим треугольник к существующему ticker.",
  "takeaway": [
    "update принимает секунды, draw — актуальные локальные размеры."
  ],
  "sources": [
    {
      "title": "Cyber UI Toolkit · TriangleLoader",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/TriangleLoader.ts",
      "note": "Настройки загрузчика и borrowed Graphics."
    },
    {
      "title": "PixiJS · Ticker",
      "url": "https://pixijs.com/8.x/guides/components/ticker",
      "note": "Подписка и deltaMS."
    }
  ]
}
---

Загрузчик получает два отдельных `Graphics`: контуры треугольника и частицы. Он сам очищает их при отрисовке. Время берём из существующего [ticker приложения](https://pixijs.com/8.x/guides/components/ticker).

```ts
import { Graphics } from 'pixi.js';
import type { Ticker } from 'pixi.js';
import { CyberPreset, TriangleLoader } from '@gamedevland/cyber-ui';

const emblem = app.stage.addChild(new Graphics());
const dust = app.stage.addChild(new Graphics());
const loader = new TriangleLoader(CyberPreset.triangle);
const tick = (ticker: Ticker) => {
  loader.update(ticker.deltaMS / 1000);
  loader.draw(emblem, dust,
    { x: app.screen.width / 2, y: 120, radius: 64, scale: 1 },
    CyberPreset.trianglePalette);
};
app.ticker.add(tick);
```

Деление на `1000` переводит миллисекунды в секунды. `ticker.deltaTime` — другой показатель, передавать его как секунды нельзя. Изменение размеров в `draw()` не сбрасывает анимацию.

При удалении экрана сначала убери callback и освободи эффект:

```ts
app.ticker.remove(tick);
loader.dispose();
```

После этого можно уничтожать `emblem` и `dust`. Тулкит не уничтожает переданные ему поверхности.
