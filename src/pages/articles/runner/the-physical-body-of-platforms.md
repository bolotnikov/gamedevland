---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Step 6. The physical body of platforms"
description: "Step 6 of the Create a platformer with PixiJS tutorial: The physical body of platforms."
seriesTitle: "Create a platformer with PixiJS"
seriesDescription: "Step-by-step guide to building an infinite runner game with PixiJS, procedural platforms, physics, and hero movement."
seriesSlug: "runner"
step: 6
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
After we have added physics to the project, we need to tell the physics engine about all the objects that will be enabled for physics processing. Let's start with platforms. Add physical bodies to the created platforms and thus let the physics engine know about the platforms.

What is the physical body of the platform? In fact, the platform is a rectangular sprite.

In order to create the physical body of the platform that the engine can process, we need to create a rectangle that exactly matches the outline of the platform. We can accurately calculate the size and position of such a rectangle by taking the coordinates and dimensions of the current platform.

In the `Platform.js` file:

``` javascript
import * as Matter from 'matter-js';

export class Platform {
    constructor(rows, cols, x) {
        // ...
        // specify the speed of the platform
        this.dx = App.config.platforms.moveSpeed;
        this.createBody();
    }

    createBody() {
        // create a physical body
        this.body = Matter.Bodies.rectangle(this.width / 2 + this.container.x, this.height / 2 + this.container.y, this.width, this.height, {friction: 0, isStatic: true});
        // add the created body to the engine
        Matter.World.add(App.physics.world, this.body);
        // save a reference to the platform object itself for further access from the physical body object
        this.body.gamePlatform = this;
    }
}
```

And let's take out the value of the platforms speed into the global config for the convenience of configuration:

```javascript
export const Config = {
    // ...
    platforms: {
        // ...
        moveSpeed: -1.5
    }
    // ...
};
```
