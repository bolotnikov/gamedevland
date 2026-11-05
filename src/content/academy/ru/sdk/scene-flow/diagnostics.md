---
{
  "locale": "ru",
  "translationKey": "sdk/scene-flow/diagnostics",
  "course": "sdk",
  "lesson": "scene-flow",
  "draft": false,
  "order": 13,
  "title": "Ошибки SDK и диагностика",
  "concept": "Диагностика",
  "description": "Найдём причину по коду и данным ошибки.",
  "takeaway": [
    "По коду ошибки узнаём, что SDK не смог найти или обработать."
  ],
  "sources": [
    {
      "title": "SDK · index.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/errors/index.ts",
      "note": "Публичные средства диагностики."
    },
    {
      "title": "SDK · DiBootstrapValidator.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/di/DiBootstrapValidator.ts",
      "note": "Проверка связей DI на старте."
    },
    {
      "title": "Block Puzzle · GameDevtoolsApiService.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/debug/scenes/game/services/GameDevtoolsApiService.ts",
      "note": "Отладочный API с очисткой hook."
    }
  ]
}
---

`EngineError` содержит код, подсистему, подробности и исходную причину. Эти данные помогают отличить отсутствующий ресурс от неверного токена или ошибки входных данных.

Если SDK не нашёл набор ресурсов, ошибка `AssetMissingRequired` укажет его имя. `DiProviderNotFound` означает, что для токена нет регистрации.

<figure class="sdk-figure is-matrix"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>Не открылась сцена</strong><span>scenes.map → SceneDiDefinition → layout ID</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>Не найден компонент</strong><span>JSON type → регистрация в ComponentsGroup</span></div></div><div class="sdk-figure__item tone-green"><div><strong>Не выполняется команда</strong><span>Текущее состояние → событие on → CommandsGroup</span></div></div><div class="sdk-figure__item tone-amber"><div><strong>Не прочитан конфиг</strong><span>Манифест → загрузка → bootstrap → декодер</span></div></div><div class="sdk-figure__item tone-cyan"><div><strong>Не обновился экран</strong><span>Событие → активная подписка → правильный узел</span></div></div></div><figcaption>Начинаем с первой нарушенной связи, а не с последнего визуального симптома.</figcaption></figure>

## Отладка Block Puzzle

У Block Puzzle есть [GameDevtoolsApiService.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/debug/scenes/game/services/GameDevtoolsApiService.ts). Сервис отправляет `ResultReady` с заданными очками. Так можно открыть окно результата без прохождения партии.
