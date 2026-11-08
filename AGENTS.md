# GameDev.Land — Project Instructions

## Scope and source of truth

These rules apply to this repository only. GameDev.Land is an existing Astro blog,
portfolio, and Academy. Preserve its framework, content, routes, and GitHub Pages pipeline.
Read this file and `docs/course/CONTEXT.md`, `COURSE_PLAN.md`, `LESSON_TEMPLATE.md`,
and `PROGRESS.md` in that directory before Academy work.

Reply to Alex in Russian. Write code comments and code documentation in English.
Preserve strict TypeScript, explicit ownership, focused changes, and existing abstractions.
Do not use unsafe casts, `any`, non-null assertions, or execute arbitrary lesson snippets.

## Academy purpose and revision workflow — mandatory

Start from ECMA-262 and official V8 implementation documentation. Read and understand the
relevant mechanism, then explain it in plain, accessible language through a concrete example
and clear infographic or useful interaction. Preserve technical accuracy and primary-source
links without copying the density or terminology of the source into the lesson unexplained.
Technical depth comes from explaining what happens and why, not from difficult wording.

For every new or revised public-facing text, use simple, clear, concise language and reduce
the explanation to what is essential for the current concept. State the mechanism directly;
remove repetition, secondary facts, and details added only for completeness. Keep the causal
explanation and conditions needed for accuracy. This applies to prose, subtitles, takeaways,
diagram captions, and simulation notes. Alex approved the shortened Russian GC lesson prose
(`garbage-collection.md`) on 2026-11-04 as the baseline for this level of brevity and clarity.

Alex approved the revised Russian Memory Heap lesson (`memory-heap.md`) on 2026-11-03 as
a reference for this approach: a clear definition, one short code example, an explanation
of each operation, and a diagram that makes the relationship obvious.

Before revising other existing lessons, read their current text and propose specific edits
for Alex's review; wait for his decision before applying them. A direct request to revise a
named lesson already authorizes that revision. Do not expand it into an unsolicited course-wide
rewrite. Preserve Alex's manual edits when preparing changes.

## Academy terminology — latest agreement

- Public hierarchy: Academy → course → section (раздел) → lesson (урок).
- In Russian course content, call an interactive diagram «интерактивная схема», not «модель».
  For other meanings of “model”, use a precise description appropriate to the context.
- The former Engine lesson is now section 01, containing 19 lessons. Event Loop is section 02.
  Former step pages are individual lessons; use these names consistently in prose, contents,
  navigation, progress, assessments, and future course planning.
- “Step” remains appropriate for an individual simulation action or diagnostic operation.
- Existing internal names are compatibility details: the `lesson` content field identifies
  a section, and `step`/`steps` identify its lesson pages. Keep existing URLs, translation keys,
  DOM hooks, and stored progress; a terminology change does not require a schema migration.
- Update Russian material first; English content still follows the separate translation workflow.

## Editorial voice — mandatory

Read `docs/EDITORIAL_STYLE.md` before writing or editing public-facing prose. Alex's four
handwritten PixiJS tutorial series are the style reference. Use a measured, practical,
step-by-step explanation with inclusive “we” or impersonal phrasing. Do not address the
reader with Russian “ты”, possessives such as “твой”, or singular informal imperatives.
Apply the same restrained voice in English, including diagrams, exercises, and UI feedback.
Preserve the original reference articles unless Alex requests their revision.

## Brevity and useful interaction — mandatory

- Keep public-facing writing and UI simple, concise, and restrained. No grandiose language,
  decorative microheadings, or promotional labels such as “Interactive lab” and “Step-by-step
  model”. Use one meaningful heading when needed; omit it if the surrounding section suffices.
- Prefer a static infographic when the reader only needs to see relationships or boundaries.
  Interaction is justified only when an action materially helps understanding: changing an
  input/result, tracing execution, testing a hypothesis, or receiving useful feedback.
- Approved interaction references are the AST lesson (`abstract-syntax-tree.md`), where
  changing grouping changes the tree and result, and the scanner lesson (`tokens.md`), where
  each action visibly highlights source text and adds a recognized token. Use these as the
  standard: the reader must see a concrete consequence of an action. For other explanations,
  default to a static infographic unless similarly meaningful interaction is demonstrated.
- Alex explicitly approved the revised `TokenScanner.astro` on 2026-11-03 as a reference:
  real source stays visible, one clearly named action reveals one token, the same fragment
  is highlighted in the source and output, and recognized tokens accumulate. Adapt this
  cause-and-effect pattern to each new concept rather than copying the same widget everywhere.
