---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 3,
  "title": "Scanner: recognizing the language’s words",
  "concept": "Source text → tokens",
  "description": "Separating characters into keywords, names, operators, and literals.",
  "takeaway": "Tokenization recognizes language elements; it does not itself evaluate the expression.",
  "sources": [
    {
      "title": "V8 · Scanner",
      "url": "https://v8.dev/blog/scanner",
      "note": "The V8 team explains tokenization and the path from text to AST."
    },
    {
      "title": "ECMA-262 · Lexical Grammar",
      "url": "https://tc39.es/ecma262/multipage/ecmascript-language-lexical-grammar.html",
      "note": "Normative rules for tokens, comments, and line terminators."
    }
  ],
  "simulation": "tokens",
  "locale": "en",
  "translationKey": "javascript/engine/tokens"
}
---

Before understanding an expression, the engine must identify its parts. In `const hp = 10;`, the [scanner](https://v8.dev/blog/scanner) recognizes `const`, the identifier `hp`, the `=` sign, the numeric literal `10`, and `;`.

Whitespace helps separate elements, but the rules go beyond spaces. There are strings, comments, Unicode, context for `/`, and line breaks that matter for [automatic semicolon insertion](https://tc39.es/ecma262/multipage/ecmascript-language-lexical-grammar.html#sec-automatic-semicolon-insertion). “Split the text on spaces” is therefore not a JavaScript parser.

```js
const hp = 10;
// const · hp · = · 10 · ;
```

The scanner answers **“What elements are these?”** The parser then answers **“What construct do they form?”** Processing source text and executing a program are different tasks: the scanner and parser do not execute game logic.

**In the simulation**, we will examine the tokens one by one. This is a fixed teaching example, not a general-purpose scanner.
