---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 18,
  "title": "How the engine works: a recap",
  "concept": "Recap",
  "description": "How V8 prepares code, executes functions, and manages memory.",
  "takeaway": "The scanner recognizes tokens, the parser builds an AST, the generator creates bytecode, and Ignition executes it. V8 can also generate machine code for a function. During execution, the engine maintains the call stack and manages object memory.",
  "sources": [
    {
      "title": "V8 · Scanner",
      "url": "https://v8.dev/blog/scanner",
      "note": "The scanner recognizes tokens, which the parser uses to build an AST."
    },
    {
      "title": "V8 · Generating bytecode from an AST",
      "url": "https://v8.dev/blog/background-compilation#building-a-background-thread-bytecode-compiler",
      "note": "The generator takes the parser's AST and produces a sequence of instructions for Ignition."
    },
    {
      "title": "V8 · Ignition",
      "url": "https://v8.dev/docs/ignition",
      "note": "The bytecode interpreter within V8."
    },
    {
      "title": "V8 · Sparkplug",
      "url": "https://v8.dev/blog/sparkplug",
      "note": "Generating machine code from bytecode and storing function-call data on the stack."
    },
    {
      "title": "V8 · Memory management",
      "url": "https://v8.dev/blog/trash-talk",
      "note": "Storing objects on the heap and finding accessible objects through references."
    }
  ],
  "locale": "en",
  "translationKey": "javascript/engine/mental-model"
}
---

We will recap the JavaScript Engine section: how the engine prepares and executes code, stores objects, and releases memory.

V8 receives JavaScript source text and prepares instructions to execute it. Consider a function that creates an enemy object:

<pre><code>function spawnEnemy() {
  return { hp: 100 };
}</code></pre>

## From source text to execution

<a id="от-текста-к-выполнению" class="translation-anchor" aria-hidden="true"></a>

