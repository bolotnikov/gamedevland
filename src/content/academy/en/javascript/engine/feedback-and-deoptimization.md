---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 9,
  "title": "Optimization relies on assumptions",
  "concept": "Feedback → specialization → deopt",
  "description": "What changes when code that handled numbers receives a string.",
  "takeaway": "Deoptimization preserves program behavior when the assumptions of optimized code no longer hold.",
  "sources": [
    {
      "title": "V8 · Maglev",
      "url": "https://v8.dev/blog/maglev",
      "note": "Execution tiers, feedback, and speculative optimization."
    },
    {
      "title": "V8 · Maps / Hidden Classes",
      "url": "https://v8.dev/docs/hidden-classes",
      "note": "Feedback about object shapes and the assumptions behind optimized code."
    },
    {
      "title": "ECMA-262 · Addition",
      "url": "https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-addition-operator-plus",
      "note": "The semantics of numeric addition and string concatenation."
    }
  ],
  "locale": "en",
  "translationKey": "javascript/engine/feedback-and-deoptimization"
}
---


If `add(a, b)` frequently receives numbers, the optimizing compiler may prepare a specialized execution path with assumption checks. This can make a dynamic language faster while preserving its rules.

```js
function add(a, b) { return a + b; }
add(2, 3);     // 5
add('2', 3);   // '23'
```

When an assumption fails, execution may take another path or use **[deoptimization](https://v8.dev/blog/maglev)**: restoring the state needed by less specialized code. The program must still return `'23'` rather than perform an incorrect numeric addition.

<figure class="deopt-map" aria-label="Checking an assumption: numeric execution or deoptimization when a string is passed">
  <div class="deopt-map__assumption">
    <span>After repeated calls with numbers</span>
    <strong>V8 may generate machine code for numeric addition</strong>
    <p>That code checks the assumption that <code>a</code> and <code>b</code> are numbers.</p>
  </div>
  <div class="deopt-map__branches">
    <div class="deopt-map__branch tone-green">
      <code class="deopt-map__call">add(2, 3)</code>
      <span class="deopt-map__arrow" aria-hidden="true">↓</span>
      <strong>✓ Check passed</strong>
      <p>Both arguments are numbers.</p>
      <span class="deopt-map__arrow" aria-hidden="true">↓</span>
      <div class="deopt-map__execution"><strong>Numeric addition</strong><p>The prepared machine code runs.</p></div>
      <div class="deopt-map__result"><span>Result · number</span><code>5</code></div>
    </div>
    <div class="deopt-map__branch tone-amber">
      <code class="deopt-map__call">add('2', 3)</code>
      <span class="deopt-map__arrow" aria-hidden="true">↓</span>
      <strong>× Check failed</strong>
      <p>The first argument is a string.</p>
      <span class="deopt-map__arrow" aria-hidden="true">↓</span>
      <div class="deopt-map__execution"><strong>Deoptimization is possible</strong><p>V8 restores the state and continues execution through Ignition.</p></div>
      <div class="deopt-map__result"><span>Result · string</span><code>'23'</code></div>
    </div>
  </div>
  <figcaption>This is one possible scenario. Passing a string does not necessarily cause deoptimization: the function may have another suitable execution path.</figcaption>
</figure>

Object shapes and [inline caches](https://v8.dev/docs/hidden-classes) also provide feedback. We will examine them in the section on optimization.

Before changing dynamic-object code for JIT performance, record a profile, identify an expensive part of the program, and determine why it is expensive.
