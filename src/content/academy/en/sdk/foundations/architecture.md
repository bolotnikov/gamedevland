---
{
  "locale": "en",
  "translationKey": "sdk/foundations/architecture",
  "course": "sdk",
  "lesson": "foundations",
  "draft": false,
  "order": 1,
  "title": "What GameDevLand SDK provides",
  "concept": "Game and engine boundaries",
  "description": "The project defines game behavior and uses engine modules through the public API.",
  "takeaway": [
    "Domain logic, game flow and presentation stay in the project.",
    "Engine modules provide a public API for common game tasks."
  ],
  "sources": [
    {
      "title": "SDK · README.md",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/README.md",
      "note": "The purpose of the two packages and the SDK boundaries."
    },
    {
      "title": "Engine · package.json",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/package.json",
      "note": "The exports field lists the public engine modules."
    },
    {
      "title": "SDK · AudioManager.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/audio/AudioManager.ts",
      "note": "The public playSfx method for playing sound effects."
    }
  ]
}
---

[GameDevLand SDK](https://github.com/gamedevland/sdk) provides ready-made modules for HTML5 game development. Different games can share these modules while keeping their logic in separate projects. The `@gamedevland/engine` package runs in the browser, while `@gamedevland/vite` handles project startup and builds. Rendering can use PixiJS, Three.js, Three with a Pixi UI, or Three inside a Pixi texture.

<aside class="lesson-note" aria-labelledby="sdk-definition">
  <span class="lesson-note__label">Term</span>
  <h3 id="sdk-definition">SDK</h3>
  <p>A set of tools and APIs through which a game uses the engine's ready-made features.</p>
</aside>

<a id="где-проходят-границы" class="translation-anchor" aria-hidden="true"></a>
## Where the boundaries lie

**The project owns the game itself:** its rules, state, flow and presentation. Domain logic—the rules and data specific to the game—stays in the project.

**The SDK provides shared infrastructure.** The engine is divided into modules. Each handles its own task and exposes a public API: methods, types and extension points available to the project.

<figure class="sdk-boundary" aria-label="The project uses the public API of engine modules: game flow, screen and input, audio, effects and physics, infrastructure">
  <div class="sdk-boundary__columns">
    <section class="sdk-boundary__side is-game" aria-labelledby="sdk-game-responsibility">
      <header><span class="sdk-boundary__kind">A specific game</span><h3 id="sdk-game-responsibility">Project</h3></header>
      <dl>
        <div><dt><span class="sdk-boundary__icon is-symbol" aria-hidden="true">ƒ</span><span>Domain logic</span></dt><dd>Game rules and state</dd></div>
        <div><dt><span class="sdk-boundary__icon is-symbol" aria-hidden="true">→</span><span>Game flow</span></dt><dd>Action order and responses to events</dd></div>
        <div><dt><span class="sdk-boundary__icon is-layout" aria-hidden="true"><i></i><i></i><i></i></span><span>Presentation</span></dt><dd>UI structure and behavior</dd></div>
      </dl>
    </section>
    <div class="sdk-boundary__connection"><span>Uses module APIs</span><span aria-hidden="true">↓</span></div>
    <section class="sdk-boundary__side is-engine" aria-labelledby="sdk-engine-responsibility">
      <header><span class="sdk-boundary__kind">@gamedevland/engine</span><h3 id="sdk-engine-responsibility">Engine modules</h3></header>
      <div class="sdk-boundary__api"><strong>Public module APIs</strong><span>Methods · types · extension points</span></div>
      <div class="sdk-boundary__modules">
        <section class="sdk-boundary__module-group is-violet" aria-labelledby="sdk-modules-violet">
          <h4 id="sdk-modules-violet">Game flow</h4>
          <ul>
            <li><code>core</code><span>Engine startup and operation</span></li>
            <li><code>scenes</code><span>Scene transitions and lifecycle</span></li>
            <li><code>fsm</code><span>States and transitions</span></li>
            <li><code>commands</code><span>Command execution</span></li>
            <li><code>events</code><span>Event emission and subscriptions</span></li>
          </ul>
        </section>
        <section class="sdk-boundary__module-group is-cyan" aria-labelledby="sdk-modules-cyan">
          <h4 id="sdk-modules-cyan">Screen and input</h4>
          <ul>
            <li><code>layouts</code><span>Shared nodes, components and actions</span></li>
            <li><code>renderers</code><span>Pixi, Three and their combined rendering</span></li>
            <li><code>prefabs</code><span>Creating nodes from templates</span></li>
            <li><code>screen</code><span>Screen size and adaptation</span></li>
            <li><code>input</code><span>Pointer and wheel events</span></li>
            <li><code>interactions</code><span>Drag handling</span></li>
          </ul>
        </section>
        <section class="sdk-boundary__module-group is-green" aria-labelledby="sdk-modules-green">
          <h4 id="sdk-modules-green">Audio, effects and physics</h4>
          <ul>
            <li><code>audio</code><span>Playback and channels</span></li>
            <li><code>tween</code><span>Property animation</span></li>
            <li><code>particles</code><span>Particle emitters</span></li>
            <li><code>physics</code><span>Bodies and physics simulation</span></li>
          </ul>
        </section>
        <section class="sdk-boundary__module-group is-amber" aria-labelledby="sdk-modules-amber">
          <h4 id="sdk-modules-amber">Infrastructure</h4>
          <ul>
            <li><code>assets</code><span>Asset loading and storage</span></li>
            <li><code>configs</code><span>Settings, saves and localization</span></li>
            <li><code>di</code><span>Registering and resolving dependencies</span></li>
            <li><code>validation</code><span>Data validation and decoding</span></li>
            <li><code>errors</code><span>Engine error types</span></li>
            <li><code>platforms</code><span>Game platform integration</span></li>
          </ul>
        </section>
      </div>
    </section>
  </div>
  <figcaption>Public engine modules grouped by purpose. The diagram shows the engine's modules, not dependencies between them.</figcaption>
</figure>

This separation lets the game change without rewriting shared engine mechanisms. The engine can evolve independently of a particular game's rules: as long as its API remains compatible, the project does not need to adapt to internal changes.

<a id="граница-на-уровне-api" class="translation-anchor" aria-hidden="true"></a>
## The API boundary

The project chooses a sound and when to play it. To play the sound, it calls the SDK's audio module. For example:

```ts
engine.audio.playSfx(soundId);
```

Here, `engine` is the engine instance and `soundId` identifies a prepared sound. The `playSfx` method plays it using the audio settings. The game decides when to call the method and which sound to pass.
