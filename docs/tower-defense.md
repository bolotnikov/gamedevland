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
        "unit1": {
            "id": 246,
            "velocity": 75,
            "hp": 1
        },
        "unit2": {
            "id": 247,
            "velocity": 100,
            "hp": 2
        },
        "unit3": {
            "id": 248,
            "velocity": 125,
            "hp": 3
        },
        "unit4": {
            "id": 249,
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
    const enemy = new Enemy(App.config.enemies.unit1, this.map.path);
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
        this.sprite.interactive = true;
        this.sprite.once("pointerdown", this.onClick, this);
        this.tower = null;
    }

    onClick() {
        App.emit("tower-place-click", this);
    }
}
```
We will pass the tile id to the constructor of this class. The main task of the `TowerPlace` class will be to track the click event on such a tile and fire the event by the application class.


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
            "cooldown": 1000,
            "bullet": {
                "speed": 10,
                "damage": 1
            }
        },
        "tower2": {
            "id": 251,
            "range": 400,
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
    }
}
```
We will pass the config of the current tower as a parameter to the constructor of the `Tower` class.
In addition, we will set the `this.place` field, in which we will place a `towerPlace` object.

Now we can build the tower. To implement the tower construction functionality, we have already provided the `Game.onTowerPlaceClick` method:

```javascript
onTowerPlaceClick(towerPlace) {
    const tower = new Tower(App.config.towers.tower1);
    towerPlace.tower = tower;
    tower.place = towerPlace;
    towerPlace.sprite.addChild(tower.sprite);
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

Let's create a fire zone in the `Tower` class:

1. Draw a circle with a given radius using [PIXI.Graphics](https://pixijs.com/8.x/guides/components/graphics).
2. Add this circle as a child element to the tower tile.

```javascript
export class Tower extends Tile {
    constructor(config) {
        // ...
        this.createArea();
    }

    createArea() {
        this.area = new PIXI.Graphics();
        this.area.beginFill(0xffffff, 0.5);
        this.area.drawCircle(0, 0, this.config.radius);
        this.area.endFill();
        this.sprite.addChild(this.area);
    }
}
```

Now we have specified a transparency level of `0.5` in order to make it more convenient to debug the functionality. When we're done with development, we'll change the transparency value to 0 so that the circle is no longer visible.

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

Now let's implement this algorithm in the `Game.update` method:


```javascript
    update() {
        this.map.towers.forEach(tower => {
            const enemy = this.enemies.units.find(unit => tower.detect(unit));
            if (enemy) {
                console.log("collision", tower, enemy)
            }
        });
    }
```

We will implement the attack itself in the following lessons.
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

Let's add a call to the `rotateToEnemy` method to the `Game.update` method:

```javascript
update() {
    //...
    if (enemy) {
        tower.rotateToEnemy(enemy);
    }
    //...
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

    shoot(enemy) {
        if (this.active) {
            this.active = false;
            const bullet = new Bullet(this, enemy);
            this.bullets.push(bullet);
            this.sprite.parent.addChild(bullet.sprite);
            window.setTimeout(() => this.active = true, this.config.cooldown);
        }
    }
    // ...
}
```
This method also takes as a parameter the enemy object that the tower is firing at.

Additionally, we've added an `active` flag to indicate whether the turret can fire at the moment. The fact is that we will call the `shoot` method immediately after the `rotateToEnemy` method in the `Game.update` class, which in turn is called constantly for each new animation frame. But we want to fire bullets only at a given frequency for a given tower. 

Therefore, in order to implement the cooldown time, we need to turn off the tower activity immediately after the shot and then turn it on after a given timeout. Then we start a timeout with the reload time specified from the tower config, after which we activate the tower again by setting the flag `this.active = true;`

In addition, we will put all the bullets created in the `this.bullets` field so that we can track each bullet created later and check if it collided with any enemy.

And now all that remains is to call the `Tower.shoot` method immediately after rotating the tower in `Game.update`:

```javascript
update() {
    // ...
    tower.rotateToEnemy(enemy);
    tower.shoot(enemy);
    // ...
}
```


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