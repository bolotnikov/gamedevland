---
{
  "locale": "ru",
  "translationKey": "sdk/foundations/game-config",
  "course": "sdk",
  "lesson": "foundations",
  "draft": false,
  "order": 4,
  "title": "Конфигурация игры",
  "concept": "GameConfig",
  "description": "В одном месте свяжем системы движка, ресурсы, сцены и DI.",
  "takeaway": [
    "GameConfig связывает системы, ресурсы и сцены.",
    "Значения геометрии и правил хранятся в отдельных конфигурациях игры."
  ],
  "sources": [
    {
      "title": "SDK · GameConfig.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/core/GameConfig.ts",
      "note": "Поля и типы конфигурации."
    },
    {
      "title": "Block Puzzle · game.config.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/config/game.config.ts",
      "note": "Связи конфигурации в Block Puzzle."
    }
  ]
}
---

`GameConfig` — описание запуска игры. Он передаётся в `Engine.run` и задаёт, какие системы и сцены подготовить. В Block Puzzle это статическое поле `BlockPuzzleGameConfig.config`.

Настроим запуск по примеру [game.config.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/config/game.config.ts#L10):

```ts
static readonly config: GameConfig = {
  system: {
    renderer: new PixiRendererModule(),
    canvasBackground: '#1d57c8',
    screen: {
      land: { width: 960, height: 540 },
      port: { width: 540, height: 960 },
      dpr: 'auto',
      maxDpr: 2,
    },
    boot: { configs: { engineStartBundles: ['configs'] } },
  },
  assets: { bundles: BlockPuzzleAssetsManifest.bundles, preload: ['configs'] },
  scenes: {
    initial: 'boot',
    map: { boot: BootSceneDefinition.config, game: GameSceneDefinition.config },
  },
  di: new BlockPuzzleDiDefinitionRoot(),
};
```

`PixiRendererModule` импортируем из `@gamedevland/engine/renderers/pixi`. Поле `system.renderer` обязательно: оно выбирает способ отрисовки и регистрирует стандартные типы узлов. Повторно регистрировать `Container`, `Sprite` и `Text` в DI игры не нужно.

<figure class="sdk-figure is-matrix"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>system</strong><span>Экран, звук, политика старта и сохранений</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>assets</strong><span>Какие ресурсы известны и что загрузить до первой сцены</span></div></div><div class="sdk-figure__item tone-green"><div><strong>scenes</strong><span>Начальный ключ и описания сцен</span></div></div><div class="sdk-figure__item tone-amber"><div><strong>di</strong><span>Какими классами и фабриками удовлетворять зависимости</span></div></div></div><figcaption>Конфигурация связывает части проекта; правила размещения фигур в неё не входят.</figcaption></figure>

Размеры `land` и `port` задают виртуальные профили экрана. Они не фиксируют размер браузера: ScreenManager рассчитывает масштаб для текущего окна. Ограничение `maxDpr` влияет на плотность рендера, а не на размеры клеток в правилах игры.

Дополнительное поле `layouts.textStylesConfigId` подключает каталог стилей текста. `data` хранит произвольные данные приложения; при чтении неизвестной структуры её всё равно нужно проверить схемой.

Ключ `scenes.initial` должен существовать в `scenes.map`. Для каждого ключа требуется соответствующее определение `SceneDiDefinition`. Ошибка в этих связях обнаруживается при старте, а не после первого хода.
