# FSM в игровых сценах на примере Block Puzzle

В этой статье посмотрим, как управлять игровой сценой через FSM в `@gamedevland/engine`.

В качестве примера возьмем [Block Puzzle](https://github.com/gamedevland/block-puzzle). В игре есть запуск сессии, размещение фигуры, проверка доступных ходов, game over и перезапуск. FSM связывает эти сценарии в один предсказуемый flow.

## Что такое FSM

FSM расшифровывается как Finite State Machine — конечный автомат.

FSM хранит текущее состояние системы и описывает, что должно произойти при получении нового события.

Например, игровая сцена находится в состоянии `playing`. Игрок размещает фигуру, сцена получает событие `PlacementRequested` и переходит в `resolvingPlacement`. После успешного хода событие `PlacementCompleted` переводит ее в `checkingMoves`.

В FSM есть четыре основных элемента:

- states — возможные состояния системы;
- events — события, на которые она реагирует;
- transitions — разрешенные переходы между состояниями;
- actions — действия, выполняемые во время перехода или при входе в состояние.

Слово «конечный» означает, что все возможные состояния мы определяем заранее. В результате получаем понятную карту поведения сцены: какие события она сейчас может обработать, что они запустят и куда сцена перейдет дальше.

## Зачем сцене FSM

Без FSM состояние сцены обычно хранится в разных компонентах и флагах: можно ли сейчас перетаскивать фигуру, выполняется ли placement, закончилась ли игра, можно ли запустить restart.

Сами по себе флаги не являются проблемой. Сложность начинается, когда правила переходов между ними нигде не описаны целиком. Один компонент блокирует input, другой запускает анимацию, третий меняет данные доски. При добавлении новой механики приходится разбираться, в каком порядке срабатывает код в разных файлах.

FSM собирает этот порядок в одном месте. По ее конфигурации видно состояния сцены, доступные события, переходы и команды.

Важно не переносить в FSM все подряд. Она не должна содержать правила игры, изменять layout или считать score. Ее задача — только управлять flow.

## Подключение FSM к сцене

Начнем с самой сцены. В Block Puzzle она состоит из одной строки:

[Исходный файл: `GameScene.ts`](https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/GameScene.ts)

```ts
import { FsmDrivenScene } from '@gamedevland/engine/scenes';

export class GameScene extends FsmDrivenScene {}
```

Я специально стараюсь оставлять класс сцены пустым. Если начать добавлять сюда gameplay, input, работу с layout и обработку событий, сцена быстро станет местом, от которого зависит почти вся игра.

Вместо этого я распределяю код по его назначению:

- FSM описывает состояния и переходы;
- commands запускают отдельные шаги игрового flow;
- scene services хранят runtime-состояние сцены и координируют use cases;
- domain classes содержат правила игры;
- element components отвечают за постоянное поведение конкретных nodes;
- element actions выполняют отдельные визуальные действия и эффекты.

В самой сцене остается только связь с lifecycle SDK. Благодаря этому ее не приходится изменять при добавлении новой игровой механики, а каждый участок логики находится в своем месте.

В моем SDK класс `FsmDrivenScene` связывает lifecycle сцены с FSM. После подготовки layout, scene DI и scene services он отправляет событие `SceneReady`. Во время работы сцены через него также приходит `SceneTick`.

Конфигурация FSM подключается в определении сцены:

[Исходный файл: `scene.config.ts`](https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/configs/scene.config.ts)

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

## Состояния игровой сцены

В Block Puzzle используются шесть состояний:

| State | Что происходит |
| --- | --- |
| `bootstrapping` | FSM создана и ждет готовности сцены |
| `starting` | создается игровая сессия и запускается музыка |
| `playing` | игрок может размещать фигуры |
| `resolvingPlacement` | обрабатывается запрос на размещение фигуры |
| `checkingMoves` | проверяется наличие следующего хода |
| `ended` | игра закончена, доступен restart |

Начальное состояние задается в `GameFsm.config` через `initial: 'bootstrapping'`.

Уже по одному этому файлу можно увидеть все состояния сцены и разрешенные переходы между ними.

## Кто переключает состояния

Состояние переключает сама FSM. Component или service не указывают ей, в какой state нужно перейти. Они только отправляют событие о том, что произошло.

В Block Puzzle события приходят из трех источников:

| Кто отправляет | О чем сообщает | Примеры |
| --- | --- | --- |
| Component | действие игрока или результат визуального шага | `PlacementRequested`, `RestartRequested` |
| Scene service | результат игрового use case | `PlacementCompleted`, `PlacementRejected`, `MovesAvailable`, `GameOver` |
| SDK | событие lifecycle сцены | `SceneReady`, `SceneTick` |

Игровые события проходят так:

1. Component или service отправляет событие через event bus.
2. Event bridge движка передает событие в активную `SceneFSM`.
3. FSM берет свое текущее состояние и ищет для события transition в конфигурации.
4. Если transition найден, FSM последовательно выполняет команды из `actions`.
5. После завершения команд FSM устанавливает `target` новым состоянием.
6. Затем выполняются `entry` actions нового состояния.

Lifecycle-события `SceneReady` и `SceneTick` класс `FsmDrivenScene` отправляет в FSM напрямую. После этого они обрабатываются по тем же правилам и через ту же очередь.

Если transition для текущего состояния не описан, FSM просто не реагирует на событие. Например, `PlacementRequested` запускает размещение только в `playing`.

### Почему не стоит переключать state из component

В текущем API `SceneFSM` нет метода `switchState()`. Component отправляет событие через `this.node.events.emit(...)`, а следующий state выбирает FSM по своей конфигурации.

Например, drag-компонент отправляет `PlacementRequested`, но не знает, куда должна перейти сцена. После обработки хода scene service отправляет результат — `PlacementCompleted` или `PlacementRejected`. FSM выбирает нужный transition для каждого события.

Так scene flow не попадает внутрь visual components:

- все переходы остаются в одном config-файле;
- одно событие можно по-разному обработать в разных states;
- transition actions, `entry` actions и async-команды выполняются в правильном порядке;
- при изменении flow не приходится переписывать components.

Событие при этом не обязано менять state. Если у transition есть `actions`, но нет `target`, FSM выполнит команды и останется в текущем состоянии. Так в Block Puzzle обрабатывается `RestartRequested`.

### Не каждое состояние относится к FSM сцены

У component может быть свое локальное состояние. Например, `BlockPuzzleDragComponent` хранит текущую фазу drag-сценария:

[Исходный файл: `BlockPuzzleDragComponent.ts`](https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/components/BlockPuzzleDragComponent.ts)

```ts
type DragPhase = 'dragging' | 'snapping' | 'returning';

interface DragSession extends DragSelection {
  readonly shape: ShapeDefinition;
  preview: PlacementPreview;
  phase: DragPhase;
}
```

Эти фазы нужны только одному component: он перемещает фигуру, делает snap или возвращает ее в слот. Добавлять для них отдельные states в FSM сцены не нужно.

Я использую простое правило: если состояние относится только к поведению одного node или component, оно остается внутри component. Если состояние меняет общий flow сцены и должно координировать commands, services или несколько visual components, оно относится к scene FSM и переключается через события.

## Запуск игровой сессии

Теперь посмотрим, как запускается игра. После подготовки сцены `FsmDrivenScene` отправляет `SceneReady`. FSM находит переход в `starting` и последовательно выполняет две команды:

[Исходный файл: `fsm.config.ts`](https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/configs/fsm.config.ts)

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

Команды в `actions` выполняются через `CommandBus` строго по порядку. Если команда возвращает `Promise`, FSM ждет ее завершения перед запуском следующей команды.

После выполнения обеих команд FSM устанавливает состояние `starting`. Событие `SessionStarted`, отправленное во время запуска сессии, к этому моменту уже находится в очереди и следующим переходом переводит сцену в `playing`.

Команда запуска сессии остается простой. Она получает scene service из DI и вызывает нужный use case:

[Исходный файл: `StartBlockPuzzleSessionCommand.ts`](https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/commands/StartBlockPuzzleSessionCommand.ts)

```ts
export class StartBlockPuzzleSessionCommand extends BaseCommand {
  override run(): void {
    this.getSceneService(BlockPuzzleServices.Gameplay).startSession();
  }
}
```

`BlockPuzzleGameplayService` создает runtime-состояние сессии, отправляет начальные данные визуальным компонентам и сообщает FSM, что запуск завершен:

[Исходный файл: `BlockPuzzleGameplayService.ts`](https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/services/BlockPuzzleGameplayService.ts)

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

После `SessionStarted` FSM переходит из `starting` в `playing`. Теперь сцена готова принимать placement-запросы.

## Размещение фигуры

Основной flow игры выглядит так:

[Связанные файлы: `BlockPuzzleDragComponent.ts`](https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/components/BlockPuzzleDragComponent.ts), [`fsm.config.ts`](https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/configs/fsm.config.ts), [`BlockPuzzleGameplayService.ts`](https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/services/BlockPuzzleGameplayService.ts)

```text
Drag component
  -> PlacementRequested
  -> FSM находит transition в resolvingPlacement
  -> PlaceBlockCommand
  -> BlockPuzzleGameplayService
  -> Board / Slots / Score
  -> PlacementCompleted или PlacementRejected
  -> FSM завершает текущий transition
  -> следующее состояние FSM
```

Теперь пройдем по этому flow шаг за шагом.

### 1. Компонент отправляет запрос

`BlockPuzzleDragComponent` отвечает за input, preview и визуальное перемещение фигуры. После snap-анимации он не изменяет доску напрямую, а отправляет событие:

[Исходный файл: `BlockPuzzleDragComponent.ts`](https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/components/BlockPuzzleDragComponent.ts)

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

На этом работа drag-компонента заканчивается. Он сообщает, что хочет сделать игрок, но сам не меняет игровое состояние.

### 2. FSM выбирает сценарий

Событие попадает в активную FSM через event bridge движка:

[Исходный файл: `fsm.config.ts`](https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/configs/fsm.config.ts)

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

`PlacementRequested` обрабатывается только в состоянии `playing`. В состояниях `starting`, `checkingMoves` и `ended` такого transition нет, поэтому событие не запускает placement повторно.

Отдельный флаг `isPlacementLocked` здесь не нужен: возможность выполнить операцию уже определяется текущим состоянием сцены.

Сначала FSM запускает `PlaceBlockCommand`, затем устанавливает состояние `resolvingPlacement`. Событие с результатом placement обрабатывается следующим в очереди.

### 3. Command проверяет входные данные

`PlaceBlockCommand` наследуется от `BaseTypedCommand`:

[Исходный файл: `PlaceBlockCommand.ts`](https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/commands/PlaceBlockCommand.ts)

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

Схема payload находится рядом с игровыми event-контрактами:

[Исходный файл: `event.schemas.ts`](https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/configs/event.schemas.ts)

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

SDK извлекает payload из FSM event и декодирует его до вызова `execute`. Тип `PlaceBlockCommandPayload` выводится из той же схемы через `InferDecoded`, поэтому runtime validation и TypeScript-тип не расходятся.

В результате команда остается короткой: она принимает проверенные данные и передает их в scene service.

### 4. Scene service обновляет сессию

`BlockPuzzleGameplayService` хранит текущую сессию. Ее контракт в реальном коде выглядит так:

[Исходный файл: `BlockPuzzleGameplayService.ts`](https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/services/BlockPuzzleGameplayService.ts)

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

Сам service наследуется от `BaseSceneService` и хранит `BlockPuzzleSession` в приватном поле `session`.

Service собирает один ход целиком: получает фигуру из слота, вызывает domain-методы доски, очищает линии, рассчитывает score и отправляет результат. Сами правила при этом остаются в отдельных domain-классах.

Например, возможность placement определяет `BlockPuzzleBoard`:

[Исходный файл: `BlockPuzzleBoard.ts`](https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/domain/BlockPuzzleBoard.ts)

```ts
canPlace(shape: ShapeDefinition, anchor: CellCoordinate): boolean {
  return shape.cells.every((cell) => {
    const target = this.resolveTarget(anchor, cell);
    return this.isInside(target) && this.readCell(target) === null;
  });
}
```

А расчет очков выполняет `BlockPuzzleScoreRules`:

[Исходный файл: `BlockPuzzleScoreRules.ts`](https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/domain/BlockPuzzleScoreRules.ts)

```ts
calculate(placedCellCount: number, clearedLineCount: number): number {
  const placementPoints = placedCellCount * this.config.pointsPerPlacedCell;
  const linePoints = clearedLineCount * this.config.pointsPerClearedLine;
  const multiLineBonus = clearedLineCount >= 2 ? this.config.multiLineBonus : 0;
  return placementPoints + linePoints + multiLineBonus;
}
```

FSM не нужно знать, какие клетки заняты и сколько очков начислять. Команде это тоже не нужно. Они управляют порядком выполнения, а правила остаются в domain model.

### 5. Результат возвращает FSM в нужное состояние

После обработки service отправляет одно из двух событий:

- `PlacementRejected`, если фигуру нельзя разместить;
- `PlacementCompleted`, если ход применен.

FSM описывает обе ветки:

[Исходный файл: `fsm.config.ts`](https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/configs/fsm.config.ts)

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

Rejected placement возвращает сцену в `playing`. Успешный placement переводит ее в `checkingMoves`.

## Entry actions

После успешного хода нам каждый раз нужно проверить, остались ли доступные размещения. Для этого в состоянии `checkingMoves` используется `entry`:

[Исходный файл: `fsm.config.ts`](https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/configs/fsm.config.ts)

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

Команда снова содержит только один шаг:

[Исходный файл: `CheckBlockPuzzleMovesCommand.ts`](https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/commands/CheckBlockPuzzleMovesCommand.ts)

```ts
export class CheckBlockPuzzleMovesCommand extends BaseCommand {
  override run(): void {
    this.getSceneService(BlockPuzzleServices.Gameplay).emitMoveAvailability();
  }
}
```

Service проверяет domain model и отправляет результат:

[Исходный файл: `BlockPuzzleGameplayService.ts`](https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/services/BlockPuzzleGameplayService.ts)

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

Обратите внимание: условия `if (hasAvailableMove())` внутри FSM нет. Она получает только готовый результат: `MovesAvailable` или `GameOver`.

## Регистрация команд и scene services

Осталось связать все части через DI. FSM ссылается на команды по имени, поэтому каждую команду нужно зарегистрировать в global DI:

[Исходный файл: `di.providers.ts`](https://github.com/gamedevland/block-puzzle/blob/main/game/src/config/di.providers.ts)

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

Gameplay service регистрируется в DI конкретной сцены:

[Исходный файл: `scene.di.ts`](https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/configs/scene.di.ts)

```ts
protected override registerServices(services: SceneServiceTokenRegistry): void {
  services
    .add(BlockPuzzleServices.Gameplay)
    .add(BlockPuzzleServices.Audio)
    .add(DebugDiTokens.GameDevtoolsApiService);
}
```

Scene-scoped service создается при входе в сцену и завершается вместе с ней. В Block Puzzle метод `onExit()` очищает ссылку на текущую сессию:

[Исходный файл: `BlockPuzzleGameplayService.ts`](https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/services/BlockPuzzleGameplayService.ts)

```ts
protected override onExit(): void {
  this.session = undefined;
}
```

Команда получает service через `getSceneService(...)`. Она не создает его вручную и не использует глобальный singleton для состояния конкретной игровой сцены.

## Как добавить новый сценарий

На практике при добавлении нового flow я сначала определяю его границы.

Для новой игровой операции я прохожу по следующим вопросам:

1. В каком состоянии операция разрешена.
2. Какое событие запускает операцию.
3. Нужен ли отдельный промежуточный state, пока операция выполняется.
4. Какая команда запускает use case.
5. Какие данные должна декодировать команда.
6. Какой scene service изменяет runtime-состояние.
7. Какие правила нужно вынести в domain model.
8. Какими событиями service сообщает результат.
9. Какие компоненты реагируют на результат визуально.

После этого уже понятно, где именно менять код:

| Задача | Где менять код |
| --- | --- |
| Добавить новый этап flow | FSM state и transitions |
| Запустить use case | Command |
| Проверить event payload | `SchemaDecoder` и `BaseTypedCommand` |
| Изменить состояние сессии | Scene service |
| Добавить игровое правило | Domain class |
| Обновить node, animation или input | Component / Action |
| Зарегистрировать команду | Global DI |
| Зарегистрировать scene service | Scene DI |

Если для операции не нужен отдельный режим сцены, новый state добавлять не нужно. В Block Puzzle `RestartRequested` запускает команду без `target`: FSM остается в текущем состоянии, а команда заменяет сцену через scene manager.

[Исходный файл: `RestartBlockPuzzleCommand.ts`](https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/commands/RestartBlockPuzzleCommand.ts)

```ts
export class RestartBlockPuzzleCommand extends BaseCommand {
  override async run(): Promise<void> {
    await this.engine.scenes.start('game');
  }
}
```

FSM должна отражать реальные режимы сцены, а не превращаться в список каждого клика и каждой анимации.

## Что дает такая схема

По `GameFsm.config` я могу быстро понять полный lifecycle игровой сцены, а по имени команды найти конкретный use case. Scene service показывает, где хранится состояние сессии, domain classes содержат правила без зависимости от layout и PIXI, а компоненты отвечают за input и отображение.

Такой подход удобен и при ручной разработке, и при работе с AI-агентом. Я могу сразу ограничить задачу: добавить event, transition и command, не менять domain, а визуальную реакцию оставить в component. Агенту не приходится заново придумывать архитектуру проекта.

Для меня FSM здесь — это прежде всего исполняемая карта поведения сцены. Порядок команд остается предсказуемым, входные данные типизированы, а lifecycle контролирует SDK.
