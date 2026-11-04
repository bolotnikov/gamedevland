---
locale: ru
translationKey: runner/the-physical-body-of-the-hero
title: Шаг 8. Физическое тело героя
description: 'Шаг 8 руководства по созданию платформера с PixiJS: физическое тело героя.'
seriesTitle: Создание платформера с PixiJS
seriesDescription: Пошаговое руководство по созданию бесконечного раннера с PixiJS, процедурными платформами, физикой и перемещением героя.
seriesSlug: runner
step: 8
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

По аналогии с платформой создадим тело героя в `Hero.js`:

``` javascript

import * as Matter from 'matter-js';
// ...
export class Hero {
    constructor() {
        // ...
        this.createBody();
        App.app.ticker.add(this.update.bind(this));
    }

    // [07]
    createBody() {
        this.body = Matter.Bodies.rectangle(this.sprite.x + this.sprite.width / 2, this.sprite.y + this.sprite.height / 2, this.sprite.width, this.sprite.height, {friction: 0});
        Matter.World.add(App.physics.world, this.body);
        this.body.gameHero = this;
    }

    update() {
        this.sprite.x = this.body.position.x - this.sprite.width / 2;
        this.sprite.y = this.body.position.y - this.sprite.height / 2;
    }
}
```
Как и для платформы, мы создали прямоугольное тело в позиции героя с его размерами.

Затем добавили тело в движок и сохранили ссылку на героя в объекте `body`. Она понадобится при обработке столкновений, когда будут доступны сталкивающиеся тела.

Также мы создали `update`, добавленный в ticker `PIXI` и вызываемый на каждом кадре анимации. В нём спрайт героя принудительно получает позицию физического тела для синхронизации. Куда бы тело ни переместилось в результате физических взаимодействий, спрайт окажется там же.
