# Сreating Match3 game with PixiJS

В этой статье мы создадим матч3 игру используя pixijs и наш шаблон проекта.

Прежде, чем начать разработку, выполним 2 предварительных действия:

1. Скачаем шаблон проекта pixi, который мы подготовили в отдельной статье.
2. Загрузим набор графики для нашей игры. Графика предоставлена сайтом kenney.nl

## 1. Вывод доски тайлов
Поставим первой задачей вывод на экран доски с тайлами.

## 1.1. Создание ячейки
Первым шагом создадим класс ячейки доски и выведем спрайт одиночной ячейку на экран.

Создаем класс game/Field.js:
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

Ячейка доски характеризиуется ее позицией на доске.
На доске ячейка расположена в определенном столбце и в определенной строке. Свойства row и col определяют строку и столбец.

Геттер position определяет позицию ячейки на экране в зависимости расположения на доске и с учетом размеров спрайта.

Выводим одиночную ячейку на экран в классе Game:

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

## 1.2. Создание доски
Теперь, когда у нас есть класс поля доски, мы можем создать и саму доску, состоящую из таких полей.
Создадим класс `src/scripts/game/Board.js`:


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

Доска состоит из сетки полей. Все созданные поля запишем в свойство `this.fields`.
Количество строк и столбцов должно быть регулируемо.
Поэтому добавим эти настройки в глобальный конфиг проекта:

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

Все элементы доски, то есть поля и тайлы мы добавим в контейнер доски.
А контейнер доски затем добавим в контейнер сцены.
Чтобы создать доску, нам нужно разместить ее поля по сетке заданного размера. То есть создать спрайты полей в каждом столбце и каждой строки доски.
Сделаем это в методе create:


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
Выведем доску на сцену в классе `Game`:
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

Сейчас доска расположена в левом верхнем углу. Исправим это, выровняв ее позицию по центру экрана.
Мы можем получить размер поля доски, взяв первый элемент из массива созданных полей и прочитав ширину его спрайта:
`this.fields[0].sprite.width;`
Зная размер одного поля, мы можем рассчитать размер всей доски, умножив число строк и столбцов на размер поля:
``` javascript
        this.width = this.cols * this.fieldSize;
        this.height = this.rows * this.fieldSize;
```
Зная размер доски и размер экрана, мы можем сделать правильный отступ для контейнера доски.
Вычитаем размер доски из размера экрана и полученное оставшееся пространство будут занимать 2 отступа слева и справа от доски:

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
### 1.3. Создаем одиночный тайл

Теперь, когда у нас готовы поля доски, мы можем поместить в них тайлы, которые будем матчить. Как и в случае с выводом полей, начнем с того, что создадим класс одиночного тайла. 
У всех тайлов названия спрайтов совпадают с их цветом. Чтобы создать спрайт тайла, нужно указать цвет, который мы хотим дать этому тайлу. Передаем названием цвета в качестве параметра в конструкторе класса и создаем соответствующий спрайт.
Создаем файл src/scripts/games/Tile.js:
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
Также сразу реализуем метод setPosition, который будет устанавливать спрайт сразу в правильную позицию.

Добавим один тайл в классе `Board`:
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

### 1.4. Выводим тайлы во все поля доски
Теперь мы можем вывести тайл в каждое поле доски.
Для этого мы можем пройтись в цикле по массиву всех полей и в каждое поле установить свой тайл:

``` javascript
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

Установить тайл в каждое поле означает поместить тайл в ту-же позицию на экране, что и данное поле. Реализуем метод setTile в классе Field:

``` javascript
    setTile(tile) {
        this.tile = tile;
        tile.field = this;
        tile.setPosition(this.position);
    }
}

Осталось сделать, чтобы в каждое поле попадал тайл со случайным цветом, а не одним заранее прописанным зеленым. Для этого создадим фабрику, которая будет генерировать случайный тайл. Создадим класс `src/scripts/game/TileFactory`:

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

Добавим конфиг цветов в конфиг проекта в `src/scripts/game/Config.js`:
``` javascript
export const Config = {
    // ...
    tilesColors: ['blue', 'green', 'orange', 'red', 'pink', 'yellow'],
};
```
И добавим метод, возвращающий рандомное целое число в наш специальный класс хелперов `src/scripts/system/Tools.js`:

``` javascript
export class Tools {
    static randomNumber(min, max) {
        if (!max) {
            max = min;
            min = 0;
        }
    
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    static massiveRequire(req) {
        const files = [];

        req.keys().forEach(key => {
            files.push({
                key, data: req(key)
            });
        });

        return files;
    }
}
```

И теперь в классе Board создаем тайл через фабрику:
``` javascript
// ...
    createTile(field) {
        const tile = TileFactory.generate();
// ...

```

## 2. Своп тайлов
## 2.1. Делаем тайлы интерактивными