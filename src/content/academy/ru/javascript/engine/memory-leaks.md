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

`mount(scene)` возвращает функцию очистки. Когда сцена больше не нужна, эту функцию нужно вызвать: она удалит обработчик `onResize` из `window`. В [`removeEventListener`](https://dom.spec.whatwg.org/#dom-eventtarget-removeeventlistener) нужно передать **тот же обработчик**, который был добавлен.

Для поиска утечки в приложении можно сравнить [снимки памяти](https://developer.chrome.com/docs/devtools/memory-problems) после нескольких открытий и закрытий сцены и проверить, что продолжает её удерживать.
