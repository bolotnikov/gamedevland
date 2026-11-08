---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/host-contract",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 2,
  "title": "Кто управляет интерфейсом",
  "concept": "Границы ответственности",
  "description": "Разделим оформление, данные и взаимодействие.",
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

Тулкит получает готовую поверхность и параметры. Он не выбирает размер экрана, не загружает шрифты и не вызывает игровые команды. Поэтому одну панель можно использовать в меню, магазине или боевом HUD.

<figure class="sdk-boundary">
  <div class="sdk-boundary__modules">
    <section class="sdk-boundary__module-group is-cyan"><h4>Приложение решает</h4><ul><li><code>layout</code><span>Размеры и положение</span></li><li><code>content</code><span>Текст и данные</span></li><li><code>input</code><span>Нажатие и действие</span></li><li><code>time</code><span>Пауза и движение</span></li></ul></section>
    <section class="sdk-boundary__module-group is-green"><h4>Тулкит рисует</h4><ul><li><code>surface</code><span>Фон и грани</span></li><li><code>icon</code><span>Векторный знак</span></li><li><code>state</code><span>Выделение элемента</span></li><li><code>effect</code><span>Кадр анимации</span></li></ul></section>
  </div><figcaption>Объекты сцены остаются у приложения. Эффект освобождает только созданные им ресурсы.</figcaption>
</figure>

Координаты — локальные логические единицы [контейнера](https://pixijs.com/8.x/guides/components/scene-objects/container). Если родитель масштабирован вдвое, панель и её иконки масштабируются вместе. Передавать физические пиксели canvas вместо локальных размеров не нужно.

Статичную поверхность перерисовываем при изменении размера, палитры или состояния. Постоянный вызов из ticker нужен анимации, а не неподвижной рамке.
