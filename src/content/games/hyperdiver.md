---
title: Hyperdiver
description: A sci-fi dungeon crawler that combines minesweeper-style sector exploration with spaceship combat, loot, and persistent upgrades.
status: completed
releaseYear: 2018
genre: Sci-fi roguelike dungeon crawler
platforms:
  - Web
  - Desktop
  - Mobile
technologies:
  - JavaScript
  - Phaser 2.10.0
  - Underscore.js 1.8.3
  - WebGL and Canvas
  - Web Audio and HTML5 Audio
  - localStorage
roles:
  - Full-cycle game development
  - Architecture and engine
  - Game design and UI
iconImage: /assets/games/hyperdiver/icon.png
iconAlt: Hyperdiver icon with a spaceship flying through purple lightning
playableUrl: https://gamedevland.github.io/hyperdiver/
orientation: portrait
embedAspectRatio: 3 / 4
fitEmbedToViewport: true
order: 10
draft: false
---

## About the game

Hyperdiver is a sci-fi roguelike dungeon crawler with minesweeper-style exploration, combat, loot, and persistent ship upgrades. It was [featured by Phaser](https://phaser.io/news/2018/08/hyperdiver) in 2018.

## How it plays

Open cells on a 6×8 sector grid to find hyperfuel, bonuses, enemies, planets, and the exit. Collect enough fuel to jump onward, fight only when needed, and upgrade the ship between sectors.

## Technical highlights

- Sectors are generated from a grid-based ruleset and scale with player progression.
- The portrait playfield scales to the available viewport without changing game coordinates.
