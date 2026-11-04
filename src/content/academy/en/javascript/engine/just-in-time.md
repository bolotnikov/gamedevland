---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 8,
  "title": "JIT: why V8 has several compilers",
  "concept": "Bytecode → machine code",
  "description": "Why V8 uses an interpreter and several compilers.",
  "takeaway": "JIT compilation generates machine code while the program runs. Several compilers let V8 balance compilation cost against subsequent execution speed.",
  "sources": [
    {
      "title": "V8 · Sparkplug",
      "url": "https://v8.dev/blog/sparkplug",
      "note": "Sparkplug quickly translates bytecode into machine code, reducing the interpreter's instruction-reading and dispatch overhead."
    },
    {
      "title": "V8 · Maglev",
      "url": "https://v8.dev/blog/maglev",
      "note": "Why Maglev was added between Sparkplug and TurboFan, and how it uses observations of function execution."
    },
    {
      "title": "V8 · TurboFan",
      "url": "https://v8.dev/blog/leaving-the-sea-of-nodes",
      "note": "The V8 team on TurboFan's role as its most advanced optimizing compiler and the evolution of its internal architecture."
    }
  ],
  "locale": "en",
  "translationKey": "javascript/engine/just-in-time"
}
---


In the previous lesson, we saw how [Ignition](https://v8.dev/docs/ignition) executes bytecode: it reads an instruction, selects its handler, and moves on. To reduce the cost of these operations, V8 can generate a machine-code version of the function. Running that version no longer requires selecting a handler for each bytecode instruction.

<aside class="lesson-note" aria-labelledby="jit-note-title">
  <span class="lesson-note__label">Term</span><h3 id="jit-note-title">JIT compilation</h3>
  <p><strong>Just-in-time compilation</strong> means generating machine code while the program runs. After compilation, the CPU can execute the function's machine-code version.</p>
  <p>Optimization also removes unnecessary work while preserving program behavior. More complex transformations may require more compilation time.</p>
</aside>

If a function is called once, lengthy optimization may not pay off. For a function that repeatedly performs substantial work, faster subsequent calls may offset the compilation cost. V8 therefore has several compilers with different roles.

**Ignition is an interpreter. Sparkplug, Maglev, and TurboFan are compilers within the same V8 engine.** We will compare their roles:

<dl class="jit-comparison" aria-label="Comparing V8's interpreter and compilers">
  <div class="jit-comparison__card tone-cyan">
    <dt><span>Interpreter</span><a href="https://v8.dev/docs/ignition">Ignition</a></dt>
    <dd>Executes bytecode through handlers. It does not need a separate machine-code version of the function.</dd>
    <dd class="jit-comparison__purpose">Allows execution to start without JIT-compiling the function.</dd>
  </div>
  <div class="jit-comparison__card tone-green">
    <dt><span>Fast compiler</span><a href="https://v8.dev/blog/sparkplug">Sparkplug</a></dt>
    <dd>Quickly translates bytecode into machine code without extensive optimization.</dd>
    <dd class="jit-comparison__purpose">Reduces interpretation overhead with a small compilation cost.</dd>
  </div>
  <div class="jit-comparison__card tone-violet">
    <dt><span>Optimizing compiler</span><a href="https://v8.dev/blog/maglev">Maglev</a></dt>
    <dd>Uses observations of the function, such as value types, to generate faster machine code.</dd>
    <dd class="jit-comparison__purpose">Invests more in optimization than Sparkplug, while being designed to compile faster than TurboFan.</dd>
  </div>
  <div class="jit-comparison__card tone-amber">
    <dt><span>Optimizing compiler</span><a href="https://v8.dev/docs/turbofan">TurboFan</a></dt>
    <dd>Applies more extensive optimizations to generate fast code for functions that account for a significant share of execution time.</dd>
    <dd class="jit-comparison__purpose">More expensive compilation can pay off when a function runs for a long time or is called repeatedly.</dd>
  </div>
</dl>

<aside class="lesson-note is-green" aria-labelledby="execution-tier-note-title">
  <span class="lesson-note__label">Term</span><h3 id="execution-tier-note-title">Execution tier</h3>
  <p>A way of executing a function: interpreting bytecode or running machine code produced by a compiler. The “top tier” in this comparison is TurboFan optimization.</p>
</aside>

**V8 makes the decision for each function separately.** A function does not have to pass through every tier listed here. The choice depends on the engine version, settings, and observations of program execution.
