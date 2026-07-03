---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Step 4. Game launch"
description: "Step 4 of the Creating PixiJS project template tutorial: Game launch."
seriesTitle: "Creating PixiJS project template"
seriesDescription: "Build a reusable PixiJS + JavaScript project template with loading, scenes, sprites, and a clean application structure."
seriesSlug: "pixi-project-template"
step: 4
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
In the `Application` class, we implement the `start` method, which will start the game after the resources are loaded:

``` javascript
// ...
class Application {
// ... 
    start() {
        this.scene = new this.config["startScene"]();
        this.app.stage.addChild(this.scene.container);
    }
``` 

We could instantiate the scene class directly in the `start` method. But we want the shared code in the `system` folder to be unrelated to or dependent on the game code in the `game` folder. To do this, we have separated the common system code and the project code. At the same time, the system code can know about the parameters it needs through the game config, which we pass to the `App` class when launching applications. So in this case, instead of directly creating the game scene object directly in the `Application` class, we'd better create it through a parameter in the config.
Add the `startScene` parameter to the game config in `Config.js`:

``` javascript
import { Game } from "./Game";
 
export const Config = {
    // ...
    startScene: Game,
};
```

And create the `Game` class itself in game folder `/src/scripts/game/Game`:

``` javascript
import * as PIXI from "pixi.js";
import { App } from "../system/App";
  
export class Game {
    constructor() {
        this.container = new PIXI.Container();
    }
}
``` 

The scene class is based on the [`PIXI.Container`](https://pixijs.download/dev/docs/PIXI.Container.html). And we will add all objects added to the scene to this container.
And we added the scene container itself to the main `app.stage` container in the start method of the `Application` class.
