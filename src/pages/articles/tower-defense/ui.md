---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Step 10. UI"
description: "Step 10 of the Creating Tower Defense game with PIXI tutorial: UI."
seriesTitle: "Creating Tower Defense game with PIXI"
seriesDescription: "Build a tower defense game with PixiJS, tilemaps, enemies, path following, and core gameplay systems."
seriesSlug: "tower-defense"
step: 10
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
Now as we have data about the player's available coins and lives, we can display it on the screen. Our `UI` will consist of the following elements:

- lives icon - sprite `heart.png`
- coin icon - sprite `coin.png`
- text with the number of coins
- text with the number of lives

So let's create the `UI` class with the listed elements:

```javascript

import * as PIXI from "pixi.js";
import { App } from "../system/App";

export class UI {
    constructor(player) {
        this.player = player;
        this.container = new PIXI.Container();
        this.config = App.config.ui;
        this.create();
        this.update();
    }

    createCoinsIcon() {
        this.coins = App.sprite("coin");
        this.coins.anchor.set(0.5);
        this.coins.x = this.config.coinsIcon.x;
        this.coins.y = this.config.coinsIcon.y;
        this.container.addChild(this.coins);
    }

    createLivesIcon() {
        this.lives = App.sprite("heart");
        this.lives.anchor.set(0.5);
        this.lives.x = this.config.livesIcon.x;
        this.lives.y = this.config.livesIcon.y;
        this.container.addChild(this.lives);
    }

    createCoinsText() {
        this.coinsText = new PIXI.Text(this.player.coins.toString(), {fill: 0xffffff});
        this.coinsText.x = this.config.coinsText.x;
        this.coinsText.y = this.config.coinsText.y;
        this.container.addChild(this.coinsText);
    }
    createLivesText() {
        this.livesText = new PIXI.Text(this.player.lives.toString(), {fill: 0xffffff});
        this.livesText.x = this.config.livesText.x;
        this.livesText.y = this.config.livesText.y;
        this.container.addChild(this.livesText);
    }

    create() {
        this.createCoinsIcon();
        this.createCoinsText();
        this.createLivesIcon();
        this.createLivesText();
    }

    update() {
        this.coinsText.text = this.player.coins.toString();
        this.livesText.text = this.player.lives.toString();
    }
}

```

A player object is passed to the `UI` class `constructor` and this way we can display the current values ​​of `coins` and `lives` in the `update` method.

Let's place UI in the upper left corner of the screen, setting values ​​for the position of all elements in the config:


```javascript
export const Config = {
    // ...
    ui: {
        coinsIcon: {
            x: 50,
            y: 40
        },
        coinsText: {
            x: 90,
            y: 30
        },
        livesIcon: {
            x: 50,
            y: 100
        },
        livesText: {
            x: 90,
            y: 90
        }
    },
    player: {
        coins: 200,
        lives: 5
    }
};
```
And finally, let's create an instance of `UI` in the `Game` class:

```javascript
export class GameScene extends Scene {
    create() {
        // ...
        this.createUI();
    }

    createUI() {
        this.ui = new UI(this.player);
        this.container.addChild(this.ui.container);
    }
    // ...
}
```
