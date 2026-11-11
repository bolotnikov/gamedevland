---
{
  "locale": "ru",
  "translationKey": "sdk/scene-flow/scenes",
  "course": "sdk",
  "lesson": "scene-flow",
  "draft": false,
  "order": 1,
  "title": "Сцены и SceneManager",
  "concept": "SceneConfig и BaseScene",
  "description": "Сцена собирает окружение, а игровое поведение передаёт другим объектам.",
  "takeaway": [
    "SceneConfig описывает сборку сцены.",
    "Класс сцены сохраняет общий жизненный цикл и остаётся небольшим."
  ],
  "sources": [
    {
      "title": "SDK · BaseScene.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/scenes/BaseScene.ts",
      "note": "Реальный порядок входа и выхода."
    },
    {
      "title": "SDK · SceneManager.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/scenes/SceneManager.ts",
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

<figure class="sdk-figure is-flow is-scene-lifecycle" aria-label="Жизненный цикл сцены с layout">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-cyan">
      <span class="sdk-figure__index">01</span>
      <div><strong>preload()</strong><span>Загружает ресурсы из <code>SceneConfig.assets</code>.</span></div>
    </div>
    <div class="sdk-figure__item tone-violet">
      <span class="sdk-figure__index">02</span>
      <div>
        <strong>onEnter()</strong>
        <ol class="sdk-scene-enter-steps">
          <li>Создаёт DI сцены и собирает layout</li>
          <li>Подготавливает конфиги и запускает сервисы</li>
          <li>Активирует компоненты, подготавливает шейдеры и текстуры, затем запускает FSM, если она задана</li>
          <li>Вызывает <code>create()</code>. В <code>FsmDrivenScene</code> этот метод отправляет <code>SceneReady</code>.</li>
        </ol>
      </div>
    </div>
    <div class="sdk-figure__item tone-amber">
      <span class="sdk-figure__index">03</span>
      <div><strong>onExit()</strong><span>Останавливает FSM, освобождает сервисы, частицы, layout и DI сцены.</span></div>
    </div>
  </div>
</figure>

<aside class="lesson-note" aria-labelledby="scene-layout-requirement">
  <span class="lesson-note__label">Важно</span>
  <h3 id="scene-layout-requirement">Сцена с FSM</h3>
  <p>В <code>BaseScene</code> сервисы и FSM запускаются при заданном <code>layout</code>. В пустом проекте из первого раздела сцена работает без вёрстки. Для сцены с FSM укажем <code>layout</code> и выберем <code>FsmDrivenScene</code>.</p>
</aside>

Класс `GameScene` в публичном проекте лишь передаёт конфигурацию базовому классу. Логику размещения фигур в него добавлять не требуется.

## Переходы между сценами

`SceneManager.start(key)` открывает начальную сцену. `replace(key, options)` заменяет верхнюю; `push` добавляет сцену в стек, а `pop` убирает верхнюю. Обновляется только верхняя неприостановленная сцена. Переходы проходят через очередь и имеют таймаут жизненных хуков. Время скрытой вкладки в этот таймаут не входит. При неудачном входе SDK вызывает очистку и у частично запущенного сервиса.

Через `options.params` передаются входные данные новой сцены. Команда читает их через `sceneParams` и проверяет `decodeSceneParams`; параметры перехода не заменяют состояние текущей партии.
