# Academy context

Updated: 2026-11-04.

## Course hierarchy (latest agreement)

Academy → course → section → lesson. Engine is section 01 with 19 individual lessons;
Event Loop is planned section 02. Earlier references below to a whole Engine “lesson” and
its “steps” describe the former naming. Use section/lesson in current and future public prose.
Existing source fields (`lesson`, `order`), routes, UI hooks, and progress storage retain their
identifiers for compatibility. Russian naming is updated first; English translation remains
a separately authorized task.

On 2026-11-04 Alex removed the separate free-text/interview lesson in both languages.
Section 01 now ends with lesson 19, the self-check quiz. Do not recreate the removed lesson
or require written answers or instructor assessment unless explicitly requested.

Russian lessons 06 and 07 have distinct roles: Bytecode explains generation from AST and terms,
while Interpreter contains the single instruction-by-instruction execution diagram. Do not duplicate
the execution trace in Bytecode. Keep the interpreter diagram to an instruction list and one current value.

## Current agreement

Alex is moving a learning workflow from ChatGPT into this Astro repository.
The approved visual/interaction reference is the supplied `event-loop-lesson-v2` ZIP:
18 short screens, substantial Russian explanations, interactive Call Stack/Event Loop models,
TOC, navigation, light/dark themes, progress, and assessments.
The ZIP is a design reference, not an independent site to embed.

The latest explicit request supersedes the earlier mixed-course integration proposal:
create an Academy catalog, separate course curricula, and first implement only JavaScript
section 01 (Engine/V8). Event Loop is section 02 and remains planned. Other courses will follow.
Only section 01 is shown publicly. Sections 02–11 remain commented out in `src/data/academy.ts`;
the course page has no learning-order sidebar.
The long-term 63-lesson/7-track idea is background, not 63 currently approved or ready lessons.

The first course is “Продвинутый JavaScript” in Russian and “Advanced JavaScript” in English. Topics range from engine fundamentals to
advanced language and runtime concepts. Explanations target a developer experienced in
TypeScript, HTML5 engines, FSM/ECS/DI, PixiJS/Three.js, and technical leadership.

## Requirements added during implementation

Every step must provide relevant official documentation/specification links. Semantic claims
should be supported by ECMA-262; implementation claims by the V8 team. No third-party tutorial
citations. Explain which claims are normative and which describe a teaching model or V8.

On 2026-11-04 Alex approved all 19 Russian lessons and the Academy, course, and section pages.
He explicitly requested their English translation and a bilingual production release via the
existing commit/push/GitHub Pages CI/CD workflow. Future changes still require separate release
authorization.
A project-local AGENTS.md stores these requirements; global Codex settings are not changed.

Alex's handwritten Platformer, Tower Defense, Match-3, and PixiJS Project Template tutorials
are the editorial reference. Use inclusive “we” or impersonal technical explanation, without
informal address to the reader. This applies to both languages, lesson prose, exercises,
model hints, and interface feedback. See `docs/EDITORIAL_STYLE.md`.

## Implementation

- Keep Astro and existing Markdown collections. Add `academy` content collection.
- Each lesson is its own Markdown file and statically generated URL within a section.
- Native Astro components render diagrams, deterministic simulations, quizzes, and source links.
- Shared Layout/Header and semantic tokens apply the theme throughout the whole site.
- No user account/backend: current step, explicit completion, quiz choices, and drafts live
  in browser localStorage. Teacher evaluation is recorded only after actual review.

## Reference artifact

Original supplied archive: `/Users/alexandr/Downloads/event-loop-lesson-v2 (1).zip`.
The source archive stays outside the repository; it is not a runtime dependency.

## Site-wide localization

The entire site now has equivalent English and Russian versions. English is the default at `/`
and unprefixed URLs; Russian lives under `/ru/` and is selected explicitly in the header.
Academy theory and steps exist in `src/content/academy/en/` and `ru/`. Both use the same
views, simulations, assessment logic, source URLs, and lesson-level progress/draft storage.
Read `docs/I18N.md` for adding languages and translation checks. The Russian-only requirement
above is historical and superseded by this agreement; pedagogy and content depth are preserved.

## Russian-first authoring (latest agreement)

New material and revisions are written in Russian first. Alex reviews Russian text, then
requests English translation as a separate task after approval. Approval alone does not
authorize translation. Do not synchronize English prose with each Russian revision. This
includes diagram text, exercises, metadata, and feedback. Existing English versions remain
until translation is requested. The site's English default and `/ru/` URL scheme are unchanged.
This authoring order supersedes earlier simultaneous EN/RU authoring requirements. Read
`docs/I18N.md` for the distinction between draft authoring and bilingual release checks.

## SDK course (2026-11-04)

