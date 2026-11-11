# Local validation — 2026-11-03

## Automated checks

- `npm run typecheck`: 0 errors, 0 warnings; one pre-existing deprecated
  `webkitUserSelect` hint in CodeBlockEnhancer.
- `npm run lint`: passed.
- `npm run build`: passed, 89 static pages including 23 Academy pages
  (catalog, course, lesson introduction, 20 steps).
- Academy links checked against generated output: no missing targets.
- All 22 unique primary-source URLs returned HTTP 200; referenced anchors exist.
- `git diff --check`: passed.

The original TS/ESLint configs targeted unrelated engine directories and depended on
uninstalled lint packages. They now check the actual Astro/TypeScript source. Existing optional
component prop types and article-series frontmatter were made explicit so the site passes.

## Browser checks

Used the local Astro server with the in-app browser. Inspected a wide layout (~1200 CSS px),
narrow layout (~325 CSS px), and the normal app-panel layout.

- Header navigation order, catalog card, curriculum, lesson introduction, individual step URLs.
- Global light/dark switching and persistence across navigation and reload.
- All 18 simulations: selectable final state, disabled next button at the end, reset to first state.
- Call Stack: nested push and reverse return order, active source line, final script frame.
- AST: grouping changes the root and result (14 vs 20), individual child literals shown.
- GC: removal of the root path changes reachability; no real browser GC is invoked.
- Narrow simulation pages: no document-level horizontal overflow in all 18 checked steps.
- Self-check: 6/6 for correct responses, explanatory feedback for incorrect/unanswered choices,
  persisted choices after reload, reset.
- Mentor draft: restored after reload, then test text cleared.
- Explicit step completion persists; final-step action does not mark skipped steps complete.
- Resume points to the last visited step. Test completion marks were reset.
- Existing Home, Portfolio, Services, About, FSM article, and Runner tutorial retain the global
  theme. Long inline code in the FSM article now wraps on narrow screens.
- No browser JavaScript errors were reported during these checks.

Screenshots are review artifacts outside the repository. No push or deployment performed.
Further acceptance is Alex's local review of content, visual design, and pedagogy.

## Localization follow-up — 2026-11-03

The bilingual build supersedes the page count above: 178 static pages, 89 per language,
from 87 English/Russian content pairs. English remains at `/` and unprefixed URLs;
Russian uses `/ru/`. No browser-language or remembered-language redirect is installed.

- `npm run typecheck`, `npm run lint`, and `npm run build`: passed.
- `npm run check:locales`: passed; matching dictionary keys/content pairs, identical fenced
  code blocks, and valid generated language alternates.
- Generated-page audit: no missing internal link targets and no visible Russian prose in
  English pages (script/style contents excluded).
- `git diff --check`: passed.
- Browser: Home, Services, Portfolio/game details, article/tutorial, Academy, lesson,
  Call Stack simulation, and quiz checked in both languages.
- EN/RU links remain beside the theme control and open the corresponding page. Navigation
  remains in the selected language; switching preserves section fragments, including
  Russian headings via cross-language anchor aliases.
- Light/dark preference, learner progress, quiz choices, and reader-authored drafts survive
  language changes. Correct quiz answers produce localized 6/6 feedback. Test inputs were
  restored; no learner completion or teacher score was fabricated.
- Narrow layouts checked at approximately 325 CSS px: no document-level horizontal overflow
  on the sampled Home, Academy, lesson, About, Services, Portfolio, and tutorial pages.

The local server remains available for Alex's content and visual review. No push or deployment
was performed. These checks establish route, translation-coverage, code-preservation, and UI
behavior; editorial acceptance remains Alex's review.

## Inline references and visual follow-up — 2026-11-03

- Added official inline term links throughout both Engine lesson translations, including
  ECMAScript, engine implementations, runtime boundaries, parsing, execution, and memory.
- Shared Markdown processing now handles Markdown/HTML external anchors at build time:
  new-tab target, noopener/noreferrer, and unchanged internal navigation. The generated
  output audit checked 705 external anchors without invalid targets, rel values, or malformed
  URLs. Fenced code is unchanged across all 87 content pairs.
- The first step now uses a dedicated responsibility diagram: language rules above the
  host, with V8 visibly nested inside that host. The existing three selectable states,
  explanatory notes, next/reset controls, and live announcements are retained.
- Shared simulation styling adds restrained gradients, node depth, hover feedback, and
  state-entry transitions. Reduced-motion styles disable these transitions and transforms.
- Browser QA: EN/RU, light/dark, wide and approximately 337 CSS px narrow layouts;
  one visible state, correct final-state button disabling, reset to 1/3, no horizontal
  overflow at the supported narrow width. Official inline links have the expected attributes.
- Original article diagrams remain rendered: four FSM anatomy cards and event-routing map;
  five AI/SDK flow cards and four SDK responsibility cards.
- Typecheck, lint, build (178 pages), check:locales, and git diff --check passed.

