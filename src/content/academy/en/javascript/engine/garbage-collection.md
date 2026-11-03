---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 14,
  "title": "GC looks for reachable objects",
  "concept": "Reachability",
  "description": "Garbage does not mean “an object that has not been used recently.”",
  "takeaway": "Unreachability makes memory eligible for collection, but does not determine collection time.",
  "sources": [
    {
      "title": "V8 · Orinoco GC",
      "url": "https://v8.dev/blog/trash-talk",
      "note": "Reachability, generations, and parallel/concurrent collector work."
    }
  ],
  "simulation": "gc",
  "locale": "en",
  "translationKey": "javascript/engine/garbage-collection"
}
---

A collector starts at roots, such as live execution state and global relationships, then follows references. Objects it can reach must be preserved. A cycle of two objects does not by itself make them immortal if there is no longer an external path to them.

Our teaching graph contains a root, a scene, a player, and a temporary object. Let’s remove the scene relationship and run the **marking model** to see which nodes are no longer reachable.

Real [V8](https://v8.dev/blog/trash-talk) does much more: it accounts for generations and uses several techniques, including parallel and concurrent work. These reduce latency, but do not eliminate all pauses.

The button below **does not run the browser’s GC**. Assigning `x = null` does not guarantee that memory will be freed immediately. Both allocation frequency and data lifetime matter for frames; introduce pooling after measurement.
