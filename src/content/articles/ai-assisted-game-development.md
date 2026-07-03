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

- [@gamedevland/engine](https://www.npmjs.com/package/@gamedevland/engine)
- [@gamedevland/vite](https://www.npmjs.com/package/@gamedevland/vite)
- production game example: [Block Puzzle](https://gamedevland.github.io/block-puzzle/)

`Block Puzzle` is a complete game built on this SDK. It has a boot scene, preload, layout JSON, prefab JSON, FSM, commands, scene services, a domain model, components, drag-and-drop, score, game over, best score, sounds, and a production build.

## Why the SDK Exists

The SDK is not there to hide all game code.

Its job is to define the project rules:

- how the engine starts;
- how scenes are structured;
- how FSM works;
- where commands are executed;
- where scene runtime state lives;
- where game rules belong;
- how components are attached to layout nodes;
- how assets are loaded;
- how prefabs are created;
- how input is handled;
- how tweens are owned;
- how resize and screen state work.

After that, an agent does not have to invent the structure every time. It should work inside the existing boundaries.

In `Block Puzzle`, the scene class is almost empty:

```ts
export class GameScene extends FsmDrivenScene {}
```

That is a good state for a scene. The scene should not contain all gameplay logic.

The main flow looks like this:

```text
FSM -> Command -> Scene Service -> Domain Model
```

The visual layer goes separately:

```text
Layout JSON -> Node -> Component / Action
```

The split is:

- FSM describes scene states and transitions;
- command executes one use-case step;
- scene service stores the current scene runtime state;
- domain classes contain game rules;
- components/actions control node-local visual behavior;
- layout/prefab/config JSON stores authored values;
- SDK contains reusable infrastructure.

This matters for AI-assisted development. It is much easier for an agent to change a small class with one responsibility than to work with a large scene file that mixes game rules, PIXI objects, animations, input, and progress saving.

## Example: Placing a Block

Take the main action in `Block Puzzle`: the player drags a shape onto the board.

The bad version is to put everything into one component:

- listen to pointer events;
- calculate preview;
- validate placement;
- mutate the board;
- clear lines;
- calculate score;
- update UI;
- play effects;
- check game over.

This code can work, but it is hard to evolve.

In the current architecture, the responsibilities are split:

1. Drag component handles input and preview.
2. On drop, it emits `PlacementRequested`.
3. FSM moves the scene into `resolvingPlacement`.
4. `PlaceBlockCommand` decodes the payload and calls the gameplay service.
5. Gameplay service works with the board, slots, and score domain model.
6. Then the service emits `PlacementCompleted`, `LinesCleared`, `BoardChanged`, `BlocksChanged`, and `ScoreChanged`.
7. Visual components react to events and update the screen.

As a result, game rules do not depend on PIXI, and visual components do not calculate score.

This is not architecture for its own sake. This is how I keep the project in a state where a new task can be given to an agent with a clear scope.

## What Belongs in the SDK

I try to keep game code focused on the specific game.

Reusable things should move into the SDK:

- scene and component lifecycle;
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

For example, a component can start an async operation or a tween. When the scene changes, it is important not to continue working with a destroyed node. The SDK provides component lifecycle, task tracking, component scope version, and owned tween management for that.

Asset loading should not be a local set of `fetch` calls. The engine has an asset manager with bundles, retry, timeout, and limited parallel loading.

Resize should not be a set of `window.innerWidth` checks in different components. The engine has a screen manager and a single screen snapshot model.

FSM transitions run sequentially through the command bus. This makes execution order predictable.

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

- gameplay rule - domain;
- use-case step - command;
- scene runtime state - scene service;
- visual behavior - component/action;
- repeated visual structure - prefab;
- authored values - layout/config JSON;
- generic lifecycle/input/assets/tween problem - SDK.

This way AI helps write code faster without breaking the project structure.

## Why Not Everything Belongs in Game Code

You can keep the SDK minimal and solve everything inside a specific game. On the first project, that may look faster.

The problem appears on the next projects. Lifecycle guards, asset helpers, responsive helpers, prefab helpers, and debug hooks start getting copied. After a while, it becomes unclear which version is the correct one.

So the boundary is:

- game code contains rules of the specific game;
- SDK contains reusable infrastructure;
- layout/config contains authored values;
- domain code does not know about the renderer;
- components do not calculate game rules;
- scene services do not draw sprites;
- engine does not know what block puzzle is.

This boundary helps both the developer and the AI agent.

## Next Topics

Next, I want to cover the individual parts and practical details of working with my SDK on real projects:

- adaptive and responsive layout;
- smart resource loading;
- FSM in game scenes;
- components and actions;
- safe tweens and async operations;
- shared ticker and runtime systems;
- debug services for DevTools;
- logging and diagnostics with AI;
- workflow with Codex, VS Code, Figma, and Photopea;
- gameplay iterations using `Block Puzzle` as an example;
- and so on.

The main idea: AI is useful in game development when the project has clear boundaries.

Without boundaries, AI accelerates chaos. With boundaries, AI accelerates development.
