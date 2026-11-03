---
locale: ru
translationKey: adaptive-layout-poki-en/resize-during-animation
title: Изменение размера во время анимации нужно обрабатывать явно
description: Как активные анимации появления завершаются, отменяются или перезапускаются при изменении экрана.
seriesTitle: Адаптивная вёрстка HTML5-игры для Poki
seriesDescription: Практический разбор адаптации интерфейса, экрана и игрового процесса к разрешениям компьютеров, телефонов, планшетов и iframe на Poki.
seriesSlug: adaptive-layout-poki-en
seriesTypeLabel: Серия практических разборов
stepLabel: Раздел
step: 9
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

<a id="13-resize-during-animation-must-be-handled-explicitly" class="translation-anchor" aria-hidden="true"></a>

## 13. Изменение размера во время анимации нужно обрабатывать явно

Размер экрана может измениться во время анимации.

Например, слой завершения показывает заголовок и подпись прогресса рядом с изображением. Если экран меняется во время появления, целевые координаты устаревают.

В `LevelCompletionOverlayComponent`:

```ts
this.unsubscribeScreenChanged = this.node.events.on(SharedUiEvents.ScreenChanged, () => {
  this.completeActiveRevealStateOnResize();
  this.syncDimmerLayout();
  void this.trackTask(this.syncTextLayoutAfterResize());
});
```

Если анимация появления активна, я завершаю её в корректное состояние:

```ts
if (this.titleRevealActive) {
  void this.getRequiredTitle().runAction('completionTitleReveal', {
    mode: 'complete',
    targetX: this.resolveArtworkCenterX(),
    targetY: this.resolveTitleY(),
  });
  this.titleRevealActive = false;
}
```

Затем размещение текста пересчитывается по новым границам.

`LevelCompletionButtonComponent` использует похожий принцип: если размер меняется во время появления, твин останавливается, кнопка получает итоговый масштаб, а фоновая анимация перезапускается.
