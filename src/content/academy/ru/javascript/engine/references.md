---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 13,
  "title": "Изменить объект или заменить ссылку?",
  "concept": "Объект и ссылка на него",
  "description": "Чем изменение свойства отличается от присваивания переменной и что запрещает const.",
  "takeaway": [
    "Переменная с объектным значением даёт доступ к объекту через ссылку. Присваивание этого значения другой переменной копирует ссылку, а не объект.",
    "Изменение свойства меняет общий объект. Присваивание переменной другого значения заменяет только её собственную ссылку и не меняет остальные ссылки или объект.",
    "const запрещает заменять значение переменной, но не делает сам объект неизменяемым."
  ],
  "sources": [
    {
      "title": "ECMA-262 · Object Type",
      "url": "https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-object-type",
      "note": "Объект состоит из свойств; чтение и изменение свойства — операции над самим объектом."
    },
    {
      "title": "ECMA-262 · Let and Const Declarations",
      "url": "https://tc39.es/ecma262/multipage/ecmascript-language-statements-and-declarations.html#sec-let-and-const-declarations",
      "note": "Объявление переменных через let и const и присваивание начального значения."
    },
    {
      "title": "ECMA-262 · SetMutableBinding",
      "url": "https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-declarative-environment-records-setmutablebinding-n-v-s",
      "note": "Присваивание меняет значение конкретной переменной; попытка заменить значение const приводит к TypeError."
    },
    {
      "title": "ECMA-262 · GetValue / PutValue",
      "url": "https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-putvalue",
      "note": "Чтение значения и различие между записью свойства объекта и присваиванием переменной."
    },
    {
      "title": "V8 · Pointer Compression",
      "url": "https://v8.dev/blog/pointer-compression",
      "note": "Внутреннее представление ссылок на объекты: указатели и сжатые смещения вместо доступных JavaScript числовых адресов."
    },
    {
      "title": "V8 · Moving objects and updating pointers",
      "url": "https://v8.dev/blog/trash-talk#minor-gc-scavenger",
      "note": "При перемещении объектов сборщик V8 обновляет указывающие на них ссылки."
    }
  ],
  "simulation": "reference-trace",
  "locale": "ru",
  "translationKey": "javascript/engine/references"
}
---


В предыдущем уроке мы рассмотрели две переменные, которые ссылаются на один объект. Теперь сравним два действия: **изменить свойство объекта** и **присвоить переменной другое значение**.

<aside class="lesson-note" aria-labelledby="reference-address-note-title">
  <span class="lesson-note__label">Термин</span><h3 id="reference-address-note-title">Ссылка и адрес памяти</h3>
  <p>В <a href="https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-object-type">ECMAScript</a> значение переменной в таком примере — объектное значение. В объяснении памяти говорят проще: переменная хранит <strong>ссылку на объект</strong>, по которой движок может к нему обратиться.</p>
  <p>Внутри <a href="https://v8.dev/blog/pointer-compression">V8</a> ссылки представлены указателями, в том числе в сжатой форме. Поэтому «копируется адрес» — допустимое приближение, но точнее говорить <strong>«копируется ссылка на тот же объект»</strong>. JavaScript не предоставляет здесь числовой адрес для чтения или изменения.</p>
  <p>Кроме того, V8 может <a href="https://v8.dev/blog/trash-talk#minor-gc-scavenger">переместить объект и обновить ссылки</a>. Для программы это останется тем же объектом.</p>
</aside>

```js
const player = { hp: 100 };
let target = player;
target.hp = 50;
target = null;
// player.hp is 50; the object is still reachable
```

1. `const player = { hp: 100 }` создаёт объект и сохраняет ссылку на него в `player`.
2. `let target = player` присваивает `target` то же объектное значение. В обеих переменных теперь ссылки на один объект. Это не ссылка `target` на переменную `player`: каждая переменная даёт доступ к объекту самостоятельно.
3. `target.hp = 50` обращается к объекту по ссылке из `target` и <a href="https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-putvalue">записывает новое значение в свойство</a> `hp`. Меняется общий объект, поэтому и `target.hp`, и `player.hp` теперь равны `50`.
4. `target = null` заменяет значение только переменной `target`. Теперь в ней `null` вместо ссылки. Значение `player` и сам объект не меняются; объект по-прежнему доступен через `player`.

<figure class="references-map" aria-label="После изменения hp обе переменные ссылаются на объект с hp 50. После присваивания target значения null ссылка player и объект сохраняются">
  <div class="references-map__snapshot">
    <span>Изменили свойство</span><code class="references-map__operation">target.hp = 50</code>
    <div class="references-map__connections">
      <code class="references-map__variable">player</code><span class="references-map__arrow" aria-hidden="true">→</span>
      <div class="references-map__object"><strong>Объект игрока</strong><code>{ hp: <b>50</b> }</code></div>
      <code class="references-map__variable">target</code><span class="references-map__arrow" aria-hidden="true">→</span>
    </div>
    <p>Свойство изменилось. Обе ссылки сохранились.</p>
  </div>
  <div class="references-map__snapshot">
    <span>Изменили переменную</span><code class="references-map__operation">target = null</code>
    <div class="references-map__connections">
      <code class="references-map__variable">player</code><span class="references-map__arrow" aria-hidden="true">→</span>
      <div class="references-map__object"><strong>Тот же объект</strong><code>{ hp: <b>50</b> }</code></div>
      <code class="references-map__variable references-map__variable--null">target<br><small>null</small></code><span aria-hidden="true"></span>
    </div>
    <p><code>target</code> больше не ведёт к объекту. <code>player</code> по-прежнему ведёт.</p>
  </div>
  <figcaption>Два последовательных состояния одной программы. Во втором состоянии объект тот же: изменилось только значение <code>target</code>.</figcaption>
</figure>

<aside class="lesson-note" aria-labelledby="const-reference-note-title">
  <span class="lesson-note__label">Важно</span><h3 id="const-reference-note-title">Что запрещает const</h3>
  <p><a href="https://tc39.es/ecma262/multipage/ecmascript-language-statements-and-declarations.html#sec-let-and-const-declarations"><code>const</code></a> запрещает присваивать переменной другое значение. Например, <code>player = null</code> в этом примере вызовет ошибку <a href="https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-declarative-environment-records-setmutablebinding-n-v-s">TypeError</a>.</p>
  <p>Изменять <a href="https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-object-type">свойства объекта</a> при этом можно: <code>player.hp = 50</code> допустимо. Переменная <code>player</code> продолжает ссылаться на тот же объект.</p>
  <p><code>target</code> объявлена через <code>let</code>, поэтому ей можно присвоить другое значение, в том числе <code>null</code>.</p>
</aside>
