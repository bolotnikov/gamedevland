---
locale: ru
translationKey: tower-defense/waves-of-enemies
title: Шаг 4. Волны врагов
description: 'Шаг 4 руководства по созданию Tower Defense с PIXI: волны врагов.'
seriesTitle: Создание Tower Defense с PIXI
seriesDescription: Создание игры в жанре tower defense с PixiJS, тайловыми картами, врагами, движением по пути и основными игровыми системами.
seriesSlug: tower-defense
step: 4
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

Мы создали врага, движущегося по карте. В игре будут четыре волны врагов. В каждой — заданное число юнитов определённого типа. Начнём с конфигурации волн:

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

Теперь создадим класс, управляющий появлением волн. Создайте `Enemies.js`:

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

- В конструкторе мы создали контейнер для всех спрайтов врагов.
- Объект карты уровня запишем во внутреннее поле `this.map`.
- В `this.units` будем хранить все созданные объекты `Enemy`.
- В `this.config` зададим данные всех запланированных волн из конфигурации.
- Поле `this.index` показывает индекс текущей волны.

Метод `create` создаёт новую волну по текущему индексу. Реализуем его:

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

Получаем конфигурацию нужной волны по индексу и создаём нужное число врагов в цикле через `createEnemy`. Код создания перенесём из `Game.createEnemies` в `Enemies.createEnemy`. Нужно выполнить три шага:

1. Создать врага и сохранить его в объекте класса `Enemies`.
2. Поместить созданный объект в начальную точку карты
3. Запустить движение врага

Выполним эти шаги:

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

Добавим `this.enemyDelay` в конструктор `Enemies`:

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

Перепишем `createEnemies` в `Game`, создавая в нём объект `Enemies` для запуска волны противников:

```javascript
// Game.js
// ...
createEnemies() {
    this.enemies = new Enemies(this.map);
    this.container.addChild(this.enemies.container);
}
```
