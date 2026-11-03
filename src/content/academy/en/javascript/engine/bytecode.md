---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 6,
  "title": "Bytecode: the virtual machine’s language",
  "concept": "AST → instructions",
  "description": "An intermediate representation that is different from machine code.",
  "takeaway": "V8 bytecode is an internal program representation; the CPU does not execute it as native instructions.",
  "sources": [
    {
      "title": "V8 · Ignition",
      "url": "https://v8.dev/docs/ignition",
      "note": "The official description of the register-based interpreter."
    },
    {
      "title": "V8 · Ignition design",
      "url": "https://v8.dev/blog/ignition-interpreter",
      "note": "The motivation for bytecode and the design of the V8 interpreter."
    }
  ],
  "simulation": "bytecode",
  "locale": "en",
  "translationKey": "javascript/engine/bytecode"
}
---

Bytecode consists of compact instructions for a virtual machine. Instead of the source notation “add values,” there is a sequence of operations: obtain an argument, load a value, add, and return the result.

```js
function add(a, b) {
  return a + b;
}
```

The panel below shows **pseudobytecode**, not the output of a particular V8 version. Real [Ignition](https://v8.dev/docs/ignition) has an accumulator, virtual-machine registers, specialized instructions, and supporting data. Their format can change.

Distinguish three things: **program text**, **bytecode for an interpreter**, and **machine code for a CPU**. A compact intermediate representation helps execution begin without immediately running an expensive optimizing compiler.

The simulation uses arguments `2` and `3`. Let’s follow the instructions in order and determine which step produces the result. A general addition operation must still respect JavaScript’s type semantics.
