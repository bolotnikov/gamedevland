---
{
  "locale": "ru",
  "translationKey": "sdk/rendering/three-only",
  "course": "sdk",
  "lesson": "rendering",
  "draft": false,
  "order": 3,
  "title": "Three-only: 3D-сцена",
  "concept": "ThreeRendererModule",
  "description": "Создадим куб и камеру в JSON.",
  "sources": [
    {
      "title": "SDK · ThreeSchemas.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/renderers/three/ThreeSchemas.ts",
      "note": "Типы узлов, строгие свойства и параметры камеры."
    },
    {
      "title": "SDK · ThreeElements.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/renderers/three/ThreeElements.ts",
      "note": "Создание геометрии, материалов и камер."
    },
    {
      "title": "SDK · ThreeHitTester.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/renderers/three/ThreeHitTester.ts",
      "note": "Поиск ближайшего видимого интерактивного узла."
    }
  ]
}
---

Для 3D-игры без Pixi-интерфейса выберем `ThreeRendererModule` из `@gamedevland/engine/renderers/three`. Установим библиотеку командой `npm install three`, а типы — `npm install --save-dev @types/three`. PixiJS этому режиму не нужен.

В `GameConfig` зададим `system.renderer: new ThreeRendererModule()`. В layout сцены создадим куб и камеру:

```json
{
  "world": {
    "type": "Group",
    "children": {
      "cube": {
        "type": "Mesh",
        "props": {
          "geometry": { "type": "box" },
          "material": { "type": "basic", "color": "#40aacc" }
        }
      },
      "camera": {
        "type": "PerspectiveCamera",
        "props": {
          "position": { "x": 0, "y": 2, "z": 5 },
          "lookAt": { "x": 0, "y": 0, "z": 0 },
          "near": 0.1, "far": 100, "fov": 50
        }
      }
    }
  }
}
```

В `SceneConfig.render` укажем `{ camera: 'world.camera' }`. `basic` показывает цвет без освещения; для материала `standard` добавим свет.

<figure class="sdk-figure is-compare"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>Group</strong><span>Объединяет Three-узлы</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>Камера</strong><span>world.camera → один canvas</span></div></div></div></figure>

Положение и масштаб задаются векторами `{ x, y, z }`, повороты — в радианах. Ось Y направлена вверх, плоскость земли — XZ; единица расстояния — метр. Только `Group` принимает дочерние узлы в JSON.

Компонент объявляет `nodeType = ThreeNode` или `ThreeGroup` и меняет объект через `this.node.view`. `node.input` находит ближайший видимый интерактивный узел лучом от камеры. Попадание в часть GLB относится к узлу `Model`, которому она принадлежит.
