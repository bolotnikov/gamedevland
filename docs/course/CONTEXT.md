# Academy context

Updated: 2026-11-03.

## Course hierarchy (latest agreement)

Academy → course → section → lesson. Engine is section 01 with 20 individual lessons;
Event Loop is planned section 02. Earlier references below to a whole Engine “lesson” and
its “steps” describe the former naming. Use section/lesson in current and future public prose.
Existing source fields (`lesson`, `order`), routes, UI hooks, and progress storage retain their
identifiers for compatibility. Russian naming is updated first; English translation remains
a separately authorized task.

## Current agreement

Alex is moving a learning workflow from ChatGPT into this Astro repository.
The approved visual/interaction reference is the supplied `event-loop-lesson-v2` ZIP:
18 short screens, substantial Russian explanations, interactive Call Stack/Event Loop models,
TOC, navigation, light/dark themes, progress, and assessments.
The ZIP is a design reference, not an independent site to embed.

The latest explicit request supersedes the earlier mixed-course integration proposal:
create an Academy catalog, separate course curricula, and first implement only JavaScript
section 01 (Engine/V8). Event Loop is section 02 and remains planned. Other courses will follow.
The long-term 63-lesson/7-track idea is background, not 63 currently approved or ready lessons.

The first course is Basic → Advanced JavaScript. Topics range from engine fundamentals to
advanced language and runtime concepts. Explanations target a developer experienced in
TypeScript, HTML5 engines, FSM/ECS/DI, PixiJS/Three.js, and technical leadership.

## Requirements added during implementation

Every step must provide relevant official documentation/specification links. Semantic claims
should be supported by ECMA-262; implementation claims by the V8 team. No third-party tutorial
citations. Explain which claims are normative and which describe a teaching model or V8.

All changes are for local review. No push or production deployment until explicitly requested.
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
