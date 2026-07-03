---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Step 5. Creating a tower"
description: "Step 5 of the Creating Tower Defense game with PIXI tutorial: Creating a tower."
seriesTitle: "Creating Tower Defense game with PIXI"
seriesDescription: "Build a tower defense game with PixiJS, tilemaps, enemies, path following, and core gameplay systems."
seriesSlug: "tower-defense"
step: 5
readingTime: "3 min read"
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

While creating tiles in the `LevelMap` class, we need to check which class needs to be created for the current tile: base class `Tile` or special class `TowerPlace`, if the current tile is specified by one of the identifiers specified earlier in the config.
A factory pattern is the best option for this task.

Let's create the `TileFactory` class. In this class we implement the static method `create`. In this method we will take the id of the tile as a parameter.
If a special class is specified for a given tile id in the game config, then we will create an instance of this class. Otherwise, let's create an instance of the base class `Tile`:

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

Now let's update the first line of the code in the `LevelMap.renderTile` method in that way that instead of directly creating a base `Tile` class, we use a factory:

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
In addition, we've added all the necessary data for each tower:
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
In addition, we will set the `this.place` field, in which we will place a `towerPlace` object. We've also added `this.active` flag, indicating that this tower can fire immediately and is not in a reloading mode.

Now we can build the tower. Each click on a tower place tile will build a higher level tower on that place. To implement the tower construction functionality, we have the `Game.onTowerPlaceClick` method. And to build a tower we must do the following:

1. Increase the tower level for a selected `towerPlace` object.
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
