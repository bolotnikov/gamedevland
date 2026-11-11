# Gamedev Land

Astro source project for [gamedev.land](https://gamedev.land/).

## Commands

```sh
npm ci
npm run dev
npm run typecheck
npm run lint
npm run check:cyber-ui
npm run check:language
npm run build
npm run check:locales
npm run preview
```

## Deployment

Pushes to `main` trigger GitHub Actions to build the Astro project and deploy the generated
`dist/` directory to GitHub Pages. Run typecheck, lint, build, and locale checks before merging.

The custom domain is stored in `public/CNAME` so it is copied into `dist/` during the build.

## Academy

- `/` — course catalog: GameDevLand SDK, Cyber UI Toolkit, Advanced JavaScript.
- `/academy/sdk/` — SDK curriculum with five sections and 52 lessons.
- `/academy/cyber-ui/` — the single-section toolkit course with 16 lessons and 12 Canvas examples.
- `/academy/javascript/` — Advanced JavaScript curriculum.
- `/academy/javascript/engine/` — section 01 with 19 lessons.

The former `/academy/` catalog and Cyber UI section overview redirect to their replacements.
Archived articles and tutorial chapters retain their URLs and content, but are no longer
listed on the home page or linked from the portfolio.

Read `AGENTS.md` and `docs/course/` before creating lessons. Theory lives in
`src/content/academy/`; diagrams and assessments use native Astro components.
Every step cites official documentation/specifications. Theme is shared across the site.
Progress and answer drafts are browser-local; there is no account or server-side grading.

## Languages

English content uses unprefixed URLs; Russian uses `/ru/`. At `/`, saved language takes
priority over the browser language, with EN fallback; the choice is remembered. The header language switch opens
an equivalent page. Translation sources live in `src/content/<collection>/en/` and `ru/`;
shared UI messages live in `src/i18n/messages/`. See `docs/I18N.md` for the architecture,
adding a locale, and validation. `src/pages/[...path].astro` generates all static routes;
page templates live in `src/views/`.
