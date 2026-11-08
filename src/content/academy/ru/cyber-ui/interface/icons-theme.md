---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/icons-theme",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 7,
  "title": "Иконки и палитра",
  "concept": "TerminalIcon · CyberPreset",
  "description": "Добавим векторные знаки и изменим акцент.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · TerminalUi",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/TerminalUi.ts",
      "note": "Полный набор имён и геометрия иконок."
    },
    {
      "title": "Cyber UI Toolkit · CyberPreset",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/CyberPreset.ts",
      "note": "Неизменяемые настройки по умолчанию."
    }
  ]
}
---

В `TerminalUi.icon()` передаём имя, центр, размер и цвет. Тип `TerminalIcon` ограничивает доступные имена — опечатка обнаружится при проверке TypeScript.

```ts
import { Graphics } from 'pixi.js';
import { CyberPreset, TerminalUi } from '@gamedevland/cyber-ui';
import type { TerminalIcon } from '@gamedevland/cyber-ui';

const palette = { ...CyberPreset.palette, accent: 0x68e0cb };
const g = app.stage.addChild(new Graphics());
const icon: TerminalIcon = 'gear';
TerminalUi.icon(g, icon, 32, 32, 24, palette.accent);
TerminalUi.icon(g, 'heart', 72, 32, 24, palette.danger);
TerminalUi.icon(g, 'lock', 112, 32, 24, palette.muted);
```

Иконки состоят из векторных линий и фигур. Им не нужен атлас изображений. Цвет задаётся числом RGB, например `0x68e0cb`.

`CyberPreset.palette` заморожена. Создаём копию и меняем нужные поля, затем передаём одну палитру поверхностям и кнопкам. Названия `accent`, `danger`, `text` описывают назначение цвета, поэтому тема меняется без переписывания элементов.

Полный набор `TerminalIcon`:

```text
chip battle agents skills quests gear bolt calendar credit capsule key left right exit play lock chest check speed target burst repair heart scan snow boss flag
```

Палитра `ButtonPalette`: `background`, `panel`, `inset`, `panelEdge`, `signal`, `focus`, `accent`, `steel`, `sapphire`, `text`, `muted`, `danger`. Варианты кнопок используют разные поля: `signal` — полоса nav, `sapphire` — активный сегмент, `focus` — рамка выбранной icon-кнопки. `CyberPreset` также предоставляет `triangle`, `trianglePalette`, `textEcho`, `glitch`.
