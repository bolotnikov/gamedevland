---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Step 10. Collision of the hero and platform"
description: "Step 10 of the Create a platformer with PixiJS tutorial: Collision of the hero and platform."
seriesTitle: "Create a platformer with PixiJS"
seriesDescription: "Step-by-step guide to building an infinite runner game with PixiJS, procedural platforms, physics, and hero movement."
seriesSlug: "runner"
step: 10
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
Right now the hero can only perform jump 2 jumps because the `this.jumpIndex` counter never resets. 
And at what point should this counter be reset to give the hero the opportunity for a new double jump?

That is the moment when hero touches the platform. This means that the hero has landed on the ground and the previous jump is completed.

How can we track the collision of the hero and the platform? To do this, we will again use the physics engine and the interaction of the physical bodies of the hero and the platform.

The `Matter` physics engine will fire a collision event when two physics bodies collide. So we need to listen for this event.
Let's do this in the `GameScene` class:


``` javascript
import * as Matter from 'matter-js';
import { App } from '../system/App';
//...

export class GameScene extends Scene {
    create() {
        //...
        this.setEvents();
    }

    setEvents() {
        Matter.Events.on(App.physics, 'collisionStart', this.onCollisionStart.bind(this));
    }

    onCollisionStart(event) {
        const colliders = [event.pairs[0].bodyA, event.pairs[0].bodyB];
        const hero = colliders.find(body => body.gameHero);
        const platform = colliders.find(body => body.gamePlatform);

        if (hero && platform) {
            this.hero.stayOnPlatform(platform.gamePlatform);
        }
    }
    // ...
}
```
The `onCollisionStart` method will run automatically when the `collisionStart` event occurs, which means that a collision of physical bodies has occurred.

In this method, we get physical bodies that interact with each other.
Since we created the `gameHero` and `gamePlatform` properties in the physical body objects of the hero and platform in advance, we can now check for the presence of such properties and determine from them what kind of body is involved in the collision.

Finally, if we got both a hero and a platform, we'll call the `stayOnPlatform` method to set the hero on the platform.

Let's implement this method in the `Hero` class:

``` javascript
export class Hero {
    // ...

    stayOnPlatform(platform) {
        this.platform = platform;
        this.jumpIndex = 0;
    }
``` 

All we need to do in it is reset the counter and set the current platform to the `this.platform` property.

And now we can improve the code of the `startJump` method by adding an additional check whether the hero is currently on the platform. If a jump is possible, then the `this.platform` property should be reset.

``` javascript
    startJump() {
        if (this.platform || this.jumpIndex === 1) {
            ++this.jumpIndex;
            this.platform = null;
            Matter.Body.setVelocity(this.body, { x: 0, y: -this.dy });
        }
    }
```
