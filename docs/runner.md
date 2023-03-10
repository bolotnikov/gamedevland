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

## 4. Creating multiple platforms

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

## 5. Enable physics

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
## 6. The physical body of platforms

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
        this.dx = App.config.platforms.moveSpeed;
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

And let's take out the value of the platforms speed into the global config for the convenience of configuration:

```javascript
export const Config = {
    // ...
    platforms: {
        // ...
        moveSpeed: -1.5
    }
    // ...
};
```
## 7. Movement of platforms

Now we have the physical body of the platform and we can make the platform move by moving its physical body. Then we will move the platform container with all the tiles to the new position of the physical body.

Let's create a new `move` method, in which we will set the physical body to a new position, taking into account the platform speed specified in the `this.dx` property.

``` javascript
export class Platform {
    // ...
    move() {
        if (this.body) {
            Matter.Body.setPosition(this.body, {x: this.body.position.x + this.dx, y: this.body.position.y});
            this.container.x = this.body.position.x - this.width / 2;
            this.container.y = this.body.position.y - this.height / 2;
        }
    }
}
```

After setting the physical body to a new position, move the platform container to the same position, thus moving all the tiles of the platform to the correct place.

It remains to run the `move` method for all created platforms in the `Platforms` class:
``` javascript
export class Platforms {
    // ...
    update() {
        // ...
        this.platforms.forEach(platform => platform.move());
    }
}
```
## 8. The physical body of the hero

By analogy with the platform, let's create a physical body for the hero in the `Hero.js` file:

``` javascript

import * as Matter from 'matter-js';
// ...
export class Hero {
    constructor() {
        // ...
        this.createBody();
        App.app.ticker.add(this.update.bind(this));
    }

    // [07]
    createBody() {
        this.body = Matter.Bodies.rectangle(this.sprite.x + this.sprite.width / 2, this.sprite.y + this.sprite.height / 2, this.sprite.width, this.sprite.height, {friction: 0});
        Matter.World.add(App.physics.world, this.body);
        this.body.gameHero = this;
    }

    update() {
        this.sprite.x = this.body.position.x - this.sprite.width / 2;
        this.sprite.y = this.body.position.y - this.sprite.height / 2;
    }
}
``` 
As well as for the platform we created a rectangle body in the position of the hero and in its dimensions.

Then we added the created body to the engine and saved a reference to the hero itself in the `body` object. We will need this later when processing collisions, when we will have access to the colliding physical bodies.

In addition, we have created an `update` method that is added to the `PIXI` ticker and will be called on every frame of the animation.
In it, we force the hero's sprite to the position of his physical body in order to synchronize them. Thus, wherever the hero's physical body is sent as a result of interaction with physical objects, the hero's sprite will be placed in the same position.

## 9. Hero jump

We will give the hero the opportunity to jump twice.
This means that after the first jump, the hero will be able to perform another jump while he's in the air.
Then he must land on the platform to make the next jump.

Let's make the hero jump by pressing anywhere in the screen.
We will listen to the `pointerdown` event in the `GameScene` class:

``` javascript

export class GameScene extends Scene {
    // ...
    createHero() {
        // ...
        this.container.interactive = true;
        this.container.on("pointerdown", () => {
            this.hero.startJump();
        });
    }
    // ...
}
```

As you can see, now we need to implement the `startJump` method in the` Hero` class:


``` javascript

export class Hero {
    constructor() {
        // ...
        this.dy = App.config.hero.jumpSpeed;
        this.maxJumps = App.config.hero.maxJumps;
        this.jumpIndex = 0;
    }

    startJump() {
        if (this.jumpIndex < this.maxJumps) {
            ++this.jumpIndex;
            Matter.Body.setVelocity(this.body, { x: 0, y: -this.dy });
        }
    }
    // ...
}
```

The `jumpIndex` counter limits the number of jumps until the next touch of the platform. 
The maximum possible number of jumps is indicated in the property `this.maxJumps`.

