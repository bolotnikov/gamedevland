---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 11,
  "title": "Stack frame: the state of a function call",
  "concept": "Arguments and return",
  "description": "Each call has its own arguments, local values, and return location.",
  "takeaway": "A stack frame stores the state of a particular function call: the data needed to execute it and where execution resumes when the function returns.",
  "sources": [
    {
      "title": "ECMA-262 · Execution Contexts",
      "url": "https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-execution-contexts",
      "note": "How the specification describes the state of individual calls and the execution-context stack."
    },
    {
      "title": "V8 · Stack frames",
      "url": "https://v8.dev/blog/sparkplug#interpreter-compatible-frames",
      "note": "The V8 team on function-call state, local values, and returning control."
    }
  ],
  "locale": "en",
  "translationKey": "javascript/engine/stack-frame"
}
---


In the previous lesson, we looked at the call stack. Each entry must let the engine resume a particular call by remembering its data and where to return control.

<aside class="lesson-note" aria-labelledby="stack-frame-note-title">
  <span class="lesson-note__label">Term</span><h3 id="stack-frame-note-title">Stack frame</h3>
  <p>The data the engine saves for an individual function call. In the diagram, this includes arguments, local values, the current execution position, and where to return after <code>return</code>.</p>
</aside>

Consider two calls to the same function:

```js
function double(value) {
  const result = value * 2;
  return result;
}
const first = double(3);
const second = double(8);
```

1. For `double(3)`, the engine needs the values ` value = 3` and ` result = 6`. After ` return`, the number `6` is assigned to ` first`.
2. The first call finishes and its frame is popped off the stack.
3. The call to `double(8)` gets its own frame: now ` value = 8`, ` result = 16`, and the result must be returned to ` second`.

<figure class="frame-map" aria-label="Two consecutive calls to double have their own arguments, local values, and return locations">
  <div class="frame-map__snapshot">
    <span>First call · before return</span>
    <div class="frame-map__frame"><strong>Frame for double(3)</strong><dl><div><dt>Argument</dt><dd><code>value = 3</code></dd></div><div><dt>Local value</dt><dd><code>result = 6</code></dd></div><div><dt>Where the result goes</dt><dd>To the assignment to <code>first</code></dd></div></dl></div>
    <div class="frame-map__return"><span aria-hidden="true">↓</span><code>return 6</code><span>After returning: <code>first = 6</code></span></div>
  </div>
  <div class="frame-map__snapshot">
    <span>Next call · before return</span>
    <div class="frame-map__frame"><strong>Frame for double(8)</strong><dl><div><dt>Argument</dt><dd><code>value = 8</code></dd></div><div><dt>Local value</dt><dd><code>result = 16</code></dd></div><div><dt>Where the result goes</dt><dd>To the assignment to <code>second</code></dd></div></dl></div>
    <div class="frame-map__return"><span aria-hidden="true">↓</span><code>return 16</code><span>After returning: <code>second = 16</code></span></div>
  </div>
  <figcaption>Two moments during execution. The first call has already finished when the second begins. The diagram shows call data, not V8's exact memory layout.</figcaption>
</figure>

During nested calls, the caller's frame stays on the stack while the called function runs. This lets the engine resume the previous function with its data after `return`. It also works for recursion, where a function calls itself.

The specification describes execution state through [execution contexts](https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-execution-contexts). Stack frames are one way of organizing that state inside the engine.
