---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 11,
  "title": "Кадр стека: что движок хранит для вызова",
  "concept": "Параметры и возврат",
  "description": "Аргументы, локальные значения и место возврата у каждого вызова свои.",
  "takeaway": "Кадр стека хранит состояние конкретного вызова функции: данные, нужные для её выполнения, и сведения о том, куда вернуться после return.",
  "sources": [
    {
      "title": "ECMA-262 · Execution Contexts",
      "url": "https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-execution-contexts",
      "note": "Как спецификация описывает состояние отдельных вызовов и стек контекстов исполнения."
    },
    {
      "title": "V8 · Stack frames",
      "url": "https://v8.dev/blog/sparkplug#interpreter-compatible-frames",
      "note": "Команда V8 о состоянии вызова, локальных значениях и возврате управления."
    }
  ],
  "locale": "ru",
  "translationKey": "javascript/engine/stack-frame"
}
---


В предыдущем уроке мы рассмотрели Call Stack — стек вызовов. Каждая запись в нём должна помогать движку продолжить конкретный вызов: помнить его данные и куда вернуть управление.

<aside class="lesson-note" aria-labelledby="stack-frame-note-title">
  <span class="lesson-note__label">Термин</span><h3 id="stack-frame-note-title">Кадр стека (stack frame)</h3>
  <p>Данные, которые движок сохраняет для отдельного вызова функции. В учебной модели это аргументы, локальные значения, текущая позиция выполнения и место возврата после <code>return</code>.</p>
</aside>

Рассмотрим два вызова одной функции:

```js
function double(value) {
  const result = value * 2;
  return result;
}
const first = double(3);
const second = double(8);
```

1. При `double(3)` движку нужны значения `value = 3` и `result = 6`. После `return` число `6` попадёт в `first`.
2. Первый вызов завершается, его кадр снимается со стека.
3. Вызов `double(8)` получает свой кадр: теперь `value = 8`, `result = 16`, а результат нужно вернуть в `second`.

<figure class="frame-map" aria-label="Два последовательных вызова double имеют свои аргументы, локальные значения и места возврата">
  <div class="frame-map__snapshot">
    <span>Первый вызов · перед return</span>
    <div class="frame-map__frame"><strong>Кадр double(3)</strong><dl><div><dt>Аргумент</dt><dd><code>value = 3</code></dd></div><div><dt>Локальное значение</dt><dd><code>result = 6</code></dd></div><div><dt>Куда вернуть результат</dt><dd>В присваивание <code>first</code></dd></div></dl></div>
    <div class="frame-map__return"><span aria-hidden="true">↓</span><code>return 6</code><span>После возврата: <code>first = 6</code></span></div>
  </div>
  <div class="frame-map__snapshot">
    <span>Следующий вызов · перед return</span>
    <div class="frame-map__frame"><strong>Кадр double(8)</strong><dl><div><dt>Аргумент</dt><dd><code>value = 8</code></dd></div><div><dt>Локальное значение</dt><dd><code>result = 16</code></dd></div><div><dt>Куда вернуть результат</dt><dd>В присваивание <code>second</code></dd></div></dl></div>
    <div class="frame-map__return"><span aria-hidden="true">↓</span><code>return 16</code><span>После возврата: <code>second = 16</code></span></div>
  </div>
  <figcaption>Два момента выполнения программы. Первый вызов уже завершён, когда начинается второй. Показаны данные вызовов, а не точное расположение памяти V8.</figcaption>
</figure>

При вложенных вызовах кадр вызывающей функции остаётся в стеке, пока выполняется вызванная. Благодаря этому после `return` движок может продолжить предыдущую функцию с её данными. Это работает и при рекурсии, когда функция вызывает саму себя.

Спецификация описывает состояние выполнения через [контексты исполнения](https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-execution-contexts). Кадры стека — способ организовать это состояние внутри движка.
