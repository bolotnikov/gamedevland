---
title: Fish Sort
description: An underwater sorting puzzle where every move matters. Group matching fish on seaweed lines, clear completed sets, and use helpful boosters when the board gets tricky.
status: released
releasePlatform: game-distribution
releaseYear: 2026
genre: Sort puzzle
platforms:
  - Web
  - Desktop
  - Mobile
  - Tablet
technologies:
  - TypeScript
  - PixiJS 8
  - GSAP
  - Howler.js
  - Pixi Filters
  - Vite
  - Custom HTML5 game engine
roles:
  - Full-cycle game development
  - Architecture and engine
  - Game design and UI
iconImage: /assets/games/fish-sort/icon.jpg
iconAlt: Fish Sort game icon with colorful fish swimming underwater
coverImage: /assets/games/fish-sort/cover1.jpg
coverAlt: Fish Sort cover with colorful fish grouped around underwater plants
screenshots:
  - title: First sorting challenge
    landscapeSrc: /assets/games/fish-sort/en/screens/land/10.webp
    landscapeAlt: Fish Sort level 10 gameplay in landscape orientation
    portraitSrc: /assets/games/fish-sort/en/screens/port/10.webp
    portraitAlt: Fish Sort level 10 gameplay in portrait orientation
  - title: A denser puzzle
    landscapeSrc: /assets/games/fish-sort/en/screens/land/20.webp
    landscapeAlt: Fish Sort level 20 gameplay in landscape orientation
    portraitSrc: /assets/games/fish-sort/en/screens/port/20.webp
    portraitAlt: Fish Sort level 20 gameplay in portrait orientation
  - title: Advanced sorting
    landscapeSrc: /assets/games/fish-sort/en/screens/land/30.webp
    landscapeAlt: Fish Sort level 30 gameplay in landscape orientation
    portraitSrc: /assets/games/fish-sort/en/screens/port/30.webp
    portraitAlt: Fish Sort level 30 gameplay in portrait orientation
promoVideo:
  mp4: /assets/games/fish-sort/en/videos/land.mp4
  poster: /assets/games/fish-sort/en/screens/land/10.webp
playableUrl: https://gamedevland.github.io/fish-sort-game/
orientation: adaptive
embedAspectRatio: 16 / 9
order: 2
draft: false
---

## About the game

Fish Sort is an underwater sorting puzzle with level-based boards and three optional boosters.

## How to play

Move the top group of fish between seaweed lines and collect matching fish on the same line. A completed group swims away; Undo, Add Line, and Shuffle can help when no useful move remains.

## Technical highlights

- Portrait and landscape layouts share the same puzzle state.
- Move history supports deterministic undo.
