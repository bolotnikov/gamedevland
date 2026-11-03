---
locale: ru
translationKey: tower-defense/creating-the-level
title: Шаг 2. Создание уровня
description: 'Шаг 2 руководства по созданию Tower Defense с PIXI: создание уровня.'
seriesTitle: Создание Tower Defense с PIXI
seriesDescription: Создание игры в жанре tower defense с PixiJS, тайловыми картами, врагами, движением по пути и основными игровыми системами.
seriesSlug: tower-defense
step: 2
readingTime: 3 минуты чтения
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

Мы научились создавать нужный тайл по ID. Теперь можно нарисовать всю карту из `tilemap.json`. Для этого создадим новый класс `LevelMap`.

1. Получим данные уровня из `tilemap.json` в переменную `const TilemapJson` через `require`, прочитав соответствующий файл.
2. Создадим контейнер `this.container` для спрайтов тайлов.
3. Создадим поле `this.tiles` для всех созданных тайлов.
4. Отрисовку карты реализуем в методе `this.render`

``` javascript
import * as PIXI from "pixi.js";
import { Tile } from "./Tile";
import { App } from "../system/App";
const TilemapJson = require("../../json/tilemap.json");

export class LevelMap {
    constructor() {
        this.container = new PIXI.Container();
        this.tiles = {};
        this.render();
    }

    render() {
    }
}
```

Нужно реализовать `render`, чтобы нарисовать карту уровня на игровой сцене.

Определим данные, необходимые для отрисовки карты:

1. В `Tiled` мы создали уровень из сетки тайлов 18 x 32.
2. Также на карте создано 5 слоёв.
3. В игре мы собираемся выводить тайлы вдвое меньше их исходного размера в атласе: 32px вместо 64px. Добавим эти данные в конфигурацию игры:

``` javascript
export const Config = {
    // ...
    level: {
        rows: 18,
        cols: 32,
        layers: 5,
        tileSize: 32
    }
};
```

В поле `level` указаны данные самого уровня. Карта — сетка 18 x 32: 18 строк, по 32 тайла в каждой. А в поле `atlas`, созданном на прошлом шаге, хранится информация об атласе `tilemap.png`: сетка 23 X 13 с тайлами размером 64px.

У карты есть 5 слоёв, добавленных при создании в `Tiled`. Поэтому нужно пройти каждый слой и проверить наличие тайла в заданной позиции:

``` javascript
    render() {
        for (let layer = 0; layer < App.config.level.layers; layer++) {
            let index = 0;
            const layerData = TilemapJson.layers[layer];
            this.tiles[layerData.name] = [];
        }
    }
```

Информацию о наличии тайла в сетке получаем из данных текущего слоя `tilemap.json`. Сохраним их в `layerData`. Каждое свойство `this.tiles` будет соответствовать отдельному слою карты.

Если `tilemap.json` содержит данные текущего слоя, ID тайла можно получить по счётчику `index`, увеличивающемуся на 1 при каждой проверке следующего тайла. Пройдём все столбцы всех строк карты, увеличивая `index` на каждой итерации. Так узнаем, есть ли тайл в заданной позиции на нужном слое, и получим его ID:

``` javascript

    render() {
        for (let layer = 0; layer < App.config.level.layers; layer++) {
            let index = 0;
            const layerData = json.layers[layer];
            this.tiles[layerData.name] = [];

            if (layerData.data) {
                for (let row = 0; row < App.config.level.rows; row++) {
                    for (let col = 0; col < App.config.level.cols; col++) {
                        const tileId = TilemapJson.layers[layer].data[index];
                        index++;
                        if (tileId) {
                            const tile = this.renderTile(tileId, row, col);
                            this.tiles[layerData.name].push(tile);

                        }
                    }
                }
            }
        }

    }
}
```

Если ID тайла в этой позиции найден, можно его нарисовать:

``` javascript

    renderTile(id, row, col) {
        let tile = new Tile(id);
        tile.sprite.x = col * App.config.level.tileSize;
        tile.sprite.y = row * App.config.level.tileSize;
        tile.sprite.width = App.config.level.tileSize;
        tile.sprite.height = App.config.level.tileSize;
        this.container.addChild(tile.sprite);
        return tile;
    }
```

При отрисовке используем желаемые размеры тайлов в игре. Данные берём из `tileSize` объекта `level`, а не `map`. У нас это 32px. С учётом этих размеров создаём тайл в нужной позиции с правильным смещением и добавляем его в контейнер `LevelMap`.

Теперь можно вывести всю карту в сцене `Game`:


``` javascript
import { Scene } from '../system/Scene';
import { LevelMap } from './LevelMap';

export class GameScene extends Scene {
    create() {
        this.createMap();
    }
    createMap() {
        this.map = new LevelMap();
        this.container.addChild(this.map.container);
    }
}
```

Сетка 18x32 с тайлами 32px даёт карту размером 1024 x 576 пикселей.

Укажем эти данные при создании canvas pixi в классе `App`:

``` javascript
        this.app = new PIXI.Application({ width: 1024, height: 576});
        this.app.view.style = `width: 1024px; height: 576;`;
```

Проверим, правильно ли карта отображается на экране.
