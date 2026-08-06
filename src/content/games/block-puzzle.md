---
title: Block Puzzle
description: A focused Block Blast-style mechanics prototype built around drag-and-drop placement, line clearing, scoring, and readable game architecture.
status: prototype
genre: Block puzzle
platforms:
  - Web
  - Desktop
  - Mobile
  - Tablet
technologies:
  - TypeScript 5.9
  - PixiJS 8.16
  - GameDevLand Engine 0.0.5
  - GSAP
  - Howler.js
  - Particle effects
  - Vite 8
roles:
  - Full-cycle game development
  - Architecture and engine
  - Game design and UI
iconImage: /assets/games/block-puzzle/icon.webp
iconAlt: Block Puzzle prototype with an eight by eight board and three colorful shapes
playableUrl: https://gamedevland.github.io/block-puzzle/
articleUrl: /articles/ai-assisted-game-development
orientation: adaptive
embedAspectRatio: 16 / 9
order: 6
draft: false
---

## About the game

Block Puzzle is a mechanics prototype focused on the core Block Blast-style loop and used as a reference project for the GameDevLand SDK.

## How it plays

Place three available shapes on an 8×8 board. Completed rows and columns clear for points; a new set appears after all three shapes are used, and the run ends when no shape fits.

## Technical highlights

- Gameplay flow follows FSM → Command → Scene Service → Domain Model.
- Board rules and scoring are independent from rendering and input.
