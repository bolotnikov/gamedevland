---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 16,
  "title": "JavaScript threads",
  "concept": "Threads",
  "description": "Where page code runs and what a Web Worker is for.",
  "takeaway": "Code on one thread runs sequentially. A Web Worker runs JavaScript separately. async alone does not move computation to another thread.",
  "sources": [
    {
      "title": "HTML Standard · Web Workers",
      "url": "https://html.spec.whatwg.org/multipage/workers.html#workers",
      "note": "Running JavaScript separately and exchanging messages with the page."
    },
    {
      "title": "ECMA-262 · AsyncFunctionStart",
      "url": "https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-async-functions-abstract-operations-async-function-start",
      "note": "Calling an async function begins executing its body on the current thread."
    },
    {
      "title": "ECMA-262 · Promise Objects",
      "url": "https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-promise-objects",
      "note": "A Promise represents an operation's result or failure."
    },
    {
      "title": "V8 · Background compilation",
      "url": "https://v8.dev/blog/background-compilation",
      "note": "The engine can perform some code preparation on a background thread."
    },
    {
      "title": "V8 · Orinoco GC",
      "url": "https://v8.dev/blog/trash-talk#concurrent",
      "note": "Some garbage-collection work can run in the background."
    }
  ],
  "locale": "en",
  "translationKey": "javascript/engine/threads"
}
---

**A thread** executes code sequentially. Page code usually runs on the browser's main thread, where game logic and input handlers execute.

If a long calculation runs on this thread, such as map generation, click handlers must wait for it to finish. The game may stop responding to player input as a result.

<aside class="lesson-note" aria-labelledby="web-worker-note-title">
  <span class="lesson-note__label">Term</span><h3 id="web-worker-note-title">Web Worker</h3>
  <p><a href="https://html.spec.whatwg.org/multipage/workers.html#workers">A browser mechanism for running JavaScript on a separate thread.</a> The program creates a Worker and sends it a task. For example, the Worker can calculate a map while the main thread keeps processing input.</p>
  <p>The page and Worker exchange data through messages: the page sends a task, and the Worker returns the result.</p>
</aside>

<figure class="thread-map" aria-label="The main thread executes page code while a separate Worker calculates a map. They exchange messages. V8 also uses background threads for its own tasks">
  <div class="thread-map__browser">
    <span class="thread-map__label">Browser</span>
    <div class="thread-map__lanes">
      <div class="thread-map__lane">
        <strong>Main thread</strong><p>Page code · sequential</p>
        <div class="thread-map__task">Process input</div><span class="thread-map__down" aria-hidden="true">↓</span><div class="thread-map__task">Update the game</div>
      </div>
      <div class="thread-map__messages"><span>Task →</span><span>← Result</span><small>Messages</small></div>
      <div class="thread-map__lane is-worker">
        <strong>Worker thread</strong><p>Task code · separate from the page</p>
        <div class="thread-map__task thread-map__task--long"><code>generateMap()</code><span>Calculate the map</span></div>
      </div>
    </div>
    <div class="thread-map__engine"><strong>V8 background threads</strong><p>Some code preparation and garbage-collection work.</p></div>
  </div>
  <figcaption>The main thread and a Worker can run at the same time. Within each thread, code runs sequentially.</figcaption>
</figure>

V8 also has its own <a href="https://v8.dev/blog/background-compilation">background tasks</a>, such as preparing code and <a href="https://v8.dev/blog/trash-talk#concurrent">some garbage-collection work</a>. The engine schedules these tasks itself. To move a game function to another thread, the application must create a Worker and run the code there.

## What async does

<a id="что-делает-async" class="translation-anchor" aria-hidden="true"></a>

A function declared with <a href="https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-async-functions-abstract-operations-async-function-start"><code>async</code></a> returns a Promise.

<aside class="lesson-note" aria-labelledby="thread-promise-note-title">
  <span class="lesson-note__label">Term</span><h3 id="thread-promise-note-title">Promise</h3>
  <p><a href="https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-promise-objects">An object through which a program receives an operation's result or failure.</a> A Promise does not start a separate thread by itself.</p>
</aside>

```js
async function buildMap() {
  return generateMap(); // Still runs on the calling JS thread
}
```

Here, `generateMap()` runs on the same thread that called ` buildMap()`. If the calculation takes a long time, the thread stays busy throughout. Adding ` async` does not move the calculation to a Worker.
