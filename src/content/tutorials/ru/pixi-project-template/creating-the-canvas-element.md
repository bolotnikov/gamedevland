---
locale: ru
translationKey: pixi-project-template/creating-the-canvas-element
title: Шаг 2. Создание элемента canvas
description: 'Шаг 2 руководства по созданию шаблона проекта PixiJS: создание элемента canvas.'
seriesTitle: Создание шаблона проекта PixiJS
seriesDescription: Создание переиспользуемого шаблона PixiJS + JavaScript с загрузкой, сценами, спрайтами и понятной структурой приложения.
seriesSlug: pixi-project-template
step: 2
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

Создайте файл `src/scripts/system/App.js`. Это главный класс приложения. Реализуем метод `run`, запускающий игру.

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

Здесь мы импортируем библиотеку `PIXI` и создаём приложение `PIXI`. Свойство `view` объекта `this.app` — это HTML-элемент `canvas`, который мы добавляем в DOM нашего HTML-шаблона.

Кроме того, мы делаем этот класс singleton: создаём экземпляр и экспортируем созданный объект, а не сам класс.

Поэтому при импорте из этого файла в любом месте приложения мы получаем один и тот же объект `App`. Через глобальный `App` можно обращаться ко всем нужным классам управления игрой: менеджеру экрана, звука, сцен и так далее.

Создайте точку входа `src/scripts/index.js` и запустите приложение:


``` javascript
import { App } from "./system/App";
App.run();
```
