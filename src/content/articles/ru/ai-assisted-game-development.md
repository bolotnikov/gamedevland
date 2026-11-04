---
locale: ru
translationKey: ai-assisted-game-development
title: Как я создаю HTML5-игры с AI-агентами и собственным SDK
description: 'Практический подход к разработке HTML5-игр с AI: архитектура, контракты SDK, агенты и контроль над проектом.'
pubDate: 2026-07-03T00:00:00.000Z
draft: false
tags:
  - html5
  - gamedev
  - ai
  - typescript
  - architecture
featured: false
readingTime: 7 минут чтения
coverImage: /assets/intro/cover.png
coverAlt: Обложка статьи о разработке HTML5-игр с AI
thumbnailImage: /assets/intro/icon.png
thumbnailAlt: Иконка статьи о разработке HTML5-игр с AI
category: workshop
---


AI очень помогает писать код, но одного AI для разработки игр недостаточно.

Если попросить агента «сделать игру», он может быстро собрать прототип. Проблемы обычно начинаются позже: когда нужно добавить механику, исправить ошибки, изменить вёрстку, оптимизировать загрузку, поддержать изменение размера экрана, звук, анимации и переходы между сценами.

В играх много состояния и побочных эффектов. Без архитектуры AI начинает генерировать разные решения для однотипных задач.

Мой подход прост: AI-агенты пишут код, но работают внутри заранее определённой архитектуры.

Поэтому я создал собственный SDK для HTML5-игр:

- пакеты SDK в npm: <a href="https://www.npmjs.com/package/@gamedevland/engine" target="_blank" rel="noreferrer">@gamedevland/engine</a> и <a href="https://www.npmjs.com/package/@gamedevland/vite" target="_blank" rel="noreferrer">@gamedevland/vite</a>
- пример игры: <a href="https://gamedevland.github.io/block-puzzle/" target="_blank" rel="noreferrer">Block Puzzle</a>
- репозиторий игры: <a href="https://github.com/gamedevland/block-puzzle" target="_blank" rel="noreferrer">gamedevland/block-puzzle</a>

<a href="https://github.com/gamedevland/block-puzzle" target="_blank" rel="noreferrer">Block Puzzle</a> — полноценная игра на этом SDK. В ней есть загрузочная сцена, предзагрузка, JSON-вёрстка, JSON-префабы, FSM, команды, сервисы сцены, доменная модель, компоненты, перетаскивание, очки, завершение игры, рекорд, звуки и сборка для продакшена.

<a id="why-the-sdk-exists" class="translation-anchor" aria-hidden="true"></a>

## Зачем нужен SDK

Задача SDK — не спрятать весь игровой код.

Его задача — определить правила проекта:

- управление сценой: жизненный цикл, FSM, команды, сервисы сцены, доменная модель;
- визуальная композиция: узлы вёрстки, компоненты, действия, префабы;
- системы исполнения: ресурсы, ввод, твины, звук, состояние экрана, сохранение данных;
- границы: что относится к игре, а что — к SDK.

После этого агенту не нужно каждый раз придумывать структуру. Он должен работать внутри существующих границ.

В <a href="https://github.com/gamedevland/block-puzzle" target="_blank" rel="noreferrer">Block Puzzle</a> класс сцены почти пуст:

```ts
export class GameScene extends FsmDrivenScene {}
```

Это хорошее состояние класса сцены. В нём не должна находиться вся игровая логика.

Два основных потока разделены:

<div class="article-layer-flows">
  <div class="article-layer-flow">
    <span class="article-layer-flow__label">Управление сценой</span>
    <div class="article-layer-flow__steps">
      <strong>FSM</strong>
      <strong>Команда</strong>
      <strong>Сервис сцены</strong>
      <strong>Доменная модель</strong>
    </div>
  </div>
  <div class="article-layer-flow">
    <span class="article-layer-flow__label">Визуальный слой</span>
    <div class="article-layer-flow__steps">
      <strong>JSON-вёрстка</strong>
      <strong>Узел</strong>
      <strong>Компонент / действие</strong>
    </div>
  </div>
</div>

Это важно для разработки с AI. Агенту гораздо проще изменить небольшой класс с одной ответственностью, чем работать с большим файлом сцены, в котором смешаны правила игры, объекты PIXI, анимации, ввод и сохранение прогресса.

<a id="example-placing-a-block" class="translation-anchor" aria-hidden="true"></a>

