---
{
  "locale": "ru",
  "translationKey": "sdk/scene-flow/scene-di",
  "course": "sdk",
  "lesson": "scene-flow",
  "draft": false,
  "order": 5,
  "title": "Зависимости сцены — Scene DI",
  "concept": "SceneDiDefinition",
  "description": "Укажем, как создать сервис и когда его запускать.",
  "takeaway": [
    "Сервис сцены может использовать общие зависимости игры."
  ],
  "sources": [
    {
      "title": "SDK · SceneDiDefinition.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/di/SceneDiDefinition.ts",
      "note": "Раздельные списки providers и services."
    },
    {
      "title": "SDK · SceneServiceHost.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/scenes/SceneServiceHost.ts",
      "note": "Вызов lifecycle-хуков зарегистрированных сервисов."
    },
    {
      "title": "Block Puzzle · scene.di.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/configs/scene.di.ts",
      "note": "Geometry без lifecycle и активные сервисы сцены."
    }
  ]
}
---

<aside class="lesson-note is-green" aria-labelledby="lesson-purpose">
  <h3 id="lesson-purpose">Зачем это нужно</h3>
  <p>Объекты текущей партии нужны до выхода из сцены, а общие сервисы продолжают работать при переходах. Разделим их время жизни, чтобы новая сцена не использовала состояние предыдущей.</p>
</aside>

`SceneDiDefinition` описывает зависимости одной сцены. Её ключ должен совпадать с ключом в `scenes.map`.

В `GameSceneDi` из [scene.di.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/configs/scene.di.ts) есть два разных списка. Сокращённый фрагмент для одного сервиса:

```ts
protected override registerProviders(registrar: ValuesGroupRegistrar): void {
  registrar.singletonClass(BlockPuzzleServices.Audio, BlockPuzzleAudioService);
}

protected override registerServices(services: SceneServiceTokenRegistry): void {
  services.add(BlockPuzzleServices.Audio);
}
```

`registerProviders` задаёт, как создать сервис. В `registerServices` перечислим сервисы, у которых SDK должен вызвать методы входа и выхода.

<figure class="sdk-figure is-tree"><div class="sdk-scope"><div class="sdk-scope__global"><span>Общее для игры</span><strong>Глобальный DI</strong><p>Системы · прогресс · фабрики поведения</p></div><div class="sdk-scope__scenes"><div><span>Сцена boot</span><strong>Загрузка</strong></div><div><span>Сцена game</span><strong>Gameplay · Geometry · Audio</strong></div></div></div><figcaption>Дочерний контейнер сначала ищет локальную регистрацию, затем обращается к родителю.</figcaption></figure>

`Geometry` только рассчитывает координаты. Его можно запросить по токену, даже если его нет в `registerServices`.

`GameDiDefinition` объединяет регистрации игры и её сцен. SDK сверяет ключи сцен и проверяет, что для каждого сервиса есть регистрация.
