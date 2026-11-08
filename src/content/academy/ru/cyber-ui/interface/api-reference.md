---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/api-reference",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 16,
  "title": "Справочник API",
  "concept": "Core · SDK adapter",
  "description": "Найдём нужный метод и пример его применения.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · core exports",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/index.ts",
      "note": "Публичные экспорты core."
    },
    {
      "title": "Cyber UI Toolkit · SDK exports",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/sdk/src/index.ts",
      "note": "Публичные экспорты адаптера."
    }
  ]
}
---

Здесь собраны классы и типы библиотеки. По ссылке можно перейти к примеру. Основной пакет — `@gamedevland/cyber-ui`; `ToolkitComponent`, `PanelReveal` и тип `UiViewport` — из `@gamedevland/cyber-ui-sdk`.

<details><summary>Классы и методы</summary>

| API | Методы и поля | Применение |
| --- | --- | --- |
| [`TerminalUi`](/ru/academy/cyber-ui/interface/panels/) | `plate, icon, traces, etch, clippedRect` | Плашки, знаки, декор и контуры |
| [`TerminalGlass`](/ru/academy/cyber-ui/interface/panels/) | `draw, focus` | Стекло и акценты |
| [`PanelSurface`](/ru/academy/cyber-ui/interface/panels/) | `draw` | Информационная панель |
| [`ButtonSurface`](/ru/academy/cyber-ui/interface/buttons/) | `draw, segmentTrack, toggle` | 10 вариантов кнопок и групповые подложки |
| [`ButtonPrice`](/ru/academy/cyber-ui/interface/buttons/) | `layout` | Подпись и цена кнопки |
| [`CyberPreset`](/ru/academy/cyber-ui/interface/icons-theme/) | `palette, triangle, trianglePalette, textEcho, glitch` | Готовые цвета и настройки |
| [`BinaryField`](/ru/academy/cyber-ui/interface/binary-field/) | `draw` | Узор по seed и целому кадру |
| [`TriangleLoader`](/ru/academy/cyber-ui/interface/triangle-loader/) | `update, draw, outerRadius` | Контуры и частицы |
| [`SignalBrackets`](/ru/academy/cyber-ui/interface/signal-brackets/) | `draw` | Скобки вокруг эмблемы |
| [`TerminalSweep`](/ru/academy/cyber-ui/interface/panels/) | `draw` | Сканирование down/right |
| [`TextEcho`](/ru/academy/cyber-ui/interface/text-echo/) | `update, draw, offset` | Сдвиг основного текста и копии |
| [`SurfaceGlitch`](/ru/academy/cyber-ui/interface/glitch-lifecycle/) | `show, update, hide` | Полосы на живом Graphics |
| [`FaultGlyph`](/ru/academy/cyber-ui/interface/fault-glyph/) | `draw` | Знак предупреждения |
| [`SignalLost`](/ru/academy/cyber-ui/interface/signal-lost/) | `draw` | Экран ошибки и положение подписи |
| [`PanelTransition`](/ru/academy/cyber-ui/interface/panel-reveal/) | `origin` | Геометрия появления и закрытия |
| [`AnimatedEffect`](/ru/academy/cyber-ui/interface/api-reference/) | `elapsedSeconds, update, setActive, setReducedMotion, dispose` | Время и пауза эффекта |
| [`ToolkitComponent`](/ru/academy/cyber-ui/interface/sdk-components/) | `ownEffect, setUiReducedMotion, uiViewport` | Компонент адаптера SDK |
| [`PanelReveal`](/ru/academy/cyber-ui/interface/panel-reveal/) | `runAction` | Действие адаптера SDK |

</details>

`TriangleLoader`, `TextEcho` и `SurfaceGlitch` также имеют `elapsedSeconds`, `setActive()`, `setReducedMotion()` и `dispose()`. Эти методы получены от `AnimatedEffect`.

<details><summary>Типы и поля</summary>

| Тип | Поля / значения |
| --- | --- |
| [`UiBounds`](/ru/academy/cyber-ui/interface/panels/) | `x, y, w, h` |
| [`PanelPalette`](/ru/academy/cyber-ui/interface/panels/) | `surface, edge, accent` |
| [`ButtonVariant`](/ru/academy/cyber-ui/interface/buttons/) | `primary, module, danger, icon, nav, segment, tab, switch, utility, line` |
| [`ButtonSurfaceOptions`](/ru/academy/cyber-ui/interface/buttons/) | `width, height, variant, enabled, selected, explicitAccent?, ready?` |
| [`ButtonPalette`](/ru/academy/cyber-ui/interface/icons-theme/) | `background, panel, inset, panelEdge, signal, focus, accent, steel, sapphire, text, muted, danger` |
| [`TerminalIcon`](/ru/academy/cyber-ui/interface/icons-theme/) | `27 имён` |
| [`TriangleOptions`](/ru/academy/cyber-ui/interface/triangle-loader/) | `cycleMs, spinDelayMs, spinDurationMs, layers, layerGap, layerLift, strokeWidth, haloWidth, haloAlpha, echoAlpha, particles, particleSize, particleSpread, particleAlpha, seed` |
| [`TrianglePalette`](/ru/academy/cyber-ui/interface/triangle-loader/) | `accent, secondary, highlight, text` |
| [`TriangleLayout`](/ru/academy/cyber-ui/interface/triangle-loader/) | `x, y, radius, scale` |
| [`TextEchoOptions`](/ru/academy/cyber-ui/interface/text-echo/) | `frameMs, cycleMs, shift` |
| [`GlitchOptions`](/ru/academy/cyber-ui/interface/glitch-lifecycle/) | `durationMs, minDelayMs, spreadMs, seed` |
| [`GlitchTarget`](/ru/academy/cyber-ui/interface/glitch-lifecycle/) | `surface, x, y, w, h` |
| [`BracketOptions`](/ru/academy/cyber-ui/interface/signal-brackets/) | `cycleMs, travel, scale, jitter, distanceRatio, maxDistance, halfHeight, bevel, strokeWidth, alpha, peakAlpha, markerSize, markerAlpha` |
| [`SignalPalette`](/ru/academy/cyber-ui/interface/signal-lost/) | `background, danger, accent, highlight` |
| [`PanelTransitionInput`](/ru/academy/cyber-ui/interface/panel-reveal/) | `offset, axis?, pivotX?, pivotY?, closing?` |
| [`UiEffect`](/ru/academy/cyber-ui/interface/api-reference/) | `update, setActive, setReducedMotion, dispose` |
| [`UiViewport`](/ru/academy/cyber-ui/interface/sdk-components/) | `width, height, cssWidth, cssHeight, scale` |

</details>

## Общие правила

- Координаты и размеры — локальные логические единицы PixiJS. Поверхности используют левый верхний угол, иконки — центр.
- `update()` принимает секунды; поля `*Ms` и время `SignalBrackets` — миллисекунды. Прогресс `TerminalSweep` — `[0, 1)`, `SignalLost` — `[0, 1]`.
- Рисование дописывает геометрию. Очищаем слой перед перестроением; `TriangleLoader.draw()` сам очищает две выделенные поверхности.
- Цвет задаётся числом RGB, например `0x68e0cb`.
- Перед удалением объектов сцены вызываем `dispose()` у их эффектов.


<details><summary>Создание своего эффекта</summary>

`AnimatedEffect` пригодится для новой анимации: он считает время и ставит обновление на паузу.

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

Для своей логики можно переопределить `onFrame()`, `onActivityChanged()`, `onMotionChanged()` и `onDispose()`.

</details>
