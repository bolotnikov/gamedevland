---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 1,
  "title": "Язык, движок и среда исполнения",
  "concept": "ECMAScript · Engine · Runtime",
  "description": "Чем отличаются правила JavaScript, реализация языка и окружение программы.",
  "takeaway": [
    "ECMAScript — стандарт языка: синтаксис и поведение описаны в спецификации ECMA-262.",
    "Движок — программа, которая реализует правила языка и исполняет JavaScript. V8 — одна из реализаций.",
    "Runtime — среда исполнения, которая встраивает движок и предоставляет программе внешние API."
  ],
  "sources": [
    {
      "title": "ECMA-262 · Hosts and Implementations",
      "url": "https://tc39.es/ecma262/multipage/overview.html#sec-hosts-and-implementations",
      "note": "Различает язык, реализацию и окружение."
    },
    {
      "title": "V8 · устройство движка",
      "url": "https://v8.dev/",
      "note": "Документация реализации V8; не нормативное описание всех JS-движков."
    },
    {
      "title": "HTML Standard · Timers",
      "url": "https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers",
      "note": "Таймеры setTimeout и setInterval предоставляет среда браузера."
    }
  ],
  "locale": "ru",
  "translationKey": "javascript/engine/engine-and-runtime"
}
---

JavaScript — язык программирования. Чтобы понять, как работает программа, разделим три понятия: правила языка, движок и среду исполнения.

## ECMAScript: правила языка

Основные правила JavaScript описаны в **[спецификации ECMAScript — ECMA-262](https://tc39.es/ecma262/multipage/)**. Она определяет синтаксис и поведение языка: как объявляются переменные, вызываются функции, работают объекты и операторы.

Спецификация описывает, что должна делать программа. Она не требует определённого интерпретатора или компилятора.

## Движок: реализация языка

**Движок JavaScript** — программа, которая реализует эти правила: подготавливает и исполняет код, управляет объектами и памятью. CPU выполняет машинные инструкции; движок организует выполнение JavaScript через интерпретацию или компиляцию.

<figure class="machine-code-example" aria-labelledby="machine-code-example-title">
  <figcaption id="machine-code-example-title"><span class="machine-code-example__eyebrow">Пример · x86-64 · 5 байт</span><strong>Одна машинная инструкция</strong></figcaption>
  <div class="machine-code-example__legend"><span>Байты в шестнадцатеричной записи</span><span>Ниже — те же байты в битах</span></div>
  <div class="machine-code-example__bytes" role="group" aria-label="Машинный код: B8 2A 00 00 00">
    <div class="is-opcode"><code>B8</code><small>10111000</small></div>
    <div><code>2A</code><small>00101010</small></div>
    <div><code>00</code><small>00000000</small></div>
    <div><code>00</code><small>00000000</small></div>
    <div><code>00</code><small>00000000</small></div>
  </div>
  <div class="machine-code-example__meaning"><span>Читаемая запись · ассемблер</span><code>mov eax, 42</code><p>Записать число <strong>42</strong> в регистр <strong>EAX</strong> процессора.</p></div>
  <p class="machine-code-example__note">Реальная кодировка инструкции MOV, выбранная для примера. Это не результат компиляции JavaScript в V8. <a href="https://www.intel.com/content/dam/www/public/us/en/documents/manuals/64-ia-32-architectures-software-developer-vol-2b-manual.pdf#page=37">Intel · MOV · том 2B, стр. 4-35</a>.</p>
</figure>

<aside class="lesson-note" aria-labelledby="machine-code-note-title">
  <span class="lesson-note__label">Термин</span><h3 id="machine-code-note-title">Машинный код</h3>
  <p>Последовательность байтов, кодирующих инструкции конкретной архитектуры процессора. В примере выше байты записаны шестнадцатеричными числами — это компактный способ показать те же биты.</p>
</aside>

**[V8](https://v8.dev/)** — один из таких движков. **[JavaScriptCore](https://docs.webkit.org/Deep%20Dive/JSC/JavaScriptCore.html)** и **[SpiderMonkey](https://spidermonkey.dev/)** — другие реализации того же языка.

## Runtime: среда исполнения

**[Runtime](https://tc39.es/ecma262/multipage/overview.html#sec-hosts-and-implementations)** — окружение, в которое встроен движок. Среда организует запуск программы и предоставляет дополнительные API.

Браузер предоставляет [DOM](https://dom.spec.whatwg.org/), canvas и таймеры. [Node.js](https://nodejs.org/learn/getting-started/introduction-to-nodejs) — другая среда исполнения: она также использует V8, но предоставляет свой набор API, например для работы с файлами.

```js
const player = { hp: 100 }; // Language values and objects
setTimeout(() => player.hp -= 10, 100); // Host timer API
```

Создание объекта и изменение `hp` подчиняются правилам языка. `setTimeout` предоставляет среда исполнения. Когда наступает время вызова, JavaScript-код callback выполняет движок.

<figure class="runtime-map runtime-map--static" aria-label="Язык, движок и браузер">
  <div class="runtime-map__node tone-cyan"><div><strong>ECMAScript</strong><p>Правила языка</p></div></div>
  <div class="runtime-map__connector" aria-hidden="true">↓</div>
  <div class="runtime-map__host tone-green">
    <div class="runtime-map__host-heading"><div><strong>Браузер</strong><p>DOM, canvas, таймеры</p></div></div>
    <div class="runtime-map__engine runtime-map__node tone-violet"><div><strong>V8</strong><p>Разбор и выполнение JavaScript, управление памятью</p></div></div>
  </div>
  <figcaption>V8 реализует правила ECMAScript. Браузер встраивает движок и предоставляет внешние API.</figcaption>
</figure>
