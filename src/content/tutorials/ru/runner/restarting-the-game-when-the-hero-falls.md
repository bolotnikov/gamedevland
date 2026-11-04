---
locale: ru
translationKey: runner/restarting-the-game-when-the-hero-falls
title: Шаг 15. Перезапуск игры при падении героя
description: 'Шаг 15 руководства по созданию платформера с PixiJS: перезапуск при падении героя.'
seriesTitle: Создание платформера с PixiJS
seriesDescription: Пошаговое руководство по созданию бесконечного раннера с PixiJS, процедурными платформами, физикой и перемещением героя.
seriesSlug: runner
step: 15
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

Завершим разработку перезапуском игры после падения героя с платформы. Перезапуск нужен по событию смерти героя. Начнём с обработчика этого события в `GameScene`:

``` javascript
export class GameScene extends Scene {
    createHero() {
        // ...
        this.hero.sprite.once("die", () => {
            App.scenes.start("Game");
        });
    }
}
```

Вызов `start` у `ScenesManager` автоматически вызывает `destroy` текущей сцены перед запуском новой. Поэтому в `destroy` нужно реализовать всю логику закрытия сцены: уничтожить объекты и отключить обработчики событий. Сделаем это:

``` javascript
destroy() {
    Matter.Events.off(App.physics, 'collisionStart', this.onCollisionStart.bind(this));
    App.app.ticker.remove(this.update, this);
    this.bg.destroy();
    this.hero.destroy();
    this.platfroms.destroy();
    this.labelScore.destroy();
}
```

Теперь реализуем destroy в каждом перечисленном объекте. `Background.js`
``` javascript
destroy() {
    this.container.destroy();
}
```

`Platforms.js`
``` javascript
destroy() {
    this.platforms.forEach(platform => platform.destroy());
    this.container.destroy();
}
```

`Platform.js`
``` javascript
destroy() {
    Matter.World.remove(App.physics.world, this.body);
    this.diamonds.forEach(diamond => diamond.destroy());
    this.container.destroy();
}
```

`Diamond.js`
``` javascript
destroy() {
    if (this.sprite) {
        App.app.ticker.remove(this.update, this);
        Matter.World.remove(App.physics.world, this.body);
        this.sprite.destroy();
        this.sprite = null;
    }
}
```

Завершим отправкой события `die` в классе `Hero`:

`Hero.js`
``` javascript
update() {
    // ...
    if (this.sprite.y > window.innerHeight) {
        this.sprite.emit("die");
    }
}

destroy() {
    App.app.ticker.remove(this.update, this);
    Matter.World.add(App.physics.world, this.body);
    this.sprite.destroy();
}
```
