---
{
  "locale": "ru",
  "translationKey": "sdk/foundations/entry-point",
  "course": "sdk",
  "lesson": "foundations",
  "draft": false,
  "order": 3,
  "title": "Запуск игры из кода",
  "concept": "Engine.run и GameConfig",
  "description": "Проследим, как конфигурация проекта передаётся движку при запуске Block Puzzle.",
  "takeaway": [
    "Проект передаёт контейнер и GameConfig в Engine.run.",
    "SDK подготавливает движок и открывает начальную сцену из конфигурации игры."
  ],
  "sources": [
    {
      "title": "Block Puzzle · main.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/main.ts",
      "note": "Импорт Engine из SDK и запуск с конфигурацией проекта."
    },
    {
      "title": "Block Puzzle · game.config.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/config/game.config.ts",
      "note": "Настройки игры, ресурсы, зависимости и начальная сцена boot."
    },
    {
      "title": "SDK · Engine.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/core/Engine.ts",
      "note": "Engine.run создаёт движок, подготавливает canvas и передаёт GameConfig в запуск."
    }
  ]
}
---

В [game/src/main.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/main.ts) `Engine` импортируется из SDK, а `BlockPuzzleGameConfig` — из проекта игры. Ниже показаны импорты и строка запуска; проверка загрузки страницы из исходного файла опущена:

```ts
import { Engine } from '@gamedevland/engine';

import { BlockPuzzleGameConfig } from './config/game.config';

void Engine.run('#app', BlockPuzzleGameConfig.config);
```

Первый аргумент, `'#app'`, указывает на контейнер `<div id="app"></div>` в HTML: туда движок добавит canvas. Второй аргумент — [конфигурация игры](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/config/game.config.ts). Она задаёт настройки систем, ресурсы, сцены и зависимости проекта.

`Engine.run` создаёт и подготавливает движок по этим данным, затем открывает начальную сцену. В Block Puzzle поле `scenes.initial` равно `'boot'`, поэтому сначала запускается загрузочная сцена проекта.

<figure class="sdk-figure is-flow" aria-label="Проект передаёт конфигурацию в Engine.run, SDK подготавливает движок и открывает выбранную проектом сцену boot">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-violet"><span class="sdk-figure__index">01</span><div><strong>Конфигурация игры</strong><span>Проект задаёт system, assets, scenes и di</span></div></div>
    <div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">02</span><div><strong>Engine.run</strong><span>SDK подготавливает системы и canvas</span></div></div>
    <div class="sdk-figure__item tone-green"><span class="sdk-figure__index">03</span><div><strong>Сцена boot</strong><span>SDK открывает сцену, выбранную проектом</span></div></div>
  </div>
  <figcaption>Проект описывает игру, SDK выполняет общий механизм её запуска.</figcaption>
</figure>

Игровые классы, ресурсы и правила остаются в проекте. SDK предоставляет механизм их подключения и запуска. Для другой игры передадим другую конфигурацию в тот же `Engine.run`.
