---
{
  "locale": "ru",
  "translationKey": "sdk/presentation/api-reference",
  "course": "sdk",
  "lesson": "presentation",
  "draft": false,
  "order": 15,
  "title": "Справочник методов и типов SDK",
  "concept": "Справочник",
  "description": "Найдём нужный класс или тип и урок с примером.",
  "takeaway": [
    "Модули находятся в пакете @gamedevland/engine."
  ],
  "sources": [
    {
      "title": "SDK · index.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/index.ts",
      "note": "Корневые публичные экспорты."
    },
    {
      "title": "SDK · package.json",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/package.json",
      "note": "Объявленные subpaths и файлы дистрибутива."
    },
    {
      "title": "SDK · index.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/vite/src/index.ts",
      "note": "API инструментов сборки."
    }
  ]
}
---

Откроем нужный модуль в списке ниже. Например, классы для сцен находятся в `scenes`, для анимации — в `tween`. Рядом с каждым модулем есть ссылка на урок.

```ts
import { Engine } from '@gamedevland/engine';
import { BaseTypedCommand } from '@gamedevland/engine/commands';
import { SchemaDecoder } from '@gamedevland/engine/validation';
import type { GameConfig } from '@gamedevland/engine/core';
```
