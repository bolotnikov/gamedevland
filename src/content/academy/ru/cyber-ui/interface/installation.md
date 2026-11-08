---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/installation",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 1,
  "title": "Подключение к проекту",
  "concept": "Core и SDK",
  "description": "Выберем пакет и нарисуем первую панель.",
  "sources": [
    {
      "title": "Cyber UI Toolkit",
      "url": "https://github.com/gamedevland/cyber-ui-toolkit",
      "note": "Пакеты, требования и публичный API."
    },
    {
      "title": "PixiJS · Graphics",
      "url": "https://pixijs.com/8.x/guides/components/scene-objects/graphics",
      "note": "Создание и добавление векторной поверхности."
    }
  ]
}
---

У Cyber UI Toolkit два пакета. Основной содержит панели, кнопки, иконки и эффекты. Его можно использовать в любом проекте на PixiJS. Второй — необязательный адаптер для GameDevLand SDK.

<figure class="sdk-boundary cyber-packages">
  <div class="sdk-boundary__modules">
    <section class="sdk-boundary__module-group is-cyan">
      <h4>Основной пакет</h4>
      <p class="cyber-packages__name"><code>@gamedevland/cyber-ui</code></p>
      <ul><li><strong>Панели</strong></li><li><strong>Кнопки</strong></li><li><strong>Иконки</strong></li><li><strong>Эффекты</strong></li></ul>
      <p class="cyber-packages__use">Работает с PixiJS 8. Движок не нужен.</p>
    </section>
    <section class="sdk-boundary__module-group is-green">
      <h4>Необязательный SDK-адаптер</h4>
      <p class="cyber-packages__name"><code>@gamedevland/cyber-ui-sdk</code></p>
      <ul><li><code>ToolkitComponent</code><span>Эффекты в компонентах движка</span></li><li><code>PanelReveal</code><span>Появление и закрытие панелей</span></li></ul>
      <p class="cyber-packages__use">Добавляется к основному пакету в проектах на GameDevLand SDK.</p>
    </section>
  </div>
</figure>

Если движок не нужен, достаточно PixiJS и основного пакета:

```bash
npm install pixi.js @gamedevland/cyber-ui
```

Добавим в `main.ts` приложение PixiJS и стеклянную панель:

```ts
import { Application, Graphics } from 'pixi.js';
import { CyberPreset, TerminalGlass } from '@gamedevland/cyber-ui';

const app = new Application();
await app.init({ width: 480, height: 320, background: 0x07111d });
document.body.appendChild(app.canvas);

const panel = app.stage.addChild(new Graphics());
const t = CyberPreset.palette;
TerminalGlass.draw(panel, 24, 24, 432, 272, 12,
  t.panel, t.panelEdge, t.accent, t.text);
```

В остальных примерах используем этот же `app`.

Для игры на GameDevLand SDK устанавливаем ещё и адаптер:

```bash
npm install pixi.js @gamedevland/cyber-ui @gamedevland/cyber-ui-sdk @gamedevland/engine@0.0.11
```

В такой игре рисуем в уже созданных узлах сцены. Адаптер помогает обновлять эффекты и останавливать их при закрытии сцены. Его подключение разберём в уроке про SDK.
