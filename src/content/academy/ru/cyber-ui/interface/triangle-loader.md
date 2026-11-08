---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/triangle-loader",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 10,
  "title": "Анимированный загрузчик",
  "concept": "TriangleLoader",
  "description": "Подключим треугольник к существующему ticker.",
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

При удалении экрана сначала убираем callback и освобождаем эффект:

```ts
app.ticker.remove(tick);
loader.dispose();
```

После этого можно уничтожать `emblem` и `dust`. Тулкит не уничтожает переданные ему поверхности.

<details><summary>Настройки TriangleOptions</summary>

| Поле | Назначение |
| --- | --- |
| `cycleMs`, `spinDelayMs`, `spinDurationMs` | Период движения, пауза до вращения, длительность вращения в мс |
| `layers`, `layerGap`, `layerLift` | Число контуров (1–32), промежуток, подъём |
| `strokeWidth`, `haloWidth` | Толщина линии и ореола |
| `haloAlpha`, `echoAlpha` | Прозрачность ореола и копии [0, 1] |
| `particles`, `particleSize`, `particleSpread`, `particleAlpha` | Количество (0–1024), размер, разброс, прозрачность [0, 1] |
| `seed` | Целое число 0–4294967295 для повторяемой геометрии |

`TriangleLayout` содержит `x`, `y`, положительные `radius` и `scale`. `TrianglePalette` содержит `accent`, `secondary`, `highlight`, `text`. Настройки получаем копированием `CyberPreset.triangle` и `CyberPreset.trianglePalette`. `outerRadius(radius)` вычисляет свободное место для наружных слоёв до применения масштаба.

</details>
