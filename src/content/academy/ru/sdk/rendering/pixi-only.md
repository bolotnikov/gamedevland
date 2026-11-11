---
{
  "locale": "ru",
  "translationKey": "sdk/rendering/pixi-only",
  "course": "sdk",
  "lesson": "rendering",
  "draft": false,
  "order": 2,
  "title": "Pixi-only: 2D-игра",
  "concept": "PixiRendererModule",
  "description": "Подключим PixiJS для игры и интерфейса.",
  "sources": [
    {
      "title": "SDK · PixiRendererModule.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/renderers/pixi/PixiRendererModule.ts",
      "note": "Подключение Pixi runtime и стандартных фабрик."
    },
    {
      "title": "SDK · index.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/renderers/pixi/index.ts",
      "note": "Импорты конкретных Pixi-узлов."
    },
    {
      "title": "SDK · NineSliceSprite.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/layouts/nodes/NineSliceSprite.ts",
      "note": "Растяжение панели и ограничения границ."
    }
  ]
}
---

Для 2D-игры выберем `PixiRendererModule`. Он рисует Pixi-узлы в одном canvas. Этот режим использует пустой проект из `gamedevland create`.

```ts
import { PixiRendererModule } from '@gamedevland/engine/renderers/pixi';

// Inside GameConfig:
system: { renderer: new PixiRendererModule() },
```

Установим `pixi.js`. В JSON используем `Container`, `Sprite`, `Text`, `Graphics` и другие Pixi-типы. Их классы импортируем из `@gamedevland/engine/renderers/pixi`; общие `BaseComponent` и `BaseAction` — из `/layouts`.

<figure class="sdk-figure is-flow"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>JSON</strong><span>Container → Sprite, Text</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>PixiJS</strong><span>Один canvas</span></div></div><div class="sdk-figure__item tone-green"><div><strong>Ввод</strong><span>Нажатия на Pixi-узлы</span></div></div></div></figure>

Для панели, которая должна растягиваться без искажения углов, есть `NineSliceSprite`: в `props` укажем `asset`, `leftWidth`, `rightWidth`, `topHeight`, `bottomHeight`, затем размер панели. Границы должны оставлять внутреннюю область текстуры.

Этот режим подходит, когда игра и интерфейс состоят из 2D-элементов. Для 3D-объекта внутри Pixi-экрана используем отдельный режим с Three-текстурой.
