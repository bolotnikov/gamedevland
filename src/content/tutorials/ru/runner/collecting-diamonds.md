---
locale: ru
translationKey: runner/collecting-diamonds
title: Шаг 13. Сбор алмазов
description: 'Шаг 13 руководства по созданию платформера с PixiJS: сбор алмазов.'
seriesTitle: Создание платформера с PixiJS
seriesDescription: Пошаговое руководство по созданию бесконечного раннера с PixiJS, процедурными платформами, физикой и перемещением героя.
seriesSlug: runner
step: 13
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

При касании героем алмаз считается собранным и должен исчезнуть с экрана. Как определить момент столкновения? Мы уже делали это для героя и платформы в классе `GameScene.js`, реализуя `onCollisionStart`. Расширим этот метод: добавим проверку наличия алмаза и обработку столкновения:


``` javascript
export class GameScene extends Scene {
    // ...
    onCollisionStart(event) {
        // ...
        const diamond = colliders.find(body => body.gameDiamond);

        if (hero && diamond) {
            this.hero.collectDiamond(diamond.gameDiamond);
        }
    }
    // ...
}
```
Нужно реализовать метод `collectDiamond` в классе `Hero.js`:

``` javascript
import * as Matter from 'matter-js';
import * as PIXI from "pixi.js";
import { App } from '../system/App';

export class Hero {
    constructor() {
        // ...
        this.score = 0;
    }
    collectDiamond(diamond) {
        ++this.score;
        Matter.World.remove(App.physics.world, diamond.body);
        diamond.sprite.destroy();
        diamond.sprite = null;
    }
    // ...
}
```
При сборе алмаза уничтожаем его физическое тело и сам спрайт. Также увеличиваем счётчик очков героя, который позже выведем на экран как игровой счёт.
