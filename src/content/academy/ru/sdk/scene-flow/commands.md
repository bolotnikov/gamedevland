---
{
  "locale": "ru",
  "translationKey": "sdk/scene-flow/commands",
  "course": "sdk",
  "lesson": "scene-flow",
  "draft": false,
  "order": 9,
  "title": "Команды сцены",
  "concept": "BaseCommand и BaseTypedCommand",
  "description": "Передадим команде координаты и слот фигуры.",
  "takeaway": [
    "Декодер проверяет данные события до вызова команды."
  ],
  "sources": [
    {
      "title": "SDK · CommandBus.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/commands/CommandBus.ts",
      "note": "Создание команды и привязка контекста."
    },
    {
      "title": "SDK · BaseTypedCommand.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/commands/BaseTypedCommand.ts",
      "note": "Декодирование перед execute."
    },
    {
      "title": "Block Puzzle · PlaceBlockCommand.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/commands/PlaceBlockCommand.ts",
      "note": "Команда игры."
    }
  ]
}
---

<aside class="lesson-note is-green" aria-labelledby="lesson-purpose">
  <h3 id="lesson-purpose">Зачем это нужно</h3>
  <p>FSM решает, когда запускать команду. Команда берёт данные события и передаёт их игровому сервису.</p>
</aside>

`CommandBus` находит команду по имени из FSM и передаёт ей доступ к текущей сцене.

Для размещения нужны слот и координаты. В [PlaceBlockCommand.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/commands/PlaceBlockCommand.ts) используется `BaseTypedCommand`:

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

<figure class="sdk-figure is-flow"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">01</span><div><strong>FSM</strong><span>Запускает PlaceBlockCommand с событием</span></div></div><div class="sdk-figure__item tone-violet"><span class="sdk-figure__index">02</span><div><strong>inputDecoder</strong><span>Проверяет slotId и anchor</span></div></div><div class="sdk-figure__item tone-green"><span class="sdk-figure__index">03</span><div><strong>execute</strong><span>Получает проверенный payload</span></div></div><div class="sdk-figure__item tone-amber"><span class="sdk-figure__index">04</span><div><strong>Gameplay.place</strong><span>Проверяет фигуру и свободные клетки, применяет ход</span></div></div></div><figcaption>Проверка структуры происходит до execute; проверка правил — внутри сервиса и домена.</figcaption></figure>

В `CommandsGroup` укажем то же имя команды, что и в конфиге FSM.

`BaseTypedCommand` проверяет данные через `inputDecoder` перед вызовом `execute`.

Если команда возвращает Promise, FSM ждёт её завершения перед обработкой следующего события.
