---
{
  "locale": "ru",
  "translationKey": "sdk/presentation/input",
  "course": "sdk",
  "lesson": "presentation",
  "draft": false,
  "order": 9,
  "title": "Нажатие на кнопку",
  "concept": "InputManager",
  "description": "Отправим событие перезапуска по нажатию.",
  "takeaway": [
    "onTap возвращает функцию, которую вызываем при отключении компонента."
  ],
  "sources": [
    {
      "title": "SDK · types.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/input/types.ts",
      "note": "События и координаты."
    },
    {
      "title": "SDK · NodeInput.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/layouts/nodes/internal/NodeInput.ts",
      "note": "onTap и функции отписки."
    },
    {
      "title": "SDK · InputRouter.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/input/InputRouter.ts",
      "note": "Маршрутизация и распространение."
    },
    {
      "title": "SDK · BrowserInputGuard.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/input/BrowserInputGuard.ts",
      "note": "Подавление браузерных действий."
    }
  ]
}
---

Добавим к кнопке компонент. `node.input.onTap` обрабатывает клик мыши и касание. По нажатию отправим `RESTART_REQUESTED`, а в FSM укажем, что делать с этим событием.

```ts
import { BaseComponent } from '@gamedevland/engine/layouts';
import { Container } from '@gamedevland/engine/renderers/pixi';

export class RestartButtonComponent extends BaseComponent<Container> {
  protected readonly nodeType = Container;
  private off: (() => void) | undefined;

  protected override onEnable(): void {
    this.off = this.node.input.onTap(() => {
      this.node.events.emit({ type: 'RESTART_REQUESTED', data: {} });
    });
  }
  protected override onDisable(): void {
    this.off?.();
    this.off = undefined;
  }
}
```

<figure class="sdk-figure is-flow">
  <div class="sdk-figure__body">
    <div class="sdk-figure__item tone-cyan"><div><strong>Игрок нажимает кнопку</strong><span>Мышь или касание</span></div></div>
    <div class="sdk-figure__item tone-violet"><div><strong>onTap</strong><span>Компонент отправляет RESTART_REQUESTED</span></div></div>
    <div class="sdk-figure__item tone-green"><div><strong>FSM</strong><span>Запускает перезапуск</span></div></div>
  </div>
</figure>
