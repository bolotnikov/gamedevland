---
locale: ru
translationKey: adaptive-layout-poki-en/responsive-physics
title: Физика игрового процесса тоже адаптивна
description: Почему границы физического мира, состояние перетаскивания, позиции создания объектов и пространство столкновений должны реагировать на изменения экрана.
seriesTitle: Адаптивная вёрстка HTML5-игры для Poki
seriesDescription: Практический разбор адаптации интерфейса, экрана и игрового процесса к разрешениям компьютеров, телефонов, планшетов и iframe на Poki.
seriesSlug: adaptive-layout-poki-en
seriesTypeLabel: Серия практических разборов
stepLabel: Раздел
step: 7
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

<a id="11-gameplay-physics-is-responsive-too" class="translation-anchor" aria-hidden="true"></a>

## 11. Физика игрового процесса тоже адаптивна

Типичная ошибка в HTML5-играх: интерфейс адаптируется, но игровая логика продолжает использовать старые границы.

В `Stickers Merge` границы физического мира пересчитываются при изменении экрана.

`LevelPhysicsBoundsResolver` использует текущий виртуальный размер и вёрстку:

```ts
const virtualSize = this.screen.getVirtualSize();
const leftInset = this.screen.getOrientation() === 'land'
  ? this.resolveLandLeftInset(layout, virtualSize)
  : 0;

const localTopLeft = playfield.view.toLocal({ x: leftInset, y: 0 }, root.view);
const localTopRight = playfield.view.toLocal({ x: virtualSize.width, y: 0 }, root.view);
const localBottomLeft = playfield.view.toLocal({ x: leftInset, y: virtualSize.height }, root.view);
```

В горизонтальной ориентации границы начинаются после левой панели. В вертикальной — с нуля, поскольку панель находится внизу.

При `SCREEN_CHANGED` FSM запускает:

```ts
[SharedUiEvents.ScreenChanged]: {
  actions: ['RebuildLevelStickersOnResizeCommand'],
},
```

Команда вызывает:

```ts
await this.getSceneService<LevelStickerResizeRebuildService>(
  GameServices.LevelStickerResizeRebuildService,
).rebuildFromCurrentScene({
  layout: this.layout,
  stickersLayer: this.getStickersLayer(),
});
```

Сервис:

- завершает активное перетаскивание;
- сохраняет текущее состояние наклеек;
- пересчитывает границы физического мира;
- удаляет старые физические тела;
- заново создаёт наклейки в новой вёрстке;
- прогревает физическую симуляцию;
- помечает наклейки как установившиеся.

```ts
const stickersSnapshot = this.captureSnapshot();
this.physics.setBounds(this.boundsResolver.resolveFromLayout(params.layout));
await this.mergeService.consumeManyByIds(stickersSnapshot.map((entry) => entry.id));

const respawnedRecords = await this.spawnFlowService.spawnBatch({
  layer: params.stickersLayer,
  physics: this.physics,
  registrar: this.registrar,
  entries: stickersSnapshot,
  mode: 'packed_visible',
});
```

Адаптивный игровой процесс не ограничивается визуальным изменением размера. Физика, позиции создания объектов, границы столкновений и состояние перетаскивания тоже должны реагировать.
