# Сreating PixiJS project template

In this article, our goal is to develop a simple project template that we will use as a foundation for all our future games.

## Template functionality:
- Application creation and launch
- Resource loading and rendering
- Management of scenes, states, animations, sounds and screen

## 1. Creating the Template Structure
### 1.1 Document template
index.html file is an html document template that will contain the JavaScript code of the game after it is built. Let’s style the canvas element, and leave the body tag empty.


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


### 1.2 Project dependencies.

package.json contains project settings and dependencies.


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


Main dependencies are:

- [gsap](https://greensock.com/gsap/) for animations
- [pixi](https://pixijs.com/) for rendering
- [webpack](https://webpack.js.org/) and [babel](https://babeljs.io/) for build

### 1.3. Project structure

* `webpack/` - build scripts
* `src/scripts/system` - common system code, the same for all games
* `src/scripts/game` - code of the game itself, unique for each project
* `src/sounds` - sounds
* `src/sprites` - sprites


### 1.4 Commands
Installing dependencies from package.json

``` bash
npm i
```

As you can see in the scripts block in package.json, we have 2 ways to run webpack: build and start.

``` bash
npm start
```

Creates the build with the developer environment and automatically run the project in the browser using dev-server.

``` bash
npm run build
```

Creates the build for production and save the build files in the /dist folder.

This folder is created automatically and cleared every time you run the command, so be careful not to save files in this folder.

## 2. Creating the canvas element
Section in progress…