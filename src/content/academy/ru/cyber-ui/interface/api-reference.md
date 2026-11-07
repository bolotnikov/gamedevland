---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/api-reference",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": true,
  "order": 12,
  "title": "Шпаргалка API",
  "concept": "Выбор инструмента",
  "description": "Найдём нужный вызов и проверим правила интеграции.",
  "takeaway": [
    "Статичные поверхности, время эффектов и игровые действия имеют разных владельцев."
  ],
  "sources": [
    {
      "title": "Cyber UI Toolkit · public exports",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/index.ts",
      "note": "Экспортируемые классы и типы."
    },
    {
      "title": "Cyber UI Toolkit · SDK exports",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/sdk/src/index.ts",
      "note": "Публичный SDK-адаптер."
    }
  ]
}
---

| Задача | Вызов |
| --- | --- |
| Стеклянная панель | `TerminalGlass.draw(g, x, y, w, h, cut, surface, edge, accent, light)` |
| Простая плашка | `TerminalUi.plate(g, x, y, w, h, cut, fill, line, alpha?)` |
| Иконка | `TerminalUi.icon(g, name, centerX, centerY, size, color)` |
| Кнопка | `ButtonSurface.draw(g, options, palette)` |
| Ползунок | `ButtonSurface.toggle(g, width, height, selected, palette)` |
| Узор | `BinaryField.draw(g, bounds, cut, cellSize, seed, frame)` |
| Загрузчик | `new TriangleLoader(options)` |
| Эхо подписи | `new TextEcho(options)` |
| Полосы искажения | `new SurfaceGlitch(options)` |
| Появление в SDK | `PanelReveal` |

Для декора есть `TerminalUi.traces/etch`, `TerminalGlass.focus`, `SignalBrackets` и `TerminalSweep`. `FaultGlyph` рисует знак ошибки, а `SignalLost.draw()` — экранный эффект по progress от 0 до 1; возвращает координаты подписи, сдвиг и fade. `PanelTransition.origin()` вычисляет начальную геометрию для собственной анимации.

У `TerminalSweep` progress вне `[0, 1)` ничего не рисует. Stateless-помощники не знают системных настроек движения: передавай reduced-флаг там, где он предусмотрен, или выбирай статичный кадр в приложении.

Перед интеграцией проверь четыре вещи: размеры локальные; `update()` получает секунды; `Graphics.clear()` вызывается один раз перед перестроением; эффекты освобождаются до уничтожения узлов. Настройка `enabled` у кнопки не заменяет отключение ввода.

Проверки проекта: `npm run check` и `npm run pack`. Тесты проверяют геометрию, время, владение ресурсами и упаковку. Отрисовку шрифта, реальное нажатие и производительность на устройстве проверяем в конечной игре.
