---
title: Cakes Slide Merge
description: A physics-based merge prototype where cakes are aimed, dropped, and combined through collisions into increasingly elaborate desserts.
status: prototype
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
  - Core mechanic and game architecture
  - Physics tuning and merge progression
  - Responsive gameplay and UI
iconImage: /assets/games/slide-merge/icon.webp
iconAlt: Cakes Slide Merge prototype with two small cakes merging into a larger decorated cake
playableUrl: https://gamedevland.github.io/cakes-merge/
orientation: adaptive
embedAspectRatio: 16 / 9
order: 7
draft: false
---

## About the prototype

Cakes Slide Merge is a working mechanics prototype that combines aiming, physics, and merge progression. The goal is to create increasingly valuable cakes while keeping a crowded serving tray under control.

## How it plays

The player moves the current cake horizontally along the top of the play area and releases it into the physics container. Gravity, collisions, friction, and rebound determine where it settles. When two cakes of the same type touch, they collapse into the next cake in the progression and add to the score.

## Progression and pressure

The prototype contains eleven cake types and introduces new pieces from a smaller starting pool. A next-piece preview supports short-term planning, while each merge opens space and moves the player toward higher-value desserts. Reaching the maximum type awards an additional score bonus. The run ends when the pile settles above the fail line.

## Architecture goal

The mechanic separates deterministic progression rules from the physical simulation. Session state owns current and next pieces, score, best score, and game status; Matter.js owns runtime movement and collision detection; events coordinate merge resolution, visual replacement, effects, and sound.

## Technical highlights

The production bundle is built around the GameDevLand engine with PixiJS rendering, Matter.js physics, GSAP animation, Howler.js audio, responsive portrait and landscape layouts, persisted best score, and a Vite web build. Merge feedback combines collapsing items, a replacement cake, glow, particles, and synchronized audio.
