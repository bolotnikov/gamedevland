---
title: Idle Submarine
description: An underwater treasure-collecting game about lifting sunken finds with bubbles, guiding them into a submarine, and upgrading your equipment between dives.
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
  - title: Lift treasure and guide it into the intake
    landscapeSrc: /assets/games/idle-submarine/cover.webp
    landscapeAlt: Idle Submarine collecting treasure with bubbles in landscape orientation
    portraitSrc: /assets/games/idle-submarine/screens/port/gameplay.webp
    portraitAlt: The same submarine and treasure-collecting scene adapted to a tall portrait screen
  - title: Upgrade between dives
    landscapeSrc: /assets/games/idle-submarine/screens/land/upgrades.webp
    landscapeAlt: Fuel Tank, Engine, and Pump upgrade cards arranged in one row above submarine progression
    portraitSrc: /assets/games/idle-submarine/screens/port/upgrades.webp
    portraitAlt: Fuel Tank, Engine, and Pump upgrade cards stacked above submarine progression on a phone
playableUrl: https://gamedevland.github.io/idle-submarine/
orientation: adaptive
embedAspectRatio: 16 / 9
order: 0
draft: false
---

## About the game

Idle Submarine is an underwater collection game built around short dives and permanent equipment upgrades. Your submarine cruises above the seabed while you lift sunken finds into the water and guide them toward its intake.

Spend your earnings at the research station to improve the Fuel Tank, Engine, and Pump. Equipment purchases also raise your submarine level, unlocking new hulls and passive bonuses. Discover new treasure across ten regions, then continue exploring with your upgrades intact.

The playable build is an in-development version of the game.

## How to play

Hold the mouse button or touch the screen to lift treasure with bubbles. Release to let finds descend, and time your holds and releases to bring them into the submarine's intake. The pointer position does not aim the lifting force.

When fuel runs out, the submarine returns to the station. Review your haul, buy upgrades, and select Continue to begin another dive.

## Technical highlights

- Gameplay follows FSM → Command → Scene Service → Domain Model, with node components owning visuals and input.
- A fixed-step simulation keeps treasure motion and collection independent of rendering frame rate.
- Dive checkpoints and result acknowledgments preserve earned gold and prevent duplicate rewards after reloads.
- Shared portrait and landscape layouts adapt the gameplay, upgrades, and results to desktop and mobile screens.
- Pooled views, viewport culling, reused geometry, and a 960×540 / 540×960 canvas base reduce unnecessary rendering work.
