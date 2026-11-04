---
locale: ru
translationKey: adaptive-layout-poki-en/level-panel
title: Панель уровня и правила для графики
description: Как панель игрового процесса меняет расположение с нижнего в вертикальной ориентации на боковое в горизонтальной и как в неё вписывается графика.
seriesTitle: Адаптивная вёрстка HTML5-игры для Poki
seriesDescription: Практический разбор адаптации интерфейса, экрана и игрового процесса к разрешениям компьютеров, телефонов, планшетов и iframe на Poki.
seriesSlug: adaptive-layout-poki-en
seriesTypeLabel: Серия практических разборов
stepLabel: Раздел
step: 6
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

<a id="9-level-scene-bottom-panel-in-portrait-left-panel-in-landscape" class="translation-anchor" aria-hidden="true"></a>

## 9. Сцена уровня: нижняя панель вертикально, левая панель горизонтально

Сцена игрового процесса — самая важная часть.

В `LevelPanelComponent` панель использует такие размеры:

- вертикальная ориентация: полная ширина и 33% высоты;
- горизонтальная ориентация: 33% ширины и полная высота.

```ts
const panelHeight = orientation === 'port'
  ? Math.max(1, Math.round(screen.height * LevelPanelLayoutMetrics.PANEL_HEIGHT_RATIO))
  : Math.max(1, Math.round(screen.height));

const panelWidth = orientation === 'port'
  ? Math.max(1, Math.round(screen.width))
  : Math.max(1, Math.round(screen.width * LevelPanelLayoutMetrics.PANEL_WIDTH_RATIO));
```

Это не просто изменение размера. Меняется модель компоновки.

Почему:

- на вертикальном мобильном экране нижнюю панель альбома проще читать и использовать;
- на компьютере и широком горизонтальном экране левая вертикальная панель лучше использует ширину;
- игровое поле получает больше полезного пространства;
- предпросмотр альбома остаётся достаточно крупным.

Размерные параметры хранятся отдельно:

```ts
export class LevelPanelLayoutMetrics {
  static readonly PANEL_HEIGHT_RATIO = 0.33;
  static readonly PANEL_WIDTH_RATIO = 0.33;
  static readonly ARTWORK_HEIGHT_RATIO = 0.9;
  static readonly ARTWORK_WIDTH_RATIO = 0.9;
}
```

Так пропорции UX удобно настраивать.

<a id="10-artwork-inside-the-panel-has-its-own-rules" class="translation-anchor" aria-hidden="true"></a>

## 10. У графики внутри панели свои правила

`LevelPanelArtworkComponent` вписывает изображение альбома в панель.

В вертикальной ориентации размер зависит от высоты панели:

```ts
const artworkWidth = orientation === 'port'
  ? Math.max(
      1,
      Math.round(textureWidth * ((panelHeight * LevelPanelLayoutMetrics.ARTWORK_HEIGHT_RATIO) / textureHeight)),
    )
  : Math.max(1, Math.round(panelWidth * LevelPanelLayoutMetrics.ARTWORK_WIDTH_RATIO));
```

В горизонтальной ориентации размер зависит от ширины панели.

Поэтому «просто масштабировать по ширине экрана» недостаточно. Изображение находится внутри UI-контейнера, а форма этого контейнера меняется.
