---
locale: ru
translationKey: match3/moving-tiles
title: Шаг 2. Перемещение плиток
description: 'Шаг 2 руководства по созданию игры «три в ряд» с PixiJS: перемещение плиток.'
seriesTitle: Создание игры «три в ряд» с PixiJS
seriesDescription: 'Пошаговое руководство по созданию игры «три в ряд» с PixiJS: от игрового поля до перемещения плиток и обработки комбинаций.'
seriesSlug: match3
step: 2
readingTime: 3 минуты чтения
steps:
  - step: 1
    slug: ''
    title: Создание поля плиток
  - step: 2
    slug: moving-tiles
    title: Перемещение плиток
  - step: 3
    slug: search-for-combinations
    title: Поиск комбинаций
  - step: 4
    slug: processing-combinations
    title: Обработка комбинаций
---

Начинаем реализовывать перемещение плиток.

<a id="21-selecting-a-tile-to-move" class="translation-anchor" aria-hidden="true"></a>

### 2.1. Выбор плитки для перемещения

Чтобы выбрать плитку, нужно на неё нажать. Значит, плитки должны быть интерактивными. Добавим интерактивность при их создании в классе `Board`:

``` javascript
    createTile(field) {
        // ...
        tile.sprite.interactive = true;
        tile.sprite.on("pointerdown", () => {
            this.container.emit('tile-touch-start', tile);
        });
    }
```
Отправим событие `tile-touch-start`, используя возможности `PIXI.Container`. Затем отследим и обработаем его в классе `Game`:

``` javascript
// ...
export class Game {
    constructor() {
        // ...
        this.board.container.on('tile-touch-start', this.onTileClick.bind(this));
    }
// ...
```

При событии `tile-touch-start` вызовем `onTileClick`. В этом методе обработаем три возможных сценария:

:one: выбрать новую плитку, если ни одна ещё не выбрана

:two: поменять плитки местами, если другая уже выбрана и находится рядом с текущей

:three: выбрать новую плитку, если другая уже выбрана, но не соседствует с текущей

Сейчас реализуем первый пункт. Сейчас реализуем первый пункт. При выборе новой плитки нужно сделать две вещи:

1. запомнить выбранную плитку
2. визуально выделить выбранную клетку

``` javascript
export class Game {
    onTileClick(tile) {
        if (this.selectedTile) {
            // select new tile or make swap
        } else {
            this.selectTile(tile);
        }
    }

    selectTile(tile) {
        this.selectedTile = tile;
        this.selectedTile.field.select();
    }
```

Выделим клетку с выбранной плиткой дополнительной рамкой. Реализуем код в классе `Field`:

``` javascript
export class Field {
    constructor(row, col) {
        // ...
        this.selected = App.sprite("field-selected");
        this.sprite.addChild(this.selected);
        this.selected.visible = false;
        this.selected.anchor.set(0.5);

    }

    unselect() {
        this.selected.visible = false;
    }

    select() {
        this.selected.visible = true;
    }
```

<a id="22-swapping-tiles" class="translation-anchor" aria-hidden="true"></a>

### 2.2. Обмен плиток

В `onTileClick` класса `Game` добавьте вызов `swap`, реализующего перемещение плиток:

``` javascript
    onTileClick(tile) {
        if (this.selectedTile) {
            this.swap(this.selectedTile, tile);
        } else {
            this.selectTile(tile);
        }
    }
```
Определим действия, необходимые для перемещения плиток:

:one: Сбросить связи с клетками у перемещаемых плиток

:two: Сбросить связи с плитками у клеток поля

:three: Разместить перемещённые плитки в позициях новых клеток на экране

Для перемещения плиток создадим твин-анимацию с gsap. На время анимации стоит заблокировать взаимодействие с полем дополнительным флагом.

Реализуем эти действия в коде:
``` javascript
    swap(selectedTile, tile) {
        this.disabled = true;        // lock the board to prevent tiles from moving again while the animation is already running
        this.clearSelection();      // hide the "field-selected" frame from the field of the selectedTile object
        selectedTile.sprite.zIndex = 2; // place the selectedTile sprite one layer higher than the tile sprite

        selectedTile.moveTo(tile.field.position, 0.2); // move selectedTile to tile position
        // move tile to electedTile position
        tile.moveTo(selectedTile.field.position, 0.2).then(() => {
            // after motion animations complete:
            // change the values of the field properties in the tile objects
            // change the values of the tile properties in the field objects
            this.board.swap(selectedTile, tile);
            this.disabled = false; // unlock the board
        });
    }
```

Сбросим выделение клетки в методе `clearSelection`:
``` javascript
    clearSelection() {
        if (this.selectedTile) {
            this.selectedTile.field.unselect();
            this.selectedTile = null;
        }
    }
```
Реализуем `moveTo` в классе `Tile` с твин-анимацией `gsap`:

``` javascript
    moveTo(position, duration) {
        return new Promise(resolve => {
            gsap.to(this.sprite, {
                duration,
                pixi: {
                    x: position.x,
                    y: position.y
                },
                onComplete: () => {
                    resolve()
                }
            });
        });
    }
```

Добавим `swap` в класс `Board`: он будет менять значения свойств перемещаемых объектов:

``` javascript
    swap(tile1, tile2) {
        const tile1Field = tile1.field;
        const tile2Field = tile2.field;

        tile1Field.tile = tile2;
        tile2.field = tile1Field;

        tile2Field.tile = tile1;
        tile1.field = tile2Field;
    }
```

Сейчас можно поменять местами любые плитки поля, а не только соседние. Но обмениваться должны только соседние. Если игрок выбрал несоседнюю плитку, нужно полностью сбросить первое выделение и выбрать новую плитку.

Обновим условие в методе `onTileClick` класса `Game`:

``` javascript
    onTileClick(tile) {
        if (this.disabled) {
            return;
        }

        if (this.selectedTile) {
            if (!this.selectedTile.isNeighbour(tile)) {
                this.clearSelection(tile);
                this.selectTile(tile);
            } else {
                this.swap(this.selectedTile, tile);
            }
        } else {
            this.selectTile(tile);
        }
    }
```
**Примечание.** Мы также добавили проверку флага `disabled`, установленного в прошлом пункте. Так мы блокируем `onTileClick` во время перемещения плиток, чтобы избежать возможных ошибок.


Реализуем `isNeighbour` в классе `Tile`. Соседняя плитка находится либо в смежном столбце, либо в смежной строке. Следовательно, модуль разности строк или столбцов проверяемой и текущей плитки должен равняться единице:

``` javascript
    isNeighbour(tile) {
        return Math.abs(this.field.row - tile.field.row) + Math.abs(this.field.col - tile.field.col) === 1
    }
```
