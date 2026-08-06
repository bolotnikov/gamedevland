---
title: Fish Sort
description: An underwater sorting puzzle where every move matters. Group matching fish on seaweed lines, clear completed sets, and use helpful boosters when the board gets tricky.
status: released
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
  - Matter.js
  - GSAP
  - Howler.js
  - Vite
  - Custom HTML5 game engine
roles:
  - Creator and developer
  - Game architecture and custom engine
  - Responsive gameplay and UI
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
  webm: /assets/games/fish-sort/en/videos/land.webm
  poster: /assets/games/fish-sort/en/screens/land/10.webp
playableUrl: https://gamedevland.github.io/fish-sort-game/
orientation: adaptive
embedAspectRatio: 16 / 9
order: 2
draft: false
---

## About the game

Fish Sort is a calm underwater sorting puzzle built around planning, pattern recognition, and satisfying chain reactions. The player moves colorful fish between seaweed lines and brings matching species together until the whole board is cleared.

## How it plays

Only compatible groups can be moved onto each other. Once a line is filled with fish of the same type, they swim away and the line disappears. There is no timer, so each layout can be solved at the player's own pace. Undo, Add Line, and Shuffle boosters provide a way forward when the board gets tight.

## My role

I created and developed the game end to end: core sorting rules, level flow, boosters, animations, responsive layouts, custom engine integration, audio, and the production web build.

## Technical highlights

The game is written in TypeScript and rendered with PixiJS. Matter.js provides physics support, GSAP drives motion and transitions, and Howler.js handles audio. Its architecture uses reusable systems for scenes, layouts, input, assets, tween ownership, and platform integration.

## Responsive across devices

Fish Sort supports landscape and portrait play with dedicated layout compositions for each orientation. The canvas, gameplay area, controls, and visual scale adapt to desktop, phone, and tablet viewports while preserving the puzzle state.
