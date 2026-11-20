---
locale: ru
translationKey: capydiver
title: CapyDiver
description: Подводная игра о капибаре, которая исследует процедурные рифы и ищет тайники за водорослями.
status: released
releaseDate: 2026-11-18
genre: Подводное приключение
platforms:
  - Браузер
  - Компьютер
  - Телефон
  - Планшет
technologies:
  - TypeScript
  - PixiJS
  - Rigby2D
  - GameDevLand Engine 0.0.17
  - Vite
roles:
  - Разработка игры
  - Генерация рельефа и управление
  - Скелетная анимация и эффекты
  - Интерфейс и адаптивная вёрстка
iconImage: /assets/games/capydiver/icon.jpg
iconAlt: Капибара в оранжевом гидрокостюме и зелёных ластах плывёт над рифом
coverImage: /assets/games/capydiver/cover.webp
coverAlt: Капибара плывёт вдоль кораллового уступа, впереди видны монеты и рыбы
screenshots:
  - title: Спуск через подводную шахту
    landscapeSrc: /assets/games/capydiver/screens/land/shaft.webp
    landscapeAlt: Капибара ныряет между изгибающимися каменными стенами
    portraitSrc: /assets/games/capydiver/screens/port/shaft.webp
    portraitAlt: Портретный игровой кадр с капибарой и рыбами в подводной шахте
  - title: Грот с монетами и патрулями
    landscapeSrc: /assets/games/capydiver/screens/land/grotto.webp
    landscapeAlt: Монеты, кораллы и рыбы вдоль каменного уступа
    portraitSrc: /assets/games/capydiver/screens/port/grotto.webp
    portraitAlt: Капибара у кораллового уступа в портретном игровом кадре
  - title: Перед погружением
    landscapeSrc: /assets/games/capydiver/screens/land/title.webp
    landscapeAlt: Титульный экран CapyDiver в горизонтальной ориентации
    portraitSrc: /assets/games/capydiver/screens/port/title.webp
    portraitAlt: Титульный экран CapyDiver в портретной ориентации
promoVideo:
  mp4: /assets/games/capydiver/gameplay.mp4
  poster: /assets/games/capydiver/screens/land/shaft.webp
  aspectRatio: 16 / 9
playableUrl: https://gamedev.land/play/capydiver/?v=0.1.1
orientation: adaptive
embedAspectRatio: 16 / 9
order: -4
draft: false
---

<a id="about-the-game" class="translation-anchor" aria-hidden="true"></a>

## Об игре

Капибара исследует подводный лабиринт, собирает монеты и ищет две реликвии за водорослями. В каждом новом заплыве меняются проходы и расположение патрулей. Вход находится слева, а к выходу справа ведут извилистые шахты и обходы вокруг скал.

<a id="how-to-play" class="translation-anchor" aria-hidden="true"></a>

## Как играть

На компьютере для плавания подходят WASD и стрелки. Пробел или щелчок запускает рывок. На сенсорном экране направление задаётся плавающим джойстиком, а для рывка есть отдельная кнопка.

Рывок разбивает груз и расчищает водоросли у выхода. Боковые проходы ведут к тайникам. Повтор попытки сохраняет тот же риф.

<a id="technical-highlights" class="translation-anchor" aria-hidden="true"></a>

## Технические особенности

Генератор строит контуры Безье для склонов, стен и гротов. Один набор контуров используется для отрисовки, посадки растений и коллизий. Герой скользит вдоль поверхности при касании, а пузырьки выходят из точки на скелетном риге и всплывают независимо от движения.

[Публичный репозиторий браузерной сборки](https://github.com/bolotnikov/capydiver)
