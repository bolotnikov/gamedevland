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

## GameDevLand SDK — foundations bilingual release (2026-11-04)

| Section | Lessons | Scope |
| --- | --- | --- |
| 01 — Foundations | 12 | Architecture, existing project, entry-point walkthrough, GameConfig, boot/loading walkthrough, assets, decoding, configs, persistence, localization, new project |
| 02 — Scene flow | 12 | Scenes, DI/providers/scopes, services/domain, events, FSM, commands, placement, async ownership, runtime/pause, diagnostics |
| 03 — Presentation and runtime systems | 15 | Layouts, nodes/rendering, screen, components, actions, prefabs, input/drag, tweens, audio, particles/filters, physics, API reference |
| 04 — Platforms and external APIs | 3 | Platform adapters, loading signals, Poki build/tooling |

Every lesson has primary-source references and an HTML/CSS infographic. The FSM queue trace
demonstrates execution order. There are no quizzes or JSON board editor;
this material focuses on practical API use. Add interaction only for a complex mechanism or
API nuance that benefits from user action.
The API reference indexes 338 exports across 20 public Engine modules and the Vite entry point.
Section 01 is approved and translated for bilingual publication. Sections 02–04 remain
Russian drafts: visible In Progress cards, no public routes. The course illustration, shared
UI and all 12 foundations lessons are available in English and Russian.

## GameDevLand SDK — rendering bilingual release (2026-11-11)

Alex approved Russian content and authorized English translation and deployment.

| Section | Lessons | Scope |
| --- | --- | --- |
| 01 — Startup and data | 12 | Startup, configuration, assets, decoding, saves and localization |
| 02 — Game architecture | 13 | Scenes, DI, events, FSM, commands, lifecycle and diagnostics |
| 03 — Layout, input and effects | 15 | JSON layout, components, input, animation, audio, particles, physics and API reference |
| 04 — Rendering modes | 7 | Comparison, four renderer compositions, GLB and camera/world/UI ordering |
| 05 — Platforms and builds | 5 | Host platforms, loading, ads, Poki packaging and upload |

All five sections have equivalent English/Russian content. The API reference contains 347
public exports across 24 Engine entry points, plus the Vite entry point.
