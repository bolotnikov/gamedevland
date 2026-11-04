---
{
  "locale": "en",
  "translationKey": "sdk/foundations/new-project",
  "course": "sdk",
  "lesson": "foundations",
  "draft": false,
  "order": 12,
  "title": "Creating an empty project",
  "concept": "Minimal startup",
  "description": "Start a canvas without game rules, assets or an FSM.",
  "takeaway": [
    "Even an empty project has GameConfig and DI for each scene.",
    "Engine.run takes the CSS selector of an existing container."
  ],
  "sources": [
    {
      "title": "SDK · GameViteConfigFactory.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/vite/src/GameViteConfigFactory.ts",
      "note": "The game structure, aliases and build directory."
    },
    {
      "title": "SDK · GameConfig.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/core/GameConfig.ts",
      "note": "Required configuration fields."
    },
    {
      "title": "SDK · DiBootstrapValidator.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/di/DiBootstrapValidator.ts",
      "note": "Every scene key needs a DI definition."
    }
  ]
}
---

Now assemble a minimal project: configuration, one scene and its dependencies. Create a folder and install the SDK packages:

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

Commands using `VITE_PLATFORM=web` are shown for macOS/Linux. On Windows, the same variable can be set in a `.env` file at the project root.

<a id="файлы-проекта" class="translation-anchor" aria-hidden="true"></a>
## Project files

Configure the build in `vite.config.ts`. The browser code will live in `game`, and the build output in `dist`:

```ts
import { createGameViteConfig } from '@gamedevland/vite';

export default ({ mode }: { readonly mode: string }) =>
  createGameViteConfig({
    mode,
    repoRoot: import.meta.dirname,
  });
```

Create `game/index.html` with a container and entry point. [Block Puzzle's index.html](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/index.html#L51) uses the same approach:

```html
<!doctype html>
<html lang="ru">
  <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>SDK Game</title></head>
  <body style="margin:0"><div id="app"></div><script type="module" src="/src/main.ts"></script></body>
</html>
```

Even an empty scene needs a DI definition. There is nothing to register yet, so the methods stay empty. Put the classes in separate files inside `game/src`.

`AppGlobalDi.ts` describes the game's global registrations. Leave them empty for now:

```ts
import { GlobalDiDefinition } from '@gamedevland/engine/di';

export class AppGlobalDi extends GlobalDiDefinition {
  protected override registerElements(): void {}
  protected override registerComponents(): void {}
  protected override registerCommands(): void {}
  protected override registerServices(): void {}
}
```

In `MainSceneDi.ts`, specify the scene name. It has no dependencies yet:

```ts
import { SceneDiDefinition } from '@gamedevland/engine/di';

export class MainSceneDi extends SceneDiDefinition {
  override getSceneKey(): string { return 'main'; }
  protected override registerProviders(): void {}
  protected override registerServices(): void {}
}
```

In `AppDi.ts`, combine global registrations with scene dependencies:

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

In `main.ts`, assemble the configuration and pass it to the engine:

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

Create `tsconfig.json` at the root:

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

<figure class="sdk-figure is-flow"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">01</span><div><strong>npm run dev</strong><span>Vite reads game/index.html</span></div></div><div class="sdk-figure__item tone-violet"><span class="sdk-figure__index">02</span><div><strong>main.ts</strong><span>Passes GameConfig to Engine.run</span></div></div><div class="sdk-figure__item tone-green"><span class="sdk-figure__index">03</span><div><strong>main</strong><span>BaseScene creates the scene root without a layout or FSM</span></div></div></div><figcaption>The complete example creates an empty blue canvas. Layout and rules will be added through the APIs in later lessons.</figcaption></figure>

Run `npm run typecheck`, then `npm run dev`. The expected result is a blue canvas with no errors. `preload: []` is explicit: without it, the engine tries to load the default `common` and `layouts` bundles, which do not exist here.
