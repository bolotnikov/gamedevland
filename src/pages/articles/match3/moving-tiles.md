---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Step 2. Moving tiles"
description: "Step 2 of the Creating Match3 game with PixiJS tutorial: Moving tiles."
seriesTitle: "Creating Match3 game with PixiJS"
seriesDescription: "Step-by-step guide to building a Match-3 game with PixiJS, from board creation to tile movement and combinations."
seriesSlug: "match3"
step: 2
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
We start developing the functionality for moving tiles.

### 2.1 Selecting a tile to move

We need to click on a tile to select it. This means tiles must be interactive.
Let's add interactivity when creating tiles in the `Board` class:

``` javascript
    createTile(field) {
        // ...
        tile.sprite.interactive = true;
        tile.sprite.on("pointerdown", () => {
            this.container.emit('tile-touch-start', tile);
        });
    }
```
Let's fire the `tile-touch-start` event using the capabilities of the `PIXI.Container` class.
And then track and handle this event in the `Game` class:

``` javascript
// ...
export class Game {
    constructor() {
        // ...
        this.board.container.on('tile-touch-start', this.onTileClick.bind(this));
    }
// ...
```

Let's run the `onTileClick` method when the `tile-touch-start` event fires.
In this method, we will handle all three possible scenarios:

:one: select a new tile to move if no other tile has been selected

:two: swap tiles if another tile has already been selected and it is next to the current one

:three: select a new tile if another tile has already been selected, but it is not next to the current one

Right now we are implementing the first point. Now we are implementing the first point. When choosing a new tile, we need to do 2 things:

1. remember the selected tile
2. visually highlight the selected field

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

We can highlight the field with the selected tile by showing an additional border in this field.
Let's implement the code in the `Field` class:

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

### 2.2 Swapping tiles

In the `onTileClick` method of the `Game` class, add `swap` method call, which implements the movement of tiles:

``` javascript
    onTileClick(tile) {
        if (this.selectedTile) {
            this.swap(this.selectedTile, tile);
        } else {
            this.selectTile(tile);
        }
    }
```
Let's define what actions we need to move tiles:

:one: Reset fields in moved tiles

:two: Reset tiles in the board's fields

:three: Place the moved tiles in the positions of the new fields on the screen

We will create tweens animation using gsap for tiles movement.
It's also worth locking the board by setting an additional flag to prevent interactivity while the animation is running.

Let's implement these actions in code:
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

Let's reset the selection in the field in `clearSelection` method:
``` javascript
    clearSelection() {
        if (this.selectedTile) {
            this.selectedTile.field.unselect();
            this.selectedTile = null;
        }
    }
```
Let's implement the `moveTo` method in the `Tile` class using the `gsap` tween animation:

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

Let's add the `swap` method in the `Board` class, in which we will change the properties values in the moved objects:

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

Now, when moving tiles, we can swap not only neighboring tiles, but any tiles on the board. But only neighboring tiles should be swapped. And if the player has chosen a non-neighboring tile, then we just need to completely clear the first selection and select the new tile.

Let's update the condition in the `onTileClick` method in the `Game` class:

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
**Note**
As you can see, we also added a check for the `disabled` flag, which we set in the last paragraph. Thus, we block the functionality of the `onTileClick` method while the tiles are moving on the board, in order to avoid possible bugs.


Let's implement the `isNeighbour` method in the `Tile` class.
A neighbor is a tile located either in an adjacent column or in an adjacent row.
This means that the difference between either rows or columns of the checked and current tile modulo must be equal to one:

``` javascript
    isNeighbour(tile) {
        return Math.abs(this.field.row - tile.field.row) + Math.abs(this.field.col - tile.field.col) === 1
    }
```