- Do not require clicks merely to recolor or rephrase the same diagram. Do not duplicate
  controls with the same purpose. Labels must describe the actual action; avoid “Next action”
  when nothing is being executed or changed. Useful controls need obvious state feedback.
- Preserve technical meaning while removing repetition and explanatory UI clutter. Brevity
  takes precedence over earlier decorative diagram/header conventions.
- Keep only information needed to understand the current step. Omit tangents, qualifications,
  and related concepts that do not help its explanation or exercise. For example, a numeric
  bytecode trace does not need an aside about JavaScript addition's type semantics.
  Keep qualifications essential for accuracy short and local.
- Define unfamiliar technical terms at their first introduction with a concise book-style
  `lesson-note` callout labelled “Термин”, following the approved machine-code example.
  Use concrete wording in the main explanation; do not require unexplained terminology to
  understand a new concept. Avoid adding further undefined terms inside a definition.
- A step's `description` is a subtitle/standfirst below its H1, not the start of the article.
  Use the shared `.step-description` styling to separate it visually on every existing and
  future step, including step 01. Keep it concise and avoid unsupported counts or extra labels.

## Russian-first authoring — mandatory

- Write and revise article/course/lesson content in Russian by default. Alex reviews the
  Russian text first. This includes titles, descriptions, diagrams, exercises, and feedback.
- English translation is a separate task, authorized only by an explicit translation request
  after Alex approves the Russian material. Approval alone does not start translation.
- During Russian review, do not create or synchronize English prose, translate each revision,
  or spend time/tokens preparing an English counterpart. Preserve existing English versions
  until translation is requested; they may temporarily differ from the Russian draft.
- This workflow supersedes earlier instructions to author/update EN and RU together. It does
  not change the URL scheme: unprefixed pages are English; Russian pages use `/ru/`.
- Translation-parity checks are release requirements, not permission to translate drafts.
  If a new Russian-only draft needs a preview path, support that narrowly when needed rather
  than inventing English filler or blocking Russian authoring on translation.

## Approved course baseline

Alex approved the Russian section 01 / lesson 01 on 2026-11-03 as the reference for subsequent
course work: `src/content/academy/ru/javascript/engine/engine-and-runtime.md`.
Follow its focused explanations, official inline references, useful code insert/term callout,
static relationship diagram, restrained styling, and concise takeaway list. Preserve the
approved machine-code byte example in that step; the detailed CPU/JIT pipeline is excluded.
Do not remove or relocate approved elements while editing another part. Approval of lesson 01
does not approve the remaining section or authorize English translation or production publication.
The approved Memory Heap lesson complements this baseline with plain-language explanations;
the AST and scanner examples establish the standard for useful interaction.

## Publication workflow

- On 2026-11-08 Alex authorized English translation and production release of the revised
  Cyber UI course, publishing service page, service landscape screenshot, portfolio icon
  correction, and remembered browser-language selection. This applies to this release only.

- On 2026-11-04 Alex approved all 19 Russian Engine lessons and the Academy, course, and
  section pages. He explicitly authorized their English translation and a bilingual production
  release through commit, push, and the existing GitHub Pages CI/CD pipeline. This authorization
  supersedes the local-only restriction for this release; it does not authorize future releases.

- On 2026-11-04 Alex approved SDK section 01 “Startup and data”, explicitly requested its
  English translation and bilingual production release through commit, push and GitHub Pages
  CI/CD. Publish only section 01 (12 lessons); show SDK sections 02–04 as disabled In Progress
  cards with no links or arrows. Translate shared course UI and the course illustration too.
  This authorization applies to this release only; later SDK sections remain unpublished.

- The current Academy work is LOCAL ONLY until Alex explicitly authorizes publication.
- Run a local server for review when requested; keep an accessible local URL for Alex.
- Do not push, deploy, or change hosting as part of lesson authoring or fixes.
- Explicit requests may authorize a commit/push checkpoint without publication. For a
  no-CI/no-production checkpoint, push a `codex/` review branch, keep `main` untouched, and
  use `[skip ci]`. Check workflow triggers first; never merge or dispatch deployment implicitly.
- Do not modify `dist/` manually. It is generated by Astro.

## Academy information architecture

- Main navigation order: Home, Academy, Portfolio, Services, About.
  The Russian label for Academy is “Обучение”; English keeps “Academy”.
