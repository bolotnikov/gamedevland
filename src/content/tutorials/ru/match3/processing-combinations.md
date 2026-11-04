---
locale: ru
translationKey: match3/processing-combinations
title: Шаг 4. Обработка комбинаций
description: 'Шаг 4 руководства по созданию игры «три в ряд» с PixiJS: обработка комбинаций.'
seriesTitle: Создание игры «три в ряд» с PixiJS
seriesDescription: 'Пошаговое руководство по созданию игры «три в ряд» с PixiJS: от игрового поля до перемещения плиток и обработки комбинаций.'
seriesSlug: match3
step: 4
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

<a id="41-removing-tiles" class="translation-anchor" aria-hidden="true"></a>

### 4.1. Удаление плиток

Сначала удалим все плитки из собранных комбинаций:

``` javascript
export class Game {
// ...
    swap(selectedTile, tile) {
        // ...
            const matches = this.combinationManager.getMatches();
            if (matches.length) {
                this.processMatches(matches);
            }
        });
    }

    processMatches(matches) {
        this.removeMatches(matches);
    }

    removeMatches(matches) {
        matches.forEach(match => {
            match.forEach(tile => {
                tile.remove();
            });
        });
    }
}
```

Реализуем метод `remove` в классе `Tile`:


``` javascript
    remove() {
        if (!this.sprite) {
            return;
        }
        this.sprite.destroy();
        this.sprite = null;

        if (this.field) {
            this.field.tile = null;
            this.field = null;
        }
    }
```
Если у объекта больше нет спрайта, он уже удалён. Иначе удаляем спрайт и ссылку на клетку. У самой клетки также удаляем ссылку на текущую плитку.

<a id="42-fall-of-the-remaining-tiles" class="translation-anchor" aria-hidden="true"></a>

### 4.2. Падение оставшихся плиток

После срабатывания комбинации и удаления её плиток оставшиеся плитки нужно опустить на поле. Добавьте вызов `processFallDown` в `processMatches`:

```javascript
    processMatches(matches) {
        this.removeMatches(matches);
        this.processFallDown();
    }
```

Начиная с нижней строки поля, проверяем каждую клетку на наличие плитки. Если клетка пуста, сдвигаем вниз по столбцу все плитки над ней:

```javascript
    processFallDown() {
        return new Promise(resolve => {
            let completed = 0;
            let started = 0;

            // check all fields of the board, starting from the bottom row
            for (let row = this.board.rows - 1; row >= 0; row--) {
                for (let col = this.board.cols - 1; col >= 0; col--) {
                    const field = this.board.getField(row, col);
    
                    // if there is no tile in the field
                    if (!field.tile) {
                        ++started;

                        // shift all tiles that are in the same column in all rows above
                        this.fallDownTo(field).then(() => {
                            ++completed;
                            if (completed >= started) {
                                resolve();
                            }
                        });
                    }
                }
            }
        });
    }
```

Перемещение плиток вниз по столбцу реализуем в `fallDownTo`:

```javascript
    fallDownTo(emptyField) {
        // checking all board fields in the found empty field column, but in all higher rows
        for (let row = emptyField.row - 1; row >= 0; row--) {
            let fallingField = this.board.getField(row, emptyField.col);

            // find the first field with a tile
            if (fallingField.tile) {
                // the first found tile will be placed in the current empty field
                const fallingTile = fallingField.tile;
                fallingTile.field = emptyField;
                emptyField.tile = fallingTile;
                fallingField.tile = null;
                // run the tile move method and stop searching a tile for that empty field
                return fallingTile.fallDownTo(emptyField.position);
            }
        }

        return Promise.resolve();
    }

```

Добавим метод `fallDownTo` в класс `Tile`:

```javascript
    fallDownTo(position, delay) {
        return this.moveTo(position, 0.5, delay, "bounce.out");
    }
```

<a id="43-adding-and-dropping-new-tiles" class="translation-anchor" aria-hidden="true"></a>

### 4.3. Добавление и падение новых плиток

После завершения падения оставшихся плиток нужно создать новые над полем, чтобы они упали в образовавшиеся пустые клетки:

```javascript
    processMatches(matches) {
        this.removeMatches(matches);
        this.processFallDown()
            .then(() => this.addTiles())

    }
```

