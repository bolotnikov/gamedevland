---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 7,
  "title": "How an interpreter works",
  "concept": "Executing bytecode",
  "description": "The interpreter reads bytecode instructions and executes the corresponding handlers.",
  "takeaway": "Ignition executes bytecode. It does not read the original JavaScript one line at a time.",
  "sources": [
    {
      "title": "V8 · Ignition",
      "url": "https://v8.dev/docs/ignition",
      "note": "The official description of the register-based interpreter."
    },
    {
      "title": "V8 · Sparkplug",
      "url": "https://v8.dev/blog/sparkplug",
      "note": "Baseline compilation from bytecode to machine code."
    }
  ],
  "simulation": "interpreter",
  "locale": "en",
  "translationKey": "javascript/engine/interpreter"
}
---

An [interpreter](https://v8.dev/docs/ignition) selects the next bytecode instruction, runs its handler, and continues. For a program, this might look like “obtain a value → perform an operation → return a result.”

The CPU executes the machine code **of the interpreter itself**. Bytecode remains data that directs its work. Saying “an interpreter uses no machine code” or “JavaScript simply executes line by line” is therefore misleading.

Interpretation has overhead for selecting instructions and dispatching handlers. In exchange, it avoids spending substantial time optimizing every function in advance. This is useful for cold code that executes once or only a few times.

**In a game scene**, a loading branch and `update()` may have completely different execution profiles. The same solution will not necessarily be equally beneficial to both.
