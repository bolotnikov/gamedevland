---
{
  "locale": "ru",
  "translationKey": "sdk/foundations/new-project",
  "course": "sdk",
  "lesson": "foundations",
  "draft": false,
  "order": 12,
  "title": "Создаём пустой проект",
  "concept": "Создание через CLI",
  "description": "Создание через gamedevland create, запуск и обзор файлов.",
  "sources": [
    {
      "title": "SDK · ProjectCreator.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/vite/src/project/ProjectCreator.ts",
      "note": "Создание папки из шаблона, установка зависимостей и параметры команды."
    },
    {
      "title": "SDK · Empty project template",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/vite/templates/empty",
      "note": "Состав проекта, конфигурация, пустая сцена, JSON-ресурсы и команды проверки."
    }
  ]
}
---

Для запуска нужны Node.js 22.12+ и npm. Откроем терминал в папке, где хранятся проекты, и выполним:

```sh
npx --yes --package @gamedevland/vite gamedevland create sdk-game
cd sdk-game
npm run dev
```

`npx` скачает инструменты, а `gamedevland create sdk-game` создаст папку и установит SDK и зависимости. Имя `sdk-game` можно заменить; папка должна быть новой или пустой. `cd sdk-game` перейдёт в проект, а `npm run dev` запустит Vite. Откроем адрес из терминала — появится тёмный canvas с пустой сценой `main`.

Для создания файлов без установки зависимостей можно добавить `--no-install`, а позже выполнить `npm install` внутри проекта.

<a id="project-files" class="translation-anchor" aria-hidden="true"></a>
## Файлы проекта

Шаблон выбирает `PixiRendererModule` и использует импорты из `@gamedevland/engine/renderers/pixi`. Он уже содержит конфигурацию, DI, JSON layout и FSM с одним состоянием `ready`. Файлы готовы к добавлению игровой логики:

<figure class="sdk-figure is-matrix" aria-label="Основные файлы созданного проекта">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-cyan"><div><strong>game/src/main.ts</strong><span>Запускает Engine.run с конфигурацией GameConfiguration.</span></div></div>
    <div class="sdk-figure__item tone-violet"><div><strong>game/src/config/</strong><span>GameConfiguration задаёт экран, ресурсы и сцены; ProjectDi и ProjectGlobalDi регистрируют зависимости.</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>game/src/scenes/main/</strong><span>MainScene — пустая сцена; MainSceneDefinition задаёт layout и FSM, MainSceneDi — зависимости сцены.</span></div></div>
    <div class="sdk-figure__item tone-amber"><div><strong>game/assets/json/</strong><span>Пустой layout сцены и sounds-volumes.json с громкостью музыки и эффектов.</span></div></div>
  </div>
  <figcaption>В корне: package.json — зависимости и команды; vite.config.ts — сборка; tsconfig.json и eslint.config.js — проверки кода.</figcaption>
</figure>

Остановим сервер сочетанием `Ctrl+C`, затем проверим типы, стиль кода и сборку:

```sh
npm run typecheck
npm run lint
npm run build
```

Результат сборки появится в `dist/`.
