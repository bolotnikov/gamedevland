---
{
  "locale": "ru",
  "translationKey": "sdk/presentation/components",
  "course": "sdk",
  "lesson": "presentation",
  "draft": false,
  "order": 4,
  "title": "Компонент узла",
  "concept": "BaseComponent",
  "description": "Подключим обновление счётчика в JSON.",
  "takeaway": [
    "Подписываемся в onEnable и отписываемся в onDisable."
  ],
  "sources": [
    {
      "title": "SDK · BaseComponent.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/components/BaseComponent.ts",
      "note": "Хуки, включение и базовая очистка."
    },
    {
      "title": "SDK · NodeComponents.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/nodes/internal/NodeComponents.ts",
      "note": "Порядок ready/enable и поиск по классу."
    },
    {
      "title": "SDK · BuiltTreeActivator.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/build/BuiltTreeActivator.ts",
      "note": "Активация детей раньше родителя."
    }
  ]
}
---

<aside class="lesson-note" aria-labelledby="component-term"><span class="lesson-note__label">Термин</span><h3 id="component-term">Компонент</h3><p>Класс, который добавляет элементу экрана поведение. Например, слушает событие об изменении очков и обновляет текст.</p></aside>

В `components` добавим счётчик. `score` — имя компонента на этом узле, `type` — имя класса, зарегистрированного в DI. [layout.json](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/assets/json/layouts/scenes/game/layout.json)

```json
"components": {
  "score": {
    "type": "BlockPuzzleScoreComponent",
    "data": { "popScale": 1.18, "popDuration": 0.2 }
  }
}
```

<figure class="sdk-figure is-flow">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-cyan"><div><strong>onReady</strong><span>Вёрстка готова</span></div></div>
    <div class="sdk-figure__item tone-violet"><div><strong>onEnable</strong><span>Подписываемся на события</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>onDisable</strong><span>Снимаем подписки</span></div></div>
  </div>
</figure>
