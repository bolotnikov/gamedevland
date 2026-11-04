---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 14,
  "title": "GC finds reachable objects",
  "concept": "Reachability",
  "description": "Garbage consists of objects the program can no longer access through references.",
  "takeaway": "If no reference path from the roots leads to an object, GC can release its memory. The engine decides when that happens.",
  "sources": [
    {
      "title": "V8 · Orinoco GC",
      "url": "https://v8.dev/blog/trash-talk",
      "note": "Following references from the roots: reachable objects are retained; unreachable objects can be collected."
    },
    {
      "title": "ECMA-262 · PutValue",
      "url": "https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-putvalue",
      "note": "Assigning a new value to an object property. Writing null replaces the reference without deleting the object itself."
    }
  ],
  "simulation": "reachability-graph",
  "locale": "en",
  "translationKey": "javascript/engine/garbage-collection"
}
---


[The garbage collector (GC)](https://v8.dev/blog/trash-talk#marking) starts from the roots and follows references. The objects it finds are still accessible to the program, so it retains them. Memory occupied by the remaining objects can be released.

<aside class="lesson-note" aria-labelledby="gc-roots-note-title">
  <span class="lesson-note__label">Term</span><h3 id="gc-roots-note-title">Roots</h3>
  <p>The starting points from which GC checks object references. Examples include the global object and the data of current function calls.</p>
</aside>

The example contains the chain **root → scene → player**. These objects are accessible only through the connections shown.

The buttons [replace a reference with `null`](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-putvalue):

- **Scene → player:** the player becomes unreachable; the scene remains accessible.
- **Root → scene:** both objects become unreachable.
