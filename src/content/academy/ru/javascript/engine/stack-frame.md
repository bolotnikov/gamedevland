---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 11,
  "title": "Кадр стека — это состояние вызова",
  "concept": "Параметры и возврат",
  "description": "Одна функция, два вызова, два независимых набора данных.",
  "takeaway": "Локальное состояние принадлежит конкретному вызову; его физическое размещение зависит от движка.",
  "sources": [
    {
      "title": "ECMA-262 · Execution Contexts",
      "url": "https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-execution-contexts",
      "note": "Абстрактная модель контекстов исполнения и их стека."
    }
  ],
  "simulation": "frames",
  "locale": "ru",
  "translationKey": "javascript/engine/stack-frame"
}
---


Вызовы одной функции не делят единственный набор параметров. У каждого вызова есть своё состояние исполнения: аргументы, текущая операция и место возврата.

```js
function double(value) {
  const result = value * 2;
  return result;
}
const first = double(3);
const second = double(8);
```

В первом вызове `value` равно `3`, во втором — `8`. Возвращаемые значения — `6` и `16`. **[Execution context](https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-execution-contexts)** — понятие спецификации; stack frame — деталь реализации, которую удобно использовать в модели.

Из этого не следует, что любая локальная переменная физически находится на стеке. Значение может находиться в регистре, быть устранено оптимизацией или сохраняться в окружении, доступном замыканию. Семантика времени жизни и способ хранения — разные уровни объяснения.

В следующем уроке про контексты мы разберём окружения подробно. Сейчас важно различать отдельный вызов и объект функции.
