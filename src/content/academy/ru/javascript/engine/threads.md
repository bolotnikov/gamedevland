---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 16,
  "title": "Один JS-поток ≠ один поток во всём движке",
  "concept": "Параллельность и окружение",
  "description": "Отделяем последовательность JS-вызовов от фоновой работы V8.",
  "takeaway": "Фоновая компиляция и GC не превращают синхронный update в параллельную функцию.",
  "sources": [
    {
      "title": "ECMA-262 · Agents",
      "url": "https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-agents",
      "note": "Модель агентов ECMAScript."
    },
    {
      "title": "HTML Standard · Web Workers",
      "url": "https://html.spec.whatwg.org/multipage/workers.html#workers",
      "note": "Нормативная модель Workers."
    },
    {
      "title": "V8 · Orinoco GC",
      "url": "https://v8.dev/blog/trash-talk",
      "note": "Достижимость, поколения и параллельная/конкурентная работа сборщика."
    }
  ],
  "simulation": "threads",
  "locale": "ru",
  "translationKey": "javascript/engine/threads"
}
---


Говоря «JavaScript однопоточный», обычно имеют в виду последовательное выполнение кода внутри конкретного agent. Это не означает, что весь браузер или весь V8 работают на одном потоке.

Движок может готовить код и выполнять часть сборки мусора в фоне. Браузер отдельно организует сеть, отображение и другие подсистемы. **[Web Worker](https://html.spec.whatwg.org/multipage/workers.html#workers)** создаёт дополнительный контекст для JS с собственной средой исполнения; взаимодействие обычно идёт сообщениями.

```js
async function buildMap() {
  return generateMap(); // Still runs on the calling JS thread
}
```

`async` меняет контракт результата, но не переносит вычисление `generateMap()` в Worker. Для игровой генерации нужно явно выбрать место и способ работы, учесть передачу данных и поддержку среды.

В схеме переключаются роли, а не измеряется реальная загрузка потоков. Планирование задач и microtasks подробно изучим в Event Loop.
