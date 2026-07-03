---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Step 12. Earning and spending coins"
description: "Step 12 of the Creating Tower Defense game with PIXI tutorial: Earning and spending coins."
seriesTitle: "Creating Tower Defense game with PIXI"
seriesDescription: "Build a tower defense game with PixiJS, tilemaps, enemies, path following, and core gameplay systems."
seriesSlug: "tower-defense"
step: 12
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
The player will spend coins to build and upgrade towers. And he will earn coins for killing each enemy. The cost of each tower, as well as the reward value for killing an enemy, is indicated in the `towers` and `enemies` configs in `Config.js`.

Let's add processing of expenses and earnings to the corresponding methods of the `Game` class.

1. Let's add an addditional check for the required number of coins and further spending on building and upgrading a tower in the `onTowerPlaceClick` method:

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
