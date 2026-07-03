---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Step 6. Scenes Manager"
description: "Step 6 of the Creating PixiJS project template tutorial: Scenes Manager."
seriesTitle: "Creating PixiJS project template"
seriesDescription: "Build a reusable PixiJS + JavaScript project template with loading, scenes, sprites, and a clean application structure."
seriesSlug: "pixi-project-template"
step: 6
readingTime: "2 min read"
steps:
  - step: 1
    slug: ""
    title: "Creating the structure"
  - step: 2
    slug: "creating-the-canvas-element"
    title: "Creating the canvas element"
  - step: 3
    slug: "creating-the-loader"
    title: "Creating the loader"
  - step: 4
    slug: "game-launch"
    title: "Game launch"
  - step: 5
    slug: "sprite-output"
    title: "Sprite Output"
  - step: 6
    slug: "scenes-manager"
    title: "Scenes Manager"
  - step: 7
    slug: "useful-links"
    title: "Useful links"
---
Let's create a scene manager for easy switching between scenes in the game.
Let's create a base scene class:

``` javascript
import * as PIXI from "pixi.js";
import { App } from "./App";

export class Scene {
    constructor() {
        this.container = new PIXI.Container();
        this.container.interactive = true;
        this.create();
        App.app.ticker.add(this.update, this);
    }

    create() {}
    update() {}
    destroy() {}

    remove() {
        App.app.ticker.remove(this.update, this);
        this.destroy();
        this.container.destroy();
    }
}
``` 

Let's add 3 methods to the base class that can be overridden in the project scene:
- `create`
- `update`
- `destroy`

In the constructor, we will perform the universal actions required for each scene in the game:
- create a scene container
- call the `create` method, which will be overridden in the game scene
- add `PIXI` ticker with `update` method so that it is called on every animation frame
- add the `remove` method that will be called by the manager when the scene is destroyed and implement the deletion of the ticker in it


Now let's create the manager itself to manage and switch scenes:

``` javascript
import * as PIXI from "pixi.js";
import { App } from "./App";

export class ScenesManager {
    constructor() {
        this.container = new PIXI.Container();
        this.container.interactive = true;
        this.scene = null;
    }

    start(scene) {
        if (this.scene) {
            this.scene.remove();
        }

        this.scene = new App.config.scenes[scene]();
        this.container.addChild(this.scene.container);
    }
}
``` 
The manager's only job is to run the scene.
In this case, if any scene has already been launched, it must be deleted.
We can start the scene by the key passed as a parameter to the `start` method.
Which scene class corresponds to this key, we specify in the global config:

``` javascript
// ...
export const Config = {
    // ...
    scenes: {
        "Game": Game
    }
};
```

Let's finalize our game scene `Game` by making this class an inheritor of the base class of the scene:

``` javascript
//...
import { Scene } from "../system/Scene";

export class Game extends Scene {
    // ...
}
```

And all that's left is to change the scene launch method in the `App.js` application class:

``` javascript
// ...
import { ScenesManager } from "./ScenesManager";

class Application {
    run(config) {
        //...
        this.scenes = new ScenesManager();
        this.app.stage.addChild(this.scenes.container);
    }
    // ...
    start() {
        this.scenes.start("Game");
    }
}
```
