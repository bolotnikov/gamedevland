---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 16,
  "title": "One JS thread ≠ one thread in the whole engine",
  "concept": "Concurrency and the host",
  "description": "Separating JS call order from V8’s background work.",
  "takeaway": "Background compilation and GC do not turn a synchronous update into a parallel function.",
  "sources": [
    {
      "title": "ECMA-262 · Agents",
      "url": "https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-agents",
      "note": "The ECMAScript agent model."
    },
    {
      "title": "HTML Standard · Web Workers",
      "url": "https://html.spec.whatwg.org/multipage/workers.html#workers",
      "note": "The normative Worker model."
    },
    {
      "title": "V8 · Orinoco GC",
      "url": "https://v8.dev/blog/trash-talk",
      "note": "Reachability, generations, and parallel/concurrent collector work."
    }
  ],
  "simulation": "threads",
  "locale": "en",
  "translationKey": "javascript/engine/threads"
}
---

Calling JavaScript “single-threaded” usually refers to sequential code execution within a particular agent. It does not mean the entire browser or V8 runs on one thread.

The engine can prepare code and perform some garbage-collection work in the background. The browser separately organizes networking, display, and other subsystems. A **[Web Worker](https://html.spec.whatwg.org/multipage/workers.html#workers)** provides an additional JavaScript execution context with its own environment; communication commonly uses messages.

```js
async function buildMap() {
  return generateMap(); // Still runs on the calling JS thread
}
```

`async` changes the result contract; it does not move `generateMap()` into a Worker. For map generation, explicitly choose where and how the work runs, accounting for data transfer and environment support.

The diagram switches roles rather than measuring real thread utilization. We will cover task and microtask scheduling in the Event Loop lesson.
