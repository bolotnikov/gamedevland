---
{
  "locale": "ru",
  "translationKey": "sdk/scene-flow/dependency-injection",
  "course": "sdk",
  "lesson": "scene-flow",
  "draft": false,
  "order": 2,
  "title": "Dependency Injection и токены",
  "concept": "DI и токены",
  "description": "Получим игровой сервис по токену.",
  "takeaway": [
    "Токен — ключ, по которому контейнер находит нужный объект."
  ],
  "sources": [
    {
      "title": "SDK · tokens.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/di/tokens.ts",
      "note": "Категории типизированных токенов и SystemServices."
    },
    {
      "title": "Block Puzzle · BlockPuzzleServices.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/BlockPuzzleServices.ts",
      "note": "Токены сервисов игры."
    },
    {
      "title": "Block Puzzle · StartBlockPuzzleSessionCommand.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/commands/StartBlockPuzzleSessionCommand.ts",
      "note": "Запрос игрового сервиса по токену."
    }
  ]
}
---

<aside class="lesson-note" aria-labelledby="dependency-injection">
  <span class="lesson-note__label">Термин</span>
  <h3 id="dependency-injection">Внедрение зависимостей (Dependency Injection, DI)</h3>
  <p>Объект получает извне всё, что ему нужно для работы. Например, настройки или другой сервис можно передать через конструктор. Такие настройки и сервисы называют зависимостями.</p>
</aside>

Токен — ключ, по которому контейнер находит объект. В Block Puzzle команда запуска партии передаёт токен `Gameplay` в `getSceneService` и получает игровой сервис. Ниже показаны только нужные строки из [BlockPuzzleServices.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/BlockPuzzleServices.ts#L7-L13) и [StartBlockPuzzleSessionCommand.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/commands/StartBlockPuzzleSessionCommand.ts#L5-L9).

```ts
// BlockPuzzleServices.ts
export class BlockPuzzleServices {
  static readonly Gameplay = DiTokens.service<BlockPuzzleGameplayService>(
    'BlockPuzzleGameplayService',
  );
}

// StartBlockPuzzleSessionCommand.ts
this.getSceneService(BlockPuzzleServices.Gameplay).startSession();
```

<figure class="sdk-figure is-flow" aria-label="Как команда получает игровой сервис">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-violet"><div><strong>Токен</strong><span>BlockPuzzleServices.Gameplay</span></div></div>
    <div class="sdk-figure__item tone-cyan"><div><strong>Запрос</strong><span>getSceneService передаёт токен контейнеру</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>Готовый сервис</strong><span>Команда вызывает startSession()</span></div></div>
  </div>
</figure>
