---
locale: ru
translationKey: runner/movement-of-platforms
title: Шаг 7. Движение платформ
description: 'Шаг 7 руководства по созданию платформера с PixiJS: движение платформ.'
seriesTitle: Создание платформера с PixiJS
seriesDescription: Пошаговое руководство по созданию бесконечного раннера с PixiJS, процедурными платформами, физикой и перемещением героя.
seriesSlug: runner
step: 7
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

Физическое тело платформы готово, и теперь можно двигать платформу, перемещая её тело. Затем перенесём контейнер со всеми тайлами в новую позицию тела.

Создадим метод `move`, задающий телу новую позицию с учётом скорости платформы из свойства `this.dx`.

``` javascript
export class Platform {
    // ...
    move() {
        if (this.body) {
            Matter.Body.setPosition(this.body, {x: this.body.position.x + this.dx, y: this.body.position.y});
            this.container.x = this.body.position.x - this.width / 2;
            this.container.y = this.body.position.y - this.height / 2;
        }
    }
}
```

После переноса тела переместим контейнер платформы в ту же позицию, чтобы все её тайлы оказались на нужном месте.

Осталось вызвать `move` для всех созданных платформ в классе `Platforms`:
``` javascript
export class Platforms {
    // ...
    update() {
        // ...
        this.platforms.forEach(platform => platform.move());
    }
}
```
