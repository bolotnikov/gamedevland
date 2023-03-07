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

## 5. Creating multiple platforms

At this point, we have created the first platform and placed the hero on it.
But in our game, platforms should create automatically and endlessly.
Therefore, it's time to write the code for generation of all the platforms.

Let's create the `Platforms` class, which will be responsible for generating all the platforms in the game:
``` javascript
import * as PIXI from "pixi.js";
import { App } from "../system/App";
import { Platform } from "./Platform";

export class Platforms {
    constructor() {
        this.platforms = [];
        this.container = new PIXI.Container();
    }
}
```

We will place all created platforms in the `this.platforms` array.
And we will also add all platforms as children in a single container `this.container`, which we will then add to the stage.

Since we decided that the `Platforms` class should create all the platforms, it means that this class should create the very first platform also. Then we will transfer the code for creating the first platform from the `GameScene` to the `Platforms`:

``` javascript
export class Platforms {
    constructor() {
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
}
```

Then on the stage itself, instead of creating the first platform, we need to initialize an instance of the `Platforms` class:

``` javascript
export class GameScene extends Scene {
    create() {
        // ...
        this.createPlatforms();
    }

    //...
    createPlatforms() {
        this.platfroms = new Platforms();
        this.container.addChild(this.platfroms.container);
    }

update(dt) {
    // ...
    this.platfroms.update(dt);
    }
}
```
In addition, we added the call to the `Platforms.update` method in the `GameScene.update` method.
In this way, we will constantly check the status of the platforms manager and perform certain actions at the right time.

And what, for example, actions do we need to track and perform at certain moments?
For example, we can automatically create platforms until the last created platform goes off screen! Let's implement the `update` method in the `Platforms` class:

``` javascript
    update() {
        if (this.current.container.x + this.current.container.width < window.innerWidth) {
            this.createPlatform(this.randomData);
        }
    }
```
If the last created platform fits entirely on the screen (that is, its right side coordinate is less than the width of the screen), then we want to create the next platform.
Thus, we say that we want to create platforms until the entire screen is filled with platforms. In other words, we create new platforms until the last created platform goes beyond the right border of the screen!

As you can see, we placed the last created platform in the `this.current` property. Therefore, let's add its setting to the `createPlatform` method along with adding the created platform to the `this.platforms` array:

``` javascript
export class Platforms {
    //...
    createPlatform(data) {
        const platform = new Platform(data.rows, data.cols, data.x);
        this.container.addChild(platform.container);
        this.platforms.push(platform);
        this.current = platform;
    }
}
```

Each next platform, unlike the first one, we will create with random parameters.
Random parameters are returned to us by the `randomData` getter.

The parameters used, although random, must still be within certain ranges so that the platforms are created in reasonable sizes and positions. Let's describe such limits in the global config `Config.js`:

``` javascript
    platforms: {
        ranges: {
            rows: {
                min: 2,
                max: 6
            },
            cols: {
                min: 3,
                max: 9
            },
            offset: {
                min: 60,
                max: 200
            }
        }
    },
```
Here we have specified the minimum and maximum number of rows and columns in one platform, as well as the minimum and maximum offset relative to the previous platform.
Now we can implement the `randomData` getter based on the given ranges:

``` javascript
    get randomData() {
        this.ranges = App.config.platforms.ranges;
        let data = { rows: 0, cols: 0, x: 0 };

        const offset = this.ranges.offset.min + Math.round(Math.random() * (this.ranges.offset.max - this.ranges.offset.min));

        data.x = this.current.container.x + this.current.container.width + offset;
        data.cols = this.ranges.cols.min + Math.round(Math.random() * (this.ranges.cols.max - this.ranges.cols.min));
        data.rows = this.ranges.rows.min + Math.round(Math.random() * (this.ranges.rows.max - this.ranges.rows.min));

        return data;
    }
```

## 5. Movement of platforms

Before we start the movement of the platforms, we need to activate physics in the projects.
To do this, first let's install the npm package with the `MatterJS` physical library:

``` bash
npm i matter-js
```

Let's activate the engine in `App.js`. To do this, follow 3 steps:
  - engine initialization
  - creating a runner
  - running the engine

``` javascript
import * as Matter from 'matter-js';
// ...
class Application {
    run(config) {
        // ...
        this.createPhysics();
    }

    createPhysics() {
        this.physics = Matter.Engine.create();
        const runner = Matter.Runner.create();
        Matter.Runner.run(runner, this.physics);
    }
    // ...

}
```

After we have added physics to the project, we need to tell the physics engine about all the objects that will be enabled for physics processing. Let's start with platforms. Add physical bodies to the created platforms and thus let the physics engine know about the platforms.

What is the physical body of the platform? In fact, the platform is a rectangular sprite.

In order to create the physical body of the platform that the engine can process, we need to create a rectangle that exactly matches the outline of the platform. We can accurately calculate the size and position of such a rectangle by taking the coordinates and dimensions of the current platform.

In the `Platform.js` file:

``` javascript
import * as Matter from 'matter-js';

export class Platform {
    constructor(rows, cols, x) {
        // ...
        // specify the speed of the platform
        this.dx = -1.5;
        this.createBody();
    }

    createBody() {
        // create a physical body
        this.body = Matter.Bodies.rectangle(this.width / 2 + this.container.x, this.height / 2 + this.container.y, this.width, this.height, {friction: 0, isStatic: true});
        // add the created body to the engine
        Matter.World.add(App.physics.world, this.body);
        // save a reference to the platform object itself for further access from the physical body object
        this.body.gamePlatform = this;
    }
}
```

Now that we have a physical body at the platform, we can make the platform move by moving its physical body.
Let's create a new `move` method, in which we will set the physical body to a new position, taking into account the speed of the platform specified in the property `this.dx`:

``` javascript
export class Platform {
    // ...
    move() {
         Matter.Body.setPosition(this.body, {x: this.body.position.x + this.dx, y: this.body.position.y});
    }
}
```

It remains to run the `move` method for all created platforms in the `Platforms` class:
``` javascript
export class Platforms {
    // ...
    update() {
        // ...
        this.platforms.forEach(platform => {
            if (platform.body) {
                platform.container.x = platform.body.position.x - platform.width / 2;
                platform.container.y = platform.body.position.y - platform.height / 2;
                platform.move();
            }
        });
    }
}
```
## 6. Hero and platforms collisions