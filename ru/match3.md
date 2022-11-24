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
