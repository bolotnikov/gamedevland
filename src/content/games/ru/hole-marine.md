---
locale: ru
translationKey: hole-marine
title: Hole Marine
description: "Подводная аркада с 30 уровнями: растущая дыра собирает рыб, ракушки и сокровища на морском дне."
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
  - Дизайн 30 уровней
  - Интерфейс и адаптация к разным экранам
iconImage: /assets/games/hole-marine/icon.webp
iconAlt: Удивлённые рыбы и ракушка над морской воронкой
coverImage: /assets/games/hole-marine/cover.webp
coverAlt: Иллюстрация Hole Marine с тропическими рыбами, ракушками и сокровищами
logoImage: /assets/games/hole-marine/logo.webp
screenshots:
  - title: Косяки рыб и золотые монеты
    landscapeSrc: /assets/games/hole-marine/screens/level-6.webp
    landscapeAlt: Голубые рыбы и ряды золотых монет вокруг дыры на шестом уровне
  - title: Ракушки и древние амфоры
    landscapeSrc: /assets/games/hole-marine/screens/level-11.webp
    landscapeAlt: Дыра рядом с ракушками и амфорой на одиннадцатом уровне
  - title: Морские хищники и сокровища
    landscapeSrc: /assets/games/hole-marine/screens/level-26.webp
    landscapeAlt: Акула, лобстеры и золотой слиток на деревянной опоре
  - title: Конструкции на морском дне
    landscapeSrc: /assets/games/hole-marine/screens/level-30.webp
    landscapeAlt: Ракушки вокруг деревянных колонн и амфора на опорах в финальном уровне
promoVideo:
  mp4: /assets/games/hole-marine/gameplay.mp4
  aspectRatio: 16 / 9
  poster: /assets/games/hole-marine/screens/video-poster.webp
playableUrl: https://gamedevland.github.io/hole-marine/
orientation: adaptive
embedAspectRatio: 16 / 9
order: -2
draft: false
---

<a id="about-the-game" class="translation-anchor" aria-hidden="true"></a>

## Об игре

В Hole Marine 30 подводных уровней с рыбами, ракушками и сокровищами. Нужно выполнить задания до окончания времени: начать с небольших предметов, увеличить дыру и добраться до крупных целей — акул, скатов и кита. Деревянные конструкции состоят из отдельных физических тел и обрушиваются при потере опоры.

<a id="how-to-play" class="translation-anchor" aria-hidden="true"></a>

## Как играть

Дыра перемещается перетаскиванием мышью или пальцем, а также клавишами WASD и стрелками. По ходу кампании открываются четыре бустера: увеличение дыры, магнит, поиск целей и заморозка таймера. Прогресс и настройки сохраняются между сессиями.

<a id="technical-highlights" class="translation-anchor" aria-hidden="true"></a>

## Технические особенности

- Three.js рисует трёхмерный мир, PixiJS — интерфейс поверх него; физику рассчитывает Cannon.
- Рыбы удерживаются в воде за счёт плавучести и реагируют на физическое всасывание.
- Модели уровней подгружаются по мере прохождения. Во время перехода игра ожидает необходимые ресурсы.
- Камера и интерфейс адаптируются к портретной и альбомной ориентации.
- GameDevLand Engine управляет сценами, ассетами, звуком и сохранением данных; игровой поток следует FSM → Command → Service.
