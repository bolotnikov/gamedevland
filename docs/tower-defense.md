# Сreating Tower Defense game with PIXI

In this course we will create a tower defense game using PixiJS.

## Additional materials
- [Complete source code](https://github.com/gamedevland/tower-defense)
- [Preview demo](https://gamedevland.github.io/tower-defense/)
- [Sprites](https://github.com/gamedevland/tower-defense/tree/main/src/sprites)
- [Tilemap json](https://github.com/gamedevland/tower-defense/blob/main/src/json/tilemap.json)

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
All we need to do is pass the correct frame index to the constructor of the `Tile` base class. And now we can get these numbers from the config:

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
Thus, we pass the config of the enemy unit to the constructor of the `Enemy` class.
Using the id from the config, we get the required tile.
We save the unit config in the `this.config` field for further receiving special unit parameters.

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



## 4. Waves of enemies
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

- In the constructor we created a container in which we will place all the created enemy sprites.
- We write the level map object to the internal field `this.map`.
- In the `this.units` field we will store all created objects of the `Enemy` class.
- In the `this.config` field we set data about all planned waves of enemies from the config.
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

## 5. Creating a tower
Now we have enemies in the level, which means it's time to create towers that will shoot at these enemies. 

### 5.1 Tower place
On our map we have special places where we can build a tower. We defined such places as special tiles in `tilemap` on a separate layer called `towers`. 

Let's explicitly list which tiles are places for the tower. Tilemap frames with serial numbers `42` and `111` are tiles of tower locations. For such tiles, we will specify a special class in the config, which will be a child of the `Tile` class:

```javascript
export const Config = {
    // ...
    tiles: {
        42: TowerPlace,
        111: TowerPlace
    }
}
```

Now let's create the `TowerPlace` class:

```javascript
import { App } from "../system/App";
import { Tile } from "./Tile";

export class TowerPlace extends Tile {

    constructor(id) {
        super(id)
        this.level = 0;
        this.sprite.interactive = true;
        this.sprite.once("pointerdown", this.onClick, this);
        this.tower = null;
    }

    onClick() {
        App.emit("tower-place-click", this);
    }
}
```
We will pass the tile id to the constructor of this class. 

The `this.level` field will indicate what level the tower is currently built at this location. Accordingly, `this.level = 0;` means that there is currently no tower at this place.

The `this.tower` property will store the object of the tower built at that place.

The main task of the `TowerPlace` class will be to track the click event on such a tile and fire the event by the application class.


Let's extend `Application` class from the `EventEmitter` class of the `events` library to be able to emit and listen for the events:

```javascript
import { EventEmitter } from "events";

class Application extends EventEmitter {
    // ...
}
```

Now, when creating tiles in the `LevelMap` class, we somehow need to check which class needs to be created for the current tile: base class `Tile` or special class `TowerPlace`, if the current tile is specified by one of the identifiers specified earlier in the config.
A factory pattern is the best option for this task.

Let's create the `TileFactory` class. In this class we implement the static method `create`. In this method we will take the id of the tile as a parameter.
If for a given tile id a special class is specified in the game config, then we will create an instance of this class. Otherwise, let's create an instance of the base class `Tile`:

```javascript
import { App } from "../system/App";
import { Tile } from "./Tile";

export class TileFactory {

    static create(id) {
        const tileClass = App.config.tiles[id];

        if (tileClass) {
            return new tileClass(id);
        }

        return new Tile(id);
    }
}
```

Now let's update the first line of code in the `LevelMap.renderTile` method so that instead of directly creating a base `Tile` class, we use a factory:

```javascript
renderTile(id, row, col) {
    const tile = TileFactory.create(id);
    // ...
}
```

And finally, in the `Game` class we will add an event handler for the tower's place click:

```javascript
export class GameScene extends Scene {
    create() {
        // ...
        this.setEvents();
    }

    setEvents() {
        App.on("tower-place-click", this.onTowerPlaceClick.bind(this));
    }

    onTowerPlaceClick(towerPlace) {
        console.log("tower place click", towerPlace);
    }
```

### 5.2 Tower construction

Towers are represented by tiles with serial numbers `250` and `251`. Let's add this data to the game config:

```javascript
export const Config = {
    // ...
    towers: {
        "tower1": {
            "id": 250,
            "range": 300,
            "coins": 100,
            "cooldown": 1000,
            "bullet": {
                "speed": 10,
                "damage": 1
            }
        },
        "tower2": {
            "id": 251,
            "range": 400,
            "coins": 200,
            "cooldown": 500,
            "bullet": {
                "speed": 15,
                "damage": 2
            }
        }
    }
}
```
In addition, we added all the necessary data for each tower:
- `coins` - construction cost
- `range` - radius of the coverage area
- `cooldown` - reloading time
- `bullet` - speed and damage from tower's bullets

Let's inherit the `Tower` class from the `Tile` class:

```javascript
import { Tile } from "./Tile";

export class Tower extends Tile {
    constructor(config) {
        super(config.id);
        this.config = config;
        this.place = null;
        this.active = false;
    }
}
```
We will pass the config of the current tower as a parameter to the constructor of the `Tower` class.
In addition, we will set the `this.place` field, in which we will place a `towerPlace` object. We also added `this.active` flag, indicating that this tower can fire at the moment and is not in reloading mode.

Now we can build the tower. Each click on a tower place tile will build a higher level tower on that place. To implement the tower construction functionality, we have the `Game.onTowerPlaceClick` method. And to build a tower we must do the following:

1. Increase the tower level for selected `towerPlace` object.
2. Find a tower in the config with the same level as the selected `towerPlace` object.
3. If there is such a tower, create a new tower object and save it in the `towerPlace` object. 
4. If a tower has already been built in a given place, then destroy its sprite.

```javascript
onTowerPlaceClick(towerPlace) {
    ++towerPlace.level;

    const towerConfig = App.config.towers["tower" + towerPlace.level];

    if (towerConfig) {
        if (towerPlace.tower) {
            towerPlace.tower.sprite.destroy();
        }

        const tower = new Tower(towerConfig);
        towerPlace.tower = tower;
        tower.place = towerPlace;
        towerPlace.sprite.addChild(tower.sprite);
    }
}
```

Having built the tower, we will save a reference to it in the `towerPlace` object, and also save a reference to the `towerPlace` object in the `tower` itself.
To display the tower on the level map, add a tower tile sprite as a child of the tower place sprite.

## 6. Preparation for shooting

Now that there are both enemies and towers in the game, we can move on to creating the functionality for shooting at enemies.

### 6.1 Tower coverage

How will the tower attack the enemy?

First, the enemy must get into the tower's firing range. If enemies enter such a zone, the tower will be able to detect them and begin attack.
We have already set the range of the firing zone in the tower config. Since a zone is a circle with a given radius, we can use the class
[PIXI.Graphics](https://pixijs.com/8.x/guides/components/graphics) to draw such a circle.

Let's create a fire zone in the `Tower` class. Draw a circle with a given radius in a tower global coordinates using [PIXI.Graphics](https://pixijs.com/8.x/guides/components/graphics).

```javascript
export class Tower extends Tile {
    // ...
    createArea() {
        this.area = new PIXI.Graphics();
        this.area.beginFill(0xffffff, 1);
        this.area.drawCircle(this.sprite.getGlobalPosition().x, this.sprite.getGlobalPosition().y, this.config.range);
        this.area.endFill();
    }
}
```

Next, call this method in the `Game` class when creating a tower:

```javascript
export class GameScene extends Scene {
    create() {
        this.createCollisionsContainer();
        // ...
    }

    createCollisionsContainer() {
        this.collisions = new PIXI.Container();
        this.container.addChild(this.collisions);
    }

    onTowerPlaceClick(towerPlace) {
        // ...
        tower.createArea();
        this.collisions.addChild(tower.area);
    }
```

We will also need a separate `this.collisions` container in the `Game` class, which we will create at the very beginning and add it as the very first children for the `Game` container. We will add all created tower zones as child elements to this container. We do this in order to hide the zone images themselves under the map layer.

### 6.2 Enemy Detection
Now we can check that the enemy is in the created firing zone.

First, let's implement the `Tower.detect` method:

```javascript
detect(enemy) {
    if (enemy.sprite) {
        return this.area.containsPoint(new PIXI.Point(enemy.sprite.x, enemy.sprite.y));
    }
    return false;
}
```

Here we use the [containsPoint](https://pixijs.download/v4.8.2/docs/PIXI.Graphics.html#containsPoint) method of the [PIXI.Graphics](https://pixijs.com/8.x/guides/components/graphics), passing it the enemy coordinates as a parameter and thus checking whether these coordinates belong to the current zone or not.

We must call this method constantly throughout the game to check the visibility of opponents in real time.

To do this, in the `Game` class we will use the capabilities of (PIXI.Ticker)[https://pixijs.download/v7.0.5/docs/PIXI.Ticker.html] to constantly call the `update` method on each new animation frame:

```javascript
    setEvents() {
        App.on("tower-place-click", this.onTowerPlaceClick.bind(this));
        App.app.ticker.add(this.update, this);
    }

    update() {
    }
```

Let's write down the algorithm of actions we need in this method to check the detection of opponents by towers:

- for each tower created at the level
    - find the first unit that fell into the tower’s fire zone
        - if such a unit is found, we attack it

Now let's implement this algorithm in the `processTowerAttackEnemies` method in the `Game` class and call this methid in the `update`:


```javascript
    processTowerAttackEnemies() {
        this.map.towers.forEach(tower => {
            const enemy = this.enemies.units.find(unit => tower.detect(unit));

            if (enemy) {
                tower.attack(enemy);
            }
        });
    }

    update() {
        this.processTowerAttackEnemies();
    }
```

We will implement the attack itself in the following lessons. For now, let's leave the `Tower.attack` method empty:
```javascript
// Tower.js
attack() {}
```
Currently we get all created towers from the `this.map.towers` object.
This means we need to implement this getter in the `LevelMap` class.
Getting all created towers is simple:

- get all the tiles from the towers layer - these are places for towers:

```javascript
const towerPlaces = this.tiles["towers"];
```

- filter out those places where the towers are actually built:

```javascript
const towerPlacesWithTowers = towerPlaces.filter(towerPlace => towerPlace.tower);
```

- get the towers with the `Array.prototype.map` function:

```javascript
towerPlacesWithTowers.map(towerPlace => towerPlace.tower);
```

As a result, all these actions can be written in one line:

```javascript
    get towers() {
        return this.tiles["towers"].filter(towerPlace => towerPlace.tower).map(towerPlace => towerPlace.tower);
    }
```

### 6.3 Tower rotation

Let's turn the tower towards the enemy we need to shoot at.
To do this, we need to get the angle by which we want to rotate the tower sprite. We have already done a similar mechanism in the `Enemy` class, when we implemented a unit turn towards the next point on its path.
Let's move this code into the `Tower` class:


```javascript
    getAngleByTarget(targetPosition) {
        const x = targetPosition.x - this.sprite.parent.x;
        const y = targetPosition.y - this.sprite.parent.y;
        return 180 * Math.atan2(y, x) / Math.PI + 90;
    }

    rotateToEnemy(enemy) {
        this.sprite.angle = this.getAngleByTarget({x: enemy.sprite.x, y: enemy.sprite.y});
    }
```

Since the tower sprite is a child sprite of the tower place tile, we must get the coordinates of the tower place tile as coordinates. Therefore, in this case we get the source coordinates from the parent sprite:
- `this.sprite.parent.x`
- `this.sprite.parent.y`

Please note that in our atlas `tilemap.png` the tower tiles are rotated 90 degrees relative to the unit tiles. Therefore, we add 90 degrees to the resulting value before returning the result of the `getAngleByTarget` function.

Let's modify `attack` method in the `Tower` class:

```javascript
// Tower.js
attack(enemy) {
    this.rotateToEnemy(enemy);
}
```

## 7. Shooting
### 7.1 Creating a bullet

The towers will shoot bullets at enemies. The bullet in our game is represented by the `fire.png` sprite. Let's create a `Bullet` class that will create a bullet for a given tower:

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

Let's extend this class from the `EventEmitter` class to be able to send bullet events. For example, in the future we will need to know about the moment when a bullet is destroyed (either when it hits an enemy or when it goes off the edge of the screen), at which we will trigger the corresponding event.

Let's pass into the `Bullet` constructor the objects of the tower from which the shooting is made, as well as the enemy at whom the bullet was fired.

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
This method also takes as a parameter the enemy object that the tower is firing at. In addition, we will put all the bullets created in the `this.bullets` field so that we can track each bullet created later and check if it collided with any enemy.


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

Now that we can track the bullet's destruction event, we'll modify the `Tower.shoot` method and remove the destroyed bullet from the tower's bullet pool:

```javascript
shoot(enemy) {
    // ...
    bullet.once("removed", () => this.bullets = this.bullets.filter(item => item !== bullet));
}
```

## 8 Enemy damage
### 8.1 Collision with a bullet
If the bullet sprite comes into contact with the enemy sprite, it is necessary to destroy the bullet and apply damage to the enemy unit. Let's start by tracking sprite collisions.

In the new `processEnemyBulletCollision` method, we will loop through all the bullets of each tower and for each bullet we will check if there is at least one enemy that this bullet collided with:

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

## 9. Player

The player class will store information about the available number of coins and the number of lives remaining:

```javascript
import { App } from "../system/App";

export class Player {
    constructor() {
        this.coins = App.config.player.coins;
        this.lives = App.config.player.lives;
    }
}
```

We will write the initial values ​​in the config:

```javascript
export const Config = {
    // ...
    player: {
        coins: 200,
        lives: 5
    }
};
```

Let's create a player in the `Game` class:

```javascript
import { Player } from './Player';

export class GameScene extends Scene {
    create() {
        this.createPlayer();
        // ...
    }

    createPlayer() {
        this.player = new Player();
    }
    // ...
}
```

## 10. UI

Now that we have data about the player's available coins and lives, we can display it on the screen. Our `UI` will consist of the following elements:

- lives icon - sprite `heart.png`
- coin icon - sprite `coin.png`
- text with the number of coins
- text with the number of lives

So let's create the `UI` class with the listed elements:

```javascript

import * as PIXI from "pixi.js";
import { App } from "../system/App";

export class UI {
    constructor(player) {
        this.player = player;
        this.container = new PIXI.Container();
        this.config = App.config.ui;
        this.create();
        this.update();
    }

    createCoinsIcon() {
        this.coins = App.sprite("coin");
        this.coins.anchor.set(0.5);
        this.coins.x = this.config.coinsIcon.x;
        this.coins.y = this.config.coinsIcon.y;
        this.container.addChild(this.coins);
    }

    createLivesIcon() {
        this.lives = App.sprite("heart");
        this.lives.anchor.set(0.5);
        this.lives.x = this.config.livesIcon.x;
        this.lives.y = this.config.livesIcon.y;
        this.container.addChild(this.lives);
    }

    createCoinsText() {
        this.coinsText = new PIXI.Text(this.player.coins.toString(), {fill: 0xffffff});
        this.coinsText.x = this.config.coinsText.x;
        this.coinsText.y = this.config.coinsText.y;
        this.container.addChild(this.coinsText);
    }
    createLivesText() {
        this.livesText = new PIXI.Text(this.player.lives.toString(), {fill: 0xffffff});
        this.livesText.x = this.config.livesText.x;
        this.livesText.y = this.config.livesText.y;
        this.container.addChild(this.livesText);
    }

    create() {
        this.createCoinsIcon();
        this.createCoinsText();
        this.createLivesIcon();
        this.createLivesText();
    }

    update() {
        this.coinsText.text = this.player.coins.toString();
        this.livesText.text = this.player.lives.toString();
    }
}

```

A player object was passed to the `UI` class `constructor` and this way we can display the current values ​​of `coins` and `lives` in the `update` method.

Let's place UI in the upper left corner of the screen, setting values ​​for the position of all elements in the config:


```javascript
export const Config = {
    // ...
    ui: {
        coinsIcon: {
            x: 50,
            y: 40
        },
        coinsText: {
            x: 90,
            y: 30
        },
        livesIcon: {
            x: 50,
            y: 100
        },
        livesText: {
            x: 90,
            y: 90
        }
    },
    player: {
        coins: 200,
        lives: 5
    }
};
```
And finally, let's create an instance of `UI` in the `Game` class:

```javascript
export class GameScene extends Scene {
    create() {
        // ...
        this.createUI();
    }

    createUI() {
        this.ui = new UI(this.player);
        this.container.addChild(this.ui.container);
    }
    // ...
}
```

## 11. Enemies Processing

Units that were able to reach the last point on the path should take one life from the player and disappear from the game. Let's add a call to the `processCompletedEnemies` method at the beginning of the `update` method in the `Game` class:

```javascript
    processCompletedEnemies() {
        const enemy = this.enemies.units.find(enemy => enemy.isOutOfTheScreen);

        if (enemy) {
            enemy.remove();
            --this.player.lives;
            this.checkGameOver();
        }
    }
    update() {
        this.processCompletedEnemies();
        // ...
    }
```

Let's implement the `isOutOfTheScreen` getter:

```javascript
    get isOutOfTheScreen() {
        if (this.pathIndex === this.path.length) {
            let point = this.sprite.getGlobalPosition();

            if (point.x < 0 ||point.x > App.app.view.width) {
                return true;
            }
        }


        return false;
    }
```

Here we make sure to check whether the enemy unit has reached its final point:
```javascript
this.pathIndex === this.path.length
```

And if the final point is reached, then it is enough to check the positions using one of the sprite coordinates.

Let's add the `checkGameOver` method to the `Game` class. In it we will restart the game if the player has lost all lives:
```javascript
    checkGameOver() {
        if (this.player.lives <= 0) {
            alert("Game Over!");
            App.scenes.start("Game");
        }
    }
```

## 12. Earning and spending coins
The player will spend coins to build and upgrade towers. And he will earn coins for killing each enemy. The cost of each tower, as well as the reward value for killing an enemy, are indicated in the `towers` and `enemies` configs in `Config.js`.

Let's add processing of expenses and earnings to the corresponding methods of the `Game` class.

1. Let's add an addditional check for the required number of coins and further spending for building and upgrading a tower in the `onTowerPlaceClick` method:

```javascript
onTowerPlaceClick(towerPlace) {
    const towerConfig = App.config.towers["tower" + (towerPlace.level + 1)];

    if (!towerConfig) {
        return;
    }

    if (this.player.coins < towerConfig.coins) {
        return;
    }

    this.player.coins -= towerConfig.coins;
    ++towerPlace.level;
    // ...
}
```

2. We will also give the player a reward for killing an enemy unit in the `processEnemyBulletCollision` method:

```javascript
processEnemyBulletCollision() {
    // ...
    enemy.addDamage(bullet.damage);
    if (enemy.hp <= 0) {
        this.player.coins += enemy.config.coins;
    }
    // ...
}
```

Since our UI is already constantly updated in the `Game.update` method, we do not need to additionally redraw the UI for each such action.