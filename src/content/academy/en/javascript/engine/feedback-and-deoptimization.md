---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 9,
  "title": "Optimization relies on assumptions",
  "concept": "Feedback → specialization → deopt",
  "description": "What changes when a string reaches code previously called with numbers.",
  "takeaway": "Deoptimization preserves program semantics when optimized code’s assumptions no longer apply.",
  "sources": [
    {
      "title": "V8 · Maglev",
      "url": "https://v8.dev/blog/maglev",
      "note": "Execution tiers, feedback, and speculative optimization."
    },
    {
      "title": "V8 · Maps / Hidden Classes",
      "url": "https://v8.dev/docs/hidden-classes",
      "note": "Feedback about object shapes and the assumptions optimized code depends on."
    },
    {
      "title": "ECMA-262 · Addition",
      "url": "https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-addition-operator-plus",
      "note": "The semantics of numeric addition and string concatenation."
    }
  ],
  "simulation": "deopt",
  "locale": "en",
  "translationKey": "javascript/engine/feedback-and-deoptimization"
}
---

If `add(a, b)` often receives numbers, an optimizing compiler can prepare a specialized path with guards for its assumptions. This accelerates a dynamic language without changing its rules.

```js
function add(a, b) { return a + b; }
add(2, 3);     // 5
add('2', 3);   // '23'
```

When an assumption fails, the engine may use another execution path or **[deoptimization](https://v8.dev/blog/maglev)**: reconstructing state for less specialized code. The program must still return `'23'`, rather than incorrectly performing numeric addition.

A type change does not guarantee a deopt in every version or on every call. Our simulation shows **one possible scenario**. Object shapes and [inline caches](https://v8.dev/docs/hidden-classes) also provide feedback; we will cover them in the optimization lesson.

Before changing the use of dynamic objects for JIT performance, we need to record a profile, identify the expensive section, and determine the cause of its cost.
