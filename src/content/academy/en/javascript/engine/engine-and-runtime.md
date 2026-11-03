---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 1,
  "title": "The engine lives inside a runtime",
  "concept": "Start with the boundaries",
  "description": "What executes JavaScript, and where V8’s responsibility ends.",
  "takeaway": "ECMAScript defines language behavior. An engine implements it. A host supplies external APIs.",
  "sources": [
    {
      "title": "ECMA-262 · Hosts and Implementations",
      "url": "https://tc39.es/ecma262/multipage/overview.html#sec-hosts-and-implementations",
      "note": "Distinguishes the language, its implementation, and its host."
    },
    {
      "title": "V8 · Engine overview",
      "url": "https://v8.dev/",
      "note": "Documentation of the V8 implementation, not a normative description of all JavaScript engines."
    }
  ],
  "simulation": "runtime",
  "locale": "en",
  "translationKey": "javascript/engine/engine-and-runtime"
}
---

A CPU does not execute JavaScript source code directly. An **engine** prepares and executes the program while managing objects and memory. [V8](https://v8.dev/) is one implementation; [JavaScriptCore](https://docs.webkit.org/Deep%20Dive/JSC/JavaScriptCore.html) and [SpiderMonkey](https://spidermonkey.dev/) implement the same language in their own ways.

**[ECMAScript](https://tc39.es/ecma262/multipage/)** specifies the semantics of the language. A **[runtime](https://tc39.es/ecma262/multipage/overview.html#sec-hosts-and-implementations)** embeds an engine and gives programs additional capabilities. In a browser, these include the [DOM](https://dom.spec.whatwg.org/), timers, and resource loading. [Node.js](https://nodejs.org/api/) provides a different set of external APIs.

```js
const player = { hp: 100 }; // Language values and objects
setTimeout(() => player.hp -= 10, 100); // Host timer API
```

This is a useful boundary in a game SDK: combat rules can work without the DOM, while a browser adapter owns the canvas and input. V8 itself is neither a browser nor the PixiJS renderer.

Let’s examine the three layers in the diagram. Switching between them shows which part of the work each layer handles.
