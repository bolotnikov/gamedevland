---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Step 8. Enemy damage"
description: "Step 8 of the Creating Tower Defense game with PIXI tutorial: Enemy damage."
seriesTitle: "Creating Tower Defense game with PIXI"
seriesDescription: "Build a tower defense game with PixiJS, tilemaps, enemies, path following, and core gameplay systems."
seriesSlug: "tower-defense"
step: 8
readingTime: "2 min read"
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
### 8.1 Collision with a bullet
If the bullet sprite comes into contact with the enemy sprite, it is necessary to destroy the bullet and apply damage to the enemy unit. Let's start by tracking sprite collisions.

In the new `processEnemyBulletCollision` method, we will loop through all the bullets of each tower and for each bullet we will check if there is at least one enemy this bullet collides with:

```javascript
    processEnemyBulletCollision() {
        this.map.towers.forEach(tower => {
            tower.bullets.forEach(bullet => {
                const enemy = this.enemies.units.find(unit => bullet.collide(unit.sprite));

                if (enemy) {
                    bullet.remove();
                }
            });
        });
    }

    update() {
        // ...
        this.processEnemyBulletCollision();
    }
```

Let's develop the `collide` method in the `Bullet` class:

```javascript
collide(sprite) {
    if (!sprite) {
        return;
    }
    return sprite.containsPoint(this.sprite.getGlobalPosition());
}
```

### 8.2 Applying Damage
Let's apply bullet damage to the enemy before destroying the bullet:

```javascript
    processEnemyBulletCollision() {
        // ...
        if (bullet.collide(enemy.sprite)) {
            enemy.addDamage(bullet.damage);
            bullet.remove();
        }
        // ...
    }
```

Let's set the `damage` field in the `Bullet` class with the value from the config:

```javascript
export class Bullet extends EventEmitter {
    constructor(tower, enemy) {
        // ...
        this.damage = this.tower.config.bullet.damage;
    }
}
// ...
```

Let's implement the `addDamage` and `remove` methods in the `Enemy` class:

```javascript
export class Enemy extends Tile {

    constructor(config, path) {
        // ...
        this.hp = this.config.hp;
    }
    // ...

    addDamage(damage) {
        this.hp -= damage;

        if (this.hp <= 0) {
            this.remove();
        }
    }

    remove() {
        gsap.killTweensOf(this.sprite);
        this.sprite.destroy();
        this.sprite = null;
        this.emit("removed");
    }
}
```
Let's set the health value from the enemy config.
In the `addDamage` method we subtract the required amount of health and, if the value is less than or equal to zero, call the `remove` method.

In the `remove` method, first of all, we need to stop the animation of the `gsap` tweens. Then we destroy the sprite and fire the `removed` event:

Let's subscribe to this event in the `Enemies` class immediately after creating the unit. Therefore, we will remove the unit from the active units pool when the event occurs:

```javascript
createEnemy(i) {
    // ...
    enemy.once("removed", this.onEnemyRemoved.bind(this, enemy));
}

onEnemyRemoved(enemy) {
    this.units = this.units.filter(unit => unit !== enemy);

    if (!this.units.length) {
        window.setTimeout(this.create.bind(this), this.waveDelay);
    }
}
```

After deleting a unit, we additionally check the size of `this.units` field. If there are no units left in it, then it’s time to create a new enemies wave by calling the `create` method with a given delay. And let's add the `this.waveDelay` field to the `Enemies` class constructor:

```javascript
const WaveDelay = 3000;

export class Enemies extends EventEmitter {

    constructor(map) {
        // ...
        this.waveDelay = WaveDelay;
    }
    // ...
}
```
