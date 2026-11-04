---
locale: ru
translationKey: runner/the-physical-body-of-a-diamond
title: Шаг 12. Физическое тело алмаза
description: 'Шаг 12 руководства по созданию платформера с PixiJS: физическое тело алмаза.'
seriesTitle: Создание платформера с PixiJS
seriesDescription: Пошаговое руководство по созданию бесконечного раннера с PixiJS, процедурными платформами, физикой и перемещением героя.
seriesSlug: runner
step: 12
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

Как мы уже знаем, для обработки физических взаимодействий, например столкновений, игровым объектам нужны физические тела, добавленные в движок.

Мы уже создали тела героя и платформ и можем обрабатывать их столкновения.

Игрок собирает алмазы, касаясь их спрайтом героя во время прыжка. Значит, алмазам тоже нужны тела. Доработаем класс `Diamond`:


``` javascript
export class Diamond {
    constructor(x, y) {
        this.createSprite(x, y);
    }

    createSprite(x, y) {
        this.sprite = App.sprite("diamond");
        this.sprite.x = x;
        this.sprite.y = y;
    }

    createBody() {
        this.body = Matter.Bodies.rectangle(this.sprite.width / 2 + this.sprite.x + this.sprite.parent.x, this.sprite.height / 2 + this.sprite.y + this.sprite.parent.y, this.sprite.width, this.sprite.height, {friction: 0, isStatic: true, render: { fillStyle: '#060a19' }});
        this.body.gameDiamond = this;
        this.body.isSensor = true;
        Matter.World.add(App.physics.world, this.body);
    }
}
```

Мы создали физическое тело так же, как для платформы и героя: прямоугольник в координатах спрайта с размерами алмаза. Как обычно, сохранили в теле ссылку на объект алмаза, чтобы обращаться к нему при событиях столкновения.


Также установили `this.body.isSensor` в `true`. Так спрайт героя сможет проходить сквозь алмаз, в отличие от платформы, которая не должна пропускать его через себя.

Осталось вызвать `createBody` после добавления алмаза дочерним элементом контейнера платформы в `Platform.js`:


``` javascript
    createDiamonds() {
        const y = App.config.diamonds.offset.min + Math.random() * (App.config.diamonds.offset.max - App.config.diamonds.offset.min);

        for (let i = 0; i < this.cols; i++) {
            if (Math.random() < App.config.diamonds.chance) {
                this.createDiamond(this.tileSize * i, -y);
            }
        }
    }

    createDiamond(x, y) {
            const diamond = new Diamond(x, y);
            this.container.addChild(diamond.sprite);
            diamond.createBody();
            this.diamonds.push(diamond);
    }
```
