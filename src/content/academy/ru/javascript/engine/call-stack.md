---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 10,
  "title": "Call Stack: кто выполняется сейчас",
  "concept": "Вызов → возврат",
  "description": "Добавляем и снимаем кадры стека в правильном порядке.",
  "takeaway": "Вложенный вызов выполняется раньше, чем продолжится вызвавшая его функция.",
  "sources": [
    {
      "title": "ECMA-262 · Execution Contexts",
      "url": "https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-execution-contexts",
      "note": "Контексты исполнения и их стек в спецификации."
    }
  ],
  "simulation": "stack",
  "locale": "ru",
  "translationKey": "javascript/engine/call-stack"
}
---


Когда `start()` вызывает `update()`, выполнение `start()` ждёт возврата. Когда `update()` вызывает `damage()`, текущей становится `damage()`. После возврата управление идёт в обратном порядке.

```js
function damage() { return 10; }
function update() { return damage(); }
function start() { return update(); }
start();
```

Это принцип **LIFO: last in, first out**. Стек помогает помнить, где продолжить выполнение после вложенного вызова. В [ECMA-262](https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-execution-contexts) есть стек execution contexts; реальные машинные кадры V8 могут отличаться из-за inlining и других оптимизаций.

В симуляции `script` — условная нижняя граница выполняемого скрипта. С помощью кнопки «Следующее действие» проследим, как меняется верхний кадр. Здесь показан логический порядок вызовов, а не дамп нативного стека.

Если синхронный вызов долго не возвращается, следующий JS-callback на том же потоке сам по себе его не прервёт.
