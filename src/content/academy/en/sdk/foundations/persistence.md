---
{
  "locale": "en",
  "translationKey": "sdk/foundations/persistence",
  "course": "sdk",
  "lesson": "foundations",
  "draft": false,
  "order": 10,
  "title": "Saving the high score",
  "concept": "Typed state",
  "description": "Save player data separately from game configuration.",
  "takeaway": [
    "Author-defined configuration and player state have different lifecycles.",
    "The save format is validated and explicitly versioned."
  ],
  "sources": [
    {
      "title": "SDK · TypedStateStore.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/configs/services/TypedStateStore.ts",
      "note": "Save validation and restoring defaults."
    },
    {
      "title": "SDK · PersistentStorageCoordinator.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/configs/services/PersistentStorageCoordinator.ts",
      "note": "Coordination of storage backends."
    },
    {
      "title": "Block Puzzle · BlockPuzzlePlayerProgressService.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/common/services/BlockPuzzlePlayerProgressService.ts",
      "note": "The game's progress service."
    }
  ]
}
---

<aside class="lesson-note is-green" aria-labelledby="lesson-purpose">
  <h3 id="lesson-purpose">Why this is needed</h3>
  <p>The high score and player settings change during play and must persist between sessions. Store this data separately from the configurations defined by the game author.</p>
</aside>

`TypedStateStore` provides state reads and writes through a single decoder.

Save the best result of a game. This code runs after starting the engine with `system.persistence.namespace: 'sdk-game'`:

```ts
import {
  PersistentStorageAdapter, StorageNamespace, TypedStateStore,
} from '@gamedevland/engine/configs';
import { SchemaDecoder } from '@gamedevland/engine/validation';

const store = new TypedStateStore({
  adapter: new PersistentStorageAdapter(),
  namespace: new StorageNamespace('sdk-game'),
  key: 'progress-v1',
  decoder: SchemaDecoder.object({
    bestScore: SchemaDecoder.number({ integer: true, min: 0 }),
  }),
  defaults: () => ({ bestScore: 0 }),
});

const progress = store.load();
store.save({ bestScore: Math.max(progress.bestScore, 100) });
```

Here, we save 100 points. During play, the progress service supplies the result.

<figure class="sdk-figure is-compare"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>Configuration file</strong><span>board.json → ConfigStore → board dimensions</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>Player state</strong><span>TypedStateStore → adapter → high score</span></div></div></div><figcaption>The sdk-game:progress-v1 key separates project data and the structure version.</figcaption></figure>

`load()` returns defaults if the record is missing, the JSON is corrupted or the schema does not match. `save()` validates the value first; invalid data should not silently enter storage. `clear()` removes the record.

`PersistentStorageAdapter` uses the persistence coordinator prepared by the engine through `system.persistence`. LocalStorageAdapter and IndexedDbStorageAdapter are also available. Multiple storage backends do not add a synchronization server to the application.

In Block Puzzle, the global progress service uses a repository. The scene service passes the game result to it. This lets the storage method change without affecting score calculation or display.

Changing the format requires an explicit choice: migrate the data or use a new key. The `v1` suffix does not perform a migration by itself.
