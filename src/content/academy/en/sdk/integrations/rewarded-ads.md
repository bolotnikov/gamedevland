---
{
  "locale": "en",
  "translationKey": "sdk/integrations/rewarded-ads",
  "course": "sdk",
  "lesson": "integrations",
  "draft": false,
  "order": 3,
  "title": "Rewarded ads",
  "concept": "rewardedBreak",
  "description": "Grant a reward after a successful ad view.",
  "takeaway": [
    "Grant the reward only when result.success is true."
  ],
  "sources": [
    {
      "title": "SDK · types.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/platforms/types.ts",
      "note": "Signals, ads, and the reward result."
    },
    {
      "title": "SDK · PlatformManager.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/platforms/PlatformManager.ts",
      "note": "Adapter calls and ad hooks."
    }
  ]
}
---

Call `rewardedBreak()` and wait for the result. In this example, `GameServices.Rewards` is the game service that grants the reward. If the ad might finish after the scene closes, check that the scene is still open.

```ts
const result = await this.engine.platform.rewardedBreak();
if (result.success) {
  this.getSceneService(GameServices.Rewards).grant();
}
```

<figure class="sdk-figure is-compare">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-cyan"><div><strong>success: true</strong><span>Grant the reward</span></div></div>
    <div class="sdk-figure__item tone-violet"><div><strong>success: false</strong><span>The player continues without a reward</span></div></div>
  </div>
</figure>
