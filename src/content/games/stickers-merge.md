---
title: Stickers Merge
description: A relaxing merge game about completing colorful sticker books. Find matching stickers, merge them, and bring each collection to life one page at a time.
status: released
releasePlatform: poki
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
  - Full-cycle game development
  - Architecture and engine
  - Game design and UI
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

Stickers Merge is a merge puzzle about completing illustrated sticker albums. Each level is a new page with a collection of stickers to reveal.

## How to play

Merge identical stickers to create the next sticker in the chain. Manage the available space and reveal every required item to complete the page.

## Technical highlights

- The current level is preserved when the layout switches between portrait and landscape.
- Physics bounds, controls, and UI adapt to the active viewport.
