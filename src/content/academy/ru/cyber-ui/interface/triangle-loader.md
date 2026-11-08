---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/triangle-loader",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 8,
  "title": "Анимированный загрузчик",
  "concept": "TriangleLoader",
  "description": "Добавим вращающийся треугольник и частицы.",
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

`TriangleLoader` рисует в двух объектах `Graphics`: в одном — треугольник, в другом — частицы. Эти объекты используем только для загрузчика: при каждом рисовании он очищает их.

В каждом кадре вызываем `update()` и `draw()`. В `update()` передаём секунды, поэтому время PixiJS `ticker.deltaMS` делим на `1000`.

Когда загрузчик больше не нужен, убираем обработчик из ticker и вызываем `dispose()`. Сами объекты `Graphics` после этого можно удалить со сцены.

<details><summary>Настройки TriangleOptions</summary>

| Поле | Назначение |
| --- | --- |
| `cycleMs`, `spinDelayMs`, `spinDurationMs` | Период движения, пауза до вращения, длительность вращения в мс |
| `layers`, `layerGap`, `layerLift` | Число контуров (1–32), промежуток, подъём |
| `strokeWidth`, `haloWidth` | Толщина линии и ореола |
| `haloAlpha`, `echoAlpha` | Прозрачность ореола и копии [0, 1] |
| `particles`, `particleSize`, `particleSpread`, `particleAlpha` | Количество (0–1024), размер, разброс, прозрачность [0, 1] |
| `seed` | Целое число 0–4294967295 для повторяемого рисунка |

`TriangleLayout` содержит `x`, `y`, положительные `radius` и `scale`. `TrianglePalette` содержит `accent`, `secondary`, `highlight`, `text`. Для своих настроек копируем `CyberPreset.triangle` и `CyberPreset.trianglePalette`. `outerRadius(radius)` вычисляет свободное место для наружных слоёв при масштабе 1.

</details>
