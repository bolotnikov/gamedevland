---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Step 2. Creating the canvas element"
description: "Step 2 of the Creating PixiJS project template tutorial: Creating the canvas element."
seriesTitle: "Creating PixiJS project template"
seriesDescription: "Build a reusable PixiJS + JavaScript project template with loading, scenes, sprites, and a clean application structure."
seriesSlug: "pixi-project-template"
step: 2
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
Create a file `src/scripts/system/App.js`. This is the main class of the application.
Let's implement the `run` method, which will start the game.

``` javascript
import * as PIXI from "pixi.js";

class Application {
    run(config) {
        this.config = config;
        this.app = new PIXI.Application({resizeTo: window});
        document.body.appendChild(this.app.view);
    }
}

export const App = new Application();
```

Here we import the `PIXI` library and create a `PIXI` application.
The `view` property of the `this.app` object is just the HTML `canvas` element that we add to the DOM structure of our html template.

In addition, we make this class a singleton by creating an instance of the class and exporting the created object, not the class itself.

So wherever in the application we import from this file, we will always get the same `App` object. This way using the global `App` object we can get access to all the necessary classes for managing the game: screen manager, sound manager, scene manager, and so on.

Create an entry point `src/scripts/index.js` and run the application:


``` javascript
import { App } from "./system/App";
App.run();
```
