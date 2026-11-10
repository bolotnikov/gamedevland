---
locale: ru
translationKey: hole-islands
title: Hole Islands
description: "Аркада о поглощении предметов: дыра растёт, открывая доступ к крупным фруктам и конструкциям."
status: in-development
genre: Аркада
platforms:
  - Браузер
  - Компьютер
  - Телефон
  - Планшет
technologies:
  - TypeScript
  - Three.js
  - PixiJS
  - Cannon
  - GameDevLand Engine
  - Vite
roles:
  - Разработка игры полного цикла
  - 3D-графика и физика
  - Дизайн десяти уровней
  - Интерфейс и оптимизация производительности
iconImage: /assets/games/hole-islands/icon.webp
iconAlt: Фрукты падают в фиолетовую дыру на тропическом острове
coverImage: /assets/games/hole-islands/screens/land/level-5.webp
coverAlt: Дыра рядом с вишней и тропическими фруктами на пятом острове
logoImage: /assets/games/hole-islands/logo.webp
screenshots:
  - title: Груши и фруктовые дольки
    landscapeSrc: /assets/games/hole-islands/screens/land/level-3.webp
    landscapeAlt: Третий остров с манго, грушами и дольками фруктов
    portraitSrc: /assets/games/hole-islands/screens/port/level-3.webp
    portraitAlt: Дыра рядом с грушами и фруктовыми дольками в портретной ориентации
  - title: Башни с фруктами
    landscapeSrc: /assets/games/hole-islands/screens/land/level-4.webp
    landscapeAlt: Деревянные колонны с золотистыми дольками киви
    portraitSrc: /assets/games/hole-islands/screens/port/level-4.webp
    portraitAlt: Дыра у деревянной колонны на четвёртом острове
  - title: Вишня и тропические фрукты
    landscapeSrc: /assets/games/hole-islands/screens/land/level-5.webp
    landscapeAlt: Вишня, питахайя и кольца ананаса на пятом острове
    portraitSrc: /assets/games/hole-islands/screens/port/level-5.webp
    portraitAlt: Дыра возле вишни и колец ананаса на вертикальном экране
  - title: Массовый сбор ягод
    landscapeSrc: /assets/games/hole-islands/screens/land/level-9.webp
    landscapeAlt: Девятый остров с плотными узорами из голубики и ежевики
    portraitSrc: /assets/games/hole-islands/screens/port/level-9.webp
    portraitAlt: Дыра среди голубики и ежевики на вертикальном экране
promoVideo:
  mp4: /assets/games/hole-islands/gameplay.mp4
  aspectRatio: 9 / 16
  poster: /assets/games/hole-islands/screens/port/level-5.webp
playableUrl: https://gamedevland.github.io/hole-islands/
orientation: adaptive
embedAspectRatio: 16 / 9
order: -2
draft: false
---

<a id="about-the-game" class="translation-anchor" aria-hidden="true"></a>

## Об игре

В Hole Islands десять островов с фруктами, ягодами и овощами. Нужно собрать указанные продукты до окончания времени. Поглощение небольших предметов увеличивает дыру и позволяет добраться до крупных целей. Башни и ящики состоят из отдельных физических тел и обрушиваются при потере опоры.

<a id="how-to-play" class="translation-anchor" aria-hidden="true"></a>

## Как играть

Дыра перемещается перетаскиванием мышью или пальцем, а также клавишами WASD и стрелками. По ходу кампании открываются четыре бустера: увеличение дыры, магнит, поиск целей и заморозка таймера. Прогресс и настройки сохраняются между сессиями.

<a id="technical-highlights" class="translation-anchor" aria-hidden="true"></a>

## Технические особенности

- Three.js рисует трёхмерный мир, PixiJS — интерфейс поверх него; физику рассчитывает Cannon.
- Оптимизированы отрисовка и физика сцен с сотнями предметов. Локальный тест уровня с 616 предметами — около 120 FPS в Chrome на MacBook Pro M1 Pro при 720×1280.
- Камера и интерфейс адаптируются к портретной и альбомной ориентации.
- GameDevLand Engine управляет сценами, ассетами, звуком и сохранением данных; игровой поток следует FSM → Command → Service.
