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
