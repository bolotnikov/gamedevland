---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 5,
  "title": "Not everything needs compiling at startup",
  "concept": "Startup and lazy parsing",
  "description": "How source size relates to the work required at startup.",
  "takeaway": "V8 can defer fully parsing a function and generating its bytecode until the first call. On that call, the bytecode is generated before the function body starts executing.",
  "sources": [
    {
      "title": "V8 · Lazy parsing",
      "url": "https://v8.dev/blog/preparser",
      "note": "The preparser checks syntax and gathers scope information; on its first call, a deferred function is fully parsed and compiled to bytecode."
    },
    {
      "title": "V8 · Choosing eager compilation",
      "url": "https://v8.dev/blog/preparser#possibly-invoked-function-expressions",
      "note": "The parser makes the decision before parsing the function body. Syntax suggesting an immediate call can lead to eager compilation."
    }
  ],
  "simulation": "lazy",
  "locale": "en",
  "translationKey": "javascript/engine/lazy-parsing"
}
---


Consider a game with a built-in level editor. During normal gameplay, the editor's functions may never be called. Fully parsing and compiling them at startup would add to startup time.

With **[lazy parsing](https://v8.dev/blog/preparser)** V8 defers fully parsing a function body and generating its bytecode.

**V8's parser makes this decision while processing the source text.** If the engine settings allow lazy compilation, it is the default for ordinary function declarations.

In some cases, V8 prefers eager compilation. For example, the start of `(function () { … })()` suggests to the parser that the function may be called immediately. It therefore tries to fully parse and compile that function straight away. This is a **heuristic**: a rule based on the shape of the code that suggests the function will be needed soon. [V8's official explanation](https://v8.dev/blog/preparser#possibly-invoked-function-expressions).

Lazy compilation can also be disabled through engine settings.

```js
function startGame() { /* Needed immediately */ }
function openEditor() { /* May never be called */ }
startGame();
```

Consider how these declarations are parsed lazily on a first run, with no prepared code in the cache:

1. **Initial parsing.** The preparser checks the syntax of the function bodies and gathers the required information about variable declarations and references. Full syntax trees and bytecode for these functions have not been created yet.
2. **The call to `startGame()`.** Execution reaches the call. V8 fully parses the function body, builds its AST, and generates bytecode for the interpreter. Only then does execution enter the body of `startGame`.
3. **`openEditor()` has not been called yet.** Its full parsing and bytecode generation can remain deferred. If execution later reaches a call to it, V8 performs the same preparation before running its body.

Here, compilation produces bytecode. Generating machine code with JIT compilers is covered separately.

V8 can therefore generate bytecode ahead of time or defer generation until a function is called. The exact rules depend on the engine version and settings.
