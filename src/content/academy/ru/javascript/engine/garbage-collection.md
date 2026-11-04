---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 14,
  "title": "GC ищет достижимые объекты",
  "concept": "Достижимость",
  "description": "Мусор — объекты, к которым программа больше не может обратиться по ссылкам.",
  "takeaway": "Если от корней к объекту больше нет пути по ссылкам, GC может освободить его память. Когда это произойдёт, решает движок.",
  "sources": [
    {
      "title": "V8 · Orinoco GC",
      "url": "https://v8.dev/blog/trash-talk",
      "note": "Обход ссылок от корней: достижимые объекты сохраняются, недостижимые могут быть собраны."
    },
    {
      "title": "ECMA-262 · PutValue",
      "url": "https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-putvalue",
      "note": "Присваивание нового значения свойству объекта. Запись null заменяет ссылку, не удаляя сам объект."
    }
  ],
  "simulation": "reachability-graph",
  "locale": "ru",
  "translationKey": "javascript/engine/garbage-collection"
}
---


[Сборщик мусора (GC)](https://v8.dev/blog/trash-talk#marking) начинает с корней и проходит по ссылкам. Найденные объекты ещё доступны программе, поэтому он их сохраняет. Память остальных объектов можно освободить.

<aside class="lesson-note" aria-labelledby="gc-roots-note-title">
  <span class="lesson-note__label">Термин</span><h3 id="gc-roots-note-title">Корни (roots)</h3>
  <p>Отправные точки, с которых GC проверяет ссылки на объекты. Например, глобальный объект и данные текущих вызовов функций.</p>
</aside>

В примере есть цепочка **корень → сцена → игрок**. Доступ к этим объектам есть только через показанные связи.

Кнопки [заменяют ссылку значением `null`](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-putvalue):

- **Сцена → игрок:** игрок становится недостижимым, сцена остаётся доступна.
- **Корень → сцена:** оба объекта становятся недостижимыми.
