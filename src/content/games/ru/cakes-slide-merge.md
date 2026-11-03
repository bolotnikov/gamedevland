---
locale: ru
translationKey: cakes-slide-merge
title: Cakes Slide Merge
description: 'Физический merge-прототип: игрок направляет и сбрасывает торты, которые при столкновении объединяются во всё более сложные десерты.'
status: prototype
releaseYear: 2026
genre: Физическая merge-головоломка
platforms:
  - Браузер
  - Компьютер
  - Телефон
  - Планшет
technologies:
  - TypeScript
  - PixiJS 8
  - Matter.js
  - GSAP
  - Howler.js
  - GameDevLand Engine
  - Vite
roles:
  - Полный цикл разработки игры
  - Архитектура и движок
  - Геймдизайн и интерфейс
iconImage: /assets/games/slide-merge/icon.webp
iconAlt: 'Прототип Cakes Slide Merge: два небольших торта объединяются в большой украшенный торт'
playableUrl: https://gamedevland.github.io/cakes-merge/
orientation: adaptive
embedAspectRatio: 16 / 9
order: 7
draft: false
---


<a id="about-the-game" class="translation-anchor" aria-hidden="true"></a>

## Об игре

Cakes Slide Merge — физический merge-прототип с одиннадцатью видами тортов, накоплением очков и предпросмотром следующего предмета.

<a id="how-to-play" class="translation-anchor" aria-hidden="true"></a>

## Как играть

Перемещайте текущий торт по горизонтали и сбрасывайте его в поднос. Два одинаковых торта объединяются в следующий вид. Игра заканчивается, когда устоявшаяся стопка пересекает предельную линию.

<a id="technical-highlights" class="translation-anchor" aria-hidden="true"></a>

## Технические особенности

- Прогрессия объединений отделена от физической симуляции.
- События столкновений координируют замену объектов, очки, эффекты и звук.
