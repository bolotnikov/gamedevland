---
{
  "locale": "ru",
  "translationKey": "sdk/foundations/asset-bundles",
  "course": "sdk",
  "lesson": "foundations",
  "draft": false,
  "order": 7,
  "title": "Загружаем нужные наборы",
  "concept": "AssetManager",
  "description": "Управляем моментом загрузки и доступом к результату.",
  "takeaway": [
    "Набор загружается по заранее зарегистрированному имени.",
    "Владение сценой не означает владение всеми общими ресурсами."
  ],
  "sources": [
    {
      "title": "SDK · AssetManager.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/assets/AssetManager.ts",
      "note": "loadBundle, loadRequiredBundle, load, has, get и управление загрузкой."
    },
    {
      "title": "SDK · BaseScene.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/scenes/BaseScene.ts",
      "note": "Preload сцены и отсутствие автоматического удаления общих assets."
    },
    {
      "title": "Block Puzzle · BootPreloadRequestFactory.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/boot/configs/BootPreloadRequestFactory.ts",
      "note": "Список наборов Block Puzzle."
    },
    {
      "title": "Block Puzzle · BootPreloadService.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/boot/services/BootPreloadService.ts",
      "note": "Исходный метод runPreload с последовательной загрузкой наборов."
    }
  ]
}
---

<aside class="lesson-note is-green" aria-labelledby="lesson-purpose">
  <h3 id="lesson-purpose">Зачем это нужно</h3>
  <p>Не все ресурсы нужны при старте. Объединим их в наборы, чтобы загружать нужные файлы перед открытием сцены и не ждать загрузки всей игры сразу.</p>
</aside>

`AssetManager` регистрирует ресурсы, загружает их и хранит результаты. Набор, или bundle, — именованная группа ресурсов, которую удобно загрузить целиком.

В методе `runPreload` загрузочного сервиса [BootPreloadService.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/boot/services/BootPreloadService.ts#L53) ресурсы загружаются последовательно:

```ts
await this.sceneContext.engine.bootstrapConfigBundles(request.configBundles);
for (const bundleName of request.assetBundles) {
  await this.assets.loadBundle(bundleName);
}
```

Так код явно определяет порядок групп. Внутри AssetManager запросы ограничены настройками параллельности, повторов и таймаута. Эти параметры не превращают отсутствующий ресурс в допустимое состояние.

<figure class="sdk-figure is-compare"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>Зарегистрирован</strong><span>Движок знает тип и адрес. Содержимого ещё может не быть.</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>Загружен</strong><span>get(id) может вернуть результат. Потребитель всё ещё проверяет его тип.</span></div></div></div><figcaption>Обе стадии нужны: запись в манифесте и успешная загрузка.</figcaption></figure>

<a id="scene-loading" class="translation-anchor" aria-hidden="true"></a>
## Загрузка сцены

Если набор нужен при входе в сцену, укажем его в `SceneConfig.assets`:

```ts
assets: {
  bundles: ['images', 'fonts'],
  ids: ['json/layouts/scenes/game/layout.json'],
},
```

Это фрагмент описания сцены. Имена наборов и ID должны присутствовать в манифесте. `loadBundle` отклоняет неизвестное имя, поэтому опечатка обнаруживается сразу.

`load(ids)` загружает отдельные ID. `has(id)` проверяет наличие загруженного результата, `get(id)` возвращает его. Для JSON дальше используем декодер, а для картинок — стандартный узел или TextureAssetResolver.

`loadRequiredBundle(name)` после загрузки проверяет наличие каждого результата. Обычный `loadBundle` сам по себе не гарантирует, что все файлы загрузились: сбои отдельных загрузчиков учитываются внутри координатора. Для обязательных ресурсов выбираем `loadRequiredBundle`.

Выход из сцены не очищает общий кэш assets: следующая сцена может использовать те же файлы. Публичного метода `evict` в AssetManager нет.
