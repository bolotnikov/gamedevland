---
locale: ru
translationKey: tower-defense/ui
title: Шаг 10. Интерфейс
description: 'Шаг 10 руководства по созданию Tower Defense с PIXI: интерфейс.'
seriesTitle: Создание Tower Defense с PIXI
seriesDescription: Создание игры в жанре tower defense с PixiJS, тайловыми картами, врагами, движением по пути и основными игровыми системами.
seriesSlug: tower-defense
step: 10
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

Данные о монетах и жизнях игрока готовы; выведем их на экран. Наш `UI` состоит из:

- иконки жизней — спрайта `heart.png`
- иконки монет — спрайта `coin.png`
- текста с числом монет
- текста с числом жизней

Создадим класс `UI` с перечисленными элементами:

```javascript

import * as PIXI from "pixi.js";
import { App } from "../system/App";

export class UI {
    constructor(player) {
        this.player = player;
        this.container = new PIXI.Container();
        this.config = App.config.ui;
        this.create();
        this.update();
    }

    createCoinsIcon() {
        this.coins = App.sprite("coin");
        this.coins.anchor.set(0.5);
        this.coins.x = this.config.coinsIcon.x;
        this.coins.y = this.config.coinsIcon.y;
        this.container.addChild(this.coins);
    }

    createLivesIcon() {
        this.lives = App.sprite("heart");
        this.lives.anchor.set(0.5);
        this.lives.x = this.config.livesIcon.x;
        this.lives.y = this.config.livesIcon.y;
        this.container.addChild(this.lives);
    }

    createCoinsText() {
        this.coinsText = new PIXI.Text(this.player.coins.toString(), {fill: 0xffffff});
        this.coinsText.x = this.config.coinsText.x;
        this.coinsText.y = this.config.coinsText.y;
        this.container.addChild(this.coinsText);
    }
    createLivesText() {
        this.livesText = new PIXI.Text(this.player.lives.toString(), {fill: 0xffffff});
        this.livesText.x = this.config.livesText.x;
        this.livesText.y = this.config.livesText.y;
        this.container.addChild(this.livesText);
    }

    create() {
        this.createCoinsIcon();
        this.createCoinsText();
        this.createLivesIcon();
        this.createLivesText();
    }

    update() {
        this.coinsText.text = this.player.coins.toString();
        this.livesText.text = this.player.lives.toString();
    }
}

```

В конструктор `UI` передаётся объект игрока, благодаря чему в `update` можно показывать текущие `coins` и `lives`.

Поместим интерфейс в левый верхний угол, задав положения элементов в конфигурации:


```javascript
export const Config = {
    // ...
    ui: {
        coinsIcon: {
            x: 50,
            y: 40
        },
        coinsText: {
            x: 90,
            y: 30
        },
        livesIcon: {
            x: 50,
            y: 100
        },
        livesText: {
            x: 90,
            y: 90
        }
    },
    player: {
        coins: 200,
        lives: 5
    }
};
```
Создадим экземпляр `UI` в классе `Game`:

```javascript
export class GameScene extends Scene {
    create() {
        // ...
        this.createUI();
    }

    createUI() {
        this.ui = new UI(this.player);
        this.container.addChild(this.ui.container);
    }
    // ...
}
```
