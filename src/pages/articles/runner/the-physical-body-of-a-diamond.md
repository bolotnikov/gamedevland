---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Step 12. The physical body of a diamond"
description: "Step 12 of the Create a platformer with PixiJS tutorial: The physical body of a diamond."
seriesTitle: "Create a platformer with PixiJS"
seriesDescription: "Step-by-step guide to building an infinite runner game with PixiJS, procedural platforms, physics, and hero movement."
seriesSlug: "runner"
step: 12
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
As we already know, all game objects that need to handle physics interactions (such as collision) need to create physics bodies and add them to the physics engine for processing.

We have already created a physical body for the hero and the platforms, and thus have the opportunity to handle the collision of the hero with the platform. 

The player will be able to collect diamonds when they are touched by the hero's sprite while jumping. This means that diamonds also need to create a physical body. Let's improve the code in the `Diamond` class:


``` javascript
export class Diamond {
    constructor(x, y) {
        this.createSprite(x, y);
    }

    createSprite(x, y) {
        this.sprite = App.sprite("diamond");
        this.sprite.x = x;
        this.sprite.y = y;
    }

    createBody() {
        this.body = Matter.Bodies.rectangle(this.sprite.width / 2 + this.sprite.x + this.sprite.parent.x, this.sprite.height / 2 + this.sprite.y + this.sprite.parent.y, this.sprite.width, this.sprite.height, {friction: 0, isStatic: true, render: { fillStyle: '#060a19' }});
        this.body.gameDiamond = this;
        this.body.isSensor = true;
        Matter.World.add(App.physics.world, this.body);
    }
}
```

Here we created the physical body in the same way as we did for the platform and the hero. We used a rectangle at the sprite coordinates and the dimensions of the diamond sprite.
As usual, we have stored a reference to the diamond object in the physical body object in order to access the diamond at the time of the collision events.


In addition, we have set the `this.body.isSensor` property to `true`.
This way, the hero sprite will be able to pass through the diamond image, unlike the platform, which should not pass the sprite through itself.

It remains to call the `createBody` method after the diamond is added as a child element to the platform container in the `Platform.js` class:


``` javascript
    createDiamonds() {
        const y = App.config.diamonds.offset.min + Math.random() * (App.config.diamonds.offset.max - App.config.diamonds.offset.min);

        for (let i = 0; i < this.cols; i++) {
            if (Math.random() < App.config.diamonds.chance) {
                this.createDiamond(this.tileSize * i, -y);
            }
        }
    }

    createDiamond(x, y) {
            const diamond = new Diamond(x, y);
            this.container.addChild(diamond.sprite);
            diamond.createBody();
            this.diamonds.push(diamond);
    }
```
