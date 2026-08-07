---
title: "FSM in HTML5 Game Scenes"
description: "A practical guide to scene flow with FSM, commands, scene services, events, and domain models in an HTML5 game SDK."
pubDate: 2026-08-07
draft: false
tags:
  - html5
  - gamedev
  - typescript
  - fsm
  - architecture
featured: false
readingTime: "10 min read"
coverImage: "/assets/fsm-block-puzzle/cover.png"
coverAlt: "Block Puzzle board connected to a finite state machine diagram"
thumbnailImage: "/assets/fsm-block-puzzle/cover.png"
thumbnailAlt: "FSM flow used by the Block Puzzle game scene"
tableOfContents: true
category: technical
---

This article shows how I manage scene flow through an FSM in [`@gamedevland/engine`](https://www.npmjs.com/package/@gamedevland/engine), using startup, placement, move validation, game over, and restart from [Block Puzzle](https://github.com/gamedevland/block-puzzle).

<div class="fsm-link-strip">
  <a href="https://www.npmjs.com/package/@gamedevland/engine" target="_blank" rel="noreferrer">
    <span>SDK</span>
    <strong>@gamedevland/engine</strong>
  </a>
  <a href="https://gamedevland.github.io/block-puzzle/" target="_blank" rel="noreferrer">
    <span>Play</span>
    <strong>Block Puzzle demo</strong>
  </a>
  <a href="https://github.com/gamedevland/block-puzzle" target="_blank" rel="noreferrer">
    <span>Source</span>
    <strong>GitHub repository</strong>
  </a>
</div>

## What Is an FSM?

FSM stands for Finite State Machine.

An FSM stores the current state of a system and describes what should happen when a new event arrives.

In Block Puzzle, `PlacementRequested` moves the scene from `playing` to `resolvingPlacement`.

### FSM Elements

<div class="fsm-anatomy" aria-label="The four elements of a finite state machine">
  <div class="fsm-anatomy__item is-state">
    <span>01</span>
    <strong>States</strong>
    <small>The modes the scene can be in</small>
  </div>
  <div class="fsm-anatomy__item is-event">
    <span>02</span>
    <strong>Events</strong>
    <small>Facts and requests the scene reacts to</small>
  </div>
  <div class="fsm-anatomy__item is-transition">
    <span>03</span>
    <strong>Transitions</strong>
    <small>The allowed routes between states</small>
  </div>
  <div class="fsm-anatomy__item is-action">
    <span>04</span>
    <strong>Actions</strong>
    <small>Commands run during a transition or on entry</small>
  </div>
</div>

Finite means that the set of states is defined in advance. The FSM config becomes a complete map of allowed transitions.

## Why a Game Scene Needs an FSM

Without an FSM, scene state usually ends up spread across components and flags: whether a shape can be dragged, whether placement is being resolved, whether the game has ended, and whether restart is available.

Flags are not the problem; scattered transition rules are.

<div class="fsm-problem-comparison">
  <div class="fsm-problem-comparison__side is-scattered">
    <div class="fsm-comparison-status">
      <span class="fsm-comparison-status__icon" aria-hidden="true">×</span>
      <span class="fsm-kicker">Scattered control</span>
    </div>
    <strong>Flags across components</strong>
    <div class="fsm-fragment-cloud">
      <span>isDragging</span>
      <span>isResolving</span>
      <span>inputLocked</span>
      <span>gameEnded</span>
    </div>
    <small>The order has to be reconstructed from implementation details.</small>
  </div>
  <div class="fsm-problem-comparison__arrow" aria-hidden="true">→</div>
  <div class="fsm-problem-comparison__side is-defined">
    <div class="fsm-comparison-status">
      <span class="fsm-comparison-status__icon" aria-hidden="true">✓</span>
      <span class="fsm-kicker">Explicit flow</span>
    </div>
    <strong>One FSM configuration</strong>
    <div class="fsm-mini-route">
      <span>playing</span><i>→</i><span>resolving</span><i>→</i><span>checking</span>
    </div>
    <small>States, events, transitions, and commands are visible together.</small>
  </div>
</div>

The FSM manages flow. Game rules, layout mutations, and score calculation stay elsewhere.

## Connecting the FSM to a Scene

The Block Puzzle scene class is one line:

<a class="fsm-source-link" href="https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/GameScene.ts" target="_blank" rel="noreferrer"><strong>GameScene.ts</strong> <span>↗</span></a>

```ts
import { FsmDrivenScene } from '@gamedevland/engine/scenes';

export class GameScene extends FsmDrivenScene {}
```

I keep scene classes empty and distribute logic by responsibility:

<div class="fsm-responsibility-map">
  <div><span>Scene flow</span><strong>FSM</strong><small>states and transitions</small></div>
  <div><span>Use-case step</span><strong>Command</strong><small>one orchestration action</small></div>
  <div><span>Runtime state</span><strong>Scene Service</strong><small>session state and coordination</small></div>
  <div><span>Game rules</span><strong>Domain</strong><small>placement, board, score</small></div>
  <div><span>Node behavior</span><strong>Component</strong><small>persistent visual behavior</small></div>
  <div><span>Visual step</span><strong>Action</strong><small>one effect or animation</small></div>
</div>

In my SDK, `FsmDrivenScene` connects the scene lifecycle to its FSM. After layout, scene DI, and scene services are ready, it dispatches `SceneReady`. While the scene is active, it also dispatches `SceneTick`.

The FSM configuration is attached in the scene definition:

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

## Who Changes the State?

The FSM changes its own state. A component or service does not tell it which state to enter. They emit an event describing an intent or a result.

<div class="fsm-event-routing" aria-label="Event sources routed into the scene FSM">
  <div class="fsm-event-routing__sources">
    <div class="is-component"><span>Component</span><strong>Player intent</strong><small>PlacementRequested</small></div>
    <div class="is-service"><span>Scene Service</span><strong>Use-case result</strong><small>PlacementCompleted / Rejected</small></div>
    <div class="is-sdk"><span>SDK</span><strong>Scene lifecycle</strong><small>SceneReady / SceneTick</small></div>
  </div>
  <div class="fsm-event-routing__bus">
    <i aria-hidden="true"></i>
    <i aria-hidden="true"></i>
    <i aria-hidden="true"></i>
    <span>Event bus / lifecycle bridge</span>
  </div>
  <div class="fsm-event-routing__machine">
    <span>Current state + event</span>
    <strong>SceneFSM</strong>
    <small>find transition → run actions → set target → run entry</small>
  </div>
</div>

Events follow this order:

1. A component or service emits an event; the SDK dispatches lifecycle events directly.
2. The event bridge forwards game events to the active `SceneFSM`.
3. The FSM finds a transition and runs its `actions` sequentially.
4. It sets `target` and runs the new state's `entry` actions.

If an event has no transition in the current state, the FSM does nothing with it. `PlacementRequested`, for example, starts placement only while the scene is in `playing`.

### Why a Component Should Not Switch Scene State

`SceneFSM` does not expose a `switchState()` method. Components report intent; the FSM config selects the route.

<div class="fsm-switch-comparison" aria-label="Direct state switching compared with event-driven FSM transitions">
  <div class="fsm-switch-comparison__path is-direct">
    <div class="fsm-comparison-status">
      <span class="fsm-comparison-status__icon" aria-hidden="true">×</span>
      <span class="fsm-kicker">Direct state control</span>
    </div>
    <div class="fsm-switch-comparison__flow">
      <strong>Component</strong>
      <i aria-hidden="true">→</i>
      <code>switchState('resolvingPlacement')</code>
    </div>
    <small>The component knows the scene flow and selects the next state.</small>
  </div>
  <div class="fsm-switch-comparison__path is-event">
    <div class="fsm-comparison-status">
      <span class="fsm-comparison-status__icon" aria-hidden="true">✓</span>
      <span class="fsm-kicker">Event-driven transition</span>
    </div>
    <div class="fsm-switch-comparison__flow">
      <strong>Component</strong>
      <i aria-hidden="true">→</i>
      <code>PlacementRequested</code>
      <i aria-hidden="true">→</i>
      <strong>SceneFSM</strong>
    </div>
    <small>The component reports intent; the FSM decides whether and where to transition.</small>
  </div>
</div>

This keeps scene flow out of visual components:

- transitions stay in one config and can be state-dependent;
- transition actions, entry actions, and async commands keep their execution order;
- changing scene flow does not require rewriting components.

An event does not have to change state. If a transition has `actions` but no `target`, the FSM runs the commands and stays in the current state. Block Puzzle handles `RestartRequested` this way.

### Not Every State Belongs to the Scene FSM

A component can have its own local state. `BlockPuzzleDragComponent`, for example, stores the current phase of its drag interaction:

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
    <span>Local state</span>
    <strong>One node or component cares</strong>
    <small>Keep it inside the component.</small>
  </div>
  <div>
    <span>Scene state</span>
    <strong>Several systems must coordinate</strong>
    <small>Put it in the scene FSM and change it through events.</small>
  </div>
</div>

These phases affect only the drag component, so they do not belong in the scene FSM.

## The Scene State Map

Block Puzzle uses six states. This diagram is the complete scene flow implemented by the code in the following sections:

<div class="fsm-state-map" aria-label="Block Puzzle scene state map">
  <div class="fsm-state-map__rail">
    <div class="fsm-state-node is-system">
      <span>Initial</span>
      <strong>bootstrapping</strong>
      <small>wait for the scene</small>
    </div>
    <div class="fsm-state-edge">
      <strong>SceneReady</strong>
      <small>start session + music</small>
    </div>
    <div class="fsm-state-node is-system">
      <span>Setup</span>
      <strong>starting</strong>
      <small>create runtime session</small>
    </div>
    <div class="fsm-state-edge">
      <strong>SessionStarted</strong>
    </div>
    <div class="fsm-state-node is-active">
      <span>Player input</span>
      <strong>playing</strong>
      <small>accept placement</small>
    </div>
    <div class="fsm-state-edge">
      <strong>PlacementRequested</strong>
      <small>PlaceBlockCommand</small>
    </div>
    <div class="fsm-state-node is-work">
      <span>Use case</span>
      <strong>resolvingPlacement</strong>
      <small>apply the move</small>
    </div>
    <div class="fsm-state-edge">
      <strong>PlacementCompleted</strong>
    </div>
    <div class="fsm-state-node is-check">
      <span>Entry action</span>
      <strong>checkingMoves</strong>
      <small>find the next move</small>
    </div>
    <div class="fsm-state-edge">
      <strong>GameOver</strong>
    </div>
    <div class="fsm-state-node is-ended">
      <span>Result</span>
      <strong>ended</strong>
      <small>wait for restart</small>
    </div>
  </div>
  <div class="fsm-state-map__returns">
    <div><strong>PlacementRejected</strong><span>resolvingPlacement → playing</span></div>
    <div><strong>MovesAvailable</strong><span>checkingMoves → playing</span></div>
    <div><strong>RestartRequested</strong><span>playing / resolving / checking / ended</span></div>
  </div>
</div>

<div id="from-diagram-to-code" class="fsm-implementation-guide">
  <span class="fsm-kicker">From diagram to code</span>
  <p>The next three sections follow the map from top to bottom. The fourth shows how the flow is wired:</p>
  <div>
    <a href="#starting-the-game-session"><strong>Starting the Game Session</strong><small>bootstrapping → starting → playing</small></a>
    <a href="#placing-a-block"><strong>Placing a Block</strong><small>playing → resolvingPlacement</small></a>
    <a href="#entry-actions-and-branching"><strong>Entry Actions and Branching</strong><small>checkingMoves → playing / ended</small></a>
    <a href="#registering-commands-and-scene-services"><strong>Registration</strong><small>commands and scene services used by the flow</small></a>
  </div>
</div>

## Starting the Game Session

When the scene is ready, `FsmDrivenScene` dispatches `SceneReady`. The FSM runs two commands and targets `starting`:

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

Commands in `actions` run through `CommandBus` in strict order. If a command returns a `Promise`, the FSM waits before starting the next command.

After both commands finish, the FSM sets the state to `starting`. `SessionStarted`, emitted while the session was created, is already waiting in the queue and becomes the next transition to `playing`.

The command itself stays small. It resolves the scene service from DI and calls one use case:

<a class="fsm-source-link" href="https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/commands/StartBlockPuzzleSessionCommand.ts" target="_blank" rel="noreferrer"><strong>StartBlockPuzzleSessionCommand.ts</strong> <span>↗</span></a>

```ts
export class StartBlockPuzzleSessionCommand extends BaseCommand {
  override run(): void {
    this.getSceneService(BlockPuzzleServices.Gameplay).startSession();
  }
}
```

`BlockPuzzleGameplayService` creates the runtime session, emits initial data for visual components, and reports that startup has completed:

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

## Placing a Block

### 1. The Component Emits a Request

`BlockPuzzleDragComponent` owns input, preview, and visual movement. After the snap animation, it does not modify the board directly. It emits an event:

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

### 2. The FSM Selects the Scenario

The FSM handles the request in `playing`:

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

`PlacementRequested` is handled only in `playing`, so there is no separate `isPlacementLocked` flag. The FSM runs `PlaceBlockCommand`, changes the state to `resolvingPlacement`, and then handles the queued result event.

### 3. The Command Validates Its Input

`PlaceBlockCommand` extends `BaseTypedCommand`:

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

The payload schema lives with the other game event contracts:

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

The SDK decodes the event payload before `execute` runs. `InferDecoded` derives the TypeScript type from the same schema, so runtime validation and static typing cannot drift apart.

### 4. The Scene Service Updates the Session

`BlockPuzzleGameplayService` owns the current session:

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

The service coordinates one complete move: it reads the shape from its slot, calls board domain methods, clears completed lines, calculates score, and emits the result. The actual rules remain in focused domain classes.

Placement validity belongs to `BlockPuzzleBoard`:

<a class="fsm-source-link" href="https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/domain/BlockPuzzleBoard.ts" target="_blank" rel="noreferrer"><strong>BlockPuzzleBoard.ts</strong> <span>↗</span></a>

```ts
canPlace(shape: ShapeDefinition, anchor: CellCoordinate): boolean {
  return shape.cells.every((cell) => {
    const target = this.resolveTarget(anchor, cell);
    return this.isInside(target) && this.readCell(target) === null;
  });
}
```

Score calculation belongs to `BlockPuzzleScoreRules`:

<a class="fsm-source-link" href="https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/domain/BlockPuzzleScoreRules.ts" target="_blank" rel="noreferrer"><strong>BlockPuzzleScoreRules.ts</strong> <span>↗</span></a>

```ts
calculate(placedCellCount: number, clearedLineCount: number): number {
  const placementPoints = placedCellCount * this.config.pointsPerPlacedCell;
  const linePoints = clearedLineCount * this.config.pointsPerClearedLine;
  const multiLineBonus = clearedLineCount >= 2 ? this.config.multiLineBonus : 0;
  return placementPoints + linePoints + multiLineBonus;
}
```

The FSM manages execution order, the command delegates the use case, and the domain model owns the rules.

### 5. The Result Selects the Next State

The service emits `PlacementCompleted` or `PlacementRejected`, and the FSM declares both branches:

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

## Entry Actions and Branching

After every successful move, the game must check whether another placement is available. This should run each time the FSM enters `checkingMoves`, so it is declared as an `entry` action:

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

The command contains one step:

<a class="fsm-source-link" href="https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/commands/CheckBlockPuzzleMovesCommand.ts" target="_blank" rel="noreferrer"><strong>CheckBlockPuzzleMovesCommand.ts</strong> <span>↗</span></a>

```ts
export class CheckBlockPuzzleMovesCommand extends BaseCommand {
  override run(): void {
    this.getSceneService(BlockPuzzleServices.Gameplay).emitMoveAvailability();
  }
}
```

The service queries the domain model and emits the result:

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

There is no `if (hasAvailableMove())` inside the FSM. It receives a completed result - `MovesAvailable` or `GameOver` - and selects the corresponding transition.

## Registering Commands and Scene Services

The FSM refers to commands by name, so each command must be registered in global DI:

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

The gameplay service is registered in the game scene DI scope:

<a class="fsm-source-link" href="https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/configs/scene.di.ts" target="_blank" rel="noreferrer"><strong>scene.di.ts</strong> <span>↗</span></a>

```ts
protected override registerServices(services: SceneServiceTokenRegistry): void {
  services
    .add(BlockPuzzleServices.Gameplay)
    .add(BlockPuzzleServices.Audio)
    .add(DebugDiTokens.GameDevtoolsApiService);
}
```

A scene-scoped service is created when the scene enters and ends with that scene. `BlockPuzzleGameplayService.onExit()` clears the current session:

<a class="fsm-source-link" href="https://github.com/gamedevland/block-puzzle/blob/main/game/src/scenes/game/services/BlockPuzzleGameplayService.ts" target="_blank" rel="noreferrer"><strong>BlockPuzzleGameplayService.ts</strong> <span>↗</span></a>

```ts
protected override onExit(): void {
  this.session = undefined;
}
```

Commands resolve scene services through `getSceneService(...)`. They do not construct services manually or use a global singleton for scene-specific state.

## What This Structure Gives Me

These boundaries also make AI-assisted development predictable. I can ask an agent to add an event, transition, and command while keeping rules in the domain and visuals in components. The agent does not have to invent the architecture.

For me, the FSM is an executable map of scene behavior. Command order stays predictable, input data is typed, and the SDK controls the lifecycle.
