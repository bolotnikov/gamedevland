---
{
  "locale": "ru",
  "translationKey": "sdk/integrations/poki-upload",
  "course": "sdk",
  "lesson": "integrations",
  "draft": false,
  "order": 5,
  "title": "Загрузка сборки в Poki",
  "concept": "gamedevland poki upload",
  "description": "Отправим версию игры на проверку в Poki.",
  "takeaway": [
    "Публичный релиз запускается отдельно в Poki."
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
    }
  ]
}
---

Передадим токен через `POKI_UPLOAD_TOKEN` и запустим `upload`. Команда выполнит проверки из `poki.json`, соберёт игру, создаст ZIP и отправит его в Poki. Результат загрузки появится в `poki-upload.json` рядом с архивом.

```sh
gamedevland poki upload
```

<figure class="sdk-figure is-flow">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-cyan"><div><strong>Проверки</strong><span>Запускаем команды из poki.json</span></div></div>
    <div class="sdk-figure__item tone-violet"><div><strong>Сборка</strong><span>Создаём ZIP</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>Poki</strong><span>Получает версию для проверки</span></div></div>
  </div>
</figure>
