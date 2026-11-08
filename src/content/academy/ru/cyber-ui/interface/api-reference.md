---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/api-reference",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 21,
  "title": "Справочник публичного API",
  "concept": "Core · SDK adapter",
  "description": "Все классы, методы и типы с переходами к примерам.",
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

Все публичные классы core и адаптера собраны ниже. Ссылка ведёт к короткому уроку с примером. Импортируем из `@gamedevland/cyber-ui`; `ToolkitComponent`, `PanelReveal` и тип `UiViewport` — из `@gamedevland/cyber-ui-sdk`.

<details><summary>Классы и методы</summary>

| API | Методы и поля | Применение |
| --- | --- | --- |
| [`TerminalUi`](/ru/academy/cyber-ui/interface/panels/) | `plate, icon, traces, etch, clippedRect` | Плашки, знаки, декор и контуры |
| [`TerminalGlass`](/ru/academy/cyber-ui/interface/panels/) | `draw, focus` | Стекло и акценты |
| [`PanelSurface`](/ru/academy/cyber-ui/interface/panels/) | `draw` | Информационная панель |
| [`ButtonSurface`](/ru/academy/cyber-ui/interface/buttons/) | `draw, segmentTrack, toggle` | 10 вариантов кнопок и групповые подложки |
| [`ButtonPrice`](/ru/academy/cyber-ui/interface/button-price/) | `layout` | Измеренная строка подписи и цены |
| [`CyberPreset`](/ru/academy/cyber-ui/interface/icons-theme/) | `palette, triangle, trianglePalette, textEcho, glitch` | Замороженные настройки по умолчанию |
| [`BinaryField`](/ru/academy/cyber-ui/interface/binary-field/) | `draw` | Узор по seed и целому кадру |
| [`TriangleLoader`](/ru/academy/cyber-ui/interface/triangle-loader/) | `update, draw, outerRadius` | Контуры и частицы |
| [`SignalBrackets`](/ru/academy/cyber-ui/interface/signal-brackets/) | `draw` | Скобки вокруг эмблемы |
| [`TerminalSweep`](/ru/academy/cyber-ui/interface/terminal-sweep/) | `draw` | Сканирование down/right |
| [`TextEcho`](/ru/academy/cyber-ui/interface/text-echo/) | `update, draw, offset` | Сдвиг основного текста и копии |
| [`SurfaceGlitch`](/ru/academy/cyber-ui/interface/glitch-lifecycle/) | `show, update, hide` | Полосы на живом Graphics |
| [`FaultGlyph`](/ru/academy/cyber-ui/interface/fault-glyph/) | `draw` | Знак предупреждения |
| [`SignalLost`](/ru/academy/cyber-ui/interface/signal-lost/) | `draw` | Экран ошибки и положение подписи |
| [`PanelTransition`](/ru/academy/cyber-ui/interface/panel-reveal/) | `origin` | Геометрия появления и закрытия |
| [`AnimatedEffect`](/ru/academy/cyber-ui/interface/custom-effects/) | `elapsedSeconds, update, setActive, setReducedMotion, dispose` | База времени и lifecycle |
| [`ToolkitComponent`](/ru/academy/cyber-ui/interface/sdk-components/) | `ownEffect, setUiReducedMotion, uiViewport` | Компонент адаптера SDK |
| [`PanelReveal`](/ru/academy/cyber-ui/interface/panel-reveal/) | `runAction` | Действие адаптера SDK |

</details>

`TriangleLoader`, `TextEcho` и `SurfaceGlitch` также имеют `elapsedSeconds`, `setActive()`, `setReducedMotion()` и `dispose()`. Они наследуют общий lifecycle от `AnimatedEffect`.

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
| [`UiEffect`](/ru/academy/cyber-ui/interface/custom-effects/) | `update, setActive, setReducedMotion, dispose` |
| [`UiViewport`](/ru/academy/cyber-ui/interface/sdk-components/) | `width, height, cssWidth, cssHeight, scale` |

</details>

## Общие правила

- Координаты и размеры — локальные логические единицы PixiJS. Поверхности используют левый верхний угол, иконки — центр.
- `update()` принимает секунды; поля `*Ms` и время `SignalBrackets` — миллисекунды. Прогресс `TerminalSweep` — `[0, 1)`, `SignalLost` — `[0, 1]`.
- Рисование дописывает геометрию. Очищаем слой перед перестроением; `TriangleLoader.draw()` сам очищает две выделенные поверхности.
- Цвета — числовой RGB. Внешний JSON предварительно проверяем декодером приложения.
- Приложение владеет текстом, layout, вводом, шрифтами, звуком, паузой и reduced motion. Эффекты освобождаем до уничтожения переданных им объектов.

