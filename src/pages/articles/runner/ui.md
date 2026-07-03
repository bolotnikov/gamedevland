---
layout: ../../../layouts/ArticleSeriesLayout.astro
title: "Step 14. UI"
description: "Step 14 of the Create a platformer with PixiJS tutorial: UI."
seriesTitle: "Create a platformer with PixiJS"
seriesDescription: "Step-by-step guide to building an infinite runner game with PixiJS, procedural platforms, physics, and hero movement."
seriesSlug: "runner"
step: 14
readingTime: "2 min read"
steps:
  - step: 1
    slug: ""
    title: "Create a moving background"
  - step: 2
    slug: "creating-a-single-platform"
    title: "Creating a single platform"
  - step: 3
    slug: "creating-a-hero"
    title: "Creating a hero"
  - step: 4
    slug: "creating-multiple-platforms"
    title: "Creating multiple platforms"
  - step: 5
    slug: "enable-physics"
    title: "Enable physics"
  - step: 6
    slug: "the-physical-body-of-platforms"
    title: "The physical body of platforms"
  - step: 7
    slug: "movement-of-platforms"
    title: "Movement of platforms"
  - step: 8
    slug: "the-physical-body-of-the-hero"
    title: "The physical body of the hero"
  - step: 9
    slug: "hero-jump"
    title: "Hero jump"
  - step: 10
    slug: "collision-of-the-hero-and-platform"
    title: "Collision of the hero and platform"
  - step: 11
    slug: "creating-diamonds"
    title: "Creating diamonds"
  - step: 12
    slug: "the-physical-body-of-a-diamond"
    title: "The physical body of a diamond"
  - step: 13
    slug: "collecting-diamonds"
    title: "Collecting diamonds"
  - step: 14
    slug: "ui"
    title: "UI"
  - step: 15
    slug: "restarting-the-game-when-the-hero-falls"
    title: "Restarting the game when the hero falls"
---
Let's display the player's score on the screen.
Let's create the `LabelScore` class, which will be the successor of `PIXI.Text`:

``` javascript
import * as PIXI from "pixi.js";
import { App } from "../system/App";

export class LabelScore extends PIXI.Text {
    constructor() {
        super();
        this.x = App.config.score.x;
        this.y = App.config.score.y;
        this.anchor.set(App.config.score.anchor);
        this.style = App.config.score.style;
        this.renderScore();
    }

    renderScore(score = 0) {
        this.text = `Score: ${score}`;
    }
}
```

Let's take out all the positioning and text style parameters in the global config `Config.js`:

``` javascript
export const Config = {
    score: {
        x: 10,
        y: 10,
        anchor: 0,
        style: {
            fontFamily: "Verdana",
            fontWeight: "bold",
            fontSize: 44,
            fill: ["#FF7F50"]
        }
    },
    // ...
};
```

Let's create an instance of this class and add it to the game scene:

``` javascript
export class GameScene extends Scene {
    create() {
        // ...
        this.createUI();
    }

    createUI() {
        this.labelScore = new LabelScore();
        this.container.addChild(this.labelScore);
        this.hero.sprite.on("score", () => {
            this.labelScore.renderScore(this.hero.score);
        });
    }
}
```

As you can see, it remains to add the launch of the `score` event to the hero object at the time of collecting the diamond:

``` javascript
export class Hero {
    // ...
    collectDiamond(diamond) {
        // ...
        this.sprite.emit("score");
    }
}
```
