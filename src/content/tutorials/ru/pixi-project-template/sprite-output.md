---
locale: ru
translationKey: pixi-project-template/sprite-output
title: Шаг 5. Вывод спрайта
description: 'Шаг 5 руководства по созданию шаблона проекта PixiJS: вывод спрайта.'
seriesTitle: Создание шаблона проекта PixiJS
seriesDescription: Создание переиспользуемого шаблона PixiJS + JavaScript с загрузкой, сценами, спрайтами и понятной структурой приложения.
seriesSlug: pixi-project-template
step: 5
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

Для вывода спрайтов реализуем вспомогательный метод в классе `Application`:

``` javascript
    res(key) {
        return this.loader.resources[key].texture;
    }

    sprite(key) {
        return new PIXI.Sprite(this.res(key));
    }
```

Все загруженные ресурсы хранятся в свойстве `resources` нашего класса `Loader`. Получив нужный ресурс по ключу, можно создать экземпляр [`PIXI.Sprite`](https://pixijs.download/dev/docs/PIXI.Sprite.html). Теперь в коде игры достаточно вызвать `App.sprite`, чтобы получить нужный [`PIXI.Sprite`](https://pixijs.download/dev/docs/PIXI.Sprite.html) и работать с ним. Выведем фоновое изображение:

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
