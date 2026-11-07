---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/text-echo",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": true,
  "order": 8,
  "title": "Цветовое эхо текста",
  "concept": "TextEcho",
  "description": "Сдвинем два готовых текстовых объекта.",
  "takeaway": [
    "Содержимое и шрифт текста принадлежат приложению."
  ],
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
effect.update(0.09);
effect.draw(title, copy, 240, 120);
```

В рабочем экране вызывай `update(deltaSeconds)` и `draw()` из своего обновления. Параметры `frameMs`, `cycleMs`, `shift` управляют периодом и величиной сдвига. `offset(phaseOffsetMs)` позволяет получить сдвиг без изменения объектов.

`setReducedMotion(true)` даёт нулевой сдвиг и скрывает копию при следующем `draw()`. `setActive(false)` останавливает время, но не скрывает замороженный кадр. При удалении экрана вызови `dispose()` до уничтожения текста.
