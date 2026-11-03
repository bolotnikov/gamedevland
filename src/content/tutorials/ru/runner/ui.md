---
locale: ru
translationKey: runner/ui
title: Шаг 14. Интерфейс
description: 'Шаг 14 руководства по созданию платформера с PixiJS: интерфейс.'
seriesTitle: Создание платформера с PixiJS
seriesDescription: Пошаговое руководство по созданию бесконечного раннера с PixiJS, процедурными платформами, физикой и перемещением героя.
seriesSlug: runner
step: 14
readingTime: 2 минуты чтения
steps:
  - step: 1
    slug: ''
    title: Создание движущегося фона
  - step: 2
    slug: creating-a-single-platform
    title: Создание одной платформы
  - step: 3
    slug: creating-a-hero
    title: Создание героя
  - step: 4
    slug: creating-multiple-platforms
    title: Создание нескольких платформ
  - step: 5
    slug: enable-physics
    title: Подключение физики
  - step: 6
    slug: the-physical-body-of-platforms
    title: Физическое тело платформ
  - step: 7
    slug: movement-of-platforms
    title: Движение платформ
  - step: 8
    slug: the-physical-body-of-the-hero
    title: Физическое тело героя
  - step: 9
    slug: hero-jump
    title: Прыжок героя
  - step: 10
    slug: collision-of-the-hero-and-platform
    title: Столкновение героя с платформой
  - step: 11
    slug: creating-diamonds
    title: Создание алмазов
  - step: 12
    slug: the-physical-body-of-a-diamond
    title: Физическое тело алмаза
  - step: 13
    slug: collecting-diamonds
    title: Сбор алмазов
  - step: 14
    slug: ui
    title: Интерфейс
  - step: 15
    slug: restarting-the-game-when-the-hero-falls
    title: Перезапуск игры при падении героя
---

Выведем счёт игрока на экран. Создадим класс `LabelScore`, наследующийся от `PIXI.Text`:

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

Вынесем параметры положения и стиля текста в глобальную конфигурацию `Config.js`:

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

Создадим экземпляр этого класса и добавим его на игровую сцену:

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

Осталось добавить отправку события `score` в объект героя при сборе алмаза:

``` javascript
export class Hero {
    // ...
    collectDiamond(diamond) {
        // ...
        this.sprite.emit("score");
    }
}
```
