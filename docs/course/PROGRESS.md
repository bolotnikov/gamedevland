# Learning progress

Updated: 2026-11-04.

| Course / section | Material status | Learning status | Teacher grade |
| --- | --- | --- | --- |
| JavaScript 01 — Engine / V8 | All 19 Russian lessons and Academy/course/section pages approved; English translation prepared for the authorized bilingual release; separate free-text/interview lesson removed | Studied earlier in ChatGPT; no new learner assessment supplied | Not supplied |
| JavaScript 02 — Event Loop | Approved standalone v2 exists as reference; native integration not implemented | Lesson was current in transferred discussion; answers not supplied here | Not supplied |
| JavaScript 03–11 | Curriculum only | Not assessed | — |
| GameDevLand SDK — section 01 | All 12 Russian lessons approved; English translation prepared for the authorized bilingual release | Not assessed | Not supplied |
| GameDevLand SDK — sections 02–04 | 30 Russian draft lessons; unavailable In Progress cards only | Not assessed | Not supplied |
| Other courses | Future work | Not assessed | — |

Browser UI progress is stored per browser, independently of this document. Viewing steps is
not a teacher assessment. Update learning status and scores only from actual user answers/review.

Alex approved the current Russian lesson 01 in section 01 on 2026-11-03 as the course authoring
baseline. On 2026-11-04 he approved all 19 Russian lessons and explicitly requested their English translation.
Alex explicitly approved the revised scanner interaction in Russian lesson 03 on 2026-11-03
as a reference for future interactive examples, alongside the AST example in lesson 04.
Alex approved the revised Russian Memory Heap lesson (12) on 2026-11-03 as a reference for
turning official technical material into clear explanations, examples, and infographics.
On 2026-11-04 Alex authorized committing, pushing, and publishing the approved Russian material
and its English translation through the existing GitHub Pages CI/CD pipeline. This replaces the
earlier no-production checkpoint restriction for this release only. Learning status and grades
remain unchanged; editorial approval is not a learner assessment.

### SDK practical tutorial revision — 2026-11-04

- Replaced formal per-snippet contract introductions with concise action/result explanations.
- Preserved adjacent links to actual Block Puzzle files; kept new examples distinct from game excerpts.
- Reduced public SDK repository references to one root link in the first lesson. Implementation
  references remain research metadata and are excluded from the rendered bibliography.
- Kept the API catalog, with links to relevant course lessons instead of implementation files.
- Updated AGENTS.md, the lesson template and context to preserve this approach in future work.
- Verified all 46 local lesson URLs and 76 rendered Block Puzzle file links (new-tab attributes).
- Typecheck, lint, production build and locale checks passed. Browser QA covered practical
  setup prose and the API catalog in light/dark themes, including a narrow viewport.
- SDK material remains local-only; no publication or push performed.

### SDK documentation focus — 2026-11-04

- Removed the JSON board editor and its controller/styles from the schema-decoder lesson.
- Removed all four SDK knowledge-check lessons and the SDK quiz component/data.
- Updated contents, progress wording and section endings; remaining counts are 12/12/15/3
  (42 lessons). Existing lesson IDs and explicit completion marks are preserved.
- Reserved interaction for complex mechanisms or API nuances; the FSM execution trace remains.
- JavaScript quizzes remain unchanged. SDK changes are local-only.

### SDK motivation — 2026-11-04

- Added concise “Зачем это нужно” callouts to 20 SDK concept lessons, including decoding,
  configuration and persistence. Reused motivating introductions where already present.
- Covered assets, DI/lifetimes, events/FSM/commands, presentation and platform abstraction;
  left clear setup instructions and the API catalog without redundant introductory blocks.
- Preserved code, diagrams, sources, URLs and the 42-lesson structure. Local-only.

### SDK startup and lesson order — 2026-11-04

- Rewrote boot.md as a linked Block Puzzle startup/loading walkthrough: GameConfig, automatic
  loading, boot scene/FSM, commands, preload service/request and transition to game.
- Used real game excerpts and a static numbered sequence of calls/events; no decorative
  interaction, platform loading signal or SDK version framing.
- Distinguished loadBundle completion from the required-result check in loadRequiredBundle.
- Moved new-project to the end of foundations; GameConfig and boot follow entry-point.
  Preserved all 42 lesson URLs and slug-based progress identities. Local-only.

### SDK boot brevity correction — 2026-11-04

- Alex rejected the detailed boot walkthrough. Replaced it with one short motivation block
  and a three-stage diagram linked to actual game files. Removed code excerpts, API table,
  extra takeaway and repeated source list from the rendered lesson.
- Preserved the improved lesson order, with new-project at the end of foundations.
- Reinforced the one-screen target in AGENTS.md and the SDK lesson template. Local-only.

### SDK universal positioning — 2026-11-04

