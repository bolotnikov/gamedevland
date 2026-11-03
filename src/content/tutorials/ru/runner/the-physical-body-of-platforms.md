---
locale: ru
translationKey: runner/the-physical-body-of-platforms
title: Шаг 6. Физическое тело платформ
description: 'Шаг 6 руководства по созданию платформера с PixiJS: физическое тело платформ.'
seriesTitle: Создание платформера с PixiJS
seriesDescription: Пошаговое руководство по созданию бесконечного раннера с PixiJS, процедурными платформами, физикой и перемещением героя.
seriesSlug: runner
step: 6
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

После подключения физики нужно сообщить движку об объектах, участвующих в физических расчётах. Начнём с платформ: добавим им тела и тем самым сделаем их известными физическому движку.

Что представляет собой физическое тело платформы? По сути, платформа — прямоугольный спрайт.

Чтобы движок обрабатывал платформу, создадим прямоугольник, точно соответствующий её контуру. Размеры и положение можно вычислить из координат и размеров текущей платформы.

В файле `Platform.js`:

``` javascript
import * as Matter from 'matter-js';

export class Platform {
    constructor(rows, cols, x) {
        // ...
        // specify the speed of the platform
        this.dx = App.config.platforms.moveSpeed;
        this.createBody();
    }

    createBody() {
        // create a physical body
        this.body = Matter.Bodies.rectangle(this.width / 2 + this.container.x, this.height / 2 + this.container.y, this.width, this.height, {friction: 0, isStatic: true});
        // add the created body to the engine
        Matter.World.add(App.physics.world, this.body);
        // save a reference to the platform object itself for further access from the physical body object
        this.body.gamePlatform = this;
    }
}
```

Для удобной настройки вынесем скорость платформ в глобальную конфигурацию:

```javascript
export const Config = {
    // ...
    platforms: {
        // ...
        moveSpeed: -1.5
    }
    // ...
};
```
