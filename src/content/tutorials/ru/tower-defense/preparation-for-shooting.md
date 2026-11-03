---
locale: ru
translationKey: tower-defense/preparation-for-shooting
title: Шаг 6. Подготовка к стрельбе
description: 'Шаг 6 руководства по созданию Tower Defense с PIXI: подготовка к стрельбе.'
seriesTitle: Создание Tower Defense с PIXI
seriesDescription: Создание игры в жанре tower defense с PixiJS, тайловыми картами, врагами, движением по пути и основными игровыми системами.
seriesSlug: tower-defense
step: 6
readingTime: 3 минуты чтения
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

В игре есть и враги, и башни. Можно переходить к реализации стрельбы по врагам.

<a id="61-tower-coverage" class="translation-anchor" aria-hidden="true"></a>

### 6.1. Зона действия башни

Определим, как башня будет атаковать врага.

Сначала враг должен попасть в зону стрельбы башни. Тогда башня сможет обнаружить его и начать атаку. Дальность уже задана в конфигурации башни. Зона является кругом заданного радиуса, который можно нарисовать через [PIXI.Graphics](https://pixijs.com/8.x/guides/components/graphics).

Создадим зону огня в классе `Tower`: нарисуем круг заданного радиуса в глобальных координатах башни через [PIXI.Graphics](https://pixijs.com/8.x/guides/components/graphics).

```javascript
export class Tower extends Tile {
    // ...
    createArea() {
        this.area = new PIXI.Graphics();
        this.area.beginFill(0xffffff, 1);
        this.area.drawCircle(this.sprite.getGlobalPosition().x, this.sprite.getGlobalPosition().y, this.config.range);
        this.area.endFill();
    }
}
```

Вызовем этот метод в `Game` при создании башни:

```javascript
export class GameScene extends Scene {
    create() {
        this.createCollisionsContainer();
        // ...
    }

    createCollisionsContainer() {
        this.collisions = new PIXI.Container();
        this.container.addChild(this.collisions);
    }

    onTowerPlaceClick(towerPlace) {
        // ...
        tower.createArea();
        this.collisions.addChild(tower.area);
    }
```

В `Game` также нужен отдельный контейнер `this.collisions`. Создадим его в самом начале и добавим первым дочерним элементом контейнера `Game`. Все зоны башен добавим в него. Так изображения зон окажутся под слоем карты.

<a id="62-enemy-detection" class="translation-anchor" aria-hidden="true"></a>

### 6.2. Обнаружение врага
Теперь можно проверить, находится ли враг в созданной зоне стрельбы.

Сначала реализуем `Tower.detect`:

```javascript
detect(enemy) {
    if (enemy.sprite) {
        return this.area.containsPoint(new PIXI.Point(enemy.sprite.x, enemy.sprite.y));
    }
    return false;
}
```

Используем метод [containsPoint](https://pixijs.download/v4.8.2/docs/PIXI.Graphics.html#containsPoint) класса [PIXI.Graphics](https://pixijs.com/8.x/guides/components/graphics), передавая координаты врага и проверяя, принадлежат ли они текущей зоне.

Метод нужно вызывать постоянно на протяжении игры, чтобы проверять видимость врагов в реальном времени.

Для этого в классе `Game` используем возможности (PIXI.Ticker)[https://pixijs.download/v7.0.5/docs/PIXI.Ticker.html], чтобы вызывать `update` на каждом новом кадре анимации:

```javascript
    setEvents() {
        App.on("tower-place-click", this.onTowerPlaceClick.bind(this));
        App.app.ticker.add(this.update, this);
    }

    update() {
    }
```

Запишем алгоритм проверки обнаружения врагов башнями:

- для каждой башни, созданной на уровне
    - найти первого юнита в зоне её огня
        - если юнит найден, атаковать его

Реализуем этот алгоритм в `processTowerAttackEnemies` класса `Game` и вызовем метод в `update`:


```javascript
    processTowerAttackEnemies() {
        this.map.towers.forEach(tower => {
            const enemy = this.enemies.units.find(unit => tower.detect(unit));

            if (enemy) {
                tower.attack(enemy);
            }
        });
    }

    update() {
        this.processTowerAttackEnemies();
    }
```

Саму атаку реализуем в следующих уроках. Пока оставим `Tower.attack` пустым:
```javascript
// Tower.js
attack() {}
```
Сейчас созданные башни получаем из `this.map.towers`. Нужно реализовать этот геттер в `LevelMap`. Получить все башни просто:

- получить все тайлы слоя towers — места для башен:

```javascript
const towerPlaces = this.tiles["towers"];
```

- отфильтровать места, где башни действительно построены:

```javascript
const towerPlacesWithTowers = towerPlaces.filter(towerPlace => towerPlace.tower);
```

- получить башни через `Array.prototype.map`:

```javascript
towerPlacesWithTowers.map(towerPlace => towerPlace.tower);
```

Все действия можно записать одной строкой:

```javascript
    get towers() {
        return this.tiles["towers"].filter(towerPlace => towerPlace.tower).map(towerPlace => towerPlace.tower);
    }
```

<a id="63-tower-rotation" class="translation-anchor" aria-hidden="true"></a>

### 6.3. Поворот башни

Повернём башню к врагу, по которому нужно стрелять. Для этого определим угол поворота спрайта. Похожий механизм уже есть в `Enemy`: поворот к следующей точке пути. Перенесём этот код в `Tower`:


```javascript
    getAngleByTarget(targetPosition) {
        const x = targetPosition.x - this.sprite.parent.x;
        const y = targetPosition.y - this.sprite.parent.y;
        return 180 * Math.atan2(y, x) / Math.PI + 90;
    }

    rotateToEnemy(enemy) {
        this.sprite.angle = this.getAngleByTarget({x: enemy.sprite.x, y: enemy.sprite.y});
    }
```

Поскольку спрайт башни является дочерним элементом тайла её места, нужно взять координаты тайла места. Поэтому исходные координаты получаем из родительского спрайта:
- `this.sprite.parent.x`
- `this.sprite.parent.y`

В атласе `tilemap.png` тайлы башен повёрнуты на 90 градусов относительно тайлов юнитов. Поэтому перед возвратом результата из `getAngleByTarget` добавляем 90 градусов.

Изменим `attack` в классе `Tower`:

```javascript
// Tower.js
attack(enemy) {
    this.rotateToEnemy(enemy);
}
```
