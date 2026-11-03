---
locale: ru
translationKey: runner/creating-diamonds
title: Шаг 11. Создание алмазов
description: 'Шаг 11 руководства по созданию платформера с PixiJS: создание алмазов.'
seriesTitle: Создание платформера с PixiJS
seriesDescription: Пошаговое руководство по созданию бесконечного раннера с PixiJS, процедурными платформами, физикой и перемещением героя.
seriesSlug: runner
step: 11
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

Алмазы будут располагаться над платформами так, чтобы побуждать игрока прыгать и собирать их.

Алмазы для каждой платформы создадим в соответствующем классе. Создадим некоторое число изображений алмазов над платформой:

``` javascript
// ...
export class Platform {
    constructor(rows, cols, x) {
        // ...
        this.diamonds = [];
        this.createDiamonds();
    }

    createDiamonds() {
        const y = App.config.diamonds.offset.min + Math.random() * (App.config.diamonds.offset.max - App.config.diamonds.offset.min);

        for (let i = 0; i < this.cols; i++) {
            if (Math.random() < App.config.diamonds.chance) {
                const diamond = new Diamond(this.tileSize * i, -y);
                this.container.addChild(diamond.sprite);
                this.diamonds.push(diamond);
            }
        }
    }
    // ...
}

```

Пройдём по всем тайлам платформы и для каждого проверим возможность создания алмаза сверху. Вероятность берётся из глобальной конфигурации `App.config.diamonds.chance`.

Если над тайлом нужно создать алмаз, создадим экземпляр `Diamond`. Поместим его в `this.diamonds` и добавим дочерним элементом контейнера платформы.


Добавим настройки создания алмазов в глобальную конфигурацию:

``` javascript
// ...
export const Config = {
    // ...
    diamonds: {
        chance: 0.4,
        offset: {
            min: 100,
            max: 200
        }
    }
}
```

Свойство chance задаёт вероятность появления алмаза над каждым тайлом платформы. Объект offset определяет допустимый диапазон высоты алмаза над платформой.

Осталось реализовать класс `Diamond`. Пока реализуем только вывод спрайта алмаза:

``` javascript
import { App } from '../system/App';

export class Diamond {
    constructor(x, y) {
        this.sprite = App.sprite("diamond");
        this.sprite.x = x;
        this.sprite.y = y;
    }
}
```
