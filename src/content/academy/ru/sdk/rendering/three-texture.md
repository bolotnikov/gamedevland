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
      "title": "SDK · PixiThreeTextureRendererModule.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/renderers/hybrid/PixiThreeTextureRendererModule.ts",
      "note": "Pixi как основной renderer и загрузчик GLB."
    },
    {
      "title": "SDK · ThreeTextureSurface.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/renderers/hybrid/ThreeTextureSurface.ts",
      "note": "Создание текстуры, render, resize, ограничения resolution и очистка."
    }
  ]
}
---

Для вращающегося предмета в меню или 3D-поля внутри Pixi-игры выберем `PixiThreeTextureRendererModule` из `@gamedevland/engine/renderers/hybrid`. Нужны `pixi.js`, `three` и `@types/three`.

В `GameConfig` зададим `system.renderer: new PixiThreeTextureRendererModule()`. Компонент Pixi-спрайта создаёт `ThreeTextureSurface`: отдельный Three canvas, который не добавляется на страницу. Его изображение становится текстурой спрайта.

Внутри компонента подготовим собственные `scene` и `camera` из Three.js. Затем свяжем их со спрайтом; размер и плотность берём из проверенного JSON-конфига компонента:

```ts
const surface = new ThreeTextureSurface({
  width: this.config.width,
  height: this.config.height,
  resolution: this.config.resolution,
});
this.ownDisposer(() => surface.dispose());
this.node.setTexture(surface.texture);
surface.render(scene, camera);
```

`ThreeTextureSurface` импортируем из `/renderers/hybrid`. Компонент наследует `BaseTypedComponent<Config, Sprite>` и задаёт `nodeType = Sprite`; `Sprite` импортируем из `/renderers/pixi`.

<figure class="sdk-figure is-flow"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>Three-сцена</strong><span>render(scene, camera)</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>Текстура</strong><span>Копия изображения</span></div></div><div class="sdk-figure__item tone-green"><div><strong>Pixi-спрайт</strong><span>Положение, масштаб, прозрачность и ввод</span></div></div></div></figure>

После изменения 3D-сцены снова вызовем `render`; для неподвижного изображения повторная загрузка пикселей не нужна. При изменении размеров вызовем `surface.resize(width, height, resolution)` и обновим камеру. Допустимая `resolution` — от 0,25 до 2.

Ввод остаётся на Pixi-спрайте: объекты внутри изображения автоматически не получают Three-raycast. Компонент отдельно освобождает свои геометрию, материалы и экземпляры GLB; `surface.dispose()` освобождает только renderer и Pixi-текстуру. Не уничтожаем общие ресурсы GLB вручную. Передача изображения между WebGL-контекстами требует копирования пикселей.
