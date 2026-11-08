---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/signal-lost",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 16,
  "title": "Экран потери сигнала",
  "concept": "SignalLost",
  "description": "Соединим кадр эффекта с отдельной подписью.",
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

`SignalLost.draw()` рисует затемнение, полосы и знак ошибки. Приложение передаёт прогресс `[0, 1]`, поэтому длительность и запуск остаются под его управлением.

```ts
import { Graphics, Text } from 'pixi.js';
import { CyberPreset, SignalLost } from '@gamedevland/cyber-ui';

const overlay = app.stage.addChild(new Graphics());
const label = app.stage.addChild(new Text({ text: 'SIGNAL LOST', style: { fontSize: 24 } }));
label.anchor.set(0.5);
const t = CyberPreset.palette;
const sample = SignalLost.draw(overlay.clear(), app.screen.width, app.screen.height, 0.5, {
  background: t.background, danger: t.danger, accent: t.accent, highlight: t.signal,
});
label.position.set(sample.x + sample.shift * 4, sample.y + 48);
label.alpha = sample.fade;
```

Результат содержит центр подписи `x/y`, её прозрачность `fade` и величину смещения `shift`. При прогрессе `1` эффект полностью исчезает. Повторный запуск начинается с `0`.

У helper нет флага reduced motion. В таком режиме используем статичное предупреждение, например `FaultGlyph` с нулевым искажением, и отдельный текст. Ползунок в примере позволяет изучить кадры без автоматических вспышек.
