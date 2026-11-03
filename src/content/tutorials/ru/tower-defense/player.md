---
locale: ru
translationKey: tower-defense/player
title: Шаг 9. Игрок
description: 'Шаг 9 руководства по созданию Tower Defense с PIXI: игрок.'
seriesTitle: Создание Tower Defense с PIXI
seriesDescription: Создание игры в жанре tower defense с PixiJS, тайловыми картами, врагами, движением по пути и основными игровыми системами.
seriesSlug: tower-defense
step: 9
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

Класс игрока хранит доступное число монет и оставшиеся жизни:

```javascript
import { App } from "../system/App";

export class Player {
    constructor() {
        this.coins = App.config.player.coins;
        this.lives = App.config.player.lives;
    }
}
```

Начальные значения запишем в конфигурацию:

```javascript
export const Config = {
    // ...
    player: {
        coins: 200,
        lives: 5
    }
};
```

Создадим игрока в классе `Game`:

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
