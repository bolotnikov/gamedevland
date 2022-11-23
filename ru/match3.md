# Сreating Match3 game with PixiJS

В этой статье мы создадим матч3 игру используя pixijs и наш шаблон проекта.

Прежде, чем начать разработку, выполним 2 предварительных действия:

1. Скачаем шаблон проекта pixi, который мы подготовили в отдельной статье.
2. Загрузим набор графики для нашей игры. Графика предоставлена сайтом kenney.nl

## 1. Вывод доски тайлов
Поставим первой задачей вывод на экран доски с тайлами.

1.1. Создание ячейки
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

