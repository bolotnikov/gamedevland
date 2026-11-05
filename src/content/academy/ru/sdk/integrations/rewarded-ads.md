---
{
  "locale": "ru",
  "translationKey": "sdk/integrations/rewarded-ads",
  "course": "sdk",
  "lesson": "integrations",
  "draft": false,
  "order": 3,
  "title": "Реклама с наградой",
  "concept": "rewardedBreak",
  "description": "Выдадим награду после успешного просмотра рекламы.",
  "takeaway": [
    "Награду выдаём только при result.success."
  ],
  "sources": [
    {
      "title": "SDK · types.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/platforms/types.ts",
      "note": "Сигналы, реклама и результат награды."
    },
    {
      "title": "SDK · PlatformManager.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/platforms/PlatformManager.ts",
      "note": "Вызовы адаптера и рекламные hooks."
    }
  ]
}
---

Вызовем `rewardedBreak()` и дождёмся результата. `GameServices.Rewards` в примере — сервис игры, который выдаёт награду. Если реклама может завершиться после закрытия сцены, проверим, что сцена ещё открыта.

```ts
const result = await this.engine.platform.rewardedBreak();
if (result.success) {
  this.getSceneService(GameServices.Rewards).grant();
}
```

<figure class="sdk-figure is-compare">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-cyan"><div><strong>success: true</strong><span>Выдаём награду</span></div></div>
    <div class="sdk-figure__item tone-violet"><div><strong>success: false</strong><span>Игрок продолжает без награды</span></div></div>
  </div>
</figure>
