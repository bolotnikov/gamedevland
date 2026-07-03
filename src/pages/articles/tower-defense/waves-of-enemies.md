---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Step 4. Waves of enemies"
description: "Step 4 of the Creating Tower Defense game with PIXI tutorial: Waves of enemies."
seriesTitle: "Creating Tower Defense game with PIXI"
seriesDescription: "Build a tower defense game with PixiJS, tilemaps, enemies, path following, and core gameplay systems."
seriesSlug: "tower-defense"
step: 4
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
We have successfully created a single enemy that moves along the map. There will be 4 waves of enemies in our game. Each wave will have a given number of units of a certain type. Let's start by setting the enemies waves config:

```javascript

export const Config = {
    // ...
    enemiesWaves: [{
        count: 8,
        type: "unit1"
    }, {
        count: 12,
        type: "unit2"
    }, {
        count: 16,
        type: "unit3"
    }, {
        count: 20,
        type: "unit4"
    }]
}

```

Now we can develop a class that will manage the creation of enemy waves. Let's create the `Enemies.js` class:

```javascript

import * as PIXI from "pixi.js";
import { EventEmitter } from "events";
import { App } from '../system/App';
import { Enemy } from "./Enemy";

export class Enemies extends EventEmitter {

    constructor(map) {
        super();

        this.container = new PIXI.Container();
        this.map = map;
        this.units = [];
        this.config = App.config.enemiesWaves;
        this.index = 0;
        this.create();
    }

    createEnemy(i, type) {}
    create() {}
}

```

- In the constructor we've created a container in which we will place all the created enemy sprites.
- We'll write the level map object to the internal field `this.map`.
- In the `this.units` field we will store all created objects of the `Enemy` class.
- In the `this.config` field we'll set data about all planned waves of enemies from the config.
- The `this.index` field indicates the index of the current wave.

And the `create` method will create a new wave based on the current index. Let's develop it:

```javascript
    create() {
        const config = this.config[this.index];

        if (!config) {
            return;
        }

        ++this.index;

        for (let i = 0; i < config.count; i++) {
            this.createEnemy(i, config.type);
        }
    }
```

Here we get the config of the desired wave according to the current index. And we create the required number of enemies in a loop in the `createEnemy` method. We can move the enemy creation code from `Game.createEnemies` into the `Enemies.createEnemy` method. We need to perform 3 steps:

1. Create an enemy object and save it in an `Enemies` class object.
2. Place the created object at the starting point on the map
3. Start the movement of the enemy object

Let's do these steps:

```javascript
// Enemies.js
// ...
createEnemy(i, type) {
    // create a new enemy
    const enemy = new Enemy(App.config.enemies[type], this.map.path);
    enemy.sprite.anchor.set(0.5);
    this.container.addChild(enemy.sprite);
    this.units.push(enemy);

    // place it at the starting position on the map
    const start = this.map.path.find(point => point.name === "1");
    enemy.sprite.x = start.x / 2;
    enemy.sprite.y = start.y / 2;

    // start the enemy's movement with a given delay
    window.setTimeout(enemy.move.bind(enemy), this.enemyDelay * i);
}
```

Let's add the `this.enemyDelay` field to the `Enemies` class constructor:

```javascript
const EnemyDelay = 1000;

export class Enemies extends EventEmitter {

    constructor(map) {
        // ...
        this.enemyDelay = EnemyDelay;
    }
    // ...
}
```

Now in the `Game` class we will rewrite the `createEnemies` method and create an `Enemies` class object in it to create a wave of opponents:

```javascript
// Game.js
// ...
createEnemies() {
    this.enemies = new Enemies(this.map);
    this.container.addChild(this.enemies.container);
}
```
