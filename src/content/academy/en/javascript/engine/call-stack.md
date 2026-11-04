---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 10,
  "title": "Call Stack: which function is running",
  "concept": "Call → return",
  "description": "Pushing and popping stack frames in the correct order.",
  "takeaway": "A nested call runs before its calling function can continue.",
  "sources": [
    {
      "title": "ECMA-262 · Execution Contexts",
      "url": "https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-execution-contexts",
      "note": "Execution contexts and their stack in the specification."
    }
  ],
  "simulation": "stack",
  "locale": "en",
  "translationKey": "javascript/engine/call-stack"
}
---


When `start()` calls ` update()`, execution of ` start()` waits for the return. When ` update()` calls ` damage()`, the active function becomes ` damage()`. On return, control moves back in the opposite order.

```js
function damage() { return 10; }
function update() { return damage(); }
function start() { return update(); }
start();
```

This is the **LIFO: last in, first out** principle. The stack records where execution should continue after a nested call. The [ECMA-262](https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-execution-contexts) specification defines a stack of execution contexts; V8's actual machine-level frames may differ because of inlining and other optimizations.

In the simulation `script` represents the base of the running script in this diagram. The “Next action” button traces changes to the top frame. The diagram shows the logical order of calls, rather than a native stack dump.

If a synchronous call takes a long time to return, another JavaScript callback on the same thread cannot interrupt it on its own.
