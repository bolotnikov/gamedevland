---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 7,
  "title": "Как работает интерпретатор",
  "concept": "Исполнение байткода",
  "description": "Как Ignition выполняет инструкции байткода и получает результат функции.",
  "takeaway": "Ignition читает инструкцию, выполняет её обработчик и переходит к следующей. CPU исполняет машинный код обработчиков интерпретатора.",
  "sources": [
    {
      "title": "V8 · Ignition",
      "url": "https://v8.dev/docs/ignition",
      "note": "Официальное описание регистрового интерпретатора."
    },
    {
      "title": "V8 · Обработчики и аккумулятор Ignition",
      "url": "https://v8.dev/blog/ignition-interpreter#details",
      "note": "Обработчики инструкций выполняют операции; аккумулятор хранит промежуточные результаты."
    }
  ],
  "simulation": "interpreter-trace",
  "locale": "ru",
  "translationKey": "javascript/engine/interpreter"
}
---


В прошлом уроке мы получили байткод из AST. Теперь **[Ignition](https://v8.dev/docs/ignition)** читает инструкции этого байткода и по очереди выполняет указанные операции.

У каждой инструкции есть **обработчик** — часть интерпретатора, которая выполняет эту операцию. CPU исполняет машинный код обработчиков Ignition.

<aside class="lesson-note" aria-labelledby="accumulator-note-title">
  <span class="lesson-note__label">Термин</span><h3 id="accumulator-note-title">Аккумулятор</h3>
  <p><a href="https://v8.dev/blog/ignition-interpreter#details">Место, где интерпретатор хранит текущий промежуточный результат.</a> Следующая инструкция может использовать или изменить это значение.</p>
</aside>

Рассмотрим функцию `add(a, b)`, которая возвращает сумму аргументов. При вызове `add(2, 3)` инструкции сначала загрузят `2`, затем прибавят `3` и вернут `5`.
