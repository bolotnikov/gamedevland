---
{
  "locale": "ru",
  "translationKey": "sdk/integrations/build-tooling",
  "course": "sdk",
  "lesson": "integrations",
  "draft": true,
  "order": 3,
  "title": "Сборка и инструменты Poki",
  "concept": "@gamedevland/vite",
  "description": "Отделим локальную сборку, упаковку и загрузку версии на платформу.",
  "takeaway": [
    "Сборка, упаковка и загрузка — отдельные операции.",
    "Подготовка курса и примеров не требует загрузки на платформу."
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

`@gamedevland/vite` задаёт корень `game`, относительные URL ресурсов, alias, platform defines и подключение платформенного SDK. Начальная функция — `createGameViteConfig({ mode, repoRoot })`.

В проекте Block Puzzle локальная web-сборка запускается через `npm run build:web`. Для сборки под Poki добавим в `scripts` файла `package.json` две команды:

```json
{
  "compile:poki": "VITE_PLATFORM=poki vite build --outDir ../dist/poki",
  "build:poki": "npm run compile:poki && gamedevland poki pack"
}
```

В корне создадим `poki.json`: укажем ID игры, папку сборки и путь к архиву. В `checks` перечислим команды проверки из `package.json`:

```json
{
  "game_id": "UUID_ИГРЫ_ИЗ_POKI",
  "build_dir": "dist/poki",
  "tooling": {
    "checks": ["typecheck", "lint"],
    "buildScript": "compile:poki",
    "archive": "artifacts/game-poki.zip"
  }
}
```

<figure class="sdk-figure is-flow"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">01</span><div><strong>Проверки</strong><span>Типы, lint и проверки конкретной игры</span></div></div><div class="sdk-figure__item tone-violet"><span class="sdk-figure__index">02</span><div><strong>Сборка</strong><span>HTML и ресурсы с нужным платформенным SDK</span></div></div><div class="sdk-figure__item tone-green"><span class="sdk-figure__index">03</span><div><strong>pack</strong><span>Проверка файлов → ZIP с index.html в корне</span></div></div><div class="sdk-figure__item tone-amber"><span class="sdk-figure__index">04</span><div><strong>upload</strong><span>Отдельная явная команда для загрузки версии в Poki</span></div></div></div><figcaption>pack работает с существующей сборкой; upload дополнительно запускает проверки и свежую сборку.</figcaption></figure>

`gamedevland poki pack` проверяет HTML-зависимости и состав файлов. Исходники TypeScript, source maps, приватные файлы, symlink и вложенные архивы в пакет не допускаются. Выходной ZIP должен лежать вне `build_dir`.

## Когда потребуется загрузка

Команда `gamedevland poki upload` предназначена для отдельно запрошенной загрузки. Она запускает настроенные проверки, делает свежую сборку, упаковывает и передаёт её официальному CLI Poki. В этом курсе выполнять её не требуется.

Токен передаётся через `POKI_UPLOAD_TOKEN` либо отдельный локальный файл конфигурации с правами `0600` на POSIX. Он не должен попадать в poki.json или сборку. Результат записывается в `poki-upload.json` рядом с локальным архивом.

Загрузка версии для проверки не равна запросу публичного релиза. По документации инструмента успех подтверждается ответом для конкретной игры и версии; одного нулевого exit code внешнего CLI недостаточно.
