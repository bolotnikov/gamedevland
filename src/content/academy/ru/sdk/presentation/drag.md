---
{
  "locale": "ru",
  "translationKey": "sdk/presentation/drag",
  "course": "sdk",
  "lesson": "presentation",
  "draft": true,
  "order": 10,
  "title": "Перетаскивание и предпросмотр",
  "concept": "Указатель и игровое правило",
  "description": "Отделим движение изображения от применения хода.",
  "takeaway": [
    "Предпросмотр не применяет ход.",
    "Сессия жеста принадлежит конкретному pointerId."
  ],
  "sources": [
    {
      "title": "Block Puzzle · BlockPuzzleDragComponent.ts",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/components/BlockPuzzleDragComponent.ts",
      "note": "Реальный жест и preview исходной игры."
    },
    {
      "title": "SDK · index.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/interactions/index.ts",
      "note": "Публичные элементы общего drag API."
    },
    {
      "title": "SDK · DragInputBridgeComponent.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/interactions/components/DragInputBridgeComponent.ts",
      "note": "Преобразование фаз, pointercancel и координат."
    }
  ]
}
---

В [BlockPuzzleDragComponent](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/components/BlockPuzzleDragComponent.ts) перетаскивание хранит выбранный слот, ID указателя, фигуру, предпросмотр и текущую фазу. Пока фигура движется, поле ещё не изменено.

<figure class="sdk-figure is-flow is-long"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">01</span><div><strong>Выбор слота</strong><span>Запомнить slotId и pointerId</span></div></div><div class="sdk-figure__item tone-violet"><span class="sdk-figure__index">02</span><div><strong>dragstart</strong><span>Создать сессию и показать фигуру в слое drag</span></div></div><div class="sdk-figure__item tone-green"><span class="sdk-figure__index">03</span><div><strong>drag</strong><span>Перевести координаты → previewPlacement → подсветить клетки</span></div></div><div class="sdk-figure__item tone-amber"><span class="sdk-figure__index">04</span><div><strong>dragend</strong><span>Отправить PlacementRequested либо вернуть фигуру</span></div></div><div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">05</span><div><strong>Результат</strong><span>PlacementCompleted очищает drag; отказ возвращает фигуру</span></div></div></div><figcaption>pointerId удерживает принадлежность жеста одному указателю.</figcaption></figure>

Экранные пиксели не сравниваются напрямую с координатами клеток. Компонент берёт виртуальную точку и переводит её в систему контейнера поля. `BlockPuzzleGeometryService` связывает локальную позицию с клеткой.

Предпросмотр вызывает доменную проверку и возвращает `valid`, клетки и потенциально заполненные линии. Он не записывает фигуру в Board. Применение происходит только после запроса через FSM и команду.

## Общий API перетаскивания

SDK предоставляет модуль `interactions`. В Block Puzzle используется собственная реализация; следующий набор — возможность SDK для других проектов:

- `DragInputBridgeComponent` преобразует dragstart / drag / dragend в событие с фазой и координатами.
- `DragCoreSessionService<TSession>` хранит текущую сессию перетаскивания и её tween-ресурсы.
- `BeginDragCoreCommandBase`, `UpdateDragCoreCommandBase`, `EndDragCoreCommandBase` задают общую структуру команд.
- Варианты `PointerOwned...` проверяют принадлежность сессии указателю.

При использовании bridge его `eventType` задаётся в JSON, а событие обрабатывается FSM. Правило «помещается ли фигура» остаётся в игре: общий drag-сервис не знает размер поля и занятые клетки.

Обязательно различаем отпускание и `pointercancel`. Отмена жеста не должна неожиданно применять ход. Отключение компонента снимает подписки, останавливает твины и убирает предпросмотр.
