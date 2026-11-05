---
{
  "locale": "en",
  "translationKey": "sdk/presentation/api-reference",
  "course": "sdk",
  "lesson": "presentation",
  "draft": false,
  "order": 15,
  "title": "SDK methods and types",
  "concept": "Reference",
  "description": "Find a class or type and a lesson that shows how to use it.",
  "takeaway": [
    "The modules are part of the @gamedevland/engine package."
  ],
  "sources": [
    {
      "title": "SDK · index.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/index.ts",
      "note": "Public exports at the package root."
    },
    {
      "title": "SDK · package.json",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/package.json",
      "note": "Declared import paths and distribution files."
    },
    {
      "title": "SDK · index.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/vite/src/index.ts",
      "note": "Build tools API."
    }
  ]
}
---

Open a module in the list below. For example, scene classes are in `scenes` and animation classes are in `tween`. Each module links to a lesson.

```ts
import { Engine } from '@gamedevland/engine';
import { BaseTypedCommand } from '@gamedevland/engine/commands';
import { SchemaDecoder } from '@gamedevland/engine/validation';
import type { GameConfig } from '@gamedevland/engine/core';
```
