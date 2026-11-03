---
locale: ru
translationKey: adaptive-layout-poki-en/screen-changes
title: Единый источник состояния для изменения размера
description: Как ScreenManager, ResizeScheduler и SCREEN_CHANGED централизуют обработку изменения размера и делают её детерминированной.
seriesTitle: Адаптивная вёрстка HTML5-игры для Poki
seriesDescription: Практический разбор адаптации интерфейса, экрана и игрового процесса к разрешениям компьютеров, телефонов, планшетов и iframe на Poki.
seriesSlug: adaptive-layout-poki-en
seriesTypeLabel: Серия практических разборов
stepLabel: Раздел
step: 3
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

<a id="2-one-source-of-truth-for-resize" class="translation-anchor" aria-hidden="true"></a>

## 2. Единый источник состояния для изменения размера

За состояние экрана отвечает `engine/screen/ScreenManager.ts`. Он:

- читает `visualViewport`, когда тот доступен;
- слушает `resize` и `orientationchange`;
- пересчитывает снимок состояния экрана;
- обновляет рендерер PIXI;
- уведомляет подписчиков.

События изменения размера не запускают все пересчёты вёрстки немедленно. Сначала они проходят через `ResizeScheduler`:

```ts
request(): void {
  if (this.scheduled) return;
  this.scheduled = true;
  requestAnimationFrame(() => {
    this.scheduled = false;
    this.handler();
  });
}
```

Это предотвращает лишние пересчёты при изменении размера окна браузера или ориентации устройства.

После изменения снимка экрана движок отправляет `SCREEN_CHANGED`. Игровой код реагирует на это нормализованное событие, а не на нативное изменение размера в браузере.

Пример:

```ts
this.unsubscribeScreen = this.node.events.on(SharedUiEvents.ScreenChanged, () => {
  this.applyLayout();
});
```

Этот шаблон используется в `LevelPanelComponent`, `ItemSceneLayoutComponent`, `LevelBackgroundComponent` и `LevelCompletionOverlayComponent`.
