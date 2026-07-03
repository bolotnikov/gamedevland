---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Step 3. Search for combinations"
description: "Step 3 of the Creating Match3 game with PixiJS tutorial: Search for combinations."
seriesTitle: "Creating Match3 game with PixiJS"
seriesDescription: "Step-by-step guide to building a Match-3 game with PixiJS, from board creation to tile movement and combinations."
seriesSlug: "match3"
step: 3
readingTime: "2 min read"
steps:
  - step: 1
    slug: ""
    title: "Creating the tiles board"
  - step: 2
    slug: "moving-tiles"
    title: "Moving tiles"
  - step: 3
    slug: "search-for-combinations"
    title: "Search for combinations"
  - step: 4
    slug: "processing-combinations"
    title: "Processing combinations"
---
After swapping tiles, the board must be checked for combinations.

**Note**
A combination is considered to be the collection of 3, 4 and 5 identical tiles in a row.


To check for all these combinations, it is enough to compare each tile on the board with the next two tiles in a row and the next two tiles in a column.

Let's add the comparison rules to the game config `Config.js`:

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
We have added 2 validation rules that show exactly which fields on the board should have the same tiles in relation to the field being checked. That is, for each checked field on the board, it is necessary to check the match of the field in the next two columns, as well as in the next two rows.

We implement the `CombinationManager` class:

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

Let's implement the `getField` method in the `Board` class:

``` javascript
    getField(row, col) {
        return this.fields.find(field => field.row === row && field.col === col);
    }
``` 

And call its method in the `Game` class:

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
