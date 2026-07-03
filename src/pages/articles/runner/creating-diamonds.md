---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Step 11. Creating diamonds"
description: "Step 11 of the Create a platformer with PixiJS tutorial: Creating diamonds."
seriesTitle: "Create a platformer with PixiJS"
seriesDescription: "Step-by-step guide to building an infinite runner game with PixiJS, procedural platforms, physics, and hero movement."
seriesSlug: "runner"
step: 11
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
In the game, the diamonds will be positioned above the platforms in such a way as to motivate the player to jump from the platform to collect them.

We will create diamonds for each platform in the corresponding class. Let's create a certain number of diamond images above the platform:

``` javascript
// ...
export class Platform {
    constructor(rows, cols, x) {
        // ...
        this.diamonds = [];
        this.createDiamonds();
    }

    createDiamonds() {
        const y = App.config.diamonds.offset.min + Math.random() * (App.config.diamonds.offset.max - App.config.diamonds.offset.min);

        for (let i = 0; i < this.cols; i++) {
            if (Math.random() < App.config.diamonds.chance) {
                const diamond = new Diamond(this.tileSize * i, -y);
                this.container.addChild(diamond.sprite);
                this.diamonds.push(diamond);
            }
        }
    }
    // ...
}

```

Let's loop through all the tiles of the platform and check the possibility of creating a diamond over each tile. The probability of creating a diamond over one tile is obtained from the property of the global config `App.config.diamonds.chance`.

If we need to create a diamond over this tile, then we will create an instance of the `Diamond` class. Let's place the created object in the `this.diamonds` property and add it as a child element to the platform container.


Let's add the settings for creating diamonds to the global config:

``` javascript
// ...
export const Config = {
    // ...
    diamonds: {
        chance: 0.4,
        offset: {
            min: 100,
            max: 200
        }
    }
}
```

The chance property indicates the probability of a diamond being generated on each specific platform tile.
The offset object defines the allowable height range at which the diamond must be positioned above the platform.

It remains to implement the `Diamond` class. At the moment, we only implement in it the output of the diamond sprite:

``` javascript
import { App } from '../system/App';

export class Diamond {
    constructor(x, y) {
        this.sprite = App.sprite("diamond");
        this.sprite.x = x;
        this.sprite.y = y;
    }
}
```
