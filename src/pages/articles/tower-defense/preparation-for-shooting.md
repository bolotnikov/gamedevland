---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Step 6. Preparation for shooting"
description: "Step 6 of the Creating Tower Defense game with PIXI tutorial: Preparation for shooting."
seriesTitle: "Creating Tower Defense game with PIXI"
seriesDescription: "Build a tower defense game with PixiJS, tilemaps, enemies, path following, and core gameplay systems."
seriesSlug: "tower-defense"
step: 6
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
Now that there are both enemies and towers in the game, we can move on to creating the functionality for shooting at enemies.

### 6.1 Tower coverage

Let's define how the tower will attack the enemy.

First, the enemy must get into the tower's firing range. If enemies enter such a zone, the tower will be able to detect them and begin an attack.
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

We will also need a separate `this.collisions` container in the `Game` class, which we will create at the very beginning and add it as the very first child for the `Game` container. Besides, we will add all created tower zones as child elements to this container. We do this in order to hide the zone images themselves under the map layer.

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
    - find the first unit that fell into the tower fire zone
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

Since the tower sprite is a child sprite of the tower place tile, we must get the coordinates of the tower place tile as coordinates. Therefore we get the source coordinates from the parent sprite:
- `this.sprite.parent.x`
- `this.sprite.parent.y`

Please note that in our atlas `tilemap.png` the tower tiles are rotated 90 degrees relative to the unit tiles. As a result we add 90 degrees to the resulting value before returning the result of the `getAngleByTarget` function.

Let's modify `attack` method in the `Tower` class:

```javascript
// Tower.js
attack(enemy) {
    this.rotateToEnemy(enemy);
}
```
