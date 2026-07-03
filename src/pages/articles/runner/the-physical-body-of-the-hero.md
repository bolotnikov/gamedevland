---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Step 8. The physical body of the hero"
description: "Step 8 of the Create a platformer with PixiJS tutorial: The physical body of the hero."
seriesTitle: "Create a platformer with PixiJS"
seriesDescription: "Step-by-step guide to building an infinite runner game with PixiJS, procedural platforms, physics, and hero movement."
seriesSlug: "runner"
step: 8
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
By analogy with the platform, let's create a physical body for the hero in the `Hero.js` file:

``` javascript

import * as Matter from 'matter-js';
// ...
export class Hero {
    constructor() {
        // ...
        this.createBody();
        App.app.ticker.add(this.update.bind(this));
    }

    // [07]
    createBody() {
        this.body = Matter.Bodies.rectangle(this.sprite.x + this.sprite.width / 2, this.sprite.y + this.sprite.height / 2, this.sprite.width, this.sprite.height, {friction: 0});
        Matter.World.add(App.physics.world, this.body);
        this.body.gameHero = this;
    }

    update() {
        this.sprite.x = this.body.position.x - this.sprite.width / 2;
        this.sprite.y = this.body.position.y - this.sprite.height / 2;
    }
}
``` 
As well as for the platform we created a rectangle body in the position of the hero and in its dimensions.

Then we added the created body to the engine and saved a reference to the hero itself in the `body` object. We will need this later when processing collisions, when we will have access to the colliding physical bodies.

In addition, we have created an `update` method that is added to the `PIXI` ticker and will be called on every frame of the animation.
In it, we force the hero's sprite to the position of his physical body in order to synchronize them. Thus, wherever the hero's physical body is sent as a result of interaction with physical objects, the hero's sprite will be placed in the same position.
