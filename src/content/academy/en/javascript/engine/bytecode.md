---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 6,
  "title": "Bytecode: instructions for Ignition",
  "concept": "AST → instructions",
  "description": "How the bytecode generator turns an AST into instructions for Ignition.",
  "takeaway": "Bytecode contains instructions for Ignition. The bytecode generator creates them from the AST produced by the parser.",
  "sources": [
    {
      "title": "V8 · Ignition",
      "url": "https://v8.dev/docs/ignition",
      "note": "The official description of the register-based interpreter."
    },
    {
      "title": "V8 · Ignition design",
      "url": "https://v8.dev/blog/ignition-interpreter",
      "note": "The purpose of bytecode and the design of V8's interpreter."
    },
    {
      "title": "V8 · Embedding the virtual machine",
      "url": "https://v8.dev/docs/embed#advanced-guide",
      "note": "The official documentation calls V8 itself a virtual machine and describes how to embed it in an application."
    },
    {
      "title": "V8 · Generating bytecode from an AST",
      "url": "https://v8.dev/blog/background-compilation#building-a-background-thread-bytecode-compiler",
      "note": "The generator takes the parser's AST and produces a sequence of instructions for Ignition."
    }
  ],
  "locale": "en",
  "translationKey": "javascript/engine/bytecode"
}
---


Bytecode contains compact instructions for the **[Ignition](https://v8.dev/docs/ignition)** interpreter. They describe the operations to perform: obtain a value, add numbers, call a function, or return a result.

<aside class="lesson-note" aria-labelledby="bytecode-generator-note-title">
  <span class="lesson-note__label">Term</span><h3 id="bytecode-generator-note-title">Bytecode generator</h3>
  <p><a href="https://v8.dev/blog/background-compilation#building-a-background-thread-bytecode-compiler">The V8 component that takes an AST from the parser and generates bytecode.</a> It walks the tree and writes instructions for the program's constructs.</p>
</aside>

<div class="bytecode-origin" role="img" aria-label="The parser builds an AST, the bytecode generator turns the tree into instructions, and Ignition executes them">
  <div><strong>Parser</strong><span>Builds the AST</span></div><b aria-hidden="true">→</b><div class="is-generator"><strong>Bytecode generator</strong><span>AST → instructions</span></div><b aria-hidden="true">→</b><div><strong>Ignition</strong><span>Executes instructions</span></div>
</div>

<aside class="lesson-note" aria-labelledby="virtual-machine-note-title">
  <span class="lesson-note__label">Term</span><h3 id="virtual-machine-note-title">Virtual machine</h3>
  <p>A software system that executes JavaScript and manages memory and function calls. The term refers to <a href="https://v8.dev/docs/embed#advanced-guide">V8</a> itself: “engine” and “virtual machine” are two names for the same system here. <strong>Ignition</strong> is the bytecode interpreter within that system.</p>
</aside>

```js
function add(a, b) {
  return a + b;
}
```

For this function, the generator produces instructions whose meaning is: obtain `a`, add `b`, and return the result. Bytecode describes these operations; Ignition executes them.

In the [next lesson](../interpreter/) we will step through these instructions and see how the result changes.
