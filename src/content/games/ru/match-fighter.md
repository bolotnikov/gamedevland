---
locale: ru
translationKey: match-fighter
title: Match Fighter
description: 'Пошаговый файтинг с механикой «три в ряд»: каждая комбинация усиливает атаку, создаёт специальные плитки и приближает встречу со следующим соперником в башне.'
status: released
releasePlatform: game-distribution
releaseYear: 2025
genre: Боевая головоломка «три в ряд»
platforms:
  - Браузер
  - Компьютер
  - Телефон
  - Планшет
technologies:
  - TypeScript 4.7
  - PixiJS 7.4
  - GSAP 3
  - Tween.js
  - Howler.js
  - Pixi Particle Emitter
  - Pixi Filters
  - Webpack 5
  - Custom HTML5 game engine
roles:
  - Полный цикл разработки игры
  - Архитектура и движок
  - Геймдизайн и интерфейс
iconImage: /assets/games/match-fighter/icon_512.jpg
iconAlt: Иконка Match Fighter с двумя бойцами, стоящими друг против друга
logoImage: /assets/games/match-fighter/logo.webp
screenshots:
  - title: Выберите соперника
    landscapeSrc: /assets/games/match-fighter/screens/land/mode-select.webp
    landscapeAlt: Выбор игры с другом или ботом в Match Fighter в горизонтальной ориентации
    portraitSrc: /assets/games/match-fighter/screens/port/mode-select.webp
    portraitAlt: Выбор игры с другом или ботом в Match Fighter в вертикальной ориентации
  - title: Поднимайтесь по башне бойцов
    landscapeSrc: /assets/games/match-fighter/screens/land/tower.webp
    landscapeAlt: Башня соперников Match Fighter в горизонтальной ориентации
    portraitSrc: /assets/games/match-fighter/screens/port/tower.webp
    portraitAlt: Башня соперников Match Fighter в вертикальной ориентации
  - title: Собирайте комбинации, чтобы атаковать
    landscapeSrc: /assets/games/match-fighter/screens/land/battle.webp
    landscapeAlt: Пошаговый бой «три в ряд» в Match Fighter в горизонтальной ориентации
    portraitSrc: /assets/games/match-fighter/screens/port/battle.webp
    portraitAlt: Пошаговый бой «три в ряд» в Match Fighter в вертикальной ориентации
promoVideo:
  mp4: /assets/games/match-fighter/videos/land.mp4
  poster: /assets/games/match-fighter/screens/land/battle.webp
playableUrl: https://gamedevland.github.io/match-fighter/
orientation: adaptive
embedAspectRatio: 16 / 9
order: 5
draft: false
---


<a id="about-the-game" class="translation-anchor" aria-hidden="true"></a>

## Об игре

Match Fighter сочетает пошаговый бой с полем «три в ряд». В игре есть одиночная башня из десяти соперников и режим для двух игроков на одном устройстве.

<a id="how-to-play" class="translation-anchor" aria-hidden="true"></a>

## Как играть

Меняйте соседние плитки местами, собирайте комбинации и атакуйте соперника. Большие комбинации создают специальные плитки. Бой заканчивается, когда одна из полос здоровья достигает нуля.

<a id="technical-highlights" class="translation-anchor" aria-hidden="true"></a>

## Технические особенности

- Собственный ECS-движок предоставляет сущности, компоненты, управление системами и конвейеры обработки состояния и ввода.
- Игровой слой содержит 41 систему и 25 компонентов для сетки, обменов, комбинаций, каскадов, усилителей, боя, ходов, логики бота и завершения игры.
- Бот и локальный режим для двух игроков используют одни и те же системы ходов и поля; отличается только выбор хода.
