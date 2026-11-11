---
{
  "locale": "ru",
  "translationKey": "sdk/rendering/three-pixi",
  "course": "sdk",
  "lesson": "rendering",
  "draft": false,
  "order": 4,
  "title": "Three + Pixi: мир и интерфейс",
  "concept": "HybridRendererModule",
  "description": "Расположим Pixi-интерфейс поверх 3D-мира.",
  "sources": [
    {
      "title": "SDK · HybridRendererModule.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/renderers/hybrid/HybridRendererModule.ts",
      "note": "Подключение обоих рендеров."
    },
    {
      "title": "SDK · HybridRuntime.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/renderers/hybrid/HybridRuntime.ts",
      "note": "Два canvas с общим циклом и отдельными деревьями."
    },
    {
      "title": "SDK · HybridHitTester.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/renderers/hybrid/HybridHitTester.ts",
      "note": "Приоритет попаданий в интерфейс."
    }
  ]
}
---

Если игровой мир трёхмерный, а кнопки и счётчики удобнее сделать в PixiJS, выберем `HybridRendererModule` из `@gamedevland/engine/renderers/hybrid`. Установим `three`, `pixi.js` и `@types/three`.

В `GameConfig` зададим `system.renderer: new HybridRendererModule()`. В одном layout опишем два отдельных корня:

```json
{
  "world": {
    "type": "Group",
    "children": {
      "camera": {
        "type": "PerspectiveCamera",
        "props": {
          "position": { "x": 0, "y": 2, "z": 5 },
          "lookAt": { "x": 0, "y": 0, "z": 0 },
          "near": 0.1, "far": 100, "fov": 50
        }
      }
    }
  },
  "ui": {
    "type": "Container",
    "children": { "score": { "type": "Text", "props": { "text": "0" } } }
  }
}
```

В `SceneConfig.render` укажем `{ camera: 'world.camera' }`. Игровые объекты добавим в `world`, интерфейс — в `ui`.

<figure class="sdk-figure is-compare"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>Верхний canvas · Pixi</strong><span>Прозрачный интерфейс, проверяется первым</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>Нижний canvas · Three</strong><span>3D-мир, получает ввод без попадания в UI</span></div></div></div><figcaption>Один цикл обновления обслуживает оба canvas.</figcaption></figure>

SDK объединяет их в одном логическом layout, но сохраняет раздельные деревья отрисовки. `Group` принимает Three-детей, `Container` — Pixi-детей. Нельзя поместить Pixi-текст внутрь Three-группы. Камера двигает мир, а координаты интерфейса остаются двумерными.
