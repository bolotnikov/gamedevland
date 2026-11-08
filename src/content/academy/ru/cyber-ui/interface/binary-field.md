---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/binary-field",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 7,
  "title": "Бинарный фон",
  "concept": "BinaryField",
  "description": "Добавим меняющийся узор из нулей и единиц.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · BinaryField",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/BinaryField.ts",
      "note": "Seed, frame и построение узора."
    }
  ]
}
---

`BinaryField.draw()` рисует узор по номеру кадра. В примере кадр меняется восемь раз в секунду. Размер символов, частоту и прозрачность можно настроить отдельно.

Параметр `seed` задаёт начальный рисунок. При одинаковых размерах, `seed` и номере кадра узор повторяется. Чтобы он плавно менялся, сохраняем `seed` и увеличиваем только номер кадра.

После `draw()` вызываем `fill()` с нужным цветом. При отключённой анимации оставляем кадр `0`.
