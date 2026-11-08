---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/glitch-lifecycle",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 11,
  "title": "Искажение поверхности",
  "concept": "SurfaceGlitch · UiEffect",
  "description": "Добавим короткие сдвиги полос на панели.",
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

`SurfaceGlitch` на короткое время сдвигает отдельные полосы `Graphics`. Укажем панель и её размеры в `show()`, а затем будем вызывать `update()` каждый кадр.

Панель должна быть добавлена на сцену и не иметь своей маски. Эффект искажает только её рисунок: отдельная подпись рядом с панелью остаётся на месте.

`hide()` убирает искажение. Когда эффект больше не нужен, вызываем `dispose()` перед удалением панели.

<details><summary>Настройки и повторный запуск</summary>

`durationMs` задаёт длительность импульса, `minDelayMs` — минимальную паузу, `spreadMs` — разброс паузы, `seed` — начальное значение для повторяемой анимации.

В `show(key, targets, revealDelayMs)` передаём список панелей и задержку в миллисекундах. Одинаковый `key` обновляет список без перезапуска; другой ключ начинает эффект заново. Каждый элемент списка содержит `surface` и его локальные `x`, `y`, `w`, `h`.

</details>
