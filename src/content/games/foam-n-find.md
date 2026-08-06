---
title: Foam and Find
description: A colorful hidden-object game about exploring busy rooms, spotting every item on the list, and protecting a limited supply of lives.
status: released
releaseYear: 2025
genre: Hidden object puzzle
platforms:
  - Web
  - Desktop
  - Mobile
  - Tablet
technologies:
  - TypeScript 4.7
  - PixiJS 7.4
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
iconImage: /assets/games/foam-n-find/icon.webp
iconAlt: Foam and Find game icon with a young detective holding a magnifying glass
coverImage: /assets/games/foam-n-find/cover.webp
coverAlt: Foam and Find cover featuring a young detective and the game logo
screenshots:
  - title: Search the attic
    landscapeSrc: /assets/games/foam-n-find/screens/land/attic.webp
    landscapeAlt: Foam and Find hidden-object gameplay in a bright attic in landscape orientation
    portraitSrc: /assets/games/foam-n-find/screens/port/attic.webp
    portraitAlt: Foam and Find hidden-object gameplay in a bright attic in portrait orientation
  - title: A room full of clues
    landscapeSrc: /assets/games/foam-n-find/screens/land/bedroom.webp
    landscapeAlt: Foam and Find hidden-object gameplay in a colorful bedroom in landscape orientation
    portraitSrc: /assets/games/foam-n-find/screens/port/bedroom.webp
    portraitAlt: Foam and Find hidden-object gameplay in a colorful bedroom in portrait orientation
  - title: Find every hidden item
    landscapeSrc: /assets/games/foam-n-find/screens/land/playroom.webp
    landscapeAlt: Foam and Find hidden-object gameplay in a playroom in landscape orientation
    portraitSrc: /assets/games/foam-n-find/screens/port/playroom.webp
    portraitAlt: Foam and Find hidden-object gameplay in a playroom in portrait orientation
promoVideo:
  mp4: /assets/games/foam-n-find/videos/land.mp4
  poster: /assets/games/foam-n-find/screens/land/attic.webp
playableUrl: https://uncached-html5.gamedistribution.com/0eed16d8a087496fb95237dc3e2ebc38/?correlator=1786017604726
orientation: adaptive
embedAspectRatio: 16 / 9
order: 4
draft: false
---

## About the game

Foam and Find is a bright hidden-object puzzle set in richly detailed rooms. Each scene is packed with toys, plants, clothes, and household objects, turning a simple search list into a focused observation challenge.

## How it plays

The game selects a set of target objects for each level. Players can drag and zoom the scene, tap objects to collect them, and use a hint when a target is difficult to spot. Incorrect taps cost a life, so careful searching matters just as much as speed.

## Progression and game design

Levels are grouped into themed episodes and locations. A compact task panel keeps the current goals visible, while lives and limited hints add light resource management without distracting from the core search loop.

## My role

I created and developed the game end to end: hidden-object rules, level and episode progression, drag and zoom interaction, responsive layouts, effects, audio, platform integration, and the production web build for GameDistribution.

## Technical highlights

The game is written in TypeScript and rendered with PixiJS. Tween.js drives interface and gameplay motion, Howler.js handles audio, and Pixi filters and particle emitters provide focus effects and celebration feedback. Webpack produces the platform builds, while the custom engine owns scenes, layouts, assets, input, persistence, and platform adapters.
