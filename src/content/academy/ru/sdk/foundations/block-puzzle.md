---
{
  "locale": "ru",
  "translationKey": "sdk/foundations/block-puzzle",
  "course": "sdk",
  "lesson": "foundations",
  "draft": false,
  "order": 2,
  "title": "Запускаем Block Puzzle",
  "concept": "Готовый проект",
  "description": "Получим работающую игру, прежде чем разбирать её устройство.",
  "takeaway": [
    "Сначала запускаем зафиксированную версию игры.",
    "Ссылки курса ведут на ту же ревизию исходников."
  ],
  "sources": [
    {
      "title": "Block Puzzle · package.json",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/package.json",
      "note": "Версии зависимостей и существующие npm scripts."
    },
    {
      "title": "Block Puzzle · vite.config.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/vite.config.ts",
      "note": "Использование общей конфигурации Vite."
    }
  ]
}
---

Откроем [демо Block Puzzle](https://gamedevland.github.io/block-puzzle/). Игрок переносит фигуры на поле 8 × 8. Заполненные строки и столбцы очищаются; когда ни одна фигура не помещается, партия заканчивается.

Теперь получим [исходники игры](https://github.com/gamedevland/block-puzzle). В курсе зафиксирована публичная ревизия `d1dd4e3`: это позволяет сверять примеры с неизменным кодом. Для локального запуска выполним команды ниже. Скрипт `dev:web` определён в [package.json](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/package.json).

```sh
git clone https://github.com/gamedevland/block-puzzle.git
cd block-puzzle
git checkout d1dd4e35b3df7d71fcc6a3eca9f5133773f51177
npm ci
npm run dev:web
```

Потребуется Node.js 22.12+ или 24. Адрес покажет Vite; исходная конфигурация использует порт `5173`. После запуска проверим один ход, изменение очков и перезапуск партии.

<a id="where-to-find-the-code" class="translation-anchor" aria-hidden="true"></a>
## Где искать код

<figure class="sdk-figure is-tree"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>package.json · vite.config.ts</strong><span>Зависимости, команды запуска и настройки сборки</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>game/src/config</strong><span>GameConfig, манифест ресурсов и глобальный DI</span></div></div><div class="sdk-figure__item tone-green"><div><strong>game/src/scenes/game</strong><span>FSM, команды, сервисы, доменные классы и компоненты</span></div></div><div class="sdk-figure__item tone-amber"><div><strong>game/assets/json</strong><span>Конфиги, вёрстка и повторяемые визуальные заготовки</span></div></div></div><figcaption>Папка game содержит браузерную часть. Vite запускается из корня репозитория.</figcaption></figure>

Для первого запуска используем зависимости из `package-lock.json`: команда `npm ci` устанавливает закреплённый в нём набор пакетов.

Команды `npm run typecheck`, `npm run lint` и `npm run build:web` проверяют типы, стиль кода и сборку. Успешная сборка не заменяет проверку перетаскивания в браузере.
