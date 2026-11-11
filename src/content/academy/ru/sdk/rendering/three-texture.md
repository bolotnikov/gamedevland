---
{
  "locale": "ru",
  "translationKey": "sdk/rendering/three-texture",
  "course": "sdk",
  "lesson": "rendering",
  "draft": false,
  "order": 5,
  "title": "Pixi + Three-as-texture: 3D в спрайте",
  "concept": "PixiThreeTextureRendererModule",
  "description": "Нарисуем 3D-объект внутри Pixi-экрана.",
  "sources": [
    {
      "title": "SDK · ThreeViewport.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-11/packages/engine/src/renderers/hybrid/ThreeViewport.ts",
      "note": "Декларативный viewport и доступ к Three-layout."
    },
    {
      "title": "SDK · ThreeViewportComponent.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-11/packages/engine/src/renderers/hybrid/ThreeViewportComponent.ts",
      "note": "Подготовка сцены, перерисовка, resize и очистка."
    }
  ]
}
---

Для 3D-предмета в меню или поля внутри Pixi-игры выберем `PixiThreeTextureRendererModule` из `@gamedevland/engine/renderers/hybrid`: `system.renderer: new PixiThreeTextureRendererModule()`. Нужны `pixi.js`, `three` и `@types/three`.

В JSON layout добавим `ThreeViewport`. SDK создаст отдельный Three canvas и назначит его изображение текстурой Pixi-спрайта:

```json
{
  "itemPreview": {
    "type": "ThreeViewport",
    "props": {
      "width": 400,
      "height": 400,
      "resolution": 1.5,
      "sceneLayout": "json/layouts/previews/item.json",
      "camera": "world.camera"
    }
  }
}
```

`sceneLayout` — id JSON-ассета с Three-нодами: группами, моделями, камерой и светом. `camera` указывает на камеру внутри этого файла. Посмотрим [пример Three-layout](https://github.com/gamedevland/sdk/blob/sdk-2026-11-11/examples/three-viewport/preview.json). У каждого viewport свой граф и свои id; `children` у самого `ThreeViewport` не задаём.

<figure class="sdk-figure is-flow"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>Three-layout</strong><span>Модели, камера и свет</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>Текстура</strong><span>Копия изображения Three-сцены</span></div></div><div class="sdk-figure__item tone-green"><div><strong>ThreeViewport</strong><span>Положение, масштаб, прозрачность и ввод Pixi</span></div></div></div></figure>

В `onReady` компонента получим ноды через `viewport.world.requireNode(id, ThreeNode)`. По умолчанию изображение обновляется по запросу: после изменения 3D-объектов вызовем `viewport.invalidate()`. Для постоянной анимации зададим `renderMode: "always"` в props.

`viewport.resize(width, height, resolution)` меняет размер текстуры и проекцию камеры. Допустимая `resolution` — от 0,25 до 2. При уничтожении ноды SDK освобождает вложенный layout, экземпляры GLB, renderer и текстуру. Ресурсы, созданные игровым компонентом, освобождает сам компонент.

Ввод остаётся на Pixi-спрайте: Three-raycast внутри изображения автоматически не выполняется. Передача изображения требует копирования пикселей. Для собственного рендера через код остаётся `ThreeTextureSurface`.
