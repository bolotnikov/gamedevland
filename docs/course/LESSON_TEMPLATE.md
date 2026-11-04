# Section and lesson authoring standard

Public hierarchy: course → section → lesson. A section is a topic group such as Engine or
Event Loop; an individual lesson is one short page on a single concept. The former “lesson”
groups and “steps” have been renamed accordingly. Existing internal `lesson`/`step` identifiers
remain unchanged for route and progress compatibility.

Read AGENTS.md and CONTEXT.md first. Use the Engine lesson as the current native example.
Read `docs/EDITORIAL_STYLE.md` for the required authorial voice in both languages.
Alex approved the current Russian `engine-and-runtime.md` (step 01) on 2026-11-03 as the
reference for course structure and presentation. Use that approved version as the baseline.

## Structure

1. Curriculum entry: title, summary, availability. Never link an unpublished lesson.
2. Lesson introduction: outcome, prerequisites, suggested time, contents, start/resume.
3. Approximately 12–25 separately addressable lessons per section, one concept each.
4. Theory before exercises; end with a self-check quiz. No separate free-text/interview lesson.
5. Review supplied answers before recording mastery or a grade.

## Lesson source

Create `src/content/academy/<locale>/<course>/<section>/<slug>.md` and extend the collection's
course/section identifiers and routing when actually adding another section. The existing
frontmatter field for the section is named `lesson` for compatibility.
Frontmatter must include locale, translationKey, course, lesson, unique positive order, title, concept,
description, and one or more sources (title, official URL, substantiation note).
Optionally include a takeaway, simulation, or assessment. Omit the takeaway when no conclusion is needed;
an absent/null value, blank string, or list without non-blank items renders no takeaway block or heading.
`description` is a short subtitle under the H1. The shared `.step-description` style sets
it apart from body prose on all steps; do not include it again as an opening paragraph.
`takeaway` accepts a string or an ordered list of strings. Step 01 uses three items:
ECMAScript, engine, runtime. Keep that step focused on their distinction. Its approved
machine-code byte example and definition callout remain in step 01. The detailed CPU
execution-path diagram is removed; parsing, bytecode, interpreters, and JIT are covered later.

Use a few complete explanatory paragraphs and a focused highlighted code example where useful.
Do not flatten deep ideas into unexplained labels. If a step becomes too long, split the idea
across steps rather than removing the mechanism. Keep code comments in English.

## Evidence

Research exact official clauses before writing. Each source link must substantiate the local
claim. Distinguish ECMA-262 semantics from V8 internals and browser host behavior. Use exact
anchors when practical. Independently authored articles are not allowed references.
Date-sensitive details must be rechecked. Mark conceptual diagrams/pseudobytecode explicitly.

For SDK lessons, teach practical API use in plain tutorial prose. Present the SDK as a universal
foundation for HTML5 games across genres; a specific game is an API example, not a required
course project. Keep each lesson close to
one desktop screen, with only a little scrolling. Prefer a short text block and lightweight
diagram; avoid long chains of excerpts and repeated summaries in overview lessons. Start concept lessons with a
short “Зачем это нужно” callout when the purpose needs explanation. Describe the problem and
benefit, then introduce the API. Reuse existing motivation without duplicating it; setup
instructions with an obvious goal do not require an extra callout. Introduce code by what it
does, not by a formal “teaching contract” label. Link the exact Block Puzzle file alongside
quoted game code, with a brief natural indication when adapting or shortening it. Do not
present new examples as existing game files. One SDK repository root link in the first lesson
is enough; implementation links belong in research metadata, not repeated public reading.
The SDK renderer hides those implementation references and labels useful game/official links
“Источники”. The shared renderer supplies external-link target/rel attributes.

## Interaction

Use the approved JavaScript Engine graphics as the reference: HTML/CSS, concise labels,
clear relationships, distinct color accents, and concept-specific layouts. Alex withdrew
the SVG-first requirement after reviewing the SDK diagrams; do not use SVG diagrams for
this work. Preserve useful JavaScript/Canvas interactions, including user input. Graphics
must be self-contained, theme-aware, readable on narrow screens, and technically accurate.

First decide whether interaction helps explain the mechanism. Use a static infographic for
relationships that can be understood at a glance. No interaction for recoloring alone, no
duplicate controls, and no decorative “laboratory/model” labels. Keep headings minimal.

Use the approved AST and scanner lessons as interaction references: changed grouping must
change the tree/result; scanning must highlight the actual source and reveal recognized
tokens. Prefer one clearly named action over numbered state tabs plus duplicate next controls.

Show the starting state, meaningful intermediate changes, and result. Provide a reset and
allow revisiting states. Highlight the relevant instruction in execution traces. Do not use
eval, pretend to inspect real internals, fabricate benchmark numbers, or run unbounded work.
Use bespoke visuals when a generic diagram would obscure the mechanism.
Use the FSM and AI/SDK article diagrams as the quality reference for grouping, connectors,
numbered stages, color accents, and visual hierarchy. Keep all effects theme-aware, brief,
and compatible with reduced motion. A step must not become an uninterrupted wall of text.
Link first introductions of significant terms to official documentation in both languages.
External references use a new tab; the shared Markdown renderer sets target and rel attributes.

## Experience

- Shared site header and theme; responsive on narrow screens; no independent HTML wrapper.
- TOC, current step, explicit completion, previous/next, and resume.
- Browser-local, versioned progress and answer drafts; malformed/blocked storage cannot break content.
- Visible keyboard focus, semantic controls, reduced motion, and live result announcements.
- Links to official evidence after each step.

## Assessment

SDK material is practical API documentation: omit quizzes and knowledge-check lessons. Add
interaction only when it clarifies a complex mechanism or API nuance; basic JSON validation
does not need an interactive form. The rules below apply to JavaScript assessments.

Self-check: targeted questions, explanatory feedback, links to remediation, no invented grade.
Do not require written answers or instructor assessment unless Alex explicitly requests them.

## Verification

Run typecheck, lint, build. With local browser authorization, inspect desktop/narrow layouts,
both themes, simulation transitions/reset/end, quiz feedback, progress and draft persistence.
Keep local-only until Alex authorizes publication.

## Translation workflow

Author and revise Russian steps first, including primary-source notes, diagram text, quizzes,
accessibility labels, and feedback. Alex reviews Russian material before translation. Do not
create or update English text during this phase. Existing English versions remain in place.

After Russian approval, wait for a separate explicit translation request. In that task,
prepare equivalent English steps, keep translationKey and simulation/assessment identifiers
the same, preserve code, meaning, numbers, and official source URLs, and complete dictionary
translations. English uses unprefixed routes; RU uses `/ru/`. Run `npm run check:locales`
after the bilingual build. Published-language parity must not trigger unsolicited translation
of drafts; adapt local preview/staging only when a Russian-only draft actually requires it.
