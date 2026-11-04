---
{
  "locale": "ru",
  "course": "sdk",
  "lesson": "integrations",
  "draft": true,
  "translationKey": "sdk/integrations/loading-finished",
  "order": 2,
  "title": "Сообщаем платформе о готовности",
  "concept": "loadingFinished",
  "description": "Сообщим внешней площадке, когда игра закончила загрузку и готова к запуску.",
  "takeaway": [
    "Переход между сценами и сигнал внешней площадке — отдельные операции.",
    "При отдельной загрузочной сцене отключаем автоматический сигнал и сообщаем готовность после загрузки."
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

Игра может быть уже открыта в загрузочной сцене, но ещё не готова принимать игрока. Внешняя площадка получает сигнал готовности через `platform.loadingFinished()`.

По умолчанию движок отправляет его после входа в начальную сцену. Если она ещё догружает игру, отключим автоматический сигнал. В `GameConfig` укажем:

```ts
system: {
  boot: {
    autoLoadingFinished: false,
  },
},
```

После загрузки ресурсов и открытия игровой сцены отправим сигнал готовности из сервиса загрузки:

```ts
this.sceneContext.engine.platform.loadingFinished();
```

<figure class="sdk-figure is-flow" aria-label="После подготовки игры проект передаёт сигнал готовности через SDK внешней площадке">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-violet"><span class="sdk-figure__index">01</span><div><strong>Игра готова</strong><span>Ресурсы загружены, игровая сцена открыта</span></div></div>
    <div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">02</span><div><strong>loadingFinished</strong><span>Проект вызывает API движка</span></div></div>
    <div class="sdk-figure__item tone-green"><span class="sdk-figure__index">03</span><div><strong>Площадка</strong><span>Адаптер передаёт сигнал внешнему SDK</span></div></div>
  </div>
  <figcaption>Сигнал сообщает о готовности площадке; загрузка ресурсов и переход между сценами выполняются до него.</figcaption>
</figure>

При ошибке загрузки сигнал не отправляется. Метод также не заменяет `gameplayStart()`: готовность игры и начало активной партии — разные моменты.
