---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 16,
  "title": "Потоки JavaScript",
  "concept": "Потоки",
  "description": "Где выполняется код страницы и зачем нужен Web Worker.",
  "takeaway": "Код в одном потоке выполняется по очереди. Для отдельного выполнения JavaScript создают Web Worker. async сам по себе не переносит вычисления в другой поток.",
  "sources": [
    {
      "title": "HTML Standard · Web Workers",
      "url": "https://html.spec.whatwg.org/multipage/workers.html#workers",
      "note": "Отдельное выполнение JavaScript и обмен сообщениями со страницей."
    },
    {
      "title": "ECMA-262 · AsyncFunctionStart",
      "url": "https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-async-functions-abstract-operations-async-function-start",
      "note": "Вызов async-функции начинает выполнение её тела в текущем потоке."
    },
    {
      "title": "ECMA-262 · Promise Objects",
      "url": "https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-promise-objects",
      "note": "Promise представляет результат операции или ошибку."
    },
    {
      "title": "V8 · Background compilation",
      "url": "https://v8.dev/blog/background-compilation",
      "note": "Движок может выполнять часть подготовки кода в фоновом потоке."
    },
    {
      "title": "V8 · Orinoco GC",
      "url": "https://v8.dev/blog/trash-talk#concurrent",
      "note": "Часть работы сборщика мусора может выполняться в фоне."
    }
  ],
  "locale": "ru",
  "translationKey": "javascript/engine/threads"
}
---

**Поток** выполняет код по очереди. Код страницы обычно работает в основном потоке браузера: здесь выполняются игровая логика и обработчики ввода.

Если в этом потоке запустить долгий расчёт, например генерацию карты, обработчики кликов будут ждать его завершения. Из-за этого игра может перестать отвечать на действия игрока.

<aside class="lesson-note" aria-labelledby="web-worker-note-title">
  <span class="lesson-note__label">Термин</span><h3 id="web-worker-note-title">Web Worker</h3>
  <p><a href="https://html.spec.whatwg.org/multipage/workers.html#workers">Механизм браузера для выполнения JavaScript в отдельном потоке.</a> Программа создаёт Worker и передаёт ему задачу. Например, Worker рассчитывает карту, пока основной поток продолжает обрабатывать ввод.</p>
  <p>Страница и Worker могут обмениваться данными через сообщения: страница отправляет задание, Worker возвращает результат.</p>
</aside>

<figure class="thread-map" aria-label="Основной поток выполняет код страницы, отдельный Worker рассчитывает карту. Они обмениваются сообщениями. V8 также использует фоновые потоки для своих задач">
  <div class="thread-map__browser">
    <span class="thread-map__label">Браузер</span>
    <div class="thread-map__lanes">
      <div class="thread-map__lane">
        <strong>Основной поток</strong><p>Код страницы · по очереди</p>
        <div class="thread-map__task">Обработать ввод</div><span class="thread-map__down" aria-hidden="true">↓</span><div class="thread-map__task">Обновить игру</div>
      </div>
      <div class="thread-map__messages"><span>Задание →</span><span>← Результат</span><small>Сообщения</small></div>
      <div class="thread-map__lane is-worker">
        <strong>Поток Worker</strong><p>Код задачи · отдельно от страницы</p>
        <div class="thread-map__task thread-map__task--long"><code>generateMap()</code><span>Рассчитать карту</span></div>
      </div>
    </div>
    <div class="thread-map__engine"><strong>Фоновые потоки V8</strong><p>Часть подготовки кода и работы сборщика мусора.</p></div>
  </div>
  <figcaption>Основной поток и Worker могут работать одновременно. Внутри каждого потока код выполняется по очереди.</figcaption>
</figure>

У V8 есть и свои <a href="https://v8.dev/blog/background-compilation">фоновые задачи</a>, например подготовка кода и <a href="https://v8.dev/blog/trash-talk#concurrent">часть сборки мусора</a>. Эти задачи движок распределяет сам. Для переноса игровой функции в отдельный поток приложение должно создать Worker и запустить код там.

## Что делает async

<a id="what-async-does" class="translation-anchor" aria-hidden="true"></a>

Функция с <a href="https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-async-functions-abstract-operations-async-function-start"><code>async</code></a> возвращает Promise.

<aside class="lesson-note" aria-labelledby="thread-promise-note-title">
  <span class="lesson-note__label">Термин</span><h3 id="thread-promise-note-title">Promise</h3>
  <p><a href="https://tc39.es/ecma262/multipage/control-abstraction-objects.html#sec-promise-objects">Объект, через который программа получает результат операции или ошибку.</a> Сам по себе Promise не запускает отдельный поток.</p>
</aside>

```js
async function buildMap() {
  return generateMap(); // Still runs on the calling JS thread
}
```

Здесь `generateMap()` выполняется в том же потоке, где вызвана `buildMap()`. Если расчёт долгий, поток всё это время занят. Добавление `async` не переносит расчёт в Worker.
