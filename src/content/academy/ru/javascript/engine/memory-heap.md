---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 12,
  "title": "Memory Heap: где хранятся объекты",
  "concept": "Объекты и ссылки",
  "description": "Как две переменные обращаются к одному объекту в памяти.",
  "takeaway": "Heap — область памяти, которую V8 использует для хранения объектов. Несколько переменных могут ссылаться на один объект: изменение его свойства видно через каждую из этих ссылок.",
  "sources": [
    {
      "title": "ECMA-262 · Object Type",
      "url": "https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-object-type",
      "note": "Объекты и их свойства. Спецификация не задаёт точное размещение объектов в памяти."
    },
    {
      "title": "V8 · Heap and allocation",
      "url": "https://v8.dev/blog/trash-talk",
      "note": "Управляемая память объектов и её сборка в V8."
    }
  ],
  "locale": "ru",
  "translationKey": "javascript/engine/memory-heap"
}
---


Когда программа создаёт объект `{ hp: 100 }`, его данные нужно где-то хранить. V8 использует для хранения объектов область памяти, которую называют **[heap](https://v8.dev/blog/trash-talk)**.

<aside class="lesson-note" aria-labelledby="memory-heap-note-title">
  <span class="lesson-note__label">Термин</span><h3 id="memory-heap-note-title">Memory Heap — куча</h3>
  <p>Область памяти, в которой движок хранит объекты программы и их данные. V8 сам управляет выделением и освобождением этой памяти.</p>
</aside>

Переменная позволяет обратиться к объекту. Эту связь называют <strong>ссылкой на объект</strong>. Рассмотрим пример:

```js
const player = { hp: 100 };
const target = player;
target.hp = 80;
// player.hp is also 80
```

1. `const player = { hp: 100 }` создаёт объект игрока. Переменная `player` ссылается на него.
2. `const target = player` создаёт вторую переменную, которая ссылается на **тот же объект**. Второй объект здесь не создаётся.
3. `target.hp = 80` изменяет свойство этого объекта. Поэтому `player.hp` тоже становится равно `80`.

<figure class="heap-map" aria-label="Переменные player и target ссылаются на один объект игрока со свойством hp равным 80">
  <div class="heap-map__references">
    <div class="heap-map__reference"><code>player</code><span aria-hidden="true">→</span></div>
    <div class="heap-map__reference"><code>target</code><span aria-hidden="true">→</span></div>
  </div>
  <div class="heap-map__storage">
    <span>Heap · память объектов</span>
    <div class="heap-map__object"><strong>Один объект игрока</strong><code>{ hp: <b>80</b> }</code></div>
  </div>
  <figcaption>Состояние после <code>target.hp = 80</code>. Обе стрелки ведут к одному объекту.</figcaption>
</figure>

На схеме показаны связи между переменными и объектом. Реальное размещение данных в памяти определяет движок.
