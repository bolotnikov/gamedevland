---
{
  "locale": "ru",
  "translationKey": "sdk/foundations/schema-decoder",
  "course": "sdk",
  "lesson": "foundations",
  "draft": false,
  "order": 8,
  "title": "Проверяем данные схемой",
  "concept": "SchemaDecoder",
  "description": "Одна схема задаёт проверку во время работы и тип TypeScript.",
  "takeaway": [
    "Схема проверяет вход во время работы.",
    "InferDecoded связывает результат проверки с типом TypeScript."
  ],
  "sources": [
    {
      "title": "SDK · SchemaDecoder.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/validation/schema/SchemaDecoder.ts",
      "note": "Комбинаторы и выполнение проверки."
    },
    {
      "title": "Block Puzzle · event.schemas.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/configs/event.schemas.ts",
      "note": "Граница между формой запроса и правилами размещения."
    }
  ]
}
---

<aside class="lesson-note is-green" aria-labelledby="lesson-purpose">
  <h3 id="lesson-purpose">Зачем это нужно</h3>
  <p>JSON и данные событий могут содержать неверные значения. TypeScript проверяет исходный код, но не содержимое загруженного файла. Проверка при получении данных помогает обнаружить ошибку до того, как игра начнёт их использовать.</p>
</aside>

`SchemaDecoder` проверяет вход и возвращает данные нужной структуры.

<aside class="lesson-note" aria-labelledby="decoder-term"><span class="lesson-note__label">Термин</span><h3 id="decoder-term">Декодер</h3><p>Функция, которая принимает неизвестные данные и либо возвращает проверенное значение, либо сообщает об ошибке.</p></aside>

В [schemas.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/configs/schemas.ts#L18) ширина и высота поля проверяются как положительные целые числа. Для примера выделим эту проверку в `BoardSchema`:

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

`InferDecoded` выводит тип из схемы: отдельный интерфейс с теми же полями не нужен.

<figure class="sdk-figure is-flow"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">01</span><div><strong>unknown</strong><span>Например, { width: 8, height: &quot;8&quot; }</span></div></div><div class="sdk-figure__item tone-violet"><span class="sdk-figure__index">02</span><div><strong>SchemaDecoder.decode</strong><span>Проверяет поля, типы и ограничения</span></div></div><div class="sdk-figure__item tone-green"><span class="sdk-figure__index">03</span><div><strong>Результат или ошибка</strong><span>Строка &quot;8&quot; не становится числом автоматически</span></div></div></div><figcaption>Декодирование проверяет структуру данных. Домен игры позже проверит допустимость самого хода.</figcaption></figure>

Теперь проверим данные из JSON:

```ts
const board = SchemaDecoder.decode(raw, BoardSchema.decoder, 'board.json');
```

`raw` здесь — вход типа `unknown`. Метка `board.json` помогает найти источник ошибки.

Комбинаторы `object`, `readonlyArray`, `string`, `number`, `boolean`, `record`, `optional` и `enumOf` позволяют описать вложенные структуры. Ограничения описывают допустимые значения: например, номер слота — целое число от 0 до 2. Проверку «фигура помещается в свободные клетки» выполняет доменная модель, потому что она зависит от текущего поля.
