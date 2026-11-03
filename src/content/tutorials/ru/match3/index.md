---
locale: ru
translationKey: match3/index
title: Шаг 1. Создание поля плиток
description: 'Шаг 1 руководства по созданию игры «три в ряд» с PixiJS: создание поля плиток.'
seriesTitle: Создание игры «три в ряд» с PixiJS
seriesDescription: 'Пошаговое руководство по созданию игры «три в ряд» с PixiJS: от игрового поля до перемещения плиток и обработки комбинаций.'
seriesSlug: match3
step: 1
readingTime: 4 минуты чтения
steps:
  - step: 1
    slug: ''
    title: Создание поля плиток
  - step: 2
    slug: moving-tiles
    title: Перемещение плиток
  - step: 3
    slug: search-for-combinations
    title: Поиск комбинаций
  - step: 4
    slug: processing-combinations
    title: Обработка комбинаций
---

В этой статье мы создадим игру «три в ряд» с помощью [PIXI](https://pixijs.com/).

<a id="video-version" class="translation-anchor" aria-hidden="true"></a>

## Видеоверсия
<iframe width="560" height="315" src="https://www.youtube.com/embed/kgIg5Ms-HRA" title="Видеоплеер YouTube" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<a id="step-by-step-guide-on-udemy" class="translation-anchor" aria-hidden="true"></a>

## Пошаговое руководство на Udemy
- [https://www.udemy.com/course/pixicourse/](https://www.udemy.com/course/pixicourse/)

<a id="additional-materials" class="translation-anchor" aria-hidden="true"></a>

## Дополнительные материалы
- [Полный исходный код](https://github.com/gamedevland/match3)
- [Демонстрационная версия](https://gamedevland.github.io/match3/)

Перед началом разработки нужно выполнить два шага:

1️⃣ Скачайте наш [шаблон проекта PIXI](https://github.com/gamedevland/pixi-project-template). Можно сразу начать работу над игрой или изучить [руководство](/ru/articles/pixi-project-template) по созданию шаблона проекта PIXI.

2️⃣ Скачайте [набор ресурсов](/assets/match3.zip) для нашей игры. Ресурсы предоставлены замечательным сайтом [kenney.nl](https://kenney.nl)

Первая задача — создать поле с плитками.

<a id="11-creating-a-single-field" class="translation-anchor" aria-hidden="true"></a>

### 1.1. Создание отдельной клетки
Первым делом создадим класс клетки поля и отобразим на экране спрайт одной клетки.

Создайте класс `game/Field.js`:
``` javascript

import { App } from "../system/App";

export class Field {
    constructor(row, col) {
        this.row = row;
        this.col = col;

        this.sprite = App.sprite("field");
        this.sprite.x = this.position.x;
        this.sprite.y = this.position.y;
        this.sprite.anchor.set(0.5);
    }

    get position() {
        return {
            x: this.col * this.sprite.width,
            y: this.row * this.sprite.height
        };
    }
}
```

Клетка находится в определённом столбце и строке игрового поля.

**Информация**
- Свойства `row` и `col` класса `Field` определяют строку и столбец.
- Геттер `position` определяет положение клетки на экране в зависимости от её места на поле и с учётом размеров спрайта.


Теперь можно вывести отдельную клетку на экран в классе `Game`:

``` javascript
import { Field } from "./Field";
// ...    
export class Game {
    constructor() {
        // ...
        const field = new Field(1, 1);
        this.container.addChild(field.sprite);
    }
}
```

<a id="12-creating-a-fields-grid" class="translation-anchor" aria-hidden="true"></a>

### 1.2. Создание сетки клеток
Класс отдельной клетки готов, и теперь можно создать само поле из нескольких клеток. Создадим класс `src/scripts/game/Board.js`:


``` javascript
import * as PIXI from "pixi.js";
import { App } from "../system/App";
import { Field } from "./Field";

export class Board {
    constructor() {
        this.container = new PIXI.Container();
        this.fields = [];
        this.rows = App.config.board.rows;
        this.cols = App.config.board.cols;
        this.create();
    }

    create() {
    }
}
```

Все элементы поля — клетки и плитки — будем добавлять в контейнер поля. Затем контейнер поля добавляется в контейнер сцены.


Поле состоит из сетки клеток. Сохраним все созданные клетки в свойстве `this.fields`.

Число строк и столбцов должно настраиваться. Добавим эти параметры в глобальную конфигурацию проекта:

```javascript
// ...
export const Config = {
    // ...
    board: {
        rows: 6,
        cols: 6
    }
};
```

Для создания поля нужно разместить клетки в сетке заданного размера: создать спрайты в каждом столбце и каждой строке. Сделаем это в методе `create`:

``` javascript
export class Board {
    // ...
    create() {
        this.createFields();
    }

    createFields() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.createField(row, col);
            }
        }
    }
    createField(row, col) {
        const field = new Field(row, col);
        this.fields.push(field);
        this.container.addChild(field.sprite);
    }
}
```
Выведем поле на сцену в классе `Game`:
``` javascript
// ...
export class Game {
    constructor() {
        // ...
        this.board = new Board();
        this.container.addChild(this.board.container);
    }
// ...
}
```

Сейчас поле находится в левом верхнем углу. Исправим это, выровняв его по центру экрана. Размер клетки можно получить из первого элемента созданного массива: `this.fields[0].sprite.width;` Зная размер одной клетки, вычислим размер всего поля, умножив число строк и столбцов на размер клетки:

``` javascript
        this.width = this.cols * this.fieldSize;
        this.height = this.rows * this.fieldSize;
```
Зная размеры поля и экрана, можно вычислить нужный отступ для контейнера. Вычтем размер поля из размера экрана: оставшееся пространство займут два отступа слева и справа:
``` javascript
export class Board {
    constructor() {
        // ...
        this.ajustPosition();
    }
    // ...
    ajustPosition() {
        this.fieldSize = this.fields[0].sprite.width;
        this.width = this.cols * this.fieldSize;
        this.height = this.rows * this.fieldSize;
        this.container.x = (window.innerWidth - this.width) / 2 + this.fieldSize / 2;
        this.container.y = (window.innerHeight - this.height) / 2 + this.fieldSize / 2;
    }
}
```

<a id="13-creating-a-single-tile" class="translation-anchor" aria-hidden="true"></a>

### 1.3. Создание отдельной плитки

Клетки поля готовы; теперь создадим в них плитки. Как и с клетками, начнём с класса отдельной плитки.

В наборе ресурсов названия всех плиток соответствуют их цветам. Для создания спрайта нужно указать цвет плитки. Передадим название цвета в конструктор и создадим соответствующий спрайт. Создайте файл `src/scripts/games/Tile.js`:

``` javascript
import { App } from "../system/App";

export class Tile {
    constructor(color) {
        this.color = color;
        this.sprite = App.sprite(this.color);
        this.sprite.anchor.set(0.5);
    }

    setPosition(position) {
        this.sprite.x = position.x;
        this.sprite.y = position.y;
    }
}
```

Также реализуем метод `setPosition`, задающий спрайту правильную позицию. Добавим одну плитку в классе `Board`:

``` javascript
// ...
import { Tile } from "./Tile";

export class Board {
// ...
    create() {
        this.createFields();
        this.createTiles();
    }

    createTiles() {
        const tile = new Tile("green");
        this.container.addChild(tile.sprite);
    }
// ...
```

<a id="14-create-a-tile-in-each-field" class="translation-anchor" aria-hidden="true"></a>

### 1.4. Создание плитки в каждой клетке
Теперь можно создать плитку в каждой клетке поля. Для этого пройдём по массиву клеток и установим свою плитку в каждую:


```javascript

    create() {
        this.createFields();
        this.createTiles();
    }

    createTiles() {
        this.fields.forEach(field => this.createTile(field));
    }

    createTile(field) {
        const tile = new Tile("green");
        field.setTile(tile);
        this.container.addChild(tile.sprite);
    }
```

Установить плитку в клетку означает расположить её на экране в той же позиции, что и данная клетка. Реализуем метод setTile в классе `Field`:

``` javascript
    setTile(tile) {
        this.tile = tile;
        tile.field = this;
        tile.setPosition(this.position);
    }
}
```
Осталось дать каждой плитке случайный цвет. Создадим фабрику, генерирующую случайную плитку. Создайте класс `src/scripts/game/TileFactory.js`:

``` javascript
import { App } from "../system/App";
import { Tools } from "../system/Tools";
import { Tile } from "./Tile";


export class TileFactory {
    static generate() {
        const color = App.config.tilesColors[Tools.randomNumber(0, App.config.tilesColors.length - 1)];
        return new Tile(color);
    }
}
```

Добавьте конфигурацию цветов в глобальную конфигурацию проекта в `src/scripts/game/Config.js`:

``` javascript
export const Config = {
    // ...
    tilesColors: ['blue', 'green', 'orange', 'red', 'pink', 'yellow'],
};
```
Добавьте метод, возвращающий случайное целое число, в наш класс вспомогательных методов `src/scripts/system/Tools.js`:

``` javascript
export class Tools {
    // ...
    static randomNumber(min, max) {
        if (!max) {
            max = min;
            min = 0;
        }
    
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
```

Теперь в классе `Board` создаём плитку через фабрику:

``` javascript
    createTile(field) {
        const tile = TileFactory.generate();
        // ...
    }
```
