---
{
  "locale": "ru",
  "translationKey": "sdk/presentation/prefabs",
  "course": "sdk",
  "lesson": "presentation",
  "draft": true,
  "order": 8,
  "title": "Повторяемые объекты из префаба",
  "concept": "PrefabManager",
  "description": "Одна JSON-заготовка создаёт много независимых узлов.",
  "takeaway": [
    "Префаб разделяет описание; экземпляры имеют независимое состояние.",
    "Асинхронное создание и раннее удаление требуют явного владельца."
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

<aside class="lesson-note is-green" aria-labelledby="lesson-purpose">
  <h3 id="lesson-purpose">Зачем это нужно</h3>
  <p>Клетки, плитки и другие повторяющиеся элементы имеют общую структуру, но собственное состояние. Удобнее описать такую структуру один раз и создавать из неё независимые экземпляры.</p>
</aside>

Префаб — описание повторяемой визуальной структуры. В Block Puzzle пустая клетка и цветная плитка описаны отдельными JSON. Компонент поля создаёт из них нужное число экземпляров.

<aside class="lesson-note" aria-labelledby="prefab-term"><span class="lesson-note__label">Термин</span><h3 id="prefab-term">Префаб</h3><p>Заготовка дерева узлов, из которой во время работы создаются отдельные экземпляры с собственными ID и поведением.</p></aside>

Префаб клетки содержит Container, невидимые границы и Sprite. Отличие от layout: файл описывает сам корневой `ElementConfig`, без внешнего словаря `root`.

<figure class="sdk-figure"><div class="sdk-prefab-map"><div class="sdk-prefab-map__source"><div class="sdk-prefab-map__cell"></div><strong>Одна клетка</strong><code>board-cell.json</code></div><span class="sdk-prefab-map__arrow" aria-label="создаёт экземпляры">→</span><div><div class="sdk-prefab-map__grid"><i class="is-filled"></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class="is-filled"></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class="is-filled"></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class="is-filled"></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class="is-filled"></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class="is-filled"></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class="is-filled"></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class=""></i><i class="is-filled"></i></div><span class="sdk-prefab-map__count">64 независимых узла · поле 8 × 8</span></div></div><figcaption>У каждого экземпляра собственное состояние. Текстура изображения может быть общей.</figcaption></figure>

Создадим плитку внутри контейнера. Метод `spawnPrefab` загрузит её описание и применит переданные свойства:

```ts
const spawned = await this.node.spawnPrefab({
  prefabId: 'json/prefabs/game/block-cell.json',
  localId: 'tile-0',
  overrides: { visible: true, x: 24, y: 24 },
});
const tile = spawned.node;
```

`spawnPrefab` возвращает узел и `dispose()`. Локальный ID должен быть уникален среди детей контейнера. `overrides` — изменения display-свойств корня, а не произвольная глубокая правка каждого ребёнка.

## Владение экземпляром

Если объект нужен до удаления владельца, используем штатную очистку дерева. Если его нужно удалить раньше, вызываем и ожидаем `spawned.dispose()`. При асинхронном создании применяем `awaitComponentScopeResource`, как в уроке об области жизни.

`ensureChildFromPrefab` возвращает существующего ребёнка с тем же ID либо создаёт его. Поле `created` различает эти случаи; при возврате существующего узла `dispose` не забирает его владение. Это удобно для операции «обеспечить наличие», но не заменяет новый ID для нового объекта.

PrefabRepository получает и хранит проверенные определения, PrefabManager создаёт экземпляры. Префабы также должны быть включены в манифест и доступны к моменту создания.
