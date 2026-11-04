---
locale: ru
translationKey: match3/search-for-combinations
title: Шаг 3. Поиск комбинаций
description: 'Шаг 3 руководства по созданию игры «три в ряд» с PixiJS: поиск комбинаций.'
seriesTitle: Создание игры «три в ряд» с PixiJS
seriesDescription: 'Пошаговое руководство по созданию игры «три в ряд» с PixiJS: от игрового поля до перемещения плиток и обработки комбинаций.'
seriesSlug: match3
step: 3
readingTime: 2 минуты чтения
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

После обмена плиток нужно проверить поле на комбинации.

**Примечание.** Комбинацией считается ряд из 3, 4 или 5 одинаковых плиток.


Для проверки всех этих комбинаций достаточно сравнить каждую плитку поля со следующими двумя плитками в строке и следующими двумя в столбце.

Добавим правила сравнения в конфигурацию игры `Config.js`:

``` javascript
export const Config = {
    // ...
    combinationRules: [[
        {col: 1, row: 0}, {col: 2, row: 0},
    ], [
        {col: 0, row: 1}, {col: 0, row: 2},
    ]]
};
```
Мы добавили два правила проверки: они показывают, какие клетки поля должны содержать такие же плитки относительно проверяемой клетки. Для каждой клетки нужно проверить совпадение в двух следующих столбцах и двух следующих строках.

Реализуем класс `CombinationManager`:

``` javascript
import { App } from "../system/App";

export class CombinationManager {
    constructor(board) {
        this.board = board;
    }

    getMatches() {
        let result = [];

        this.board.fields.forEach(checkingField => {
            App.config.combinationRules.forEach(rule => {
                let matches = [checkingField.tile];

                rule.forEach(position => {
                    const row = checkingField.row + position.row;
                    const col = checkingField.col + position.col;
                    const comparingField = this.board.getField(row, col);
                    if (comparingField && comparingField.tile.color === checkingField.tile.color) {
                        matches.push(comparingField.tile);
                    }
                });

                if (matches.length === rule.length + 1) {
                    result.push(matches);
                }
            });
        });

        return result;
    }
}

```

Реализуем метод `getField` в классе `Board`:

``` javascript
    getField(row, col) {
        return this.fields.find(field => field.row === row && field.col === col);
    }
```

И вызовем его метод в классе `Game`:

``` javascript
import { CombinationManager } from "./CombinationManager";
    
export class Game {
    constructor() {
        // ...
        this.combinationManager = new CombinationManager(this.board);
    }

    swap(selectedTile, tile) {
        // ...
        tile.moveTo(selectedTile.field.position, 0.2).then(() => {
            this.board.swap(selectedTile, tile);
            const matches = this.combinationManager.getMatches();
            this.disabled = false;
        });
    }
}

```
