---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 2,
  "title": "How text becomes execution",
  "concept": "The overall map",
  "description": "Five representations of one program: from characters to processor instructions.",
  "takeaway": "An AST describes structure; bytecode contains virtual-machine instructions; machine code contains CPU instructions.",
  "sources": [
    {
      "title": "V8 · Scanner",
      "url": "https://v8.dev/blog/scanner",
      "note": "The V8 team explains tokenization and the path from text to AST."
    },
    {
      "title": "V8 · Sparkplug",
      "url": "https://v8.dev/blog/sparkplug",
      "note": "Baseline compilation from bytecode to machine code."
    }
  ],
  "simulation": "pipeline",
  "locale": "en",
  "translationKey": "javascript/engine/execution-pipeline"
}
---

Let’s examine the expression `const damage = 2 + 3;`. To a person, this is a short instruction. To an engine, it begins as a **sequence of characters**. The [scanner](https://v8.dev/blog/scanner) identifies tokens, the parser builds program structure, and a bytecode generator produces instructions suitable for execution.

In V8, initial execution is usually associated with **[Ignition](https://v8.dev/docs/ignition)**. Some code can later acquire a machine-code version: one produced quickly by a baseline compiler, or one optimized more thoroughly.

This is a map of the main transformations, not a schedule for the entire program. Different functions can occupy different tiers, reuse previously prepared code, or be compiled later. Not every function must pass through every tier.

For playable ads, both budgets matter: **how quickly the game starts** and **how quickly hot logic runs**. Expensive optimization may not pay for itself during a short session.
