---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/signal-lost",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 13,
  "title": "Анимация потери сигнала",
  "concept": "SignalLost",
  "description": "Покажем затемнение, полосы и сообщение об ошибке.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · SignalLost",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/SignalLost.ts",
      "note": "Параметры и поведение публичного API."
    },
    {
      "title": "Cyber UI Toolkit · FaultGlyph",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/FaultGlyph.ts",
      "note": "Параметры и поведение публичного API."
    }
  ]
}
---

`SignalLost.draw()` рисует экран потери сигнала: затемняет фон, добавляет полосы и знак ошибки. В примере анимация повторяется с небольшой паузой.

Для одного проигрывания увеличиваем `progress` от `0` до `1`. В конце рисунок полностью исчезает. Надпись создаём отдельным `Text`; метод возвращает её положение `x/y`, прозрачность `fade` и смещение `shift`.

Если движение отключено, вместо анимации показываем неподвижный знак ошибки и текст.
