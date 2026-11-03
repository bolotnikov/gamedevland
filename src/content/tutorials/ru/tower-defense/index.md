---
locale: ru
translationKey: tower-defense/index
title: Шаг 1. Создание тайла
description: 'Шаг 1 руководства по созданию Tower Defense с PIXI: создание тайла.'
seriesTitle: Создание Tower Defense с PIXI
seriesDescription: Создание игры в жанре tower defense с PixiJS, тайловыми картами, врагами, движением по пути и основными игровыми системами.
seriesSlug: tower-defense
step: 1
readingTime: 2 минуты чтения
steps:
  - step: 1
    slug: ''
    title: Создание тайла
  - step: 2
    slug: creating-the-level
    title: Создание уровня
  - step: 3
    slug: creating-the-enemy
    title: Создание врага
  - step: 4
    slug: waves-of-enemies
    title: Волны врагов
  - step: 5
    slug: creating-a-tower
    title: Создание башни
  - step: 6
    slug: preparation-for-shooting
    title: Подготовка к стрельбе
  - step: 7
    slug: shooting
    title: Стрельба
  - step: 8
    slug: enemy-damage
    title: Урон врагу
  - step: 9
    slug: player
    title: Игрок
  - step: 10
    slug: ui
    title: Интерфейс
  - step: 11
    slug: enemies-processing
    title: Обработка врагов
  - step: 12
    slug: earning-and-spending-coins
    title: Заработок и трата монет
---

В этом курсе мы создадим игру в жанре tower defense с помощью PixiJS.

<a id="additional-materials" class="translation-anchor" aria-hidden="true"></a>

## Дополнительные материалы
- [Полный исходный код](https://github.com/gamedevland/tower-defense)
- [Демонстрационная версия](https://gamedevland.github.io/tower-defense/)

Перед началом разработки нужно выполнить два шага:

1️⃣ ( Скачайте наш [шаблон проекта PIXI](https://github.com/gamedevland/pixi-project-template). Можно сразу начать работу над игрой или изучить [руководство](/ru/articles/pixi-project-template) по созданию шаблона PIXI.

2️⃣ Скачайте игровые ресурсы:

- [спрайты](https://github.com/gamedevland/tower-defense/tree/main/src/sprites)
- [тайловую карту](https://github.com/gamedevland/tower-defense/blob/main/src/json/tilemap.json), созданную в редакторе [Tiled](https://www.mapeditor.org/)

Мы скачали и распаковали шаблон проекта, в котором продолжим работу. Обычно я начинаю новую игру с фонового изображения. Здесь вместо него используем полную карту уровня, заранее подготовленную в Tiled в формате tilemap. Вся карта состоит из небольших тайлов. Данные уровня хранятся в двух файлах:

- `tilemap.json`
- `tilemap.png`

Разместим их в нужных папках проекта:

- `/src/json/tilemap.json`
- `/src/sprites/tilemap.png`

Для создания карты на сцене сначала научимся разбирать изображение tilemap.png, чтобы рисовать только нужные тайлы.

Создадим класс `Tile`, отвечающий за отрисовку нужной части карты:

``` javascript
import { EventEmitter } from "events";
import * as PIXI from "pixi.js";
import { App } from "../system/App";

export class Tile extends EventEmitter {
    constructor(id) {
        super();
        this.atlas = App.res("tilemap");
        this.id = id;
        this.createSprite();
    }

    createSprite() {
    }
}
```

`Tile` будет наследоваться от `EventEmitter`, чтобы экземпляры могли отправлять нужные события. Например, башня — разновидность `Tile`. У неё могут быть события, которые в дальнейшем понадобится отслеживать.

В `this.atlas` получим текстуру загруженного ресурса tilemap. Пусть у каждого тайла будет свой ID в атласе, по которому можно определить его положение. Прежде чем рисовать нужную часть изображения, определим её позицию по ID.

Сначала вручную зададим число строк и столбцов изображения атласа `tilemap.png` в конфигурации игры и укажем размер тайлов:

``` javascript

import { Tools } from "../system/Tools";
import { GameScene } from "./GameScene";

export const Config = {
    loader: Tools.massiveRequire(require["context"]('./../../sprites/', true, /\.(mp3|png|jpe?g)$/)),
    scenes: {
        "Game": GameScene
    },
    atlas: {
        cols: 23,
        rows: 13,
        tileSize: 64
    }    
};

```

Зная число строк и столбцов атласа, вычислим, в какой строке и столбце находится тайл с заданным ID:


``` javascript
    get position() {
        let index = 0;

        for (let row = 0; row < App.config.atlas.rows; row++) {
            for (let col = 0; col < App.config.atlas.cols; col++) {
                ++index;
                if (index === this.id) {
                    return {row, col};
               
               }
            }
        }

        return {row: 0, col: 0};
    }
```

Определив строку и столбец тайла в сетке tilemap, наконец можем его нарисовать:

``` javascript
    createSprite() {
        const x = App.config.atlas.tileSize * this.position.col;
        const y = App.config.atlas.tileSize * this.position.row;
        const texture = new PIXI.Texture(this.atlas, new PIXI.Rectangle(x + 1, y + 1, App.config.atlas.tileSize - 2, App.config.atlas.tileSize - 2));
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.anchor.set(0.5);
    }
```

Находим координаты тайла по его месту в сетке с учётом размера. Здесь используем отступ 1px от каждого края: карта была сгенерирована с таким отступом для предотвращения наложения кадров.

Осталось проверить правильность создания тайлов:


``` javascript
import { Scene } from '../system/Scene';
import { Tile } from './Tile';

export class GameScene extends Scene {
    create() {
        const tile = new Tile(1);
        this.container.addChild(tile.sprite);
    }
}
```
