---
{
  "locale": "en",
  "translationKey": "sdk/presentation/input",
  "course": "sdk",
  "lesson": "presentation",
  "draft": false,
  "order": 9,
  "title": "Handling a button press",
  "concept": "InputManager",
  "description": "Send a restart event when the player presses the button.",
  "takeaway": [
    "onTap returns an unsubscribe function to call when disabling the component."
  ],
  "sources": [
    {
      "title": "SDK · types.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/input/types.ts",
      "note": "Events and coordinates."
    },
    {
      "title": "SDK · NodeInput.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/layouts/nodes/internal/NodeInput.ts",
      "note": "onTap and unsubscribe functions."
    },
    {
      "title": "SDK · InputRouter.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/input/InputRouter.ts",
      "note": "Routing and propagation."
    },
    {
      "title": "SDK · BrowserInputGuard.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/input/BrowserInputGuard.ts",
      "note": "Suppressing browser actions."
    }
  ]
}
---

Attach a component to the button. `node.input.onTap` handles mouse clicks and taps. Send `RESTART_REQUESTED` on a press and define the response to that event in the FSM.

```ts
import { BaseComponent } from '@gamedevland/engine/layouts';
import { Container } from '@gamedevland/engine/renderers/pixi';

export class RestartButtonComponent extends BaseComponent<Container> {
  protected readonly nodeType = Container;
  private off: (() => void) | undefined;

  protected override onEnable(): void {
    this.off = this.node.input.onTap(() => {
      this.node.events.emit({ type: 'RESTART_REQUESTED', data: {} });
    });
  }
  protected override onDisable(): void {
    this.off?.();
    this.off = undefined;
  }
}
```

<figure class="sdk-figure is-flow">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-cyan"><div><strong>The player presses the button</strong><span>Mouse or touch</span></div></div>
    <div class="sdk-figure__item tone-violet"><div><strong>onTap</strong><span>The component sends RESTART_REQUESTED</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>FSM</strong><span>Restarts the game</span></div></div>
  </div>
</figure>
