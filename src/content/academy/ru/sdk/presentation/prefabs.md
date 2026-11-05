---
{
  "locale": "ru",
  "translationKey": "sdk/presentation/prefabs",
  "course": "sdk",
  "lesson": "presentation",
  "draft": false,
  "order": 8,
  "title": "Префаб для повторяющихся элементов",
  "concept": "PrefabManager",
  "description": "Создадим клетку из JSON-заготовки.",
  "takeaway": [
    "Из одного файла можно создать несколько узлов с разными именами и координатами."
  ],
  "sources": [
    {
      "title": "SDK · Container.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/nodes/Container.ts",
      "note": "spawnPrefab и ensureChildFromPrefab."
    },
    {
      "title": "SDK · types.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/prefabs/types.ts",
      "note": "Результат создания и dispose."
    },
    {
      "title": "Block Puzzle · block-cell.json",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/assets/json/prefabs/game/block-cell.json",
      "note": "JSON-заготовка плитки."
    }
  ]
}
---

<aside class="lesson-note" aria-labelledby="prefab-term"><span class="lesson-note__label">Термин</span><h3 id="prefab-term">Префаб</h3><p>Заготовка элемента экрана в JSON. Например, из одного файла можно создать все клетки поля.</p></aside>

Добавим JSON префаба в манифест ресурсов. Вызовем `spawnPrefab` у контейнера и передадим имя новой клетки и её координаты. Удалить клетку раньше контейнера можно через `await spawned.dispose()`.

```ts
const spawned = await this.node.spawnPrefab({
  prefabId: 'json/prefabs/game/block-cell.json',
  localId: 'tile-0',
  overrides: { visible: true, x: 24, y: 24 },
});
const tile = spawned.node;
```

<figure class="sdk-figure"><div class="sdk-prefab-map"><div class="sdk-prefab-map__source"><div class="sdk-prefab-map__cell"></div><strong>Одна клетка</strong><code>board-cell.json</code></div><span class="sdk-prefab-map__arrow" aria-label="создаёт экземпляры">→</span><div><div class="sdk-prefab-map__grid"><i class="is-filled"></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class="is-filled"></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class="is-filled"></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class="is-filled"></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class="is-filled"></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class="is-filled"></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class="is-filled"></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class="is-filled"></i></div><span class="sdk-prefab-map__count">64 независимых узла · поле 8 × 8</span></div></div></figure>