- `/academy/` lists actual courses. Initially show only “Продвинутый JavaScript” / “Advanced JavaScript”.
- `/academy/javascript/` is the curriculum. Section 01 is JavaScript Engine; Event Loop is 02.
- Only section 01 is currently visible. Keep sections 02–11 commented out in `src/data/academy.ts`,
  preserving their names and descriptions for future work. Do not restore the removed learning-order sidebar.
- A section has an introduction, shared table of contents, and separate lesson URLs.
- Use `src/content/academy/<locale>/<course>/<lesson>/<step>.md` as the source of lesson theory.
- Use the Astro content collection/schema and shared components; no iframe or independent HTML site.
- Planned lessons are labelled as planned, not linked to nonexistent pages.
- New courses may cover TypeScript, game architecture, PixiJS, Three.js, patterns, data structures,
  and AI. Do not add empty course cards until requested.

## Teaching standard

- Russian-first material for an experienced JS/TS/HTML5 game developer and former Tech Lead.
  Prepare equivalent English material only in the separately authorized translation task.
- One main concept per lesson, approximately 12–25 lessons per section as the material requires.
- Keep screens digestible while preserving depth. Split explanations instead of deleting them.
- Each lesson needs explanatory text and an appropriate visual, example, exercise, or simulation.
  Prefer useful interactive state changes over decorative animation or repetitive click-through cards.
- Explain both mechanism and consequence for real HTML5 games and SDK architecture.
- Preserve the approved Event Loop v2 reference's strengths: full theory, step navigation,
  Call Stack simulation, visible intermediate states, responsive layout, light/dark themes.
- Explain concepts before tests; never start with a diagnostic quiz.
- End JavaScript sections with a self-check quiz. SDK sections have no quizzes or assessment
  lessons. Alex removed the separate free-text/interview lesson;
  do not recreate it or require written answers or instructor assessment unless explicitly requested.
  Do not treat page visits or an automatic quiz result as proof of mastery. Never invent completion
  or scores.

## SDK course version policy

Teach the current SDK API without release numbers or changelog framing in public lessons,
diagrams, takeaways, quizzes, installation commands, reference headings and course cards.
Install current SDK packages without a version suffix. Preserve verified source links and
internal audit records; update examples and explanations when the SDK changes.

## SDK material scope and interaction

The SDK course is practical teaching material and API documentation. Do not add end-of-section
quizzes, knowledge-check lessons or assessment forms. This overrides general Academy assessment
requirements for this course only; preserve the approved JavaScript self-check.
Use an interactive element only when manipulating it clarifies a complex mechanism or an API
nuance better than prose, code and a static graphic. Do not add controls merely to demonstrate
basic validation or draw a board from width/height. Keep the removed JSON board editor out of
this material. Default to concise explanations, real code examples and static graphics.
Keep each SDK lesson to one main idea and close to one desktop screen, with at most a little
scrolling. Start with a short paragraph, show one focused code example where it helps, and
use a compact infographic or useful interactive diagram. If the explanation needs several
distinct examples or topics, split it into short lessons. Check the rendered lesson in the
local site, including the space taken up by code and graphics.

Across the site, follow Alex's PixiJS tutorials when writing or revising prose. Name the
file, method, or object involved, say what we do and what happens, then move on. Prefer
«контейнер создаёт сервис при входе в сцену» to abstract phrases like «точка сборки» or
«предусмотренные границы API». Define essential new terms before using them. Keep only
what the reader needs to understand the example.

Name sections after concrete topics readers can recognize. In the overview, say what we will
build or run, such as a screen from JSON or a build for Poki. Define unfamiliar terms in a
short, styled «Термин» note before using them. If a diagram already shows the sequence,
keep the text focused on what the reader needs to do.

## SDK course voice and examples

Present GameDevLand SDK as a universal SDK that can be connected to HTML5 game projects
across genres. Teach practical use of its API without tying the course or its overview graphics
to Block Puzzle. Specific games may illustrate individual API mechanisms; they do not define
the SDK or serve as a required course project. Avoid tours of engine implementation files.
When the reason for an API mechanism is not obvious, begin with a short, visibly separate
“Зачем это нужно” callout using the shared lesson-note style. Explain the practical problem
and benefit before the API details. Move an existing motivating introduction into the callout
instead of repeating it. Do not add a redundant block to obvious setup instructions.
Explain what we add or call and what happens as a result.
Use natural, concise tutorial prose; avoid formulaic introductions such as “teaching example
implementing the contract from types.ts”. New examples need a clear purpose, not a formal
provenance label on every snippet. Do not present invented classes as existing game code.

