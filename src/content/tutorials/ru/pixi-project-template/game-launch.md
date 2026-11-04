---
locale: ru
translationKey: pixi-project-template/game-launch
title: Шаг 4. Запуск игры
description: 'Шаг 4 руководства по созданию шаблона проекта PixiJS: запуск игры.'
seriesTitle: Создание шаблона проекта PixiJS
seriesDescription: Создание переиспользуемого шаблона PixiJS + JavaScript с загрузкой, сценами, спрайтами и понятной структурой приложения.
seriesSlug: pixi-project-template
step: 4
readingTime: 2 минуты чтения
steps:
  - step: 1
    slug: ''
    title: Создание структуры
  - step: 2
    slug: creating-the-canvas-element
    title: Создание элемента canvas
  - step: 3
    slug: creating-the-loader
    title: Создание загрузчика
  - step: 4
    slug: game-launch
    title: Запуск игры
  - step: 5
    slug: sprite-output
    title: Вывод спрайта
  - step: 6
    slug: scenes-manager
    title: Менеджер сцен
  - step: 7
    slug: useful-links
    title: Полезные ссылки
---

В классе `Application` реализуем `start`, который запустит игру после загрузки ресурсов:

``` javascript
// ...
class Application {
// ... 
    start() {
        this.scene = new this.config["startScene"]();
        this.app.stage.addChild(this.scene.container);
    }
```

Можно было бы создать экземпляр класса сцены прямо в `start`. Но мы хотим, чтобы общий код папки `system` не зависел от игрового кода папки `game`. Для этого мы и разделили системный код и код проекта. При этом системный код может узнавать нужные параметры через конфигурацию игры, переданную классу `App` при запуске приложения. Поэтому вместо прямого создания игровой сцены в `Application` лучше создать её через параметр конфигурации. Добавьте параметр `startScene` в конфигурацию игры в `Config.js`:

``` javascript
import { Game } from "./Game";
 
export const Config = {
    // ...
    startScene: Game,
};
```

Создайте сам класс `Game` в папке игры `/src/scripts/game/Game`:

``` javascript
import * as PIXI from "pixi.js";
import { App } from "../system/App";
  
export class Game {
    constructor() {
        this.container = new PIXI.Container();
    }
}
```

Класс сцены основан на [`PIXI.Container`](https://pixijs.download/dev/docs/PIXI.Container.html). Все объекты сцены будем добавлять в этот контейнер. Сам контейнер сцены мы добавили в основной контейнер `app.stage` в методе start класса `Application`.
