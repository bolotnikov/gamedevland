---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Step 4. Creating multiple platforms"
description: "Step 4 of the Create a platformer with PixiJS tutorial: Creating multiple platforms."
seriesTitle: "Create a platformer with PixiJS"
seriesDescription: "Step-by-step guide to building an infinite runner game with PixiJS, procedural platforms, physics, and hero movement."
seriesSlug: "runner"
step: 4
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
At this point, we have created the first platform and placed the hero on it.
But in our game, platforms should create automatically and endlessly.
Therefore, it's time to write the code for generation of all the platforms.

Let's create the `Platforms` class, which will be responsible for generating all the platforms in the game:
``` javascript
import * as PIXI from "pixi.js";
import { App } from "../system/App";
import { Platform } from "./Platform";

export class Platforms {
    constructor() {
        this.platforms = [];
        this.container = new PIXI.Container();
    }
}
```

We will place all created platforms in the `this.platforms` array.
And we will also add all platforms as children in a single container `this.container`, which we will then add to the stage.

Since we decided that the `Platforms` class should create all the platforms, it means that this class should create the very first platform also. Then we will transfer the code for creating the first platform from the `GameScene` to the `Platforms`:

``` javascript
export class Platforms {
    constructor() {
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
}
```

Then on the stage itself, instead of creating the first platform, we need to initialize an instance of the `Platforms` class:

``` javascript
export class GameScene extends Scene {
    create() {
        // ...
        this.createPlatforms();
    }

    //...
    createPlatforms() {
        this.platfroms = new Platforms();
        this.container.addChild(this.platfroms.container);
    }

update(dt) {
    // ...
    this.platfroms.update(dt);
    }
}
```
In addition, we added the call to the `Platforms.update` method in the `GameScene.update` method.
In this way, we will constantly check the status of the platforms manager and perform certain actions at the right time.

And what, for example, actions do we need to track and perform at certain moments?
For example, we can automatically create platforms until the last created platform goes off screen! Let's implement the `update` method in the `Platforms` class:

``` javascript
    update() {
        if (this.current.container.x + this.current.container.width < window.innerWidth) {
            this.createPlatform(this.randomData);
        }
    }
```
If the last created platform fits entirely on the screen (that is, its right side coordinate is less than the width of the screen), then we want to create the next platform.
Thus, we say that we want to create platforms until the entire screen is filled with platforms. In other words, we create new platforms until the last created platform goes beyond the right border of the screen!

As you can see, we placed the last created platform in the `this.current` property. Therefore, let's add its setting to the `createPlatform` method along with adding the created platform to the `this.platforms` array:

``` javascript
export class Platforms {
    //...
    createPlatform(data) {
        const platform = new Platform(data.rows, data.cols, data.x);
        this.container.addChild(platform.container);
        this.platforms.push(platform);
        this.current = platform;
    }
}
```

Each next platform, unlike the first one, we will create with random parameters.
Random parameters are returned to us by the `randomData` getter.

The parameters used, although random, must still be within certain ranges so that the platforms are created in reasonable sizes and positions. Let's describe such limits in the global config `Config.js`:

``` javascript
    platforms: {
        ranges: {
            rows: {
                min: 2,
                max: 6
            },
            cols: {
                min: 3,
                max: 9
            },
            offset: {
                min: 60,
                max: 200
            }
        }
    },
```
Here we have specified the minimum and maximum number of rows and columns in one platform, as well as the minimum and maximum offset relative to the previous platform.
Now we can implement the `randomData` getter based on the given ranges:

``` javascript
    get randomData() {
        this.ranges = App.config.platforms.ranges;
        let data = { rows: 0, cols: 0, x: 0 };

        const offset = this.ranges.offset.min + Math.round(Math.random() * (this.ranges.offset.max - this.ranges.offset.min));

        data.x = this.current.container.x + this.current.container.width + offset;
        data.cols = this.ranges.cols.min + Math.round(Math.random() * (this.ranges.cols.max - this.ranges.cols.min));
        data.rows = this.ranges.rows.min + Math.round(Math.random() * (this.ranges.rows.max - this.ranges.rows.min));

        return data;
    }
```
