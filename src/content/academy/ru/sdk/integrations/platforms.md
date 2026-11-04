---
{
  "locale": "ru",
  "translationKey": "sdk/integrations/platforms",
  "course": "sdk",
  "lesson": "integrations",
  "draft": true,
  "order": 1,
  "title": "Интеграция с игровой платформой",
  "concept": "PlatformManager",
  "description": "Игровой код сообщает о загрузке, игре и рекламе через общий API.",
  "takeaway": [
    "Платформа выбирается согласованно на стадии сборки и в runtime.",
    "Награда выдаётся по результату, а не по факту вызова рекламы."
  ],
  "sources": [
    {
      "title": "SDK · PlatformCatalog.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/platforms/shared/PlatformCatalog.ts",
      "note": "Поддерживаемые платформы."
    },
    {
      "title": "SDK · types.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/platforms/types.ts",
      "note": "Сигналы, реклама и результат награды."
    },
    {
      "title": "SDK · PlatformManager.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/platforms/PlatformManager.ts",
      "note": "Вызовы адаптера и рекламные hooks."
    },
    {
      "title": "SDK · GameViteConfigFactory.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/vite/src/GameViteConfigFactory.ts",
      "note": "Выбор платформенной сборки."
    }
  ]
}
---

<aside class="lesson-note is-green" aria-labelledby="lesson-purpose">
  <h3 id="lesson-purpose">Зачем это нужно</h3>
  <p>У игровых площадок разные API рекламы, хранения и сигналов игрового процесса. Общий API позволяет вызывать эти возможности из игры, оставляя различия площадок в адаптерах.</p>
</aside>

`PlatformManager` предоставляет общее API для работы с площадками. Каталог поддерживаемых платформ содержит `web`, `poki`, `crazygames`, `yandex` и `gamedistribution`.

Сборка выбирает платформу через `VITE_PLATFORM`. Vite-пакет вставляет нужный внешний SDK и настройки, а browser runtime выбирает адаптер. Это разные стадии, поэтому одного вызова platform-метода недостаточно для неверно собранной платформы.

<figure class="sdk-figure is-flow"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">01</span><div><strong>VITE_PLATFORM</strong><span>Цель конкретной сборки</span></div></div><div class="sdk-figure__item tone-violet"><span class="sdk-figure__index">02</span><div><strong>@gamedevland/vite</strong><span>Подключение SDK платформы и build defines</span></div></div><div class="sdk-figure__item tone-green"><span class="sdk-figure__index">03</span><div><strong>PlatformManager</strong><span>loadingFinished, gameplayStart/Stop, рекламные паузы</span></div></div><div class="sdk-figure__item tone-amber"><span class="sdk-figure__index">04</span><div><strong>Адаптер платформы</strong><span>Poki / CrazyGames / Yandex / GameDistribution / web</span></div></div></div><figcaption>Игра вызывает общее API; адаптер обращается к SDK выбранной площадки.</figcaption></figure>

`loadingFinished()` сообщает готовность после загрузки; момент отправки разберём в [следующем уроке](/ru/academy/sdk/integrations/loading-finished/). `gameplayStart()` и `gameplayStop()` отражают реальное начало и окончание активной игры. `happytime()` обозначает подходящий момент успеха. Эти сигналы не заменяют изменение состояния самой игры.

## Рекламная пауза

`prerollBreak` и `commercialBreak` ожидают завершения паузы. `rewardedBreak` возвращает результат. Например, запросим рекламу с наградой:

```ts
const result = await this.engine.platform.rewardedBreak();
if (result.success) {
  this.getSceneService(GameServices.Rewards).grant();
}
```

`GameServices.Rewards` и его метод `grant` добавим в проекте: это сервис выдачи награды. Награда выдаётся только при `success: true`. Если сцена может смениться во время рекламы, продолжение проверяет её область жизни перед выдачей награды в сценовый сервис.

Движок связывает рекламные паузы со своей runtime-паузой и аудиополитикой. Не требуется параллельно создавать второй механизм остановки GSAP или глобального звука.

`getPreferredLocale()` даёт подсказку языка. `getDataStorageBackend()` возвращает доступный платформенный backend либо `null`. Наличие метода не гарантирует поддержку хранения на каждой платформе. `NullPlatformAdapter` полезен там, где внешние возможности отсутствуют.
