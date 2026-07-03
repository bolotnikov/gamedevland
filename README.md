# Gamedev Land

Astro source project for [gamedev.land](https://gamedev.land/).

## Commands

```sh
npm ci
npm run dev
npm run build
npm run preview
```

## Deployment

GitHub Actions builds the Astro project and deploys the generated `dist/` directory to GitHub Pages.

The custom domain is stored in `public/CNAME` so it is copied into `dist/` during the build.
