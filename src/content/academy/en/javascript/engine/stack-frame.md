---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 11,
  "title": "A stack frame is a call’s state",
  "concept": "Parameters and return",
  "description": "One function, two calls, two independent sets of data.",
  "takeaway": "Local state belongs to a particular invocation; the engine chooses its physical representation.",
  "sources": [
    {
      "title": "ECMA-262 · Execution Contexts",
      "url": "https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-execution-contexts",
      "note": "The abstract model of execution contexts and their stack."
    }
  ],
  "simulation": "frames",
  "locale": "en",
  "translationKey": "javascript/engine/stack-frame"
}
---

Calls to the same function do not share one single set of parameters. Each invocation has its own execution state: arguments, current operation, and return location.

```js
function double(value) {
  const result = value * 2;
  return result;
}
const first = double(3);
const second = double(8);
```

In the first call, `value` is `3`; in the second, it is `8`. The returned values are `6` and `16`. **[Execution context](https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-execution-contexts)** is a specification concept; a stack frame is an implementation detail useful for our model.

This does not imply that every local variable physically resides on the stack. A value may occupy a register, be optimized away, or remain in an environment accessible to a closure. Lifetime semantics and storage mechanisms are different levels of explanation.

We will study environments in depth in the execution-context lesson. For now, the distinction is between a particular invocation and the function object.