Alex requested a complete independent Russian course for GameDevLand SDK. The local draft
has 42 lessons in four sections (12 foundations, 12 scene flow, 15 presentation/runtime,
3 platform integrations).
It documents Engine 0.0.8 and Vite 0.1.2 at SDK commit 9976b87 / sdk-2026-11-04.
Block Puzzle examples use public revision d1dd4e3 (Engine 0.0.5 / Vite 0.0.4); adapted examples
are labelled separately. Existing articles remain unchanged. English translation and publication
are not authorized. SDK routes and the Russian catalog card exist only in Astro development mode.

Alex withdrew the SVG-first requirement after viewing the initial diagrams. SDK graphics now
follow the approved JavaScript Engine HTML/CSS style, with useful user input and interactions.
See ENGINE_VISUAL_REVIEW_RU.md for proposed improvements across all 19 Engine lessons;
the approved lessons have not been rewritten.

The SDK overview keeps the module map and a single short API-boundary example. Project
setup remains in block-puzzle.md; the main.ts / Engine.run walkthrough has its own lesson
(entry-point.md), immediately after setup. Keep these lessons focused when revising them.

SDK lessons describe the current API without release numbers or changelog framing. This
applies to prose, code installation commands, diagrams, takeaways, quizzes, the API reference
and course cards. Install current SDK packages without a version suffix. Preserve verified
source links and internal audit records; update the course when the SDK changes. Identify
original Block Puzzle excerpts accurately without turning lessons into migration guides.

Foundations teach local engine/game behavior only. Keep platform loading signals, adverts,
external SDK adapters and platform packaging in the separate integrations section. The basic
boot lesson covers resource readiness and opening the game scene; it does not teach platform APIs.

## SDK tutorial voice — 2026-11-04

Alex clarified that the course teaches practical SDK API use, primarily through Block Puzzle.
Use short, natural introductions describing the action and result; remove formal per-snippet
contract/provenance commentary. Quoted game code keeps an adjacent link to its actual game
file. New examples must not be presented as code already in Block Puzzle. Link the SDK root
once in the first lesson; implementation source links remain internal research evidence and
are excluded from the rendered SDK bibliography and API map. The API map links to relevant
course lessons rather than engine implementation declarations.

## SDK documentation focus — 2026-11-04

Alex removed the JSON board-size editor from the schema-decoder lesson and all four SDK
knowledge-check lessons. This material teaches practical SDK use as tutorial/documentation,
without end-of-section assessment. Retain useful execution traces, but add interaction only
when it explains a complex mechanism or API nuance more clearly than static text/code/graphics.
The existing JavaScript assessments remain unchanged.

## SDK motivation — 2026-11-04

Alex requested an explicit motivation block at the start of schema-decoder, config-store and
persistence, and wherever another SDK mechanism needs its purpose explained. Use the shared
green lesson-note with “Зачем это нужно”: a concise practical problem and benefit before the
API. Avoid repeating the callout in the next paragraph or adding filler to clear setup steps.

## SDK startup sequence — 2026-11-04

Alex rejected the expanded boot walkthrough as too long. Keep boot.md to one short text
callout and a lightweight three-stage static diagram: Engine.run/preload → boot service →
game transition. Link relevant game files in the diagram; omit detailed config/code excerpts,
API tables, additional takeaway and a repeated bibliography. Aim for roughly one desktop
screen, with only a little scrolling. Do not expand this lesson into a full loading tutorial.
Keep platform readiness signals in integrations.

The foundations order is architecture → block-puzzle → entry-point → game-config → boot →
asset-manifest → asset-bundles → schema-decoder → config-store → persistence → locales →
new-project. The empty-project lesson concludes the section rather than interrupting the
Block Puzzle launch story. URLs and slug-based progress identities are unchanged.

## SDK universal positioning — 2026-11-04

Alex clarified that GameDevLand SDK is a universal SDK for HTML5 games across genres.
This supersedes the earlier Block Puzzle-first positioning. Course descriptions and overview
graphics must show the reusable SDK foundation, without implying one required game project.
Specific games may remain examples of individual API mechanisms. The shared catalog/course
graphic now connects several game genres to one SDK; existing lesson excerpts remain intact.

## SDK foundations bilingual release — 2026-11-04

Alex approved all 12 lessons of SDK foundations and explicitly authorized English translation,
commit, push and production CI/CD. Shared Academy/course/section UI, accessibility labels,
source notes and the puzzle/platformer/racing course illustration are bilingual. Preserve
the approved Russian content and all code examples, IDs, links and numerical values.

SDK sections 02–04 remain Russian drafts in the repository, with no generated public routes.
Both course pages show them as noninteractive cards labelled In Progress (В разработке),
without hrefs, keyboard link targets or arrows. Only foundations is available in either locale.
Publication is controlled by section metadata and published content, not development mode.
