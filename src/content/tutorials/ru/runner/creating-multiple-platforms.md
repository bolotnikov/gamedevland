---
locale: ru
translationKey: runner/creating-multiple-platforms
title: Шаг 4. Создание нескольких платформ
description: 'Шаг 4 руководства по созданию платформера с PixiJS: создание нескольких платформ.'
seriesTitle: Создание платформера с PixiJS
seriesDescription: Пошаговое руководство по созданию бесконечного раннера с PixiJS, процедурными платформами, физикой и перемещением героя.
seriesSlug: runner
step: 4
readingTime: 2 минуты чтения
steps:
  - step: 1
    slug: ''
    title: Создание движущегося фона
  - step: 2
    slug: creating-a-single-platform
    title: Создание одной платформы
  - step: 3
    slug: creating-a-hero
    title: Создание героя
  - step: 4
    slug: creating-multiple-platforms
    title: Создание нескольких платформ
  - step: 5
    slug: enable-physics
    title: Подключение физики
  - step: 6
    slug: the-physical-body-of-platforms
    title: Физическое тело платформ
  - step: 7
    slug: movement-of-platforms
    title: Движение платформ
  - step: 8
    slug: the-physical-body-of-the-hero
    title: Физическое тело героя
  - step: 9
    slug: hero-jump
    title: Прыжок героя
  - step: 10
    slug: collision-of-the-hero-and-platform
    title: Столкновение героя с платформой
  - step: 11
    slug: creating-diamonds
    title: Создание алмазов
  - step: 12
    slug: the-physical-body-of-a-diamond
    title: Физическое тело алмаза
  - step: 13
    slug: collecting-diamonds
    title: Сбор алмазов
  - step: 14
    slug: ui
    title: Интерфейс
  - step: 15
    slug: restarting-the-game-when-the-hero-falls
    title: Перезапуск игры при падении героя
---

Мы создали первую платформу и разместили на ней героя. Но в нашей игре платформы должны создаваться автоматически и бесконечно. Пора написать код генерации всех платформ.

Создадим класс `Platforms`, отвечающий за генерацию всех платформ игры:
``` javascript
import * as PIXI from "pixi.js";
import { App } from "../system/App";
import { Platform } from "./Platform";

export class Platforms {
    constructor() {
        this.platforms = [];
        this.container = new PIXI.Container();
    }
}
```

Все созданные платформы поместим в массив `this.platforms`. Также добавим их дочерними элементами общего контейнера `this.container`, который затем добавим на сцену.

Поскольку класс `Platforms` создаёт все платформы, он должен создавать и самую первую. Перенесём её создание из `GameScene` в `Platforms`:

``` javascript
export class Platforms {
    constructor() {
        //...
        this.createPlatform({
            rows: 4,
            cols: 6,
            x: 200
        });
    }
    createPlatform(data) {
        const platform = new Platform(data.rows, data.cols, data.x);
        this.container.addChild(platform.container);
    }
}
```

На самой сцене вместо создания первой платформы нужно инициализировать экземпляр `Platforms`:

``` javascript
export class GameScene extends Scene {
    create() {
        // ...
        this.createPlatforms();
    }

    //...
    createPlatforms() {
        this.platfroms = new Platforms();
        this.container.addChild(this.platfroms.container);
    }

update(dt) {
    // ...
    this.platfroms.update(dt);
    }
}
```
Также мы добавили вызов `Platforms.update` в `GameScene.update`. Так мы будем постоянно проверять состояние менеджера платформ и выполнять нужные действия в подходящий момент.

Какие действия нужно выполнять в определённые моменты? Например, можно автоматически создавать платформы, пока последняя созданная не выйдет за экран. Реализуем `update` в классе `Platforms`:

``` javascript
    update() {
        if (this.current.container.x + this.current.container.width < window.innerWidth) {
            this.createPlatform(this.randomData);
        }
    }
```
Если последняя платформа целиком помещается на экране, то есть координата её правой стороны меньше ширины экрана, создаём следующую. Так мы создаём платформы, пока не заполним весь экран: до тех пор, пока последняя не выйдет за его правую границу.

Последняя созданная платформа хранится в `this.current`. Добавим его установку в `createPlatform` вместе с добавлением платформы в массив `this.platforms`:

``` javascript
export class Platforms {
    //...
    createPlatform(data) {
        const platform = new Platform(data.rows, data.cols, data.x);
        this.container.addChild(platform.container);
        this.platforms.push(platform);
        this.current = platform;
    }
}
```

Каждая следующая платформа, в отличие от первой, будет создаваться со случайными параметрами. Их возвращает геттер `randomData`.

Случайные параметры всё же должны оставаться в допустимых диапазонах, чтобы размеры и позиции платформ были разумными. Опишем ограничения в глобальной конфигурации `Config.js`:

``` javascript
    platforms: {
        ranges: {
            rows: {
                min: 2,
                max: 6
            },
            cols: {
                min: 3,
                max: 9
            },
            offset: {
                min: 60,
                max: 200
            }
        }
    },
```
Здесь заданы минимальное и максимальное число строк и столбцов одной платформы, а также минимальное и максимальное смещение относительно предыдущей. Теперь реализуем `randomData` на основе этих диапазонов:

``` javascript
    get randomData() {
        this.ranges = App.config.platforms.ranges;
        let data = { rows: 0, cols: 0, x: 0 };

        const offset = this.ranges.offset.min + Math.round(Math.random() * (this.ranges.offset.max - this.ranges.offset.min));

        data.x = this.current.container.x + this.current.container.width + offset;
        data.cols = this.ranges.cols.min + Math.round(Math.random() * (this.ranges.cols.max - this.ranges.cols.min));
        data.rows = this.ranges.rows.min + Math.round(Math.random() * (this.ranges.rows.max - this.ranges.rows.min));

        return data;
    }
```
