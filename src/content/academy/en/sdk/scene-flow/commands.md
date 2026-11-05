---
{
  "locale": "en",
  "translationKey": "sdk/scene-flow/commands",
  "course": "sdk",
  "lesson": "scene-flow",
  "draft": false,
  "order": 9,
  "title": "Scene commands",
  "concept": "BaseCommand and BaseTypedCommand",
  "description": "Pass the piece slot and coordinates to a command.",
  "takeaway": [
    "The decoder validates event data before the command runs."
  ],
  "sources": [
    {
      "title": "SDK · CommandBus.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/commands/CommandBus.ts",
      "note": "Creating a command and attaching its context."
    },
    {
      "title": "SDK · BaseTypedCommand.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/commands/BaseTypedCommand.ts",
      "note": "Decoding before execute."
    },
    {
      "title": "Block Puzzle · PlaceBlockCommand.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/commands/PlaceBlockCommand.ts",
      "note": "A command from the game."
    }
  ]
}
---

<aside class="lesson-note is-green" aria-labelledby="lesson-purpose">
  <h3 id="lesson-purpose">Why this matters</h3>
  <p>The FSM decides when to run a command. The command takes the event data and passes it to the game service.</p>
</aside>

`CommandBus` looks up the command by the name in the FSM and gives it access to the current scene.

Placement needs a slot and coordinates. The command uses `BaseTypedCommand`. [PlaceBlockCommand.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/commands/PlaceBlockCommand.ts)

```ts
import { BaseTypedCommand } from '@gamedevland/engine/commands';

import { BlockPuzzleServices } from '../BlockPuzzleServices';
import { BlockPuzzleEventSchemas } from '../configs/event.schemas';

import type { InferDecoded } from '@gamedevland/engine/validation';

type PlaceBlockCommandPayload = InferDecoded<
  typeof BlockPuzzleEventSchemas.PlacementRequest
>;

export class PlaceBlockCommand extends BaseTypedCommand<PlaceBlockCommandPayload> {
  protected override readonly inputDecoder =
    BlockPuzzleEventSchemas.PlacementRequest;

  protected override execute(payload: PlaceBlockCommandPayload): void {
    this.getSceneService(BlockPuzzleServices.Gameplay).place(payload);
  }
}
```

<figure class="sdk-figure is-flow"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">01</span><div><strong>FSM</strong><span>Runs PlaceBlockCommand with the event</span></div></div><div class="sdk-figure__item tone-violet"><span class="sdk-figure__index">02</span><div><strong>inputDecoder</strong><span>Checks slotId and anchor</span></div></div><div class="sdk-figure__item tone-green"><span class="sdk-figure__index">03</span><div><strong>execute</strong><span>Receives the validated payload</span></div></div><div class="sdk-figure__item tone-amber"><span class="sdk-figure__index">04</span><div><strong>Gameplay.place</strong><span>Checks the piece and empty cells, then applies the move</span></div></div></div><figcaption>The decoder validates the data before execute. The service and domain logic check the game rules.</figcaption></figure>

Use the same command name in `CommandsGroup` and the FSM configuration.

`BaseTypedCommand` validates the data with `inputDecoder` before calling `execute`.

If the command returns a Promise, the FSM waits for it to finish before processing the next event.
