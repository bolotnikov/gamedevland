---
{
  "locale": "ru",
  "translationKey": "sdk/presentation/layouts",
  "course": "sdk",
  "lesson": "presentation",
  "draft": true,
  "order": 1,
  "title": "Собираем экран из JSON",
  "concept": "Layout",
  "description": "Структура экрана описана данными, поведение подключается отдельно.",
  "takeaway": [
    "JSON владеет визуальной структурой и авторскими значениями.",
    "Поведение подключается к узлам через зарегистрированные типы."
  ],
  "sources": [
    {
      "title": "SDK · types.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/types.ts",
      "note": "Формат layout и узла."
    },
    {
      "title": "SDK · LayoutResolver.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/core/LayoutResolver.ts",
      "note": "Разрешение включений и проверка дерева."
    },
    {
      "title": "SDK · IncludeExpander.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/core/transformers/IncludeExpander.ts",
      "note": "Поверхностное объединение и защита от циклов."
    },
    {
      "title": "Block Puzzle · layout.json",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/assets/json/layouts/scenes/game/layout.json",
      "note": "Полный layout Block Puzzle."
    }
  ]
}
---

<aside class="lesson-note is-green" aria-labelledby="lesson-purpose">
  <h3 id="lesson-purpose">Зачем это нужно</h3>
  <p>Расположение и вложенность элементов экрана меняются при работе над интерфейсом. Опишем структуру отдельно от поведения, чтобы перестраивать экран без переписывания игровой логики.</p>
</aside>

Layout — дерево узлов в JSON. Узел задаёт тип, свойства, дочерние элементы и подключённое поведение. В Block Puzzle один layout содержит счётчик, игровое поле, слоты, слой перетаскивания и окно результата.

<aside class="lesson-note" aria-labelledby="layout-term"><span class="lesson-note__label">Термин</span><h3 id="layout-term">Вёрстка сцены (layout)</h3><p>Описание визуальной структуры: какие узлы существуют, как они вложены и какие свойства и поведения у них заданы.</p></aside>

Сокращённый пример по структуре [layout.json](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/assets/json/layouts/scenes/game/layout.json):

```json
{
  "root": {
    "type": "Container",
    "children": {
      "score": { "type": "Text", "props": { "text": "0", "anchor": 0.5 } },
      "gameplay": {
        "type": "Container",
        "children": {
          "board": { "type": "Container" },
          "slots": { "type": "Container" }
        }
      },
      "drag": { "type": "Container", "props": { "zIndex": 100 } }
    }
  }
}
```

<figure class="sdk-figure is-tree"><div class="sdk-layout-tree"><strong class="sdk-tree-root">root <small>Container</small></strong><ul><li><code>score</code><span>Text · счёт</span></li><li><code>gameplay</code><span>Container · игровая область</span><ul><li><code>board</code><span>Поле</span></li><li><code>slots</code><span>Три фигуры</span></li></ul></li><li><code>drag</code><span>Слой перетаскивания</span></li></ul></div><figcaption>Путь в дереве связывает JSON и код. score и gameplay — соседи, board находится внутри gameplay.</figcaption></figure>

`type` должен быть зарегистрирован в ElementFactoriesGroup. `props` задаёт авторские значения. `children` разрешены у Container. `components` подключает постоянное поведение, `actions` — действия для явного запуска.

## Подключение и сборка

В SceneConfig указываем `layout: 'json/layouts/scenes/game/layout.json'`. Файл должен быть доступен загрузчику. Движок разрешает включения, проверяет структуру, создаёт узлы и связывает их с runtime. После подготовки сервисов активируются компоненты.

Директива `$include` позволяет вставить другой JSON-объект. Локальные ключи заменяют одноимённые ключи включения целиком: это поверхностное объединение, не рекурсивное слияние всех `props`. Циклические включения обнаруживаются как ошибка. В этом курсе используем `$include`, а не старое `inject`.

В `ElementConfig` также есть `extends`, но текущий resolver не реализует отдельный механизм наследования по этому полю. Для повторного использования опираемся на работающие `$include` и префабы.