We use the physical engine to set the speed of the hero’s physical body. For a jump, we need to move it only along the axis `y` up. This means that we need to set a negative displacement for the `y` coordinate, which is set in the `this.dy` property.

And finally, we take out the values of the jump speed and the number of jumps into the global config for the convenience of configuration:

``` javascript
export const Config = {
    // ...
    hero: {
        jumpSpeed: 15,
        maxJumps: 2,
        //...
    }
};
```

## 10. Collision of the hero and platform

Right now the hero can only perform jump 2 jumps because the `this.jumpIndex` counter never resets. 
And at what point should this counter be reset to give the hero the opportunity for a new double jump?

That is the moment when hero touches the platform. This means that the hero has landed on the ground and the previous jump is completed.

How can we track the collision of the hero and the platform? To do this, we will again use the physics engine and the interaction of the physical bodies of the hero and the platform.

The `Matter` physics engine will fire a collision event when two physics bodies collide. So we need to listen for this event.
Let's do this in the `GameScene` class:


``` javascript
import * as Matter from 'matter-js';
import { App } from '../system/App';
//...

export class GameScene extends Scene {
    create() {
        //...
        this.setEvents();
    }

    setEvents() {
        Matter.Events.on(App.physics, 'collisionStart', this.onCollisionStart.bind(this));
    }

    onCollisionStart(event) {
        const colliders = [event.pairs[0].bodyA, event.pairs[0].bodyB];
        const hero = colliders.find(body => body.gameHero);
        const platform = colliders.find(body => body.gamePlatform);

        if (hero && platform) {
            this.hero.stayOnPlatform(platform.gamePlatform);
        }
    }
    // ...
}
```
The `onCollisionStart` method will run automatically when the `collisionStart` event occurs, which means that a collision of physical bodies has occurred.

In this method, we get physical bodies that interact with each other.
Since we created the `gameHero` and `gamePlatform` properties in the physical body objects of the hero and platform in advance, we can now check for the presence of such properties and determine from them what kind of body is involved in the collision.

Finally, if we got both a hero and a platform, we'll call the `stayOnPlatform` method to set the hero on the platform.

Let's implement this method in the `Hero` class:

``` javascript
export class Hero {
    // ...

    stayOnPlatform(platform) {
        this.platform = platform;
        this.jumpIndex = 0;
    }
``` 

All we need to do in it is reset the counter and set the current platform to the `this.platform` property.

And now we can improve the code of the `startJump` method by adding an additional check whether the hero is currently on the platform. If a jump is possible, then the `this.platform` property should be reset.

``` javascript
    startJump() {
        if (this.platform || this.jumpIndex === 1) {
            ++this.jumpIndex;
            this.platform = null;
            Matter.Body.setVelocity(this.body, { x: 0, y: -this.dy });
        }
    }
``` 

## 11. Creating diamonds

In the game, the diamonds will be positioned above the platforms in such a way as to motivate the player to jump from the platform to collect them.

We will create diamonds for each platform in the corresponding class. Let's create a certain number of diamond images above the platform:

``` javascript
// ...
export class Platform {
    constructor(rows, cols, x) {
        // ...
        this.diamonds = [];
        this.createDiamonds();
    }

    createDiamonds() {
        const y = App.config.diamonds.offset.min + Math.random() * (App.config.diamonds.offset.max - App.config.diamonds.offset.min);

        for (let i = 0; i < this.cols; i++) {
            if (Math.random() < App.config.diamonds.chance) {
                const diamond = new Diamond(this.tileSize * i, -y);
                this.container.addChild(diamond.sprite);
                this.diamonds.push(diamond);
            }
        }
    }
    // ...
}

```

Let's loop through all the tiles of the platform and check the possibility of creating a diamond over each tile. The probability of creating a diamond over one tile is obtained from the property of the global config `App.config.diamonds.chance`.

If we need to create a diamond over this tile, then we will create an instance of the `Diamond` class. Let's place the created object in the `this.diamonds` property and add it as a child element to the platform container.


Let's add the settings for creating diamonds to the global config:

