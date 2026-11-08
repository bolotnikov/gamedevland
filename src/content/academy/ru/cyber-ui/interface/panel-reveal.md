---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/panel-reveal",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 15,
  "title": "Появление и закрытие панели",
  "concept": "PanelReveal",
  "description": "Добавим движение и изменение прозрачности при открытии окна.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · PanelReveal",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/sdk/src/PanelReveal.ts",
      "note": "Декодирование входа, твины и восстановление transform."
    }
  ]
}
---

`PanelTransition.origin()` задаёт, откуда начнётся появление панели. `down` раскрывает её по вертикали, `right` — по горизонтали, `zoom` — увеличивает целиком. Без направления панель появляется с небольшим сдвигом, без сжатия.

В примере переключатель открывает и закрывает панель. Можно выбрать направление и длительность анимации.

<details><summary>Действие PanelReveal для GameDevLand SDK</summary>

Зарегистрируем действие в `registerServices()`:

```ts
import { DiTokens } from '@gamedevland/engine/di';
import { PanelReveal } from '@gamedevland/cyber-ui-sdk';

registrar.transientClass(DiTokens.action('PanelReveal'), PanelReveal);
```

Добавим его к отдельному контейнеру панели:

```json
{
  "type": "Container",
  "actions": { "reveal": { "type": "PanelReveal" } }
}
```

Запустим из компонента этого узла:

```ts
void this.node.runAction('reveal', {
  duration: 240,
  delay: 0,
  offset: 8,
  axis: 'down',
});
```

`duration` — длительность 1–2000 мс, `delay` — задержка 0–1000 мс, `offset` — сдвиг 0–16. `axis` выбирает направление, `closing: true` закрывает панель. `pivotX` и `pivotY` задают точку, относительно которой она сжимается.

Пока действие работает, этот контейнер не нужно двигать другим кодом. Повторный запуск заменяет анимацию, отмена возвращает исходное положение.

</details>
