---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Step 4. Processing combinations"
description: "Step 4 of the Creating Match3 game with PixiJS tutorial: Processing combinations."
seriesTitle: "Creating Match3 game with PixiJS"
seriesDescription: "Step-by-step guide to building a Match-3 game with PixiJS, from board creation to tile movement and combinations."
seriesSlug: "match3"
step: 4
readingTime: "3 min read"
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
### 4.1 Removing tiles

First of all, we will remove all the tiles in the collected combinations:

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

Let's implement the `remove` method in the `Tile` class:


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
If the object no longer has a sprite, then it has already been deleted.
Otherwise, we delete the sprite and the reference to the field. At the field itself, we also remove the reference to the current tile.

### 4.2 Fall of the remaining tiles

After the combination is triggered and the collected tiles are removed, it is necessary to drop the remaining tiles on the board. Add `processFallDown` method call in `processMatches`:

```javascript
    processMatches(matches) {
        this.removeMatches(matches);
        this.processFallDown();
    }
```

Starting from the bottom row of the board, check each field for a tile.
If the field is empty, we will shift down the column all the tiles that are above it:

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

We implement moving tiles down the column in the `fallDownTo` method:

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

Let's add the `fallDownTo` method to the `Tile` class:

```javascript
    fallDownTo(position, delay) {
        return this.moveTo(position, 0.5, delay, "bounce.out");
    }
```

### 4.3 Adding and dropping new tiles

After the completion of the fall of the remaining tiles, we need to create new tiles on top of the board so that they fall into the resulting empty fields:

```javascript
    processMatches(matches) {
        this.removeMatches(matches);
        this.processFallDown()
            .then(() => this.addTiles())

    }
```

To perform the creation and dropping of new tiles, we need to get all the fields on the board that have no tiles left.
For each empty field, create a new tile, place it higher than the first row of the board, and start the motion animation on the given empty field:


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

### 4.4 Checking for combinations after tiles falling

After the completion of falling new tiles, combinations may appear on the board again.

If there are new combinations, it is also necessary to process them, that is, collect the combination, make a tiles fall and create new tiles.
For all these actions, we have already developed functionality in the `processMatches` method. We will call it recursively until there are no combinations left on the board after the next falling of new tiles:

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

### 5. Collect combinations at the start
Combinations can appear be not only after moving two tiles, but also during the initial placement of tiles after creating the board.
Such combinations must be automatically processed without falling animation and replaced with other tiles before showing the starting board to the player.

We already have the functionality needed to handle starting combinations:

:one: Find all combinations on the board using `combinationManager`.

:two:  Remove all founded matches

:three:  Create new tiles in empty fields

:four:  If combinations appear after adding new tiles, then repeat. Otherwise, let's start the game.

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

### 6. Reverse swap
If, after the swap, no combination was formed on the board to collect, it is necessary to perform a reverse swap of tiles.
To move tiles on the board, we have already implemented the `swap` method. We can modify it to perform a reverse move if no combinations are found after the main move.
Add the `reverse` flag as the third parameter to the `swap` method:

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
