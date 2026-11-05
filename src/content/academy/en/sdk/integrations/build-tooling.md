---
{
  "locale": "en",
  "translationKey": "sdk/integrations/build-tooling",
  "course": "sdk",
  "lesson": "integrations",
  "draft": false,
  "order": 4,
  "title": "Building a ZIP for Poki",
  "concept": "gamedevland poki pack",
  "description": "Build the game and prepare the archive.",
  "takeaway": [
    "The pack command reads the finished build from build_dir."
  ],
  "sources": [
    {
      "title": "SDK · README.md",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/vite/README.md",
      "note": "Commands, poki.json, checks, the token, and the upload receipt."
    },
    {
      "title": "SDK · GameViteConfigFactory.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/vite/src/GameViteConfigFactory.ts",
      "note": "Root, base, defines, and preserving names."
    },
    {
      "title": "Block Puzzle · package.json",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/package.json",
      "note": "The original web build commands for Block Puzzle."
    }
  ]
}
---

Add a `compile:poki` script to `package.json` with the command `VITE_PLATFORM=poki vite build --outDir ../dist/poki`. Set the game ID, build directory, and ZIP path in `poki.json`. After the build, run `gamedevland poki pack`. The archive will have `index.html` at its root.

```json
{
  "game_id": "POKI_GAME_UUID",
  "build_dir": "dist/poki",
  "tooling": {
    "checks": ["typecheck", "lint"],
    "buildScript": "compile:poki",
    "archive": "artifacts/game-poki.zip"
  }
}
```

<figure class="sdk-figure is-flow">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-cyan"><div><strong>Vite</strong><span>Build for Poki</span></div></div>
    <div class="sdk-figure__item tone-violet"><div><strong>poki pack</strong><span>Reads the files from dist/poki</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>ZIP</strong><span>The finished game archive</span></div></div>
  </div>
</figure>
