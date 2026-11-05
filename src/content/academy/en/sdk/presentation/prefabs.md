---
{
  "locale": "en",
  "translationKey": "sdk/presentation/prefabs",
  "course": "sdk",
  "lesson": "presentation",
  "draft": false,
  "order": 8,
  "title": "A prefab for repeated elements",
  "concept": "PrefabManager",
  "description": "Create a cell from a JSON template.",
  "takeaway": [
    "A single file can create multiple nodes with different names and coordinates."
  ],
  "sources": [
    {
      "title": "SDK · Container.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/nodes/Container.ts",
      "note": "spawnPrefab and ensureChildFromPrefab."
    },
    {
      "title": "SDK · types.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/prefabs/types.ts",
      "note": "The creation result and dispose."
    },
    {
      "title": "Block Puzzle · block-cell.json",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/assets/json/prefabs/game/block-cell.json",
      "note": "The JSON template for a tile."
    }
  ]
}
---

<aside class="lesson-note" aria-labelledby="prefab-term"><span class="lesson-note__label">Term</span><h3 id="prefab-term">Prefab</h3><p>A JSON template for a screen element. For example, a single file can create every cell on the board.</p></aside>


Add the prefab JSON to the asset manifest. Call `spawnPrefab` on the container and pass the new cell’s name and coordinates. To remove the cell before the container is removed, call `await spawned.dispose()`.

```ts
const spawned = await this.node.spawnPrefab({
  prefabId: 'json/prefabs/game/block-cell.json',
  localId: 'tile-0',
  overrides: { visible: true, x: 24, y: 24 },
});
const tile = spawned.node;
```

<figure class="sdk-figure"><div class="sdk-prefab-map"><div class="sdk-prefab-map__source"><div class="sdk-prefab-map__cell"></div><strong>One cell</strong><code>board-cell.json</code></div><span class="sdk-prefab-map__arrow" aria-label="creates instances">→</span><div><div class="sdk-prefab-map__grid"><i class="is-filled"></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class="is-filled"></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class="is-filled"></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class="is-filled"></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class="is-filled"></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class="is-filled"></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class="is-filled"></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class="is-filled"></i></div><span class="sdk-prefab-map__count">64 separate nodes · 8 × 8 board</span></div></div></figure>
