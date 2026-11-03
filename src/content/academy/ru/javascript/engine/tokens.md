---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 3,
  "title": "Scanner: узнаём слова языка",
  "concept": "Исходный текст → токены",
  "description": "Разделяем символы на ключевые слова, имена, операторы и литералы.",
  "takeaway": "Токенизация распознаёт элементы языка, но сама по себе ещё не вычисляет выражение.",
  "sources": [
    {
      "title": "V8 · Scanner",
      "url": "https://v8.dev/blog/scanner",
      "note": "Команда V8 о токенизации и пути от текста к AST."
    },
    {
      "title": "ECMA-262 · Lexical Grammar",
      "url": "https://tc39.es/ecma262/multipage/ecmascript-language-lexical-grammar.html",
      "note": "Нормативные правила токенов, комментариев и переносов строк."
    }
  ],
  "simulation": "tokens",
  "locale": "ru",
  "translationKey": "javascript/engine/tokens"
}
---


Прежде чем понять выражение, нужно выделить его части. В `const hp = 10;` [scanner](https://v8.dev/blog/scanner) распознаёт `const`, идентификатор `hp`, знак `=`, числовой литерал `10` и `;`.

Пробелы помогают разделять элементы, но не все правила сводятся к пробелам. Есть строки, комментарии, Unicode, контекст для `/` и переносы строк, значимые для [automatic semicolon insertion](https://tc39.es/ecma262/multipage/ecmascript-language-lexical-grammar.html#sec-automatic-semicolon-insertion). Поэтому «разбить текст по пробелам» — не написать JS-parser.

```js
const hp = 10;
// const · hp · = · 10 · ;
```

[Scanner](https://v8.dev/blog/scanner) отвечает на вопрос **«какие элементы перед нами?»**. Parser — на следующий: **«какую конструкцию они образуют?»**. Обработка исходного текста и выполнение программы — разные задачи: scanner и parser не выполняют игровую логику.

**В симуляции** рассмотрим токены последовательно. Это фиксированный учебный пример, а не универсальный scanner.
