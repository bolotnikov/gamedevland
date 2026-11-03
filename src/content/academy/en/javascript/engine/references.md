---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 13,
  "title": "Mutate the object or replace the reference?",
  "concept": "Identity and assignment",
  "description": "Why const does not make an object immutable.",
  "takeaway": "Assigning another value to one variable does not change the values of other variables.",
  "sources": [
    {
      "title": "ECMA-262 · Object Type",
      "url": "https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-object-type",
      "note": "Object properties and identity; physical memory placement is not prescribed."
    },
    {
      "title": "ECMA-262 · Declarative Environment Records",
      "url": "https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-declarative-environment-records",
      "note": "Creating and updating bindings, including immutable bindings."
    }
  ],
  "simulation": "references",
  "locale": "en",
  "translationKey": "javascript/engine/references"
}
---

[`const`](https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-declarative-environment-records) prevents reassigning the binding; it does not freeze the object. `player.hp = 50` changes a property, while `target = null` changes another variable’s value.

```js
const player = { hp: 100 };
let target = player;
target.hp = 50;
target = null;
// player.hp is 50; the object is still reachable
```

After the property changes, both access paths observe `hp: 50`. After `target = null`, only one arrow disappears. The object remains accessible through `player`.

This helps when reading game-service code: clearing a local variable does not clear an enemy array, event listener, or cache that retains another relationship. Conversely, replacing a service field need not change an object already passed elsewhere.

JavaScript passes arguments **by value**; for an object, that value preserves its identity. The ability to mutate a shared object does not imply the ability to reassign the caller’s binding.
