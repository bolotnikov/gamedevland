---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 4,
  "title": "AST: структура вместо строки",
  "concept": "Синтаксическое дерево",
  "description": "Почему 2 + 3 * 4 и (2 + 3) * 4 — разные программы.",
  "takeaway": "Приоритет и скобки определяют структуру выражения ещё до его исполнения.",
  "sources": [
    {
      "title": "ECMA-262 · Additive Operators",
      "url": "https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-additive-operators",
      "note": "Грамматика сложения использует multiplicative expressions и задаёт группировку."
    },
    {
      "title": "V8 · Scanner",
      "url": "https://v8.dev/blog/scanner",
      "note": "Команда V8 о токенизации и пути от текста к AST."
    }
  ],
  "simulation": "ast",
  "locale": "ru",
  "translationKey": "javascript/engine/abstract-syntax-tree"
}
---


**[Abstract Syntax Tree](https://v8.dev/blog/scanner)** хранит существенную структуру программы. Для `2 + 3 * 4` верхняя операция — сложение, а её правый операнд — результат умножения. В `(2 + 3) * 4` верхней операцией становится умножение.

Скобки меняют группировку. В абстрактном дереве сами символы скобок могут не становиться отдельными узлами: их смысл уже отражён отношениями между узлами. Формат конкретного AST зависит от реализации; имена узлов нашей схемы условные.

```js
const first = 2 + 3 * 4;   // 14
const second = (2 + 3) * 4; // 20
```

[ECMA-262](https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-additive-operators) задаёт грамматику и семантику выражений, но не требует от всех движков одинакового AST. Это важно и при работе с AST-инструментами: дерево Babel или ESTree не обязано совпадать с внутренним деревом V8.

Сначала определим, как изменится дерево при добавлении скобок. Затем переключим выражение и сравним результат со схемой.
