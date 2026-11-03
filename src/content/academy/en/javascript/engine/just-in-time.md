---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 8,
  "title": "JIT: spend time to save time",
  "concept": "Tiered execution",
  "description": "Fast startup and high peak speed involve different trade-offs.",
  "takeaway": "JIT compiles during execution. Baseline compilation and optimizing compilation are different tiers.",
  "sources": [
    {
      "title": "V8 · Sparkplug",
      "url": "https://v8.dev/blog/sparkplug",
      "note": "Baseline compilation from bytecode to machine code."
    },
    {
      "title": "V8 · Maglev",
      "url": "https://v8.dev/blog/maglev",
      "note": "Execution tiers, feedback, and speculative optimization."
    },
    {
      "title": "V8 · TurboFan",
      "url": "https://v8.dev/docs/turbofan",
      "note": "Official material on the optimizing compiler."
    }
  ],
  "simulation": "jit",
  "locale": "en",
  "translationKey": "javascript/engine/just-in-time"
}
---

**Just-in-time compilation** generates machine code while a program is running. JIT does not necessarily mean sophisticated optimization. [Sparkplug](https://v8.dev/blog/sparkplug) quickly translates bytecode into machine code, removing some interpretation overhead.

[Maglev](https://v8.dev/blog/maglev) and the top optimizing tier put more work into improving code, using information from actual execution among other inputs. Historically, the upper tier is described through [TurboFan](https://v8.dev/docs/turbofan); V8’s infrastructure continues to evolve, including Turboshaft.

Our ladder is a **conceptual map**, not a guaranteed sequence. Tier selection depends on the build, platform, heuristics, and version. Applications have no universal rule such as “a function becomes optimized after 100 calls.”

For a short ad session, warmup cost matters: fast code obtained too late will not fix slow startup. In the simulation, we select tiers manually; we are not controlling the real V8 engine.
