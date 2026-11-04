---
locale: ru
translationKey: tower-defense/creating-the-enemy
title: Шаг 3. Создание врага
description: 'Шаг 3 руководства по созданию Tower Defense с PIXI: создание врага.'
seriesTitle: Создание Tower Defense с PIXI
seriesDescription: Создание игры в жанре tower defense с PixiJS, тайловыми картами, врагами, движением по пути и основными игровыми системами.
seriesSlug: tower-defense
step: 3
readingTime: 4 минуты чтения
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

<a id="31-enemy-sprite" class="translation-anchor" aria-hidden="true"></a>

### 3.1. Спрайт врага

Создадим одного врага в случайном месте карты. Тайлы врагов входят в общий атлас `tilemap.png`; у каждого есть свой номер кадра. Добавим эти данные в общую конфигурацию игры:

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

Так каждый тип врага получает собственную конфигурацию, отличающую его от остальных. Зададим следующие параметры:
- id кадра в tilemap
- скорость движения
- здоровье
- награда за убийство

Для вывода одного тайла — кадра атласа — у нас уже есть класс `Tile`. Изображение врага тоже является тайлом, поэтому создадим `Enemy`, наследующийся от `Tile`. Нужно передать правильный индекс кадра в конструктор базового класса. Теперь эти номера можно взять из конфигурации:

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
В конструктор `Enemy` передаём конфигурацию врага. По id получаем нужный тайл. Сохраняем конфигурацию в `this.config`, чтобы затем читать особые параметры врага.

Создадим врага в случайном месте карты в классе `Game`:

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

<a id="32-enemy-movement" class="translation-anchor" aria-hidden="true"></a>

### 3.2. Движение врага

Реализуем движение созданного врага. Он должен идти по дороге карты уровня. При создании карты в `Tiled` мы задали на дороге специальные точки направления. Враги проходят их последовательно до последней. Эти метки находятся на отдельном слое `path`. В нём нет поля `data`, поскольку на слое нет тайлов. Вместо него поле `objects` содержит точки с координатами карты. Сохраним эти данные в `this.path` класса `LevelMap`:

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
При создании врага нужно сообщить ему точки маршрута. Передадим поле `path` объекта карты объекту врага:

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
Здесь мы сразу вызвали `move`, который должен запустить анимацию движения врага по карте. Теперь реализуем его в классе `Enemy`.

1. Сохраним объект маршрута `path` в поле `this.path` класса `Enemy`.
2. Добавим номер текущей точки: поле `pathIndex` покажет, какую точку враг прошёл последней.

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
Метод `getNextPoint` вернёт текущую цель врага по номеру последней пройденной точки. Зная её номер, враг получает следующую точку для анимации движения:

``` javascript
    //...
    getNextPoint() {
        const nextPoint = this.pathIndex + 1;

        return this.path.find(point => point.name === nextPoint.toString());
    }
    //...
    
```
Теперь полностью реализуем `move`, запускающий анимацию перемещения между точками. Для этого нужен такой алгоритм:

 1. Получить следующую точку движения
 2. Увеличить `pathIndex`, обозначающий очередную пройденную точку
 3. Получить текущие координаты спрайта врага
 4. Получить координаты цели движения
 5. Вычислить расстояние между целью и текущей позицией врага
 6. Вычислить длительность движения по расстоянию и скорости из конфигурации юнита
 7. Запустить анимацию движения через `gsap`
 8. После завершения анимации снова вызвать `move` для движения к следующей точке

Реализуем этот алгоритм:

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

<a id="33-setting-the-angle" class="translation-anchor" aria-hidden="true"></a>

### 3.3. Установка угла
Враг уже проходит всю карту от точки к точке, но всегда смотрит в одну сторону. Исправим это: пусть он поворачивается к следующей точке маршрута.

Создадим `getAngle`, возвращающий угол поворота спрайта по координатам целевой точки. Угол можно получить функцией <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2"> `Math.atan2`</a>:

**Math.atan2** Статический метод Math.atan2(y, x) возвращает угол на плоскости в радианах между положительной полуосью x и лучом из (0, 0) в точку (x, y).


Поскольку метод возвращает угол в радианах, переведём его в градусы:

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

Теперь можно использовать этот угол в методе move перед запуском анимации движения:

```javascript
// Enemy.js
move() {
    //...
    this.sprite.angle = this.getAngle({x: targetX, y: targetY});
}
```
