---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Step 5. Sprite Output"
description: "Step 5 of the Creating PixiJS project template tutorial: Sprite Output."
seriesTitle: "Creating PixiJS project template"
seriesDescription: "Build a reusable PixiJS + JavaScript project template with loading, scenes, sprites, and a clean application structure."
seriesSlug: "pixi-project-template"
step: 5
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
To render sprites, we need to implement a helper method in the `Application` class:

``` javascript
    res(key) {
        return this.loader.resources[key].texture;
    }

    sprite(key) {
        return new PIXI.Sprite(this.res(key));
    }
``` 

We know that all loaded resources are stored in the `resources` property of our custom `Loader` class. Getting the required resource by key, we can create a new instance of the [`PIXI.Sprite`](https://pixijs.download/dev/docs/PIXI.Sprite.html) class.
Now, in the code of the game, it will be enough for us to use only the call to the `App.sprite` method to get the required [`PIXI.Sprite`](https://pixijs.download/dev/docs/PIXI.Sprite.html) instance and work with it further.
Let's render the background image:

``` javascript
export class Game {
    constructor() {
        this.container = new PIXI.Container();
        this.createBackground();
    }
    createBackground() {
        this.bg = App.sprite("bg");
        this.bg.width = window.innerWidth;
        this.bg.height = window.innerHeight;
        this.container.addChild(this.bg);
    }
```
