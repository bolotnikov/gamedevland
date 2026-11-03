---
locale: ru
translationKey: fsm-in-html5-game-scenes
title: FSM в сценах HTML5-игр
description: Практическое руководство по управлению сценой через FSM, команды, сервисы сцены, события и доменные модели в SDK для HTML5-игр.
pubDate: 2026-08-07T00:00:00.000Z
draft: false
tags:
  - html5
  - gamedev
  - typescript
  - fsm
  - architecture
featured: false
readingTime: 10 минут чтения
coverImage: /assets/fsm-block-puzzle/cover.png
coverAlt: Поле Block Puzzle, связанное со схемой конечного автомата
thumbnailImage: /assets/fsm-block-puzzle/cover.png
thumbnailAlt: Поток FSM, используемый игровой сценой Block Puzzle
tableOfContents: true
category: technical
---


В этой статье я показываю, как управляю сценой через FSM в [`@gamedevland/engine`](https://www.npmjs.com/package/@gamedevland/engine) на примере запуска, размещения фигуры, проверки ходов, завершения и перезапуска [Block Puzzle](https://github.com/gamedevland/block-puzzle).

<div class="fsm-link-strip">
  <a href="https://www.npmjs.com/package/@gamedevland/engine" target="_blank" rel="noreferrer">
    <span>SDK</span>
    <strong>@gamedevland/engine</strong>
  </a>
  <a href="https://gamedevland.github.io/block-puzzle/" target="_blank" rel="noreferrer">
    <span>Играть</span>
    <strong>Демо Block Puzzle</strong>
  </a>
  <a href="https://github.com/gamedevland/block-puzzle" target="_blank" rel="noreferrer">
    <span>Исходный код</span>
    <strong>Репозиторий на GitHub</strong>
  </a>
</div>

<a id="what-is-an-fsm" class="translation-anchor" aria-hidden="true"></a>

## Что такое FSM?

FSM расшифровывается как Finite State Machine — конечный автомат.

FSM хранит текущее состояние системы и описывает, что должно происходить при поступлении нового события.

В Block Puzzle событие `PlacementRequested` переводит сцену из `playing` в `resolvingPlacement`.

<a id="fsm-elements" class="translation-anchor" aria-hidden="true"></a>

### Элементы FSM

<div class="fsm-anatomy" aria-label="Четыре элемента конечного автомата">
  <div class="fsm-anatomy__item is-state">
    <span>01</span>
    <strong>Состояния</strong>
    <small>Режимы, в которых может находиться сцена</small>
  </div>
  <div class="fsm-anatomy__item is-event">
    <span>02</span>
    <strong>События</strong>
    <small>Факты и запросы, на которые реагирует сцена</small>
  </div>
  <div class="fsm-anatomy__item is-transition">
    <span>03</span>
    <strong>Переходы</strong>
    <small>Допустимые пути между состояниями</small>
  </div>
  <div class="fsm-anatomy__item is-action">
    <span>04</span>
    <strong>Действия</strong>
    <small>Команды, выполняемые при переходе или входе в состояние</small>
  </div>
</div>

«Конечный» означает, что набор состояний определён заранее. Конфигурация FSM становится полной картой допустимых переходов.

<a id="why-a-game-scene-needs-an-fsm" class="translation-anchor" aria-hidden="true"></a>

## Зачем игровой сцене FSM

Без FSM состояние сцены обычно оказывается разбросано по компонентам и флагам: можно ли перетаскивать фигуру, обрабатывается ли размещение, завершилась ли игра и доступен ли перезапуск.

Проблема не в самих флагах, а в разрозненных правилах переходов.

<div class="fsm-problem-comparison">
  <div class="fsm-problem-comparison__side is-scattered">
    <div class="fsm-comparison-status">
      <span class="fsm-comparison-status__icon" aria-hidden="true">×</span>
      <span class="fsm-kicker">Разрозненное управление</span>
    </div>
    <strong>Флаги в разных компонентах</strong>
    <div class="fsm-fragment-cloud">
      <span>isDragging</span>
      <span>isResolving</span>
      <span>inputLocked</span>
      <span>gameEnded</span>
    </div>
    <small>Порядок приходится восстанавливать по деталям реализации.</small>
  </div>
  <div class="fsm-problem-comparison__arrow" aria-hidden="true">→</div>
  <div class="fsm-problem-comparison__side is-defined">
    <div class="fsm-comparison-status">
      <span class="fsm-comparison-status__icon" aria-hidden="true">✓</span>
      <span class="fsm-kicker">Явный поток выполнения</span>
    </div>
    <strong>Одна конфигурация FSM</strong>
    <div class="fsm-mini-route">
      <span>playing</span><i>→</i><span>resolving</span><i>→</i><span>checking</span>
    </div>
    <small>Состояния, события, переходы и команды видны вместе.</small>
  </div>
</div>

FSM управляет потоком выполнения. Правила игры, изменения вёрстки и подсчёт очков остаются в других слоях.

<a id="connecting-the-fsm-to-a-scene" class="translation-anchor" aria-hidden="true"></a>

## Подключение FSM к сцене

Класс сцены Block Puzzle занимает одну строку:

<a class="fsm-source-link" href="https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/GameScene.ts" target="_blank" rel="noreferrer"><strong>GameScene.ts</strong> <span>↗</span></a>

```ts
import { FsmDrivenScene } from '@gamedevland/engine/scenes';

export class GameScene extends FsmDrivenScene {}
```

Я оставляю классы сцен пустыми и распределяю логику по ответственности:

<div class="fsm-responsibility-map">
  <div><span>Управление сценой</span><strong>FSM</strong><small>состояния и переходы</small></div>
  <div><span>Шаг сценария использования</span><strong>Команда</strong><small>одно действие оркестрации</small></div>
  <div><span>Состояние во время работы</span><strong>Сервис сцены</strong><small>состояние сессии и координация</small></div>
  <div><span>Правила игры</span><strong>Доменная модель</strong><small>размещение, поле, очки</small></div>
  <div><span>Поведение узла</span><strong>Компонент</strong><small>постоянное визуальное поведение</small></div>
  <div><span>Визуальный шаг</span><strong>Действие</strong><small>один эффект или анимация</small></div>
</div>

В моём SDK `FsmDrivenScene` связывает жизненный цикл сцены с её FSM. Когда вёрстка, DI сцены и её сервисы готовы, он отправляет `SceneReady`. Пока сцена активна, он также отправляет `SceneTick`.

Конфигурация FSM подключается в описании сцены:

<a class="fsm-source-link" href="https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/configs/scene.config.ts" target="_blank" rel="noreferrer"><strong>scene.config.ts</strong> <span>↗</span></a>

```ts
export class GameSceneDefinition {
  static readonly config: SceneConfig = {
    key: 'game',
    useClass: GameScene,
    layout: 'json/layouts/scenes/game/layout.json',
    fsm: GameFsm.config,
  };
}
```

<a id="who-changes-the-state" class="translation-anchor" aria-hidden="true"></a>

## Кто изменяет состояние?

FSM изменяет собственное состояние. Компонент или сервис не указывает ему, в какое состояние перейти. Они отправляют событие, описывающее намерение или результат.

<div class="fsm-event-routing" aria-label="Источники событий, направляемых в FSM сцены">
  <div class="fsm-event-routing__sources">
    <div class="is-component"><span>Компонент</span><strong>Намерение игрока</strong><small>PlacementRequested</small></div>
    <div class="is-service"><span>Сервис сцены</span><strong>Результат сценария использования</strong><small>PlacementCompleted / Rejected</small></div>
    <div class="is-sdk"><span>SDK</span><strong>Жизненный цикл сцены</strong><small>SceneReady / SceneTick</small></div>
  </div>
  <div class="fsm-event-routing__bus">
    <i aria-hidden="true"></i>
    <i aria-hidden="true"></i>
    <i aria-hidden="true"></i>
    <span>Шина событий / мост жизненного цикла</span>
  </div>
  <div class="fsm-event-routing__machine">
    <span>Текущее состояние + событие</span>
    <strong>SceneFSM</strong>
    <small>найти переход → выполнить actions → установить target → выполнить entry</small>
  </div>
</div>

События обрабатываются в таком порядке:

1. Компонент или сервис отправляет событие; события жизненного цикла SDK отправляет напрямую.
2. Мост событий передаёт игровые события активному `SceneFSM`.
3. FSM находит переход и последовательно выполняет его `actions`.
4. Затем устанавливает `target` и выполняет действия `entry` нового состояния.

Если для события нет перехода в текущем состоянии, FSM ничего с ним не делает. Например, `PlacementRequested` начинает размещение только в состоянии `playing`.

<a id="why-a-component-should-not-switch-scene-state" class="translation-anchor" aria-hidden="true"></a>

### Почему компонент не должен переключать состояние сцены

`SceneFSM` не предоставляет метода `switchState()`. Компоненты сообщают о намерении; маршрут выбирается конфигурацией FSM.

<div class="fsm-switch-comparison" aria-label="Прямое переключение состояния и переходы FSM по событиям">
  <div class="fsm-switch-comparison__path is-direct">
    <div class="fsm-comparison-status">
      <span class="fsm-comparison-status__icon" aria-hidden="true">×</span>
      <span class="fsm-kicker">Прямое управление состоянием</span>
    </div>
    <div class="fsm-switch-comparison__flow">
      <strong>Компонент</strong>
      <i aria-hidden="true">→</i>
      <code>switchState('resolvingPlacement')</code>
    </div>
    <small>Компонент знает поток сцены и выбирает следующее состояние.</small>
  </div>
  <div class="fsm-switch-comparison__path is-event">
    <div class="fsm-comparison-status">
      <span class="fsm-comparison-status__icon" aria-hidden="true">✓</span>
      <span class="fsm-kicker">Переход по событию</span>
    </div>
    <div class="fsm-switch-comparison__flow">
      <strong>Компонент</strong>
      <i aria-hidden="true">→</i>
      <code>PlacementRequested</code>
      <i aria-hidden="true">→</i>
      <strong>SceneFSM</strong>
    </div>
    <small>Компонент сообщает о намерении; FSM решает, допустим ли переход и куда перейти.</small>
  </div>
</div>

Так управление сценой остаётся вне визуальных компонентов:

- переходы находятся в одной конфигурации и могут зависеть от состояния;
- действия перехода, действия входа и асинхронные команды сохраняют порядок выполнения;
- изменение потока сцены не требует переписывания компонентов.

Событие не обязано менять состояние. Если у перехода есть `actions`, но нет `target`, FSM выполняет команды и остаётся в текущем состоянии. Так Block Puzzle обрабатывает `RestartRequested`.

<a id="not-every-state-belongs-to-the-scene-fsm" class="translation-anchor" aria-hidden="true"></a>

### Не каждое состояние относится к FSM сцены

У компонента может быть собственное локальное состояние. Например, `BlockPuzzleDragComponent` хранит текущую фазу перетаскивания:

<a class="fsm-source-link" href="https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/components/BlockPuzzleDragComponent.ts" target="_blank" rel="noreferrer"><strong>BlockPuzzleDragComponent.ts</strong> <span>↗</span></a>

```ts
type DragPhase = 'dragging' | 'snapping' | 'returning';

interface DragSession extends DragSelection {
  readonly shape: ShapeDefinition;
  preview: PlacementPreview;
  phase: DragPhase;
}
```

<div class="fsm-scope-rule">
  <div>
    <span>Локальное состояние</span>
    <strong>Важно одному узлу или компоненту</strong>
    <small>Оставьте его внутри компонента.</small>
  </div>
  <div>
    <span>Состояние сцены</span>
    <strong>Нужна координация нескольких систем</strong>
    <small>Разместите его в FSM сцены и меняйте через события.</small>
  </div>
</div>

Эти фазы влияют только на компонент перетаскивания, поэтому им не место в FSM сцены.

<a id="the-scene-state-map" class="translation-anchor" aria-hidden="true"></a>

## Карта состояний сцены

Block Puzzle использует шесть состояний. Эта диаграмма показывает весь поток сцены, реализованный кодом в следующих разделах:

<div class="fsm-state-map" aria-label="Карта состояний сцены Block Puzzle">
  <div class="fsm-state-map__rail">
    <div class="fsm-state-node is-system">
      <span>Начальное состояние</span>
      <strong>bootstrapping</strong>
      <small>ожидание готовности сцены</small>
    </div>
    <div class="fsm-state-edge">
      <strong>SceneReady</strong>
      <small>запуск сессии + музыка</small>
    </div>
    <div class="fsm-state-node is-system">
      <span>Подготовка</span>
      <strong>starting</strong>
      <small>создание рабочей сессии</small>
    </div>
    <div class="fsm-state-edge">
      <strong>SessionStarted</strong>
    </div>
    <div class="fsm-state-node is-active">
      <span>Ввод игрока</span>
      <strong>playing</strong>
      <small>приём запросов на размещение</small>
    </div>
    <div class="fsm-state-edge">
      <strong>PlacementRequested</strong>
      <small>PlaceBlockCommand</small>
    </div>
    <div class="fsm-state-node is-work">
      <span>Сценарий использования</span>
      <strong>resolvingPlacement</strong>
      <small>применение хода</small>
    </div>
    <div class="fsm-state-edge">
      <strong>PlacementCompleted</strong>
    </div>
    <div class="fsm-state-node is-check">
      <span>Действие при входе</span>
      <strong>checkingMoves</strong>
      <small>поиск следующего хода</small>
    </div>
    <div class="fsm-state-edge">
      <strong>GameOver</strong>
    </div>
    <div class="fsm-state-node is-ended">
      <span>Результат</span>
      <strong>ended</strong>
      <small>ожидание перезапуска</small>
    </div>
  </div>
  <div class="fsm-state-map__returns">
    <div><strong>PlacementRejected</strong><span>resolvingPlacement → playing</span></div>
    <div><strong>MovesAvailable</strong><span>checkingMoves → playing</span></div>
    <div><strong>RestartRequested</strong><span>playing / resolving / checking / ended</span></div>
  </div>
</div>

<div id="from-diagram-to-code" class="fsm-implementation-guide">
  <span class="fsm-kicker">От схемы к коду</span>
  <p>Следующие три раздела проходят по карте сверху вниз. Четвёртый показывает подключение элементов:</p>
  <div>
    <a href="#starting-the-game-session"><strong>Запуск игровой сессии</strong><small>bootstrapping → starting → playing</small></a>
    <a href="#placing-a-block"><strong>Размещение блока</strong><small>playing → resolvingPlacement</small></a>
    <a href="#entry-actions-and-branching"><strong>Действия при входе и ветвление</strong><small>checkingMoves → playing / ended</small></a>
    <a href="#registering-commands-and-scene-services"><strong>Регистрация</strong><small>команды и сервисы сцены, используемые в потоке</small></a>
  </div>
</div>

<a id="starting-the-game-session" class="translation-anchor" aria-hidden="true"></a>

## Запуск игровой сессии

Когда сцена готова, `FsmDrivenScene` отправляет `SceneReady`. FSM выполняет две команды и задаёт целью `starting`:

<a class="fsm-source-link" href="https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/configs/fsm.config.ts" target="_blank" rel="noreferrer"><strong>fsm.config.ts</strong> <span>↗</span></a>

```ts
bootstrapping: {
  on: {
    [FsmDrivenSceneLifecycleEvents.SceneReady]: {
      target: 'starting',
      actions: [
        'StartBlockPuzzleSessionCommand',
        'StartBlockPuzzleMusicCommand',
      ],
    },
  },
},
starting: {
  on: {
    [BlockPuzzleEvents.SessionStarted]: {
      target: 'playing',
    },
  },
},
```

Команды в `actions` выполняются через `CommandBus` в строгом порядке. Если команда возвращает `Promise`, FSM ждёт её завершения перед запуском следующей команды.

Когда обе команды завершены, FSM устанавливает состояние `starting`. Событие `SessionStarted`, отправленное при создании сессии, уже ожидает в очереди и вызывает следующий переход в `playing`.

Сама команда остаётся небольшой. Она получает сервис сцены из DI и вызывает один сценарий использования:

<a class="fsm-source-link" href="https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/commands/StartBlockPuzzleSessionCommand.ts" target="_blank" rel="noreferrer"><strong>StartBlockPuzzleSessionCommand.ts</strong> <span>↗</span></a>

```ts
export class StartBlockPuzzleSessionCommand extends BaseCommand {
  override run(): void {
    this.getSceneService(BlockPuzzleServices.Gameplay).startSession();
  }
}
```

`BlockPuzzleGameplayService` создаёт рабочую сессию, отправляет начальные данные визуальным компонентам и сообщает о завершении запуска:

<a class="fsm-source-link" href="https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/services/BlockPuzzleGameplayService.ts" target="_blank" rel="noreferrer"><strong>BlockPuzzleGameplayService.ts</strong> <span>↗</span></a>

```ts
startSession(): void {
  const deck = new BlockPuzzleShapeDeck(this.shapesConfig.shapes);
  const slots = new BlockPuzzleSlots();
  slots.replace(deck.draw(BlockPuzzleSlots.Count));
  const progress = this.progress.load();

  this.session = {
    board: new BlockPuzzleBoard(this.boardConfig.width, this.boardConfig.height),
    deck,
    slots,
    score: 0,
    bestScore: progress.bestScore,
    ended: false,
  };
  this.emitBoardChanged();
  this.emitBlocksChanged();
  this.emitScoreChanged(0);
  this.sceneContext.engine.events.emit({
    type: BlockPuzzleEvents.SessionStarted,
    data: {},
  });
}
```

<a id="placing-a-block" class="translation-anchor" aria-hidden="true"></a>

## Размещение блока

<a id="1-the-component-emits-a-request" class="translation-anchor" aria-hidden="true"></a>

### 1. Компонент отправляет запрос

`BlockPuzzleDragComponent` отвечает за ввод, предпросмотр и визуальное перемещение. После анимации привязки к клетке он не меняет поле напрямую, а отправляет событие:

<a class="fsm-source-link" href="https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/components/BlockPuzzleDragComponent.ts" target="_blank" rel="noreferrer"><strong>BlockPuzzleDragComponent.ts</strong> <span>↗</span></a>

```ts
this.clearPreview();
this.node.events.emit({
  type: BlockPuzzleEvents.PlacementRequested,
  data: {
    slotId: drag.slotId,
    anchor,
  },
});
```

<a id="2-the-fsm-selects-the-scenario" class="translation-anchor" aria-hidden="true"></a>

### 2. FSM выбирает сценарий

FSM обрабатывает запрос в `playing`:

<a class="fsm-source-link" href="https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/configs/fsm.config.ts" target="_blank" rel="noreferrer"><strong>fsm.config.ts</strong> <span>↗</span></a>

```ts
playing: {
  on: {
    [BlockPuzzleEvents.PlacementRequested]: {
      target: 'resolvingPlacement',
      actions: ['PlaceBlockCommand'],
    },
    [BlockPuzzleEvents.RestartRequested]: {
      actions: ['RestartBlockPuzzleCommand'],
    },
  },
},
```

`PlacementRequested` обрабатывается только в `playing`, поэтому отдельный флаг `isPlacementLocked` не нужен. FSM выполняет `PlaceBlockCommand`, переходит в `resolvingPlacement`, затем обрабатывает событие результата из очереди.

<a id="3-the-command-validates-its-input" class="translation-anchor" aria-hidden="true"></a>

### 3. Команда проверяет входные данные

`PlaceBlockCommand` наследуется от `BaseTypedCommand`:

<a class="fsm-source-link" href="https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/commands/PlaceBlockCommand.ts" target="_blank" rel="noreferrer"><strong>PlaceBlockCommand.ts</strong> <span>↗</span></a>

```ts
type PlaceBlockCommandPayload = InferDecoded<
  typeof BlockPuzzleEventSchemas.PlacementRequest
>;

export class PlaceBlockCommand extends BaseTypedCommand<PlaceBlockCommandPayload> {
  protected override readonly inputDecoder =
    BlockPuzzleEventSchemas.PlacementRequest;

  protected override execute(payload: PlaceBlockCommandPayload): void {
    this.getSceneService(BlockPuzzleServices.Gameplay).place(payload);
  }
}
```

Схема полезной нагрузки находится рядом с остальными контрактами игровых событий:

<a class="fsm-source-link" href="https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/configs/event.schemas.ts" target="_blank" rel="noreferrer"><strong>event.schemas.ts</strong> <span>↗</span></a>

```ts
static readonly PlacementRequest = SchemaDecoder.object({
  slotId: SchemaDecoder.number({
    integer: true,
    min: 0,
    max: BlockPuzzleSlots.Count - 1,
  }),
  anchor: BlockPuzzleEventSchemas.Cell,
});
```

SDK декодирует полезную нагрузку события до запуска `execute`. `InferDecoded` выводит тип TypeScript из той же схемы, поэтому проверки во время исполнения и статическая типизация не могут разойтись.

<a id="4-the-scene-service-updates-the-session" class="translation-anchor" aria-hidden="true"></a>

### 4. Сервис сцены обновляет сессию

`BlockPuzzleGameplayService` владеет текущей сессией:

<a class="fsm-source-link" href="https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/services/BlockPuzzleGameplayService.ts" target="_blank" rel="noreferrer"><strong>BlockPuzzleGameplayService.ts</strong> <span>↗</span></a>

```ts
interface BlockPuzzleSession {
  readonly board: BlockPuzzleBoard;
  readonly deck: BlockPuzzleShapeDeck;
  readonly slots: BlockPuzzleSlots;
  score: number;
  bestScore: number;
  ended: boolean;
}
```

Сервис координирует полный ход: получает фигуру из слота, вызывает доменные методы поля, очищает заполненные линии, считает очки и отправляет результат. Сами правила остаются в специализированных доменных классах.

Проверка допустимости размещения относится к `BlockPuzzleBoard`:

<a class="fsm-source-link" href="https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/domain/BlockPuzzleBoard.ts" target="_blank" rel="noreferrer"><strong>BlockPuzzleBoard.ts</strong> <span>↗</span></a>

```ts
canPlace(shape: ShapeDefinition, anchor: CellCoordinate): boolean {
  return shape.cells.every((cell) => {
    const target = this.resolveTarget(anchor, cell);
    return this.isInside(target) && this.readCell(target) === null;
  });
}
```

Подсчёт очков относится к `BlockPuzzleScoreRules`:

<a class="fsm-source-link" href="https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/domain/BlockPuzzleScoreRules.ts" target="_blank" rel="noreferrer"><strong>BlockPuzzleScoreRules.ts</strong> <span>↗</span></a>

```ts
calculate(placedCellCount: number, clearedLineCount: number): number {
  const placementPoints = placedCellCount * this.config.pointsPerPlacedCell;
  const linePoints = clearedLineCount * this.config.pointsPerClearedLine;
  const multiLineBonus = clearedLineCount >= 2 ? this.config.multiLineBonus : 0;
  return placementPoints + linePoints + multiLineBonus;
}
```

FSM управляет порядком выполнения, команда делегирует сценарий использования, а доменная модель владеет правилами.

<a id="5-the-result-selects-the-next-state" class="translation-anchor" aria-hidden="true"></a>

### 5. Результат определяет следующее состояние

Сервис отправляет `PlacementCompleted` или `PlacementRejected`, а FSM описывает обе ветви:

<a class="fsm-source-link" href="https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/configs/fsm.config.ts" target="_blank" rel="noreferrer"><strong>fsm.config.ts</strong> <span>↗</span></a>

```ts
resolvingPlacement: {
  on: {
    [BlockPuzzleEvents.PlacementCompleted]: {
      target: 'checkingMoves',
    },
    [BlockPuzzleEvents.PlacementRejected]: {
      target: 'playing',
    },
    [BlockPuzzleEvents.RestartRequested]: {
      actions: ['RestartBlockPuzzleCommand'],
    },
  },
},
```

<a id="entry-actions-and-branching" class="translation-anchor" aria-hidden="true"></a>

## Действия при входе и ветвление

После каждого успешного хода нужно проверить, доступно ли ещё размещение. Это должно происходить при каждом входе FSM в `checkingMoves`, поэтому проверка объявлена как действие `entry`:

<a class="fsm-source-link" href="https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/configs/fsm.config.ts" target="_blank" rel="noreferrer"><strong>fsm.config.ts</strong> <span>↗</span></a>

```ts
checkingMoves: {
  entry: ['CheckBlockPuzzleMovesCommand'],
  on: {
    [BlockPuzzleEvents.MovesAvailable]: {
      target: 'playing',
    },
    [BlockPuzzleEvents.GameOver]: {
      target: 'ended',
      actions: ['HandleBlockPuzzleGameOverCommand'],
    },
    [BlockPuzzleEvents.RestartRequested]: {
      actions: ['RestartBlockPuzzleCommand'],
    },
  },
},
```

Команда содержит один шаг:

<a class="fsm-source-link" href="https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/commands/CheckBlockPuzzleMovesCommand.ts" target="_blank" rel="noreferrer"><strong>CheckBlockPuzzleMovesCommand.ts</strong> <span>↗</span></a>

```ts
export class CheckBlockPuzzleMovesCommand extends BaseCommand {
  override run(): void {
    this.getSceneService(BlockPuzzleServices.Gameplay).emitMoveAvailability();
  }
}
```

Сервис обращается к доменной модели и отправляет результат:

<a class="fsm-source-link" href="https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/services/BlockPuzzleGameplayService.ts" target="_blank" rel="noreferrer"><strong>BlockPuzzleGameplayService.ts</strong> <span>↗</span></a>

```ts
emitMoveAvailability(): void {
  this.sceneContext.engine.events.emit({
    type: this.hasAvailableMove()
      ? BlockPuzzleEvents.MovesAvailable
      : BlockPuzzleEvents.GameOver,
    data: {},
  });
}
```

Внутри FSM нет `if (hasAvailableMove())`. Он получает готовый результат — `MovesAvailable` или `GameOver` — и выбирает соответствующий переход.

<a id="registering-commands-and-scene-services" class="translation-anchor" aria-hidden="true"></a>

## Регистрация команд и сервисов сцены

FSM ссылается на команды по имени, поэтому каждую команду нужно зарегистрировать в глобальном DI:

<a class="fsm-source-link" href="https://github.com/gamedevland/block-puzzle/blob/main/game/src/config/di.providers.ts" target="_blank" rel="noreferrer"><strong>di.providers.ts</strong> <span>↗</span></a>

```ts
protected override registerCommands(group: CommandsGroup): void {
  group
    .add('CheckBlockPuzzleMovesCommand', CheckBlockPuzzleMovesCommand)
    .add('FailBootPreloadCommand', FailBootPreloadCommand)
    .add('HandleBlockPuzzleGameOverCommand', HandleBlockPuzzleGameOverCommand)
    .add('OpenGameSceneCommand', OpenGameSceneCommand)
    .add('PreloadBootResourcesCommand', PreloadBootResourcesCommand)
    .add('PlaceBlockCommand', PlaceBlockCommand)
    .add('RestartBlockPuzzleCommand', RestartBlockPuzzleCommand)
    .add('StartBlockPuzzleSessionCommand', StartBlockPuzzleSessionCommand)
    .add('StartBlockPuzzleMusicCommand', StartBlockPuzzleMusicCommand);
}
```

Сервис игрового процесса регистрируется в области DI игровой сцены:

<a class="fsm-source-link" href="https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/configs/scene.di.ts" target="_blank" rel="noreferrer"><strong>scene.di.ts</strong> <span>↗</span></a>

```ts
protected override registerServices(services: SceneServiceTokenRegistry): void {
  services
    .add(BlockPuzzleServices.Gameplay)
    .add(BlockPuzzleServices.Audio)
    .add(DebugDiTokens.GameDevtoolsApiService);
}
```

Сервис в области сцены создаётся при входе в сцену и завершает работу вместе с ней. `BlockPuzzleGameplayService.onExit()` очищает текущую сессию:

<a class="fsm-source-link" href="https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/services/BlockPuzzleGameplayService.ts" target="_blank" rel="noreferrer"><strong>BlockPuzzleGameplayService.ts</strong> <span>↗</span></a>

```ts
protected override onExit(): void {
  this.session = undefined;
}
```

Команды получают сервисы сцены через `getSceneService(...)`. Они не создают их вручную и не используют глобальный singleton для состояния конкретной сцены.

<a id="what-this-structure-gives-me" class="translation-anchor" aria-hidden="true"></a>

## Что даёт эта структура

Такие границы делают разработку с AI предсказуемой. Я могу попросить агента добавить событие, переход и команду, сохранив правила в домене, а визуальное поведение — в компонентах. Агенту не нужно изобретать архитектуру.

Для меня FSM — исполняемая карта поведения сцены. Порядок команд остаётся предсказуемым, входные данные типизированы, а жизненным циклом управляет SDK.
