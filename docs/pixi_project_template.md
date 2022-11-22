# Сreating PixiJS project template

In this article, our goal is to develop a simple project template that we will use as a foundation for all our future games. You can check the final template code in [GitHub](https://github.com/bolotnikov/pixi-project-template).

## Template functionality:
- Application creation and launch
- Resource loading and rendering
- Management of scenes, states, animations, sounds and screen

## 1. Creating the structure
Let's take an empty project structure from [the initial branch](https://github.com/bolotnikov/pixi-project-template/tree/initial) and examine it.

### 1.1 Document template
<details>
  <summary>index.html</summary>

``` html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <style>
    body {
        background-color: #000;
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
    }
    canvas {
        position:absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
    }
  </style>
  <body>
  </body>
</html>
```
  
</details>
The HTML template will contain the final JavaScript code after the game is built. Let’s style the canvas element and leave the `body` tag empty.


### 1.2 Project dependencies.
<details>
  <summary>package.json</summary>

``` javascript
{
  "name": "match3",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "webpack --config webpack/prod.js ",
    "start": "webpack-dev-server --config webpack/base.js --open"
  },
  "dependencies": {
    "gsap": "^3.10.4",
    "pixi.js": "^6.5.1"
  },
  "devDependencies": {
    "babel-loader": "^8.2.5",
    "clean-webpack-plugin": "^4.0.0",
    "file-loader": "^6.2.0",
    "html-webpack-plugin": "^5.5.0",
    "webpack-cli": "^4.10.0",
    "webpack-dev-server": "^4.9.3",
    "webpack-merge": "^5.8.0"
  }
}
```
</details>
Config contains project settings and dependencies. Main dependencies are:

- [gsap](https://greensock.com/gsap/) for animations
- [pixi](https://pixijs.com/) for rendering
- [webpack](https://webpack.js.org/) and [babel](https://babeljs.io/) for build

### 1.3 Project structure

* `webpack/` - build scripts
* `src/scripts/system/` - common system code, the same for all games
* `src/scripts/game/` - code of the game itself, unique for each project
* `src/sounds/` - audio assets
* `src/sprites/` - images assets


### 1.4 Commands
First we need to install dependencies from `package.json`

``` bash
npm i
```

As you can see in the scripts block in `package.json`, we have 2 ways to run webpack: build and start.

``` bash
npm start
```

This command creates the build with the developer environment and automatically run the project in the browser using dev-server.

``` bash
npm run build
```

This command creates the build for production and save the created build's files in the `dist/` folder.

This folder is created automatically and cleared every time we run the command, so be careful not to save files in this folder.

## 2. Creating the canvas element

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

## 3. Creating the loader

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

## 4. Game launch
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


## 5. Sprite Output
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
## 6. Useful links
- [Final source code](https://github.com/bolotnikov/pixi-project-template)
- [`PIXI.Application`](https://pixijs.download/dev/docs/PIXI.Application.html)
- [`PIXI.Loader`](https://pixijs.download/v6.1.1/docs/PIXI.Loader.html)
- [`PIXI.Sprite`](https://pixijs.download/dev/docs/PIXI.Sprite.html)
- [`PIXI.Container`](https://pixijs.download/dev/docs/PIXI.Container.html)
- [GSAP](https://greensock.com/gsap/)
- [PIXI](https://pixijs.com/)
- [Webpack](https://webpack.js.org/) 
- [Babel](https://babeljs.io/)
- [Webpack `require.context`](https://webpack.js.org/guides/dependency-management/#requirecontext)