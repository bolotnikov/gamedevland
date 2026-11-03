---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 4,
  "title": "AST: structure instead of a string",
  "concept": "The syntax tree",
  "description": "Why 2 + 3 * 4 and (2 + 3) * 4 are different programs.",
  "takeaway": "Precedence and parentheses determine an expression’s structure before it executes.",
  "sources": [
    {
      "title": "ECMA-262 · Additive Operators",
      "url": "https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-additive-operators",
      "note": "The addition grammar uses multiplicative expressions and determines grouping."
    },
    {
      "title": "V8 · Scanner",
      "url": "https://v8.dev/blog/scanner",
      "note": "The V8 team explains tokenization and the path from text to AST."
    }
  ],
  "simulation": "ast",
  "locale": "en",
  "translationKey": "javascript/engine/abstract-syntax-tree"
}
---

An **[Abstract Syntax Tree](https://v8.dev/blog/scanner)** stores a program’s essential structure. For `2 + 3 * 4`, the top-level operation is addition, with multiplication as its right operand. For `(2 + 3) * 4`, multiplication becomes the top-level operation.

Parentheses change grouping. In an abstract tree, the parentheses themselves need not become separate nodes: their meaning is already represented by relationships between nodes. The exact AST format is implementation-specific; our diagram uses illustrative node names.

```js
const first = 2 + 3 * 4;   // 14
const second = (2 + 3) * 4; // 20
```

[ECMA-262](https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-additive-operators) specifies expression grammar and semantics, but does not require all engines to use identical ASTs. This also matters when using AST tools: a Babel or ESTree tree need not match V8’s internal tree.

First, let’s determine how adding parentheses changes the tree. Then we will switch expressions and compare the result with the diagram.
