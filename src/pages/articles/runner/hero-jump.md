---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Step 9. Hero jump"
description: "Step 9 of the Create a platformer with PixiJS tutorial: Hero jump."
seriesTitle: "Create a platformer with PixiJS"
seriesDescription: "Step-by-step guide to building an infinite runner game with PixiJS, procedural platforms, physics, and hero movement."
seriesSlug: "runner"
step: 9
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
We will give the hero the opportunity to jump twice.
This means that after the first jump, the hero will be able to perform another jump while he's in the air.
Then he must land on the platform to make the next jump.

Let's make the hero jump by pressing anywhere in the screen.
We will listen to the `pointerdown` event in the `GameScene` class:

``` javascript

export class GameScene extends Scene {
    // ...
    createHero() {
        // ...
        this.container.interactive = true;
        this.container.on("pointerdown", () => {
            this.hero.startJump();
        });
    }
    // ...
}
```

As you can see, now we need to implement the `startJump` method in the` Hero` class:


``` javascript

export class Hero {
    constructor() {
        // ...
        this.dy = App.config.hero.jumpSpeed;
        this.maxJumps = App.config.hero.maxJumps;
        this.jumpIndex = 0;
    }

    startJump() {
        if (this.jumpIndex < this.maxJumps) {
            ++this.jumpIndex;
            Matter.Body.setVelocity(this.body, { x: 0, y: -this.dy });
        }
    }
    // ...
}
```

The `jumpIndex` counter limits the number of jumps until the next touch of the platform. 
The maximum possible number of jumps is indicated in the property `this.maxJumps`.

We use the physical engine to set the speed of the hero’s physical body. For a jump, we need to move it only along the axis `y` up. This means that we need to set a negative displacement for the `y` coordinate, which is set in the `this.dy` property.

And finally, we take out the values of the jump speed and the number of jumps into the global config for the convenience of configuration:

``` javascript
export const Config = {
    // ...
    hero: {
        jumpSpeed: 15,
        maxJumps: 2,
        //...
    }
};
```