Для создания и падения новых плиток получим все клетки поля, оставшиеся без плиток. Для каждой пустой клетки создадим плитку, расположим её выше первой строки поля и запустим анимацию перемещения в нужную пустую клетку:


```javascript
    addTiles() {
        return new Promise(resolve => {
            // get all fields that don't have tiles
            const fields = this.board.fields.filter(field => field.tile === null);
            let total = fields.length;
            let completed = 0;

            // for each empty field
            fields.forEach(field => {
                // create a new tile
                const tile = this.board.createTile(field);
                // put it above the board
                tile.sprite.y = -500;
                const delay = Math.random() * 2 / 10 + 0.3 / (field.row + 1);
                // start the movement of the tile in the given empty field with the given delay
                tile.fallDownTo(field.position, delay).then(() => {
                    ++completed;
                    if (completed >= total) {
                        resolve();
                    }
                });
            });
        });
    }
```

<a id="44-checking-for-combinations-after-tiles-falling" class="translation-anchor" aria-hidden="true"></a>

### 4.4. Проверка комбинаций после падения

После завершения падения новых плиток на поле могут снова появиться комбинации.

Новые комбинации тоже нужно обработать: собрать их, опустить плитки и создать новые. Всё это уже реализовано в `processMatches`. Будем вызывать его рекурсивно, пока после очередного падения новых плиток на поле не останется комбинаций:

```javascript
    processMatches(matches) {
        this.removeMatches(matches);
        this.processFallDown()
            .then(() => this.addTiles())
            .then(() => this.onFallDownOver());
    }

    onFallDownOver() {
        const matches = this.combinationManager.getMatches();

        if (matches.length) {
            this.processMatches(matches)
        } else {
            this.disabled = false;
        }
    }
```

<a id="5-collect-combinations-at-the-start" class="translation-anchor" aria-hidden="true"></a>

### 5. Сбор комбинаций при запуске
Комбинации могут появиться не только после обмена двух плиток, но и при начальном заполнении поля. Такие комбинации нужно автоматически обработать без анимации падения и заменить другими плитками до показа стартового поля игроку.

Вся необходимая функциональность для обработки стартовых комбинаций уже есть:

:one: Найти все комбинации на поле через `combinationManager`.

:two: Удалить все найденные совпадения

:three: Создать новые плитки в пустых клетках

:four: Если после добавления новых плиток появились комбинации, повторить. Иначе начать игру.

```javascript
// ...
export class Game {
    constructor() {
        // ...
        this.removeStartMatches();
    }

    removeStartMatches() {
        let matches = this.combinationManager.getMatches(); // find combinations to collect

        while(matches.length) { // as long as there are combinations
            this.removeMatches(matches); // remove tiles in combinations

            const fields = this.board.fields.filter(field => field.tile === null); // find empty fields

            fields.forEach(field => { // in each empty field
                this.board.createTile(field); // create a new random tile
            });

            matches = this.combinationManager.getMatches(); // looking for combinations again after adding new tiles
        }
    }
}
```

<a id="6-reverse-swap" class="translation-anchor" aria-hidden="true"></a>

### 6. Обратный обмен
Если после обмена на поле не появилась комбинация, плитки нужно вернуть обратно. Метод `swap` уже реализует перемещение плиток. Изменим его так, чтобы выполнять обратный ход, если после основного не найдены комбинации. Добавьте флаг `reverse` третьим параметром `swap`:

```javascript
// ...
export class Game {
// ...

    swap(selectedTile, tile, reverse) {
        this.disabled = true;
        selectedTile.sprite.zIndex = 2;

        selectedTile.moveTo(tile.field.position, 0.2);

        this.clearSelection();

        tile.moveTo(selectedTile.field.position, 0.2).then(() => {
            this.board.swap(selectedTile, tile);

            // after the swap, check if it was the main swap or reverse
            if (!reverse) {
                // if this is the main swap, then we are looking for combinations
                const matches = this.combinationManager.getMatches();
                if (matches.length) {
                    // if there are combinations, then process them
                    this.processMatches(matches);
                } else {
                    // if there are no combinations after the main swap, then perform a reverse swap by running the same method, but with the reverse parameter
                    this.swap(tile, selectedTile, true);
                }
            } else {
                // in this condition, by the reverse flag, we understand that the swap was reversed, so there is no need to look for combinations.
                // all you need to do is unlock the board, because here the movement is already completed and there are no other animations
                this.disabled = false;
            }
        });
    }
}
```
