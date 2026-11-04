---
{
  "locale": "ru",
  "translationKey": "sdk/scene-flow/async-lifecycle",
  "course": "sdk",
  "lesson": "scene-flow",
  "draft": true,
  "order": 10,
  "title": "Асинхронная работа и выход из сцены",
  "concept": "Время жизни операции",
  "description": "После await проверим, что результат всё ещё принадлежит активному владельцу.",
  "takeaway": [
    "Поздний результат требует проверки владельца.",
    "Ожидание, отмена и освобождение ресурса — отдельные обязанности."
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
  <p>Загрузка префаба или анимация могут завершиться после ухода со сцены. Сам Promise не знает, что его визуальный владелец уже уничтожен. Перед применением результата нужно проверить, что он ещё нужен.</p>
</aside>

SDK предоставляет проверки области жизни для команд, компонентов и действий.

<aside class="lesson-note" aria-labelledby="scope-term"><span class="lesson-note__label">Термин</span><h3 id="scope-term">Область жизни</h3><p>Период, в течение которого объект может использовать своё окружение. После выхода из сцены или удаления компонента поздний результат уже может быть не нужен.</p></aside>

В команде `awaitSceneScope(operation)` ожидает результат и проверяет версию сцены. `runDetached` запускает отдельную операцию с обработкой устаревшего контекста. Это не способ скрывать ошибки активной сцены.

У компонента есть `continueComponentScope`, `awaitComponentScopeValue` и `awaitComponentScopeResource`. Последний полезен для ресурсов, которые нужно освобождать. Например, создадим префаб и покажем его, только если компонент ещё активен:

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

`config.prefabId` содержит ID префаба из настроек компонента. Если компонент успел отключиться, `awaitComponentScopeResource` освободит полученный префаб и вернёт `undefined`. Иначе код продолжит работу с узлом.

<figure class="sdk-figure is-compare"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>Владелец активен</strong><span>Операция завершилась → результат используется</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>Владелец удалён</strong><span>Операция завершилась → ресурс освобождён → продолжение пропущено</span></div></div></div><figcaption>Проверка после await не отменяет сетевой запрос; она ограничивает применение результата.</figcaption></figure>

`trackTask` учитывает Promise, чтобы teardown мог дождаться его завершения. Учёт задачи и отмена операции — разные механизмы. Длительные задачи должны иметь ограниченный срок и понятную очистку.

При переопределении `onDetach` вызываем `super.onDetach()`: базовый класс меняет версию области и останавливает owned-твины. Подписки и специфичные ресурсы подкласса всё равно нужно снять явно.
