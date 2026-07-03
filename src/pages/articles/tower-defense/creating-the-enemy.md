---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Step 3. Creating the enemy"
description: "Step 3 of the Creating Tower Defense game with PIXI tutorial: Creating the enemy."
seriesTitle: "Creating Tower Defense game with PIXI"
seriesDescription: "Build a tower defense game with PixiJS, tilemaps, enemies, path following, and core gameplay systems."
seriesSlug: "tower-defense"
step: 3
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
### 3.1 Enemy sprite

Let's create a single enemy in a random location on the map.
We know that enemy tiles are also included in the general atlas `tilemap.png`. Each enemy tile has its own frame number in the atlas. Let's add this data to the general game config:

``` javascript
export const Config = {
    // ...
    enemies: {
        "unit1": {
            "id": 246,
            "coins": 20,
            "velocity": 75,
            "hp": 1
        },
        "unit2": {
            "id": 247,
            "coins": 30,
            "velocity": 100,
            "hp": 2
        },
        "unit3": {
            "id": 248,
            "coins": 40,
            "velocity": 125,
            "hp": 3
        },
        "unit4": {
            "id": 249,
            "coins": 50,
            "velocity": 150,
            "hp": 4
        }
    }
};
```

Thus, each enemy unit receives its own config, which distinguishes it from all other units. In this case, we set the following parameters in the config of each unit:
- frame id in tilemap
- movement speed
- health
- the reward amount for killing

To render one tile, which is the atlas frame, we have previously developed the `Tile` class. Since the image of an enemy is also a tile, we can create the `Enemy` class, which will be a child of a `Tile` class.
All we need to do is to pass the correct frame index to the constructor of the `Tile` base class. And now we can get these numbers from the config:

``` javascript
import { Tile } from "./Tile";
import { App } from "../system/App";

export class Enemy extends Tile {
    constructor(config, path) {
        super(config.id);
        this.config = config;
        this.sprite.anchor.set(0.5);
    }
}

```
As a result we pass the config of the enemy unit to the constructor of the `Enemy` class.
Using the id from the config, we get the required tile.
We save the unit config in the `this.config` field for further special unit parameters receiving.

Now let's create an enemy in a random location on the map in the `Game` class:

``` javascript
// ...
import { Enemy } from './Enemy';

export class GameScene extends Scene {
    create() {
        this.createMap();
        this.createEnemies();
    }
    createEnemies() {
        const enemy = new Enemy(App.config.enemies.unit1);
        this.container.addChild(enemy.sprite);
        enemy.sprite.x = 130;
        enemy.sprite.y = 530;
    }
    // ...
}
```

### 3.2 Enemy movement

Now let's implement the movement of the newly created enemy.
The enemy should be moving along the road on our level map.
When we created our map in `Tiled`, we set special points on the road that indicates the direction of the enemies.
These points are markers through which enemies must pass, moving from one point to the next and so on until they reach the last one.
We placed such marks on a special separate layer of our tilemap, which is called `path`.
There is no `data` field in this layer, since there are no tiles on it. Instead, on this layer in the `objects` field there are points with map coordinates.
Let's put this data in the `this.path` field of the `LevelMap` class:

``` javascript
//...
export class LevelMap {
    constructor() {
        // ...
        this.path = {};
    }

    render() {
        //...
        if (layerData.data) {
            //...
        } else if (layerData.objects) {
            this.path = layerData.objects;
        }
    }
}
``` 
When creating an enemy, we must let him know about the points on the map through which he must pass. We will pass the `path` field of the map object to the enemy object:

``` javascript
// ...
export class GameScene extends Scene {
    //...
    createEnemies() {
        const enemy = new Enemy(App.config.enemies.unit1, this.map.path);
        // ...
        enemy.move();
    }
}
``` 
Here we also immediately called the `move` method, which should start an animation of the enemy moving around the map. Now let's implement this method in the `Enemy` class.

1. Save the `path` object of the map in a `this.path` field of the `Enemy` class.
2. Add the index number of the current point: the `pathIndex` field will show which point the enemy passed last.

``` javascript
//...
export class Enemy extends Tile {

    constructor(config, path) {
        super(config.id);
        this.config = config;
        this.sprite.anchor.set(0.5);
        this.pathIndex = 1;
        this.path = path;
    }
    //...
}
``` 
The `getNextPoint` method will return the enemy's current target based on the number of the point the enemy last passed.
So, knowing the number of the point that the enemy just passed, he can get the next point to move to in the movement animation:

``` javascript
    //...
    getNextPoint() {
        const nextPoint = this.pathIndex + 1;

        return this.path.find(point => point.name === nextPoint.toString());
    }
    //...
    
```
Now we can fully implement the `move` method, which will launch an animation of the enemy moving between points. To do this, we need to develop the following algorithm:

 1. Get the next point to move to
 2. Increase the value of the `pathIndex` field, indicating the next point passed
 3. Get the current coordinates of the enemy sprite
 4. Get the coordinates of the target to which you want to move
 5. Calculate the distance between the target and the current position of the enemy
 6. Calculate the duration of the movement based on the distance traveled and the speed taken from the unit config
 7. Run a motion animation using `gsap`
 8. When the motion animation is finished, restart the `move` method to start moving to the next point

Let's implement this algorithm:

``` javascript
    move() {
        // get the next point
        const point = this.getNextPoint();
        if (!point) {
            // if there is no such thing, then there is nowhere to move
            return;
        }
        //increase the index of the last point passed
        ++this.pathIndex;

        // current coordinates
        const sourceX = this.sprite.x;
        const sourceY = this.sprite.y;

        // target coordinates
        const targetX = point.x / 2;
        const targetY = point.y / 2;

        // distance between target and current position
        const diffX = Math.abs(targetX - sourceX);
        const diffY = Math.abs(targetY - sourceY);
        const diff = Math.max(diffX, diffY);

        // duration of movement
        const duration = diff / this.config.velocity;

        // movement animation
        gsap.to(this.sprite, {
            onComplete: () => {
                // repeat the process for the next point
                this.move();
            },
            pixi: { x: point.x / 2, y: point.y / 2 },
            duration,
            ease: "none",
          });

    }
}
``` 

### 3.3 Setting the angle
Now our enemy is really moving across the entire map from point to point, but he is always facing the same direction. Let's fix this.
Let's make sure that the enemy always faces towards the next point on his path.

Let's create the `getAngle` method. It will return the angle for the enemy sprite rotation based on the target point coordinates.
You can get the angle using the function <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2">
`Math.atan2`</a>:

**Math.atan2**
The Math.atan2() static method returns the angle in the plane (in radians) between the positive x-axis and the ray from (0, 0) to the point (x, y), for Math.atan2(y, x).


Since this method returns the angle in radians, let's convert it to degrees:

```javascript
// Enemy.js
getAngle(target) {
    const sourceX = this.sprite.x;
    const sourceY = this.sprite.y;

    const dy = target.y - sourceY;
    const dx = target.x - sourceX;
    return 180 * Math.atan2(dy, dx) / Math.PI; 
}
```

Now we can call this angle in the move method before starting the motion animation:

```javascript
// Enemy.js
move() {
    //...
    this.sprite.angle = this.getAngle({x: targetX, y: targetY});
}
```
