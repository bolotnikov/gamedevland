---
{
  "locale": "ru",
  "translationKey": "sdk/presentation/api-reference",
  "course": "sdk",
  "lesson": "presentation",
  "draft": true,
  "order": 15,
  "title": "Карта публичного API",
  "concept": "Справочник",
  "description": "Найдём нужный модуль и урок с примерами его использования.",
  "takeaway": [
    "Импортируем API из пакета нужной подсистемы.",
    "При работе с объектом учитываем его параметры, время жизни и очистку."
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

SDK предоставляет корневой импорт `@gamedevland/engine` и публичные пути подсистем. Импортируем через эти входы, не через внутренние папки `src` или `dist`. Например:

```ts
import { Engine } from '@gamedevland/engine';
import { BaseTypedCommand } from '@gamedevland/engine/commands';
import { SchemaDecoder } from '@gamedevland/engine/validation';
import type { GameConfig } from '@gamedevland/engine/core';
```

<figure class="sdk-figure is-matrix"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>Запуск и данные</strong><span>core · assets · configs · validation</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>Управление</strong><span>scenes · di · events · fsm · commands · errors</span></div></div><div class="sdk-figure__item tone-green"><div><strong>Представление</strong><span>layouts · prefabs · screen · input · interactions · tween</span></div></div><div class="sdk-figure__item tone-amber"><div><strong>Игровые системы</strong><span>audio · particles · physics · platforms</span></div></div></div><figcaption>Выбираем задачу и находим нужный модуль.</figcaption></figure>

Ниже перечислено API всех 20 модулей движка. У каждого модуля есть ссылка на урок с объяснением и примерами.

## Как пользоваться картой

1. Выберем модуль по задаче: например, `audio` для звука.
2. Откроем связанный урок и найдём пример вызова.
3. Уточним параметры и результат метода через подсказки TypeScript в редакторе.
4. Учтём, когда объект создаётся и кто освобождает его ресурсы.

Пути подсистем помогают организовать импорт. Устанавливать каждый модуль отдельно не нужно: все они входят в `@gamedevland/engine`.
