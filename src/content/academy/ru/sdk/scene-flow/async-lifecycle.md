---
{
  "locale": "ru",
  "translationKey": "sdk/scene-flow/async-lifecycle",
  "course": "sdk",
  "lesson": "scene-flow",
  "draft": false,
  "order": 11,
  "title": "Асинхронные операции и выход из сцены",
  "concept": "Время жизни операции",
  "description": "Проверим, остался ли компонент включён после загрузки.",
  "takeaway": [
    "После ожидания проверяем, что компонент всё ещё активен."
  ],
  "sources": [
    {
      "title": "SDK · BaseCommand.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/commands/BaseCommand.ts",
      "note": "Проверка scene scope и detached-операции."
    },
    {
      "title": "SDK · BaseComponent.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/components/BaseComponent.ts",
      "note": "Ожидание ресурсов и завершение detach."
    },
    {
      "title": "SDK · BaseAction.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/actions/BaseAction.ts",
      "note": "Отмена и область жизни действия."
    }
  ]
}
---

<aside class="lesson-note is-green" aria-labelledby="lesson-purpose">
  <h3 id="lesson-purpose">Зачем это нужно</h3>
  <p>Префаб может загрузиться уже после выхода из сцены. Перед тем как показать его, проверим, что компонент ещё работает.</p>
</aside>

В команде для такой проверки есть `awaitSceneScope`. В компоненте используем `awaitComponentScopeResource`, если результат загрузки нужно освободить.

```ts
const spawned = await this.awaitComponentScopeResource(
  this.node.spawnPrefab({
    prefabId: this.config.prefabId,
    localId: 'preview',
  }),
  (resource) => resource.dispose(),
);
if (!spawned) return;
spawned.node.setVisible(true);
```

Если компонент успел отключиться, метод освободит префаб и вернёт `undefined`.

<figure class="sdk-figure is-compare"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>Владелец активен</strong><span>Операция завершилась → результат используется</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>Владелец удалён</strong><span>Операция завершилась → ресурс освобождён → продолжение пропущено</span></div></div></div><figcaption>Проверка после await не отменяет сетевой запрос; она ограничивает применение результата.</figcaption></figure>

В своём `onDetach` вызываем `super.onDetach()`, чтобы SDK остановил анимации, добавленные через `ownTween`.
