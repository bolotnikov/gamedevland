---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/panel-reveal",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": true,
  "order": 11,
  "title": "Появление панели",
  "concept": "PanelReveal",
  "description": "Подключим действие к отдельной обёртке.",
  "takeaway": [
    "Отмена восстанавливает transform, захваченный при подключении действия."
  ],
  "sources": [
    {
      "title": "Cyber UI Toolkit · PanelReveal",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/sdk/src/PanelReveal.ts",
      "note": "Декодирование входа, твины и восстановление transform."
    }
  ]
}
---

`PanelReveal` использует твины SDK. Чтобы анимация и layout не меняли один transform одновременно, выделим панели отдельный `Container` для появления.

В `GlobalDiDefinition.registerServices()` зарегистрируем действие:

```ts
import { DiTokens } from '@gamedevland/engine/di';
import { PanelReveal } from '@gamedevland/cyber-ui-sdk';

registrar.transientClass(DiTokens.action('PanelReveal'), PanelReveal);
```

Добавим к обёртке в layout:

```json
{
  "type": "Container",
  "actions": { "reveal": { "type": "PanelReveal" } }
}
```

Из компонента, владеющего этим узлом, вызовем:

```ts
void this.node.runAction('reveal', {
  duration: 240,
  delay: 0,
  offset: 8,
  axis: 'down',
});
```

`duration` и `delay` задаются в миллисекундах, `offset` — в локальных единицах. Допустимы длительность 1–2000, задержка 0–1000 и сдвиг 0–16. Ось: `down`, `right` или `zoom`. Без оси действие меняет прозрачность и положение без сжатия. `closing: true` запускает закрытие.

Действие учитывает исходные позицию, масштаб и прозрачность. Повторный запуск заменяет его твины, отмена возвращает исходное состояние. Не перемещай эту обёртку другим кодом во время анимации. При reduced motion выбирай статичное состояние. Вызов планирует твины; его завершение не означает окончания анимации.