``` javascript
// ...
export const Config = {
    // ...
    diamonds: {
        chance: 0.4,
        offset: {
            min: 100,
            max: 200
        }
    }
}
```

The chance property indicates the probability of a diamond being generated on each specific platform tile.
The offset object defines the allowable height range at which the diamond must be positioned above the platform.

It remains to implement the `Diamond` class. At the moment, we only implement in it the output of the diamond sprite:

``` javascript
import { App } from '../system/App';

export class Diamond {
    constructor(x, y) {
        this.sprite = App.sprite("diamond");
        this.sprite.x = x;
        this.sprite.y = y;
    }
}
```

## 12. The physical body of a diamond

As we already know, all game objects that need to handle physics interactions (such as collision) need to create physics bodies and add them to the physics engine for processing.

We have already created a physical body for the hero and the platforms, and thus have the opportunity to handle the collision of the hero with the platform. 

The player will be able to collect diamonds when they are touched by the hero's sprite while jumping. This means that diamonds also need to create a physical body. Let's improve the code in the `Diamond` class:


``` javascript
export class Diamond {
    constructor(x, y) {
        this.createSprite(x, y);
    }

    createSprite(x, y) {
        this.sprite = App.sprite("diamond");
        this.sprite.x = x;
        this.sprite.y = y;
    }

    createBody() {
        this.body = Matter.Bodies.rectangle(this.sprite.width / 2 + this.sprite.x + this.sprite.parent.x, this.sprite.height / 2 + this.sprite.y + this.sprite.parent.y, this.sprite.width, this.sprite.height, {friction: 0, isStatic: true, render: { fillStyle: '#060a19' }});
        this.body.gameDiamond = this;
        this.body.isSensor = true;
        Matter.World.add(App.physics.world, this.body);
    }
}
```

Here we created the physical body in the same way as we did for the platform and the hero. We used a rectangle at the sprite coordinates and the dimensions of the diamond sprite.
As usual, we have stored a reference to the diamond object in the physical body object in order to access the diamond at the time of the collision events.


In addition, we have set the `this.body.isSensor` property to `true`.
This way, the hero sprite will be able to pass through the diamond image, unlike the platform, which should not pass the sprite through itself.

It remains to call the `createBody` method after the diamond is added as a child element to the platform container in the `Platform.js` class:


``` javascript
    createDiamonds() {
        const y = App.config.diamonds.offset.min + Math.random() * (App.config.diamonds.offset.max - App.config.diamonds.offset.min);

        for (let i = 0; i < this.cols; i++) {
            if (Math.random() < App.config.diamonds.chance) {
                this.createDiamond(this.tileSize * i, -y);
            }
        }
    }

    createDiamond(x, y) {
            const diamond = new Diamond(x, y);
            this.container.addChild(diamond.sprite);
            diamond.createBody();
            this.diamonds.push(diamond);
    }
```

## 13. Collecting diamonds

When the hero touches the diamond, it will be considered collected and should disappear from the screen. How to determine the moment of collision?
We already did this for the hero and platform in the `GameScene.js` class when we implemented the `onCollisionStart` method. Now let's extend this method to check for the presence of a diamond object and handle such a collision:


``` javascript
export class GameScene extends Scene {
    // ...
    onCollisionStart(event) {
        // ...
        const diamond = colliders.find(body => body.gameDiamond);

        if (hero && diamond) {
            this.hero.collectDiamond(diamond.gameDiamond);
        }
    }
    // ...
}
```
We need to implement the `collectDiamond` method in the `Hero.js` class:

``` javascript
import * as Matter from 'matter-js';
import * as PIXI from "pixi.js";
import { App } from '../system/App';

export class Hero {
    constructor() {
        // ...
        this.score = 0;
    }
    collectDiamond(diamond) {
        ++this.score;
        Matter.World.remove(App.physics.world, diamond.body);
        diamond.sprite.destroy();
        diamond.sprite = null;
    }
    // ...
}
```
When collecting a diamond, we destroy its physical body and destroy the sprite itself.
We also increase the hero's score counter, which we will later display on the screen as a game score.

## 14. UI

