---
title: Cakes Slide Merge
description: A physics-based merge prototype where cakes are aimed, dropped, and combined through collisions into increasingly elaborate desserts.
status: prototype
releaseYear: 2026
genre: Physics merge puzzle
platforms:
  - Web
  - Desktop
  - Mobile
  - Tablet
technologies:
  - TypeScript
  - PixiJS 8
  - Matter.js
  - GSAP
  - Howler.js
  - GameDevLand Engine
  - Vite
roles:
  - Full-cycle game development
  - Architecture and engine
  - Game design and UI
iconImage: /assets/games/slide-merge/icon.webp
iconAlt: Cakes Slide Merge prototype with two small cakes merging into a larger decorated cake
playableUrl: https://gamedevland.github.io/cakes-merge/
orientation: adaptive
embedAspectRatio: 16 / 9
order: 7
draft: false
---

## About the game

Cakes Slide Merge is a physics-based merge prototype with eleven cake types, score progression, and a next-piece preview.

## How to play

Move the current cake horizontally and drop it into the tray. Two matching cakes merge into the next type, and the run ends when the settled pile crosses the limit line.

## Technical highlights

- Merge progression is separated from the physics simulation.
- Collision events coordinate replacement, scoring, effects, and audio.
