---
locale: en
translationKey: idle-submarine
title: Idle Submarine
description: An underwater game about piloting a submarine, collecting floating treasure, and upgrading equipment between dives.
status: in-development
genre: Underwater collection / incremental
platforms:
  - Web
  - Desktop
  - Mobile
  - Tablet
technologies:
  - TypeScript 5.9
  - PixiJS 8.16
  - GameDevLand Engine 0.0.8
  - GSAP
  - Howler.js
  - Vite 8
roles:
  - Full-cycle game development
  - Architecture and engine
  - Gameplay systems and progression
  - UI and responsive layouts
iconImage: /assets/games/idle-submarine/icon.jpg
iconAlt: A yellow submarine collecting colorful gems and gold coins underwater
coverImage: /assets/games/idle-submarine/cover.webp
coverAlt: Idle Submarine gameplay with a yellow submarine, rising treasure, and bubbles above a colorful seabed
screenshots:
  - title: Steer the submarine toward floating treasure
    landscapeSrc: /assets/games/idle-submarine/cover.webp
    landscapeAlt: Idle Submarine collecting treasure with bubbles in landscape orientation
    portraitSrc: /assets/games/idle-submarine/screens/port/gameplay.webp
    portraitAlt: The same submarine and treasure-collecting scene adapted to a tall portrait screen
  - title: Upgrade between dives
    landscapeSrc: /assets/games/idle-submarine/screens/land/upgrades.webp
    landscapeAlt: Fuel Tank, Engine, and Pump upgrade cards arranged in one row above submarine progression
    portraitSrc: /assets/games/idle-submarine/screens/port/upgrades.webp
    portraitAlt: Fuel Tank, Engine, and Pump upgrade cards stacked above submarine progression on a phone
playableUrl: https://gamedev.land/play/idle-submarine/?v=6cf006d
orientation: adaptive
embedAspectRatio: 16 / 9
order: 0
draft: false
---


<a id="об-игре" class="translation-anchor" aria-hidden="true"></a>

## About the game

Idle Submarine is an underwater collection game built around short dives and permanent equipment upgrades. Steer the submarine toward floating treasure and collect it with the intake.

Spend your earnings at the research station to improve the Fuel Tank, Engine, and Pump. Equipment purchases also raise your submarine level, unlocking new hulls and passive bonuses. Discover new treasure across ten regions, then continue exploring with your upgrades intact.

The playable build is an in-development version of the game.

<a id="как-играть" class="translation-anchor" aria-hidden="true"></a>

## How to play

Hold the mouse button or touch the screen to rise. Release to sink. Steer the submarine toward treasure bubbles. The submarine stops when it settles on the seabed.

When fuel runs out, the submarine returns to the station. Review your haul, buy upgrades, and select Continue to begin another dive.

<a id="технические-особенности" class="translation-anchor" aria-hidden="true"></a>

## Technical highlights

- Gameplay follows FSM → Command → Scene Service → Domain Model, with node components owning visuals and input.
- A fixed-step simulation keeps treasure motion and collection independent of rendering frame rate.
- Dive checkpoints and result acknowledgments preserve earned gold and prevent duplicate rewards after reloads.
- Shared portrait and landscape layouts adapt the gameplay, upgrades, and results to desktop and mobile screens.
- Pooled views, viewport culling, reused geometry, and a 960×540 / 540×960 canvas base reduce unnecessary rendering work.
