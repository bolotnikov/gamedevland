---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 18,
  "title": "Общая схема работы движка",
  "concept": "Повторение",
  "description": "Как V8 подготавливает код, выполняет функции и управляет памятью.",
  "takeaway": "Сканер выделяет токены, парсер строит AST, генератор создаёт байткод, Ignition его выполняет. V8 также может создать машинный код функции. При выполнении движок ведёт стек вызовов и управляет памятью объектов.",
  "sources": [
    {
      "title": "V8 · Scanner",
      "url": "https://v8.dev/blog/scanner",
      "note": "Сканер выделяет токены, а парсер использует их для построения AST."
    },
    {
      "title": "V8 · Генерация байткода из AST",
      "url": "https://v8.dev/blog/background-compilation#building-a-background-thread-bytecode-compiler",
      "note": "Генератор получает AST от парсера и создаёт последовательность инструкций для Ignition."
    },
    {
      "title": "V8 · Ignition",
      "url": "https://v8.dev/docs/ignition",
      "note": "Интерпретатор байткода в составе V8."
    },
    {
      "title": "V8 · Sparkplug",
      "url": "https://v8.dev/blog/sparkplug",
      "note": "Создание машинного кода из байткода и данные вызовов функций в стеке."
    },
    {
      "title": "V8 · Управление памятью",
      "url": "https://v8.dev/blog/trash-talk",
      "note": "Хранение объектов в куче и поиск доступных объектов по ссылкам."
    }
  ],
  "locale": "ru",
  "translationKey": "javascript/engine/mental-model"
}
---

Подведём итог раздела «Движок JavaScript»: повторим, как движок подготавливает и выполняет код, хранит объекты и освобождает память.

V8 получает текст JavaScript и подготавливает инструкции для его выполнения. Рассмотрим функцию, которая создаёт объект врага:

<pre><code>function spawnEnemy() {
  return { hp: 100 };
}</code></pre>

## От текста к выполнению

<a id="from-source-text-to-execution" class="translation-anchor" aria-hidden="true"></a>

