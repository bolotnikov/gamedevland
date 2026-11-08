---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/sdk-effects",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 18,
  "title": "Эффекты внутри компонента",
  "concept": "ToolkitComponent · ownEffect",
  "description": "Подключим загрузчик к обновлению, паузе и удалению узла.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · ToolkitComponent",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/sdk/src/ToolkitComponent.ts",
      "note": "Владение эффектами и методы компонента."
    }
  ]
}
---

`ownEffect()` передаёт обновление и освобождение эффекта компоненту. Создадим `LoadingEmblem.ts`: загрузчик рисует в двух дочерних узлах, а время получает от SDK.

<details><summary>Код примера</summary>

```ts
import { CyberPreset, TriangleLoader } from '@gamedevland/cyber-ui';
import { ToolkitComponent } from '@gamedevland/cyber-ui-sdk';
import type { Container } from '@gamedevland/engine/layouts';
import { SchemaDecoder as S } from '@gamedevland/engine/validation';
import type { InferDecoded } from '@gamedevland/engine/validation';

const configDecoder = S.object({ radius: S.number({ min: 1 }) });

export class LoadingEmblem extends ToolkitComponent<InferDecoded<typeof configDecoder>, Container> {
  protected readonly configDecoder = configDecoder;
  private readonly loader = new TriangleLoader(CyberPreset.triangle);

  protected override onReady(): void {
    this.ownEffect(this.loader);
  }
  protected override onUpdate(deltaSeconds: number): void {
    super.onUpdate(deltaSeconds);
    this.loader.draw(
      this.node.getChildGraphics('emblem').view,
      this.node.getChildGraphics('dust').view,
      { x: 0, y: 0, radius: this.config.radius, scale: 1 },
      CyberPreset.trianglePalette,
    );
  }
  setMotionPreference(reduced: boolean): void {
    this.setUiReducedMotion(reduced);
  }
}
```

</details>

Зарегистрируем `group.add('LoadingEmblem', LoadingEmblem)` в `registerComponents()`, затем добавим обёртку в layout:

```json
{
  "type": "Container",
  "components": { "loading": { "type": "LoadingEmblem", "data": { "radius": 64 } } },
  "children": {
    "emblem": { "type": "Graphics" },
    "dust": { "type": "Graphics" }
  }
}
```

Приложение вызывает `setMotionPreference()` после загрузки настроек и при их изменении. Enable/disable ставит эффект на паузу, detach освобождает его. В переопределённых хуках сохраняем вызов `super`; из `onDetach()` возвращаем его результат.

`uiViewport` содержит логические `width/height`, CSS-размеры `cssWidth/cssHeight` и `scale`. Положение узла задаётся layout; для эмблемы в этом примере используется локальный центр `(0, 0)`.
