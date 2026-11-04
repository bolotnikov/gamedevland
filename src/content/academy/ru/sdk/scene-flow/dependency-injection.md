---
{
  "locale": "ru",
  "translationKey": "sdk/scene-flow/dependency-injection",
  "course": "sdk",
  "lesson": "scene-flow",
  "draft": true,
  "order": 2,
  "title": "Внедрение зависимостей",
  "concept": "DI и токены",
  "description": "Объект получает готовые зависимости вместо самостоятельного поиска и создания.",
  "takeaway": [
    "Токен описывает, что требуется.",
    "Фабрика явно определяет, как получить зависимость."
  ],
  "sources": [
    {
      "title": "SDK · tokens.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/di/tokens.ts",
      "note": "Категории типизированных токенов и SystemServices."
    },
    {
      "title": "SDK · DiContainer.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/di/DiContainer.ts",
      "note": "Разрешение зависимостей."
    },
    {
      "title": "Block Puzzle · BlockPuzzleServices.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/BlockPuzzleServices.ts",
      "note": "Токены сервисов игры."
    }
  ]
}
---

<aside class="lesson-note is-green" aria-labelledby="lesson-purpose">
  <h3 id="lesson-purpose">Зачем это нужно</h3>
  <p>Игровому сервису нужны настройки и другие сервисы. Передадим их снаружи, чтобы он занимался своей задачей, а не созданием всего окружения.</p>
</aside>

`DI` связывает запрос зависимости с её реализацией. Например, сервис игрового процесса получает размеры поля и сервис прогресса в конструкторе; ему не нужно загружать JSON или выбирать браузерное хранилище.

<aside class="lesson-note" aria-labelledby="dependency-injection"><span class="lesson-note__label">Термин</span><h3 id="dependency-injection">Внедрение зависимостей</h3><p>Передача объекту того, что нужно для работы. Здесь контейнер создаёт объекты по явно зарегистрированным правилам.</p></aside>

Токен — ключ, по которому контейнер находит зависимость. В [BlockPuzzleServices.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/BlockPuzzleServices.ts) он типизирован:

```ts
import { DiTokens } from '@gamedevland/engine/di';

import type { BlockPuzzleAudioService } from './services/BlockPuzzleAudioService';
import type { BlockPuzzleGameplayService } from './services/BlockPuzzleGameplayService';
import type { BlockPuzzleGeometryService } from './services/BlockPuzzleGeometryService';

export class BlockPuzzleServices {
  static readonly Audio = DiTokens.service<BlockPuzzleAudioService>(
    'BlockPuzzleAudioService',
  );
  static readonly Gameplay = DiTokens.service<BlockPuzzleGameplayService>(
    'BlockPuzzleGameplayService',
  );
  static readonly Geometry = DiTokens.service<BlockPuzzleGeometryService>(
    'BlockPuzzleGeometryService',
  );
}
```

<figure class="sdk-figure is-flow"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">01</span><div><strong>Запрос</strong><span>container.get(BlockPuzzleServices.Gameplay)</span></div></div><div class="sdk-figure__item tone-violet"><span class="sdk-figure__index">02</span><div><strong>Токен</strong><span>service:BlockPuzzleGameplayService</span></div></div><div class="sdk-figure__item tone-green"><span class="sdk-figure__index">03</span><div><strong>Регистрация</strong><span>Фабрика Gameplay и её зависимости</span></div></div><div class="sdk-figure__item tone-amber"><span class="sdk-figure__index">04</span><div><strong>Экземпляр</strong><span>Готовый сервис для вызова команды</span></div></div></div><figcaption>Токен сохраняет тип зависимости; фабрика определяет, как её создать.</figcaption></figure>

`DiTokens.service<T>(name)` создаёт объект с ключом `service:name`. Другие категории — `element`, `component`, `action` и `command`. Для встроенных систем доступны `SystemServices.AssetManager`, `ConfigStore`, `Tweens` и остальные системные токены.

Контейнер не анализирует параметры конструктора автоматически. `useClass` создаёт объект без аргументов. Если нужны аргументы, используем `useFactory` и явно получаем их через контейнер.

Сам объект игрового процесса зависит от небольшого набора параметров, а не от всего DI. Это помогает читать его контракт и проверять правила отдельно от движка. Контейнер остаётся в точке сборки проекта и на предусмотренных границах API.