<section class="engine-pipeline" data-engine-pipeline aria-label="Подготовка и выполнение функции в V8" data-reset-note="Схема сброшена. Начнём с исходного текста функции.">
<p class="engine-pipeline__hint">Интерактивная схема для примера выше. Каждый этап передаёт результат следующему. В V8 парсер получает токены от сканера по мере разбора; здесь эти действия разделены. Дерево и байткод показаны упрощённо.</p>
<ol class="engine-summary">
  <li data-engine-stage>
    <strong><a href="https://v8.dev/blog/scanner">Сканер выделяет токены</a></strong>
    <p>Разбивает текст на части: слово <code>return</code>, имя свойства <code>hp</code>, число <code>100</code>, скобки и другие знаки.</p>
    <div class="engine-stage__flow">Текст → токены</div>
    <p class="engine-stage__pending" data-stage-pending data-ready="Исходный текст готов к разбору." hidden>Ожидает исходный текст.</p>
    <button class="academy-button" type="button" data-stage-action data-done-label="Токены выделены ✓" aria-controls="engine-tokens" hidden>Выделить токены</button>
    <div class="engine-stage__result" id="engine-tokens" data-stage-result tabindex="-1" data-announcement="Сканер выделил 13 токенов. Теперь парсер может построить AST.">
      <span class="engine-stage__label">Токены → парсеру</span>
      <div class="engine-stage__tokens"><code>function</code><code>spawnEnemy</code><code>(</code><code>)</code><code>{</code><code>return</code><code>{</code><code>hp</code><code>:</code><code>100</code><code>}</code><code>;</code><code>}</code></div>
    </div>
  </li>
  <li data-engine-stage>
    <strong>Парсер строит AST</strong>
    <p>По токенам собирает дерево, описывающее структуру программы. Здесь дерево показывает: функция возвращает объект со свойством <code>hp: 100</code>.</p>
    <div class="engine-stage__flow">Токены → дерево программы</div>
    <p class="engine-stage__pending" data-stage-pending data-ready="Токены получены от сканера." hidden>Ожидает токены от сканера.</p>
    <button class="academy-button" type="button" data-stage-action data-done-label="AST построено ✓" aria-controls="engine-ast" hidden>Построить AST</button>
    <div class="engine-stage__result" id="engine-ast" data-stage-result tabindex="-1" data-announcement="Парсер построил дерево: функция spawnEnemy возвращает объект со свойством hp и значением 100. Теперь генератор может создать байткод.">
      <span class="engine-stage__label">AST → генератору байткода</span>
      <ul class="engine-stage__tree" aria-label="Упрощённое дерево функции spawnEnemy">
        <li><span>Функция <code>spawnEnemy</code></span><ul>
          <li><span>Тело функции</span><ul>
            <li><span>Возврат <code>return</code></span><ul>
              <li><span>Объект</span><ul>
                <li><span>Свойство <code>hp</code></span><ul><li><span>Число <code>100</code></span></li></ul></li>
              </ul></li>
            </ul></li>
          </ul></li>
        </ul></li>
      </ul>
    </div>
  </li>
  <li class="is-generator" data-engine-stage>
    <strong><a href="https://v8.dev/blog/background-compilation#building-a-background-thread-bytecode-compiler">Генератор байткода создаёт инструкции</a></strong>
    <p>Обходит AST и записывает операции для интерпретатора. В нашем примере их смысл: создать объект, затем вернуть его.</p>
    <div class="engine-stage__flow">AST → байткод</div>
    <p class="engine-stage__pending" data-stage-pending data-ready="AST получено от парсера." hidden>Ожидает AST от парсера.</p>
    <button class="academy-button" type="button" data-stage-action data-done-label="Байткод создан ✓" aria-controls="engine-bytecode" hidden>Создать байткод</button>
    <div class="engine-stage__result" id="engine-bytecode" data-stage-result tabindex="-1" data-announcement="Генератор создал инструкции: создать объект hp: 100 и вернуть его. Код функции готов к выполнению; вызовем spawnEnemy.">
      <span class="engine-stage__label">Байткод → Ignition</span>
      <div class="engine-stage__instructions"><code>CREATE_OBJECT { hp: 100 }</code><span>Создать объект</span><code>RETURN</code><span>Вернуть его</span></div>
      <p>Учебный псевдобайткод: названия инструкций условные. Объект появится при вызове функции.</p>
    </div>
  </li>
  <li data-engine-stage>
    <strong><a href="https://v8.dev/docs/ignition">Ignition выполняет байткод</a></strong>
    <p>Читает инструкции и выполняет соответствующие операции. CPU при этом исполняет машинный код самого интерпретатора.</p>
    <div class="engine-stage__flow">Байткод → выполнение операций</div>
    <p class="engine-stage__pending" data-stage-pending data-ready="Байткод готов. Вызовем функцию и получим результат." hidden>Ожидает байткод от генератора.</p>
    <button class="academy-button" type="button" data-stage-action data-done-label="Вызов завершён ✓" aria-controls="engine-result" hidden>Вызвать spawnEnemy()</button>
    <div class="engine-stage__result is-executed" id="engine-result" data-stage-result tabindex="-1" data-announcement="Вызов spawnEnemy завершён. Создан и возвращён объект со свойством hp: 100.">
      <span class="engine-stage__label">Результат вызова spawnEnemy()</span>
      <code class="engine-stage__object">{ hp: 100 }</code>
      <p>Ignition выполнил инструкции: объект создан и возвращён из функции.</p>
    </div>
  </li>
</ol>
<div class="engine-pipeline__controls" data-pipeline-controls hidden><button class="academy-button is-secondary" type="button" data-pipeline-reset>↺ Сначала</button><span data-pipeline-count>Выполнено 0 из 4 этапов</span></div>
<span class="sr-only" aria-live="polite" data-pipeline-announcement></span>
</section>

V8 также может с помощью <a href="https://v8.dev/blog/sparkplug">JIT-компилятора</a> создать машинный код функции. Тогда CPU выполняет эту версию функции напрямую. В обоих случаях программа должна получить тот же результат.

## Что происходит с вызовом и объектом

<a id="what-happens-to-the-call-and-the-object" class="translation-anchor" aria-hidden="true"></a>

Когда программа выполняет `const enemy = spawnEnemy()`, происходит следующее:

1. **Начинается вызов.** Движок сохраняет данные вызова в стеке: какую функцию выполняем и куда вернуться после неё.
2. **Создаётся объект.** V8 выделяет для него память в куче и записывает `hp: 100`.
3. **Функция возвращает результат.** Вызов завершается, а переменная `enemy` получает ссылку на созданный объект.

<figure class="engine-memory" aria-label="После возврата из spawnEnemy её вызов завершён, а переменная enemy ссылается на объект в куче">
  <div><span>Стек вызовов</span><strong>spawnEnemy() завершена</strong><p>Программа продолжает работу после вызова.</p></div>
  <div><span>Куча · память объектов</span><strong><code>enemy → { hp: 100 }</code></strong><p>Объект доступен через ссылку из переменной.</p></div>
</figure>

Если объект сохранён ещё и в массиве врагов, доступ к нему остаётся через массив. Когда путей от корней к объекту больше нет, <a href="https://v8.dev/blog/trash-talk#marking">сборщик мусора</a> сможет освободить его память.
