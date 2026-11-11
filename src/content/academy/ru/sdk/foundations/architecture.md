---
{
  "locale": "ru",
  "translationKey": "sdk/foundations/architecture",
  "course": "sdk",
  "lesson": "foundations",
  "draft": false,
  "order": 1,
  "title": "Что даёт GameDevLand SDK",
  "concept": "Границы игры и движка",
  "description": "Проект определяет поведение игры и использует модули движка через публичный API.",
  "takeaway": [
    "Доменная логика, сценарии и представление игры остаются в проекте.",
    "Модули движка предоставляют публичный API для общих задач игры."
  ],
  "sources": [
    {
      "title": "SDK · README.md",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/README.md",
      "note": "Назначение двух пакетов и границы SDK."
    },
    {
      "title": "Engine · package.json",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/package.json",
      "note": "Поле exports перечисляет публичные модули движка."
    },
    {
      "title": "SDK · AudioManager.ts",
      "url": "https://github.com/gamedevland/sdk/blob/sdk-2026-11-10/packages/engine/src/audio/AudioManager.ts",
      "note": "Публичный метод playSfx для воспроизведения звуковых эффектов."
    }
  ]
}
---

[GameDevLand SDK](https://github.com/gamedevland/sdk) предоставляет готовые модули для разработки HTML5-игр. На его основе можно создавать разные игры, сохраняя их логику в отдельных проектах. Пакет `@gamedevland/engine` работает в браузере, а `@gamedevland/vite` подготавливает запуск и сборку проекта. Для отрисовки можно выбрать PixiJS, Three.js, Three с Pixi-интерфейсом или Three внутри Pixi-текстуры.

<aside class="lesson-note" aria-labelledby="sdk-definition">
  <span class="lesson-note__label">Термин</span>
  <h3 id="sdk-definition">SDK</h3>
  <p>Набор инструментов и API, через которые игра использует готовые возможности движка.</p>
</aside>

<a id="where-the-boundaries-lie" class="translation-anchor" aria-hidden="true"></a>
## Где проходят границы

**Проект отвечает за саму игру:** её правила, состояние, сценарии и представление. Доменная логика — правила и данные предметной области игры — остаётся в проекте.

**SDK отвечает за общую инфраструктуру.** Движок разделён на модули: каждый решает свою задачу и предоставляет публичный API — методы, типы и точки расширения, доступные проекту.

<figure class="sdk-boundary" aria-label="Проект использует публичный API модулей движка: управление игрой, экран и ввод, звук, эффекты и физика, инфраструктура">
  <div class="sdk-boundary__columns">
    <section class="sdk-boundary__side is-game" aria-labelledby="sdk-game-responsibility">
      <header><span class="sdk-boundary__kind">Конкретная игра</span><h3 id="sdk-game-responsibility">Проект</h3></header>
      <dl>
        <div><dt><span class="sdk-boundary__icon is-symbol" aria-hidden="true">ƒ</span><span>Доменная логика</span></dt><dd>Правила и состояние игры</dd></div>
        <div><dt><span class="sdk-boundary__icon is-symbol" aria-hidden="true">→</span><span>Игровые сценарии</span></dt><dd>Порядок действий и реакция на события</dd></div>
        <div><dt><span class="sdk-boundary__icon is-layout" aria-hidden="true"><i></i><i></i><i></i></span><span>Представление</span></dt><dd>Структура и поведение интерфейса</dd></div>
      </dl>
    </section>
    <div class="sdk-boundary__connection"><span>Использует API модулей</span><span aria-hidden="true">↓</span></div>
    <section class="sdk-boundary__side is-engine" aria-labelledby="sdk-engine-responsibility">
      <header><span class="sdk-boundary__kind">@gamedevland/engine</span><h3 id="sdk-engine-responsibility">Модули движка</h3></header>
      <div class="sdk-boundary__api"><strong>Публичный API модулей</strong><span>Методы · типы · точки расширения</span></div>
      <div class="sdk-boundary__modules">
        <section class="sdk-boundary__module-group is-violet" aria-labelledby="sdk-modules-violet">
          <h4 id="sdk-modules-violet">Управление игрой</h4>
          <ul>
            <li><code>core</code><span>Запуск и работа движка</span></li>
            <li><code>scenes</code><span>Переходы и жизненный цикл сцен</span></li>
            <li><code>fsm</code><span>Состояния и переходы</span></li>
            <li><code>commands</code><span>Выполнение команд</span></li>
            <li><code>events</code><span>Отправка событий и подписки</span></li>
          </ul>
        </section>
        <section class="sdk-boundary__module-group is-cyan" aria-labelledby="sdk-modules-cyan">
          <h4 id="sdk-modules-cyan">Экран и ввод</h4>
          <ul>
            <li><code>layouts</code><span>Общие узлы, компоненты и действия</span></li>
            <li><code>renderers</code><span>Pixi, Three и их совместная работа</span></li>
            <li><code>prefabs</code><span>Создание узлов из шаблонов</span></li>
            <li><code>screen</code><span>Размеры и адаптация экрана</span></li>
            <li><code>input</code><span>События указателя и колеса</span></li>
            <li><code>interactions</code><span>Управление перетаскиванием</span></li>
          </ul>
        </section>
        <section class="sdk-boundary__module-group is-green" aria-labelledby="sdk-modules-green">
          <h4 id="sdk-modules-green">Звук, эффекты и физика</h4>
          <ul>
            <li><code>audio</code><span>Воспроизведение и каналы</span></li>
            <li><code>tween</code><span>Анимация свойств</span></li>
            <li><code>particles</code><span>Эмиттеры частиц</span></li>
            <li><code>physics</code><span>Тела и физическая симуляция</span></li>
          </ul>
        </section>
        <section class="sdk-boundary__module-group is-amber" aria-labelledby="sdk-modules-amber">
          <h4 id="sdk-modules-amber">Инфраструктура</h4>
          <ul>
            <li><code>assets</code><span>Загрузка и хранение ресурсов</span></li>
            <li><code>configs</code><span>Настройки, сохранения и локализация</span></li>
            <li><code>di</code><span>Регистрация и получение зависимостей</span></li>
            <li><code>validation</code><span>Проверка и декодирование данных</span></li>
            <li><code>errors</code><span>Типы ошибок движка</span></li>
            <li><code>platforms</code><span>Интеграция с игровыми площадками</span></li>
          </ul>
        </section>
      </div>
    </section>
  </div>
  <figcaption>Публичные модули движка сгруппированы по назначению. Схема показывает состав движка, а не зависимости между модулями.</figcaption>
</figure>

Такое разделение позволяет менять игру, не переписывая общие механизмы движка. Движок можно развивать независимо от правил конкретной игры: пока API остаётся совместимым, проекту не нужно подстраиваться под его внутренние изменения.

<a id="the-api-boundary" class="translation-anchor" aria-hidden="true"></a>
## Граница на уровне API

Проект выбирает звук и момент его запуска. Для воспроизведения он вызывает метод аудиомодуля SDK. Например:

```ts
engine.audio.playSfx(soundId);
```

Здесь `engine` — экземпляр движка, `soundId` — идентификатор подготовленного звука. Метод `playSfx` выполняет воспроизведение с учётом настроек звука. Когда вызвать метод и какой звук передать, определяет игра.
