---
{
  "locale": "en",
  "translationKey": "sdk/foundations/new-project",
  "course": "sdk",
  "lesson": "foundations",
  "draft": false,
  "order": 12,
  "title": "Creating an empty project",
  "concept": "Creating with the CLI",
  "description": "Create with gamedevland create, run the project and explore its files.",
  "sources": [
    {
      "title": "SDK · ProjectCreator.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-07-playgama/packages/vite/src/project/ProjectCreator.ts",
      "note": "Creating a directory from the template, installing dependencies and command options."
    },
    {
      "title": "SDK · Empty project template",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-07-playgama/packages/vite/templates/empty",
      "note": "Project files, configuration, empty scene, JSON assets and validation commands."
    }
  ]
}
---

Node.js 22.12+ and npm are required. Open a terminal in the directory that holds the projects and run:

```sh
npx --yes --package @gamedevland/vite gamedevland create sdk-game
cd sdk-game
npm run dev
```

`npx` downloads the tools, and `gamedevland create sdk-game` creates the directory and installs the SDK and dependencies. The name `sdk-game` can be changed; the directory must be new or empty. `cd sdk-game` enters the project, and `npm run dev` starts Vite. Open the address printed in the terminal to see a dark canvas with an empty `main` scene.

To create files without installing dependencies, add `--no-install`, then run `npm install` inside the project later.

<a id="файлы-проекта" class="translation-anchor" aria-hidden="true"></a>
## Project files

The template already includes configuration, DI, a JSON layout and an FSM with one `ready` state. The files are ready for game logic:

<figure class="sdk-figure is-matrix" aria-label="Main files in the generated project">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-cyan"><div><strong>game/src/main.ts</strong><span>Calls Engine.run with the GameConfiguration config.</span></div></div>
    <div class="sdk-figure__item tone-violet"><div><strong>game/src/config/</strong><span>GameConfiguration defines the screen, assets and scenes; ProjectDi and ProjectGlobalDi register dependencies.</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>game/src/scenes/main/</strong><span>MainScene is the empty scene; MainSceneDefinition sets its layout and FSM, and MainSceneDi defines scene dependencies.</span></div></div>
    <div class="sdk-figure__item tone-amber"><div><strong>game/assets/json/</strong><span>The empty scene layout and sounds-volumes.json with music and effects volumes.</span></div></div>
  </div>
  <figcaption>At the root: package.json holds dependencies and commands; vite.config.ts configures the build; tsconfig.json and eslint.config.js configure code checks.</figcaption>
</figure>

Press `Ctrl+C` to stop the server, then check types, code style and the build:

```sh
npm run typecheck
npm run lint
npm run build
```

Build output appears in `dist/`.
