---
locale: ru
translationKey: adaptive-layout-poki-en/layout-primitives
title: Декларативные примитивы вёрстки
description: Как простое адаптивное позиционирование, заполнение фона, масштабирование заставки и вписывание окон остаются декларативными в JSON-вёрстке.
seriesTitle: Адаптивная вёрстка HTML5-игры для Poki
seriesDescription: Практический разбор адаптации интерфейса, экрана и игрового процесса к разрешениям компьютеров, телефонов, планшетов и iframe на Poki.
seriesSlug: adaptive-layout-poki-en
seriesTypeLabel: Серия практических разборов
stepLabel: Раздел
step: 4
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

<a id="3-simple-responsive-tasks-are-declarative" class="translation-anchor" aria-hidden="true"></a>

## 3. Простые задачи адаптации описываются декларативно

Если элемент нужно лишь центрировать, расположить у правого края или растянуть как фон, я не пишу отдельный TypeScript-компонент.

В движке уже есть компоненты вёрстки:

- `ResponsiveNodePositionComponent`
- `ResponsiveNodeSizeComponent`
- `FitStackLayoutComponent`

Например, кнопка настроек всегда находится у правого края:

```json
{
  "components": {
    "responsivePosition": {
      "type": "ResponsiveNodePositionComponent",
      "enabled": true,
      "data": {
        "mode": "screen",
        "position": {
          "right": 10
        }
      }
    }
  }
}
```

Это описание взято из `game/assets/json/layouts/features/settings/_button.json`.

Индикатор загрузки центрируется:

```json
{
  "type": "ResponsiveNodePositionComponent",
  "enabled": true,
  "data": {
    "mode": "screen",
    "position": {
      "cx": 0,
      "cy": 0
    }
  }
}
```

Таким случаям место в JSON-вёрстке. Это проще и позволяет сосредоточить код исполнения на его задачах.

<a id="4-background-fill-is-part-of-the-game-layout" class="translation-anchor" aria-hidden="true"></a>

## 4. Заполнение фона — часть игровой вёрстки

В нескольких сценах фон состоит из `gradient` и `pattern`. Он должен заполнять весь виртуальный экран.

Пример из `game/assets/json/layouts/scenes/item/layout.json`:

```json
{
  "responsiveNodeSize": {
    "type": "ResponsiveNodeSizeComponent",
    "enabled": true,
    "data": {
      "mode": "fill_width_height_ratio",
      "minScale": 1,
      "maxScale": 1,
      "fill": {
        "resizeTargets": ["gradient", "pattern"],
        "widthPercent": 1,
        "heightRatio": 1,
        "minHeightPx": 1,
        "maxHeightPx": 5000,
        "horizontalAlign": "left",
        "verticalAlign": "top"
      }
    }
  }
}
```

Это не DOM-фон. Он является частью вёрстки сцены и использует ту же систему координат, что и остальные игровые элементы.

<a id="5-uniform-scale-for-the-intro-scene" class="translation-anchor" aria-hidden="true"></a>

## 5. Равномерное масштабирование сцены заставки

В загрузочной сцене есть вступительная анимация с наклейками и логотипом. Ей не нужна отдельная композиция для каждой ориентации. Достаточно центрирования и равномерного масштабирования.

Пример из `game/assets/json/layouts/scenes/boot/layout.json`:

```json
{
  "responsivePosition": {
    "type": "ResponsiveNodePositionComponent",
    "enabled": true,
    "data": {
      "mode": "screen",
      "position": {
        "cx": 0,
        "cy": 0
      }
    }
  },
  "responsiveSize": {
    "type": "ResponsiveNodeSizeComponent",
    "enabled": true,
    "data": {
      "mode": "uniform_scale",
      "minScale": 0.68,
      "maxScale": 1,
      "uniform": {
        "axis": "min",
        "referenceScreenWidthPx": 720,
        "referenceScreenHeightPx": 1280
      }
    }
  }
}
```

`axis: "min"` означает, что масштаб определяется наиболее ограничивающей осью.

Этот подход подходит для:

- логотипов;
- групп вступительной анимации;
- декоративных групп;
- небольших блоков интерфейса, которым не требуется менять композицию.

<a id="6-fit-by-real-bounds-for-popup-ui" class="translation-anchor" aria-hidden="true"></a>

## 6. Вписывание всплывающих окон по реальным границам

Для интерфейса всплывающих окон я использую `fit_bounds`.

Реальный размер окна зависит от содержимого: фона, надписей, кнопок и отступов. Если масштабировать его только относительно эталонной ширины, на узких экранах окно может обрезаться.

Окно настроек:

```json
{
  "responsiveSize": {
    "type": "ResponsiveNodeSizeComponent",
    "enabled": true,
    "data": {
      "mode": "fit_bounds",
      "minScale": 0.25,
      "maxScale": 3,
      "fit": {
        "primaryAxisByOrientation": {
          "port": "width",
          "land": "height"
        },
        "widthPercent": 0.9,
        "heightPercent": 0.9,
        "topPaddingPx": 12,
        "bottomPaddingPx": 12,
        "leftPaddingPx": 12,
        "rightPaddingPx": 12,
        "alignX": "center",
        "alignY": "center",
        "offsetYPx": 10
      }
    }
  }
}
```

В вертикальной ориентации окно вписывается по ширине, в горизонтальной — по высоте. Это точнее одного универсального правила масштабирования.

Внутри движка `fit_bounds` измеряет фактическое поддерево:

```ts
const bounds = targetNode.view.getLocalBounds();
const availableWidth = widthBeforePadding - fit.leftPaddingPx - fit.rightPaddingPx;
const availableHeight = heightBeforePadding - fit.topPaddingPx - fit.bottomPaddingPx;
const widthFitScale = availableWidth / bounds.width;
const heightFitScale = availableHeight / bounds.height;
const scale = this.clampScale(fitScale, config.minScale, config.maxScale);
```

Этот код находится в `engine/layouts/components/ResponsiveNodeSizeComponent.ts`.

Важная деталь: компонент использует реальные отрисованные границы, а не предполагаемый размер.
