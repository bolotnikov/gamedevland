---
title: "How I Build HTML5 Games with AI Agents and My Own SDK"
description: "A practical approach to AI-assisted HTML5 game development: architecture, SDK contracts, agents, and project control."
pubDate: 2026-07-03
draft: false
tags:
  - html5
  - gamedev
  - ai
  - typescript
  - architecture
featured: false
readingTime: "7 min read"
coverImage: "/assets/intro/cover.png"
coverAlt: "AI-assisted HTML5 game development cover"
thumbnailImage: "/assets/intro/icon.png"
thumbnailAlt: "AI-assisted HTML5 game development icon"
category: workshop
---

AI helps a lot with writing code, but AI alone is not enough for game development.

If you ask an agent to "make a game", it can quickly produce a prototype. The problems usually start later: when you need to add mechanics, fix bugs, change layout, optimize loading, support resize, audio, animations, and scene transitions.

Games have a lot of state and side effects. Without architecture, AI starts generating different solutions for the same types of problems.

My approach is simple: AI agents write code, but they work inside a predefined architecture.

That is why I built my own HTML5 game SDK:

- sdk npm packages: <a href="https://www.npmjs.com/package/@gamedevland/engine" target="_blank" rel="noreferrer">@gamedevland/engine</a> and <a href="https://www.npmjs.com/package/@gamedevland/vite" target="_blank" rel="noreferrer">@gamedevland/vite</a>
- game example: <a href="https://gamedevland.github.io/block-puzzle/" target="_blank" rel="noreferrer">Block Puzzle</a>
- game repository: <a href="https://github.com/gamedevland/block-puzzle" target="_blank" rel="noreferrer">gamedevland/block-puzzle</a>

<a href="https://github.com/gamedevland/block-puzzle" target="_blank" rel="noreferrer">Block Puzzle</a> is a complete game built on this SDK. It has a boot scene, preload, layout JSON, prefab JSON, FSM, commands, scene services, a domain model, components, drag-and-drop, score, game over, best score, sounds, and a production build.

## Why the SDK Exists

The SDK is not there to hide all game code.

Its job is to define the project rules:

- scene flow: lifecycle, FSM, commands, scene services, domain model;
- visual composition: layout nodes, components, actions, prefabs;
- runtime systems: assets, input, tweens, audio, screen state, persistence;
- boundaries: what belongs to the game and what belongs to the SDK.

After that, an agent does not have to invent the structure every time. It should work inside the existing boundaries.

In <a href="https://github.com/gamedevland/block-puzzle" target="_blank" rel="noreferrer">Block Puzzle</a>, the scene class is almost empty:

```ts
export class GameScene extends FsmDrivenScene {}
```

That is a good state for a scene. The scene should not contain all gameplay logic.

The two main flows are separated:

<div class="article-layer-flows">
  <div class="article-layer-flow">
    <span class="article-layer-flow__label">Scene flow</span>
    <div class="article-layer-flow__steps">
      <strong>FSM</strong>
      <strong>Command</strong>
      <strong>Scene Service</strong>
      <strong>Domain Model</strong>
    </div>
  </div>
  <div class="article-layer-flow">
    <span class="article-layer-flow__label">Visual layer</span>
    <div class="article-layer-flow__steps">
      <strong>Layout JSON</strong>
      <strong>Node</strong>
      <strong>Component / Action</strong>
    </div>
  </div>
</div>

This matters for AI-assisted development. It is much easier for an agent to change a small class with one responsibility than to work with a large scene file that mixes game rules, PIXI objects, animations, input, and progress saving.

## Example: Placing a Block

Take the main action in <a href="https://github.com/gamedevland/block-puzzle" target="_blank" rel="noreferrer">Block Puzzle</a>: the player drags a shape onto the board.

### The Problem

The bad version is to put everything into one component.

<div class="article-problem-list">
  <h3>God component</h3>
  <ul>
    <li>pointer events</li>
    <li>placement preview</li>
    <li>board mutation</li>
    <li>line clearing</li>
    <li>score calculation</li>
    <li>UI update</li>
    <li>effects</li>
    <li>game over check</li>
  </ul>
</div>

This code can work, but it is hard to evolve.

### The Actual Flow

In the current architecture, the simplified flow is:

<div class="article-flow-diagram">
  <div class="article-flow-step">
    <span>1</span>
    <strong>Drag component</strong>
    <small>handles input and preview, then emits PlacementRequested</small>
  </div>
  <div class="article-flow-step">
    <span>2</span>
    <strong>FSM + command</strong>
    <small>moves to resolvingPlacement and runs PlaceBlockCommand</small>
  </div>
  <div class="article-flow-step">
    <span>3</span>
    <strong>Gameplay service</strong>
    <small>validates placement and updates session state</small>
  </div>
  <div class="article-flow-step">
    <span>4</span>
    <strong>Board / Slots / Score</strong>
    <small>domain model applies the game rules</small>
  </div>
  <div class="article-flow-step">
    <span>5</span>
    <strong>Events + visual components</strong>
    <small>PlacementCompleted, BoardChanged, BlocksChanged, ScoreChanged update the screen</small>
  </div>
