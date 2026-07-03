---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Step 9. Player"
description: "Step 9 of the Creating Tower Defense game with PIXI tutorial: Player."
seriesTitle: "Creating Tower Defense game with PIXI"
seriesDescription: "Build a tower defense game with PixiJS, tilemaps, enemies, path following, and core gameplay systems."
seriesSlug: "tower-defense"
step: 9
readingTime: "2 min read"
steps:
  - step: 1
    slug: ""
    title: "Creating the tile"
  - step: 2
    slug: "creating-the-level"
    title: "Creating the level"
  - step: 3
    slug: "creating-the-enemy"
    title: "Creating the enemy"
  - step: 4
    slug: "waves-of-enemies"
    title: "Waves of enemies"
  - step: 5
    slug: "creating-a-tower"
    title: "Creating a tower"
  - step: 6
    slug: "preparation-for-shooting"
    title: "Preparation for shooting"
  - step: 7
    slug: "shooting"
    title: "Shooting"
  - step: 8
    slug: "enemy-damage"
    title: "Enemy damage"
  - step: 9
    slug: "player"
    title: "Player"
  - step: 10
    slug: "ui"
    title: "UI"
  - step: 11
    slug: "enemies-processing"
    title: "Enemies Processing"
  - step: 12
    slug: "earning-and-spending-coins"
    title: "Earning and spending coins"
---
The player class will store information about the available number of coins and the remaining number of lives:

```javascript
import { App } from "../system/App";

export class Player {
    constructor() {
        this.coins = App.config.player.coins;
        this.lives = App.config.player.lives;
    }
}
```

We will write the initial values ​​in the config:

```javascript
export const Config = {
    // ...
    player: {
        coins: 200,
        lives: 5
    }
};
```

Let's create a player in the `Game` class:

```javascript
import { Player } from './Player';

export class GameScene extends Scene {
    create() {
        this.createPlayer();
        // ...
    }

    createPlayer() {
        this.player = new Player();
    }
    // ...
}
```
