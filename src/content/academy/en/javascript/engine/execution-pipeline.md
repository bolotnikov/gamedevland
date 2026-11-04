---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 2,
  "title": "How V8 executes JavaScript",
  "concept": "Overview",
  "description": "From source code to processor instructions.",
  "takeaway": "An AST describes structure; bytecode contains instructions for the Ignition interpreter; machine code contains instructions for the CPU.",
  "sources": [
    {
      "title": "V8 · Scanner",
      "url": "https://v8.dev/blog/scanner",
      "note": "The V8 team's explanation of tokenization and the path from source text to an AST."
    },
    {
      "title": "V8 · Sparkplug",
      "url": "https://v8.dev/blog/sparkplug",
      "note": "Baseline compilation from bytecode to machine code."
    },
    {
      "title": "V8 · Lazy parsing",
      "url": "https://v8.dev/blog/preparser",
      "note": "Why a function's full preparation can be deferred until it is called."
    }
  ],
  "simulation": "pipeline",
  "locale": "en",
  "translationKey": "javascript/engine/execution-pipeline"
}
---


Consider the expression `const damage = 2 + 3;`. It is a short statement for a person. For the engine, it starts as a **sequence of characters**. [The scanner](https://v8.dev/blog/scanner) recognizes tokens, the parser builds the program's structure, and the bytecode generator turns it into executable instructions.

In V8, initial execution usually involves **[Ignition](https://v8.dev/docs/ignition)**. Some code may later receive a machine-code version, prepared quickly by a baseline compiler or optimized more extensively.

Different functions in the same program can run in different ways. V8 might interpret one function while already having generated machine code for another. It can defer preparing functions that are not needed yet. On a later call, it can reuse code that has already been prepared.
