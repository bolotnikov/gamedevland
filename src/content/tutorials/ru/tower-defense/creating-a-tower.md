---
locale: ru
translationKey: tower-defense/creating-a-tower
title: Шаг 5. Создание башни
description: 'Шаг 5 руководства по созданию Tower Defense с PIXI: создание башни.'
seriesTitle: Создание Tower Defense с PIXI
seriesDescription: Создание игры в жанре tower defense с PixiJS, тайловыми картами, врагами, движением по пути и основными игровыми системами.
seriesSlug: tower-defense
step: 5
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

На уровне появились враги, и пора создать башни, которые будут по ним стрелять.

<a id="51-tower-place" class="translation-anchor" aria-hidden="true"></a>

### 5.1. Место для башни
На карте есть специальные места для строительства башен. Мы определили их как особые тайлы в `tilemap` на отдельном слое `towers`.

Явно зададим, какие тайлы являются местами для башен. Кадры tilemap с номерами `42` и `111` — нужные тайлы. Для них укажем в конфигурации специальный класс, наследующийся от `Tile`:

```javascript
export const Config = {
    // ...
    tiles: {
        42: TowerPlace,
        111: TowerPlace
    }
}
```

Создадим класс `TowerPlace`:

```javascript
import { App } from "../system/App";
import { Tile } from "./Tile";

export class TowerPlace extends Tile {

    constructor(id) {
        super(id)
        this.level = 0;
        this.sprite.interactive = true;
        this.sprite.once("pointerdown", this.onClick, this);
        this.tower = null;
    }

    onClick() {
        App.emit("tower-place-click", this);
    }
}
```
Передадим в его конструктор идентификатор тайла.

Поле `this.level` показывает уровень башни, построенной на этом месте. Соответственно, `this.level = 0;` означает, что башни здесь пока нет.

Свойство `this.tower` хранит объект башни, построенной на этом месте.

Главная задача `TowerPlace` — отслеживать нажатие на такой тайл и отправлять событие через класс приложения.


Унаследуем `Application` от `EventEmitter` из библиотеки `events`, чтобы отправлять и слушать события:

```javascript
import { EventEmitter } from "events";

class Application extends EventEmitter {
    // ...
}
```

Создавая тайлы в `LevelMap`, нужно определять класс для текущего тайла: базовый `Tile` или специальный `TowerPlace`, если идентификатор указан в конфигурации. Для этой задачи хорошо подходит паттерн «Фабрика».

Создадим `TileFactory` со статическим методом `create`. Он принимает id тайла. Если для этого id в конфигурации игры указан специальный класс, создаём его экземпляр. Иначе создаём базовый `Tile`:

```javascript
import { App } from "../system/App";
import { Tile } from "./Tile";

export class TileFactory {

    static create(id) {
        const tileClass = App.config.tiles[id];

        if (tileClass) {
            return new tileClass(id);
        }

        return new Tile(id);
    }
}
```

Обновим первую строку `LevelMap.renderTile`: вместо прямого создания `Tile` используем фабрику:

```javascript
renderTile(id, row, col) {
    const tile = TileFactory.create(id);
    // ...
}
```

В классе `Game` добавим обработчик нажатия на место башни:

```javascript
export class GameScene extends Scene {
    create() {
        // ...
        this.setEvents();
    }

    setEvents() {
        App.on("tower-place-click", this.onTowerPlaceClick.bind(this));
    }

    onTowerPlaceClick(towerPlace) {
        console.log("tower place click", towerPlace);
    }
```

<a id="52-tower-construction" class="translation-anchor" aria-hidden="true"></a>

### 5.2. Строительство башни

Башни представлены тайлами с номерами `250` и `251`. Добавим эти данные в конфигурацию игры:

```javascript
export const Config = {
    // ...
    towers: {
        "tower1": {
            "id": 250,
            "range": 300,
            "coins": 100,
            "cooldown": 1000,
            "bullet": {
                "speed": 10,
                "damage": 1
            }
        },
        "tower2": {
            "id": 251,
            "range": 400,
            "coins": 200,
            "cooldown": 500,
            "bullet": {
                "speed": 15,
                "damage": 2
            }
        }
    }
}
```
Также мы добавили необходимые данные каждой башни:
- `coins` — стоимость строительства
- `range` — радиус зоны действия
- `cooldown` — время перезарядки
- `bullet` — скорость и урон снарядов башни

Унаследуем класс `Tower` от `Tile`:

```javascript
import { Tile } from "./Tile";

export class Tower extends Tile {
    constructor(config) {
        super(config.id);
        this.config = config;
        this.place = null;
        this.active = false;
    }
}
```
В конструктор `Tower` передадим конфигурацию текущей башни. Также зададим поле `this.place` с объектом `towerPlace`. Флаг `this.active` означает, что башня готова стрелять и не перезаряжается.

Теперь можно построить башню. Каждое нажатие на место башни будет строить там башню следующего уровня. Для этого есть `Game.onTowerPlaceClick`. Нам нужно:

1. Увеличить уровень башни выбранного объекта `towerPlace`.
2. Найти в конфигурации башню с уровнем, соответствующим выбранному `towerPlace`.
3. Если такая башня есть, создать её объект и сохранить в `towerPlace`.
4. Если на месте уже была башня, уничтожить её спрайт.

```javascript
onTowerPlaceClick(towerPlace) {
    ++towerPlace.level;

    const towerConfig = App.config.towers["tower" + towerPlace.level];

    if (towerConfig) {
        if (towerPlace.tower) {
            towerPlace.tower.sprite.destroy();
        }

        const tower = new Tower(towerConfig);
        towerPlace.tower = tower;
        tower.place = towerPlace;
        towerPlace.sprite.addChild(tower.sprite);
    }
}
```

После строительства сохраним ссылку на башню в `towerPlace`, а ссылку на `towerPlace` — в самой `tower`. Для вывода башни на карту добавим её спрайт дочерним элементом спрайта места.
