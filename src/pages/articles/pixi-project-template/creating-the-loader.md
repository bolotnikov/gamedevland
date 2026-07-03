---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Step 3. Creating the loader"
description: "Step 3 of the Creating PixiJS project template tutorial: Creating the loader."
seriesTitle: "Creating PixiJS project template"
seriesDescription: "Build a reusable PixiJS + JavaScript project template with loading, scenes, sprites, and a clean application structure."
seriesSlug: "pixi-project-template"
step: 3
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
Let's start with the loader interface that we want to implement.
``` javascript
class Application {
   run(config) {
        // …
        this.loader = new Loader(this.app.loader, this.config);
        this.loader.preload().then(() => this.start());
    }
    start() {
    }
``` 

To load resources, `PIXI` provides us with the [`PIXI.Loader`](https://pixijs.download/v6.1.1/docs/PIXI.Loader.html) class. We can get it from the `app` property.

We pass it as the first parameter to the constructor of our custom `Loader` class.
And the second parameter is a list of resources to download.


Create class `src/scripts/system/Loader.js`:

``` javascript
export class Loader {
    constructor(loader, config) {
        this.loader = loader;
        this.config = config;
        this.resources = {};
    }
    preload() {
        return Promise.resolve();
    }
}
```
We will add all the loaded resources objects in the `resources` property which is empty by default.

Since the list of resources will be unique for each game, we need to define the resource config separately from the general code, that is, outside the `system` folder.

Let's create a `game/Config.js` file. Here we create the `Config` object, which will be unique for each specific game:

``` javascript
import { Tools } from "../system/Tools";

export const Config = {
    loader: Tools.massiveRequire(require["context"]('./../../sprites/', true, /\.(mp3|png|jpe?g)$/))
};
```

Let's set the list of resources to load in the `loader` property.

To automatically get the entire list of resources to load from a given folder, we use the capabilities of `require.context`.

Let's create the `Tools` system class and implement the `massiveRequre` method in it:

``` javascript
export class Tools {
    static massiveRequire(req) {
        const files = [];

        req.keys().forEach(key => {
            files.push({
                key, data: req(key)
            });
        });

        return files;
    }
}
```

And now we need to update the entry point:
``` javascript
import { Config } from "./game/Config";
import { App } from "./system/App";

App.run(Config);
```

Now we can fully implement the `preload` method in the `Loader` class. We can do it in 2 steps:

1. Add all resources from the loader config to the loading list using `this.loader.add` method.
2. Start loading resources using `this.loader.load`.

``` javascript
export class Loader {
    // ...
    preload() {
        for (const asset of this.config.loader) {
            let key = asset.key.substr(asset.key.lastIndexOf('/') + 1);
            key = key.substring(0, key.indexOf('.'));
            if (asset.key.indexOf(".png") !== -1 || asset.key.indexOf(".jpg") !== -1) {
                this.loader.add(key, asset.data.default)
            }
        }

        return new Promise(resolve => {
            this.loader.load((loader, resources) => {
            this.resources = resources;
            resolve();
            });
        });
    }
}
```

The `load` method of the `PIXI.Loader` object takes a callback function as a parameter, which will be called when all the resources have finished loading and become available for use.

The callback function takes 2 parameters: the loader object itself and the second parameter is the loaded resources. Let's put them in the `resources` field in the `Loader` class, which we specially reserved for all loaded resources.
