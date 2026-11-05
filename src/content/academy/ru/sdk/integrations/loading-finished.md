---
{
  "locale": "ru",
  "course": "sdk",
  "lesson": "integrations",
  "draft": false,
  "translationKey": "sdk/integrations/loading-finished",
  "order": 2,
  "title": "Сигнал о завершении загрузки",
  "concept": "loadingFinished",
  "description": "Сообщим площадке, когда можно начать игру.",
  "takeaway": [
    "С отдельной сценой загрузки отправляем сигнал после перехода к игре."
  ],
  "sources": [
    {
      "title": "SDK · Engine.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/core/Engine.ts",
      "note": "Автоматический loadingFinished после входа в начальную сцену и настройка autoLoadingFinished."
    },
    {
      "title": "SDK · PlatformManager.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/platforms/PlatformManager.ts",
      "note": "Передача loadingFinished адаптеру платформы."
    }
  ]
}
---

По умолчанию SDK сообщает о готовности после входа в первую сцену. Если первая сцена показывает загрузку, укажем в `GameConfig` параметр `system.boot.autoLoadingFinished: false`. Когда загрузим ресурсы и откроем игровую сцену, вызовем метод сами.

```ts
this.sceneContext.engine.platform.loadingFinished();
```

<figure class="sdk-figure is-flow">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-cyan"><div><strong>Сцена загрузки</strong><span>Загружаем ресурсы</span></div></div>
    <div class="sdk-figure__item tone-violet"><div><strong>Игровая сцена</strong><span>Открываем игру</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>loadingFinished()</strong><span>Площадка узнаёт, что игра готова</span></div></div>
  </div>
</figure>