## Пример: размещение блока

Возьмём основное действие в <a href="https://github.com/gamedevland/block-puzzle" target="_blank" rel="noreferrer">Block Puzzle</a>: игрок перетаскивает фигуру на поле.

<a id="the-problem" class="translation-anchor" aria-hidden="true"></a>

### Проблема

Плохой вариант — поместить всё в один компонент.

<div class="article-problem-list">
  <h3>Компонент, отвечающий за всё</h3>
  <ul>
    <li>события указателя</li>
    <li>предпросмотр размещения</li>
    <li>изменение поля</li>
    <li>очистка линий</li>
    <li>подсчёт очков</li>
    <li>обновление интерфейса</li>
    <li>эффекты</li>
    <li>проверка завершения игры</li>
  </ul>
</div>

Такой код может работать, но его трудно развивать.

<a id="the-actual-flow" class="translation-anchor" aria-hidden="true"></a>

### Реальный поток выполнения

В текущей архитектуре упрощённый поток выглядит так:

<div class="article-flow-diagram">
  <div class="article-flow-step">
    <span>1</span>
    <strong>Компонент перетаскивания</strong>
    <small>обрабатывает ввод и предпросмотр, затем отправляет PlacementRequested</small>
  </div>
  <div class="article-flow-step">
    <span>2</span>
    <strong>FSM + команда</strong>
    <small>переходит в resolvingPlacement и запускает PlaceBlockCommand</small>
  </div>
  <div class="article-flow-step">
    <span>3</span>
    <strong>Сервис игрового процесса</strong>
    <small>проверяет размещение и обновляет состояние сессии</small>
  </div>
  <div class="article-flow-step">
    <span>4</span>
    <strong>Поле / слоты / очки</strong>
    <small>доменная модель применяет правила игры</small>
  </div>
  <div class="article-flow-step">
    <span>5</span>
    <strong>События + визуальные компоненты</strong>
    <small>PlacementCompleted, BoardChanged, BlocksChanged и ScoreChanged обновляют экран</small>
  </div>
</div>

В результате правила игры не зависят от PIXI, а визуальные компоненты не считают очки.

Это не архитектура ради архитектуры. Так я поддерживаю проект в состоянии, в котором новую задачу можно поручить агенту с чётко определёнными границами.

<a id="code-shape" class="translation-anchor" aria-hidden="true"></a>

### Структура кода

Код верхнего уровня остаётся небольшим. FSM решает, когда нужно обработать размещение:

```ts
playing: {
  on: {
    [BlockPuzzleEvents.PlacementRequested]: {
      target: 'resolvingPlacement',
      actions: ['PlaceBlockCommand'],
    },
  },
}
```

Команда — лишь граница между событием FSM и сервисом сцены:

```ts
export class PlaceBlockCommand extends BaseTypedCommand<PlaceBlockCommandPayload> {
  protected override readonly inputDecoder =
    BlockPuzzleEventSchemas.PlacementRequest;

  protected override execute(payload: PlaceBlockCommandPayload): void {
    this.getSceneService(BlockPuzzleServices.Gameplay).place(payload);
  }
}
```

Сервис отвечает за обновление сессии и делегирует правила доменной модели:

```ts
export class BlockPuzzleGameplayService extends BaseSceneService {
  place(request: PlacementRequest): void {
    // Read current session state and validate the requested shape.
    // Apply board, slots, line-clear, and scoring domain rules.
    // Build a MoveResult for visual components and follow-up commands.
    // Emit placement, board, blocks, line-clear, and score events.
  }
}
```

<a id="what-belongs-in-the-sdk" class="translation-anchor" aria-hidden="true"></a>

## Что относится к SDK

Я стараюсь сосредоточить игровой код на конкретной игре.

Переиспользуемую инфраструктуру следует переносить в SDK, когда она встречается в разных проектах.

