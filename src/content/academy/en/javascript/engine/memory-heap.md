---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 12,
  "title": "Memory Heap: objects and relationships",
  "concept": "Program memory",
  "description": "Creating an object and referring to it are different things.",
  "takeaway": "A heap models managed object memory; it is neither a queue nor the binary-heap data structure.",
  "sources": [
    {
      "title": "ECMA-262 · Object Type",
      "url": "https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-object-type",
      "note": "Object properties and identity; physical memory placement is not prescribed."
    },
    {
      "title": "V8 · Heap and allocation",
      "url": "https://v8.dev/blog/trash-talk",
      "note": "Managed object memory and its collection in V8."
    }
  ],
  "simulation": "heap",
  "locale": "en",
  "translationKey": "javascript/engine/memory-heap"
}
---

A player object must exist while the program can access it. The engine allocates memory and organizes property access. **[Memory heap](https://v8.dev/blog/trash-talk)** is the conventional name for an area of managed object memory.

```js
const player = { hp: 100 };
const target = player;
target.hp = 80;
// player.hp is also 80
```

`target` does not automatically receive an object copy. Both names provide access to the same identity. The diagram’s arrows represent this relationship; `object #1` is a teaching label, not a V8 memory address.

“All primitives are on the stack, all objects on the heap” is too crude. The specification defines values and object behavior without requiring a particular physical storage layout. An optimizer can even eliminate some allocations if observable behavior is preserved.

For game architecture, a more useful question is: **who retains the object, and when should they stop retaining it?**
