---
{
  "locale": "en",
  "translationKey": "sdk/foundations/block-puzzle",
  "course": "sdk",
  "lesson": "foundations",
  "draft": false,
  "order": 2,
  "title": "Running Block Puzzle",
  "concept": "An existing project",
  "description": "Get a working game before examining how it is built.",
  "takeaway": [
    "First, run the pinned game revision.",
    "Course links point to the same source revision."
  ],
  "sources": [
    {
      "title": "Block Puzzle · package.json",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/package.json",
      "note": "Dependency versions and existing npm scripts."
    },
    {
      "title": "Block Puzzle · vite.config.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/vite.config.ts",
      "note": "Use of the shared Vite configuration."
    }
  ]
}
---

Open the [Block Puzzle demo](https://gamedevland.github.io/block-puzzle/). The player drags pieces onto an 8 × 8 board. Completed rows and columns are cleared; the game ends when none of the pieces fit.

Now get the [game source](https://github.com/gamedevland/block-puzzle). The course uses the public revision `d1dd4e3`, so examples can be checked against unchanged code. Run the commands below to start it locally. The `dev:web` script is defined in [package.json](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/package.json).

```sh
git clone https://github.com/gamedevland/block-puzzle.git
cd block-puzzle
git checkout d1dd4e35b3df7d71fcc6a3eca9f5133773f51177
npm ci
npm run dev:web
```

Node.js 22.12+ or 24 is required. Vite prints the local address; the original configuration uses port `5173`. After startup, check one move, a score change and a game restart.

<a id="где-искать-код" class="translation-anchor" aria-hidden="true"></a>
## Where to find the code

<figure class="sdk-figure is-tree"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>package.json · vite.config.ts</strong><span>Dependencies, startup commands and build settings</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>game/src/config</strong><span>GameConfig, asset manifest and global DI</span></div></div><div class="sdk-figure__item tone-green"><div><strong>game/src/scenes/game</strong><span>FSM, commands, services, domain classes and components</span></div></div><div class="sdk-figure__item tone-amber"><div><strong>game/assets/json</strong><span>Configs, layouts and reusable visual templates</span></div></div></div><figcaption>The game folder contains the browser code. Vite runs from the repository root.</figcaption></figure>

For the first run, use the dependencies in `package-lock.json`: `npm ci` installs the pinned package set.

`npm run typecheck`, `npm run lint` and `npm run build:web` check types, code style and the build. A successful build does not replace testing drag behavior in the browser.
