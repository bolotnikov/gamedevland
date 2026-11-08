---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/signal-brackets",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 9,
  "title": "Скобки вокруг эмблемы",
  "concept": "SignalBrackets",
  "description": "Добавим движущиеся скобки по краям эмблемы.",
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

`SignalBrackets.draw()` рисует две скобки, которые приближаются к эмблеме и возвращаются назад. Параметры задают расстояние от центра, ход скобок, их размер и цвет.

Чтобы скобки не заходили на треугольник загрузчика, передаём его наружный радиус: `loader.outerRadius(radius) * visualScale`. Время для скобок задаётся в миллисекундах.

<details><summary>Параметры скобок</summary>

`cycleMs` — длительность цикла, `travel` — ход внутрь, `scale` — увеличение во время движения, `jitter` — дрожание. `distanceRatio` и `maxDistance` ограничивают расстояние от центра. `halfHeight`, `bevel` и `strokeWidth` задают форму. `alpha`, `peakAlpha`, `markerSize` и `markerAlpha` настраивают прозрачность и метки.

</details>
