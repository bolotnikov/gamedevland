---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Step 11. Enemies Processing"
description: "Step 11 of the Creating Tower Defense game with PIXI tutorial: Enemies Processing."
seriesTitle: "Creating Tower Defense game with PIXI"
seriesDescription: "Build a tower defense game with PixiJS, tilemaps, enemies, path following, and core gameplay systems."
seriesSlug: "tower-defense"
step: 11
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

Let's add the `checkGameOver` method to the `Game` class. We will restart the game if the player has lost all lives:
```javascript
    checkGameOver() {
        if (this.player.lives <= 0) {
            alert("Game Over!");
            App.scenes.start("Game");
        }
    }
```
