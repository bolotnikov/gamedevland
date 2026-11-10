---
locale: en
translationKey: hole-islands
title: Hole Islands
description: An arcade collecting game where swallowing objects grows the hole and opens access to larger fruit and structures.
status: in-development
genre: Arcade
platforms:
  - Web
  - Desktop
  - Mobile
  - Tablet
technologies:
  - TypeScript
  - Three.js
  - PixiJS
  - Cannon
  - GameDevLand Engine
  - Vite
roles:
  - Full-cycle game development
  - 3D graphics and physics
  - Designing ten levels
  - UI and performance optimization
iconImage: /assets/games/hole-islands/icon.webp
iconAlt: Fruit falls into a purple hole on a tropical island
coverImage: /assets/games/hole-islands/screens/land/level-5.webp
coverAlt: The hole beside cherries and tropical fruit on the fifth island
logoImage: /assets/games/hole-islands/logo.webp
screenshots:
  - title: Pears and fruit slices
    landscapeSrc: /assets/games/hole-islands/screens/land/level-3.webp
    landscapeAlt: The third island with mangoes, pears, and fruit slices
    portraitSrc: /assets/games/hole-islands/screens/port/level-3.webp
    portraitAlt: The hole beside pears and fruit slices in portrait orientation
  - title: Fruit towers
    landscapeSrc: /assets/games/hole-islands/screens/land/level-4.webp
    landscapeAlt: Wooden columns supporting golden kiwi slices
    portraitSrc: /assets/games/hole-islands/screens/port/level-4.webp
    portraitAlt: The hole near a wooden column on the fourth island
  - title: Cherries and tropical fruit
    landscapeSrc: /assets/games/hole-islands/screens/land/level-5.webp
    landscapeAlt: Cherries, dragon fruit, and pineapple rings on the fifth island
    portraitSrc: /assets/games/hole-islands/screens/port/level-5.webp
    portraitAlt: The hole beside cherries and pineapple rings on a portrait screen
  - title: Collecting berries in bulk
    landscapeSrc: /assets/games/hole-islands/screens/land/level-9.webp
    landscapeAlt: The ninth island with dense patterns of blueberries and blackberries
    portraitSrc: /assets/games/hole-islands/screens/port/level-9.webp
    portraitAlt: The hole among blueberries and blackberries on a portrait screen
promoVideo:
  mp4: /assets/games/hole-islands/gameplay.mp4
  aspectRatio: 9 / 16
  poster: /assets/games/hole-islands/screens/port/level-5.webp
playableUrl: https://gamedevland.github.io/hole-islands/
orientation: adaptive
embedAspectRatio: 16 / 9
order: -2
draft: false
---

<a id="об-игре" class="translation-anchor" aria-hidden="true"></a>

## About the game

Hole Islands has ten islands filled with fruit, berries, and vegetables. The goal is to collect the required products before time runs out. Swallowing small objects grows the hole and makes larger targets accessible. Towers and crates consist of separate physical bodies and collapse when their support is removed.

<a id="как-играть" class="translation-anchor" aria-hidden="true"></a>

## How to play

Move the hole by dragging with a mouse or a finger, or with WASD and the arrow keys. Four boosters unlock during the campaign: a bigger hole, a magnet, a goal finder, and a timer freeze. Progress and settings are saved between sessions.

<a id="технические-особенности" class="translation-anchor" aria-hidden="true"></a>

## Technical highlights

- Three.js renders the 3D world, PixiJS draws the interface above it, and Cannon handles physics.
- Rendering and physics are optimized for scenes with hundreds of objects. A local test of a 616-object level ran at approximately 120 FPS in Chrome on a MacBook Pro M1 Pro at 720×1280.
- The camera and interface adapt to portrait and landscape screens.
- GameDevLand Engine manages scenes, assets, audio, and persistence; gameplay follows FSM → Command → Service.
