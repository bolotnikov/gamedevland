---
locale: ru
translationKey: adaptive-layout-poki-en/responsive-text
title: Адаптивный текст — это читаемость
description: Как границы текста и риски локализации влияют на адаптивный интерфейс слоя завершения.
seriesTitle: Адаптивная вёрстка HTML5-игры для Poki
seriesDescription: Практический разбор адаптации интерфейса, экрана и игрового процесса к разрешениям компьютеров, телефонов, планшетов и iframe на Poki.
seriesSlug: adaptive-layout-poki-en
seriesTypeLabel: Серия практических разборов
stepLabel: Раздел
step: 10
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

<a id="14-responsive-text-is-about-readability" class="translation-anchor" aria-hidden="true"></a>

## 14. Адаптивный текст — это читаемость

Текст слоя завершения может стать слишком широким в вертикальной ориентации. Перед позиционированием я сбрасываю масштаб и проверяю границы текста:

```ts
private applyResponsiveTextScale(text: Text): void {
  if (this.node.screen.getOrientation() !== 'port') {
    return;
  }

  text.setScale(1, 1);
  const screenWidth = this.node.screen.getVirtualSize().width;
  const maxWidth = screenWidth * LevelCompletionOverlayComponent.PORT_TEXT_MAX_SCREEN_WIDTH_RATIO;
  const bounds = text.view.getLocalBounds();
  const width = Math.max(0, bounds.width);
  if (width <= 0 || width <= maxWidth) {
    return;
  }

  const scale = Math.max(0.01, maxWidth / width);
  text.setScale(scale, scale);
}
```

Это важно и для локализации. Строка, помещающаяся на одном языке, на другом может оказаться значительно длиннее.
