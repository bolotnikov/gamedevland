# Сreating Tower Defense game with PIXI

In this course we will create a tower defense game using PixiJS.

Before starting the development, we need to make 2 steps:

:one: Download our [PIXI project template](https://github.com/gamedevland/pixi-project-template). You can start working on the game right now or check out [the tutorial](pixi_project_template.md) on how to create a PIXI project template.

:two: Download the tilemap that was created in Tiled

## 1. Creating the tile

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

First, let's manually set the number of rows and columns in our atlas in the game config, and also directly indicate the size of the tiles:

``` javascript

import { Tools } from "../system/Tools";
import { GameScene } from "./GameScene";

export const Config = {
    loader: Tools.massiveRequire(require["context"]('./../../sprites/', true, /\.(mp3|png|jpe?g)$/)),
    scenes: {
        "Game": GameScene
    },
    map: {
        rows: 13,
        cols: 23,
        tileSize: 64
    }
};

```

Now, knowing the total number of rows and columns, we can calculate which row and which column has a tile with a given ID:


``` javascript
    get position() {
        let index = 0;

        for (let row = 0; row < App.config.map.rows; row++) {
            for (let col = 0; col < App.config.map.cols; col++) {
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
        const x = App.config.map.tileSize * this.position.col;
        const y = App.config.map.tileSize * this.position.row;
        const texture = new PIXI.Texture(this.atlas, new PIXI.Rectangle(x + 1, y + 1, App.config.map.tileSize - 2, App.config.map.tileSize - 2));
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