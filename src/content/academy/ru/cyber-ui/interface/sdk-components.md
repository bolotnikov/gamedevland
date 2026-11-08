---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/sdk-components",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 14,
  "title": "Подключение к GameDevLand SDK",
  "concept": "ToolkitComponent",
  "description": "Добавим загрузчик в компонент движка.",
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

Этот урок нужен для игры на GameDevLand SDK. В обычном PixiJS-проекте достаточно примеров из предыдущих уроков.

Создадим компонент `LoadingEmblem`. Он рисует треугольник в двух дочерних узлах. Вызов `ownEffect()` позволяет движку обновлять эффект вместе с компонентом, ставить его на паузу и удалять при закрытии сцены.

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

Зарегистрируем компонент в `registerComponents()`:

```ts
group.add('LoadingEmblem', LoadingEmblem);
```

Добавим его к контейнеру в layout:

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

Настройку движения передаём через `setMotionPreference()`. В `onUpdate()` сначала вызываем `super.onUpdate(deltaSeconds)`: он обновляет эффект, после чего можно нарисовать новый кадр.

`uiViewport` возвращает размеры игрового экрана (`width`, `height`), размеры в браузере (`cssWidth`, `cssHeight`) и масштаб (`scale`).
