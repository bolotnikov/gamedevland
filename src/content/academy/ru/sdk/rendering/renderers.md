---
{
  "locale": "ru",
  "translationKey": "sdk/rendering/renderers",
  "course": "sdk",
  "lesson": "rendering",
  "draft": false,
  "order": 1,
  "title": "Четыре режима отрисовки",
  "concept": "Выбор рендера",
  "description": "Выберем, как PixiJS и Three.js будут рисовать игру.",
  "sources": [
    {
      "title": "SDK · GameConfig.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/core/GameConfig.ts",
      "note": "Обязательный выбор renderer."
    },
    {
      "title": "SDK · package.json",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/package.json",
      "note": "Публичные модули и необязательные зависимости Pixi и Three."
    },
    {
      "title": "SDK · MIGRATION_RENDERERS.md",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/MIGRATION_RENDERERS.md",
      "note": "Четыре способа подключения рендера."
    }
  ]
}
---

Способ отрисовки выбираем один раз в `GameConfig.system.renderer`. SDK поддерживает четыре варианта:

| Режим | Модуль | Что рисуем |
| --- | --- | --- |
| Pixi-only | `PixiRendererModule` | 2D-игру на PixiJS |
| Three-only | `ThreeRendererModule` | 3D-игру на Three.js |
| Three + Pixi | `HybridRendererModule` | 3D-мир и Pixi-интерфейс поверх него |
| Pixi + Three-as-texture | `PixiThreeTextureRendererModule` | Pixi-игру с 3D внутри текстуры спрайта |

Например, выберем Three для нового проекта:

```ts
import { ThreeRendererModule } from '@gamedevland/engine/renderers/three';

// Inside GameConfig:
system: { renderer: new ThreeRendererModule() },
```

Модуль подключает отрисовку и стандартные типы узлов. Сцены, FSM, команды и загрузка ресурсов используют общие API. Переключение рендера во время игры не предусмотрено.

Для Pixi установим `pixi.js`, для Three — `three` и типы `@types/three`; для обоих совместных вариантов нужны все три пакета. Сам SDK установим без номера версии: `npm install @gamedevland/engine @gamedevland/vite`.

В следующих четырёх уроках разберём каждый режим отдельно. Затем загрузим GLB и зададим порядок обновления камеры, мира и UI.
