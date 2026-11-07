---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/glitch-lifecycle",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 9,
  "title": "Искажение и жизненный цикл",
  "concept": "SurfaceGlitch · UiEffect",
  "description": "Добавим полосы и сохраним владение исходной поверхностью.",
  "takeaway": [
    "Эффект удаляет свои маски и копии, сохраняя исходный Graphics."
  ],
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
glitch.update(0.2);
```

Последний аргумент `show()` — задержка в миллисекундах, а `update()` принимает секунды. Повторный `show()` с тем же ключом обновляет цели без перезапуска расписания; новый ключ начинает его заново. Изменения геометрии и transform исходной поверхности подхватываются эффектом.

<figure class="sdk-figure is-flow"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>show → update</strong><span>Подключить цель и продвинуть время</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>hide / pause</strong><span>Убрать временные полосы</span></div></div><div class="sdk-figure__item tone-green"><div><strong>dispose</strong><span>Освободить ресурсы эффекта</span></div></div></div></figure>

Общий контракт `UiEffect`: `update`, `setActive`, `setReducedMotion`, `dispose`. Последний вызов идемпотентен, остальные после освобождения выбрасывают ошибку. Reduced motion у glitch удаляет искажение сразу. Предпочтение передаёт приложение, в том числе при его изменении.

Сначала освободи эффект, затем уничтожай поверхности. Не меняй маску цели, пока ей владеет glitch. Текст, соседние объекты и снимки произвольных контейнеров в этот эффект не входят.