- Replaced the shared Block Puzzle overview graphic with three genre examples connected to
  one SDK foundation, in both the catalog and course page.
- Reframed the course description and section outcomes around connecting and using a
  universal HTML5 SDK. Specific game excerpts remain individual API examples.
- Updated authoring instructions and context to supersede the earlier Block Puzzle-first rule.
- Typecheck, lint, build and locale checks passed. Browser QA covered the course and catalog
  graphics in both themes and a narrow layout; corrected mobile spacing. Local-only.

### SDK section 01 English and release validation — 2026-11-04

- Translated all 12 approved foundations lessons, figures, accessibility labels, source notes
  and takeaways. Kept code blocks, source URLs, IDs and ordering equivalent to Russian.
- Localized Academy/course/section UI and the shared puzzle/platformer/racing illustration.
- Added reciprocal heading anchors for language switching and preserved shared progress IDs.
- Section metadata exposes only foundations; 02–04 are visible disabled In Progress cards
  with no links or arrows, and no generated public routes. Russian drafts remain in source.
- Validation: typecheck/lint/build/locales passed (99 content pairs, 206 pages); all English
  SDK pages checked for untranslated prose/labels, code parity and local link targets.
- Browser QA: English course illustration, locked cards/click behavior, both themes, narrow
  layout, section language switch and a 12-lesson table of contents. Publication authorized.


### Cyber UI, publishing services, and language preference - 2026-11-08

- Alex approved the concise Russian Cyber UI course and requested its English translation
  and production release. Both languages now have 16 lessons and 12 Canvas examples.
- Merged panel decoration/sweep lessons, button pricing, and SDK effects into their main
  topics; old URLs redirect to the corresponding lesson in each language.
- Each interactive lesson shows its short description, then Canvas and controls beside
  highlighted public API code. Controls update both; application setup stays in installation.
- Error glyph, signal loss, and emblem brackets animate. Irrelevant controls are hidden.
- Added the approved bilingual publishing support page content and landscape AI Defender
  screenshot to services. The portfolio keeps its approved square game icon.
- At the root, saved language takes priority over supported browser languages, with EN
  fallback. Explicit localized links stay addressable; manual choices are persisted.
- Validation covers public exports, matching bilingual code, 93 interactive API variants,
  11 language preference cases, production build, and locale metadata. Browser QA includes
  both languages, layouts, language persistence, and image roles.

### SDK renderers — Russian review — 2026-11-11

- Alex requested a local SDK course update against the latest releases and explicitly asked
  for a separate explanatory lesson for each of the four renderer compositions.
- Verified npm Engine 0.0.13 / tooling 0.2.2 and local release `sdk-2026-11-10` (`be74f9d`).
  Public lessons teach current APIs without release numbers.
- Added seven Russian-only drafts: renderer comparison, Pixi-only, Three-only, Three + Pixi,
  Pixi + Three-as-texture, GLB ownership, and ordered presentation. Dev/academy-preview shows
  52 lessons (12/13/15/7/5) in five sections; production still includes the approved 45 lesson identities.
- Corrected renderer selection, concrete Pixi imports, required component/action `nodeType`,
  engine-owned storage, strict asset loading/eviction, localization, autoplay, optional Matter,
  scene cancellation/warmup, focus behavior, diagnostics, and Playgama setup.
- Regenerated the Russian API reference from TypeScript public exports: 24 modules, 347
  exports with pinned declaration evidence. English retains the approved reference/content.
- Alex requested a separate rendering section after reviewing the initial layout. All seven
  Russian drafts now live under `/ru/academy/sdk/rendering/`; presentation retains 15 lessons.
  Preserved published lesson URLs/progress IDs/order and added preview redirects for all seven
  previously shared draft URLs. The new section is Russian-only and unpublished.
- Styled the renderer comparison table with spaced cells, row borders and wrapping for long
  module names. Verified desktop/narrow layouts in light/dark themes without horizontal overflow.
- Alex will review Russian text locally and authorize translation and deployment separately.
  No commit, push, translation, or deployment is authorized/performed for this revision.

### SDK renderer release authorization and English translation — 2026-11-11

- Alex approved the Russian course changes and explicitly requested English translation and deploy.
- Translated changes in 22 existing lessons and seven new rendering lessons; code blocks, IDs,
  asset paths, numbers and source URLs remain equivalent. Added an anchor alias for the new
  diagnostics heading to preserve fragment navigation when switching languages.
- Published rendering in both locales and consolidated the API catalog into one current source.
  Course inventory is five sections, 52 lessons; presentation retains its 15 lessons.
- Local typecheck/lint/build/locales, Cyber UI examples and language-preference checks passed.
  Browser QA checked the English section/comparison, language switching and narrow table layout.
- Release scope excludes existing AI Defender portfolio and media preparation edits.
