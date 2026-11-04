---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 6,
  "title": "Байткод: инструкции для Ignition",
  "concept": "AST → инструкции",
  "description": "Как генератор байткода превращает AST в инструкции для Ignition.",
  "takeaway": "Байткод — инструкции для Ignition. Генератор байткода создаёт их из AST, подготовленного парсером.",
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
    },
    {
      "title": "V8 · Генерация байткода из AST",
      "url": "https://v8.dev/blog/background-compilation#building-a-background-thread-bytecode-compiler",
      "note": "Генератор получает AST от парсера и создаёт последовательность инструкций для Ignition."
    }
  ],
  "locale": "ru",
  "translationKey": "javascript/engine/bytecode"
}
---


Байткод — компактные инструкции для интерпретатора **[Ignition](https://v8.dev/docs/ignition)**. В них записано, какие операции нужно выполнить: получить значение, сложить числа, вызвать функцию или вернуть результат.

<aside class="lesson-note" aria-labelledby="bytecode-generator-note-title">
  <span class="lesson-note__label">Термин</span><h3 id="bytecode-generator-note-title">Генератор байткода</h3>
  <p><a href="https://v8.dev/blog/background-compilation#building-a-background-thread-bytecode-compiler">Компонент V8, который получает AST от парсера и создаёт байткод.</a> Он обходит дерево и записывает инструкции для конструкций программы.</p>
</aside>

<div class="bytecode-origin" role="img" aria-label="Парсер строит AST, генератор байткода превращает дерево в инструкции, Ignition выполняет эти инструкции">
  <div><strong>Парсер</strong><span>Строит AST</span></div><b aria-hidden="true">→</b><div class="is-generator"><strong>Генератор байткода</strong><span>AST → инструкции</span></div><b aria-hidden="true">→</b><div><strong>Ignition</strong><span>Выполняет инструкции</span></div>
</div>

<aside class="lesson-note" aria-labelledby="virtual-machine-note-title">
  <span class="lesson-note__label">Термин</span><h3 id="virtual-machine-note-title">Виртуальная машина</h3>
  <p>Программная система, которая выполняет JavaScript и управляет памятью и вызовами функций. Так называют сам <a href="https://v8.dev/docs/embed#advanced-guide">V8</a>: «движок» и «виртуальная машина» здесь — два названия одной системы. <strong>Ignition</strong> — интерпретатор байткода в её составе.</p>
</aside>

```js
function add(a, b) {
  return a + b;
}
```

Для этой функции генератор создаёт инструкции со смыслом: получить `a`, прибавить `b`, вернуть результат. Байткод описывает эти действия, а выполняет их Ignition.

В [следующем уроке](../interpreter/) пройдём эти инструкции по очереди и посмотрим, как меняется результат.
