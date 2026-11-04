---
locale: ru
translationKey: runner/creating-a-single-platform
title: Шаг 2. Создание одной платформы
description: 'Шаг 2 руководства по созданию платформера с PixiJS: создание одной платформы.'
seriesTitle: Создание платформера с PixiJS
seriesDescription: Пошаговое руководство по созданию бесконечного раннера с PixiJS, процедурными платформами, физикой и перемещением героя.
seriesSlug: runner
step: 2
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

Создадим первую платформу, на которую герой приземлится в самом начале игры. Для этого выведем тайлы платформы на экран, соединив их в достаточно длинную поверхность. Начнём с вызова метода создания платформы в классе `GameScene`:


``` javascript
    create() {
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
```

Функциональность платформы опишем в классе `Platform`. В его `constructor` передадим три обязательных параметра, определяющих создаваемую платформу:
  - число строк
  - число столбцов
  - координата x на экране, с которой нужно начать рисовать платформу

Создадим класс `Platform`:

``` javascript
import * as PIXI from "pixi.js";
import { App } from '../system/App';

export class Platform {
    constructor(rows, cols, x) {
        this.rows = rows;
        this.cols = cols;
    }
}
```
Нам понадобятся полные размеры платформы: ширина и высота. Платформа состоит из одинаковых тайлов. Зная размер тайла и число тайлов в строке и столбце, легко вычислить общую ширину и высоту:

``` javascript
export class Platform {
    constructor(rows, cols, x) {
        // ...
        this.tileSize = PIXI.Texture.from("tile").width;
        this.width = this.tileSize * this.cols;
        this.height = this.tileSize * this.rows;
    }
}
```

Все созданные тайлы нужно поместить в общий контейнер платформы, который затем добавляется во внешний контейнер сцены. Создадим контейнер тайлов:

``` javascript
export class Platform {
    constructor(rows, cols, x) {
        // ...
        this.createContainer(x);
    }
    createContainer(x) {
        this.container = new PIXI.Container();
        this.container.x = x;
        this.container.y = window.innerHeight - this.height;
    }
}
```
При создании контейнера задаём координату `x`, полученную через параметр конструктора. Так левая сторона платформы смещается к этой координате. Для `y` задаём значение, при котором нижняя сторона платформы касается низа экрана. Получится эффект платформы, выступающей из земли. Координаты контейнера соответствуют первой, то есть верхней левой, плитке. Поэтому, подняв всю платформу на расстояние, равное её высоте, получим нужный эффект.

Теперь создадим сами тайлы:


``` javascript
export class Platform {
    constructor(rows, cols, x) {
        // ...
        this.createTiles();
    }
    createTiles() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.createTile(row, col);
            }
        }
    }

    createTile(row, col) {
        const texture = row === 0 ? "platform" : "tile" 
        const tile = App.sprite(texture);
        this.container.addChild(tile);
        tile.x = col * tile.width;
        tile.y = row * tile.height;
    }
}
```
Создаём тайлы в цикле, проходя строки и столбцы платформы. В первой строке используем спрайт `platform` с травой, в остальных — обычный `tile` с землёй. Позицию каждого тайла рассчитываем по его месту в платформе: умножаем столбец на ширину тайла, а строку — на высоту.
