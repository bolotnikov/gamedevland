---
locale: ru
translationKey: adaptive-layout-poki-en/scene-composition
title: Композиция сцены и сетка каталога
description: Как компоненты конкретной сцены адаптируют композицию альбома и число столбцов каталога под ориентацию.
seriesTitle: Адаптивная вёрстка HTML5-игры для Poki
seriesDescription: Практический разбор адаптации интерфейса, экрана и игрового процесса к разрешениям компьютеров, телефонов, планшетов и iframe на Poki.
seriesSlug: adaptive-layout-poki-en
seriesTypeLabel: Серия практических разборов
stepLabel: Раздел
step: 5
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

<a id="7-complex-scene-composition-stays-in-game-components" class="translation-anchor" aria-hidden="true"></a>

## 7. Сложная композиция сцены остаётся в игровых компонентах

Некоторым сценам нужно больше, чем центрирование и масштабирование. В сцене предмета есть альбом, заголовок, индикатор прогресса и кнопки.

`ItemSceneLayoutComponent` описывает композицию:

```ts
private applyLayout(): void {
  const orientation = this.node.screen.getOrientation();
  const screen = this.node.screen.getVirtualSize();
  this.applyButtonScale(orientation);
  this.positionAlbumStage(screen.width, screen.height, orientation);
  this.sizeTitleCover(screen.width);
  this.sizeAlbumProgress();
  this.positionAlbumProgress();
  this.positionTitle();
  this.positionPlayButton(screen.height);
  this.positionAlbumsButton(screen.height);
}
```

Размер альбома определяется разными осями:

```ts
const targetScale = orientation === 'port'
  ? (screenWidth * this.config.portImageWidthScreenPercent) / frameWidth
  : (screenHeight * this.config.landImageHeightScreenPercent) / frameHeight;

albumStage.setScale(targetScale, targetScale);
albumStage.setPosition(Math.round(screenWidth / 2), Math.round(screenHeight / 2));
```

В вертикальной ориентации важнее ширина, в горизонтальной — высота.

JSON-вёрстка предоставляет это как конфигурацию:

```json
{
  "landImageHeightScreenPercent": 0.6,
  "portImageWidthScreenPercent": 0.6,
  "landPlayButtonScale": 1,
  "portPlayButtonScale": 1
}
```

Это адаптивная компоновка, а не просто изменение масштаба.

<a id="8-catalog-grid-different-columns-per-orientation" class="translation-anchor" aria-hidden="true"></a>

## 8. Сетка каталога: разное число столбцов для разных ориентаций

Сцена предметов меняет сетку каталога альбомов:

- горизонтальная ориентация: 5 столбцов;
- вертикальная ориентация: 2 столбца.

Конфигурация:

```json
{
  "itemsAlbumsGrid": {
    "type": "ItemsAlbumsGridComponent",
    "enabled": true,
    "data": {
      "landColumns": 5,
      "portColumns": 2,
      "horizontalPaddingPx": 48,
      "bottomPaddingPx": 48,
      "columnGapPx": 28,
      "rowGapPx": 28,
      "maxScale": 1
    }
  }
}
```

Код:

```ts
private resolveColumns(): number {
  return this.node.screen.getOrientation() === 'land'
    ? this.config.landColumns
    : this.config.portColumns;
}
```

Затем сетка измеряет карточки, вычисляет общий размер и вписывает результат в доступную область:

```ts
const fitScale = ScreenFitLayoutResolver.resolveScale({
  contentWidth: gridWidth <= 0 ? 1 : gridWidth,
  contentHeight: gridHeight <= 0 ? 1 : gridHeight,
  availableWidth,
  availableHeight,
  minScale: 0,
  maxScale: this.config.maxScale,
});
```

Это практический шаблон:

1. Выбрать структуру UX для текущей ориентации.
2. Измерить фактическое содержимое.
3. Вписать результат в экран.
