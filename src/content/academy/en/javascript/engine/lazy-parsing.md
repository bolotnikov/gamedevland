---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 5,
  "title": "Not everything needs compiling immediately",
  "concept": "Startup and lazy parsing",
  "description": "Why source size and startup cost are related, but not identical.",
  "takeaway": "V8 can defer full function processing; source text still has a cost.",
  "sources": [
    {
      "title": "V8 · Lazy parsing",
      "url": "https://v8.dev/blog/preparser",
      "note": "The preparser, deferred function preparation, and the cost of eager compilation."
    }
  ],
  "simulation": "lazy",
  "locale": "en",
  "translationKey": "javascript/engine/lazy-parsing"
}
---

Let’s consider an SDK containing level-editor logic that is never called during an ad session. Fully parsing and compiling every such function at startup would be expensive.

V8 uses **[lazy parsing](https://v8.dev/blog/preparser)**: for suitable functions, a preparser performs a reduced pass and full preparation is deferred. This does not mean the engine “ignores everything inside”: it still needs to check syntax conditions and collect required scope information.

```js
function startGame() { /* Needed immediately */ }
function openEditor() { /* May never be called */ }
startGame();
```

Caching, heuristics, and engine version affect the actual path. A single line of code cannot establish the exact compilation time. When preparing a playable, we will first remove unnecessary code from the delivered bundle: lazy parsing does not eliminate the costs of transferring, decoding, and storing source text.
