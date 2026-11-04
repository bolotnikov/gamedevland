---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 4,
  "title": "AST: the structure of a program",
  "concept": "Syntax tree",
  "description": "Why 2 + 3 * 4 and (2 + 3) * 4 describe different computations.",
  "takeaway": "An AST represents a program as a tree: nodes describe its constructs, and connections show how they are nested. V8 uses this tree as the basis for generating bytecode.",
  "sources": [
    {
      "title": "ECMA-262 · Additive Operators",
      "url": "https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-additive-operators",
      "note": "The addition grammar uses multiplicative expressions to define grouping."
    },
    {
      "title": "V8 · Scanner",
      "url": "https://v8.dev/blog/scanner",
      "note": "The V8 team's explanation of tokenization and the path from source text to an AST."
    }
  ],
  "simulation": "ast",
  "locale": "en",
  "translationKey": "javascript/engine/abstract-syntax-tree"
}
---


In the previous lesson, the scanner split the source text into tokens. The parser now processes those tokens according to JavaScript's grammar and builds an **[abstract syntax tree (AST)](https://v8.dev/blog/scanner)**.

Tree nodes represent program constructs: variable declarations, function calls, and operations. Connections between nodes show how these constructs are nested.

Consider the expression `2 + 3 * 4`. The top-level operation in its tree is addition; its right operand is the result of multiplication. In `(2 + 3) * 4` the top-level operation is multiplication.

Parentheses change grouping. Their characters may not appear as separate AST nodes because their meaning is already captured by the connections between nodes. The exact AST format depends on the implementation; the node names in our diagram are illustrative.

```js
const first = 2 + 3 * 4;   // 14
const second = (2 + 3) * 4; // 20
```

[ECMA-262](https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-additive-operators) defines the grammar and semantics of expressions but does not require every engine to use the same AST. This also matters when working with AST tools: Babel or ESTree trees need not match V8's internal tree.

First, we will work out how adding parentheses changes the tree. Then we will switch expressions and compare the result with the diagram.
