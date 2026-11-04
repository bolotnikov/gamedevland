---
{
  "locale": "ru",
  "translationKey": "sdk/foundations/asset-manifest",
  "course": "sdk",
  "lesson": "foundations",
  "draft": false,
  "order": 6,
  "title": "Файл, URL и идентификатор ресурса",
  "concept": "Манифест ресурсов",
  "description": "Свяжем файлы проекта с именами, которые использует игровой код.",
  "takeaway": [
    "Asset ID служит игровому коду; URL служит загрузчику.",
    "Описание ресурса ещё не означает его загрузку."
  ],
  "sources": [
    {
      "title": "SDK · AssetManifestBuilder.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/assets/AssetManifestBuilder.ts",
      "note": "Правила ID и группировки."
    },
    {
      "title": "SDK · types.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/assets/types.ts",
      "note": "AssetDescriptor, BundleDescriptor и четыре типа ресурсов."
    },
    {
      "title": "Block Puzzle · assets.manifest.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/config/assets.manifest.ts",
      "note": "Полный манифест примера."
    }
  ]
}
---

<aside class="lesson-note is-green" aria-labelledby="lesson-purpose">
  <h3 id="lesson-purpose">Зачем это нужно</h3>
  <p>После сборки адреса файлов могут измениться. Игровому коду нужны постоянные имена ресурсов, чтобы находить изображения, звук и JSON независимо от их адресов в сборке.</p>
</aside>

Манифест перечисляет ресурсы игры. В нём у каждого ресурса есть `id`, тип и URL. Код использует стабильный идентификатор; Vite формирует адрес файла в сборке.

<aside class="lesson-note" aria-labelledby="asset-id"><span class="lesson-note__label">Термин</span><h3 id="asset-id">Asset ID</h3><p>Имя ресурса внутри игры. Например, images/block.png. Оно не обязано совпадать с URL файла после сборки.</p></aside>

В [assets.manifest.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/config/assets.manifest.ts#L29) `import.meta.glob` собирает ссылки на файлы, а `AssetManifestBuilder` превращает их в наборы ресурсов. Запишем этот фрагмент с типом результата `glob<string>`:

```ts
const images = import.meta.glob<string>(
  '@game/assets/images/**/*.{png,jpg,jpeg,webp,avif}',
  { eager: true, query: '?url', import: 'default' },
);
```

Здесь `eager: true` получает URL сразу. Содержимое изображений при этом не загружается через AssetManager: запросы выполнятся при загрузке соответствующего набора.

<figure class="sdk-figure is-flow"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">01</span><div><strong>game/assets/images/block.png</strong><span>Исходный файл</span></div></div><div class="sdk-figure__item tone-violet"><span class="sdk-figure__index">02</span><div><strong>images/block.png</strong><span>Asset ID по стандартной стратегии после /assets/</span></div></div><div class="sdk-figure__item tone-green"><span class="sdk-figure__index">03</span><div><strong>importedUrl</strong><span>Адрес, подготовленный Vite</span></div></div><div class="sdk-figure__item tone-amber"><span class="sdk-figure__index">04</span><div><strong>AssetManager</strong><span>Загруженное изображение по стабильному ID</span></div></div></div><figcaption>Идентификатор остаётся понятным, даже если сборщик меняет имя выходного файла.</figcaption></figure>

Небольшой набор можно собрать вручную:

```ts
const bundles = [{
  name: 'images',
  assets: [{ id: 'images/block.png', type: 'image', importedUrl: blockUrl }],
}] satisfies BundleDescriptor[];
```

`blockUrl` — адрес изображения, импортированного с `?url`. Тип `BundleDescriptor` импортируем из `@gamedevland/engine/assets`. Когда файлов много, `AssetManifestBuilder` собирает наборы без ручного перечисления.

`BundleBuildPolicy` определяет группировку. Игра делит музыку и эффекты на `audio-music` и `audio-sfx`. Тип ресурса выбирает loader: `image`, `audio`, `json` или `font`. SDK сам подготавливает загруженное изображение для узла; создавать текстуру в каждом компоненте не нужно.
