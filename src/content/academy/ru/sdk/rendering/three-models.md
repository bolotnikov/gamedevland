---
{
  "locale": "ru",
  "translationKey": "sdk/rendering/three-models",
  "course": "sdk",
  "lesson": "rendering",
  "draft": false,
  "order": 6,
  "title": "Загружаем GLB",
  "concept": "ModelAsset",
  "description": "Добавим в Three-сцену готовый 3D-объект.",
  "sources": [
    {
      "title": "SDK · AssetManifestTypes.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/assets/AssetManifestTypes.ts",
      "note": "Поле models у манифеста."
    },
    {
      "title": "SDK · GlbLoader.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/renderers/three/GlbLoader.ts",
      "note": "Поддерживаемый формат и ограничения GLB."
    },
    {
      "title": "SDK · ModelAsset.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/renderers/three/ModelAsset.ts",
      "note": "Общие GPU-ресурсы и acquire/release."
    }
  ]
}
---

Поместим файл `tree.glb` в `game/assets/models/`. GLB хранит 3D-объект и его ресурсы в одном файле. Загрузчик SDK принимает статический GLB 2.0 без анимации, скелета, внешних файлов и обязательных расширений.

В `AssetManifestBuilder` передадим поле `models` с URL файлов, собранными через `import.meta.glob<string>('@game/assets/models/**/*.glb', { eager: true, query: '?url', import: 'default' })`. Стандартная политика создаст набор `models`.

В `SceneConfig.assets.bundles` добавим `'models'`, а в `children` узла `Group` — дерево:

```json
"tree": {
  "type": "Model",
  "props": {
    "asset": "models/tree.glb",
    "position": { "x": 2, "y": 0, "z": 0 }
  }
}
```

<figure class="sdk-figure is-compare"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>GLB</strong><span>Общие геометрия, материалы и текстуры</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>Model</strong><span>Отдельная иерархия каждого дерева</span></div></div><div class="sdk-figure__item tone-green"><div><strong>Удаление</strong><span>Узел освобождает свой экземпляр</span></div></div></div></figure>

Узлы `Model` используют общие ресурсы файла, поэтому их нельзя уничтожать вручную у одного дерева. Узел освобождает свой экземпляр при удалении. Затем `assets.unload('models/tree.glb')` может удалить файл из кэша.

Для собственной Three-сцены внутри Pixi-текстуры можно получить `ModelAsset`, вызвать `acquire()` и добавить `view` в сцену. Компонент удаляет этот объект из сцены и вызывает `release()` при очистке. Живые экземпляры блокируют удаление общего ресурса.
