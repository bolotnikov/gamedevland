---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 13,
  "title": "Changing an object or replacing a reference?",
  "concept": "An object and its reference",
  "description": "How changing a property differs from assigning a variable, and what const prevents.",
  "takeaway": [
    "A variable with an object value accesses the object through a reference. Assigning this value to another variable copies the reference, not the object.",
    "Changing a property changes the shared object. Assigning a different value to one variable replaces only its own reference, leaving the other references and the object unchanged.",
    "const prevents replacing the variable's value; it does not make the object itself immutable."
  ],
  "sources": [
    {
      "title": "ECMA-262 · Object Type",
      "url": "https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-object-type",
      "note": "An object consists of properties; reading or changing a property operates on the object itself."
    },
    {
      "title": "ECMA-262 · Let and Const Declarations",
      "url": "https://tc39.es/ecma262/multipage/ecmascript-language-statements-and-declarations.html#sec-let-and-const-declarations",
      "note": "Declaring variables with let and const and assigning their initial values."
    },
    {
      "title": "ECMA-262 · SetMutableBinding",
      "url": "https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-declarative-environment-records-setmutablebinding-n-v-s",
      "note": "Assignment changes a particular variable's value; attempting to replace a const value throws a TypeError."
    },
    {
      "title": "ECMA-262 · GetValue / PutValue",
      "url": "https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-putvalue",
      "note": "Reading values, and the distinction between writing an object property and assigning a variable."
    },
    {
      "title": "V8 · Pointer Compression",
      "url": "https://v8.dev/blog/pointer-compression",
      "note": "The internal representation of object references: pointers and compressed offsets rather than numeric addresses exposed to JavaScript."
    },
    {
      "title": "V8 · Moving objects and updating pointers",
      "url": "https://v8.dev/blog/trash-talk#minor-gc-scavenger",
      "note": "When V8's garbage collector moves objects, it updates the references pointing to them."
    }
  ],
  "simulation": "reference-trace",
  "locale": "en",
  "translationKey": "javascript/engine/references"
}
---


In the previous lesson, we examined two variables that refer to one object. Now we will compare two actions: **changing an object property** and **assigning a different value to a variable**.

<aside class="lesson-note" aria-labelledby="reference-address-note-title">
  <span class="lesson-note__label">Term</span><h3 id="reference-address-note-title">References and memory addresses</h3>
  <p>In <a href="https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-object-type">ECMAScript</a>, a variable's value in this example is an object value. Memory explanations often use the simpler wording: the variable holds a <strong>reference to the object</strong> that the engine can use to access it.</p>
  <p>Inside <a href="https://v8.dev/blog/pointer-compression">V8</a>, references are represented by pointers, including compressed forms. “Copying an address” is therefore a useful approximation, but a more precise description is <strong>“copying a reference to the same object”</strong>. JavaScript does not expose a numeric address to read or change here.</p>
  <p>V8 can also <a href="https://v8.dev/blog/trash-talk#minor-gc-scavenger">move the object and update its references</a>. To the program, it remains the same object.</p>
</aside>

```js
const player = { hp: 100 };
let target = player;
target.hp = 50;
target = null;
// player.hp is 50; the object is still reachable
```

1. `const player = { hp: 100 }` creates an object and stores a reference to it in ` player`.
2. `let target = player` assigns to ` target` the same object value. Both variables now hold references to one object. This is not a reference from ` target` to the variable ` player`: each variable provides access to the object independently.
3. `target.hp = 50` accesses the object through the reference held by ` target` and <a href="https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-putvalue">writes a new value to its</a> ` hp`property. The shared object changes, so both ` target.hp`and ` player.hp` now equal `50`.
4. `target = null` replaces only the value of ` target`. It now holds ` null` instead of a reference. The value of ` player` and the object itself stay the same; the object remains accessible through ` player`.

<figure class="references-map" aria-label="After changing hp, both variables refer to the object with hp 50. After setting target to null, the player reference and the object remain">
  <div class="references-map__snapshot">
    <span>Changed the property</span><code class="references-map__operation">target.hp = 50</code>
    <div class="references-map__connections">
      <code class="references-map__variable">player</code><span class="references-map__arrow" aria-hidden="true">→</span>
      <div class="references-map__object"><strong>Player object</strong><code>{ hp: <b>50</b> }</code></div>
      <code class="references-map__variable">target</code><span class="references-map__arrow" aria-hidden="true">→</span>
    </div>
    <p>The property changed. Both references remain.</p>
  </div>
  <div class="references-map__snapshot">
    <span>Changed the variable</span><code class="references-map__operation">target = null</code>
    <div class="references-map__connections">
      <code class="references-map__variable">player</code><span class="references-map__arrow" aria-hidden="true">→</span>
      <div class="references-map__object"><strong>The same object</strong><code>{ hp: <b>50</b> }</code></div>
      <code class="references-map__variable references-map__variable--null">target<br><small>null</small></code><span aria-hidden="true"></span>
    </div>
    <p><code>target</code> no longer points to the object. <code>player</code> still does.</p>
  </div>
  <figcaption>Two consecutive states of one program. The object in the second state is the same; only the value of <code>target</code> has changed.</figcaption>
</figure>

<aside class="lesson-note" aria-labelledby="const-reference-note-title">
  <span class="lesson-note__label">Note</span><h3 id="const-reference-note-title">What const prevents</h3>
  <p><a href="https://tc39.es/ecma262/multipage/ecmascript-language-statements-and-declarations.html#sec-let-and-const-declarations"><code>const</code></a> prevents assigning a different value to the variable. For example, <code>player = null</code> in this example throws a <a href="https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-declarative-environment-records-setmutablebinding-n-v-s">TypeError</a>.</p>
  <p>Changing the object's <a href="https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-object-type">properties</a> is allowed: <code>player.hp = 50</code> is valid. The variable <code>player</code> continues to refer to the same object.</p>
  <p><code>target</code> is declared with <code>let</code>, so it can be assigned a different value, including <code>null</code>.</p>
</aside>
