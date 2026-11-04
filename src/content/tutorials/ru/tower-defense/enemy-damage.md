---
locale: ru
translationKey: tower-defense/enemy-damage
title: Шаг 8. Урон врагу
description: 'Шаг 8 руководства по созданию Tower Defense с PIXI: урон врагу.'
seriesTitle: Создание Tower Defense с PIXI
seriesDescription: Создание игры в жанре tower defense с PixiJS, тайловыми картами, врагами, движением по пути и основными игровыми системами.
seriesSlug: tower-defense
step: 8
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

<a id="81-collision-with-a-bullet" class="translation-anchor" aria-hidden="true"></a>

### 8.1. Столкновение со снарядом
При контакте спрайта снаряда со спрайтом врага нужно уничтожить снаряд и нанести врагу урон. Начнём с отслеживания столкновений спрайтов.

В новом методе `processEnemyBulletCollision` пройдём все снаряды каждой башни и для каждого проверим, есть ли хотя бы один враг, с которым он сталкивается:

```javascript
    processEnemyBulletCollision() {
        this.map.towers.forEach(tower => {
            tower.bullets.forEach(bullet => {
                const enemy = this.enemies.units.find(unit => bullet.collide(unit.sprite));

                if (enemy) {
                    bullet.remove();
                }
            });
        });
    }

    update() {
        // ...
        this.processEnemyBulletCollision();
    }
```

Разработаем `collide` в классе `Bullet`:

```javascript
collide(sprite) {
    if (!sprite) {
        return;
    }
    return sprite.containsPoint(this.sprite.getGlobalPosition());
}
```

<a id="82-applying-damage" class="translation-anchor" aria-hidden="true"></a>

### 8.2. Нанесение урона
Перед уничтожением снаряда нанесём врагу урон:

```javascript
    processEnemyBulletCollision() {
        // ...
        if (bullet.collide(enemy.sprite)) {
            enemy.addDamage(bullet.damage);
            bullet.remove();
        }
        // ...
    }
```

Зададим поле `damage` класса `Bullet` значением из конфигурации:

```javascript
export class Bullet extends EventEmitter {
    constructor(tower, enemy) {
        // ...
        this.damage = this.tower.config.bullet.damage;
    }
}
// ...
```

Реализуем методы `addDamage` и `remove` в классе `Enemy`:

```javascript
export class Enemy extends Tile {

    constructor(config, path) {
        // ...
        this.hp = this.config.hp;
    }
    // ...

    addDamage(damage) {
        this.hp -= damage;

        if (this.hp <= 0) {
            this.remove();
        }
    }

    remove() {
        gsap.killTweensOf(this.sprite);
        this.sprite.destroy();
        this.sprite = null;
        this.emit("removed");
    }
}
```
Возьмём здоровье из конфигурации врага. В `addDamage` вычтем нужное число здоровья и, если значение не больше нуля, вызовем `remove`.

В `remove` сначала остановим твин-анимации `gsap`. Затем уничтожим спрайт и отправим событие `removed`:

Подпишемся на это событие в `Enemies` сразу после создания юнита. При событии удалим его из пула активных юнитов:

```javascript
createEnemy(i) {
    // ...
    enemy.once("removed", this.onEnemyRemoved.bind(this, enemy));
}

onEnemyRemoved(enemy) {
    this.units = this.units.filter(unit => unit !== enemy);

    if (!this.units.length) {
        window.setTimeout(this.create.bind(this), this.waveDelay);
    }
}
```

После удаления дополнительно проверяем размер `this.units`. Если юнитов не осталось, пора создать новую волну, вызвав `create` с заданной задержкой. Добавим `this.waveDelay` в конструктор `Enemies`:

```javascript
const WaveDelay = 3000;

export class Enemies extends EventEmitter {

    constructor(map) {
        // ...
        this.waveDelay = WaveDelay;
    }
    // ...
}
```
