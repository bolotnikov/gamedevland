---
locale: ru
translationKey: runner/collision-of-the-hero-and-platform
title: Шаг 10. Столкновение героя с платформой
description: 'Шаг 10 руководства по созданию платформера с PixiJS: столкновение героя с платформой.'
seriesTitle: Создание платформера с PixiJS
seriesDescription: Пошаговое руководство по созданию бесконечного раннера с PixiJS, процедурными платформами, физикой и перемещением героя.
seriesSlug: runner
step: 10
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

Сейчас герой может выполнить только два прыжка, поскольку счётчик `this.jumpIndex` никогда не сбрасывается. В какой момент его нужно сбросить, чтобы снова разрешить двойной прыжок?

В момент касания платформы. Это означает, что герой приземлился и предыдущий прыжок завершён.

Как отследить столкновение героя и платформы? Снова используем физический движок и взаимодействие их физических тел.

Движок `Matter` отправляет событие при столкновении двух физических тел. Нужно подписаться на него. Сделаем это в классе `GameScene`:


``` javascript
import * as Matter from 'matter-js';
import { App } from '../system/App';
//...

export class GameScene extends Scene {
    create() {
        //...
        this.setEvents();
    }

    setEvents() {
        Matter.Events.on(App.physics, 'collisionStart', this.onCollisionStart.bind(this));
    }

    onCollisionStart(event) {
        const colliders = [event.pairs[0].bodyA, event.pairs[0].bodyB];
        const hero = colliders.find(body => body.gameHero);
        const platform = colliders.find(body => body.gamePlatform);

        if (hero && platform) {
            this.hero.stayOnPlatform(platform.gamePlatform);
        }
    }
    // ...
}
```
Метод `onCollisionStart` автоматически запускается при событии `collisionStart`, означающем столкновение физических тел.

В этом методе получаем взаимодействующие тела. Поскольку мы заранее добавили свойства `gameHero` и `gamePlatform` в физические тела героя и платформы, теперь можем проверить наличие этих свойств и определить участников столкновения.

Если найдены и герой, и платформа, вызовем `stayOnPlatform`, чтобы установить героя на платформу.

Реализуем этот метод в классе `Hero`:

``` javascript
export class Hero {
    // ...

    stayOnPlatform(platform) {
        this.platform = platform;
        this.jumpIndex = 0;
    }
```

Нужно лишь сбросить счётчик и сохранить текущую платформу в свойстве `this.platform`.

Теперь улучшим `startJump`, добавив проверку, находится ли герой на платформе. Если прыжок разрешён, свойство `this.platform` нужно сбросить.

``` javascript
    startJump() {
        if (this.platform || this.jumpIndex === 1) {
            ++this.jumpIndex;
            this.platform = null;
            Matter.Body.setVelocity(this.body, { x: 0, y: -this.dy });
        }
    }
```
