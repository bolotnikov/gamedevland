# Create a platformer with PixiJS

In this article, we will create an infinite runner game using [PIXI](https://pixijs.com/).

Before starting the development, we need to perform 2 steps:

:one: Download our [PIXI project template](https://github.com/gamedevland/pixi-project-template). You can start working on the game right now or check out [the tutorial](pixi_project_template.md) on how to create a PIXI project template.

:two: Download [the assets pack](assets/runner.zip) for our game. Assets provided by the great website [kenney.nl](https://kenney.nl)


## 1. Create a moving background
By moving the repeating background image from right to left on the screen, we will create the effect of constant movement.

In the main game scene class `game/GameScene.js`, let's create a background:

``` javascript

import { Background } from "./Background";
import { Scene } from '../system/Scene';

export class GameScene extends Scene {
    create() {
        this.createBackground();
    }

    createBackground() {
        this.bg = new Background();
        this.container.addChild(this.bg.container);
    }

    update(dt) {
        this.bg.update(dt);
    }
}
```

Create a `Background.js` file

``` javascript
import * as PIXI from "pixi.js";
import { App } from "../system/App";

export class Background {
    constructor() {
        this.speed = App.config.bgSpeed;
        this.container = new PIXI.Container();
        this.createSprites();
    }
    createSprites() {
    }
}
```
We will move the background movement speed parameter to the global config:

``` javascript
export const Config = {
    bgSpeed: 2,
    // ...
};
```

We must constantly move the background image from right to left at a given speed.

But if we move one single image, then at some point the image will not fit the screen and the player will see a black background. To prevent this from happening, we can connect several background images together and move them all at the same time. 
And when the first image is completely hidden behind the left edge of the screen, we will automatically move it to the right edge.


First, let's create all 3 sprites one after the other.

`Background.js`:
``` javascript
    createSprites() {
        this.sprites = [];

        for (let i = 0; i < 3; i++) {
            this.createSprite(i);
        }
    }

    createSprite(i) {
        const sprite = App.sprite("bg");

        sprite.x = sprite.width * i;
        sprite.y = 0;
        this.container.addChild(sprite);
        this.sprites.push(sprite);
    }
```
Each sprite is indented along the x-axis by a distance equal to the width of all background images to its left.

Now we will implement a method for moving an individual sprite and moving it to the rightmost position, provided that the sprite is hidden behind the left border of the screen:

``` javascript

    move(sprite, offset) {
        const spriteRightX = sprite.x + sprite.width;

        const screenLeftX  = 0;

        if (spriteRightX <= screenLeftX) {
            sprite.x += sprite.width * this.sprites.length;
        }
        
        sprite.x -= offset;
    }
```

It remains to run the `move` method for each sprite in the `update` method:

``` javascript

    update(dt) {
        const offset = this.speed * dt;

        this.sprites.forEach(sprite => {
            this.move(sprite, offset);
        });
    }
```


## 2. Creating a single platform

Now let's create our first platform, which the hero will land on at the very beginning of the game.
To do this, we will display the platform tiles on the screen, connecting them together so that a sufficiently long surface is created.
Let's start by calling the method in the `GameScene` class to create a platform:


``` javascript
    create() {
        //...
        this.createPlatform({
            rows: 4,
            cols: 6,
            x: 200
        });
    }
    createPlatform(data) {
        const platform = new Platform(data.rows, data.cols, data.x);
        this.container.addChild(platform.container);
    }
```

We will describe the functionality of the platform in the `Platform` class.
We pass 3 required parameters to the `constructor` of this class, which will determine the platform being created:
  - number of rows
  - number of columns
  - x-coordinate on the screen from which we want to start drawing the platform

Now let's create the `Platform` class:

``` javascript
import * as PIXI from "pixi.js";
import { App } from '../system/App';

export class Platform {
    constructor(rows, cols, x) {
        this.rows = rows;
        this.cols = cols;
    }
}
```
We will need to know the full dimensions of the platform being created: width and height.
We know that the platform will consist of tiles of the same size.
Thus, knowing the dimensions of one tile and knowing the number of such tiles in a row and in a column, it is easy to calculate the total width and height of the platform:

``` javascript
export class Platform {
    constructor(rows, cols, x) {
        // ...
        this.tileSize = PIXI.Texture.from("tile").width;
        this.width = this.tileSize * this.cols;
        this.height = this.tileSize * this.rows;
    }
}
```

All created tiles will need to be placed in one common container of the platform, which in turn is already placed in the outer container of the scene.
Let's create a container for tiles:

``` javascript
export class Platform {
    constructor(rows, cols, x) {
        // ...
        this.createContainer(x);
    }
    createContainer(x) {
        this.container = new PIXI.Container();
        this.container.x = x;
        this.container.y = window.innerHeight - this.height;
    }
}
```
When creating a container, we specify its `x` coordinate obtained from a parameter in the constructor. Thus, we shift the left side of the platform to this coordinate.
As the `y` coordinate, we specify a value at which the platform will touch the bottom of the screen with its bottom side. This way we will create the effect that the platform sticks out of the ground.
We know that the coordinates of the container correspond to the coordinate of the first tile in the container. And this is the top leftmost tile. Thus, if we shift the entire platform up by a distance equal to its height, we will achieve the desired effect.

Now let's create the tiles themselves:


``` javascript
export class Platform {
    constructor(rows, cols, x) {
        // ...
        this.createTiles();
    }
    createTiles() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.createTile(row, col);
            }
        }
    }

    createTile(row, col) {
        const texture = row === 0 ? "platform" : "tile" 
        const tile = App.sprite(texture);
        this.container.addChild(tile);
        tile.x = col * tile.width;
        tile.y = row * tile.height;
    }
}
```
We create tiles in a loop, going through all the rows and columns of the platform.
On the first line of the platform, use `platform` (grass sprite) as the sprite. In other cases, we use the standard `tile` sprite (an image with the ground).
For each tile, we calculate its position based on its position in the platform. To get the correct coordinates, you need to multiply the column of the tile by its width, and the row by its height.

## 3. Creating a hero

Let's place the hero sprite on the platform we just created.

Let's create the `Hero.js` class:

``` javascript
import * as PIXI from "pixi.js";
import { App } from '../system/App';

export class Hero {
    constructor() {
        this.createSprite();
    }

    createSprite() {
    }
}
```

Implement the `createSprite` method:

``` javascript
    createSprite() {
        this.sprite = new PIXI.AnimatedSprite([
            App.res("walk1"),
            App.res("walk2")
        ]);

        this.sprite.x = App.config.hero.position.x;
        this.sprite.y = App.config.hero.position.y;
        this.sprite.loop = true;
        this.sprite.animationSpeed = 0.1;
        this.sprite.play();
    }
```

The hero consists of two images: `walk1` and `walk2`.
From these two images, we can create a frame-by-frame animation of walking.
For this we use the `PIXI.AnimatedSprite` class. In the constructor of this class, we pass an array of textures from which we want to create an animation. And the `App.res` method just returns the texture by key.

Let's place the sprite in the initial position, which we will set in the global game config `Config.js`:

``` javascript
// ...
export const Config = {
    // ...
    hero: {
        position: {
            x: 350,
            y: 595
        }
    },
    // ...
};
```

Set the `loop` flag to `true` to loop the animation and set the desired playback speed:

``` javascript
        this.sprite.loop = true;
        this.sprite.animationSpeed = 0.1;
```

And  call the `play` method to start animation.

``` javascript
        this.sprite.play();
```


Now we have a hero class and we can create a hero object on the stage in `GameScene.js`:

``` javascript
export class GameScene extends Scene {
    create() {
        // ...
        this.createHero();
    }

    createHero() {
        this.hero = new Hero();
        this.container.addChild(this.hero.sprite);
    }
}
```

## 4. Generation of other platforms