---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Step 2. Creating the level"
description: "Step 2 of the Creating Tower Defense game with PIXI tutorial: Creating the level."
seriesTitle: "Creating Tower Defense game with PIXI"
seriesDescription: "Build a tower defense game with PixiJS, tilemaps, enemies, path following, and core gameplay systems."
seriesSlug: "tower-defense"
step: 2
readingTime: "3 min read"
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
So we've learned how to create a specific tile by its ID. It means we can draw the entire map specified in `tilemap.json`.
Let's create a new class `LevelMap` for this.

1. We will receive the level data from the `tilemap.json` into the `const TilemapJson` variable using the `require` mechanism, reading the contents of the corresponding file.
2. Let's create a container `this.container`, into which we will place the created tile sprites.
3. Let's create a field `this.tiles`, where we will place all the created tiles.
4. We will implement the map rendering function in the `this.render` method

``` javascript
import * as PIXI from "pixi.js";
import { Tile } from "./Tile";
import { App } from "../system/App";
const TilemapJson = require("../../json/tilemap.json");

export class LevelMap {
    constructor() {
        this.container = new PIXI.Container();
        this.tiles = {};
        this.render();
    }

    render() {
    }
}
```

So, we need to implement the `render` method to draw the level map on the game scene.

Let's determine the data we need to draw the map on the game scene:

1. In `Tiled`, we created a level that consists of an 18 x 32 grid of tiles.
2. In addition, we have created 5 layers on this map.
3. And also in our game we plan to draw tiles 2 times smaller than their original size in the atlas is. We will render tiles with a size of 32px instead of 64x.
Let's add this data to the game config:

``` javascript
export const Config = {
    // ...
    level: {
        rows: 18,
        cols: 32,
        layers: 5,
        tileSize: 32
    }
};
```

Please note that in the `level` field we indicate exactly the data related directly to our level. So, our game map consists of an 18 x 32 grid. It has only 18 rows and 32 tiles in each row.
And in the `atlas` field we created in the previous step, we store information directly about the `tilemap.png` atlas, which in turn consists of a 23 X 13 grid, where each tile has a tile size of 64px.

We know that our level map contains 5 layers, which we added ourselves when we created the map in the `Tiled`.
This means that we need to iterate through each layer in the generated map and check if a tile is created in that layer at a given position:

``` javascript
    render() {
        for (let layer = 0; layer < App.config.level.layers; layer++) {
            let index = 0;
            const layerData = TilemapJson.layers[layer];
            this.tiles[layerData.name] = [];
        }
    }
```

As you can see, the information about the tile presence in the grid can be obtained from the current layer data from `tilemap.json`. Let's save this data in `layerData`.
Let each property of the `this.tiles` object refer to a specific map layer.

If `tilemap.json` contains data for the current layer, then we can find out the tile ID by the `index` counter, which increases by 1 for each next tile checked. Thus, let's loop through all the columns in all the rows of our map, increasing the `index` parameter in each iteration.
This way we find out whether there is a tile in a given position on a given layer.
If there is a tile, then we get its ID:

``` javascript

    render() {
        for (let layer = 0; layer < App.config.level.layers; layer++) {
            let index = 0;
            const layerData = json.layers[layer];
            this.tiles[layerData.name] = [];

            if (layerData.data) {
                for (let row = 0; row < App.config.level.rows; row++) {
                    for (let col = 0; col < App.config.level.cols; col++) {
                        const tileId = TilemapJson.layers[layer].data[index];
                        index++;
                        if (tileId) {
                            const tile = this.renderTile(tileId, row, col);
                            this.tiles[layerData.name].push(tile);

                        }
                    }
                }
            }
        }

    }
}
```

If we've found the tile ID at a given position, we can draw it:

``` javascript

    renderTile(id, row, col) {
        let tile = new Tile(id);
        tile.sprite.x = col * App.config.level.tileSize;
        tile.sprite.y = row * App.config.level.tileSize;
        tile.sprite.width = App.config.level.tileSize;
        tile.sprite.height = App.config.level.tileSize;
        this.container.addChild(tile.sprite);
        return tile;
    }
```

While drawing, we use the tile sizes that we want to get in the game. We take data from the `tileSize` field of the `level` object, and not from the `map`. In our case, it is 32px. Taking these dimensions into account, we create the tile in the correct position on the screen with the correct offset and add the created tile to the container of the `LevelMap` class.

Now we can render the entire map in the `Game` scene:


``` javascript
import { Scene } from '../system/Scene';
import { LevelMap } from './LevelMap';

export class GameScene extends Scene {
    create() {
        this.createMap();
    }
    createMap() {
        this.map = new LevelMap();
        this.container.addChild(this.map.container);
    }
}
```

It is easy to calculate that a grid size of 18x32 taking into account the tile size of 32px will give us a map of 1024 x 576 pixels.

Let's specify this data while creating the pixi canvas in the `App` class:

``` javascript
        this.app = new PIXI.Application({ width: 1024, height: 576});
        this.app.view.style = `width: 1024px; height: 576;`;
```

And now let’s check whether the map is displayed correctly on the screen.
