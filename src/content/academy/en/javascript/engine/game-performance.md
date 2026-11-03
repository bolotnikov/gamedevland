---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 17,
  "title": "From engine internals to game decisions",
  "concept": "Engineering practice",
  "description": "Measure first: startup, a hot path, or memory retention?",
  "takeaway": "Optimization should address a confirmed problem; its effect must be checked in the target environment.",
  "sources": [
    {
      "title": "Chrome DevTools · Performance",
      "url": "https://developer.chrome.com/docs/devtools/performance",
      "note": "Official tools for recording and analyzing performance."
    },
    {
      "title": "Chrome DevTools · Memory",
      "url": "https://developer.chrome.com/docs/devtools/memory-problems",
      "note": "Official tools for diagnosing memory use, leaks, and frequent collections."
    }
  ],
  "simulation": "performance",
  "locale": "en",
  "translationKey": "javascript/engine/game-performance"
}
---

Understanding V8 helps formulate testable hypotheses. Slow startup suggests examining bundle size, parsing/compilation, and initialization. An expensive `update()` calls for locating the specific function and work structure. Memory growth between scenes calls for investigating object retention.

**These are different symptoms.** Rewriting objects for “correct hidden classes” need not fix a slow network startup. An object pool will not remove a listener that keeps an old scene alive.

For an experiment, we will fix the device and scenario, record [a profile](https://developer.chrome.com/docs/devtools/performance), change one meaningful factor, and compare results. We also need to account for warmup: initial execution and steady-state execution answer different questions.

The panel lists the next diagnostic step for each symptom. Any illustrative values are not benchmark results or promises of a speedup. The goal is to connect mechanisms with observable HTML5 game behavior.
