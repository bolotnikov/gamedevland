---
{
  "locale": "ru",
  "translationKey": "sdk/presentation/input",
  "course": "sdk",
  "lesson": "presentation",
  "draft": true,
  "order": 9,
  "title": "Обрабатываем ввод через узел",
  "concept": "InputManager",
  "description": "События мыши, касания и пера проходят через единый маршрут.",
  "takeaway": [
    "Ввод обрабатывается через фасад узла или общий InputManager.",
    "Кнопка отправляет запрос, а сценарий сцены решает, что с ним делать."
  ],
  "sources": [
    {
      "title": "SDK · types.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/input/types.ts",
      "note": "События и координаты."
    },
    {
      "title": "SDK · NodeInput.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/nodes/internal/NodeInput.ts",
      "note": "onTap и функции отписки."
    },
    {
      "title": "SDK · InputRouter.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/input/InputRouter.ts",
      "note": "Маршрутизация и распространение."
    },
    {
      "title": "SDK · BrowserInputGuard.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/input/BrowserInputGuard.ts",
      "note": "Подавление браузерных действий."
    }
  ]
}
---

`InputManager` преобразует браузерный ввод в события игры. Они содержат ID указателя, экранные и виртуальные координаты, цель и методы остановки распространения.

Подпишемся на нажатие кнопки через `node.input.onTap` и отправим событие перезапуска:

```ts
import { BaseComponent } from '@gamedevland/engine/layouts';

export class RestartButtonComponent extends BaseComponent {
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

Зарегистрируем тип компонента и прикрепим его к узлу кнопки с ненулевыми границами. FSM сцены должна объявить тот же `RESTART_REQUESTED`. В Block Puzzle используется собственный токен события и компонент окна результата.

<figure class="sdk-figure is-flow"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">01</span><div><strong>Браузер</strong><span>pointerdown, pointermove, pointerup, pointercancel</span></div></div><div class="sdk-figure__item tone-violet"><span class="sdk-figure__index">02</span><div><strong>InputManager</strong><span>Нормализация координат и распознавание tap / drag</span></div></div><div class="sdk-figure__item tone-green"><span class="sdk-figure__index">03</span><div><strong>InputRouter</strong><span>Определение цели и распространение по узлам</span></div></div><div class="sdk-figure__item tone-amber"><span class="sdk-figure__index">04</span><div><strong>Компонент</strong><span>Реакция на ввод → событие игры</span></div></div></div><figcaption>InputChannel также публикует события INPUT_* в общую шину для сценариев, которым это нужно.</figcaption></figure>

`onTapOnce` подходит для одноразовой реакции, `on(type, handler)` — для нужного типа события. Глобальный `engine.input.on` используется, когда ввод должен отслеживаться за пределами одного узла, как при перетаскивании.

Не нужно включать PixiJS eventMode, cursor или подписывать DOM pointer-события для обычной кнопки: иначе появляются два независимых маршрута. `BrowserInputGuard` настраивается через `system.browserGuard`, если canvas должен подавлять определённые стандартные действия браузера.

Порог tap и drag измеряется в виртуальных координатах. Наличие настроек longPress или doubleTap в InputConfig не означает готовые одноимённые события: список доступных событий задаёт InputType.
