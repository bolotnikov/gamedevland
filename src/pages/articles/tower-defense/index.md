---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Step 1. Creating the tile"
description: "Step 1 of the Creating Tower Defense game with PIXI tutorial: Creating the tile."
seriesTitle: "Creating Tower Defense game with PIXI"
seriesDescription: "Build a tower defense game with PixiJS, tilemaps, enemies, path following, and core gameplay systems."
seriesSlug: "tower-defense"
step: 1
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
In this course we will create a tower defense game using PixiJS.

## Additional materials
- [Complete source code](https://github.com/gamedevland/tower-defense)
- [Preview demo](https://gamedevland.github.io/tower-defense/)

Before starting the development, we need to make 2 steps:

1️⃣ ( Download our [PIXI project template](https://github.com/gamedevland/pixi-project-template). You can start working on the game right now or check out [the tutorial](/articles/pixi-project-template) on how to create a PIXI project template.

2️⃣ Download game assets:

- [sprites](https://github.com/gamedevland/tower-defense/tree/main/src/sprites)
- [tilemap](https://github.com/gamedevland/tower-defense/blob/main/src/json/tilemap.json) created in [Tiled](https://www.mapeditor.org/) editor

So, we downloaded and unpacked our project template, in which we will continue to work.
Usually, the first thing I start developing a new game with is creating a background image on the screen.
In this project, instead of a background image, we will use the entire level map.
We prepared this map in advance in the Tiled program and it has a tilemap format.
This means that the entire map consists of small tiles.
Level data is stored in two files:

- `tilemap.json`
- `tilemap.png`

Let's place them in the appropriate folders in the project:

- `/src/json/tilemap.json`
- `/src/sprites/tilemap.png`

To create a map on the game scene, we first need to learn how to parse the tilemap.png image so that we can draw only the tiles we need.

Let's create a `Tile` class that will be responsible for drawing the section of the map that we need:

``` javascript
import { EventEmitter } from "events";
import * as PIXI from "pixi.js";
import { App } from "../system/App";

export class Tile extends EventEmitter {
    constructor(id) {
        super();
        this.atlas = App.res("tilemap");
        this.id = id;
        this.createSprite();
    }

    createSprite() {
    }
}
```

The `Tile` class will be a child of `EventEmitter` because we want instances of this class to be able to fire the events we need. For example, a tower is a type of `Tile`. The tower may have events that we would like to be able to track in the future.

In the `this.atlas` field we will get the texture of the loaded tilemap asset.
Let each tile have its own ID number in the atlas, by which we can specifically identify the tile by determining its position.
Thus, before we understand how to draw the desired part of the image, let's determine its position by ID.

First, let's manually set the number of rows and columns of our atlas image `tilemap.png` in the game config, and also directly indicate the size of the tiles:

``` javascript

import { Tools } from "../system/Tools";
import { GameScene } from "./GameScene";

export const Config = {
    loader: Tools.massiveRequire(require["context"]('./../../sprites/', true, /\.(mp3|png|jpe?g)$/)),
    scenes: {
        "Game": GameScene
    },
    atlas: {
        cols: 23,
        rows: 13,
        tileSize: 64
    }    
};

```

Knowing the total number of rows and columns of the atlas image, we can calculate which row and column has a tile with a given ID:


``` javascript
    get position() {
        let index = 0;

        for (let row = 0; row < App.config.atlas.rows; row++) {
            for (let col = 0; col < App.config.atlas.cols; col++) {
                ++index;
                if (index === this.id) {
                    return {row, col};
               
               }
            }
        }

        return {row: 0, col: 0};
    }
```

Having defined the tile's row and column in the tilemap grid, we can finally draw it:

``` javascript
    createSprite() {
        const x = App.config.atlas.tileSize * this.position.col;
        const y = App.config.atlas.tileSize * this.position.row;
        const texture = new PIXI.Texture(this.atlas, new PIXI.Rectangle(x + 1, y + 1, App.config.atlas.tileSize - 2, App.config.atlas.tileSize - 2));
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.anchor.set(0.5);
    }
```

We find the desired tile coordinates based on its position in the tilemap grid, taking into account the size of the tile.
Here we're using a 1px offset from each edge of the tile, since our map was generated with that offset to avoid potential frame overlap issues.

Now it remains to check that the tiles are created correctly:


``` javascript
import { Scene } from '../system/Scene';
import { Tile } from './Tile';

export class GameScene extends Scene {
    create() {
        const tile = new Tile(1);
        this.container.addChild(tile.sprite);
    }
}
```
