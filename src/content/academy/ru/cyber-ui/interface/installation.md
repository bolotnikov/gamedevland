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
  "description": "Установим пакет и выведем первую панель.",
  "takeaway": [
    "Core работает с PixiJS 8 без GameDevLand SDK."
  ],
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

`@gamedevland/cyber-ui` рисует панели, кнопки и иконки в объектах [PixiJS Graphics](https://pixijs.com/8.x/guides/components/scene-objects/graphics). Для обычного Pixi-проекта достаточно core. Пакет `@gamedevland/cyber-ui-sdk` понадобится позже, для компонентов и действий нашего SDK.

```bash
npm install pixi.js @gamedevland/cyber-ui
```

Создадим приложение в TypeScript/Vite-проекте и добавим панель:

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

Панель строится из векторной геометрии: изображения для неё не нужны. В следующих примерах `app` обозначает это уже созданное приложение. В проекте на SDK второй `Application` создавать не нужно — используем существующие узлы сцены.

Для разработки нужен Node.js 22.12+. Пакеты доступны в npm. Для установки локальной сборки выполни `npm run pack` в репозитории тулкита и передай созданный `.tgz` в `npm install`. Это тот же пакет, который предназначен для npm.
