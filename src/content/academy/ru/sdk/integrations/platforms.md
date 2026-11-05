---
{
  "locale": "ru",
  "translationKey": "sdk/integrations/platforms",
  "course": "sdk",
  "lesson": "integrations",
  "draft": false,
  "order": 1,
  "title": "Выбор игровой площадки",
  "concept": "PlatformManager",
  "description": "Укажем площадку при сборке игры.",
  "takeaway": [
    "VITE_PLATFORM выбирает площадку, а PlatformManager передаёт ей вызовы игры."
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

<aside class="lesson-note" aria-labelledby="platform-term"><span class="lesson-note__label">Термин</span><h3 id="platform-term">Игровая площадка</h3><p>Сайт, на котором запускается игра. Площадка может показывать рекламу и получать от игры сигналы о загрузке и ходе партии.</p></aside>

Для Poki зададим `VITE_PLATFORM=poki` при сборке. Из кода игры вызываем одни и те же методы `PlatformManager`. Например, `gameplayStart()` сообщает о начале партии, а `gameplayStop()` — о её завершении.

<figure class="sdk-figure is-flow">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-cyan"><div><strong>VITE_PLATFORM=poki</strong><span>Выбираем площадку при сборке</span></div></div>
    <div class="sdk-figure__item tone-violet"><div><strong>PlatformManager</strong><span>Игра сообщает о начале партии</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>Poki</strong><span>Получает сигнал</span></div></div>
  </div>
</figure>
