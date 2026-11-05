---
{
  "locale": "ru",
  "translationKey": "sdk/scene-flow/providers",
  "course": "sdk",
  "lesson": "scene-flow",
  "draft": false,
  "order": 4,
  "title": "DI-провайдеры и время жизни",
  "concept": "Провайдеры и время жизни",
  "description": "Укажем, когда создавать новый объект, а когда возвращать готовый.",
  "takeaway": [
    "Singleton сохраняет созданный объект. Transient создаёт новый при каждом запросе."
  ],
  "sources": [
    {
      "title": "SDK · ValuesGroupRegistrar.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/di/ValuesGroupRegistrar.ts",
      "note": "Способы регистрации."
    },
    {
      "title": "SDK · DiContainer.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/di/DiContainer.ts",
      "note": "Кэш singleton у владельца провайдера и правила override."
    },
    {
      "title": "Block Puzzle · di.providers.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/config/di.providers.ts",
      "note": "Регистрация четырёх категорий в игре."
    }
  ]
}
---

<aside class="lesson-note is-green" aria-labelledby="lesson-purpose">
  <h3 id="lesson-purpose">Зачем это нужно</h3>
  <p>Некоторые объекты можно создать один раз и использовать в разных частях игры. В других случаях при каждом запросе нужен новый объект. При регистрации в DI-контейнере мы выбираем подходящий способ.</p>
</aside>

Для каждого такого объекта добавляем в DI-контейнер правило — **провайдер**. В нём указываем токен и способ получения объекта: вернуть готовое значение, создать объект из класса или вызвать фабрику. При регистрации также выбираем, сохранять объект для следующих запросов или создавать каждый раз новый.

Например, сервис прогресса может быть общим для всей игры. А если на экране два счётчика, каждому нужен свой компонент, чтобы управлять своим текстом.

<figure class="sdk-figure is-matrix"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>singletonValue</strong><span>Возвращает готовое значение</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>singletonClass</strong><span>Создаёт объект из класса один раз</span></div></div><div class="sdk-figure__item tone-green"><div><strong>singletonFactory</strong><span>Вызывает фабрику один раз</span></div></div><div class="sdk-figure__item tone-amber"><div><strong>transientClass</strong><span>Создаёт объект из класса при каждом запросе</span></div></div></div><figcaption>Singleton сохраняет объект, transient создаёт новый.</figcaption></figure>

Сокращённая регистрация компонента в [di.providers.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/config/di.providers.ts#L59):

```ts
group.add('BlockPuzzleScoreComponent', BlockPuzzleScoreComponent);
```

Компонент регистрируем в `ComponentsGroup` под тем же именем, что и `type` в JSON. Узел — это элемент экрана, например текст счётчика. Если подключить этот компонент к двум текстовым узлам, SDK создаст два отдельных объекта компонента — по одному для каждого текста.

При глобальной регистрации singleton остаётся общим для игры. При регистрации в контейнере сцены он создаётся заново при каждом входе.
