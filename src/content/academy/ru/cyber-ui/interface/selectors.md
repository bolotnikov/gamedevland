---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/selectors",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 5,
  "title": "Навигация, сегменты и вкладки",
  "concept": "nav · segment · tab",
  "description": "Соберём три вида выбора с правильной общей подложкой.",
  "sources": [
    {
      "title": "Cyber UI Toolkit · ButtonSurface",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/ButtonSurface.ts",
      "note": "Параметры и поведение публичного API."
    },
    {
      "title": "Cyber UI Toolkit · TerminalGlass",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit/blob/main/packages/core/src/TerminalGlass.ts",
      "note": "Параметры и поведение публичного API."
    }
  ]
}
---

`nav` помещаем внутрь одной панели `TerminalGlass`: неактивный пункт прозрачен, активный получает лёгкую заливку и верхнюю полоску. Акцент полоски берётся из `palette.signal`.

`segment` использует один общий `segmentTrack()`. У самих сегментов нет рамок: заполнен только выбранный. `tab` рисует отдельный скруглённый элемент с рамкой и подчёркиванием — например, для портрета агента.

В примере изменим `variant` на `segment` или `tab`, чтобы получить другую композицию. Каждый пункт имеет отдельный `Graphics`; координаты рисунка начинаются с `(0, 0)`.

<details><summary>Код примера</summary>

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

Нажатие меняет только `selected`. В приложении этот выбор также переключает содержимое страницы. Для клавиатуры и доступного имени используем элементы управления приложения; в SDK ввод проходит через `node.input`.
