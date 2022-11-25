# Сreating Match3 game with PixiJS

In this article, we will create a match3 game using [PIXI](https://pixijs.com/).

Before starting the development, we need to perform 2 steps:

1. Download our [PIXI project template](https://github.com/bolotnikov/pixi-project-template). You can start working on the game right now or check out [the tutorial](pixi_project_template.md) on how to create a PIXI project template.
2. Download [the assets pack](assets/match3.zip) for our game. Assets provided by the great website [kenney.nl](https://kenney.nl)

## 1. Creating the tiles board
Let's set the first task to create the board with tiles.

### 1.1. Creating a single field
The first step is to create a board field class and render a single field sprite on the screen.

Create the `game/Field.js` class:
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

A field is located in a certain column and in a certain row on the board. The `row` and `col` properties of the `Field` class define the row and column.

The `position` getter determines the position of the field on the screen, depending on the position on the board and taking into account the size of the field sprite.

And now we can render a single field on the screen in the `Game` class:

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

### 1.2. Creating a fields grid
We have a class for the board field and now we can create the board itself, consisting of a number of fields.
Let's create a class `src/scripts/game/Board.js`:


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

We will add all elements of the board (fields and tiles) to the board container. And the board container is then added to the scene container.
The board consists of a grid of fields. Let's set all the created fields to the `this.fields` property.
The number of rows and columns should be configurable. Therefore, let's add these settings to the global project config:

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

To create a board, we need to place its fields on a grid of a given size. That is, create field sprites in each column and each row of the board.
Let's do this in the `create` method:

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
Let's bring the board to the stage in the `Game` class:
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

Now the board is located in the upper left corner. Let's fix this by aligning its position to the center of the screen.
We can get the size of the board's field by taking the first element from the generated fields array and reading the width of its sprite:
`this.fields[0].sprite.width;`
Knowing the size of one field, we can calculate the size of the entire board by multiplying the number of rows and columns by the size of the field:

``` javascript
        this.width = this.cols * this.fieldSize;
        this.height = this.rows * this.fieldSize;
```
Knowing the size of the board and the size of the screen, we can make the right padding for the board container.
Subtract the size of the board from the size of the screen and the resulting remaining space will take up 2 indents to the left and right of the board:
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

### 1.3. Creating a single tile

We have the board fields ready, and now we can create matching tiles in them.
As in the case with the fields creation, we will start by creating a class for a single tile.

As we can see in the assets, all tile names refer to their colors. To create a sprite, we need to specify the color we want to give to that tile. We pass the name of the color as a parameter in the constructor and create the corresponding sprite.
Create a file `src/scripts/games/Tile.js`:

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

We also implement the `setPosition` method, which will set the sprite to the correct position.
Let's add a single tile in the `Board` class:

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

### 1.4. Create a tile in each field
Now we can create a tile in each field of the board.
To do this, we can loop through the array of all fields and set our own tile in each field:


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

Set a tile in each field means to place the tile in the same position on the screen as the given field. Let's implement the setTile method in the `Field` class:

``` javascript
    setTile(tile) {
        this.tile = tile;
        tile.field = this;
        tile.setPosition(this.position);
    }
}
```
It remains to make sure that each field has a tile with a random color.
To do this, we will create a factory that will generate a random tile.
Let's create the `src/scripts/game/TileFactory.js` class:

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

Add the colors config to the project global config in `src/scripts/game/Config.js`:

``` javascript
export const Config = {
    // ...
    tilesColors: ['blue', 'green', 'orange', 'red', 'pink', 'yellow'],
};
```
And add a method that returns a random integer to our special helpers class `src/scripts/system/Tools.js`:

``` javascript
export class Tools {
    static randomNumber(min, max) {
        if (!max) {
            max = min;
            min = 0;
        }
    
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    // ...
}
```

And now in the `Board` class we create a tile using the factory:

``` javascript
// ...
    createTile(field) {
        const tile = TileFactory.generate();
// ...

```

## 2. Tiles swap
## 2.1. Adding interactivity to the tiles