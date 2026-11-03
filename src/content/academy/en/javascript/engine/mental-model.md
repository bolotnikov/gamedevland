---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 18,
  "title": "How the engine’s mechanisms fit together",
  "concept": "Review",
  "description": "Explain the program’s path without mixing levels.",
  "takeaway": "A good model connects language semantics, code representation, execution, and data lifetime.",
  "sources": [
    {
      "title": "ECMA-262 · Execution Contexts",
      "url": "https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-execution-contexts",
      "note": "The abstract model of execution contexts and their stack."
    },
    {
      "title": "V8 · Ignition",
      "url": "https://v8.dev/docs/ignition",
      "note": "The official description of the register-based interpreter."
    },
    {
      "title": "ECMA-262 · Object Type",
      "url": "https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-object-type",
      "note": "Object properties and identity; physical memory placement is not prescribed."
    }
  ],
  "simulation": "recap",
  "locale": "en",
  "translationKey": "javascript/engine/mental-model"
}
---

We can now connect the stages: **ECMAScript defines the rules → V8 prepares code → instructions execute → calls create state → objects remain alive through reachability**. The runtime supplies additional external APIs.

Keep the boundaries clear. An [AST](https://v8.dev/blog/scanner) is not bytecode. Bytecode is not machine code. The specification’s context stack does not require every variable to physically occupy the machine stack. GC does not remove the need for lifecycle ownership. JIT does not promise an instantly optimized game.

Let’s examine what happens with `const enemy = spawnEnemy()`: code preparation, a function call, a returned object, and the relationship from a variable. Then we will add a condition: the enemy enters a global cache. Why is function completion no longer enough to make the object eligible for collection?

The diagram’s prompts help review the main mechanisms. We will then continue to the self-check to identify the parts that need further explanation.
