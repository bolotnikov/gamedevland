---
{
  "locale": "ru",
  "translationKey": "sdk/scene-flow/providers",
  "course": "sdk",
  "lesson": "scene-flow",
  "draft": true,
  "order": 3,
  "title": "Регистрируем классы и фабрики",
  "concept": "Провайдеры и время жизни",
  "description": "Разделим общие сервисы и новые экземпляры поведения узлов.",
  "takeaway": [
    "Состояние узла требует отдельного экземпляра поведения.",
    "Singleton привязан к контейнеру-владельцу регистрации."
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
  <p>Некоторые сервисы должны быть общими для игры, а компонентам разных узлов нужны отдельные экземпляры. Правила регистрации определяют, как создавать объект и когда использовать уже созданный.</p>
</aside>

Провайдер — правило создания зависимости. `ValuesGroupRegistrar` предлагает явные способы регистрации:

<figure class="sdk-figure is-matrix"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>singletonValue</strong><span>Одно готовое значение</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>singletonClass</strong><span>Один экземпляр класса без аргументов</span></div></div><div class="sdk-figure__item tone-green"><div><strong>singletonFactory</strong><span>Один результат фабрики с зависимостями</span></div></div><div class="sdk-figure__item tone-amber"><div><strong>transientClass</strong><span>Новый экземпляр класса на каждый запрос</span></div></div></div><figcaption>Время жизни выбирается по владельцу состояния.</figcaption></figure>

В глобальном DI Block Puzzle элементы, компоненты и команды регистрируются отдельными группами. Сокращённые фрагменты методов `BlockPuzzleGlobalDi` из [di.providers.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/config/di.providers.ts):

```ts
group.add('Container', ContainerNode).add('Text', TextNode);
```

Сокращённая регистрация компонента в [di.providers.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/config/di.providers.ts#L59):

```ts
group.add('BlockPuzzleScoreComponent', BlockPuzzleScoreComponent);
```

Сокращённая регистрация команды в [di.providers.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/config/di.providers.ts#L71):

```ts
group.add('PlaceBlockCommand', PlaceBlockCommand);
```

Это три разных параметра `group`: `ElementFactoriesGroup`, `ComponentsGroup` и `CommandsGroup`. Имена совпадают с `type` в JSON и именами команд в FSM. Эти группы создают нужные transient-регистрации; компоненты разных узлов не должны делить один экземпляр.

Для действия игра использует регистрацию через общий registrar в том же [di.providers.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/config/di.providers.ts#L126):

```ts
registrar.transientClass<BaseAction>(
  DiTokens.action('PlayParticlesAction'),
  PlayParticlesAction,
);
```

Сервис прогресса, напротив, зарегистрирован как singleton: он общий для игры. `singletonFactory` пригодится, когда его конструктору нужен репозиторий.

## Область singleton

Singleton хранится в контейнере, которому принадлежит его провайдер. Глобальная регистрация остаётся общей при переходах сцен. Регистрация внутри DI сцены создаёт один экземпляр для этого входа в сцену. При новом входе создаётся новая область.

По умолчанию повторная регистрация токена — ошибка. Явные разрешённые замены описываются через `override`; защищённые системные токены переопределять нельзя. Обычной игре достаточно корректно объявить зависимости один раз.
