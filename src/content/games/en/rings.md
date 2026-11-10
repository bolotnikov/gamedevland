---
locale: en
translationKey: rings
title: Rings 3D
description: A spatial puzzle with 100 levels. Rotate the scene to find a useful view, then turn individual rings to free them from the interlocking structure.
status: in-development
genre: Spatial puzzle
platforms:
  - Web
  - Desktop
  - Mobile
  - Tablet
technologies:
  - TypeScript 5.9
  - PixiJS 8.22
  - Three.js 0.187
  - GameDevLand Engine 0.0.13
  - Vite 8
roles:
  - Full-cycle game development
  - Three.js and PixiJS integration
  - Creating 100 spatial levels
  - UI, tutorial and visual effects
iconImage: /assets/games/rings/icon-rings.jpg
coverImage: /assets/games/rings/cover.webp
playableUrl: https://gamedevland.github.io/rings/
orientation: adaptive
embedAspectRatio: 16 / 9
order: 1
draft: false
iconAlt: Colorful three-dimensional rings and clasps in Rings 3D
coverAlt: A spatial structure of colorful rings on the Rings 3D stage
screenshots:
  - title: A two-step tutorial
    landscapeSrc: /assets/games/rings/screens/land/level-001.webp
    landscapeAlt: The first Rings 3D level with the scene-rotation instruction on a wide screen
    portraitSrc: /assets/games/rings/screens/port/level-001.webp
    portraitAlt: The first tutorial step with an arrow and finger on a portrait screen
  - title: Branching structures
    landscapeSrc: /assets/games/rings/screens/land/level-025.webp
    landscapeAlt: The spatial puzzle in level 25 in landscape orientation
    portraitSrc: /assets/games/rings/screens/port/level-025.webp
    portraitAlt: Level 25 with several branches of interlocking rings on a phone
  - title: Rings in different planes
    landscapeSrc: /assets/games/rings/screens/land/level-045.webp
    landscapeAlt: The three-dimensional composition in level 45 on a wide screen
    portraitSrc: /assets/games/rings/screens/port/level-045.webp
    portraitAlt: Level 45 with rings and clasps in different planes
  - title: Late campaign levels
    landscapeSrc: /assets/games/rings/screens/land/level-098.webp
    landscapeAlt: The layered structure in level 98 in landscape orientation
    portraitSrc: /assets/games/rings/screens/port/level-098.webp
    portraitAlt: Level 98 with a complex spatial structure on a portrait screen
---

<a id="об-игре" class="translation-anchor" aria-hidden="true"></a>

## About the game

Rings 3D is a puzzle with 100 spatial levels. Rings sit in different planes and connect through small clasps. The goal is to find the sequence of turns that frees every piece.

After the tutorial, each level has a three-minute timer. Completing it awards coins and one to three stars; every five victories unlock a booster chest. Unfinished levels, rewards and settings persist between sessions.

At the start of a level, rings arrive from different directions along spiraling paths and assemble into the puzzle. Released pieces scatter downward with acceleration and tumble. Confetti and colorful fireworks celebrate each victory.

<a id="как-играть" class="translation-anchor" aria-hidden="true"></a>

## How to play

Dragging empty space rotates the whole scene. This reveals the ring opening and the clasp holding it. Dragging a ring turns it in its own plane. As soon as its extraction path is clear, it falls automatically.

The first level teaches both gestures in order: an empty-space swipe, followed by a gesture on the indicated ring. The countdown pauses during the tutorial.

Magic Hat removes a random ring, Magic Wand removes a selected ring, and Magic Clock adds 20 seconds. These boosters unlock as the campaign progresses. The gear button opens the music and sound settings.

<a id="technical-highlights" class="translation-anchor" aria-hidden="true"></a>
<a id="технические-особенности" class="translation-anchor" aria-hidden="true"></a>

## Three.js inside a PixiJS texture

Three.js renders the models, materials and lighting into a separate canvas. Its image becomes the texture of a single PixiJS sprite. This brings the spatial puzzle, UI, masks, particles and transitions together in one visible game canvas.

The texture updates when the scene rotates, pieces move, animations play or the screen changes size. An idle 3D scene does not redraw. The board component owns the render surface and GLB model instances and releases them when the scene exits.

- Three.js handles perspective, lighting, materials and mesh raycasting.
- PixiJS handles the UI, gesture hints, particles and screen transitions.
- Ring and clasp geometry determine allowed movement and extraction.
- Gameplay follows FSM → Command → Scene Service → Domain Model.
- The board and UI adapt to portrait and landscape screens.
