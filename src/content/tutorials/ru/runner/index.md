---
locale: ru
translationKey: runner/index
title: Шаг 1. Создание движущегося фона
description: 'Шаг 1 руководства по созданию платформера с PixiJS: создание движущегося фона.'
seriesTitle: Создание платформера с PixiJS
seriesDescription: Пошаговое руководство по созданию бесконечного раннера с PixiJS, процедурными платформами, физикой и перемещением героя.
seriesSlug: runner
step: 1
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

В этой статье мы создадим бесконечный раннер с помощью [PIXI](https://pixijs.com/).

<a id="video-version" class="translation-anchor" aria-hidden="true"></a>

## Видеоверсия
<iframe width="560" height="315" src="https://www.youtube.com/embed/oZInrjsClPg" title="Видеоплеер YouTube" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<a id="additional-materials" class="translation-anchor" aria-hidden="true"></a>

## Дополнительные материалы
- [Полный исходный код](https://github.com/gamedevland/runner)
- [Демонстрационная версия](https://gamedevland.github.io/runner/)

Перед началом разработки нужно выполнить два шага:

1️⃣ Скачайте наш [шаблон проекта PIXI](https://github.com/gamedevland/pixi-project-template). Можно сразу начать работу над игрой или изучить [руководство](/ru/articles/pixi-project-template) по созданию шаблона проекта PIXI.

2️⃣ Скачайте [набор ресурсов](/assets/runner.zip) для игры. Ресурсы предоставлены замечательным сайтом [kenney.nl](https://kenney.nl)

Перемещая повторяющееся фоновое изображение справа налево, создадим эффект постоянного движения.

В главном классе игровой сцены `game/GameScene.js` создадим фон:

``` javascript

import { Background } from "./Background";
import { Scene } from '../system/Scene';

export class GameScene extends Scene {
    create() {
        this.createBackground();
    }

    createBackground() {
        this.bg = new Background();
        this.container.addChild(this.bg.container);
    }

    update(dt) {
        this.bg.update(dt);
    }
}
```

Создайте файл `Background.js`

``` javascript
import * as PIXI from "pixi.js";
import { App } from "../system/App";

export class Background {
    constructor() {
        this.speed = App.config.bgSpeed;
        this.container = new PIXI.Container();
        this.createSprites();
    }
    createSprites() {
    }
}
```
Вынесем скорость движения фона в глобальную конфигурацию:

``` javascript
export const Config = {
    bgSpeed: 2,
    // ...
};
```

Фоновое изображение должно постоянно двигаться справа налево с заданной скоростью.

Но если двигать только одно изображение, в какой-то момент оно перестанет покрывать экран и игрок увидит чёрный фон. Чтобы этого избежать, соединим несколько фоновых изображений и будем двигать их одновременно. Когда первое полностью скроется за левым краем экрана, автоматически перенесём его к правому краю.


Сначала создадим все три спрайта друг за другом.

`Background.js`:
``` javascript
    createSprites() {
        this.sprites = [];

        for (let i = 0; i < 3; i++) {
            this.createSprite(i);
        }
    }

    createSprite(i) {
        const sprite = App.sprite("bg");

        sprite.x = sprite.width * i;
        sprite.y = 0;
        this.container.addChild(sprite);
        this.sprites.push(sprite);
    }
```
Каждый спрайт смещён по оси x на суммарную ширину всех фоновых изображений слева от него.

Реализуем метод перемещения отдельного спрайта и переноса в крайнюю правую позицию, если он скрылся за левой границей экрана:

``` javascript

    move(sprite, offset) {
        const spriteRightX = sprite.x + sprite.width;

        const screenLeftX  = 0;

        if (spriteRightX <= screenLeftX) {
            sprite.x += sprite.width * this.sprites.length;
        }
        
        sprite.x -= offset;
    }
```

Осталось вызвать `move` для каждого спрайта в методе `update`:

``` javascript

    update(dt) {
        const offset = this.speed * dt;

        this.sprites.forEach(sprite => {
            this.move(sprite, offset);
        });
    }
```
