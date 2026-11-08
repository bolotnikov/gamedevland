---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/host-contract",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 2,
  "title": "Как использовать элементы интерфейса",
  "concept": "Элементы PixiJS",
  "description": "Добавим оформление к объектам PixiJS.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · README",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit#readme",
      "note": "Контракты локальных размеров и владения ресурсами."
    },
    {
      "title": "PixiJS · Container",
      "url": "https://pixijs.com/8.x/guides/components/scene-objects/container",
      "note": "Иерархия объектов и преобразования."
    }
  ]
}
---

Библиотека рисует в обычном `Graphics`. Создаём объект, добавляем его на сцену и вызываем нужный метод — например, `TerminalGlass.draw()` для панели. Текст добавляем отдельным `Text`, нажатия обрабатываем средствами PixiJS или движка.

<figure class="sdk-boundary"><div class="sdk-boundary__modules">
<section class="sdk-boundary__module-group is-cyan"><h4>Библиотека</h4><ul><li><code>Graphics</code><span>Рисует панель и иконки</span></li><li><code>update()</code><span>Обновляет эффект</span></li></ul></section>
<section class="sdk-boundary__module-group is-green"><h4>Код игры</h4><ul><li><code>Text</code><span>Добавляет подпись</span></li><li><code>pointertap</code><span>Обрабатывает нажатие</span></li></ul></section>
</div></figure>

Координаты задаются относительно [контейнера](https://pixijs.com/8.x/guides/components/scene-objects/container). Если увеличить контейнер вдвое, вместе с ним увеличатся панель, текст и иконки.

Неподвижную панель достаточно перерисовать при смене размера или цвета. Анимацию обновляем каждый кадр.
