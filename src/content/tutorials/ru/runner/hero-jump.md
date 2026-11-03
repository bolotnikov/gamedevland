---
locale: ru
translationKey: runner/hero-jump
title: Шаг 9. Прыжок героя
description: 'Шаг 9 руководства по созданию платформера с PixiJS: прыжок героя.'
seriesTitle: Создание платформера с PixiJS
seriesDescription: Пошаговое руководство по созданию бесконечного раннера с PixiJS, процедурными платформами, физикой и перемещением героя.
seriesSlug: runner
step: 9
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

Дадим герою возможность прыгать дважды. После первого прыжка он сможет выполнить ещё один в воздухе. Затем для следующего прыжка нужно приземлиться на платформу.

Герой будет прыгать при нажатии в любом месте экрана. Подпишемся на `pointerdown` в классе `GameScene`:

``` javascript

export class GameScene extends Scene {
    // ...
    createHero() {
        // ...
        this.container.interactive = true;
        this.container.on("pointerdown", () => {
            this.hero.startJump();
        });
    }
    // ...
}
```

Теперь нужно реализовать `startJump` в классе `Hero`:


``` javascript

export class Hero {
    constructor() {
        // ...
        this.dy = App.config.hero.jumpSpeed;
        this.maxJumps = App.config.hero.maxJumps;
        this.jumpIndex = 0;
    }

    startJump() {
        if (this.jumpIndex < this.maxJumps) {
            ++this.jumpIndex;
            Matter.Body.setVelocity(this.body, { x: 0, y: -this.dy });
        }
    }
    // ...
}
```

Счётчик `jumpIndex` ограничивает число прыжков до следующего касания платформы. Максимальное число задаётся свойством `this.maxJumps`.

Физический движок задаёт скорость тела героя. Для прыжка нужно перемещение только вверх по оси `y`, поэтому задаём отрицательное значение по `y`, хранящееся в `this.dy`.

Для удобной настройки вынесем скорость прыжка и число прыжков в глобальную конфигурацию:

``` javascript
export const Config = {
    // ...
    hero: {
        jumpSpeed: 15,
        maxJumps: 2,
        //...
    }
};
```
