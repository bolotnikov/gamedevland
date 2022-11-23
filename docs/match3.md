# Сreating Match3 game with PixiJS

In this article, we will create a match3 game using [PIXI](https://pixijs.com/).

Before starting the development, we need to perform 2 steps:

1. Download our [PIXI project template](https://github.com/bolotnikov/pixi-project-template). You can start working on the game right now or check out [the tutorial](pixi_project_template.md) on how to create a PIXI project template.
2. Download [the assets pack](assets/match3.zip) for our game. Assets provided by the great website [kenney.nl](https://kenney.nl)

## 1. Creating the tiles board
Let's set the first task to create the board with tiles.

### 1.1. Create a field
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

## To be continued...