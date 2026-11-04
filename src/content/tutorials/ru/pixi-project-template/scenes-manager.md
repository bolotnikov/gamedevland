---
locale: ru
translationKey: pixi-project-template/scenes-manager
title: Шаг 6. Менеджер сцен
description: 'Шаг 6 руководства по созданию шаблона проекта PixiJS: менеджер сцен.'
seriesTitle: Создание шаблона проекта PixiJS
seriesDescription: Создание переиспользуемого шаблона PixiJS + JavaScript с загрузкой, сценами, спрайтами и понятной структурой приложения.
seriesSlug: pixi-project-template
step: 6
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

Создадим менеджер для удобного переключения игровых сцен. Сначала создадим базовый класс сцены:

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

Добавим в базовый класс три метода, которые можно переопределить в игровой сцене:
- `create`
- `update`
- `destroy`

В конструкторе выполним общие действия, нужные каждой сцене игры:
- создадим контейнер сцены
- вызовем `create`, который будет переопределён в игровой сцене
- добавим ticker `PIXI` с методом `update`, чтобы тот вызывался на каждом кадре анимации
- добавим метод `remove`, вызываемый менеджером при уничтожении сцены, и реализуем в нём удаление ticker


Теперь создадим сам менеджер для управления и переключения сцен:

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
Единственная задача менеджера — запуск сцены. Если какая-то сцена уже запущена, её нужно удалить. Нужную сцену зададим ключом, переданным в `start`. Какой класс сцены соответствует ключу, укажем в глобальной конфигурации:

``` javascript
// ...
export const Config = {
    // ...
    scenes: {
        "Game": Game
    }
};
```

Доработаем игровую сцену `Game`, унаследовав её от базового класса сцены:

``` javascript
//...
import { Scene } from "../system/Scene";

export class Game extends Scene {
    // ...
}
```

Остаётся изменить способ запуска сцены в классе приложения `App.js`:

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
