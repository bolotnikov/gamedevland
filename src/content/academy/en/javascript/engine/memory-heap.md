---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 12,
  "title": "Memory Heap: where objects are stored",
  "concept": "Objects and references",
  "description": "How two variables access the same object in memory.",
  "takeaway": "The heap stores objects and their data. A variable accesses an object through a reference. Assigning its value to another variable copies the reference, not the object.",
  "sources": [
    {
      "title": "ECMA-262 · Object Type",
      "url": "https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-object-type",
      "note": "Objects and their properties. The specification does not prescribe the exact placement of objects in memory."
    },
    {
      "title": "V8 · Heap and allocation",
      "url": "https://v8.dev/blog/trash-talk",
      "note": "Managed object memory and garbage collection in V8."
    },
    {
      "title": "ECMA-262 · GetValue",
      "url": "https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-getvalue",
      "note": "Reading a variable returns its value; for an object, this is the same object, without copying its properties."
    }
  ],
  "simulation": "heap-trace",
  "locale": "en",
  "translationKey": "javascript/engine/memory-heap"
}
---


When a program creates an object `{ hp: 100 }`, its data needs to be stored somewhere. V8 stores objects in a memory area called the **[heap](https://v8.dev/blog/trash-talk)**.

<aside class="lesson-note" aria-labelledby="memory-heap-note-title">
  <span class="lesson-note__label">Term</span><h3 id="memory-heap-note-title">Memory heap</h3>
  <p>The memory area where the engine stores the program's objects and their data. V8 manages allocation and release of this memory.</p>
</aside>

<aside class="lesson-note" aria-labelledby="heap-reference-note-title">
  <span class="lesson-note__label">Term</span><h3 id="heap-reference-note-title">Object reference</h3>
  <p>Saying that a variable “holds a reference” means its value lets the engine access a particular object in memory. The object's data is not copied into every variable that refers to it.</p>
  <p><a href="https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-object-type">ECMAScript describes this as an object value</a>. The language does not expose a numeric address for the object; the engine determines how the reference is stored.</p>
</aside>

Consider how an object is created and a second reference appears:

```js
const player = { hp: 100 };
const target = player;
target.hp = 80;
// player.hp is also 80
```

1. `const player = { hp: 100 }` creates a player object. In the interactive diagram, V8 allocates heap memory for it and stores its `hp` property there. The variable `player` receives a reference to this object.
2. `const target = player` <a href="https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-getvalue">reads the value of</a> `player` and assigns it to `target`. This copies the reference: both variables now provide access to **the same object**. No second object is created.
3. `target.hp = 80` follows the reference to the object and changes its `hp` property. The references themselves stay the same. As a result, `player.hp` also becomes `80`.

<figure class="heap-map" aria-label="The player and target variables refer to one player object with hp equal to 80">
  <div class="heap-map__references">
    <div class="heap-map__reference"><code>player</code><span aria-hidden="true">→</span></div>
    <div class="heap-map__reference"><code>target</code><span aria-hidden="true">→</span></div>
  </div>
  <div class="heap-map__storage">
    <span>Heap · object memory</span>
    <div class="heap-map__object"><strong>One player object</strong><code>{ hp: <b>80</b> }</code></div>
  </div>
  <figcaption>State after <code>target.hp = 80</code>. Both arrows lead to the same object.</figcaption>
</figure>

The diagram shows the connections between the variables and the object. The engine determines the actual memory layout. Below, we will execute the example line by line: the object, references, and property values appear as execution proceeds.