When quoting Block Puzzle code, link the exact game file next to the excerpt. Verify the
linked revision; indicate omissions or adaptations briefly and naturally when needed.
One link to the SDK repository root in the first lesson is enough. Do not add implementation
file links to every API name, example or reference entry. Verify API behavior against SDK
sources during research and retain that evidence in content metadata; these implementation
references are excluded from the rendered SDK bibliography. This SDK-specific policy takes
precedence over the general public source-link requirement below. Relevant game files and
other useful official references remain visible under “Источники”. External links open in
a new tab with noopener/noreferrer through the shared renderer.

## Evidence and technical accuracy — mandatory

- Research factual claims using specifications and official implementation documentation.
- Every lesson must link to at least one relevant primary source, with a short note explaining
  what it substantiates. Every section must be supported by those sources.
- ECMAScript semantics: ECMA-262 (TC39 / Ecma International), preferably the exact clause.
- V8 internals: v8.dev documentation and articles authored by the V8 team, or official V8 source.
- Browser APIs: WHATWG HTML/DOM standards; browser tooling: official Chrome documentation.
- Do not cite independent tutorials, aggregators, influencers, other authors, or unofficial blogs.
- Read the relevant source sections; a link alone does not validate a claim.
- Link significant technical terms to relevant official documentation/specification sections
  when first introduced in each independently addressable step, in every language. Prefer
  useful local links over repeatedly linking every occurrence. Preserve emphasis and code.
- External HTTP(S) links open in a new tab with `target="_blank"` and
  `rel="noopener noreferrer"`. Markdown links receive these attributes at build time through
  the shared Astro rehype configuration, including authored HTML anchors. Explicit Astro
  anchors must declare them. Internal navigation, fragments, mail links, and downloads keep
  their intended behavior. Do not add `nofollow` to trusted official references.
- Distinguish normative language semantics, implementation details, and teaching models.
- V8 is one implementation. AST format, tiers, optimization heuristics, storage layout, and
  GC scheduling are not universal ECMAScript guarantees. Date/recheck changing details.
- Label pseudocode, pseudobytecode, invented numbers, and simulated execution honestly.
- Never imply the UI controls actual JIT or GC, or claim measured performance without measurement.
- The content schema rejects unofficial source domains. Extend the allowlist deliberately when
  adding an official source (e.g. official docs of a newly introduced library).

## UI and accessibility

### Educational graphics (Alex's latest update, 2026-11-04)

- Use visual-first explanations: each lesson combines clear theory, real code examples,
  and meaningful educational graphics. Match the graphic to the mechanism.
- Follow the approved JavaScript Engine visual language: semantic HTML/CSS, clear grouping,
  short labels, connected flows, distinct color accents, and concept-specific compositions.
  Alex rejected the generated SVG flowcharts and withdrew the SVG-first requirement.
  Do not reintroduce SVG diagrams or replace approved graphics with SVG during this work.
- Use HTML/CSS and JavaScript components, with Canvas where frequent redraws justify it.
  Keep graphics self-contained, with readable typography, meaningful arrows, and a visible
  hierarchy. Avoid monotonous sequences of rounded rectangles filled with prose. Verify
  both themes and narrow screens; labels and connectors must remain readable.
- Separate responsibility maps from execution traces. A responsibility graphic must explain
  who owns a concrete decision; an execution graphic must show one concrete input/result.
  Do not mix game rules, scene orchestration, visual structure, and a catalog of engine systems
  in one overview. Use distinct groups, visible heading hierarchy, and purposeful spacing;
  an enclosing border alone does not establish that hierarchy.
- Keep useful interactive diagrams, including user-authored input. Actions should change an
  input, result, execution state, or hypothesis. For complex processes, expose intermediate
  states with suitable previous/next/reset or play/pause controls. Add only controls that
  serve the actual interaction; static relationships do not need playback buttons.
- Highlight the executing instruction and active objects when tracing execution. Keep motion
  bounded and respect reduced motion. Use labels as well as color for state changes.
- Verify technical claims against primary sources. Identify conceptual diagrams and simulated
  execution, and distinguish them from actual engine/runtime measurements.
- Preserve approved JavaScript Engine lessons during SDK authoring. Proposed visual revisions
  belong in a separate Russian Markdown review document; no SVG migration is requested.

