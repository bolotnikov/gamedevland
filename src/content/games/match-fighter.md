---
title: Match Fighter
description: A turn-based match-3 fighting game where every combo powers an attack, creates special tiles, and brings the next tower opponent closer.
status: released
releaseYear: 2025
genre: Match-3 fighting puzzle
platforms:
  - Web
  - Desktop
  - Mobile
  - Tablet
technologies:
  - TypeScript 4.7
  - PixiJS 7.4
  - GSAP 3
  - Tween.js
  - Howler.js
  - Pixi Particle Emitter
  - Pixi Filters
  - Webpack 5
  - Custom HTML5 game engine
roles:
  - Full-cycle game development
  - Architecture and engine
  - Game design and UI
iconImage: /assets/games/match-fighter/icon_512.jpg
iconAlt: Match Fighter game icon with two martial artists facing each other
logoImage: /assets/games/match-fighter/logo.webp
screenshots:
  - title: Choose your opponent
    landscapeSrc: /assets/games/match-fighter/screens/land/mode-select.webp
    landscapeAlt: Match Fighter mode selection with friend and bot options in landscape orientation
    portraitSrc: /assets/games/match-fighter/screens/port/mode-select.webp
    portraitAlt: Match Fighter mode selection with friend and bot options in portrait orientation
  - title: Climb the fighter tower
    landscapeSrc: /assets/games/match-fighter/screens/land/tower.webp
    landscapeAlt: Match Fighter opponent tower in landscape orientation
    portraitSrc: /assets/games/match-fighter/screens/port/tower.webp
    portraitAlt: Match Fighter opponent tower in portrait orientation
  - title: Match to attack
    landscapeSrc: /assets/games/match-fighter/screens/land/battle.webp
    landscapeAlt: Match Fighter turn-based match-3 battle in landscape orientation
    portraitSrc: /assets/games/match-fighter/screens/port/battle.webp
    portraitAlt: Match Fighter turn-based match-3 battle in portrait orientation
promoVideo:
  mp4: /assets/games/match-fighter/videos/land.mp4
  poster: /assets/games/match-fighter/screens/land/battle.webp
playableUrl: https://uncached-html5.gamedistribution.com/56b5cb9b86014d5f8bf726ca5c4ff06e/?correlator=1786017627542
orientation: adaptive
embedAspectRatio: 16 / 9
order: 5
draft: false
---

## About the game

Match Fighter combines turn-based combat with a match-3 board. It includes a ten-opponent solo tower and a shared-device two-player mode.

## How it plays

Swap neighboring tiles to make matches and attack the opponent. Larger combinations create special tiles, and the fight ends when one health bar reaches zero.

## Technical highlights

- A custom ECS engine provides entities, components, system management, and state/input processing pipelines.
- The game layer contains 41 systems and 25 components for the grid, swaps, matches, cascades, boosters, combat, turns, bot logic, and game-over flow.
- Bot and local two-player modes use the same turn and board systems; only move selection differs.
