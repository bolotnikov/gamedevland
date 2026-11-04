---
locale: ru
translationKey: pixi-project-template/creating-the-loader
title: Шаг 3. Создание загрузчика
description: 'Шаг 3 руководства по созданию шаблона проекта PixiJS: создание загрузчика.'
seriesTitle: Создание шаблона проекта PixiJS
seriesDescription: Создание переиспользуемого шаблона PixiJS + JavaScript с загрузкой, сценами, спрайтами и понятной структурой приложения.
seriesSlug: pixi-project-template
step: 3
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

Начнём с интерфейса загрузчика, который хотим реализовать.
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

Для загрузки ресурсов `PIXI` предоставляет класс [`PIXI.Loader`](https://pixijs.download/v6.1.1/docs/PIXI.Loader.html). Его можно получить из свойства `app`.

Передадим его первым параметром в конструктор нашего класса `Loader`. Вторым параметром будет список загружаемых ресурсов.


Создайте класс `src/scripts/system/Loader.js`:

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
Все загруженные объекты ресурсов будем добавлять в свойство `resources`, изначально пустое.

Поскольку список ресурсов уникален для каждой игры, конфигурацию ресурсов нужно определить отдельно от общего кода, то есть вне папки `system`.

Создадим файл `game/Config.js`. В нём создадим объект `Config`, уникальный для каждой конкретной игры:

``` javascript
import { Tools } from "../system/Tools";

export const Config = {
    loader: Tools.massiveRequire(require["context"]('./../../sprites/', true, /\.(mp3|png|jpe?g)$/))
};
```

Зададим список загружаемых ресурсов в свойстве `loader`.

Для автоматического получения всех ресурсов из заданной папки используем возможности `require.context`.

Создадим системный класс `Tools` и реализуем в нём метод `massiveRequre`:

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

Теперь нужно обновить точку входа:
``` javascript
import { Config } from "./game/Config";
import { App } from "./system/App";

App.run(Config);
```

Теперь можно полностью реализовать `preload` в классе `Loader`. Сделаем это в два шага:

1. Добавим все ресурсы из конфигурации загрузчика в список загрузки методом `this.loader.add`.
2. Запустим загрузку ресурсов через `this.loader.load`.

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

Метод `load` объекта `PIXI.Loader` принимает callback, вызываемый после завершения загрузки всех ресурсов, когда они становятся доступны для использования.

Callback принимает два параметра: сам загрузчик и загруженные ресурсы. Поместим ресурсы в поле `resources` класса `Loader`, которое мы специально оставили для всех загруженных ресурсов.
