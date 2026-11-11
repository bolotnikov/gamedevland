---
{
  "locale": "en",
  "translationKey": "sdk/scene-flow/async-lifecycle",
  "course": "sdk",
  "lesson": "scene-flow",
  "draft": false,
  "order": 11,
  "title": "Async operations and scene exit",
  "concept": "Operation lifetime",
  "description": "Check whether the component is still enabled after loading.",
  "takeaway": [
    "After awaiting the result, check that the component is still active."
  ],
  "sources": [
    {
      "title": "SDK · BaseCommand.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/commands/BaseCommand.ts",
      "note": "Scene scope checks and detached operations."
    },
    {
      "title": "SDK · BaseComponent.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/layouts/components/BaseComponent.ts",
      "note": "Awaiting resources and completing detach."
    },
    {
      "title": "SDK · BaseAction.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/layouts/actions/BaseAction.ts",
      "note": "Action cancellation and lifetime."
    }
  ]
}
---

<aside class="lesson-note is-green" aria-labelledby="lesson-purpose">
  <h3 id="lesson-purpose">Why this matters</h3>
  <p>A prefab may finish loading after the scene closes. Before showing it, check that the component is still active.</p>
</aside>

Commands use `awaitSceneScope` for this check. In a component, use `awaitComponentScopeResource` when the loaded resource needs to be released.

```ts
const spawned = await this.awaitComponentScopeResource(
  this.node.spawnPrefab({
    prefabId: this.config.prefabId,
    localId: 'preview',
  }),
  (resource) => resource.dispose(),
);
if (!spawned) return;
spawned.node.setVisible(true);
```

If the component has been disabled, the method releases the prefab and returns `undefined`.

<figure class="sdk-figure is-compare"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>Owner is active</strong><span>Operation completes → use the result</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>Owner has been removed</strong><span>Operation completes → release the resource → skip the rest</span></div></div></div><figcaption>The check after await lets the network request finish and controls whether its result is used.</figcaption></figure>

For cancellable requests, a service receives `ctx.signal`: after `await`, check `ctx.signal?.throwIfAborted()` before applying the result. Cancellation cannot forcibly stop an arbitrary Promise.

`ownDisposer` registers synchronous cleanup until the component is removed; `scopeSignal` lasts until detach. Disabling a component does not end this lifetime. Call `super.onDetach()` from an overridden `onDetach` so the SDK aborts the signal and releases registered resources.
