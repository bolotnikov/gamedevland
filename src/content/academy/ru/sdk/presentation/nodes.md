---
{
  "locale": "ru",
  "translationKey": "sdk/presentation/nodes",
  "course": "sdk",
  "lesson": "presentation",
  "draft": false,
  "order": 2,
  "title": "Как найти и изменить элемент экрана",
  "concept": "NodeBase",
  "description": "Найдём счётчик и игровое поле по именам из JSON.",
  "takeaway": [
    "Путь поиска повторяет вложенность в JSON."
  ],
  "sources": [
    {
      "title": "SDK · NodeBase.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/layouts/nodes/NodeBase.ts",
      "note": "Фасады и поиск узлов."
    },
    {
      "title": "SDK · types.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/layouts/nodes/types.ts",
      "note": "Контракты готовых видов узлов."
    },
    {
      "title": "SDK · Engine.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/core/Engine.ts",
      "note": "Создание WebGL renderer."
    },
    {
      "title": "SDK · TexturedRope.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/layouts/nodes/TexturedRope.ts",
      "note": "Специализированный узел с геометрией и точками."
    }
  ]
}
---

<aside class="lesson-note" aria-labelledby="node-term"><span class="lesson-note__label">Термин</span><h3 id="node-term">Узел</h3><p>Элемент вёрстки. Например, Text показывает текст, а Container объединяет несколько элементов. Общий NodeBase из /layouts не зависит от способа отрисовки. У Pixi- и Three-узлов объект отрисовки доступен как view.</p></aside>

Для поиска по всему layout используем `layout.requireNode(id, Text)`: он сразу проверит наличие узла и его класс. Конкретные `Text` и `Container` импортируем из `@gamedevland/engine/renderers/pixi`.

В примере `board` находится внутри `gameplay`, а `score` лежит прямо в корне. Из компонента корневого узла найдём оба элемента, обновим счётчик и покажем поле.

```ts
const board = this.node.getChildContainer('gameplay.board');
const label = this.node.getChildText('score');
label.setText('120');
board.setVisible(true);
```

<figure class="sdk-figure is-compare">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-cyan"><div><strong>root</strong><span>Начинаем поиск здесь</span></div></div>
    <div class="sdk-figure__item tone-violet"><div><strong>gameplay.board</strong><span>Показываем поле</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>score</strong><span>Меняем текст счётчика</span></div></div>
  </div>
</figure>
