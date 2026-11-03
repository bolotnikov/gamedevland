---
locale: ru
translationKey: tower-defense/enemies-processing
title: Шаг 11. Обработка врагов
description: 'Шаг 11 руководства по созданию Tower Defense с PIXI: обработка врагов.'
seriesTitle: Создание Tower Defense с PIXI
seriesDescription: Создание игры в жанре tower defense с PixiJS, тайловыми картами, врагами, движением по пути и основными игровыми системами.
seriesSlug: tower-defense
step: 11
readingTime: 2 минуты чтения
steps:
  - step: 1
    slug: ''
    title: Создание тайла
  - step: 2
    slug: creating-the-level
    title: Создание уровня
  - step: 3
    slug: creating-the-enemy
    title: Создание врага
  - step: 4
    slug: waves-of-enemies
    title: Волны врагов
  - step: 5
    slug: creating-a-tower
    title: Создание башни
  - step: 6
    slug: preparation-for-shooting
    title: Подготовка к стрельбе
  - step: 7
    slug: shooting
    title: Стрельба
  - step: 8
    slug: enemy-damage
    title: Урон врагу
  - step: 9
    slug: player
    title: Игрок
  - step: 10
    slug: ui
    title: Интерфейс
  - step: 11
    slug: enemies-processing
    title: Обработка врагов
  - step: 12
    slug: earning-and-spending-coins
    title: Заработок и трата монет
---

Юниты, добравшиеся до последней точки пути, должны отнять у игрока одну жизнь и исчезнуть. Добавим вызов `processCompletedEnemies` в начало `update` класса `Game`:

```javascript
    processCompletedEnemies() {
        const enemy = this.enemies.units.find(enemy => enemy.isOutOfTheScreen);

        if (enemy) {
            enemy.remove();
            --this.player.lives;
            this.checkGameOver();
        }
    }
    update() {
        this.processCompletedEnemies();
        // ...
    }
```

Реализуем геттер `isOutOfTheScreen`:

```javascript
    get isOutOfTheScreen() {
        if (this.pathIndex === this.path.length) {
            let point = this.sprite.getGlobalPosition();

            if (point.x < 0 ||point.x > App.app.view.width) {
                return true;
            }
        }


        return false;
    }
```

Здесь обязательно проверяем, достиг ли враг последней точки:
```javascript
this.pathIndex === this.path.length
```

Если достиг, достаточно проверить положение по одной координате спрайта.

Добавим `checkGameOver` в `Game`. Если игрок потерял все жизни, перезапустим игру:
```javascript
    checkGameOver() {
        if (this.player.lives <= 0) {
            alert("Game Over!");
            App.scenes.start("Game");
        }
    }
```
