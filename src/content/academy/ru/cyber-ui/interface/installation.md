---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/installation",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 1,
  "title": "Установка: PixiJS или SDK",
  "concept": "Core и SDK",
  "description": "Выберем пакет и запустим интерфейс без игрового движка.",
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

Два пакета отделяют оформление от интеграции с игровым движком.

| Пакет | Что делает | Когда нужен |
| --- | --- | --- |
| `@gamedevland/cyber-ui` | Панели, кнопки, иконки и все визуальные эффекты | Любой проект на PixiJS 8 |
| `@gamedevland/cyber-ui-sdk` | `ToolkitComponent` и действие `PanelReveal` | Проект на GameDevLand SDK |

Без SDK весь визуальный API core работает так же. Приложение само задаёт layout, ввод, обновление эффектов, паузу и очистку. Адаптер подключает эффекты к lifecycle компонентов SDK и добавляет действие на его твинах.

Для обычного TypeScript/Vite-проекта устанавливаем только PixiJS и core:

```bash
npm install pixi.js @gamedevland/cyber-ui
```

Создадим `main.ts` и добавим панель:

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

В следующих примерах `app` — это приложение. Для анимации передаём `ticker.deltaMS / 1000` в `effect.update()`, при удалении экрана снимаем callback и вызываем `effect.dispose()`.

Для проекта на GameDevLand SDK устанавливаем также адаптер и совместимый движок:

```bash
npm install pixi.js @gamedevland/cyber-ui @gamedevland/cyber-ui-sdk @gamedevland/engine@0.0.11
```

В нём используем существующие узлы и цикл обновления SDK: второй `Application` не нужен. Компоненты и действия адаптера разбираются в конце курса. Для разработки нужен Node.js 22.12+.
