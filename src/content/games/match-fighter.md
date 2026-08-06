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
  - Creator and developer
  - Game architecture and custom engine
  - Responsive gameplay and UI
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

Match Fighter combines a turn-based fighting duel with a match-3 board. Every successful move contributes to an attack, so board planning and combat timing are part of the same loop.

## How it plays

Players swap neighboring tiles to make matches and damage the opposing fighter. Matches charge energy, strong combinations create bombs, lightning, and color-based special tiles, and well-planned chains can produce an extra move. The fight ends when one health bar is depleted.

## Two ways to fight

The game supports a bot opponent with difficulty tied to campaign progress, plus a local two-player mode where both fighters share the same device. Solo victories move the player through a tower of ten opponents.

## My role

I created and developed the game end to end: match and booster rules, turn flow, bot decisions, combat progression, responsive layouts, effects, audio, platform integration, and the production web build for GameDistribution.

## Technical highlights

The gameplay is organized around a custom entity-component-system pipeline. TypeScript and PixiJS power the runtime and rendering, GSAP and Tween.js handle combat and interface animation, Howler.js provides audio, and Pixi filters and particle emitters build the impact effects. Webpack produces the platform-specific web bundles.
