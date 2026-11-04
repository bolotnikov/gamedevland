---
{
  "locale": "en",
  "translationKey": "sdk/foundations/schema-decoder",
  "course": "sdk",
  "lesson": "foundations",
  "draft": false,
  "order": 8,
  "title": "Validating data with a schema",
  "concept": "SchemaDecoder",
  "description": "One schema defines runtime validation and the TypeScript type.",
  "takeaway": [
    "The schema validates input at runtime.",
    "InferDecoded connects the validation result to the TypeScript type."
  ],
  "sources": [
    {
      "title": "SDK · SchemaDecoder.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/validation/schema/SchemaDecoder.ts",
      "note": "Combinators and validation execution."
    },
    {
      "title": "Block Puzzle · event.schemas.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/configs/event.schemas.ts",
      "note": "The boundary between request structure and placement rules."
    }
  ]
}
---

<aside class="lesson-note is-green" aria-labelledby="lesson-purpose">
  <h3 id="lesson-purpose">Why this is needed</h3>
  <p>JSON and event data can contain invalid values. TypeScript checks source code, but not the contents of a loaded file. Validating data when it arrives helps detect errors before the game starts using it.</p>
</aside>

`SchemaDecoder` validates input and returns data with the expected structure.

<aside class="lesson-note" aria-labelledby="decoder-term"><span class="lesson-note__label">Term</span><h3 id="decoder-term">Decoder</h3><p>A function that takes unknown data and either returns a validated value or reports an error.</p></aside>

In [schemas.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/configs/schemas.ts#L18), board width and height are validated as positive integers. Extract that check into `BoardSchema` for this example:

```ts
import { SchemaDecoder } from '@gamedevland/engine/validation';
import type { InferDecoded } from '@gamedevland/engine/validation';

export class BoardSchema {
  static readonly decoder = SchemaDecoder.object({
    width: SchemaDecoder.number({ integer: true, min: 1 }),
    height: SchemaDecoder.number({ integer: true, min: 1 }),
  });
}

export type BoardConfig = InferDecoded<typeof BoardSchema.decoder>;
```

`InferDecoded` derives the type from the schema: a separate interface with the same fields is not needed.

<figure class="sdk-figure is-flow"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">01</span><div><strong>unknown</strong><span>For example, { width: 8, height: &quot;8&quot; }</span></div></div><div class="sdk-figure__item tone-violet"><span class="sdk-figure__index">02</span><div><strong>SchemaDecoder.decode</strong><span>Checks fields, types and constraints</span></div></div><div class="sdk-figure__item tone-green"><span class="sdk-figure__index">03</span><div><strong>Result or error</strong><span>The string &quot;8&quot; does not become a number automatically</span></div></div></div><figcaption>Decoding checks the data structure. Game domain logic later checks whether the move itself is valid.</figcaption></figure>

Now validate the JSON data:

```ts
const board = SchemaDecoder.decode(raw, BoardSchema.decoder, 'board.json');
```

Here, `raw` is input of type `unknown`. The `board.json` label helps locate the source of an error.

The `object`, `readonlyArray`, `string`, `number`, `boolean`, `record`, `optional` and `enumOf` combinators describe nested structures. Constraints express valid values: for example, a slot number is an integer from 0 to 2. The domain model checks whether a piece fits into free cells, since that depends on the current board.
