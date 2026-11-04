---
{
  "locale": "ru",
  "translationKey": "sdk/presentation/particles",
  "course": "sdk",
  "lesson": "presentation",
  "draft": true,
  "order": 13,
  "title": "Частицы и локальные эффекты",
  "concept": "ParticlesManager",
  "description": "Пресет задаёт вид эффекта, запуск — его позицию и владельца.",
  "takeaway": [
    "Пресет, координаты и владелец эффекта задаются отдельно.",
    "Очистка локального эффекта не уничтожает общие ресурсы."
  ],
  "sources": [
    {
      "title": "SDK · ParticlesManager.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/particles/ParticlesManager.ts",
      "note": "Жизненный цикл эмиттеров и очистка поддерева."
    },
    {
      "title": "SDK · ParticleEmitterComponent.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/components/ParticleEmitterComponent.ts",
      "note": "Постоянный эмиттер на узле."
    },
    {
      "title": "SDK · DisplacementFilterComponent.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-04/packages/engine/src/layouts/components/DisplacementFilterComponent.ts",
      "note": "Владение фильтром и общая текстура."
    },
    {
      "title": "Block Puzzle · line-clear-particles.json",
      "url": "https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/assets/json/configs/scenes/game/line-clear-particles.json",
      "note": "Пресет вспышки Block Puzzle."
    }
  ]
}
---

В Block Puzzle очистка линии вызывает короткие вспышки в клетках. `PlayParticlesAction` получает ID пресета из JSON и позицию из запуска действия.

Фрагмент метода `playLineClear` из [BlockPuzzleBoardEffectsComponent.ts](https://github.com/gamedevland/block-puzzle/blob/d1dd4e35b3df7d71fcc6a3eca9f5133773f51177/game/src/scenes/game/components/BlockPuzzleBoardEffectsComponent.ts#L54):

```ts
this.trackTask(
  this.node.runAction(this.config.actionId, {
    position: this.cellPosition(cell.row, cell.column),
  }),
);
```

<figure class="sdk-figure is-flow"><div class="sdk-figure__body"><div class="sdk-figure__item tone-cyan"><span class="sdk-figure__index">01</span><div><strong>LinesCleared</strong><span>Список очищенных клеток и цвет</span></div></div><div class="sdk-figure__item tone-violet"><span class="sdk-figure__index">02</span><div><strong>GeometryService</strong><span>Локальная позиция клетки</span></div></div><div class="sdk-figure__item tone-green"><span class="sdk-figure__index">03</span><div><strong>PlayParticlesAction</strong><span>Пресет + позиция + local/world</span></div></div><div class="sdk-figure__item tone-amber"><span class="sdk-figure__index">04</span><div><strong>ParticlesManager</strong><span>Создание, обновление и завершение эмиттера</span></div></div></div><figcaption>Вся графика эффекта принадлежит контейнеру effects; игровые правила уже выполнены.</figcaption></figure>

`space: 'local'` означает координаты внутри контейнера-владельца. При `world` действие переводит переданную точку в локальную систему через `toLocalPosition`. Неправильная система координат сместит эффект после масштабирования поля.

Для длительного эффекта есть `ParticleEmitterComponent`: он живёт вместе с узлом. Для ручного управления доступны `createEmitter`, `start`, `stop`, `playOnce`, `setEmitterPosition` и `destroy`. `ParticleHandle` — идентификатор эмиттера, а `ParticlePreset` описывает его поведение.

## Владение и завершение

`destroyInSubtree(root)` очищает эмиттеры заданного поддерева; BaseScene использует его при выходе. Глобальный `destroyAll` не следует вызывать при удалении одного локального эффекта.

Пресеты должны соответствовать формату библиотеки particle-emitter. Готовый пример есть в конфигурации эффекта Block Puzzle.

Ещё один готовый визуальный компонент — `DisplacementFilterComponent`. Он искажает изображение по noise-текстуре и двигает её каждый кадр. При отключении освобождает собственные filter и Sprite, сохраняя общую текстуру ресурса. Такой эффект не используется в Block Puzzle и не нужен для очистки линий.
