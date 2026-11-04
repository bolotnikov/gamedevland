---
{
  "locale": "ru",
  "translationKey": "sdk/presentation/components",
  "course": "sdk",
  "lesson": "presentation",
  "draft": true,
  "order": 4,
  "title": "Компонент живёт вместе с узлом",
  "concept": "BaseComponent",
  "description": "Подписки, обновление и очистка имеют явного владельца.",
  "takeaway": [
    "onReady работает с собранным деревом.",
    "Каждое включение и отключение сохраняет корректное число подписок."
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

<aside class="lesson-note is-green" aria-labelledby="lesson-purpose">
  <h3 id="lesson-purpose">Зачем это нужно</h3>
  <p>Узлу может понадобиться собственное поведение: реагировать на события, обновлять текст или обрабатывать ввод. Свяжем это поведение с узлом, чтобы вместе с ним включать, отключать и очищать его.</p>
</aside>

`BaseComponent` описывает постоянное поведение узла. Счётчик слушает ScoreChanged, responsive-компонент реагирует на размер экрана, компонент ввода следит за указателем.

Компонент объявляется в JSON под локальным именем. В [layout.json](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/assets/json/layouts/scenes/game/layout.json) `score` — ID экземпляра на узле, а `BlockPuzzleScoreComponent` — зарегистрированный тип. Сокращённый фрагмент:

```json
"components": {
  "score": {
    "type": "BlockPuzzleScoreComponent",
    "data": { "popScale": 1.18, "popDuration": 0.2 }
  }
}
```

<figure class="sdk-figure is-flow is-long"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">01</span><div><strong>init → onInit</strong><span>Узел и config привязаны; дерево ещё собирается</span></div></div><div class="sdk-figure__item tone-violet"><span class="sdk-figure__index">02</span><div><strong>ready → onReady</strong><span>Дочерние узлы уже доступны</span></div></div><div class="sdk-figure__item tone-green"><span class="sdk-figure__index">03</span><div><strong>enable → onEnable</strong><span>Подключение подписок и активного поведения</span></div></div><div class="sdk-figure__item tone-amber"><span class="sdk-figure__index">04</span><div><strong>onUpdate(dt)</strong><span>Обновление только включённого компонента</span></div></div><div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">05</span><div><strong>disable → detach</strong><span>Отписки, остановка эффектов, очистка области жизни</span></div></div></div><figcaption>Готовность дерева наступает позже init. Подписки обычно включаются в onEnable.</figcaption></figure>

Движок активирует дерево снизу вверх: сначала дети, затем родитель. На узле сначала вызываются ready-хуки всех компонентов, затем включаются компоненты с начальным `enabled: true`. Порядок объявления — не замена явным зависимостям.

`onEnable` и `onDisable` могут вызываться несколько раз. Включение не должно накапливать одинаковые подписки. Сохраняем функции отписки и вызываем их в `onDisable`; оставшуюся очистку выполняем в `onDetach`.

## Поиск поведения

`node.getComponent(ComponentClass)` проверяет класс найденного экземпляра. `getComponents(ComponentClass)` возвращает все совпадения. Именной `getComponent<T>('id')` удобен для известного layout, но сам generic не выполняет проверку класса.

Отключение компонента не равно удалению узла. Узел и его `view` остаются в дереве; прекращается активное поведение компонента. Видимость управляется отдельно через `setVisible`.
