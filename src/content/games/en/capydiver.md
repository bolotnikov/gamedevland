---
locale: en
translationKey: capydiver
title: CapyDiver
description: An underwater adventure about a capybara exploring procedural reefs and finding treasures behind kelp.
status: released
releaseDate: 2026-11-18
genre: Underwater adventure
platforms:
  - Web
  - Desktop
  - Mobile
  - Tablet
technologies:
  - TypeScript
  - PixiJS
  - Rigby2D
  - GameDevLand Engine 0.0.17
  - Vite
roles:
  - Game development
  - Terrain generation and controls
  - Skeletal animation and effects
  - UI and responsive layouts
iconImage: /assets/games/capydiver/icon.jpg
iconAlt: A capybara in an orange diving suit and green flippers swimming over a reef
coverImage: /assets/games/capydiver/cover.webp
coverAlt: A capybara swimming along a coral ledge with coins and fish ahead
screenshots:
  - title: Down an underwater shaft
    landscapeSrc: /assets/games/capydiver/screens/land/shaft.webp
    landscapeAlt: The capybara diving between curving rock walls
    portraitSrc: /assets/games/capydiver/screens/port/shaft.webp
    portraitAlt: A portrait gameplay view of the capybara and fish in a shaft
  - title: A grotto with coins and patrols
    landscapeSrc: /assets/games/capydiver/screens/land/grotto.webp
    landscapeAlt: Coins, coral and fish along a rocky ledge
    portraitSrc: /assets/games/capydiver/screens/port/grotto.webp
    portraitAlt: A portrait gameplay view of the capybara next to a coral ledge
  - title: Before the dive
    landscapeSrc: /assets/games/capydiver/screens/land/title.webp
    landscapeAlt: The CapyDiver title screen in landscape orientation
    portraitSrc: /assets/games/capydiver/screens/port/title.webp
    portraitAlt: The CapyDiver title screen in portrait orientation
promoVideo:
  mp4: /assets/games/capydiver/gameplay.mp4
  poster: /assets/games/capydiver/screens/land/shaft.webp
  aspectRatio: 16 / 9
playableUrl: https://gamedev.land/play/capydiver/?v=0.1.1
orientation: adaptive
embedAspectRatio: 16 / 9
order: -4
draft: false
---

<a id="об-игре" class="translation-anchor" aria-hidden="true"></a>

## About the game

A capybara explores an underwater labyrinth, collects coins and searches for two relics behind kelp. Passages and patrols change with each new dive. Winding shafts and routes around rock islands connect the entrance on the left to the exit on the right.

<a id="как-играть" class="translation-anchor" aria-hidden="true"></a>

## How to play

Use WASD or the arrow keys to swim. Press Space or click to dash. Touch screens use a floating joystick and a separate Dash button.

Dash through cargo to reveal rewards and clear the kelp at the exit. Explore side passages for hidden treasure. Retrying keeps the same reef.

<a id="технические-особенности" class="translation-anchor" aria-hidden="true"></a>

## Technical highlights

The generator builds Bézier curves for slopes, walls and grottos. Rendering, scenery placement and collision share the same contours. The swimmer slides along surfaces on contact, and bubbles rise in world space from a marker on the skeletal rig.

[Public web build repository](https://github.com/bolotnikov/capydiver)
