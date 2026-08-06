---
title: Stickers Merge
description: A relaxing merge game about completing colorful sticker books. Find matching stickers, merge them, and bring each collection to life one page at a time.
status: released
releaseYear: 2026
genre: Merge puzzle
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
iconImage: /assets/games/stickers-merge/icon.jpg
iconAlt: Stickers Merge game icon with a colorful sticker book
coverImage: /assets/games/stickers-merge/cover-land-en.png
coverAlt: Stickers Merge game cover with sticker books and bright collectible stickers
logoImage: /assets/games/stickers-merge/logo.png
screenshots:
  - title: Merge gameplay
    landscapeSrc: /assets/games/stickers-merge/en/screens/land/1.png
    landscapeAlt: Stickers Merge gameplay in landscape orientation
    portraitSrc: /assets/games/stickers-merge/en/screens/port/1.png
    portraitAlt: Stickers Merge gameplay in portrait orientation
  - title: Completed collection
    landscapeSrc: /assets/games/stickers-merge/en/screens/land/4.png
    landscapeAlt: Completed sticker album page in landscape orientation
    portraitSrc: /assets/games/stickers-merge/en/screens/port/4.png
    portraitAlt: Completed sticker album page in portrait orientation
  - title: Album selection
    landscapeSrc: /assets/games/stickers-merge/en/screens/land/5.png
    landscapeAlt: Sticker album selection screen in landscape orientation
    portraitSrc: /assets/games/stickers-merge/en/screens/port/5.png
    portraitAlt: Sticker album selection screen in portrait orientation
promoVideo:
  mp4: /assets/games/stickers-merge/en/videos/land.mp4
  poster: /assets/games/stickers-merge/en/screens/land/1.png
playableUrl: https://bolotnikov.github.io/stickers-merge-game/
externalUrl: https://poki.com/en/g/stickers-merge
articleUrl: /articles/adaptive-layout-poki-en
orientation: adaptive
embedAspectRatio: 16 / 9
order: 1
draft: false
---

## About the game

Stickers Merge is a cozy merge puzzle built around the pleasure of completing a sticker book. Each level turns a page into a small collection to uncover, with bright objects, satisfying combinations, and a clear visual goal.

## How it plays

Matching stickers combine into a higher-level sticker. The player keeps merging objects, manages the available space, and gradually reveals every item required to complete the current album page.

## My role

I created and developed the game end to end: from the core merge loop and content flow to the custom engine integration, responsive interface, platform adapters, and release build.

## Technical highlights

The game is written in TypeScript and rendered with PixiJS. Matter.js handles physics, while GSAP powers motion and transitions. The project is structured around reusable engine systems for scenes, layouts, input, assets, audio, and platform integration.

## Responsive across devices

Stickers Merge supports both landscape and portrait play. Its virtual screen, layout composition, readable UI, and physics bounds adapt to viewport changes so the game remains stable across desktop, phone, and tablet screens.
