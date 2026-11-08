---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/text-echo",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 13,
  "title": "Цветовое эхо текста",
  "concept": "TextEcho",
  "description": "Сдвинем два готовых текстовых объекта.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · TextEcho",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/TextEcho.ts",
      "note": "Сдвиг, фаза и скрытие эха."
    }
  ]
}
---

`TextEcho` не создаёт подпись. Приложение передаёт основной `Text` и его цветную копию с одинаковым содержимым и anchor. Эффект меняет их положение и видимость копии.

```ts
import { Text } from 'pixi.js';
import { CyberPreset, TextEcho } from '@gamedevland/cyber-ui';

const copy = app.stage.addChild(new Text({
  text: 'SYSTEM READY', style: { fill: 0xffd65c },
}));
const title = app.stage.addChild(new Text({
  text: 'SYSTEM READY', style: { fill: 0x70ccff },
}));
copy.anchor.set(0.5);
title.anchor.set(0.5);
const effect = new TextEcho(CyberPreset.textEcho);
const tick = (ticker: import('pixi.js').Ticker) => {
  effect.update(ticker.deltaMS / 1000);
  effect.draw(title, copy, 240, 120);
};
app.ticker.add(tick);
// On screen removal: app.ticker.remove(tick); effect.dispose();
```

В рабочем экране вызываем `update(deltaSeconds)` и `draw()` из своего обновления. Параметры `frameMs`, `cycleMs`, `shift` управляют периодом и величиной сдвига. `draw(primary, echo, x, y, enabled, phaseOffsetMs)` также принимает необязательные `enabled` (по умолчанию `true`) и сдвиг фазы в мс (по умолчанию `0`). `offset(phaseOffsetMs)` возвращает сдвиг без изменения объектов.

`setReducedMotion(true)` даёт нулевой сдвиг и скрывает копию при следующем `draw()`. `setActive(false)` останавливает время, но не скрывает замороженный кадр. При удалении экрана вызываем `dispose()` до уничтожения текста.
