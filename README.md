# Gamedev Land

Astro source project for [gamedev.land](https://gamedev.land/).

## Commands

```sh
npm ci
npm run dev
npm run typecheck
npm run lint
npm run build
npm run check:locales
npm run preview
```

## Deployment

GitHub Actions builds the Astro project and deploys the generated `dist/` directory to GitHub Pages.

The custom domain is stored in `public/CNAME` so it is copied into `dist/` during the build.

## Academy

- `/academy/` — course catalog.
- `/academy/javascript/` — Basic → Advanced JavaScript curriculum.
- `/academy/javascript/engine/` — lesson 01, 20 separate Markdown steps.

Read `AGENTS.md` and `docs/course/` before creating lessons. Theory lives in
`src/content/academy/`; diagrams and assessments use native Astro components.
Every step cites official documentation/specifications. Theme is shared across the site.
Progress and answer drafts are browser-local; there is no account or server-side grading.

Academy changes are currently for local review only. Do not push/deploy until authorized.
Alex has authorized a commit/push checkpoint to a `codex/` review branch with `[skip ci]`;
production publication and CI/CD remain unauthorized. Do not merge the checkpoint into `main`.

## Languages

English is the default at `/`. Russian pages use `/ru/`. The header language switch opens
an equivalent page. Translation sources live in `src/content/<collection>/en/` and `ru/`;
shared UI messages live in `src/i18n/messages/`. See `docs/I18N.md` for the architecture,
adding a locale, and validation. `src/pages/[...path].astro` generates all static routes;
page templates live in `src/views/`.
