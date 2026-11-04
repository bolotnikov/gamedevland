# Academy course plan

Updated: 2026-11-03.

## Current delivery scope

One catalog card: **Advanced JavaScript** (**Продвинутый JavaScript** in Russian). Only section 01 is implemented, with 19 lessons.
Each course has its own curriculum; each section has individual lesson pages with shared contents.
Sections 02–11 are preserved as comments in `src/data/academy.ts` and are hidden from the public curriculum.
Future topics should be added as real courses when requested, not empty catalog cards.

## JavaScript curriculum

| Order | Section | Current status |
| --- | --- | --- |
| 01 | JavaScript Engine: V8, scanner/parser, AST, bytecode, Ignition, JIT, stack, heap, GC | Prepared locally, awaiting Alex's review |
| 02 | Event Loop: tasks, microtasks, async/await, rendering, frame budget | Planned; approved standalone reference available |
| 03 | Execution Context, Scope, Hoisting, TDZ | Planned |
| 04 | Closures and data lifetime | Planned |
| 05 | this: invocation, binding, arrows, callbacks | Planned |
| 06 | Prototypes, properties, classes, object model | Planned |
| 07 | Promises, async/await, concurrency, cancellation | Planned |
| 08 | Memory management, GC, leaks, snapshots | Planned |
| 09 | V8 optimization, shapes, inline caches, deoptimization | Planned |
| 10 | Browser runtime, Workers, boundaries | Planned |
| 11 | Engineering lab: profiling, architecture, interview | Planned |

## Historical broader learning roadmap

The transferred ChatGPT discussion proposed 63 lessons across seven tracks:
JavaScript 11, TypeScript 9, Software/Game Architecture 14, PixiJS 10, Three.js 5,
AI Development 9, Tech Lead/Interview 5. It recommended interleaving tracks with dependencies.
It did not supply a complete approved 63-item chronological syllabus. Do not invent one or
present a draft as an approved program. Current implementation follows the later explicit
request for separate course catalogs and only the first JavaScript section. The former lesson
groups are now called sections; their former steps are the individual lessons.

Likely later courses include TypeScript, game architecture, PixiJS, Three.js, game patterns,
data structures, and AI-assisted engineering. Confirm their concrete syllabus when authoring.