<section class="engine-pipeline" data-engine-pipeline aria-label="Preparing and executing a function in V8" data-reset-note="Diagram reset. We will start with the function's source text.">
<p class="engine-pipeline__hint">An interactive diagram for the example above. Each stage passes its result to the next. V8's parser receives tokens from the scanner as it parses; these actions are separated here. The tree and bytecode are simplified.</p>
<ol class="engine-summary">
  <li data-engine-stage>
    <strong><a href="https://v8.dev/blog/scanner">The scanner recognizes tokens</a></strong>
    <p>Splits the text into parts: the word <code>return</code>, the property name <code>hp</code>, the number <code>100</code>, braces, and other symbols.</p>
    <div class="engine-stage__flow">Text → tokens</div>
    <p class="engine-stage__pending" data-stage-pending data-ready="The source text is ready for scanning." hidden>Waiting for source text.</p>
    <button class="academy-button" type="button" data-stage-action data-done-label="Tokens recognized ✓" aria-controls="engine-tokens" hidden>Recognize tokens</button>
    <div class="engine-stage__result" id="engine-tokens" data-stage-result tabindex="-1" data-announcement="The scanner recognized 13 tokens. The parser can now build the AST.">
      <span class="engine-stage__label">Tokens → parser</span>
      <div class="engine-stage__tokens"><code>function</code><code>spawnEnemy</code><code>(</code><code>)</code><code>{</code><code>return</code><code>{</code><code>hp</code><code>:</code><code>100</code><code>}</code><code>;</code><code>}</code></div>
    </div>
  </li>
  <li data-engine-stage>
    <strong>The parser builds the AST</strong>
    <p>Builds a tree from the tokens to describe the program's structure. Here, the tree shows that the function returns an object with the property <code>hp: 100</code>.</p>
    <div class="engine-stage__flow">Tokens → program tree</div>
    <p class="engine-stage__pending" data-stage-pending data-ready="Tokens received from the scanner." hidden>Waiting for tokens from the scanner.</p>
    <button class="academy-button" type="button" data-stage-action data-done-label="AST built ✓" aria-controls="engine-ast" hidden>Build AST</button>
    <div class="engine-stage__result" id="engine-ast" data-stage-result tabindex="-1" data-announcement="The parser built a tree: spawnEnemy returns an object with the property hp and the value 100. The generator can now create bytecode.">
      <span class="engine-stage__label">AST → bytecode generator</span>
      <ul class="engine-stage__tree" aria-label="Simplified tree of the spawnEnemy function">
        <li><span>Function <code>spawnEnemy</code></span><ul>
          <li><span>Function body</span><ul>
            <li><span>Return <code>return</code></span><ul>
              <li><span>Object</span><ul>
                <li><span>Property <code>hp</code></span><ul><li><span>Number <code>100</code></span></li></ul></li>
              </ul></li>
            </ul></li>
          </ul></li>
        </ul></li>
      </ul>
    </div>
  </li>
  <li class="is-generator" data-engine-stage>
    <strong><a href="https://v8.dev/blog/background-compilation#building-a-background-thread-bytecode-compiler">The bytecode generator creates instructions</a></strong>
    <p>Walks the AST and writes operations for the interpreter. In this example, their meaning is: create an object, then return it.</p>
    <div class="engine-stage__flow">AST → bytecode</div>
    <p class="engine-stage__pending" data-stage-pending data-ready="AST received from the parser." hidden>Waiting for an AST from the parser.</p>
    <button class="academy-button" type="button" data-stage-action data-done-label="Bytecode generated ✓" aria-controls="engine-bytecode" hidden>Generate bytecode</button>
    <div class="engine-stage__result" id="engine-bytecode" data-stage-result tabindex="-1" data-announcement="The generator created instructions to create an object with hp: 100 and return it. The function's code is ready to run; we will call spawnEnemy.">
      <span class="engine-stage__label">Bytecode → Ignition</span>
      <div class="engine-stage__instructions"><code>CREATE_OBJECT { hp: 100 }</code><span>Create an object</span><code>RETURN</code><span>Return it</span></div>
      <p>Teaching pseudobytecode: the instruction names are illustrative. The object will be created when the function is called.</p>
    </div>
  </li>
  <li data-engine-stage>
    <strong><a href="https://v8.dev/docs/ignition">Ignition executes the bytecode</a></strong>
    <p>Reads the instructions and performs the corresponding operations. The CPU executes the machine code of the interpreter itself.</p>
    <div class="engine-stage__flow">Bytecode → operations</div>
    <p class="engine-stage__pending" data-stage-pending data-ready="The bytecode is ready. We will call the function and obtain its result." hidden>Waiting for bytecode from the generator.</p>
    <button class="academy-button" type="button" data-stage-action data-done-label="Call finished ✓" aria-controls="engine-result" hidden>Call spawnEnemy()</button>
    <div class="engine-stage__result is-executed" id="engine-result" data-stage-result tabindex="-1" data-announcement="The spawnEnemy call has finished. An object with the property hp: 100 was created and returned.">
      <span class="engine-stage__label">Result of spawnEnemy()</span>
      <code class="engine-stage__object">{ hp: 100 }</code>
      <p>Ignition executed the instructions: the object was created and returned from the function.</p>
    </div>
  </li>
</ol>
<div class="engine-pipeline__controls" data-pipeline-controls hidden><button class="academy-button is-secondary" type="button" data-pipeline-reset>↺ Reset</button><span data-pipeline-count>Completed 0 of 4 stages</span></div>
<span class="sr-only" aria-live="polite" data-pipeline-announcement></span>
</section>

V8 can also use a <a href="https://v8.dev/blog/sparkplug">JIT compiler</a> to generate machine code for the function. The CPU then executes that version directly. Both execution paths must produce the same program result.

## What happens to the call and the object

<a id="что-происходит-с-вызовом-и-объектом" class="translation-anchor" aria-hidden="true"></a>

When the program executes `const enemy = spawnEnemy()`, the following happens:

1. **The call begins.** The engine saves the call's data on the stack: which function is running and where to return afterwards.
2. **The object is created.** V8 allocates heap memory for it and stores `hp: 100`.
3. **The function returns its result.** The call finishes, and the variable `enemy` receives a reference to the new object.

<figure class="engine-memory" aria-label="After spawnEnemy returns, its call has finished and enemy refers to the object on the heap">
  <div><span>Call stack</span><strong>spawnEnemy() has finished</strong><p>The program continues after the call.</p></div>
  <div><span>Heap · object memory</span><strong><code>enemy → { hp: 100 }</code></strong><p>The object is accessible through the variable's reference.</p></div>
</figure>

If the object is also stored in an enemies array, it remains accessible through that array. Once no path from the roots leads to it, the <a href="https://v8.dev/blog/trash-talk#marking">garbage collector</a> can release its memory.
