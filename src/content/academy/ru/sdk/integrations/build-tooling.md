---
{
  "locale": "ru",
  "translationKey": "sdk/integrations/build-tooling",
  "course": "sdk",
  "lesson": "integrations",
  "draft": false,
  "order": 4,
  "title": "Сборка и ZIP для Poki",
  "concept": "gamedevland poki pack",
  "description": "Соберём игру и подготовим архив.",
  "takeaway": [
    "Команда pack берёт готовую сборку из build_dir."
  ],
  "sources": [
    {
      "title": "SDK · README.md",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/vite/README.md",
      "note": "Команды, poki.json, проверки, токен и receipt."
    },
    {
      "title": "SDK · GameViteConfigFactory.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/vite/src/GameViteConfigFactory.ts",
      "note": "Root, base, defines и сохранение имён."
    },
    {
      "title": "Block Puzzle · package.json",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/package.json",
      "note": "Оригинальные команды web-сборки Block Puzzle."
    }
  ]
}
---

В `package.json` добавим команду `compile:poki` со значением `VITE_PLATFORM=poki vite build --outDir ../dist/poki`. В `poki.json` укажем ID игры, папку сборки и путь для ZIP. После сборки вызовем `gamedevland poki pack`. В корне архива будет `index.html`.

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
    <div class="sdk-figure__item tone-cyan"><div><strong>Vite</strong><span>Сборка для Poki</span></div></div>
    <div class="sdk-figure__item tone-violet"><div><strong>poki pack</strong><span>Берёт файлы из dist/poki</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>ZIP</strong><span>Готовый архив игры</span></div></div>
  </div>
</figure>
