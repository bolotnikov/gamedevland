---
locale: ru
translationKey: runner/creating-a-hero
title: Шаг 3. Создание героя
description: 'Шаг 3 руководства по созданию платформера с PixiJS: создание героя.'
seriesTitle: Создание платформера с PixiJS
seriesDescription: Пошаговое руководство по созданию бесконечного раннера с PixiJS, процедурными платформами, физикой и перемещением героя.
seriesSlug: runner
step: 3
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

Разместим спрайт героя на только что созданной платформе.

Создадим класс `Hero.js`:

``` javascript
import * as PIXI from "pixi.js";
import { App } from '../system/App';

export class Hero {
    constructor() {
        this.createSprite();
    }

    createSprite() {
    }
}
```

Реализуйте метод `createSprite`:

``` javascript
    createSprite() {
        this.sprite = new PIXI.AnimatedSprite([
            App.res("walk1"),
            App.res("walk2")
        ]);

        this.sprite.x = App.config.hero.position.x;
        this.sprite.y = App.config.hero.position.y;
        this.sprite.loop = true;
        this.sprite.animationSpeed = 0.1;
        this.sprite.play();
    }
```

Герой состоит из двух изображений: `walk1` и `walk2`. Из них создадим покадровую анимацию ходьбы через `PIXI.AnimatedSprite`. В его конструктор передаём массив текстур анимации. Метод `App.res` возвращает текстуру по ключу.

Зададим спрайту начальную позицию в глобальной конфигурации игры `Config.js`:

``` javascript
// ...
export const Config = {
    // ...
    hero: {
        position: {
            x: 350,
            y: 595
        }
    },
    // ...
};
```

Установите `loop` в `true`, чтобы зациклить анимацию, и задайте нужную скорость воспроизведения:

``` javascript
        this.sprite.loop = true;
        this.sprite.animationSpeed = 0.1;
```

Вызовите `play`, чтобы запустить анимацию.

``` javascript
        this.sprite.play();
```


Класс героя готов, и теперь можно создать объект героя на сцене в `GameScene.js`:

``` javascript
export class GameScene extends Scene {
    create() {
        // ...
        this.createHero();
    }

    createHero() {
        this.hero = new Hero();
        this.container.addChild(this.hero.sprite);
    }
}
```
