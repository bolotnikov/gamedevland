---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 6,
  "title": "Байткод: инструкции для Ignition",
  "concept": "AST → инструкции",
  "description": "Промежуточное представление, которое не равно машинному коду.",
  "takeaway": "Байткод V8 — внутренняя форма программы; CPU не исполняет его как нативные инструкции.",
  "sources": [
    {
      "title": "V8 · Ignition",
      "url": "https://v8.dev/docs/ignition",
      "note": "Официальное описание регистрового интерпретатора."
    },
    {
      "title": "V8 · Ignition design",
      "url": "https://v8.dev/blog/ignition-interpreter",
      "note": "Мотивация байткода и устройство интерпретатора V8."
    },
    {
      "title": "V8 · Встраивание виртуальной машины",
      "url": "https://v8.dev/docs/embed#advanced-guide",
      "note": "Официальная документация называет сам V8 виртуальной машиной и описывает его встраивание в приложение."
    }
  ],
  "simulation": "bytecode",
  "locale": "ru",
  "translationKey": "javascript/engine/bytecode"
}
---


Байткод — компактные инструкции, которые в V8 выполняет интерпретатор **[Ignition](https://v8.dev/docs/ignition)**. Например, сложение двух значений можно представить как последовательность операций: получить аргумент, прибавить второй, вернуть результат.

<aside class="lesson-note" aria-labelledby="virtual-machine-note-title">
  <span class="lesson-note__label">Термин</span><h3 id="virtual-machine-note-title">Виртуальная машина</h3>
  <p><strong>Виртуальная машина JavaScript</strong> — программная система, которая выполняет JavaScript, управляет его объектами, памятью и вызовами функций. В данном случае виртуальной машиной называют сам <a href="https://v8.dev/docs/embed#advanced-guide">V8</a>.</p>
  <p><strong>«Движок» и «виртуальная машина»</strong> здесь — два названия одной системы с разным акцентом: движок реализует язык, виртуальная машина предоставляет программный механизм его выполнения.</p>
  <p><strong>Ignition</strong> — интерпретатор байткода в составе V8. Он читает инструкции байткода и выполняет соответствующие операции.</p>
</aside>

<figure class="runtime-map runtime-map--static" aria-label="Среда исполнения содержит V8, а V8 содержит Ignition и другие компоненты">
  <div class="runtime-map__host tone-green">
    <div class="runtime-map__host-heading"><div><strong>Браузер с V8</strong><p>Среда исполнения</p></div></div>
    <div class="runtime-map__host runtime-map__engine tone-violet">
      <div class="runtime-map__host-heading"><div><strong>V8</strong><p>Движок / виртуальная машина JavaScript</p></div></div>
      <div class="runtime-map__node tone-cyan"><div><strong>Ignition</strong><p>Интерпретатор байткода</p></div></div>
      <p>Также в составе V8: сканер, парсер, JIT-компиляторы и сборщик мусора.</p>
    </div>
  </div>
</figure>

```js
function add(a, b) {
  return a + b;
}
```

Ниже показан **псевдобайткод**, а не вывод конкретной версии V8. Аккумулятор в схеме — место для хранения текущего промежуточного результата.

Нужно различать три вещи: **текст программы**, **байткод для интерпретатора** и **машинный код для CPU**. Компактная промежуточная форма помогает начать выполнение без немедленного запуска дорогого оптимизирующего компилятора.

В симуляции аргументы равны `2` и `3`. Пройдём инструкции последовательно и определим, на каком шаге появляется результат.
