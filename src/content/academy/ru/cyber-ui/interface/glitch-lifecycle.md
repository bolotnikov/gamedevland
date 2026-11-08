---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/glitch-lifecycle",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 14,
  "title": "Искажение и жизненный цикл",
  "concept": "SurfaceGlitch · UiEffect",
  "description": "Добавим полосы и сохраним владение исходной поверхностью.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · SurfaceGlitch",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/SurfaceGlitch.ts",
      "note": "Регистрация целей и детерминированное время."
    },
    {
      "title": "PixiJS · Graphics",
      "url": "https://pixijs.com/8.x/guides/components/scene-objects/graphics",
      "note": "Совместное использование GraphicsContext и уничтожение."
    }
  ]
}
---

`SurfaceGlitch` сдвигает полосы живой поверхности. Он временно добавляет маски и копии геометрии. Исходный `Graphics` должен быть добавлен в контейнер и не иметь собственной маски.

```ts
import { Graphics } from 'pixi.js';
import { CyberPreset, SurfaceGlitch } from '@gamedevland/cyber-ui';

const surface = app.stage.addChild(new Graphics()
  .rect(0, 0, 220, 56).fill(CyberPreset.palette.accent));
const glitch = new SurfaceGlitch(CyberPreset.glitch);
glitch.show('menu', [{ surface, x: 0, y: 0, w: 220, h: 56 }], 200);
const tick = (ticker: import('pixi.js').Ticker) => {
  glitch.update(ticker.deltaMS / 1000);
};
app.ticker.add(tick);
// On screen removal: app.ticker.remove(tick); glitch.dispose();
```

Последний аргумент `show()` — задержка в миллисекундах, а `update()` принимает секунды. Повторный `show()` с тем же ключом обновляет цели без перезапуска расписания; новый ключ начинает его заново. Изменения геометрии и transform исходной поверхности подхватываются эффектом.


Общий контракт `UiEffect`: `update`, `setActive`, `setReducedMotion`, `dispose`. Последний вызов идемпотентен, остальные после освобождения выбрасывают ошибку. Reduced motion у glitch удаляет искажение сразу. Предпочтение передаёт приложение, в том числе при его изменении.

Сначала освобождаем эффект, затем уничтожаем поверхности. Не меняем маску цели, пока ей владеет glitch. Текст, соседние объекты и снимки произвольных контейнеров в этот эффект не входят.

`GlitchOptions`: `durationMs` — длительность импульса, `minDelayMs` — минимальная пауза, `spreadMs` — разброс паузы, `seed` — целое число 0–4294967295. `GlitchTarget` содержит `surface` и локальные `x`, `y`, `w`, `h`. `hide()` снимает цели и убирает временные полосы.
