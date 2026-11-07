---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/icons-theme",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 5,
  "title": "Icons and palette",
  "concept": "TerminalIcon · CyberPreset",
  "description": "Add vector symbols and change the accent color.",
  "takeaway": [
    "Icon coordinates specify the center, not the top-left corner."
  ],
  "sources": [
    {
      "title": "Cyber UI Toolkit · TerminalUi",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/TerminalUi.ts",
      "note": "The full set of icon names and their geometry."
    },
    {
      "title": "Cyber UI Toolkit · CyberPreset",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/CyberPreset.ts",
      "note": "Immutable default settings."
    }
  ]
}
---

`TerminalUi.icon()` takes a name, center, size, and color. The `TerminalIcon` type limits the available names, so TypeScript catches a typo.

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

Icons consist of vector lines and shapes. They need no image atlas. Color is an RGB number, such as `0x68e0cb`.

`CyberPreset.palette` is frozen. We make a copy, change the fields we need, and pass the same palette to surfaces and buttons. Names such as `accent`, `danger`, and `text` describe each color’s purpose, so changing the theme does not require rewriting elements.

The 27 names include `chip`, `battle`, `agents`, `skills`, `gear`, `credit`, `play`, `check`, `repair`, `scan`, and the `left`/`right` arrows. The full union is available in editor suggestions and the README.
