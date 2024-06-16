# Сreating Tower Defense game with PIXI

In this course we will create a tower defense game using PixiJS.

Before starting the development, we need to make 2 steps:

:one: Download our [PIXI project template](https://github.com/gamedevland/pixi-project-template). You can start working on the game right now or check out [the tutorial](pixi_project_template.md) on how to create a PIXI project template.

:two: Download the tilemap that was created in Tiled

## 1. Creating the tile

So, we downloaded and unpacked our project template, in which we will continue to work.
Usually, the first thing I start developing a new game with is creating a background image on the screen.
In this project, instead of a background image, we will use the entire level map.
We prepared this map in advance in the Tiled program and it has a tilemap format.
This means that the entire map consists of small tiles.
Level data is stored in two files:

- `tilemap.json`
- `tilemap.png`

Let's place them in the appropriate folders in the project:

- `/src/json/tilemap.json`
- `/src/sprites/tilemap.png`

To create a map on the game scene, we first need to learn how to parse the tilemap.png image so that we can draw only the tiles we need.

Let's create a `Tile` class that will be responsible for drawing the section of the map that we need:

``` javascript
import { EventEmitter } from "events";
import * as PIXI from "pixi.js";
import { App } from "../system/App";

export class Tile extends EventEmitter {
    constructor(id) {
        super();
        this.atlas = App.res("tilemap");
        this.id = id;
        this.createSprite();
    }

    createSprite() {
    }
}
```

The `Tile` class will be a child of `EventEmitter` because we want instances of this class to be able to fire the events we need. For example, a tower is a type of `Tile`. The tower may have events that we would like to be able to track in the future.

In the `this.atlas` field we will get the texture of the loaded tilemap asset.
Let each tile have its own ID number in the atlas, by which we can specifically identify the tile by determining its position.
Thus, before we understand how to draw the desired part of the image, let's determine its position by ID.

First, let's manually set the number of rows and columns of our atlas image `tilemap.png` in the game config, and also directly indicate the size of the tiles:

``` javascript

import { Tools } from "../system/Tools";
import { GameScene } from "./GameScene";

export const Config = {
    loader: Tools.massiveRequire(require["context"]('./../../sprites/', true, /\.(mp3|png|jpe?g)$/)),
    scenes: {
        "Game": GameScene
    },
    atlas: {
        cols: 23,
        rows: 13,
        tileSize: 64
    }    
};

```

Now, knowing the total number of rows and columns of the atlas image, we can calculate which row and which column has a tile with a given ID:


``` javascript
    get position() {
        let index = 0;

        for (let row = 0; row < App.config.atlas.rows; row++) {
            for (let col = 0; col < App.config.atlas.cols; col++) {
                ++index;
                if (index === this.id) {
                    return {row, col};
               
               }
            }
        }

        return {row: 0, col: 0};
    }
```

Having defined the tile's row and column in the tilemap grid, we can finally draw it:

``` javascript
    createSprite() {
        const x = App.config.atlas.tileSize * this.position.col;
        const y = App.config.atlas.tileSize * this.position.row;
        const texture = new PIXI.Texture(this.atlas, new PIXI.Rectangle(x + 1, y + 1, App.config.atlas.tileSize - 2, App.config.atlas.tileSize - 2));
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.anchor.set(0.5);
    }
```

We find the desired tile coordinates based on its position in the tilemap grid, taking into account the size of the tile.
Here we're using a 1px offset from each edge of the tile, since our map was generated with that offset to avoid potential frame overlap issues.

Now it remains to check that the tiles are created correctly:


``` javascript
import { Scene } from '../system/Scene';
import { Tile } from './Tile';

export class GameScene extends Scene {
    create() {
        const tile = new Tile(1);
        this.container.addChild(tile.sprite);
    }
}
```

## 2. Creating the level

So we learned how to create a specific tile by its ID. This means we can draw the entire map specified in `tilemap.json`.
Let's create a new class `LevelMap` for this.

1. We will receive the level data from the `tilemap.json` into the `const TilemapJson` variable using the `require` mechanism, reading the contents of the corresponding file.
2. Let's create a container `this.container`, into which we will place the created tile sprites.
3. Let's create a field `this.tiles`, in which we will place all the created tiles.
4. We will implement the map rendering function in the `this.render` method

``` javascript
import * as PIXI from "pixi.js";
import { Tile } from "./Tile";
import { App } from "../system/App";
const TilemapJson = require("../../json/tilemap.json");

export class LevelMap {
    constructor() {
        this.container = new PIXI.Container();
        this.tiles = {};
        this.render();
    }

    render() {
    }
}
```

So, we need to implement the `render` method to render the level map on the game scene.

Let's determine the data that we need to draw the map on the game scene:

1. In `Tiled`, we created a level that consists of an 18 x 32 grid of tiles.
2. In addition, we have created 5 layers on this map.
3. And also in our game we plan to draw tiles 2 times smaller than their original size in the atlas. That is, we will render tiles with a size of 32px instead of 64x.
Let's add this data to the game config:

``` javascript
export const Config = {
    // ...
    level: {
        rows: 18,
        cols: 32,
        layers: 5,
        tileSize: 32
    }
};
```

Please note that in the `level` field we indicate exactly the data related directly to our level. So, our game map consists of an 18 x 32 grid, that is, it has only 18 rows and 32 tiles in each row.
And in the `atlas` field, that we created in the previous step, we store information directly about the `tilemap.png` atlas, which in turn consists of a 23 X 13 grid, where each tile has a tile size of 64px.

We know that our level map contains 5 layers, which we added ourselves when we created the map in the `Tiled`.
This means that we need to iterate through each layer in the generated map and check if any tile is created in that layer at a given position:

``` javascript
    render() {
        for (let layer = 0; layer < App.config.level.layers; layer++) {
            let index = 0;
            const layerData = TilemapJson.layers[layer];
            this.tiles[layerData.name] = [];
        }
    }
```

As you can see, information about the presence of a tile in the grid can be obtained from data about the current layer from `tilemap.json`. Let's save this data in `layerData`.
Let each property of the `this.tiles` object refer to a specific map layer.

If `tilemap.json` contains data for the current layer, then we can find out the tile ID by the `index` counter, which increases by 1 for each next tile checked. Thus, let's loop through all the columns in all the rows of our map, increasing the `index` parameter in each iteration.
This way we find out whether there is a tile in a given position on a given layer.
If there is a tile, then we get its ID:

``` javascript

    render() {
        for (let layer = 0; layer < App.config.level.layers; layer++) {
            let index = 0;
            const layerData = json.layers[layer];
            this.tiles[layerData.name] = [];

            if (layerData.data) {
                for (let row = 0; row < App.config.level.rows; row++) {
                    for (let col = 0; col < App.config.level.cols; col++) {
                        const tileId = TilemapJson.layers[layer].data[index];
                        index++;
                        if (tileId) {
                            const tile = this.renderTile(tileId, row, col);
                            this.tiles[layerData.name].push(tile);

                        }
                    }
                }
            }
        }

    }
}
```

If we found the tile ID at a given position, we can draw it:

``` javascript

    renderTile(id, row, col) {
        let tile = new Tile(id);
        tile.sprite.x = col * App.config.level.tileSize;
        tile.sprite.y = row * App.config.level.tileSize;
        tile.sprite.width = App.config.level.tileSize;
        tile.sprite.height = App.config.level.tileSize;
        this.container.addChild(tile.sprite);
        return tile;
    }
```

When drawing, we use the tile sizes that we want to get in the game. That is, we take data from the `tileSize` field of the `level` object, and not from the `map`. In our case, it is 32px. Taking these dimensions into account, we create the tile in the correct position on the screen with the correct offset. And add the created tile to the container of the `LevelMap` class.

Now we can render the entire map in the `Game` scene:


``` javascript
import { Scene } from '../system/Scene';
import { LevelMap } from './LevelMap';

export class GameScene extends Scene {
    create() {
        this.createMap();
    }
    createMap() {
        this.map = new LevelMap();
        this.container.addChild(this.map.container);
    }
}
```

It is easy to calculate that a grid size of 18x32 taking into account the tile size of 32px will give us a map of 1024 x 576 pixels.

Let's specify this data when creating the pixi canvas in the `App` class:

``` javascript
        this.app = new PIXI.Application({ width: 1024, height: 576});
        this.app.view.style = `width: 1024px; height: 576;`;
```

And now let’s check whether the map is displayed correctly on the screen.

## 3. Creating the enemy
### 3.1 Enemy sprite

Let's create a single enemy in a random location on the map.
We know that enemies tiles are also included in the general atlas `tilemap.png`. Each enemy tile has its own frame number in the atlas. Let's add this data to the general game config:

``` javascript
export const Config = {
    // ...
    enemies: {
        "unit1": 246,
        "unit2": 247,
        "unit3": 248,
        "unit4": 249
    }
};
```

We indicated that in our `tilemap.png` atlas there are 4 frames with indexes 246-249, which correspond to the enemy images.

To render one tile, which is the atlas frame, we have previously developed the `Tile` class. Since the image of an enemy is also a tile, we can create the `Enemy` class, which will be a child of a `Tile` class.
All we need to do is pass the correct frame index to the constructor of the `Tile` base class. And now we can get these numbers from the config:

``` javascript
import { Tile } from "./Tile";
import { App } from "../system/App";

export class Enemy extends Tile {

    constructor(key) {
        super(App.config.enemies[key]);
        this.sprite.anchor.set(0.5);
    }
}

```

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
        const enemy = new Enemy("unit1");
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
We placed such marks on a separate special layer of our tilemap, which is called `path`.
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
When creating an enemy, we must let him know about the points on the map through which he must pass. That is, we will pass the `path` field of the map object to the enemy object:

``` javascript
// ...
export class GameScene extends Scene {
    //...
    createEnemies() {
        const enemy = new Enemy("unit1", this.map.path);
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

    constructor(key, path) {
        super(App.config.enemies[key]);
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
 6. Calculate the duration of the movement based on the distance traveled and the speed taken from the game config
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
        const duration = diff / App.config.enemyVelocity;

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

Let's put the speed value in the game config `Config.js` and check the movement:

```javascript
//...
export const Config = {
    //...
    enemyVelocity: 75
};
```

### 3.3 Setting the angle
Now our enemy is really moving across the entire map from point to point, but he is always facing the same direction. Let's fix this.
Let's make sure that the enemy always faces towards the next point on his path.

To do this, we need the `getAngle` method, which, based on the coordinates of the target point, will return the angle by which the enemy sprite needs to be rotated.
You can get the angle using the function <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2">
`Math.atan2`</a>:

!!! quote "Math.atan2"
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



## 4. Wave of enemies
We have successfully created a single enemy that moves along the map.
Now we can create a wave consisting of a given number of opponents.
Let's create the `Enemies.js` class:

```javascript

import { EventEmitter } from "events";
import * as PIXI from "pixi.js";
import { App } from '../system/App';
import { Enemy } from "./Enemy";

export class Enemies extends EventEmitter {

    constructor(map) {
        super();

        this.container = new PIXI.Container();
        this.map = map;
        this.units = [];
        this.count = App.config.enemiesCount;
        this.create();
    }

    createEnemy(i) {
        // @todo: create single enemy
    }

    create() {
        for (let i = 0; i < this.count; i++) {
            this.createEnemy(i);
        }
    }
}
```

In the constructor we created a container in which we will place all the created enemy sprites.
We write the level map object to the internal field `this.map`.
In the `this.units` field we will store all created objects of the `Enemy` class.
The `this.count` field shows how many enemies need to be created in the wave.
And the `create` method creates all the enemies by calling the `createEnemy` method in a loop.

We can move the enemy creation code from `Game.createEnemies` into the `Enemies.createEnemy` method. We need to perform 3 steps:

1. Create an enemy object and store it in the `this.units` field of the `Enemies` class.
2. Place the created object at the starting point on the map
3. Start the movement of the enemy object

Let's do these steps:

```javascript
// Enemies.js
// ...
createEnemy(i) {
    // create a new enemy
    const enemy = new Enemy("unit1", this.map.path);
    enemy.sprite.anchor.set(0.5);
    this.container.addChild(enemy.sprite);
    this.units.push(enemy);

    // place it at the starting position on the map
    const start = this.map.path.find(point => point.name === "1");
    enemy.sprite.x = start.x / 2;
    enemy.sprite.y = start.y / 2;

    // start the enemy's movement with a given delay
    window.setTimeout(() => enemy.move(), 1000 * i);
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
