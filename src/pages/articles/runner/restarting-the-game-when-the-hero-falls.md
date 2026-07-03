---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Step 15. Restarting the game when the hero falls"
description: "Step 15 of the Create a platformer with PixiJS tutorial: Restarting the game when the hero falls."
seriesTitle: "Create a platformer with PixiJS"
seriesDescription: "Step-by-step guide to building an infinite runner game with PixiJS, procedural platforms, physics, and hero movement."
seriesSlug: "runner"
step: 15
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
We will complete the development by restarting the game after the hero falls off the platform.
You need to restart the game on the event of the death of the hero.
Let's start by adding a handler for such an event in the `GameScene` class:

``` javascript
export class GameScene extends Scene {
    createHero() {
        // ...
        this.hero.sprite.once("die", () => {
            App.scenes.start("Game");
        });
    }
}
``` 

We know that calling the `start` method of the `ScenesManager` class will automatically call the `destroy` method of the current scene before starting a new scene. Thus, in this method, it is necessary to implement all the logic for closing the scene. Namely: destroy all objects on the stage and disable all event handlers. Let's do it:

``` javascript
destroy() {
    Matter.Events.off(App.physics, 'collisionStart', this.onCollisionStart.bind(this));
    App.app.ticker.remove(this.update, this);
    this.bg.destroy();
    this.hero.destroy();
    this.platfroms.destroy();
    this.labelScore.destroy();
}
``` 

Now we implement the destroy method in each of the listed objects.
`Background.js`
``` javascript
destroy() {
    this.container.destroy();
}
``` 

`Platforms.js`
``` javascript
destroy() {
    this.platforms.forEach(platform => platform.destroy());
    this.container.destroy();
}
``` 

`Platform.js`
``` javascript
destroy() {
    Matter.World.remove(App.physics.world, this.body);
    this.diamonds.forEach(diamond => diamond.destroy());
    this.container.destroy();
}
``` 

`Diamond.js`
``` javascript
destroy() {
    if (this.sprite) {
        App.app.ticker.remove(this.update, this);
        Matter.World.remove(App.physics.world, this.body);
        this.sprite.destroy();
        this.sprite = null;
    }
}
``` 

Finally, let's finish by firing the `die` event on the `Hero` class:

`Hero.js`
``` javascript
update() {
    // ...
    if (this.sprite.y > window.innerHeight) {
        this.sprite.emit("die");
    }
}

destroy() {
    App.app.ticker.remove(this.update, this);
    Matter.World.add(App.physics.world, this.body);
    this.sprite.destroy();
}
```
