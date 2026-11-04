---
{
  "locale": "ru",
  "translationKey": "sdk/foundations/new-project",
  "course": "sdk",
  "lesson": "foundations",
  "draft": false,
  "order": 12,
  "title": "Создаём пустой проект",
  "concept": "Минимальный запуск",
  "description": "Запустим canvas без игровых правил, ресурсов и FSM.",
  "takeaway": [
    "Пустой проект уже имеет GameConfig и DI каждой сцены.",
    "Engine.run получает CSS-селектор существующего контейнера."
  ],
  "sources": [
    {
      "title": "SDK · GameViteConfigFactory.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/vite/src/GameViteConfigFactory.ts",
      "note": "Структура game, alias и каталог сборки."
    },
    {
      "title": "SDK · GameConfig.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/core/GameConfig.ts",
      "note": "Обязательные поля конфигурации."
    },
    {
      "title": "SDK · DiBootstrapValidator.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/di/DiBootstrapValidator.ts",
      "note": "Для каждого ключа сцены нужен DI-контракт."
    }
  ]
}
---

Теперь соберём минимальный проект: конфигурацию, одну сцену и её зависимости. Создадим папку и установим пакеты SDK:

```sh
mkdir sdk-game
cd sdk-game
npm init -y
npm pkg set type=module
npm pkg set 'scripts.dev=VITE_PLATFORM=web vite' 'scripts.build=VITE_PLATFORM=web vite build' 'scripts.typecheck=tsc --noEmit'
npm install --save-exact @gamedevland/engine
npm install --save-dev --save-exact @gamedevland/vite vite@8.0.16 typescript@5.9.3
mkdir -p game/src
```

Команды с `VITE_PLATFORM=web` показаны для macOS/Linux. В Windows ту же переменную можно задать через файл `.env` в корне проекта.

<a id="project-files" class="translation-anchor" aria-hidden="true"></a>
## Файлы проекта

В `vite.config.ts` настроим сборку. Корнем браузерной части станет папка `game`, результат попадёт в `dist`:

```ts
import { createGameViteConfig } from '@gamedevland/vite';

export default ({ mode }: { readonly mode: string }) =>
  createGameViteConfig({
    mode,
    repoRoot: import.meta.dirname,
  });
```

Создадим `game/index.html` с контейнером и точкой входа. Такой способ подключения используется в [index.html Block Puzzle](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/index.html#L51):

```html
<!doctype html>
<html lang="ru">
  <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>SDK Game</title></head>
  <body style="margin:0"><div id="app"></div><script type="module" src="/src/main.ts"></script></body>
</html>
```

Даже пустой сцене требуется определение DI. Пока нечего регистрировать, поэтому методы остаются пустыми. Классы разместим в отдельных файлах внутри `game/src`.

`AppGlobalDi.ts` описывает общие регистрации игры. Пока оставим их пустыми:

```ts
import { GlobalDiDefinition } from '@gamedevland/engine/di';

export class AppGlobalDi extends GlobalDiDefinition {
  protected override registerElements(): void {}
  protected override registerComponents(): void {}
  protected override registerCommands(): void {}
  protected override registerServices(): void {}
}
```

В `MainSceneDi.ts` укажем имя сцены. Зависимостей у неё пока нет:

```ts
import { SceneDiDefinition } from '@gamedevland/engine/di';

export class MainSceneDi extends SceneDiDefinition {
  override getSceneKey(): string { return 'main'; }
  protected override registerProviders(): void {}
  protected override registerServices(): void {}
}
```

В `AppDi.ts` объединим общие регистрации и зависимости сцен:

```ts
import { GameDiDefinition } from '@gamedevland/engine/di';
import { AppGlobalDi } from './AppGlobalDi';
import { MainSceneDi } from './MainSceneDi';

export class AppDi extends GameDiDefinition {
  protected override createGlobalDefinition(): AppGlobalDi {
    return new AppGlobalDi();
  }
  protected override createSceneDefinitions(): MainSceneDi[] {
    return [new MainSceneDi()];
  }
}
```

В `main.ts` соберём конфигурацию и передадим её движку:

```ts
import { Engine } from '@gamedevland/engine';
import { BaseScene } from '@gamedevland/engine/scenes';
import { AppDi } from './AppDi';
import type { GameConfig } from '@gamedevland/engine/core';

const config = {
  system: { canvasBackground: '#1d57c8' },
  assets: { bundles: [], preload: [] },
  scenes: { initial: 'main', map: { main: { key: 'main', useClass: BaseScene } } },
  di: new AppDi(),
} satisfies GameConfig;

await Engine.run('#app', config);
```

В корне создадим `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "noEmit": true,
    "skipLibCheck": true,
    "lib": ["ES2022", "DOM"],
    "types": ["vite/client"]
  },
  "include": ["game/src/**/*.ts"]
}
```

<figure class="sdk-figure is-flow"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">01</span><div><strong>npm run dev</strong><span>Vite читает game/index.html</span></div></div><div class="sdk-figure__item tone-violet"><span class="sdk-figure__index">02</span><div><strong>main.ts</strong><span>Передаёт GameConfig в Engine.run</span></div></div><div class="sdk-figure__item tone-green"><span class="sdk-figure__index">03</span><div><strong>main</strong><span>BaseScene создаёт корень сцены без layout и FSM</span></div></div></div><figcaption>Полный пример создаёт пустой синий canvas. Вёрстку и правила добавим через API следующих уроков.</figcaption></figure>

Выполним `npm run typecheck`, затем `npm run dev`. Ожидаемый результат — синий canvas без ошибок. `preload: []` указан явно: без него движок пытается загрузить стандартные наборы `common` и `layouts`, которых здесь нет.
