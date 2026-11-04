---
{
  "locale": "ru",
  "translationKey": "sdk/scene-flow/scenes",
  "course": "sdk",
  "lesson": "scene-flow",
  "draft": true,
  "order": 1,
  "title": "Жизненный цикл сцены",
  "concept": "SceneConfig и BaseScene",
  "description": "Сцена собирает окружение, а игровое поведение передаёт другим объектам.",
  "takeaway": [
    "SceneConfig описывает сборку сцены.",
    "Класс сцены сохраняет общий жизненный цикл и остаётся небольшим."
  ],
  "sources": [
    {
      "title": "SDK · BaseScene.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/scenes/BaseScene.ts",
      "note": "Реальный порядок входа и выхода."
    },
    {
      "title": "SDK · SceneManager.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/scenes/SceneManager.ts",
      "note": "Очередь переходов, стек и параметры."
    },
    {
      "title": "Block Puzzle · scene.config.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/configs/scene.config.ts",
      "note": "Конфигурация игровой сцены."
    }
  ]
}
---

`SceneConfig` описывает сцену: её ключ, класс, ресурсы, layout и FSM. В Block Puzzle описание игровой сцены находится в [scene.config.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/configs/scene.config.ts):

```ts
import { GameScene } from '../../GameScene';

import { GameFsm } from './fsm.config';

import type { SceneConfig } from '@gamedevland/engine/core';

export class GameSceneDefinition {
  static readonly config: SceneConfig = {
    key: 'game',
    useClass: GameScene,
    layout: 'json/layouts/scenes/game/layout.json',
    fsm: GameFsm.config,
  };
}
```

`BaseScene` предоставляет общий жизненный цикл. `FsmDrivenScene` дополняет его событиями готовности и обновления, чтобы игровой сценарий оставался в FSM.

<figure class="sdk-figure is-flow is-long"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">01</span><div><strong>preload</strong><span>Загрузка SceneConfig.assets</span></div></div><div class="sdk-figure__item tone-violet"><span class="sdk-figure__index">02</span><div><strong>onEnter</strong><span>Создание DI сцены → сборка layout</span></div></div><div class="sdk-figure__item tone-green"><span class="sdk-figure__index">03</span><div><strong>Подготовка</strong><span>Конфиги сцены → запуск сервисов → активация компонентов</span></div></div><div class="sdk-figure__item tone-amber"><span class="sdk-figure__index">04</span><div><strong>create</strong><span>Запуск FSM уже выполнен; FsmDrivenScene отправляет SceneReady</span></div></div><div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">05</span><div><strong>onExit</strong><span>Остановка FSM → сервисы → частицы и layout → очистка связей DI</span></div></div></div><figcaption>Порядок входа важен: компоненты активируются после подготовки сервисов.</figcaption></figure>

Класс `GameScene` в публичном проекте лишь передаёт конфигурацию базовому классу. Логику размещения фигур в него добавлять не требуется.

## Переходы между сценами

`SceneManager.start(key)` открывает начальную сцену. `replace(key, options)` заменяет верхнюю; `push` добавляет сцену в стек, а `pop` убирает верхнюю. Обновляется только верхняя неприостановленная сцена. Переходы проходят через очередь и имеют таймаут жизненных хуков.

Через `options.params` передаются входные данные новой сцены. Команда читает их через `sceneParams` и проверяет `decodeSceneParams`; параметры перехода не заменяют состояние текущей партии.

Важно: сервисы, layout и FSM стандартной BaseScene подготавливаются в ветке с `layout`. Пустой пример первого раздела специально использовал BaseScene без этих возможностей. Для сцены с FSM определим layout и выберем FsmDrivenScene.
