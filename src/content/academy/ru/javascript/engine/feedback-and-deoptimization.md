---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 9,
  "title": "Оптимизация строится на предположениях",
  "concept": "Feedback → specialization → deopt",
  "description": "Что меняется, когда в числовой код приходит строка.",
  "takeaway": "Deoptimization сохраняет семантику программы, когда предположения оптимизированного кода больше не подходят.",
  "sources": [
    {
      "title": "V8 · Maglev",
      "url": "https://v8.dev/blog/maglev",
      "note": "Уровни исполнения, обратная связь и спекулятивная оптимизация."
    },
    {
      "title": "V8 · Maps / Hidden Classes",
      "url": "https://v8.dev/docs/hidden-classes",
      "note": "Обратная связь о формах объектов и зависимость оптимизированного кода от предположений."
    },
    {
      "title": "ECMA-262 · Addition",
      "url": "https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-addition-operator-plus",
      "note": "Семантика числового сложения и конкатенации строк."
    }
  ],
  "locale": "ru",
  "translationKey": "javascript/engine/feedback-and-deoptimization"
}
---


Если `add(a, b)` часто получает числа, оптимизирующий компилятор может подготовить специализированный путь с проверками предположений. Это способ ускорить динамический язык без изменения его правил.

```js
function add(a, b) { return a + b; }
add(2, 3);     // 5
add('2', 3);   // '23'
```

Когда предположение не выполняется, возможны другой путь выполнения или **[deoptimization](https://v8.dev/blog/maglev)**: восстановление состояния для менее специализированного кода. Программа должна по-прежнему вернуть `'23'`, а не выполнить неверное числовое сложение.

<figure class="deopt-map" aria-label="Проверка предположения: числовой путь или деоптимизация при передаче строки">
  <div class="deopt-map__assumption">
    <span>После повторных вызовов с числами</span>
    <strong>V8 может создать машинный код для числового сложения</strong>
    <p>В нём проверяется предположение: <code>a</code> и <code>b</code> — числа.</p>
  </div>
  <div class="deopt-map__branches">
    <div class="deopt-map__branch tone-green">
      <code class="deopt-map__call">add(2, 3)</code>
      <span class="deopt-map__arrow" aria-hidden="true">↓</span>
      <strong>✓ Проверка пройдена</strong>
      <p>Оба аргумента — числа.</p>
      <span class="deopt-map__arrow" aria-hidden="true">↓</span>
      <div class="deopt-map__execution"><strong>Числовое сложение</strong><p>Выполняется подготовленный машинный код.</p></div>
      <div class="deopt-map__result"><span>Результат · число</span><code>5</code></div>
    </div>
    <div class="deopt-map__branch tone-amber">
      <code class="deopt-map__call">add('2', 3)</code>
      <span class="deopt-map__arrow" aria-hidden="true">↓</span>
      <strong>× Проверка не пройдена</strong>
      <p>Первый аргумент — строка.</p>
      <span class="deopt-map__arrow" aria-hidden="true">↓</span>
      <div class="deopt-map__execution"><strong>Возможна деоптимизация</strong><p>V8 восстанавливает состояние и продолжает выполнение через Ignition.</p></div>
      <div class="deopt-map__result"><span>Результат · строка</span><code>'23'</code></div>
    </div>
  </div>
  <figcaption>Показан возможный сценарий. Передача строки не обязательно вызывает деоптимизацию: у функции может быть и другой подходящий путь выполнения.</figcaption>
</figure>

Формы объектов и [inline caches](https://v8.dev/docs/hidden-classes) тоже дают обратную связь — подробно разберём их в разделе об оптимизации.

Прежде чем менять работу с динамическими объектами ради JIT, нужно записать профиль, найти участок с высокими затратами и определить причину этих затрат.
