---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 12,
  "title": "Memory Heap: где хранятся объекты",
  "concept": "Объекты и ссылки",
  "description": "Как две переменные обращаются к одному объекту в памяти.",
  "takeaway": "Heap (куча) хранит объекты и их данные. Переменная даёт доступ к объекту через ссылку. При присваивании её значения другой переменной копируется ссылка, а не объект.",
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
    },
    {
      "title": "ECMA-262 · GetValue",
      "url": "https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-getvalue",
      "note": "Чтение переменной возвращает её значение; для объекта это тот же объект, без копирования его свойств."
    }
  ],
  "simulation": "heap-trace",
  "locale": "ru",
  "translationKey": "javascript/engine/memory-heap"
}
---


Когда программа создаёт объект `{ hp: 100 }`, его данные нужно где-то хранить. V8 использует для хранения объектов область памяти, которую называют **[heap](https://v8.dev/blog/trash-talk)**.

<aside class="lesson-note" aria-labelledby="memory-heap-note-title">
  <span class="lesson-note__label">Термин</span><h3 id="memory-heap-note-title">Memory Heap — куча</h3>
  <p>Область памяти, в которой движок хранит объекты программы и их данные. V8 сам управляет выделением и освобождением этой памяти.</p>
</aside>

<aside class="lesson-note" aria-labelledby="heap-reference-note-title">
  <span class="lesson-note__label">Термин</span><h3 id="heap-reference-note-title">Ссылка на объект</h3>
  <p>Когда говорят «переменная хранит ссылку», это означает, что её значение позволяет движку обратиться к конкретному объекту в памяти. Данные объекта не копируются внутрь каждой переменной, которая на него ссылается.</p>
  <p><a href="https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-object-type">ECMAScript описывает это как объектное значение</a>. Язык не предоставляет числовой адрес объекта: способ хранения ссылки определяет движок.</p>
</aside>

Рассмотрим, как создаётся объект и появляется вторая ссылка:

```js
const player = { hp: 100 };
const target = player;
target.hp = 80;
// player.hp is also 80
```

1. `const player = { hp: 100 }` создаёт объект игрока. На интерактивной схеме V8 выделяет для него память в куче и сохраняет там свойство `hp`. Переменная `player` получает ссылку на этот объект.
2. `const target = player` <a href="https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-getvalue">читает значение</a> `player` и присваивает его `target`. Так копируется ссылка: обе переменные теперь позволяют обратиться к **тому же объекту**. Второй объект не создаётся.
3. `target.hp = 80` обращается по ссылке к объекту и изменяет его свойство `hp`. Сами ссылки не меняются. Поэтому `player.hp` тоже становится равно `80`.

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

На схеме показаны связи между переменными и объектом. Реальное размещение данных в памяти определяет движок. Ниже выполним пример по строкам: объект, ссылки и значения свойств будут появляться по мере выполнения.
