---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 10,
  "title": "Call Stack: what is running now",
  "concept": "Call → return",
  "description": "Pushing and popping stack frames in the correct order.",
  "takeaway": "A nested call executes before the function that called it continues.",
  "sources": [
    {
      "title": "ECMA-262 · Execution Contexts",
      "url": "https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-execution-contexts",
      "note": "The abstract model of execution contexts and their stack."
    }
  ],
  "simulation": "stack",
  "locale": "en",
  "translationKey": "javascript/engine/call-stack"
}
---

When `start()` calls `update()`, `start()` waits for it to return. When `update()` calls `damage()`, `damage()` becomes current. On return, control travels in the opposite direction.

```js
function damage() { return 10; }
function update() { return damage(); }
function start() { return update(); }
start();
```

This is **LIFO: last in, first out**. The stack remembers where execution should continue after a nested call. [ECMA-262](https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-execution-contexts) describes an execution-context stack; V8’s actual machine frames can differ because of inlining and other optimizations.

In the simulation, `script` is an illustrative lower boundary for the running script. Using “Next action,” we can follow the changes to the top frame. We show logical call order, not a native stack dump.

If a synchronous call takes a long time to return, another JavaScript callback on the same thread will not automatically preempt it.