<div class="article-sdk-grid">
  <div class="article-sdk-card">
    <h3>Оркестрация</h3>
    <ul>
      <li>жизненный цикл сцены</li>
      <li>FSM</li>
      <li>команды</li>
      <li>события</li>
      <li>сервисы сцены</li>
      <li>DI в области сцены</li>
    </ul>
  </div>
  <div class="article-sdk-card">
    <h3>Вёрстка и взаимодействие</h3>
    <ul>
      <li>узлы вёрстки</li>
      <li>компоненты и действия</li>
      <li>префабы</li>
      <li>адаптивная вёрстка</li>
      <li>маршрутизация ввода</li>
      <li>перетаскивание</li>
    </ul>
  </div>
  <div class="article-sdk-card">
    <h3>Данные и ресурсы</h3>
    <ul>
      <li>типизированное декодирование конфигурации</li>
      <li>настройки и хранилище</li>
      <li>манифест ресурсов</li>
      <li>наборы ресурсов</li>
      <li>разрешение текстур</li>
    </ul>
  </div>
  <div class="article-sdk-card">
    <h3>Исполнение и безопасность</h3>
    <ul>
      <li>менеджер экрана</li>
      <li>звук</li>
      <li>владение твинами</li>
      <li>безопасность асинхронных операций в области жизни</li>
      <li>физика и частицы</li>
      <li>интеграции с платформами</li>
      <li>ошибки с немедленным обнаружением</li>
    </ul>
  </div>
</div>

<a id="how-i-work-with-ai-agents" class="translation-anchor" aria-hidden="true"></a>

## Как я работаю с AI-агентами

Мой обычный процесс:

1. Описать задачу и ограничить её объём.
2. Дать агенту прочитать локальные правила проекта и текущую реализацию.
3. Внести изменение в рамках существующей архитектуры.
4. Если в игровом коде появляются повторяющиеся вспомогательные методы, проверить, не должны ли они стать частью SDK.
5. После изменения запустить `typecheck` и `lint`.
6. Проверить результат как при обычном код-ревью.

Главное правило: агент не должен подменять архитектуру проекта.

Добавляя новую возможность, я сначала выбираю, где ей место:

<div class="article-routing-map">
  <div class="article-routing-map__header">
    <span>Задача</span>
    <span>Где ей место</span>
  </div>
  <div class="article-routing-map__row">
    <span>правило игры</span>
    <strong>доменная модель</strong>
  </div>
  <div class="article-routing-map__row">
    <span>шаг сценария использования</span>
    <strong>команда</strong>
  </div>
  <div class="article-routing-map__row">
    <span>состояние сцены во время работы</span>
    <strong>сервис сцены</strong>
  </div>
  <div class="article-routing-map__row">
    <span>визуальное поведение</span>
    <strong>компонент / действие</strong>
  </div>
  <div class="article-routing-map__row">
    <span>повторяющаяся визуальная структура</span>
    <strong>префаб</strong>
  </div>
  <div class="article-routing-map__row">
    <span>значения, заданные автором</span>
    <strong>JSON-вёрстка / конфигурация</strong>
  </div>
  <div class="article-routing-map__row is-sdk">
    <span>общая задача жизненного цикла / ввода / ресурсов / твинов</span>
    <strong>SDK</strong>
  </div>
</div>

Так AI помогает быстрее писать код, не нарушая структуру проекта.

<a id="why-not-everything-belongs-in-game-code" class="translation-anchor" aria-hidden="true"></a>

## Почему не всё должно находиться в игровом коде

Можно оставить SDK минимальным и решать всё внутри конкретной игры. На первом проекте это может казаться быстрее.

Проблема проявляется в следующих проектах. Начинают копироваться проверки жизненного цикла, вспомогательные методы для ресурсов, адаптивности и префабов, а также отладочные хуки. Со временем становится непонятно, какая версия правильная.

Поэтому я сохраняю ту же границу: специфичные правила игры остаются в игровом коде, переиспользуемая инфраструктура переходит в SDK, а данные представления — в файлы вёрстки и конфигурации. Эта граница помогает и разработчику, и AI-агенту.

<a id="next-topics" class="translation-anchor" aria-hidden="true"></a>

## Следующие темы

Далее я хочу разобрать отдельные части и практические подробности работы с моим SDK на реальных проектах:

- адаптивная и отзывчивая вёрстка;
- умная загрузка ресурсов;
- FSM в игровых сценах;
- компоненты и действия;
- безопасные твины и асинхронные операции;
- отладочные сервисы для DevTools;
- процесс работы с Codex, VS Code, Figma и Photopea;
- итерации игрового процесса на примере <a href="https://github.com/gamedevland/block-puzzle" target="_blank" rel="noreferrer">Block Puzzle</a>;
- и другие подобные практические темы.

Основная мысль: AI полезен в разработке игр, когда у проекта есть чёткие границы.

Без границ AI ускоряет хаос. С границами AI ускоряет разработку.
