---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 15,
  "title": "A leak: the graph still needs the object",
  "concept": "Scene lifecycle",
  "description": "Closing a scene does not automatically make its listener unreachable.",
  "takeaway": "dispose must break the long-lived relationships owned by the scene.",
  "sources": [
    {
      "title": "Chrome DevTools · Memory",
      "url": "https://developer.chrome.com/docs/devtools/memory-problems",
      "note": "Official tools for diagnosing memory use, leaks, and frequent collections."
    },
    {
      "title": "DOM Standard · removeEventListener",
      "url": "https://dom.spec.whatwg.org/#dom-eventtarget-removeeventlistener",
      "note": "The normative listener-removal contract: type, callback, and capture must match."
    }
  ],
  "simulation": "leak",
  "locale": "en",
  "translationKey": "javascript/engine/memory-leaks"
}
---

The player closed a scene, but a global event target still retains a callback that uses its data. To the developer, the scene has “finished.” To the collector, it remains reachable.

```js
function mount(scene) {
  const onResize = () => scene.resize();
  window.addEventListener('resize', onResize);
  return () => window.removeEventListener('resize', onResize);
}
```

The lifecycle owner must call the cleanup function and remove **the same callback**. A new arrow function passed to [`removeEventListener`](https://dom.spec.whatwg.org/#dom-eventtarget-removeeventlistener) will not work. Check ticker subscriptions, timers, and long-lived caches in the same way.

The model shows an explicit retaining chain to `scene`. Cleanup removes it. In an application, we will reproduce several scene open/close cycles, compare [heap snapshots](https://developer.chrome.com/docs/devtools/memory-problems), and find the retaining path. One increase in heap size does not prove a leak: the behavior must be repeatable and the retention path explainable.
