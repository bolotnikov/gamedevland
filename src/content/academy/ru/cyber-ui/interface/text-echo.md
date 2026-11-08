---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/text-echo",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 10,
  "title": "Цветовое эхо текста",
  "concept": "TextEcho",
  "description": "Добавим цветную копию надписи, которая слегка смещается.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · TextEcho",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/TextEcho.ts",
      "note": "Сдвиг, фаза и скрытие эха."
    }
  ]
}
---

Для `TextEcho` создаём два одинаковых `Text`: основную надпись и её копию другого цвета. Эффект сдвигает их в разные стороны и ненадолго показывает копию.

`frameMs` задаёт длительность одного смещения, `cycleMs` — период повторения, `shift` — расстояние. Текст, шрифт и цвет можно менять обычными свойствами PixiJS.

При `setReducedMotion(true)` копия скрывается. `setActive(false)` останавливает анимацию на текущем кадре.

<details><summary>Дополнительные параметры</summary>

В `draw(primary, echo, x, y, enabled, phaseOffsetMs)` можно отключить эхо через `enabled` и сдвинуть его начало через `phaseOffsetMs`. По умолчанию эффект включён, сдвиг фазы равен `0`. Метод `offset(phaseOffsetMs)` возвращает величину смещения без рисования.

</details>
