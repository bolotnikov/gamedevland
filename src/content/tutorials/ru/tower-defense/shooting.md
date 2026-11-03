---
locale: ru
translationKey: tower-defense/shooting
title: Шаг 7. Стрельба
description: 'Шаг 7 руководства по созданию Tower Defense с PIXI: стрельба.'
seriesTitle: Создание Tower Defense с PIXI
seriesDescription: Создание игры в жанре tower defense с PixiJS, тайловыми картами, врагами, движением по пути и основными игровыми системами.
seriesSlug: tower-defense
step: 7
readingTime: 4 минуты чтения
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

<a id="71-creating-a-bullet" class="translation-anchor" aria-hidden="true"></a>

### 7.1. Создание снаряда

Башни стреляют по врагам снарядами, представленными спрайтом `fire.png`. Создадим класс `Bullet`, создающий снаряд для заданной башни:

```javascript

import { EventEmitter } from "events";
import { App } from '../system/App';

export class Bullet extends EventEmitter {
    constructor(tower, enemy) {
        super();
        this.tower = tower;
        this.enemy = enemy;

        this.sprite = App.sprite("fire");
        this.sprite.anchor.set(0.5, 1);
        this.sprite.x = this.tower.sprite.x;
        this.sprite.y = this.tower.sprite.y;

        this.sprite.angle = this.tower.sprite.angle;
    }
}
```

Унаследуем его от `EventEmitter`, чтобы отправлять события снаряда. Например, позже нам понадобится знать момент его уничтожения — при попадании во врага или выходе за экран — по соответствующему событию.

Передадим в конструктор `Bullet` объект стреляющей башни и врага, по которому выпущен снаряд.

Создадим спрайт снаряда и поместим его в координаты башни с тем же углом поворота.

За выстрел отвечает `shoot` класса `Tower`. В нём нужно создать экземпляр `Bullet`:

```javascript
export class Tower extends Tile {
    constructor(config) {
        // ...
        this.bullets = [];
        this.active = true;
    }
    // ...
    shoot(enemy) {
        const bullet = new Bullet(this, enemy);
        this.bullets.push(bullet);
        this.sprite.parent.addChild(bullet.sprite);
    }
}
```
Метод также принимает объект врага, по которому стреляет башня. Все созданные снаряды будем сохранять в `this.bullets`, чтобы затем отслеживать их и проверять столкновения с врагами.


Изменим `attack` в `Tower`, добавив вызов `shoot` при активной башне:

```javascript
    attack(enemy) {
        this.rotateToEnemy(enemy);

        if (this.active) {
            this.active = false;
            this.shoot(enemy);
            window.setTimeout(() => this.active = true, this.config.cooldown);
        }
    }
```

Флаг `active` показывает, может ли башня стрелять сейчас. `Tower.attack` вызывается в `Game.update`, то есть постоянно, на каждом кадре. Но мы хотим выпускать снаряды только с частотой, заданной для башни.

Поэтому для перезарядки нужно отключать активность башни сразу после выстрела и включать после тайм-аута. Запустим тайм-аут с временем перезарядки из конфигурации, затем снова активируем башню флагом `this.active = true;`


<a id="72-firing-a-bullet" class="translation-anchor" aria-hidden="true"></a>

### 7.2. Полёт снаряда

Чтобы снаряд двигался, на каждом кадре нужно менять координаты его спрайта на заданное смещение. Определим смещение по `x` и `y` с учётом угла поворота спрайта. Сделаем это в `Bullet.init`:

```javascript
export class Bullet extends EventEmitter {
    constructor(tower, enemy) {
        // ...
        this.init();
    }

    init() {
        const speed = this.tower.config.bullet.speed;
        const azimuth = (this.sprite.angle) * (Math.PI / 180) - Math.PI / 2;
        this.velocity = {x: Math.cos(azimuth) * speed, y: Math.sin(azimuth) * speed};
        App.app.ticker.add(this.update, this);
    }

    update() {
        this.sprite.x += this.velocity.x;
        this.sprite.y += this.velocity.y;
    }
}
```
Берём скорость снаряда из заданной ранее конфигурации башни. Затем определяем азимут по углу поворота спрайта после создания. Зная азимут и скорость, вычисляем смещение по `x` и `y` и записываем его в `this.velocity`.

Создаём callback `update`, в котором прибавляем полученное смещение к координатам спрайта снаряда.

Добавим функцию в [PIXI.Ticker](https://pixijs.download/v7.0.5/docs/PIXI.Ticker.html), чтобы она выполнялась на каждом кадре игры.

<a id="73-destruction-of-a-bullet" class="translation-anchor" aria-hidden="true"></a>

### 7.3. Уничтожение снаряда
Вышедший за экран снаряд нужно уничтожить по двум причинам:

1. неиспользуемый объект не должен занимать память
2. ненужные проверки не должны выполняться, а `update` снаряда не должен продолжать бесполезные вычисления

Сделаем это сразу, чтобы избежать возможных проблем с производительностью игры.

Проверим координаты снаряда. Если он вышел за экран, уничтожим спрайт и удалим `update` из ticker:

```javascript
    update() {
        this.sprite.x += this.velocity.x;
        this.sprite.y += this.velocity.y;

        let position = this.sprite.getGlobalPosition()

        if (position.x < 0 || position.x > App.app.view.width) {
            this.remove();
        }
    }

    remove() {
        App.app.ticker.remove(this.update, this);
        this.sprite.destroy();
        this.sprite = null;
        this.emit("removed");
    }
```

Достаточно проверить координату `x` спрайта. Для получения глобальной позиции используем метод [`getGlobalPosition`](https://pixijs.download/v5.3.5/docs/PIXI.Sprite.html#getGlobalPosition) класса [PIXI.Sprite](https://api.pixijs.io/@pixi/sprite/PIXI/Sprite.html). Левая граница экрана имеет `x = 0`. Координату правой границы получим из ширины `canvas` через `App.app.view.width`. Если `x` снаряда меньше `0` или больше правой границы, уничтожим его спрайт, удалим callback из ticker и отправим соответствующее событие.

Теперь можно отслеживать событие уничтожения снаряда. Изменим `Tower.shoot`, удаляя уничтоженный снаряд из пула башни:

```javascript
shoot(enemy) {
    // ...
    bullet.once("removed", () => this.bullets = this.bullets.filter(item => item !== bullet));
}
```