- Shared site-wide light/dark theme; use semantic CSS tokens and persist one global preference.
- All existing blog/portfolio pages must remain legible in both themes.
- Back/next navigation, current-step indication, shared TOC, and progress/resume are required.
- Persist progress, quiz choices, and answer drafts locally with versioned, validated data.
- Mark a step done only via an explicit completion action, not merely visiting it.
- Distinguish viewed steps from reviewed learning progress. No backend or cross-device sync is implied.
- Real links for navigation; real buttons for actions; keyboard focus, labelled inputs,
  responsive narrow layouts, reduced-motion support, and status announcements.
- Simulations are deterministic, resettable, bounded, and technically explainable.
- Visual references: the FSM in HTML5 Game Scenes and AI Agents / Own SDK articles in
  `src/content/articles/en/`. Use their connected flows, responsibility maps, numbered cards,
  clear grouping, and restrained color accents as the visual quality baseline for Academy.
- Lessons must combine short prose with meaningful infographic layouts. Choose a diagram
  for the concept (tree, stack, nested ownership, reachability graph, pipeline, comparison),
  rather than rendering every concept as the same generic row of boxes. Keep code and visual
  state related, label relationships, and show important intermediate changes.
- Use semantic theme tokens, CSS gradients, borders, depth, hover/focus feedback, and short
  state transitions where they improve the explanation. Respect reduced motion, maintain
  contrast in both themes, and verify narrow layouts. Decorative effects must not obscure
  content or imply actual engine execution. Both languages receive equivalent visual quality.
- Use book-style editorial callouts for definitions and focused notes where useful: a short
  label, term heading, and concise explanation in a tinted blue/green block. Academy's
  reusable `lesson-note` styles support this. Use semantic `aside` markup with a labelled
  heading; color supplements the label and must not be the only distinction. Avoid turning
  every paragraph into a callout. Machine-code examples must name the architecture, use
  verified bytes, and distinguish actual bytes from assembly notation and illustrative data.

## Checks

Run `npm run typecheck`, `npm run lint`, and `npm run build` for source changes.
Use browser QA when authorized (it is authorized for the current local site review): inspect
course navigation, representative simulations, drafts/progress after reload, mobile layouts,
and both themes on Academy and existing pages. Report limits honestly.

## Localization — mandatory

Read `docs/I18N.md` before changing site content or routes.

- Unprefixed pages contain English; Russian uses `/ru/`. On 2026-11-08 Alex requested
  automatic language selection at `/`: saved choice, then a supported browser language,
  then EN fallback. Persist automatic and manual choices. Explicit language URLs stay
  directly addressable; keep static canonical and alternate URLs for both languages.
- Keep the EN/RU switch beside the theme control; it must open the same page in the selected
  language. Use a dropdown showing only the current locale label when closed. Navigation stays
  within that language. Shared theme and learner state remain intact.
- Locale definitions live in `src/i18n/locales.ts`; dictionaries in `src/i18n/messages/`.
  New languages are registered here, not implemented with scattered en/ru conditionals.
- For a bilingual release, publish equivalent approved content for registered languages;
  do not require simultaneous translation during Russian drafting/review. Markdown lives in
  `src/content/<collection>/<locale>/...`; each file declares locale and a stable translationKey.
- The catch-all route in `src/pages/[...path].astro` generates both versions using shared views.
  Do not duplicate route templates or rebuild the blog with a second framework.
- When translation is explicitly requested, translate titles, descriptions, body prose, captions, alt text, accessibility labels,
  assessments, simulations, source notes, dates, and client-side feedback carefully.
- Keep code examples, identifiers, numerical values, source URLs, and technical behavior intact.
  Preserve proper names and use technical terminology consistently. Do not silently rewrite facts.
- No runtime machine translation or silent fallback to another language. Published bilingual
  content must pass translation checks. Do not fabricate translations to satisfy a draft
  check; see Russian-first authoring above. Keep canonical, hreflang, and x-default consistent.
- Preserve section anchors when switching languages. Decode non-ASCII hashes before looking up
  DOM IDs. Current step/progress/drafts belong to the lesson, not to a particular language.
- Catalog-only article records do not need duplicate bodies; their published tutorial chapters
  are the source of truth. Historical monolithic copies remain in `drafts/legacy-articles/`.
- After `typecheck`, `lint`, and `build`, run `npm run check:locales`. Review representative
  pages, language switching, themes, narrow layouts, and persisted inputs in the browser.
