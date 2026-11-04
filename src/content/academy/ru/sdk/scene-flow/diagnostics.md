---
{
  "locale": "ru",
  "translationKey": "sdk/scene-flow/diagnostics",
  "course": "sdk",
  "lesson": "scene-flow",
  "draft": true,
  "order": 12,
  "title": "Ищем ошибку на границе",
  "concept": "Диагностика",
  "description": "Проверим связи конфигурации до изменения игрового алгоритма.",
  "takeaway": [
    "Ошибка на границе должна сообщать, какая связь нарушена.",
    "Отладочный визуальный сценарий не заменяет проверку правил игры."
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

Например, неизвестный набор приводит к ошибке с `AssetMissingRequired` и именем `bundle`. Неизвестный DI-токен содержит `DiProviderNotFound`. Это полезнее, чем продолжать работу с пустым объектом и искать последующую ошибку рендера.

<figure class="sdk-figure is-matrix"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>Не открылась сцена</strong><span>scenes.map → SceneDiDefinition → layout ID</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>Не найден компонент</strong><span>JSON type → регистрация в ComponentsGroup</span></div></div><div class="sdk-figure__item tone-green"><div><strong>Не выполняется команда</strong><span>Текущее состояние → событие on → CommandsGroup</span></div></div><div class="sdk-figure__item tone-amber"><div><strong>Не прочитан конфиг</strong><span>Манифест → загрузка → bootstrap → декодер</span></div></div><div class="sdk-figure__item tone-cyan"><div><strong>Не обновился экран</strong><span>Событие → активная подписка → правильный узел</span></div></div></div><figcaption>Начинаем с первой нарушенной связи, а не с последнего визуального симптома.</figcaption></figure>

`EngineErrorFactory` создаёт ошибки, `EngineErrorCode` и `EngineSubsystem` задают их категории, `EngineErrorGuard` помогает распознавать ошибки движка, а `EngineErrorFormatter` формирует сообщение. Полный список доступен в карте API.

## Отладка Block Puzzle

В исходной игре есть [GameDevtoolsApiService.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/debug/scenes/game/services/GameDevtoolsApiService.ts). На входе сцены он регистрирует небольшой API через DebugApiHostService, на выходе удаляет hook. Этот API может отправить ResultReady с заданными очками и показать окно результата без прохождения всей партии.

Это инструмент конкретной игры, а не универсальный метод SDK и не доказательство корректности игрового расчёта. Отдельно проверяем доменные правила, отдельно — визуальную реакцию на событие.

Перед передачей изменения на проверку запускаем `typecheck`, `lint` и сборку проекта. В браузере проверяем повторный вход, выход во время анимации и отсутствие удвоенных подписок.
