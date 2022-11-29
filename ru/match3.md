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

Начинаем разработку функционала перемещения тайлов.
Чтобы выберать тайл для перемещения, нужно по нему кликнуть. Значит, тайлы должны быть интерактивными.
Добавим интерактивность при создании тайлов в классе `Board`:
``` javascript
// ...
    createTile(field) {
        // ...
        tile.sprite.interactive = true;
        tile.sprite.on("pointerdown", () => {
            this.container.emit('tile-touch-start', tile);
        });
    }
// ...
```
Запустим событие tile-touch-start используя возможности класса `PIXI.Container`.
Отследим и обработыем это событие в классе `Game`:
``` javascript
// ...
export class Game {
    constructor() {
        // ...
        this.board.container.on('tile-touch-start', this.onTileClick.bind(this));
    }
// ...
```

При возникновении события `tile-touch-start`, которое возникнет в случае клика по тайлу, запустим метод `onTileClick`.
В этом методе обработаем все три возможных сценарии:

- выбрать новый тайл для перемещения, если другой тайл не был выбран
- переместить тайлы местами, если другой тайл уже был выбран и он является соседним по отношению к текущему
- выбрать новый тайл, если другой тайл уже был выбран, но он не является соседним по отношению к текущему

Прямо сейчас реализуем первый пункт, то есть выбор тайла. Выбор тайла определяется двумя действиями:
1. запомнить выбранный тайл для попытки перемещения
2. визуально выделить выбранное поле

``` javascript
// ...
export class Game {
    onTileClick(tile) {
        if (this.selectedTile) {
            // select new tile or make swap
        } else {
            this.selectTile(tile);
        }
    }

    selectTile(tile) {
        this.selectedTile = tile;
        this.selectedTile.field.select();
    }
// ...

```

Мы можем выделить поле с выбранным тайлом, показав дополнительную рамку в этом поле.
Реализуем код в классе `Field`:

``` javascript
// ...
export class Field {
    constructor(row, col) {
        // ...
        this.selected = App.sprite("field-selected");
        this.sprite.addChild(this.selected);
        this.selected.visible = false;
        this.selected.anchor.set(0.5);

    }

    unselect() {
        this.selected.visible = false;
    }

    select() {
        this.selected.visible = true;
    }
    // ...
```

## 2.1. Перемещение тайлов

В методе `onTileClick` класса `Game` добавим вызов метода `swap`, котором реализуем перемещение тайлов:

``` javascript
    onTileClick(tile) {
        if (this.selectedTile) {
            this.swap(this.selectedTile, tile);
        } else {
            this.selectTile(tile);
        }
    }

```
Определим, какие действия нам нужно выполнить для перемещения тайлов:
1. Перемещенным тайлам установить новые поля
2. Полям установить новые тайлы
3. Перемещенные тайлы на экране поместить в позиции новых полей

Движение тайлов при перемещении выполним через анимацию твинов используя gsap.
Также стоит заблокировать доску, установив дополнительный флаг, чтобы не допустить обработку интерактивности во время выполнения анимации.
Реализуем эти действия в коде:
s
``` javascript
    // lesson 6
    swap(selectedTile, tile) {
        this.disabled = true;        // заблокируем доску, чтобы не допустить новое перемещение тайлов при уже запущенной анимации
        this.clearSelection();        // скроем рамку "field-selected" с поля объекта selectedTile
        selectedTile.sprite.zIndex = 2; // поместим спрайт объекта selectedTile на слой выше, чем спрайт объекта tile

        selectedTile.moveTo(tile.field.position, 0.2); // переместим selectedTile в позицию тайла tile
        // поместим tile в позицию selectedTilePosition
        tile.moveTo(selectedTile.field.position, 0.2).then(() => {
            // после завершения анимаций движения:
            // в объектах тайлов поменяем значения свойств field
            // в объектах полей поменяем значения свойств tile
            this.board.swap(selectedTile, tile);
            this.disabled = false;            // разблокируем доску
        });
    }


```

Реализуем методы перемещения в классе Tile, используя анимацию твинов gsap:
``` javascript

export class Tile {
    // ...
    moveTo(position, duration) {
        return new Promise(resolve => {
            gsap.to(this.sprite, {
                duration,
                pixi: {
                    x: position.x,
                    y: position.y
                },
                onComplete: () => {
                    resolve()
                }
            });
        });
    }
}

```

Добавим метод `swap` в классе `Board`, в котором изменим значения свойств в перемещенных объектах:

``` javascript

export class Board {
    // ...
    swap(tile1, tile2) {
        const tile1Field = tile1.field;
        const tile2Field = tile2.field;

        tile1Field.tile = tile2;
        tile2.field = tile1Field;

        tile2Field.tile = tile1;
        tile1.field = tile2Field;
    }
}

```

Сейчас при перемещении тайлов мы можем поменять местами не только соседние тайлы, но и вообще любые тайлы на доске. Но меняться местами должны только соседние тайлы. А если игрок вторым выбрал не рядом стоящий тайл, то нам просто нужно полностью снять выделение с первого тайла и выделить второй тайл. Доработаем условие в методе `onTileClick` в классе `Game`:
``` javascript
    onTileClick(tile) {
        if (this.disabled) {
            return;
        }

        if (this.selectedTile) {
            if (!this.selectedTile.isNeighbour(tile)) {
                this.clearSelection(tile);
                this.selectTile(tile);
            } else {
                this.swap(this.selectedTile, tile);
            }
        } else {
            this.selectTile(tile);
        }
    }
```

Как видите, мы также добавили проверку на флаг `disabled`, который мы устанавливали в прошлом пункте на время запуска анимации движения тайлов. Таким образом мы блокируем запуск функционала в методе `onTileClick` во время движения тайлов на доске, чтобы избежать возможных багов.
Реализуем метод isNeighbour в классе `Tile`.
Соседним является тайл, расположенный либо в соседнем столбце, либо с соседней строке. 
Это значит, что разница или между строками, или между столбцами, проверяемого и текущего тайла по модулю должна быть равна единице:

``` javascript

    isNeighbour(tile) {
        return Math.abs(this.field.row - tile.field.row) + Math.abs(this.field.col - tile.field.col) === 1
    }
```
