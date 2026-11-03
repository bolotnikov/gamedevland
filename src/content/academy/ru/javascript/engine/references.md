---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 13,
  "title": "Изменить объект или заменить ссылку?",
  "concept": "Идентичность и присваивание",
  "description": "Почему const не делает объект неизменяемым.",
  "takeaway": "Присваивание другого значения одной переменной не меняет значения остальных переменных.",
  "sources": [
    {
      "title": "ECMA-262 · Object Type",
      "url": "https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-object-type",
      "note": "Свойства и идентичность объектов; физическое размещение памяти не предписано."
    },
    {
      "title": "ECMA-262 · Declarative Environment Records",
      "url": "https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-declarative-environment-records",
      "note": "Создание и изменение bindings, включая immutable bindings."
    }
  ],
  "simulation": "references",
  "locale": "ru",
  "translationKey": "javascript/engine/references"
}
---


[`const`](https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-declarative-environment-records) запрещает переназначать binding, но не замораживает объект. `player.hp = 50` меняет свойство, а `target = null` меняет значение другой переменной.

```js
const player = { hp: 100 };
let target = player;
target.hp = 50;
target = null;
// player.hp is 50; the object is still reachable
```

После изменения свойства оба пути видят `hp: 50`. После `target = null` только одна стрелка исчезает. Объект всё ещё доступен через `player`.

Это помогает читать код игровых сервисов: очищение локальной переменной не очищает массив врагов, event listener или кэш, где осталась другая связь. И наоборот, замена поля сервиса не обязана менять ранее переданный объект.

При передаче аргумента JavaScript передаёт **значение**; для объекта это значение сохраняет его идентичность. Возможность изменить общий объект не означает возможность переназначить binding вызывающей функции.
