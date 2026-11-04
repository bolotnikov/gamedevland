---
locale: ru
translationKey: block-puzzle
title: Block Puzzle
description: Прототип механики в духе Block Blast с перетаскиванием фигур, очисткой линий, подсчётом очков и понятной игровой архитектурой.
status: prototype
releaseYear: 2026
genre: Блочная головоломка
platforms:
  - Браузер
  - Компьютер
  - Телефон
  - Планшет
technologies:
  - TypeScript 5.9
  - PixiJS 8.16
  - GameDevLand Engine 0.0.5
  - GSAP
  - Howler.js
  - Particle effects
  - Vite 8
roles:
  - Полный цикл разработки игры
  - Архитектура и движок
  - Геймдизайн и интерфейс
iconImage: /assets/games/block-puzzle/icon.webp
iconAlt: Прототип Block Puzzle с полем восемь на восемь клеток и тремя разноцветными фигурами
playableUrl: https://gamedevland.github.io/block-puzzle/
articleUrl: /articles/ai-assisted-game-development
orientation: adaptive
embedAspectRatio: 16 / 9
order: 6
draft: false
---


<a id="about-the-game" class="translation-anchor" aria-hidden="true"></a>

## Об игре

Block Puzzle — прототип основной механики в духе Block Blast, служащий эталонным проектом для GameDevLand SDK.

<a id="how-to-play" class="translation-anchor" aria-hidden="true"></a>

## Как играть

Размещайте три доступные фигуры на поле 8×8. Заполненные строки и столбцы очищаются, принося очки. После использования всех трёх фигур появляется новый набор. Игра заканчивается, когда ни одна фигура больше не помещается.

<a id="technical-highlights" class="translation-anchor" aria-hidden="true"></a>

## Технические особенности

- Игровой процесс следует цепочке FSM → Command → Scene Service → Domain Model.
- Правила поля и подсчёт очков не зависят от отрисовки и ввода.
