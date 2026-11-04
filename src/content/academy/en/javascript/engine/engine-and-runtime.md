---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 1,
  "title": "Language, engine, and runtime",
  "concept": "ECMAScript · Engine · Runtime",
  "description": "How JavaScript rules, a language implementation, and the program's environment differ.",
  "takeaway": [
    "ECMAScript is the language standard: its syntax and behavior are defined in the ECMA-262 specification.",
    "An engine implements the language rules and executes JavaScript. V8 is one implementation.",
    "A runtime embeds the engine and provides external APIs to the program."
  ],
  "sources": [
    {
      "title": "ECMA-262 · Hosts and Implementations",
      "url": "https://tc39.es/ecma262/multipage/overview.html#sec-hosts-and-implementations",
      "note": "Distinguishes the language, its implementation, and the host environment."
    },
    {
      "title": "V8 · Engine internals",
      "url": "https://v8.dev/",
      "note": "Documentation for the V8 implementation, rather than requirements for every JavaScript engine."
    },
    {
      "title": "HTML Standard · Timers",
      "url": "https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers",
      "note": "The browser environment provides the setTimeout and setInterval timers."
    }
  ],
  "locale": "en",
  "translationKey": "javascript/engine/engine-and-runtime"
}
---

JavaScript is a programming language. To understand how a program runs, we will distinguish three concepts: the language rules, the engine, and the runtime.

## ECMAScript: language rules

<a id="ecmascript-правила-языка" class="translation-anchor" aria-hidden="true"></a>

The core rules of JavaScript are defined in the **[ECMAScript specification, ECMA-262](https://tc39.es/ecma262/multipage/)**. It defines the language's syntax and behavior: how variables are declared, functions are called, and objects and operators work.

The specification describes what a program must do. It does not require a particular interpreter or compiler.

## Engine: implementing the language

<a id="движок-реализация-языка" class="translation-anchor" aria-hidden="true"></a>

**A JavaScript engine** implements these rules: it prepares and executes code and manages objects and memory. The CPU executes machine instructions; the engine organizes JavaScript execution through interpretation or compilation.

<figure class="machine-code-example" aria-labelledby="machine-code-example-title">
  <figcaption id="machine-code-example-title"><span class="machine-code-example__eyebrow">Example · x86-64 · 5 bytes</span><strong>One machine instruction</strong></figcaption>
  <div class="machine-code-example__legend"><span>Bytes in hexadecimal notation</span><span>The same bytes in binary below</span></div>
  <div class="machine-code-example__bytes" role="group" aria-label="Machine code: B8 2A 00 00 00">
    <div class="is-opcode"><code>B8</code><small>10111000</small></div>
    <div><code>2A</code><small>00101010</small></div>
    <div><code>00</code><small>00000000</small></div>
    <div><code>00</code><small>00000000</small></div>
    <div><code>00</code><small>00000000</small></div>
  </div>
  <div class="machine-code-example__meaning"><span>Readable notation · assembly</span><code>mov eax, 42</code><p>Write the number <strong>42</strong> to the CPU's <strong>EAX</strong> register.</p></div>
  <p class="machine-code-example__note">An actual encoding of the MOV instruction, chosen for this example. These bytes were not produced by compiling JavaScript in V8. <a href="https://www.intel.com/content/dam/www/public/us/en/documents/manuals/64-ia-32-architectures-software-developer-vol-2b-manual.pdf#page=37">Intel · MOV · volume 2B, page 4-35</a>.</p>
</figure>

<aside class="lesson-note" aria-labelledby="machine-code-note-title">
  <span class="lesson-note__label">Term</span><h3 id="machine-code-note-title">Machine code</h3>
  <p>A sequence of bytes encoding instructions for a specific processor architecture. The bytes above are written as hexadecimal numbers, a compact way to show the same bits.</p>
</aside>

**[V8](https://v8.dev/)** is one such engine. **[JavaScriptCore](https://docs.webkit.org/Deep%20Dive/JSC/JavaScriptCore.html)** and **[SpiderMonkey](https://spidermonkey.dev/)** are other implementations of the same language.

## Runtime: the execution environment

<a id="runtime-среда-исполнения" class="translation-anchor" aria-hidden="true"></a>

**[Runtime](https://tc39.es/ecma262/multipage/overview.html#sec-hosts-and-implementations)** is the environment that embeds the engine. It starts the program and provides additional APIs.

The browser provides [DOM](https://dom.spec.whatwg.org/), canvas, and timers. [Node.js](https://nodejs.org/learn/getting-started/introduction-to-nodejs) is another runtime. It also uses V8 but provides its own APIs, including APIs for working with files.

```js
const player = { hp: 100 }; // Language values and objects
setTimeout(() => player.hp -= 10, 100); // Host timer API
```

Creating an object and changing `hp` follow the language rules. `setTimeout` is provided by the runtime. When the callback is invoked, the engine executes its JavaScript code.

<figure class="runtime-map runtime-map--static" aria-label="Language, engine, and browser">
  <div class="runtime-map__node tone-cyan"><div><strong>ECMAScript</strong><p>Language rules</p></div></div>
  <div class="runtime-map__connector" aria-hidden="true">↓</div>
  <div class="runtime-map__host tone-green">
    <div class="runtime-map__host-heading"><div><strong>Browser</strong><p>DOM, canvas, timers</p></div></div>
    <div class="runtime-map__engine runtime-map__node tone-violet"><div><strong>V8</strong><p>Parsing and executing JavaScript, managing memory</p></div></div>
  </div>
  <figcaption>V8 implements the ECMAScript rules. The browser embeds the engine and provides external APIs.</figcaption>
</figure>
