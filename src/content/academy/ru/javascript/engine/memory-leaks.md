---
{
  "course": "javascript",
  "lesson": "engine",
  "order": 15,
  "title": "Утечка: объект всё ещё нужен по графу",
  "concept": "Lifecycle сцены",
  "description": "Завершение работы сцены не делает её listener недостижимым автоматически.",
  "takeaway": "dispose должен разрывать долгоживущие связи, принадлежащие сцене.",
  "sources": [
    {
      "title": "Chrome DevTools · Memory",
      "url": "https://developer.chrome.com/docs/devtools/memory-problems",
      "note": "Официальные инструменты диагностики памяти, утечек и частых сборок."
    },
    {
      "title": "DOM Standard · removeEventListener",
      "url": "https://dom.spec.whatwg.org/#dom-eventtarget-removeeventlistener",
      "note": "Нормативный контракт удаления listener: type, callback и capture должны совпасть."
    }
  ],
  "simulation": "leak",
  "locale": "ru",
  "translationKey": "javascript/engine/memory-leaks"
}
---


Игрок закрыл сцену, но глобальный event target всё ещё хранит callback, который использует её данные. Для разработчика сцена «закончилась». Для сборщика она остаётся достижимой.

```js
function mount(scene) {
  const onResize = () => scene.resize();
  window.addEventListener('resize', onResize);
  return () => window.removeEventListener('resize', onResize);
}
```

Функция очистки должна быть вызвана владельцем lifecycle и удалить **тот же callback**. Новая стрелочная функция в [`removeEventListener`](https://dom.spec.whatwg.org/#dom-eventtarget-removeeventlistener) не подойдёт. Аналогично проверяют ticker-подписки, таймеры и долгоживущие кэши.

В модели есть явная цепочка удержания до `scene`. После очистки она исчезает. В приложении воспроизведём несколько циклов открытия и закрытия сцены, сравним [heap snapshots](https://developer.chrome.com/docs/devtools/memory-problems) и найдём retaining path. Один рост heap ещё не доказывает утечку: нужны повторяемость и объяснимый путь удержания.
