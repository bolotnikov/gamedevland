---
{
  "locale": "en",
  "translationKey": "sdk/integrations/poki-upload",
  "course": "sdk",
  "lesson": "integrations",
  "draft": false,
  "order": 5,
  "title": "Uploading a build to Poki",
  "concept": "gamedevland poki upload",
  "description": "Send a build to Poki for review.",
  "takeaway": [
    "Start the public release separately in Poki."
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
    }
  ]
}
---

Provide the token through `POKI_UPLOAD_TOKEN` and run `upload`. The command runs the checks in `poki.json`, builds the game, creates a ZIP, and uploads it to Poki. The upload result appears in `poki-upload.json` next to the archive.

```sh
gamedevland poki upload
```

<figure class="sdk-figure is-flow">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-cyan"><div><strong>Checks</strong><span>Run the commands from poki.json</span></div></div>
    <div class="sdk-figure__item tone-violet"><div><strong>Build</strong><span>Create a ZIP</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>Poki</strong><span>Receives the build for review</span></div></div>
  </div>
</figure>
