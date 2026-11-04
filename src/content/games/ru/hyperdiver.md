---
locale: ru
translationKey: hyperdiver
title: Hyperdiver
description: Научно-фантастическая игра об исследовании подземелий, совмещающая изучение секторов в духе «Сапёра» с боями космических кораблей, добычей и постоянными улучшениями.
status: completed
releaseYear: 2018
genre: Научно-фантастический roguelike с исследованием подземелий
platforms:
  - Браузер
  - Компьютер
  - Телефон
technologies:
  - JavaScript
  - Phaser 2.10.0
  - Underscore.js 1.8.3
  - WebGL and Canvas
  - Web Audio and HTML5 Audio
  - localStorage
roles:
  - Полный цикл разработки игры
  - Архитектура и движок
  - Геймдизайн и интерфейс
iconImage: /assets/games/hyperdiver/icon.png
iconAlt: 'Иконка Hyperdiver: космический корабль среди фиолетовых молний'
playableUrl: https://gamedevland.github.io/hyperdiver/
orientation: portrait
embedAspectRatio: 3 / 4
fitEmbedToViewport: true
order: 10
draft: false
---


<a id="about-the-game" class="translation-anchor" aria-hidden="true"></a>

## Об игре

Hyperdiver — научно-фантастический roguelike с исследованием в духе «Сапёра», боями, добычей и постоянными улучшениями корабля. В 2018 году игру [отметил Phaser](https://phaser.io/news/2018/08/hyperdiver).

<a id="how-to-play" class="translation-anchor" aria-hidden="true"></a>

## Как играть

Открывайте клетки сектора 6×8 в поисках гипертоплива, бонусов, врагов, планет и выхода. Соберите достаточно топлива для следующего прыжка, вступайте в бой по необходимости и улучшайте корабль между секторами.

<a id="technical-highlights" class="translation-anchor" aria-hidden="true"></a>

## Технические особенности

- Секторы генерируются по правилам сетки и усложняются по мере продвижения игрока.
- Вертикальное игровое поле масштабируется под доступную область просмотра без изменения игровых координат.
