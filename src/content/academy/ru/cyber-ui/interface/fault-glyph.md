---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/fault-glyph",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 12,
  "title": "Анимированный знак ошибки",
  "concept": "FaultGlyph",
  "description": "Добавим предупреждение с искажением.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · FaultGlyph",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/FaultGlyph.ts",
      "note": "Параметры и поведение публичного API."
    }
  ]
}
---

`FaultGlyph.draw()` рисует знак предупреждения. Параметр `distortion` сдвигает части знака и добавляет цветные фрагменты. В примере это значение меняется со временем, поэтому знак движется.

Чем больше `distortion`, тем сильнее искажение. При `0` знак остаётся целым. Положение задаётся координатами центра, размер — параметром `scale`.

Если движение отключено, рисуем знак с нулевым искажением.
