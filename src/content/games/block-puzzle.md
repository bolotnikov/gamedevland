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
  - Core mechanic and game architecture
  - SDK reference implementation
  - Responsive gameplay and UI
iconImage: /assets/games/block-puzzle/icon.webp
iconAlt: Block Puzzle prototype with an eight by eight board and three colorful shapes
playableUrl: https://gamedevland.github.io/block-puzzle/
articleUrl: /articles/ai-assisted-game-development
orientation: adaptive
embedAspectRatio: 16 / 9
order: 6
draft: false
---

## About the prototype

Block Puzzle is a compact implementation of the core Block Blast-style loop. It deliberately focuses on the mechanic itself rather than progression, monetization, or content systems, making it both a playable prototype and a clear reference project for the GameDevLand SDK.

## How it plays

The player receives three shapes and can place them on an 8 by 8 board in any order. A shape must fit entirely inside empty cells. Completing a horizontal row or vertical column clears that line, creates a short burn effect, and awards bonus points. Once all three shapes are used, a new set appears.

## Strategy and game over

Every placement changes the space available to the remaining shapes, so the challenge comes from preserving flexible areas while preparing simultaneous line clears. The run ends when none of the available shapes can fit. The prototype stores the best score and supports an immediate restart.

## Architecture goal

The project demonstrates the SDK flow used throughout my newer games: FSM to Command to Scene Service to Domain Model. Board rules, shape generation, slots, and scoring remain independent from rendering, while layout-driven components own drag input, placement previews, animations, particles, audio, and responsive presentation.

## Technical highlights

The game is written in TypeScript on top of `@gamedevland/engine` and rendered with PixiJS. GSAP-backed engine tweens drive placement and line-clear feedback, Howler.js provides audio, and Vite creates the production web build. The same project is used in my article about architecture for AI-assisted game development.
