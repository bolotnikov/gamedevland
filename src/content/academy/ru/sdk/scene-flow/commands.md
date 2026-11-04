---
{
  "locale": "ru",
  "translationKey": "sdk/scene-flow/commands",
  "course": "sdk",
  "lesson": "scene-flow",
  "draft": true,
  "order": 8,
  "title": "Команда выполняет одну операцию",
  "concept": "BaseCommand и BaseTypedCommand",
  "description": "Соединим событие FSM с типизированным вызовом сервиса.",
  "takeaway": [
    "Команда — короткий шаг сценария.",
    "Структура входа проверяется до выполнения операции."
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
  <p>Событие может требовать нескольких операций над игровыми сервисами. Оформим такую реакцию отдельной командой: FSM задаёт порядок, а команда выполняет конкретный шаг сценария.</p>
</aside>

`CommandBus` находит команду по имени из FSM, создаёт её через DI и передаёт контекст сцены. Команда не должна заново находить весь игровой мир.

Команда Block Puzzle из [CheckBlockPuzzleMovesCommand.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/commands/CheckBlockPuzzleMovesCommand.ts):

```ts
import { BaseCommand } from '@gamedevland/engine/commands';

import { BlockPuzzleServices } from '../BlockPuzzleServices';

export class CheckBlockPuzzleMovesCommand extends BaseCommand {
  override run(): void {
    this.getSceneService(BlockPuzzleServices.Gameplay).emitMoveAvailability();
  }
}
```

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

Контекст предоставляет `engine`, `layout`, `assets`, `sceneDi` и `sceneParams`. `getSceneService(token)` возвращает обязательную зависимость и сообщает об ошибке, если регистрация отсутствует.

Имя команды должно быть зарегистрировано в `CommandsGroup`. В новом проекте лучше сохранить явное стабильное имя, совпадающее с конфигурацией FSM. Не нужно запускать команду через `new` из компонента: тогда пришлось бы вручную подготавливать её контекст.

`BaseTypedCommand` сам извлекает payload из оболочки события FSM. Не следует повторять это в `execute` или приводить `unknown` к интерфейсу. Одна схема `PlacementRequest` используется и для проверки, и для вывода типа.

Команда может возвращать Promise. FSM дождётся её завершения; поэтому длительная анимация внутри команды также задержит последующие события этой FSM.
