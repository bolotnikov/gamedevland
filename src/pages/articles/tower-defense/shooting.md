---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Step 7. Shooting"
description: "Step 7 of the Creating Tower Defense game with PIXI tutorial: Shooting."
seriesTitle: "Creating Tower Defense game with PIXI"
seriesDescription: "Build a tower defense game with PixiJS, tilemaps, enemies, path following, and core gameplay systems."
seriesSlug: "tower-defense"
step: 7
readingTime: "4 min read"
steps:
  - step: 1
    slug: ""
    title: "Creating the tile"
  - step: 2
    slug: "creating-the-level"
    title: "Creating the level"
  - step: 3
    slug: "creating-the-enemy"
    title: "Creating the enemy"
  - step: 4
    slug: "waves-of-enemies"
    title: "Waves of enemies"
  - step: 5
    slug: "creating-a-tower"
    title: "Creating a tower"
  - step: 6
    slug: "preparation-for-shooting"
    title: "Preparation for shooting"
  - step: 7
    slug: "shooting"
    title: "Shooting"
  - step: 8
    slug: "enemy-damage"
    title: "Enemy damage"
  - step: 9
    slug: "player"
    title: "Player"
  - step: 10
    slug: "ui"
    title: "UI"
  - step: 11
    slug: "enemies-processing"
    title: "Enemies Processing"
  - step: 12
    slug: "earning-and-spending-coins"
    title: "Earning and spending coins"
---
### 7.1 Creating a bullet

The towers will shoot bullets at enemies. The bullet in our game is represented by the `fire.png` sprite. Let's create a `Bullet` class that will create the bullet for a given tower:

```javascript

import { EventEmitter } from "events";
import { App } from '../system/App';

export class Bullet extends EventEmitter {
    constructor(tower, enemy) {
        super();
        this.tower = tower;
        this.enemy = enemy;

        this.sprite = App.sprite("fire");
        this.sprite.anchor.set(0.5, 1);
        this.sprite.x = this.tower.sprite.x;
        this.sprite.y = this.tower.sprite.y;

        this.sprite.angle = this.tower.sprite.angle;
    }
}
```

Let's extend this class from the `EventEmitter` class to be able to send bullet events. For example, in the future we will need to know about the moment when a bullet is destroyed (either when it hits an enemy or when it goes off the edge of the screen), when we will trigger the corresponding event.

Let's pass into the `Bullet` constructor the objects of the tower which the shooting is made from, as well as the enemy the bullet was fired at.

Let's create a bullet sprite and place it in the coordinates of the tower at the same angle as the tower.

The `shoot` method in the `Tower` class will be responsible for the shooting itself. In this method we need to create an instance of the `Bullet` class:

```javascript
export class Tower extends Tile {
    constructor(config) {
        // ...
        this.bullets = [];
        this.active = true;
    }
    // ...
    shoot(enemy) {
        const bullet = new Bullet(this, enemy);
        this.bullets.push(bullet);
        this.sprite.parent.addChild(bullet.sprite);
    }
}
```
This method also takes as a parameter the enemy object that the tower is firing at. In addition, we will put all the bullets created in the `this.bullets` field so that we can track each bullet created later and check if it collides with any enemy.


Now let's modify the `attack` method in the `Tower` class by adding a call of the `shoot` method, making sure the tower is active:

```javascript
    attack(enemy) {
        this.rotateToEnemy(enemy);

        if (this.active) {
            this.active = false;
            this.shoot(enemy);
            window.setTimeout(() => this.active = true, this.config.cooldown);
        }
    }
```

We used an `active` flag to indicate whether the turret can fire at the moment. The fact is that we are calling the `Tower.attack` method in the `Game.update` method, which in turn is called constantly for each new animation frame. But we want to fire bullets only at a given frequency for a given tower. 

Therefore, in order to implement the cooldown time, we need to turn off the tower activity immediately after the shot and then turn it on after a given timeout. Then we start a timeout with the reload time specified from the tower config, after which we activate the tower again by setting the flag `this.active = true;`


### 7.2 Firing a bullet

To make a bullet move, we need to update the coordinates of the bullet sprite by a given offset every frame of the animation. To do this, we need to determine the correct offset along the `x` and `y` axes, taking into account the angle by which the bullet sprite is rotated. Let's do this in the `Bullet.init` method:

```javascript
export class Bullet extends EventEmitter {
    constructor(tower, enemy) {
        // ...
        this.init();
    }

    init() {
        const speed = this.tower.config.bullet.speed;
        const azimuth = (this.sprite.angle) * (Math.PI / 180) - Math.PI / 2;
        this.velocity = {x: Math.cos(azimuth) * speed, y: Math.sin(azimuth) * speed};
        App.app.ticker.add(this.update, this);
    }

    update() {
        this.sprite.x += this.velocity.x;
        this.sprite.y += this.velocity.y;
    }
}
```
Here we take the bullet speed from the tower config that we set earlier.
Next, we determine the azimuth based on the angle at which the bullet sprite is rotated after its creation.
Knowing the azimuth and speed, we can calculate the the bullet's offset along the `x` and `y` axes. Let's write the offset in the `this.velocity` field.

And finally, we create a callback function `update`, in which we assign the resulting offset to the coordinates of the bullet sprite. 

And let's add this function to the [PIXI.Ticker](https://pixijs.download/v7.0.5/docs/PIXI.Ticker.html) so that it runs for every frame of the game animation.

### 7.3 Destruction of a bullet
If the bullet goes beyond the screen, it must be destroyed for 2 reasons:

1. an object that is no longer used should not take up memory space
2. checks that are no longer required should not be performed and the bullet's `update` method should not continue to be called, performing unnecessary calculations

Let's do this right away in order to immediately avoid possible problems with the game's performance.

Let's check the coordinates of the bullet and, if the bullet has gone beyond the screen, destroy the sprite and remove the `update` method from the ticker:

```javascript
    update() {
        this.sprite.x += this.velocity.x;
        this.sprite.y += this.velocity.y;

        let position = this.sprite.getGlobalPosition()

        if (position.x < 0 || position.x > App.app.view.width) {
            this.remove();
        }
    }

    remove() {
        App.app.ticker.remove(this.update, this);
        this.sprite.destroy();
        this.sprite = null;
        this.emit("removed");
    }
```

We only need to check the `x` coordinate of the bullet sprite.
To get the global position of the bullet on the screen, use the method [PIXI.Sprite](https://api.pixijs.io/@pixi/sprite/PIXI/Sprite.html) [`getGlobalPosition`](https://pixijs.download/v5.3.5/docs/PIXI.Sprite.html#getGlobalPosition)
We know that the left edge of the screen has an `x` coordinate equal to `0`.
The coordinate of the right edge of the screen can be obtained by finding out the width of the `canvas` by calling `App.app.view.width`.
If the `x` coordinate of the bullet is less than `0` or greater than the coordinate of the right edge of the screen, destroy the bullet sprite, remove the callback from the ticker and fire the corresponding event.

Now as we can track the bullet's destruction event, we'll modify the `Tower.shoot` method and remove the destroyed bullet from the tower bullet pool:

```javascript
shoot(enemy) {
    // ...
    bullet.once("removed", () => this.bullets = this.bullets.filter(item => item !== bullet));
}
```
