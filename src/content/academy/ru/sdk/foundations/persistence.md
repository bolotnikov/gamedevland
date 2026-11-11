---
{
  "locale": "ru",
  "translationKey": "sdk/foundations/persistence",
  "course": "sdk",
  "lesson": "foundations",
  "draft": false,
  "order": 10,
  "title": "Сохраняем рекорд",
  "concept": "Типизированное состояние",
  "description": "Сохраняем данные игрока отдельно от конфигурации игры.",
  "takeaway": [
    "Конфигурация автора и состояние игрока имеют разные жизненные циклы.",
    "Формат сохранений проверяется и имеет явную версию."
  ],
  "sources": [
    {
      "title": "SDK · TypedStateStore.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/configs/services/TypedStateStore.ts",
      "note": "Проверка сохранения и восстановление defaults."
    },
    {
      "title": "SDK · PersistentStorageCoordinator.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/configs/services/PersistentStorageCoordinator.ts",
      "note": "Координация backend хранилищ."
    },
    {
      "title": "Block Puzzle · BlockPuzzlePlayerProgressService.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/common/services/BlockPuzzlePlayerProgressService.ts",
      "note": "Сервис прогресса игры."
    }
  ]
}
---

<aside class="lesson-note is-green" aria-labelledby="lesson-purpose">
  <h3 id="lesson-purpose">Зачем это нужно</h3>
  <p>Рекорд и настройки игрока меняются во время игры и должны сохраняться между запусками. Эти данные нужно хранить отдельно от конфигураций, которые задаёт автор игры.</p>
</aside>

`TypedStateStore` предоставляет запись и чтение состояния через один декодер.

Сохраним лучший результат партии. Этот код выполняется после запуска движка с `system.persistence.namespace: 'sdk-game'`:

```ts
import {
  StorageNamespace, TypedStateStore,
} from '@gamedevland/engine/configs';
import { SchemaDecoder } from '@gamedevland/engine/validation';

const store = new TypedStateStore({
  adapter: engine.storage,
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

Здесь сохраняем 100 очков. Во время игры результат передаст сервис прогресса.

<figure class="sdk-figure is-compare"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>Файл конфигурации</strong><span>board.json → ConfigStore → размеры поля</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>Состояние игрока</strong><span>TypedStateStore → адаптер → рекорд</span></div></div></div><figcaption>Ключ sdk-game:progress-v1 отделяет данные проекта и версию структуры.</figcaption></figure>

`load()` возвращает значения по умолчанию, если записи нет, JSON повреждён или схема не подходит. `save()` сначала проверяет значение; неверные данные не должны тихо попадать в хранилище. `clear()` удаляет запись.

`engine` — экземпляр, возвращённый `Engine.run`. Его `storage` — готовый адаптер сохранений этой игры. В DI этот же готовый адаптер доступен через `di.get(SystemServices.PersistentStorage)`.

В `system.persistence` зададим `namespace` и политику. По умолчанию `platform-exclusive` использует хранилище площадки без подстановки браузерных записей; без хранилища площадки используются браузерные. Политика `mirror` пишет в оба, а при отсутствии ключа на площадке использует браузерную запись. Namespace существующей игры сохраняем: его смена изменит ключи доступа к прогрессу.

В Block Puzzle глобальный сервис прогресса использует репозиторий. Сервис сцены передаёт ему итог партии. Благодаря этому замена способа хранения не затрагивает расчёт очков и отображение результата.

При изменении формата потребуется явное решение о миграции или новом ключе. Суффикс `v1` сам по себе миграцию не выполняет.
