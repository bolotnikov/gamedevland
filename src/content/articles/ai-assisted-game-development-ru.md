---
title: "Не вайб-кодинг: как я делаю HTML5-игры с AI-агентами и собственным SDK"
description: "Практический подход к AI-разработке HTML5-игр: архитектура, SDK, агенты и контроль над проектом."
pubDate: 2026-07-03
draft: true
tags:
  - html5
  - gamedev
  - ai
  - typescript
  - architecture
featured: false
readingTime: "7 min read"
coverImage: "/assets/intro/cover.png"
coverAlt: "Превью статьи об AI-разработке HTML5-игр"
thumbnailImage: "/assets/intro/icon.png"
thumbnailAlt: "Иконка статьи об AI-разработке HTML5-игр"
category: workshop
---

AI хорошо помогает писать код, но в разработке игр одного AI недостаточно.

Если просто попросить агента "сделать игру", он может быстро собрать прототип. Проблемы начинаются позже: когда нужно добавлять механики, чинить баги, менять layout, оптимизировать загрузку, поддерживать resize, звуки, анимации и переходы между сценами.

В играх много состояния и side effects. Поэтому без архитектуры AI быстро начинает генерировать разные решения для одинаковых задач.

Мой подход простой: AI-агенты пишут код, но внутри заранее заданной архитектуры.

Для этого я сделал свой HTML5 game SDK:

