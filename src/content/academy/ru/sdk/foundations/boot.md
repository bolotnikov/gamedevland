---
{
  "locale": "ru",
  "translationKey": "sdk/foundations/boot",
  "course": "sdk",
  "lesson": "foundations",
  "draft": false,
  "order": 5,
  "title": "От запуска движка к игровой сцене",
  "concept": "Загрузка и готовность",
  "description": "Разделим запуск движка и подготовку ресурсов для игровой сцены.",
  "sources": [
    {
      "title": "SDK · Engine.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/core/Engine.ts",
      "note": "Подготовка движка и открытие начальной сцены."
    },
    {
      "title": "SDK · BaseScene.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/scenes/BaseScene.ts",
      "note": "Автоматическая предзагрузка сцены, сборка layout и вход в сцену."
    },
    {
      "title": "SDK · ConfigBootstrapper.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/core/boot/ConfigBootstrapper.ts",
      "note": "Загрузка JSON-наборов и помещение данных в ConfigStore."
    },
    {
      "title": "SDK · AssetManager.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/assets/AssetManager.ts",
      "note": "Различие loadBundle и loadRequiredBundle; загрузка JSON по требованию."
    }
  ]
}
---

<aside class="lesson-note is-green" aria-labelledby="lesson-purpose">
  <h3 id="lesson-purpose">Зачем это нужно</h3>
  <p>Вход в boot ещё не означает, что можно начать партию. SDK выполняет предзагрузку из конфигурации. Затем сервис проекта запрашивает игровые наборы и инициирует переход в game.</p>
</aside>

<figure class="sdk-figure is-flow" aria-label="Запуск движка, загрузка в boot и переход в game">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">01</span><div><strong>Engine.run → boot</strong><span>SDK загружает configs и открывает начальную сцену из <a href="https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/config/game.config.ts" target="_blank" rel="noopener noreferrer">game.config.ts</a>.</span></div></div>
    <div class="sdk-figure__item tone-violet"><span class="sdk-figure__index">02</span><div><strong>Загрузка в boot</strong><span><a href="https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/boot/services/BootPreloadService.ts" target="_blank" rel="noopener noreferrer">BootPreloadService</a> запрашивает игровые наборы и отправляет PreloadCompleted.</span></div></div>
    <div class="sdk-figure__item tone-green"><span class="sdk-figure__index">03</span><div><strong>Переход в game</strong><span>По событию <a href="https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/boot/commands/OpenGameSceneCommand.ts" target="_blank" rel="noopener noreferrer">команда перехода</a> вызывает scenes.start('game').</span></div></div>
  </div>
  <figcaption>boot и game — ключи сцен в scenes.map. Переход между ними задаёт проект.</figcaption>
</figure>