</div>

As a result, game rules do not depend on PIXI, and visual components do not calculate score.

This is not architecture for its own sake. This is how I keep the project in a state where a new task can be given to an agent with a clear scope.

### Code Shape

The top-level code stays small. The FSM decides when placement should be resolved:

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

The command is only a boundary between the FSM event and the scene service:

```ts
export class PlaceBlockCommand extends BaseTypedCommand<PlaceBlockCommandPayload> {
  protected override readonly inputDecoder =
    BlockPuzzleEventSchemas.PlacementRequest;

  protected override execute(payload: PlaceBlockCommandPayload): void {
    this.getSceneService(BlockPuzzleServices.Gameplay).place(payload);
  }
}
```

The service owns the session update and delegates the rules to the domain model:

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

## What Belongs in the SDK

I try to keep game code focused on the specific game.

Reusable infrastructure should move into the SDK when it appears across projects.

<div class="article-sdk-grid">
  <div class="article-sdk-card">
    <h3>Orchestration</h3>
    <ul>
      <li>scene lifecycle</li>
      <li>FSM</li>
      <li>command bus</li>
      <li>event bus</li>
      <li>scene-scoped DI</li>
    </ul>
  </div>
  <div class="article-sdk-card">
    <h3>Data and assets</h3>
    <ul>
      <li>typed config decoding</li>
      <li>asset manifest</li>
      <li>asset bundles</li>
      <li>prefab creation</li>
      <li>persistent storage</li>
    </ul>
  </div>
  <div class="article-sdk-card">
    <h3>Runtime systems</h3>
    <ul>
      <li>input routing</li>
      <li>screen manager</li>
      <li>audio</li>
      <li>tweens</li>
      <li>runtime scheduler</li>
    </ul>
  </div>
  <div class="article-sdk-card">
    <h3>Safety and debugging</h3>
    <ul>
      <li>component lifecycle</li>
      <li>async task tracking</li>
      <li>owned tween cleanup</li>
      <li>fail-fast diagnostics</li>
      <li>debug hooks</li>
    </ul>
  </div>
</div>

## How I Work with AI Agents

My usual workflow:

1. Describe the task and limit the scope.
2. Let the agent read local project rules and the current implementation.
3. Make the change inside the existing architecture.
4. If game code starts getting repeated helpers, check whether they should become part of the SDK.
5. Run `typecheck` and `lint` after the change.
6. Review the result like a normal code review.

The main rule: the agent should not replace the project architecture.

When I add a new feature, I first choose where it belongs:

<div class="article-routing-map">
  <div class="article-routing-map__header">
    <span>Problem</span>
    <span>Where it belongs</span>
  </div>
  <div class="article-routing-map__row">
    <span>gameplay rule</span>
    <strong>domain</strong>
  </div>
  <div class="article-routing-map__row">
    <span>use-case step</span>
    <strong>command</strong>
  </div>
  <div class="article-routing-map__row">
    <span>scene runtime state</span>
    <strong>scene service</strong>
  </div>
  <div class="article-routing-map__row">
    <span>visual behavior</span>
    <strong>component / action</strong>
  </div>
  <div class="article-routing-map__row">
    <span>repeated visual structure</span>
    <strong>prefab</strong>
  </div>
  <div class="article-routing-map__row">
    <span>authored values</span>
    <strong>layout / config JSON</strong>
  </div>
  <div class="article-routing-map__row is-sdk">
    <span>generic lifecycle / input / assets / tween problem</span>
    <strong>SDK</strong>
  </div>
</div>

This way AI helps write code faster without breaking the project structure.

## Why Not Everything Belongs in Game Code

You can keep the SDK minimal and solve everything inside a specific game. On the first project, that may look faster.

The problem appears on the next projects. Lifecycle guards, asset helpers, responsive helpers, prefab helpers, and debug hooks start getting copied. After a while, it becomes unclear which version is the correct one.

So I keep the same boundary from the workflow above: game-specific rules stay in game code, reusable infrastructure moves to the SDK, and authored presentation data stays in layout/config files. This boundary helps both the developer and the AI agent.

## Next Topics

Next, I want to cover the individual parts and practical details of working with my SDK on real projects:

- adaptive and responsive layout;
- smart resource loading;
- FSM in game scenes;
- components and actions;
- safe tweens and async operations;
- debug services for DevTools;
- workflow with Codex, VS Code, Figma, and Photopea;
- gameplay iterations using <a href="https://github.com/gamedevland/block-puzzle" target="_blank" rel="noreferrer">Block Puzzle</a> as an example;
- and other similar practical topics.

The main idea: AI is useful in game development when the project has clear boundaries.

Without boundaries, AI accelerates chaos. With boundaries, AI accelerates development.
