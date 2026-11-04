---
locale: ru
translationKey: adaptive-layout-poki-en/virtual-screen
title: Виртуальный экран вместо window.innerWidth повсюду
description: Как виртуальные системы координат для двух ориентаций делают адаптивную игровую вёрстку предсказуемой.
seriesTitle: Адаптивная вёрстка HTML5-игры для Poki
seriesDescription: Практический разбор адаптации интерфейса, экрана и игрового процесса к разрешениям компьютеров, телефонов, планшетов и iframe на Poki.
seriesSlug: adaptive-layout-poki-en
seriesTypeLabel: Серия практических разборов
stepLabel: Раздел
step: 2
readingTime: 2 минуты чтения
steps:
  - step: 1
    slug: ''
    title: Задача и архитектура
  - step: 2
    slug: virtual-screen
    title: Виртуальный экран
  - step: 3
    slug: screen-changes
    title: Изменения экрана
  - step: 4
    slug: layout-primitives
    title: Примитивы вёрстки
  - step: 5
    slug: scene-composition
    title: Композиция сцены
  - step: 6
    slug: level-panel
    title: Панель уровня
  - step: 7
    slug: responsive-physics
    title: Адаптивная физика
  - step: 8
    slug: object-sizing
    title: Размеры объектов
  - step: 9
    slug: resize-during-animation
    title: Изменение размера во время анимации
  - step: 10
    slug: responsive-text
    title: Адаптивный текст
  - step: 11
    slug: recommendations
    title: Рекомендации
---

<a id="1-virtual-screen-instead-of-windowinnerwidth-everywhere" class="translation-anchor" aria-hidden="true"></a>

## 1. Виртуальный экран вместо window.innerWidth повсюду

Основная конфигурация экрана находится в `game/src/config/game.config.ts`:

```ts
screen: {
  land: { width: 960, height: 540 },
  port: { width: 540, height: 960 },
  dpr: 'auto',
  maxDpr: 2,
  render: {
    scaleFactor: GameRenderScalePolicy.resolveScaleFactor(),
  },
},
```

Я задаю две базовые виртуальные системы координат:

- горизонтальная ориентация: `960 x 540`
- вертикальная ориентация: `540 x 960`

Это не означает, что игра всегда имеет именно такой размер. Движок читает реальную область просмотра, определяет ориентацию и вычисляет виртуальный canvas, заполняющий доступное пространство.

Упрощённый код из `engine/screen/Scaler.ts`:

```ts
const isLand = viewport.width >= viewport.height;
const orientation = isLand ? 'land' : 'port';
const virt = isLand ? this.config.land : this.config.port;

const useWidth = fit === 'width' || (fit === 'auto' && isLand);
const useHeight = fit === 'height' || (fit === 'auto' && !isLand);

const canvasWidth = useWidth ? virt.width : Math.round(virt.height * (vw / vh));
const canvasHeight = useHeight ? virt.height : Math.round(virt.width * (vh / vw));
```

Принцип:

- в горизонтальной ориентации стабильной осью обычно служит ширина;
- в вертикальной — высота;
- другая ось выводится из фактического соотношения сторон;
- игровой код работает в виртуальных координатах;
- canvas визуально заполняет область просмотра.

Это делает вёрстку игры предсказуемой и избавляет кодовую базу от повсеместного использования размеров окна браузера.
