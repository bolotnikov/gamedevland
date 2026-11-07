---
{
  "locale": "ru",
  "translationKey": "cyber-ui/interface/sdk-components",
  "course": "cyber-ui",
  "lesson": "interface",
  "draft": false,
  "order": 10,
  "title": "Компонент GameDevLand SDK",
  "concept": "ToolkitComponent",
  "description": "Нарисуем панель в узле из layout JSON.",
  "takeaway": [
    "SDK владеет узлами и обновлением; адаптер передаёт lifecycle эффектам."
  ],
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

Установим адаптер вместе с совместимой версией SDK:

```bash
npm install @gamedevland/cyber-ui @gamedevland/cyber-ui-sdk @gamedevland/engine@0.0.11 pixi.js
```

Компонент рисует в `this.node.view`. Размеры находятся в проверенных настройках, положение задаётся родительским layout. Полный типизированный [CyberPanel](https://github.com/gamedevland/cyber-ui-toolkit/blob/main/examples/sdk/src/CyberPanel.ts) есть среди примеров пакета.

Зарегистрируем класс в `GlobalDiDefinition.registerComponents()`:

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

Для анимации наследуемся от `ToolkitComponent` и регистрируем эффект через `ownEffect()` в `onReady()`. Базовый `onUpdate()` передаёт секунды, enable/disable управляют паузой, detach освобождает эффекты. При переопределении вызывай базовые хуки; из `onDetach()` возвращай `super.onDetach()`. В `setUiReducedMotion()` передавай актуальное предпочтение игрока.

Новый `Application` или ticker внутри компонента не нужен. `uiViewport` разделяет логический размер, CSS-размер и масштаб; размеры конкретного узла задаёт приложение.
