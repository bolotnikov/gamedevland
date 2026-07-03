---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Step 1. Creating the structure"
description: "Step 1 of the Creating PixiJS project template tutorial: Creating the structure."
seriesTitle: "Creating PixiJS project template"
seriesDescription: "Build a reusable PixiJS + JavaScript project template with loading, scenes, sprites, and a clean application structure."
seriesSlug: "pixi-project-template"
step: 1
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
In this article, our goal is to develop a simple project template that we will use as a foundation for all our future games. You can check the final template code in [GitHub](https://github.com/gamedevland/pixi-project-template).

## Video version
<iframe width="560" height="315" src="https://www.youtube.com/embed/itT6L3LQ1cM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Step-by-step guide on Udemy
- [https://www.udemy.com/course/pixicourse/](https://www.udemy.com/course/pixicourse/)

## Template functionality:
- Application creation and launch
- Resource loading and rendering
- Management of scenes, states, animations, sounds and screen

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
