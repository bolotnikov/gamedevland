---
{
  "locale": "ru",
  "translationKey": "sdk/presentation/nodes",
  "course": "sdk",
  "lesson": "presentation",
  "draft": true,
  "order": 2,
  "title": "Узел и его отображение",
  "concept": "NodeBase и PixiJS",
  "description": "Узел связывает объект PixiJS с компонентами, вводом и временем жизни.",
  "takeaway": [
    "NodeBase владеет поведением узла; view — его объект PixiJS.",
    "Игровые визуальные изменения остаются в компонентах и действиях."
  ],
  "sources": [
    {
      "title": "SDK · NodeBase.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/nodes/NodeBase.ts",
      "note": "Фасады и поиск узлов."
    },
    {
      "title": "SDK · types.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/nodes/types.ts",
      "note": "Контракты готовых видов узлов."
    },
    {
      "title": "SDK · Engine.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/core/Engine.ts",
      "note": "Создание WebGL renderer."
    },
    {
      "title": "SDK · TexturedRope.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/nodes/TexturedRope.ts",
      "note": "Специализированный узел с геометрией и точками."
    }
  ]
}
---

`NodeBase` — базовый объект визуального дерева SDK. Он хранит `view`, то есть объект PixiJS, и предоставляет фасады для событий, ввода, компонентов, действий и анимаций.

Это два связанных уровня:

<figure class="sdk-figure is-layers"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><div><strong>Компонент / действие</strong><span>Меняет текст, масштаб, текстуру или запускает эффект</span></div></div><div class="sdk-figure__item tone-violet"><div><strong>Узел SDK</strong><span>NodeBase: методы, дети, input, tweens, lifecycle</span></div></div><div class="sdk-figure__item tone-green"><div><strong>view</strong><span>Container, Sprite, Text, Graphics или MeshRope PixiJS</span></div></div><div class="sdk-figure__item tone-amber"><div><strong>Renderer</strong><span>Движок создаёт WebGL renderer и выводит дерево на canvas</span></div></div></div><figcaption>Игровое визуальное поведение работает с узлом; рендеринг выполняет PixiJS.</figcaption></figure>

## Готовые типы

| Узел | Назначение |
| --- | --- |
| Container | Группировка дочерних узлов |
| Sprite | Изображение |
| Text | Текст |
| Graphics | Фигура, в том числе прямоугольная область |
| TilingSprite | Повторяющаяся текстура |
| TexturedRope | Текстура вдоль цепочки точек |
| Empty | Логический узел без собственной графики |

Типы нужно зарегистрировать в DI проекта. Block Puzzle использует первые четыре; остальные доступны для других игр.

Например, из компонента корневого узла найдём поле и счётчик, затем изменим их:

```ts
const board = this.node.getChildContainer('gameplay.board');
const label = this.node.getChildText('score');
label.setText('120');
board.setVisible(true);
```

Пути здесь относительны узлу `root`. `SceneLayout.getText('root.score')` ищет по полному ID. Методы поиска сообщают об отсутствии узла; для получения типа компонента есть `getComponent(ExpectedClass)`, который проверяет экземпляр.

`Text.setText`, `Sprite.setTextureByAssetId`, `setPosition`, `setScale`, `setTint` и другие фасады сохраняют мутации рядом с визуальным владельцем. Если требуется новый тип представления, регистрируется фабрика узла со статическим `create`. Для поведения уже существующего Sprite обычно достаточно компонента.

Фабрика создаёт узел, layout задаёт его свойства, а PixiJS выводит изображение. Прямую работу с `view` оставляем компонентам или действиям, которым она действительно нужна.
