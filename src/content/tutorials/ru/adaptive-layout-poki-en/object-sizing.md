---
locale: ru
translationKey: adaptive-layout-poki-en/object-sizing
title: Размер игровых объектов зависит от ориентации
description: Как размер наклеек следует оси, определяющей полезное игровое пространство в каждой ориентации.
seriesTitle: Адаптивная вёрстка HTML5-игры для Poki
seriesDescription: Практический разбор адаптации интерфейса, экрана и игрового процесса к разрешениям компьютеров, телефонов, планшетов и iframe на Poki.
seriesSlug: adaptive-layout-poki-en
seriesTypeLabel: Серия практических разборов
stepLabel: Раздел
step: 8
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

<a id="12-game-object-size-depends-on-orientation" class="translation-anchor" aria-hidden="true"></a>

## 12. Размер игровых объектов зависит от ориентации

Размер наклеек масштабируется по-разному в разных ориентациях.

В `LevelStickerSizeResolver`:

```ts
private resolveScale(): number {
  if (this.screen.getOrientation() === 'land') {
    return this.resolveLandscapeScale();
  }

  return this.resolvePortraitScale();
}
```

В вертикальной ориентации масштаб растёт от виртуальной ширины:

```ts
const virtualWidth = this.screen.getVirtualSize().width;
const extraRatio = Math.max(
  0,
  (virtualWidth - LevelStickerSizeResolver.BASELINE_VIRTUAL_WIDTH) /
    LevelStickerSizeResolver.BASELINE_VIRTUAL_WIDTH,
);
```

В горизонтальной ориентации масштаб растёт от виртуальной высоты:

```ts
const virtualHeight = this.screen.getVirtualSize().height;
```

Размер объекта следует оси, которая действительно определяет полезное игровое пространство.
