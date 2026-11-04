---
locale: en
translationKey: rings
title: Rings
description: A puzzle about interlocking rings and metal shapes. Rotate and slide the pieces, release their fasteners, and take the structure apart before time runs out.
status: in-development
genre: Spatial puzzle
platforms:
  - Web
  - Desktop
  - Mobile
  - Tablet
technologies:
  - TypeScript 5.9
  - PixiJS 8.16
  - GameDevLand Engine 0.0.8
  - Vite 8
roles:
  - Full-cycle game development
  - Architecture and gameplay systems
  - Creating 100 levels
  - UI and responsive layouts
iconImage: /assets/games/rings/icon-rings.webp
iconAlt: Two open gold and copper rings joined by a fastener on a blue stage
coverImage: /assets/games/rings/cover.webp
coverAlt: Interlocking metal rings on the Rings stage, with a timer and booster panel
screenshots:
  - title: Free the interlocking pieces
    landscapeSrc: /assets/games/rings/cover.webp
    landscapeAlt: The Rings board with rings and fasteners in landscape orientation
    portraitSrc: /assets/games/rings/screens/port/gameplay.webp
    portraitAlt: The same Rings board adapted to a portrait screen
  - title: Take apart more complex structures
    landscapeSrc: /assets/games/rings/screens/land/complex.webp
    landscapeAlt: A Rings level with several interlocking shapes in landscape orientation
    portraitSrc: /assets/games/rings/screens/port/complex.webp
    portraitAlt: The same structure of metal shapes in portrait orientation
  - title: Unlock boosters as the campaign progresses
    landscapeSrc: /assets/games/rings/screens/land/boosters.webp
    landscapeAlt: Unlocking the Magic Hat booster in the landscape version of Rings
    portraitSrc: /assets/games/rings/screens/port/boosters.webp
    portraitAlt: The Magic Hat unlock screen with the booster description on a phone
playableUrl: https://gamedevland.github.io/rings/
orientation: adaptive
embedAspectRatio: 16 / 9
order: 1
draft: false
---

<a id="об-игре" class="translation-anchor" aria-hidden="true"></a>

## About the game

Rings is a puzzle game with 100 levels. Rings, rods, and curved pieces are joined by fasteners. The goal is to find the sequence of moves that frees every piece.

Each level has a three-minute timer. Completing it awards coins and one to three stars based on the time taken. Every five victories unlock a booster chest. The current level, rewards, and settings are saved between sessions.

The playable build is an in-development version of the game.

<a id="как-играть" class="translation-anchor" aria-hidden="true"></a>

## How to play

Hold a piece with the mouse or a finger and drag it in an allowed direction. Circular pieces rotate around their centers, straight rods slide along their axes, and S-shaped pieces follow their contours through the fasteners. Freed pieces fall off the board.

If a move is blocked, the piece briefly shakes. The pieces holding it in place need to be freed first. Some locks open after the indicated number of pieces have been removed.

Three boosters unlock during the campaign: Magic Hat removes a random ring, Magic Wand removes a selected ring, and Magic Clock adds 20 seconds. The gear button opens the music and sound settings.

<a id="технические-особенности" class="translation-anchor" aria-hidden="true"></a>

## Technical highlights

- Gameplay follows FSM → Command → Scene Service → Domain Model.
- Piece geometry determines selection, allowed movement, and fastener release.
- Piece positions and unfinished levels are saved; rewards are paid once per attempt.
- The board uses piece dimensions and the space around the UI to arrange each puzzle for portrait and landscape screens.
- Local WebP textures, music, sound effects, and the font are included in the web build.
