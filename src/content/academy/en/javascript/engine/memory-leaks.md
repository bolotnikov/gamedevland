---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 15,
  "title": "Memory leaks: a reference keeps the object alive",
  "concept": "Scene lifecycle",
  "description": "Finishing a scene does not automatically make its event listener unreachable.",
  "takeaway": "dispose should remove the scene's long-lived connections.",
  "sources": [
    {
      "title": "Chrome DevTools · Memory",
      "url": "https://developer.chrome.com/docs/devtools/memory-problems",
      "note": "Official tools for diagnosing memory use, leaks, and frequent garbage collections."
    },
    {
      "title": "DOM Standard · removeEventListener",
      "url": "https://dom.spec.whatwg.org/#dom-eventtarget-removeeventlistener",
      "note": "The standard's rules for removing listeners: type, callback, and capture must match."
    }
  ],
  "simulation": "leak",
  "locale": "en",
  "translationKey": "javascript/engine/memory-leaks"
}
---


The player closed the scene, but a global event target still holds a callback that uses its data. To the developer, the scene has finished. To the garbage collector, it remains reachable.

```js
function mount(scene) {
  const onResize = () => scene.resize();
  window.addEventListener('resize', onResize);
  return () => window.removeEventListener('resize', onResize);
}
```

`mount(scene)` returns a cleanup function. When the scene is no longer needed, that function must be called: it removes the ` onResize` from ` window`. The call to [` removeEventListener`](https://dom.spec.whatwg.org/#dom-eventtarget-removeeventlistener) must receive **the same handler**that was originally added.

To find a leak in an application, we can compare [memory snapshots](https://developer.chrome.com/docs/devtools/memory-problems) after opening and closing the scene several times and check what still keeps it in memory.