The dev server was restarted to discard stale content from the previous authoring session.
All changes remain local. No push or deployment performed.

## CPU explanation — Russian review draft — 2026-11-03

- Expanded only the Russian first step: native machine instructions, binary representation
  versus code type, source preparation, interpreter handlers, and JIT-generated code.
- Added a CSS infographic with two native HTML disclosures. Its essential execution paths
  remain visible when explanations are collapsed; no JavaScript is needed to expand them.
- Read official V8 scanner, Ignition, and Sparkplug material and the Intel manual overview;
  added relevant inline/source links and links to steps 02, 06, 07, and 08.
- Browser QA: wide and approximately 337 CSS px layouts, both themes, disclosure toggling
  by pointer and Enter, no page-level horizontal overflow at the supported narrow width.
- Typecheck, lint, build (178 pages), check:locales, and git diff --check passed. Generated
  internal links resolve and external references open in a new tab. Code blocks are intact.
- English was deliberately not synchronized: translation awaits Alex's separate request
  after Russian approval. This is local review material; no push or deployment performed.

## SDK renderers — Russian review — 2026-11-11

- Source of truth: published Engine 0.0.13 and Vite 0.2.2; SDK tag `sdk-2026-11-10`,
  commit `be74f9d`. Read changelogs, renderer/runtime migration notes, package exports,
  renderer implementations, component lifecycle, storage, assets, locales, and platform APIs.
- Typecheck: passed, 0 errors/warnings; the existing `webkitUserSelect` deprecation hint remains.
- Lint and `git diff --check`: passed.
- Production build: passed, 336 pages; seven untranslated drafts excluded. Academy preview:
  passed, 351 pages (seven lessons, their overview, and seven draft URL redirects). Builds wrote to `/tmp/gamedevland-sdk-production-check` and
  `/tmp/gamedevland-sdk-academy-preview`; repository `dist/` was not edited.
- Compiled five complete lesson examples (typed component, typed action, input component,
  ordered presentation, persistence) against the current SDK sources. No lesson code executed.
  `engine.storage` and `SystemServices.PersistentStorage` are already adapters; neither
  should be passed as a coordinator to `new PersistentStorageAdapter(...)`.
- Verified new source paths and generated API declaration locations against the local release.
- Browser: Russian course contents, Three lesson, desktop light theme, narrow dark theme,
  and course navigation. No horizontal document overflow at the sampled narrow width;
  viewport override/theme restored. This does not claim gameplay/GPU/device verification.
- `npm run check:locales` intentionally fails at RU/EN code parity (`game-config.md` first):
  Russian examples now target the current SDK; English remains approved older content.
  Do not weaken the release check or translate drafts to silence it. Run it again after the
  separately authorized translation, before publication.
- The dev server is available at `http://127.0.0.1:4321/ru/academy/sdk/`.
  Existing AI Defender portfolio/media changes were left intact and excluded from the SDK patch.

### Rendering section and table follow-up — 2026-11-11

- Moved all seven Russian drafts into their own rendering section; published foundations and
  presentation retain 12 and 15 lessons. Dev curriculum has five sections and 52 lessons.
- Draft-only section titles/descriptions use their Russian authored metadata. No English
  translations/filler were added; production/English retain four sections and 45 lessons.
- Shared visible-section selection keeps course counts, section numbers and breadcrumbs aligned.
- The comparison table has explicit column widths, padding, row borders and code wrapping.
  Browser checks at wide/narrow sizes covered both themes. At the sampled narrow viewport,
  document and all table cells had scrollWidth equal to clientWidth; no column overlap observed.
- Desktop/mobile screenshots: `/tmp/gamedevland-sdk-rendering-desktop.jpg` and
  `/tmp/gamedevland-sdk-rendering-mobile.jpg`. Browser theme/viewport restored.
- Typecheck, lint, production build, academy-preview build and diff whitespace checks passed.
  Release locale parity still awaits the explicitly separate English translation task.

## SDK bilingual release candidate — 2026-11-11

- Russian content approved; English translation and deployment explicitly authorized by Alex.
- Typecheck: 0 errors/warnings (the existing `webkitUserSelect` deprecation hint remains).
- Lint, production build and locale parity passed: 157 content pairs, 370 generated HTML files
  including existing public redirects; all fenced code blocks match between RU and EN.
- Cyber UI validation passed: 16 bilingual lessons, 97 TypeScript examples, 93 interactive
  variants. Language-preference validation passed all 11 cases.
- Browser checks covered the English rendering section and comparison table, RU/EN switching,
  and light/dark responsive layout. At the sampled narrow width, document and table cells had
  no horizontal overflow. These are documentation checks, not gameplay/GPU/device benchmarks.
- Publication uses the existing `Deploy GitHub Pages` workflow triggered by a push to `main`.
  A separate release checkout is validated before push to exclude unrelated local portfolio edits.
