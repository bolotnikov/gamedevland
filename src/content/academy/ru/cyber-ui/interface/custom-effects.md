---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/custom-effects",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 20,
  "title": "Свой эффект и общий lifecycle",
  "concept": "AnimatedEffect · UiEffect",
  "description": "Используем готовое владение временем и паузой.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · AnimatedEffect",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/AnimatedEffect.ts",
      "note": "Параметры и поведение публичного API."
    },
    {
      "title": "Cyber UI Toolkit · types",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/types.ts",
      "note": "Параметры и поведение публичного API."
    }
  ]
}
---

`UiEffect` описывает четыре метода: `update(deltaSeconds)`, `setActive(active)`, `setReducedMotion(reduced)` и `dispose()`. Этот контракт позволяет приложению или `ToolkitComponent` одинаково обслуживать разные эффекты.

`AnimatedEffect` реализует счётчик `elapsedSeconds`, паузу и идемпотентное освобождение. Подкласс добавляет только своё поведение.

```ts
import { AnimatedEffect } from '@gamedevland/cyber-ui';

export class PulsePhase extends AnimatedEffect {
  get alpha(): number {
    this.assertLive();
    return this.reducedMotion ? 1 : 0.8 + 0.2 * Math.sin(this.elapsedSeconds * 2);
  }
}

const effect = new PulsePhase();
effect.update(0.1);
console.log(effect.alpha);
effect.setActive(false);
effect.update(1);
console.log(effect.elapsedSeconds); // 0.1
// Before releasing the screen:
effect.dispose();
```

`update()` принимает конечные неотрицательные секунды. `setActive(false)` замораживает время. Reduced motion задаёт предпочтение, а подкласс выбирает неподвижный результат.

Для реакции доступны защищённые хуки `onFrame()`, `onActivityChanged(active)`, `onMotionChanged()` и `onDispose()`. После `dispose()` рабочие методы выбрасывают ошибку; повторное освобождение допустимо. Базовый класс не создаёт ticker и не уничтожает объекты приложения.
