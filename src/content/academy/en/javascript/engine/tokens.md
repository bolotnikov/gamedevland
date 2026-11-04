---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 3,
  "title": "Scanner: recognizing language elements",
  "concept": "Source text → tokens",
  "description": "Recognizing keywords, names, operators, and literals in a sequence of characters.",
  "takeaway": "Tokenization recognizes language elements; it does not evaluate the expression itself.",
  "sources": [
    {
      "title": "V8 · Scanner",
      "url": "https://v8.dev/blog/scanner",
      "note": "The V8 team's explanation of tokenization and the path from source text to an AST."
    },
    {
      "title": "ECMA-262 · Lexical Grammar",
      "url": "https://tc39.es/ecma262/multipage/ecmascript-language-lexical-grammar.html",
      "note": "The normative rules for tokens, comments, and line breaks."
    }
  ],
  "simulation": "token-scanner",
  "locale": "en",
  "translationKey": "javascript/engine/tokens"
}
---


Before understanding an expression, we need to identify its parts. In `const hp = 10;` the [scanner](https://v8.dev/blog/scanner) recognizes ` const`, the identifier ` hp`, the symbol `=`, the numeric literal `10` and `;`.

Spaces help separate elements, but the rules cover more than spaces. They also account for strings, comments, Unicode, the context of `/`, and line breaks that matter for [automatic semicolon insertion](https://tc39.es/ecma262/multipage/ecmascript-language-lexical-grammar.html#sec-automatic-semicolon-insertion). Splitting text on spaces is therefore not enough to build a JavaScript parser.

```js
const hp = 10;
// const · hp · = · 10 · ;
```

[The scanner](https://v8.dev/blog/scanner) answers the question **“Which elements are present?”**. The parser answers the next question: **“Which construct do they form?”**. Processing source text and executing a program are different tasks: the scanner and parser do not run game logic.

**In the simulation** we will examine the tokens one at a time. This is a fixed teaching example, not a general-purpose scanner.
