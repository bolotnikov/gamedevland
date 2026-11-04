---
locale: ru
translationKey: fish-sort
title: Fish Sort
description: Подводная головоломка на сортировку, в которой важен каждый ход. Собирайте одинаковых рыбок на линиях водорослей, убирайте готовые группы и используйте усилители в сложных ситуациях.
status: released
releasePlatform: game-distribution
releaseYear: 2026
genre: Головоломка на сортировку
platforms:
  - Браузер
  - Компьютер
  - Телефон
  - Планшет
technologies:
  - TypeScript
  - PixiJS 8
  - GSAP
  - Howler.js
  - Pixi Filters
  - Vite
  - Custom HTML5 game engine
roles:
  - Полный цикл разработки игры
  - Архитектура и движок
  - Геймдизайн и интерфейс
iconImage: /assets/games/fish-sort/icon.jpg
iconAlt: Иконка Fish Sort с разноцветными рыбками под водой
coverImage: /assets/games/fish-sort/cover1.jpg
coverAlt: Обложка Fish Sort с разноцветными рыбками вокруг подводных растений
screenshots:
  - title: Первая задача на сортировку
    landscapeSrc: /assets/games/fish-sort/en/screens/land/10.webp
    landscapeAlt: Десятый уровень Fish Sort в горизонтальной ориентации
    portraitSrc: /assets/games/fish-sort/en/screens/port/10.webp
    portraitAlt: Десятый уровень Fish Sort в вертикальной ориентации
  - title: Более плотная головоломка
    landscapeSrc: /assets/games/fish-sort/en/screens/land/20.webp
    landscapeAlt: Двадцатый уровень Fish Sort в горизонтальной ориентации
    portraitSrc: /assets/games/fish-sort/en/screens/port/20.webp
    portraitAlt: Двадцатый уровень Fish Sort в вертикальной ориентации
  - title: Сложная сортировка
    landscapeSrc: /assets/games/fish-sort/en/screens/land/30.webp
    landscapeAlt: Тридцатый уровень Fish Sort в горизонтальной ориентации
    portraitSrc: /assets/games/fish-sort/en/screens/port/30.webp
    portraitAlt: Тридцатый уровень Fish Sort в вертикальной ориентации
promoVideo:
  mp4: /assets/games/fish-sort/en/videos/land.mp4
  poster: /assets/games/fish-sort/en/screens/land/10.webp
playableUrl: https://gamedevland.github.io/fish-sort-game/
orientation: adaptive
embedAspectRatio: 16 / 9
order: 2
draft: false
---


<a id="about-the-game" class="translation-anchor" aria-hidden="true"></a>

## Об игре

Fish Sort — подводная головоломка на сортировку с отдельными уровнями и тремя необязательными усилителями.

<a id="how-to-play" class="translation-anchor" aria-hidden="true"></a>

## Как играть

Перемещайте верхнюю группу рыбок между линиями водорослей и собирайте одинаковых рыбок на одной линии. Готовая группа уплывает. Если полезных ходов не осталось, помогут отмена хода, дополнительная линия и перемешивание.

<a id="technical-highlights" class="translation-anchor" aria-hidden="true"></a>

## Технические особенности

- Вертикальная и горизонтальная вёрстка используют одно состояние головоломки.
- История ходов обеспечивает детерминированную отмену.
