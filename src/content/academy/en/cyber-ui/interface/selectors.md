---
{
  "locale": "en",
  "translationKey": "cyber-ui/interface/selectors",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 5,
  "title": "Navigation, segments, and tabs",
  "concept": "nav · segment · tab",
  "description": "Build three kinds of selection with the appropriate background.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · ButtonSurface",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/ButtonSurface.ts",
      "note": "Public API parameters and behavior."
    },
    {
      "title": "Cyber UI Toolkit · TerminalGlass",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/TerminalGlass.ts",
      "note": "Public API parameters and behavior."
    }
  ]
}
---

Place `nav` items inside one shared `TerminalGlass` panel. Inactive items are transparent; the active item has a subtle fill and a top rail. The rail uses `palette.signal`.

`segment` uses one shared `segmentTrack()`. Individual segments have no border; only the selected segment has a fill. `tab` draws a separate rounded selector with a border and underline, suitable for an agent portrait.

Change `variant` to `segment` or `tab` to build another composition. Each item has its own `Graphics`, drawn from `(0, 0)`.

<details><summary>Example code</summary>

```ts
import { Container, Graphics, Rectangle } from 'pixi.js';
import { ButtonSurface, CyberPreset, TerminalGlass, TerminalUi } from '@gamedevland/cyber-ui';
import type { ButtonVariant, TerminalIcon } from '@gamedevland/cyber-ui';

const group = app.stage.addChild(new Container());
group.position.set(24, 120);
const background = group.addChild(new Graphics());
const items: Graphics[] = [];
const t = { ...CyberPreset.palette, signal: CyberPreset.palette.accent };
const variant: Extract<ButtonVariant, 'nav' | 'segment' | 'tab'> = 'nav';
const icons: readonly TerminalIcon[] = ['battle', 'agents', 'quests'];
let selected = 0;

function redraw() {
  background.clear();
  if (variant === 'nav')
    TerminalGlass.draw(background, 0, 0, 360, 64, 10, t.panel, t.panelEdge, t.accent, t.text);
  if (variant === 'segment')
    ButtonSurface.segmentTrack(background, { x: 0, y: 0, w: 360, h: 64 }, t);
  items.forEach((item, index) => {
    ButtonSurface.draw(item.clear(), {
      width: 112, height: 52, variant, enabled: true, selected: index === selected,
    }, t);
    TerminalUi.icon(item, icons[index] ?? 'chip', 56, 26, 24,
      index === selected ? t.accent : t.muted);
  });
}
icons.forEach((icon, index) => {
  const item = group.addChild(new Graphics());
  item.position.set(8 + index * 116, 6);
  item.hitArea = new Rectangle(0, 0, 112, 52);
  item.eventMode = 'static';
  item.on('pointertap', () => { selected = index; redraw(); });
  items.push(item);
});
redraw();
```

</details>

A tap updates `selected`. The application also changes the displayed page. Keyboard navigation and accessible names belong to application controls; SDK projects route input through `node.input`.
