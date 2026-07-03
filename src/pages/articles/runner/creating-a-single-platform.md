---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Step 2. Creating a single platform"
description: "Step 2 of the Create a platformer with PixiJS tutorial: Creating a single platform."
seriesTitle: "Create a platformer with PixiJS"
seriesDescription: "Step-by-step guide to building an infinite runner game with PixiJS, procedural platforms, physics, and hero movement."
seriesSlug: "runner"
step: 2
readingTime: "2 min read"
steps:
  - step: 1
    slug: ""
    title: "Create a moving background"
  - step: 2
    slug: "creating-a-single-platform"
    title: "Creating a single platform"
  - step: 3
    slug: "creating-a-hero"
    title: "Creating a hero"
  - step: 4
    slug: "creating-multiple-platforms"
    title: "Creating multiple platforms"
  - step: 5
    slug: "enable-physics"
    title: "Enable physics"
  - step: 6
    slug: "the-physical-body-of-platforms"
    title: "The physical body of platforms"
  - step: 7
    slug: "movement-of-platforms"
    title: "Movement of platforms"
  - step: 8
    slug: "the-physical-body-of-the-hero"
    title: "The physical body of the hero"
  - step: 9
    slug: "hero-jump"
    title: "Hero jump"
  - step: 10
    slug: "collision-of-the-hero-and-platform"
    title: "Collision of the hero and platform"
  - step: 11
    slug: "creating-diamonds"
    title: "Creating diamonds"
  - step: 12
    slug: "the-physical-body-of-a-diamond"
    title: "The physical body of a diamond"
  - step: 13
    slug: "collecting-diamonds"
    title: "Collecting diamonds"
  - step: 14
    slug: "ui"
    title: "UI"
  - step: 15
    slug: "restarting-the-game-when-the-hero-falls"
    title: "Restarting the game when the hero falls"
---
Now let's create our first platform, which the hero will land on at the very beginning of the game.
To do this, we will display the platform tiles on the screen, connecting them together so that a sufficiently long surface is created.
Let's start by calling the method in the `GameScene` class to create a platform:


``` javascript
    create() {
        //...
        this.createPlatform({
            rows: 4,
            cols: 6,
            x: 200
        });
    }
    createPlatform(data) {
        const platform = new Platform(data.rows, data.cols, data.x);
        this.container.addChild(platform.container);
    }
```

We will describe the functionality of the platform in the `Platform` class.
We pass 3 required parameters to the `constructor` of this class, which will determine the platform being created:
  - number of rows
  - number of columns
  - x-coordinate on the screen from which we want to start drawing the platform

Now let's create the `Platform` class:

``` javascript
import * as PIXI from "pixi.js";
import { App } from '../system/App';

export class Platform {
    constructor(rows, cols, x) {
        this.rows = rows;
        this.cols = cols;
    }
}
```
We will need to know the full dimensions of the platform being created: width and height.
We know that the platform will consist of tiles of the same size.
Thus, knowing the dimensions of one tile and knowing the number of such tiles in a row and in a column, it is easy to calculate the total width and height of the platform:

``` javascript
export class Platform {
    constructor(rows, cols, x) {
        // ...
        this.tileSize = PIXI.Texture.from("tile").width;
        this.width = this.tileSize * this.cols;
        this.height = this.tileSize * this.rows;
    }
}
```

All created tiles will need to be placed in one common container of the platform, which in turn is already placed in the outer container of the scene.
Let's create a container for tiles:

``` javascript
export class Platform {
    constructor(rows, cols, x) {
        // ...
        this.createContainer(x);
    }
    createContainer(x) {
        this.container = new PIXI.Container();
        this.container.x = x;
        this.container.y = window.innerHeight - this.height;
    }
}
```
When creating a container, we specify its `x` coordinate obtained from a parameter in the constructor. Thus, we shift the left side of the platform to this coordinate.
As the `y` coordinate, we specify a value at which the platform will touch the bottom of the screen with its bottom side. This way we will create the effect that the platform sticks out of the ground.
We know that the coordinates of the container correspond to the coordinate of the first tile in the container. And this is the top leftmost tile. Thus, if we shift the entire platform up by a distance equal to its height, we will achieve the desired effect.

Now let's create the tiles themselves:


``` javascript
export class Platform {
    constructor(rows, cols, x) {
        // ...
        this.createTiles();
    }
    createTiles() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.createTile(row, col);
            }
        }
    }

    createTile(row, col) {
        const texture = row === 0 ? "platform" : "tile" 
        const tile = App.sprite(texture);
        this.container.addChild(tile);
        tile.x = col * tile.width;
        tile.y = row * tile.height;
    }
}
```
We create tiles in a loop, going through all the rows and columns of the platform.
On the first line of the platform, use `platform` (grass sprite) as the sprite. In other cases, we use the standard `tile` sprite (an image with the ground).
For each tile, we calculate its position based on its position in the platform. To get the correct coordinates, you need to multiply the column of the tile by its width, and the row by its height.
