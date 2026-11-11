---
{
  "locale": "en",
  "translationKey": "sdk/presentation/components",
  "course": "sdk",
  "lesson": "presentation",
  "draft": false,
  "order": 4,
  "title": "A component on a node",
  "concept": "BaseComponent",
  "description": "Set up a score display in JSON.",
  "takeaway": [
    "Subscribe in onEnable and unsubscribe in onDisable."
  ],
  "sources": [
    {
      "title": "SDK · BaseComponent.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/layouts/components/BaseComponent.ts",
      "note": "Hooks, enabling, and basic cleanup."
    },
    {
      "title": "SDK · NodeComponents.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/layouts/nodes/internal/NodeComponents.ts",
      "note": "Ready and enable order and component lookup by class."
    },
    {
      "title": "SDK · BuiltTreeActivator.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/layouts/build/BuiltTreeActivator.ts",
      "note": "Child nodes activate before their parent."
    }
  ]
}
---

<aside class="lesson-note" aria-labelledby="component-term"><span class="lesson-note__label">Term</span><h3 id="component-term">Component</h3><p>A class that adds behavior to a screen element. For example, it can listen for a score change and update the text.</p></aside>


A component declares its node class: for example, `BaseComponent<Text>` with `protected readonly nodeType = Text`. Import `Text` from `@gamedevland/engine/renderers/pixi`. The SDK checks the type before calling the component hooks.

Add the score display to `components`. `score` names the component on this node, and `type` names the class registered with DI. [layout.json](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/assets/json/layouts/scenes/game/layout.json)

```json
"components": {
  "score": {
    "type": "BlockPuzzleScoreComponent",
    "data": { "popScale": 1.18, "popDuration": 0.2 }
  }
}
```

<figure class="sdk-figure is-flow">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-cyan"><div><strong>onReady</strong><span>The layout is ready</span></div></div>
    <div class="sdk-figure__item tone-violet"><div><strong>onEnable</strong><span>Subscribe to events</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>onDisable</strong><span>Unsubscribe from events</span></div></div>
  </div>
</figure>