- [@gamedevland/engine](https://www.npmjs.com/package/@gamedevland/engine)
- [@gamedevland/vite](https://www.npmjs.com/package/@gamedevland/vite)
- пример production-игры: [Block Puzzle](https://gamedevland.github.io/block-puzzle/)

`Block Puzzle` - это готовая игра на SDK. В ней есть boot-сцена, preload, layout JSON, prefab JSON, FSM, команды, scene services, domain-модель, компоненты, drag-and-drop, score, game over, best score, звуки и production-сборка.

## Зачем нужен SDK

SDK нужен не для того, чтобы спрятать весь код игры.

Его задача - зафиксировать правила проекта:

- как запускается engine;
- как устроены сцены;
- как работает FSM;
- где выполняются команды;
- где хранится scene runtime state;
- где находятся игровые правила;
- как подключаются компоненты к layout nodes;
- как грузятся ассеты;
- как создаются prefabs;
- как обрабатывается input;
- как управлять tweens;
- как работать с resize и screen state.

После этого агенту не нужно каждый раз придумывать структуру. Он должен работать в существующих границах.

В `Block Puzzle` scene-класс почти пустой:

```ts
export class GameScene extends FsmDrivenScene {}
```

Это нормальное состояние для сцены. Сцена не должна содержать всю игровую логику.

Основной flow выглядит так:

```text
FSM -> Command -> Scene Service -> Domain Model
```

Визуальная часть идет отдельно:

```text
Layout JSON -> Node -> Component / Action
```

Разделение получается такое:

- FSM описывает состояние сцены и переходы;
- command выполняет один use-case step;
- scene service хранит состояние текущей игровой сессии;
- domain classes содержат правила игры;
- components/actions управляют node-local визуальным поведением;
- layout/prefab/config JSON содержат authored values;
- SDK содержит повторяемую инфраструктуру.

Для разработки с AI это важно. Агенту проще изменить маленький класс с одной ответственностью, чем разбираться в большом scene-файле, где смешаны правила игры, PIXI-объекты, анимации, input и сохранение прогресса.

## Пример: размещение блока

Возьмем базовое действие в `Block Puzzle`: игрок переносит фигуру на поле.

Плохой вариант - сделать все в одном компоненте:

- слушать pointer events;
- считать preview;
- проверять возможность размещения;
- менять доску;
- очищать линии;
- считать score;
- обновлять UI;
- запускать эффекты;
- проверять game over.

Такой код может работать, но его неудобно развивать.

В текущей архитектуре задачи разделены:

1. Drag component обрабатывает input и preview.
2. При drop он отправляет событие `PlacementRequested`.
3. FSM переводит сцену в состояние `resolvingPlacement`.
4. `PlaceBlockCommand` декодирует payload и вызывает gameplay service.
5. Gameplay service работает с domain-моделью доски, слотов и score.
6. После этого сервис отправляет события `PlacementCompleted`, `LinesCleared`, `BoardChanged`, `BlocksChanged`, `ScoreChanged`.
7. Визуальные компоненты реагируют на события и обновляют экран.

В результате game rules не зависят от PIXI, а visual components не считают score.

Это не усложнение ради архитектуры. Это способ держать проект в состоянии, где новую задачу можно дать агенту с понятным scope.

## Что должно быть в SDK

Я стараюсь оставлять в game-коде только то, что относится к конкретной игре.

В SDK должны уходить повторяемые вещи:

- lifecycle сцен и компонентов;
- scene-scoped DI;
- event bus;
- command bus;
- FSM;
- typed config decoding;
- asset bundles;
- prefab creation;
- input routing;
- screen manager;
- audio;
- persistence;
- tween ownership;
- async safety;
- debug hooks.

Например, компонент может запускать async-операцию или tween. При смене сцены важно не продолжить работу с уже уничтоженным node. Поэтому в SDK есть component lifecycle, tracking задач, component scope version и управление owned tweens.

Asset loading тоже не должен быть локальным набором `fetch`. В engine есть asset manager с bundles, retry, timeout и ограничением параллельных загрузок.

Resize не должен быть набором `window.innerWidth` в разных компонентах. Для этого есть screen manager и единая screen snapshot модель.

FSM transitions выполняются последовательно через command bus. Это делает порядок действий предсказуемым.

## Как я работаю с AI-агентами

Мой обычный workflow:

1. Описать задачу и ограничить scope.
2. Дать агенту изучить локальные правила проекта и текущую реализацию.
3. Делать изменение в существующей архитектуре.
4. Если в game-коде появляется повторяемый helper, проверить, не должен ли он стать частью SDK.
5. После изменения запускать `typecheck` и `lint`.
6. Проверять результат как обычный code review.

Главное правило: агент не должен заменять архитектуру проекта.

Если нужно добавить новую фичу, сначала выбираем место:

- gameplay rule - domain;
- use-case step - command;
- scene runtime state - scene service;
- visual behavior - component/action;
- repeated visual structure - prefab;
- authored values - layout/config JSON;
- generic lifecycle/input/assets/tween problem - SDK.

Так AI помогает быстрее писать код, но не ломает структуру проекта.

## Почему не все должно быть в game-коде

Можно оставить SDK минимальным и решать все в конкретной игре. На первом проекте это выглядит быстрее.

Проблема появляется на следующих проектах. Начинают копироваться lifecycle guards, asset helpers, responsive helpers, prefab helpers, debug hooks. Через некоторое время уже непонятно, какая версия правильная.

Поэтому граница такая:

- game code содержит правила конкретной игры;
- SDK содержит повторяемую инфраструктуру;
- layout/config содержит authored values;
- domain code не знает о renderer;
- components не считают игровые правила;
- scene services не рисуют sprites;
- engine не знает, что такое block puzzle.

Эта граница помогает и человеку, и AI-агенту.

## Следующие темы

Дальше я хочу разобрать отдельные части и подробности работы с моим SDK на реальных проектах:

- адаптивность и responsive layout;
- умная загрузка ресурсов;
- FSM в игровых сценах;
- components и actions;
- безопасные tweens и async-операции;
- общий ticker и runtime systems;
- debug services для DevTools;
- логирование и диагностика с помощью AI;
- workflow с Codex, VS Code, Figma, Photopea;
- итерации gameplay на примере `Block Puzzle`;
- и так далее.

Основная идея: AI полезен в разработке игр, когда у проекта есть понятные границы.

Без границ AI ускоряет хаос. С границами AI ускоряет разработку.
