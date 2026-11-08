---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/sdk-components",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 17,
  "title": "Компонент GameDevLand SDK",
  "concept": "ToolkitComponent",
  "description": "Нарисуем панель в узле из layout JSON.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · SDK guide",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/sdk/README.md",
      "note": "Регистрация компонента и пример layout."
    },
    {
      "title": "Cyber UI Toolkit · ToolkitComponent",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/sdk/src/ToolkitComponent.ts",
      "note": "Владение эффектами, reduced motion и detach."
    }
  ]
}
---

Адаптер `@gamedevland/cyber-ui-sdk` нужен только для GameDevLand SDK. `ToolkitComponent` связывает эффекты core с обновлением, паузой и удалением узла. Для обычного PixiJS-проекта он не требуется.

Компонент рисует в `this.node.view`. Размеры находятся в проверенных настройках, положение задаётся родительским layout. Полный типизированный [CyberPanel](https://github.com/gamedevland/cyber-ui-toolkit/blob/main/examples/sdk/src/CyberPanel.ts) есть среди примеров пакета.

Зарегистрируем класс в `GlobalDiDefinition.registerComponents()`:

Создадим компонент `CyberPanel.ts`:

<details><summary>Код примера</summary>

```ts
import { CyberPreset, TerminalGlass } from '@gamedevland/cyber-ui';
import { ToolkitComponent } from '@gamedevland/cyber-ui-sdk';
import { SchemaDecoder as S } from '@gamedevland/engine/validation';

import type { Graphics } from '@gamedevland/engine/layouts';
import type { InferDecoded } from '@gamedevland/engine/validation';

const configDecoder = S.object({
  width: S.number({ min: 48 }),
  height: S.number({ min: 28 }),
  cut: S.number({ min: 0 }),
});

/** Attach to a Graphics node; its parent owns positioning and application input. */
export class CyberPanel extends ToolkitComponent<InferDecoded<typeof configDecoder>, Graphics> {
  protected readonly configDecoder = configDecoder;

  protected override onReady(): void {
    const { width, height, cut } = this.config;
    const palette = CyberPreset.palette;
    TerminalGlass.draw(
      this.node.view.clear(),
      0,
      0,
      width,
      height,
      cut,
      palette.panel,
      palette.panelEdge,
      palette.accent,
      palette.text,
    );
  }
}
```

</details>

Зарегистрируем его в `GlobalDiDefinition.registerComponents()`:

```ts
group.add('CyberPanel', CyberPanel);
```

Подключим к узлу `Graphics`:

```json
{
  "type": "Graphics",
  "components": {
    "panel": {
      "type": "CyberPanel",
      "data": { "width": 320, "height": 180, "cut": 12 }
    }
  }
}
```

Фабрика элемента `Graphics` также должна быть зарегистрирована в проекте. Текст добавляется отдельными узлами, ввод проходит через `node.input`, намерение игрока — через события и FSM.

Эффекты и паузу подключим в следующем уроке.
