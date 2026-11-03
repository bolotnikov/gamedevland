---
locale: ru
translationKey: tower-defense/earning-and-spending-coins
title: Шаг 12. Заработок и трата монет
description: 'Шаг 12 руководства по созданию Tower Defense с PIXI: заработок и трата монет.'
seriesTitle: Создание Tower Defense с PIXI
seriesDescription: Создание игры в жанре tower defense с PixiJS, тайловыми картами, врагами, движением по пути и основными игровыми системами.
seriesSlug: tower-defense
step: 12
readingTime: 2 минуты чтения
steps:
  - step: 1
    slug: ''
    title: Создание тайла
  - step: 2
    slug: creating-the-level
    title: Создание уровня
  - step: 3
    slug: creating-the-enemy
    title: Создание врага
  - step: 4
    slug: waves-of-enemies
    title: Волны врагов
  - step: 5
    slug: creating-a-tower
    title: Создание башни
  - step: 6
    slug: preparation-for-shooting
    title: Подготовка к стрельбе
  - step: 7
    slug: shooting
    title: Стрельба
  - step: 8
    slug: enemy-damage
    title: Урон врагу
  - step: 9
    slug: player
    title: Игрок
  - step: 10
    slug: ui
    title: Интерфейс
  - step: 11
    slug: enemies-processing
    title: Обработка врагов
  - step: 12
    slug: earning-and-spending-coins
    title: Заработок и трата монет
---

Игрок тратит монеты на строительство и улучшение башен, а получает их за убийство врагов. Стоимость башен и награда за врага указаны в конфигурациях `towers` и `enemies` файла `Config.js`.

Добавим обработку расходов и доходов в соответствующие методы `Game`.

1. В `onTowerPlaceClick` добавим проверку наличия нужного числа монет и их списание при строительстве и улучшении башни:

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

2. Также выдадим игроку награду за убийство врага в `processEnemyBulletCollision`:

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

Интерфейс уже постоянно обновляется в `Game.update`, поэтому отдельно перерисовывать его после каждого такого действия не нужно.
