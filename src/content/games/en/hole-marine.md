---
locale: en
translationKey: hole-marine
title: Hole Marine
description: "An underwater arcade game with 30 levels: a growing hole collects fish, shells and treasure from the seabed."
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
  - Designing 30 levels
  - UI and responsive layouts
iconImage: /assets/games/hole-marine/icon.webp
iconAlt: Surprised fish and a shell above an underwater hole
coverImage: /assets/games/hole-marine/cover.webp
coverAlt: Hole Marine illustration with tropical fish, shells and treasure
logoImage: /assets/games/hole-marine/logo.webp
screenshots:
  - title: Schools of fish and gold coins
    landscapeSrc: /assets/games/hole-marine/screens/level-6.webp
    landscapeAlt: Blue fish and rows of gold coins around the hole on level six
  - title: Shells and ancient amphoras
    landscapeSrc: /assets/games/hole-marine/screens/level-11.webp
    landscapeAlt: The hole beside shells and an amphora on level eleven
  - title: Marine predators and treasure
    landscapeSrc: /assets/games/hole-marine/screens/level-26.webp
    landscapeAlt: A shark, lobsters and a gold bar on a wooden support
  - title: Structures on the seabed
    landscapeSrc: /assets/games/hole-marine/screens/level-30.webp
    landscapeAlt: Shells around wooden columns and an amphora on supports in the final level
promoVideo:
  mp4: /assets/games/hole-marine/gameplay.mp4
  aspectRatio: 16 / 9
  poster: /assets/games/hole-marine/screens/video-poster.webp
playableUrl: https://gamedevland.github.io/hole-marine/
orientation: adaptive
embedAspectRatio: 16 / 9
order: -2
draft: false
---

<a id="об-игре" class="translation-anchor" aria-hidden="true"></a>

## About the game

Hole Marine has 30 underwater levels filled with fish, shells and treasure. The goal is to complete each order before time runs out: start with small objects, grow the hole and reach larger targets, including sharks, rays and a whale. Wooden structures consist of separate physical bodies and collapse when their support is removed.

<a id="как-играть" class="translation-anchor" aria-hidden="true"></a>

## How to play

The hole moves by dragging with a mouse or a finger, or with WASD and the arrow keys. Four boosters unlock during the campaign: a bigger hole, a magnet, a goal finder and a timer freeze. Progress and settings are saved between sessions.

<a id="технические-особенности" class="translation-anchor" aria-hidden="true"></a>

## Technical highlights

- Three.js renders the 3D world, PixiJS draws the interface above it, and Cannon handles physics.
- Buoyancy keeps fish afloat, and physical suction pulls them into the hole.
- Level models load as the campaign progresses. Transitions wait for the required resources.
- The camera and interface adapt to portrait and landscape screens.
- GameDevLand Engine manages scenes, assets, audio and persistence; gameplay follows FSM → Command → Service.
