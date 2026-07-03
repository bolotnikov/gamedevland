---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Step 13. Collecting diamonds"
description: "Step 13 of the Create a platformer with PixiJS tutorial: Collecting diamonds."
seriesTitle: "Create a platformer with PixiJS"
seriesDescription: "Step-by-step guide to building an infinite runner game with PixiJS, procedural platforms, physics, and hero movement."
seriesSlug: "runner"
step: 13
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
When the hero touches the diamond, it will be considered collected and should disappear from the screen. How to determine the moment of collision?
We already did this for the hero and platform in the `GameScene.js` class when we implemented the `onCollisionStart` method. Now let's extend this method to check for the presence of a diamond object and handle such a collision:


``` javascript
export class GameScene extends Scene {
    // ...
    onCollisionStart(event) {
        // ...
        const diamond = colliders.find(body => body.gameDiamond);

        if (hero && diamond) {
            this.hero.collectDiamond(diamond.gameDiamond);
        }
    }
    // ...
}
```
We need to implement the `collectDiamond` method in the `Hero.js` class:

``` javascript
import * as Matter from 'matter-js';
import * as PIXI from "pixi.js";
import { App } from '../system/App';

export class Hero {
    constructor() {
        // ...
        this.score = 0;
    }
    collectDiamond(diamond) {
        ++this.score;
        Matter.World.remove(App.physics.world, diamond.body);
        diamond.sprite.destroy();
        diamond.sprite = null;
    }
    // ...
}
```
When collecting a diamond, we destroy its physical body and destroy the sprite itself.
We also increase the hero's score counter, which we will later display on the screen as a game score.
