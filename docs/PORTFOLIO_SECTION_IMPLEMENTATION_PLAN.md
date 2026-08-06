# Implementation plan: раздел Games со Stickers Merge

## 1. Статус и цель

Статус документа: готов к реализации. Промо-ассеты добавлены, standalone web build опубликован и
проверен.

Цель первой итерации — добавить в `gamedevland` рабочий раздел портфолио только с одной игрой:
`Stickers Merge`.

Пользовательский путь должен быть завершенным:

```text
Top menu: Games
  -> /games
    -> карточка Stickers Merge
      -> /games/stickers-merge
        -> playable iframe
        -> описание и технические детали
        -> ссылки на Poki и связанный workshop
```

Архитектура должна позволять позднее добавить следующую игру отдельным Markdown-файлом и ассетами,
без копирования страниц или изменения существующих компонентов.

## 2. Scope этой итерации

### Входит в работу

- пункт `Games` в header и footer;
- индексная страница `/games`;
- одна карточка `Stickers Merge`;
- detail page `/games/stickers-merge`;
- Astro Content Collection `games`;
- оригинальные icon, cover, logo, screenshots и promo video Stickers Merge;
- iframe отдельной GitHub Pages-сборки;
- fallback и внешние ссылки, если iframe временно недоступен;
- официальный графический badge `Play on Poki` со ссылкой на страницу игры;
- английский пользовательский контент;
- metadata, responsive layout, accessibility и production build validation.

### Не входит в работу

- Fish Sort, Block Puzzle, Hidden Pigeon и другие игры;
- фильтры, поиск и категории на индексной странице;
- featured-layout для одной игры;
- автоматическая загрузка данных с Poki;
- локализация раздела;
- изменение кода самой Stickers Merge;
- изменение deployment pipeline уже опубликованной standalone-сборки;
- analytics событий карточки и iframe;
- JSON-LD.

Standalone web build уже опубликован в отдельном репозитории `stickers-merge-game`. Portfolio page
должна встраивать его с `https://bolotnikov.github.io/stickers-merge-game/` и сохранять Poki как
официальную внешнюю страницу игры.

## 3. Подтвержденные данные Stickers Merge

### Публичные данные

| Поле | Значение | Источник |
| --- | --- | --- |
| Название | `Stickers Merge` | Poki и материалы блога |
| Slug | `stickers-merge` | URL Poki |
| Статус | `released` | игра опубликована на Poki |
| Жанр | `Merge game` | Poki |
| Релиз | май 2026 | Poki; в schema достаточно `releaseYear: 2026` |
| Платформы | desktop, phone, tablet | Poki |
| Автор на Poki | `Alex` | Poki |
| Poki URL | `https://poki.com/en/g/stickers-merge` | публичная страница игры |
| Playable URL | `https://bolotnikov.github.io/stickers-merge-game/` | опубликованный standalone web build |
| Связанный материал | `/articles/adaptive-layout-poki-en` | существующий workshop блога |
| Icon | `/assets/games/stickers-merge/icon.jpg` | оригинальная квадратная промо-иконка, 900×900 |
| Landscape cover | `/assets/games/stickers-merge/cover-land-en.png` | оригинальный key art, 800×470 |
| Logo | `/assets/games/stickers-merge/logo.png` | прозрачный брендовый wordmark, 1165×499 |
| Screenshots | `/assets/games/stickers-merge/en/screens/` | по 5 кадров в landscape и portrait |
| Promo videos | `/assets/games/stickers-merge/en/videos/` | 25 секунд, landscape/portrait, WebM/MP4 |
| Poki badge | `/assets/poki/poki-badge_dark.svg` | официальный badge 136×40 |

Публичные данные Poki проверены 31 июля 2026 года. Динамические показатели вроде рейтинга и числа
голосов в portfolio content не переносятся, потому что быстро устаревают.

### Подтвержденные технические темы

По исходному проекту и существующему workshop можно безопасно указать:

- HTML5 game;
- TypeScript 5;
- PixiJS 8;
- Matter.js 0.20;
- GSAP 3;
- Howler.js 2;
- Vite 7;
- custom game engine;
- platform adapters, включая Poki integration и standalone web mode;
- adaptive layout для desktop, mobile и tablet;
- отдельные virtual screen модели для landscape и portrait;
- responsive physics bounds;
- resize-safe UI и gameplay composition.

На карточке следует показывать не больше трех ключевых технологий: `TypeScript`, `PixiJS`,
`Matter.js`. Более полный stack выводится на detail page. Номера patch-версий в пользовательском
тексте не нужны, чтобы portfolio content не устаревал после каждого dependency update.

### Краткое описание для первой версии

Рабочая английская формулировка, которую нужно финально вычитать перед публикацией:

> A relaxing merge game about completing colorful sticker books. Find matching stickers, merge them,
> and bring each collection to life one page at a time.

Расширенный текст detail page должен быть написан своими словами на основе реальной механики и
существующего workshop. Нельзя копировать длинное описание Poki дословно.

## 4. Ассеты и оставшиеся контентные решения

### 4.1. Назначение готовых ассетов

| Файл | Использование |
| --- | --- |
| `icon.jpg` | основной visual карточки `/games`; компактная icon рядом с metadata на detail page |
| `cover-land-en.png` | главный cover на detail page; Open Graph image для index и detail pages |
| `logo.png` | опциональный брендовый wordmark в верхней части detail page |
| `en/screens/land/{1,4,5}.png` | landscape gallery: gameplay, completion, album selection |
| `en/screens/port/{1,4,5}.png` | соответствующие portrait-версии тех же состояний |
| `en/videos/land.{webm,mp4}` | landscape sources основного promo video |
| `en/videos/port.{webm,mp4}` | portrait sources основного promo video |
| `/assets/poki/poki-badge_dark.svg` | кликабельный badge на официальную Poki page |

Правила использования:

- Для MVP использовать файлы напрямую в предоставленных форматах и не создавать дублирующие WebP
  без подтвержденной экономии размера.
- `icon.jpg` показывать в квадратном контейнере без обрезания смысловых элементов.
- `cover-land-en.png` сохранять в пропорции `800 / 470`; не растягивать и не использовать как фон с
  агрессивным crop.
- `logo.png` имеет alpha channel. Его можно расположить как брендовый акцент, но страница все равно
  должна содержать текстовый `<h1>Stickers Merge</h1>`.
- Не использовать `logo.png` внутри карточки: текст логотипа будет слишком мелким и продублирует
  название.
- Не использовать старую workshop cover `/assets/adaptive-layout-poki-en.png` как основной portfolio
  visual: теперь есть официальный key art игры.
- В gallery использовать пары кадров `1`, `4`, `5`: они показывают основной gameplay, завершение
  альбома и экран выбора. Кадры `2` и `3` не выводить в MVP, так как они повторяют gameplay с другими
  темами и заметно увеличивают initial page weight.
- Gallery images загружать через `loading="lazy"`, фиксировать их aspect ratio и давать содержательные
  alt-тексты. Landscape и portrait кадры должны быть видимы как доказательство адаптивности, а не
  автоматически заменять друг друга так, чтобы пользователь видел только одну ориентацию.
- Promo video выводить только после iframe и основного описания. Использовать `<video controls
  playsinline preload="metadata">`, WebM как первый source и MP4 как fallback; autoplay не включать.
- Для video выбирать landscape или portrait sources через `media` у `<source>`. При изменении
  ориентации допустима повторная загрузка выбранного source.
- Не загружать video целиком до действия пользователя. В качестве poster использовать
  соответствующий screenshot `1.png`.
- Для светлого фона сайта использовать `/assets/poki/poki-badge_dark.svg`. Badge показывать в
  оригинальной пропорции `136 / 40`, без перерисовки и без текста поверх изображения.
- Badge является ссылкой на `https://poki.com/en/g/stickers-merge`, открывается в новой вкладке с
  `rel="noreferrer"` и получает доступное имя `Play Stickers Merge on Poki`.

### 4.2. Оставшиеся решения по тексту

Перед финальной публикацией нужно согласовать только точную формулировку `My role`: например,
`Creator and developer` либо более подробный список зон ответственности. Полный набор visual media и
playable iframe уже доступны и не являются блокерами.

## 5. Целевая структура файлов

```text
gamedevland/
  public/assets/games/stickers-merge/
    icon.jpg
    cover-land-en.png
    logo.png
    en/
      screens/
        land/{1..5}.png
        port/{1..5}.png
      videos/
        land.webm
        land.mp4
        port.webm
        port.mp4
  public/assets/poki/
    poki-badge_dark.svg
  src/components/game/
    GameCard.astro
    GameEmbed.astro
    GameMediaShowcase.astro
    PokiBadgeLink.astro
  src/content/games/
    stickers-merge.md
  src/pages/games/
    index.astro
    [slug].astro
  docs/
    PORTFOLIO_SECTION_TZ.md
    PORTFOLIO_SECTION_IMPLEMENTATION_PLAN.md
```

Изменяемые shared-файлы:

- `src/content.config.ts`;
- `src/components/common/Header.astro`;
- `src/components/common/Footer.astro`;
- `src/layouts/Layout.astro`;
- `src/styles/global.css` и при необходимости `src/styles/tokens.css`.

Не нужно создавать отдельный component для каждого маленького metadata-поля. Повторяемые и
ответственные элементы первой итерации — карточка и iframe; остальная композиция может оставаться в
page template до появления реальной повторяемости.

## 6. Этапы реализации

### Этап 0. Подготовить ассеты и playable build

Статус: выполнен.

Готовый результат:

- оригинальные `icon.jpg`, `cover-land-en.png`, `logo.png`, screenshots и promo videos находятся в
  `public/assets/games/stickers-merge/`;
- официальный Poki badge находится в `public/assets/poki/poki-badge_dark.svg`;
- размеры, пропорции и alpha channel проверены;
- standalone build собран с `VITE_PLATFORM=web`;
- build опубликован в `bolotnikov/stickers-merge-game`;
- `https://bolotnikov.github.io/stickers-merge-game/` и главный JS bundle возвращают HTTP 200;
- GitHub Pages не отдает iframe-блокирующие `X-Frame-Options` или CSP `frame-ancestors`;
- пользователь подтвердил, что опубликованная игра работает.

Дополнительная конвертация изображений и поиск promo media для MVP не требуются. Оптимизацию тяжелых
video/screenshots выполнять только при выявленной проблеме загрузки и без замены исходных файлов.

### Этап 1. Добавить collection `games`

Статус: не начат.

Файл: `src/content.config.ts`.

Работы:

1. Добавить `games` через `defineCollection` и `glob` из `src/content/games`.
2. Добавить schema только для реально используемых в первой версии полей.
3. Переиспользовать требования основного ТЗ: status enum, mutually exclusive release date/year,
   typed arrays и optional URL/image fields.
4. Добавить refinement, запрещающий одновременно `releaseDate` и `releaseYear`.
5. Экспортировать `games` рядом с существующей collection `articles`, не меняя ее schema.

Минимальная schema первой итерации:

```text
title
description
status
releaseYear
genre
platforms
technologies
roles
iconImage
iconAlt
coverImage
coverAlt
logoImage
screenshots
promoVideo
playableUrl
externalUrl
articleUrl
orientation
embedAspectRatio
order
draft
```

`playableUrl` остается optional в общей schema для будущих игр без web build, но у Stickers Merge он
обязательно заполнен GitHub Pages URL. `externalUrl` содержит страницу Poki и не используется как
iframe source. `logoImage` optional и используется только detail template.

`screenshots` — массив пар `{ landscapeSrc, portraitSrc, alt }`, чтобы одна запись описывала одно и
то же состояние игры в двух ориентациях. `promoVideo` — объект с `landscapeWebm`, `landscapeMp4`,
`portraitWebm`, `portraitMp4` и poster images. Все media fields optional для будущих игр, но заполнены
у Stickers Merge.

Проверка:

- корректная запись проходит `npm run build`;
- неверный status или URL останавливает build с понятной schema error;
- articles продолжают загружаться без изменений.

### Этап 2. Добавить контент Stickers Merge

Статус: не начат.

Файл: `src/content/games/stickers-merge.md`.

Работы:

1. Заполнить frontmatter подтвержденными данными.
2. Установить `releaseYear: 2026`, не придумывая точный день релиза.
3. Указать Poki page в `externalUrl`.
4. Указать существующий workshop в `articleUrl`.
5. Указать `playableUrl: https://bolotnikov.github.io/stickers-merge-game/`.
6. Указать asset paths для `iconImage`, `coverImage` и `logoImage` из раздела 4.1.
7. Добавить три screenshot pairs с индексами `1`, `4`, `5` и точными alt-текстами для показанных
   состояний игры.
8. Добавить четыре video source и posters из screenshot pair `1`.
9. Написать английский Markdown body с секциями:
   - `About the game`;
   - `How it plays`;
   - `My role`;
   - `Technical highlights`;
   - `Responsive across devices`.
10. Отразить реальный вклад автора и не повторять boilerplate из Poki.

Рекомендуемые highlights:

- responsive virtual screen for portrait and landscape;
- separation between engine layout primitives and game-specific composition;
- physics bounds rebuilt safely after viewport changes;
- readable UI and stable gameplay during resize/orientation changes.

Проверка:

- collection entry проходит schema validation;
- все внутренние и внешние ссылки существуют;
- нет `TBD`, неподтвержденных технологий и пустых секций.

### Этап 3. Расширить shared layout и navigation

Статус: не начат.

Файлы:

- `src/components/common/Header.astro`;
- `src/components/common/Footer.astro`;
- `src/layouts/Layout.astro`.

Работы:

1. Расширить тип `Header.current` значением `games`.
2. Добавить `Games` между `Home` и `About`.
3. Использовать `current="games"` на обеих portfolio pages.
4. Добавить `Games` в footer section links.
5. Расширить `Layout` optional props для canonical и Open Graph metadata:
   - `canonicalPath`;
   - `image`;
   - `ogType`.
6. Формировать абсолютные canonical/OG URL через `Astro.site`, не хардкодить домен в каждой page.
7. Сохранить текущее поведение всех существующих страниц при отсутствии новых props.

Проверка:

- Home/About active states не изменились;
- Games active state работает на index и detail page;
- существующие pages получают прежний title/description;
- canonical и OG tags не дублируются.

### Этап 4. Реализовать `GameCard`

Статус: не начат.

Файл: `src/components/game/GameCard.astro`.

Работы:

1. Сделать всю карточку одной семантической ссылкой.
2. Вывести icon, title, description, status, year, genre и до трех technologies.
3. Не добавлять отдельные nested links внутри clickable card.
4. Задать стабильный квадратный media container и размеры изображения.
5. Добавить hover, `:focus-visible` и `prefers-reduced-motion`.
6. Использовать цвет оригинальной иконки как основной визуальный акцент; UI карточки оставить
   нейтральным и совместимым с текущими tokens.
7. Использовать `/assets/games/stickers-merge/icon.jpg` без logo overlay и дополнительного crop.

Для одной игры карточка не должна растягиваться на всю ширину 1200 px. Сетка сохраняет целевой размер
будущих карточек, а свободное пространство остается естественной частью layout.

Проверка:

- карточка полностью доступна по Tab/Enter;
- icon не вызывает layout shift;
- длинное описание не ломает геометрию;
- ссылка ведет на `/games/stickers-merge`.

### Этап 5. Реализовать индексную страницу `/games`

Статус: не начат.

Файл: `src/pages/games/index.astro`.

Работы:

1. Загрузить недрафтовые entries через `getCollection('games')`.
2. Отсортировать по `order`.
3. Использовать shared `Layout`, `Header` и `Footer`.
4. Добавить компактный заголовок `Games` и английское intro.
5. Отрисовать единственную запись через `GameCard`.
6. Не добавлять filter controls и счетчики для одной игры.
7. Добавить title, description, canonical и
   `/assets/games/stickers-merge/cover-land-en.png` как OG image.

Проверка:

- `/games` генерируется статически;
- отображается ровно одна карточка;
- карточка видна в первом viewport на desktop;
- layout устойчив на 320 px, tablet и wide desktop.

### Этап 6. Реализовать playable и media components

Статус: не начат.

Файлы:

- `src/components/game/GameEmbed.astro`;
- `src/components/game/GameMediaShowcase.astro`;
- `src/components/game/PokiBadgeLink.astro`.

Работы:

1. При наличии `playableUrl` вывести iframe в стабильном responsive container.
2. Применить проверенный `embedAspectRatio`; для Stickers Merge учесть поддержку portrait и
   landscape, а не фиксировать глобально `16 / 9`.
3. Добавить понятный `title` и кнопку/ссылку `Open game in new tab`.
4. Настроить только необходимые `allow` permissions.
5. Добавить `allowfullscreen`, только если standalone build корректно работает fullscreen.
6. Не добавлять `sandbox`, пока не проверено влияние на assets, storage, audio и SDK.
7. При отсутствии `playableUrl` показать компактный fallback и `PokiBadgeLink`, если задан Poki URL.
8. Не пытаться определять iframe network error только визуальным таймером: браузер не дает надежный
   cross-origin error signal. Внешняя ссылка должна быть доступна постоянно.
9. Для Stickers Merge использовать `https://bolotnikov.github.io/stickers-merge-game/` как iframe
   `src`; Poki URL никогда не использовать как iframe source.
10. Реализовать `PokiBadgeLink` как обычную внешнюю ссылку вокруг
    `/assets/poki/poki-badge_dark.svg` размером 136×40.
11. Передавать в `PokiBadgeLink` URL `https://poki.com/en/g/stickers-merge`, `target="_blank"`,
    `rel="noreferrer"` и доступное имя `Play Stickers Merge on Poki`.
12. Реализовать `GameMediaShowcase`: три пары landscape/portrait screenshots и promo video с
    responsive sources, controls, `playsinline`, `preload="metadata"` и без autoplay.
13. Не загружать screenshots/video до первого viewport: gallery images используют lazy loading, а
    video загружает только metadata до действия пользователя.

Решение о `loading="eager"` или `loading="lazy"` принять после финального detail layout. Если iframe
попадает в первый экран, использовать eager; если расположен ниже содержательного intro — lazy.

Проверка:

- iframe загружает игру с GitHub Pages;
- pointer/touch, resize, orientation, audio и fullscreen работают согласно возможностям build;
- fallback корректно выглядит без `playableUrl`;
- прямая ссылка на standalone build открывается отдельно от Poki badge;
- Poki badge ведет на точную страницу Stickers Merge и доступен с клавиатуры;
- video выбирает подходящую ориентацию, WebM работает первым, MP4 остается fallback;
- media не создают горизонтальный overflow и не загружаются целиком до взаимодействия.

### Этап 7. Реализовать `/games/[slug]`

Статус: не начат.

Файл: `src/pages/games/[slug].astro`.

Работы:

1. Получить недрафтовые games и вернуть routes через `getStaticPaths`.
2. Render Markdown body через `render` из `astro:content`.
3. Собрать верхнюю часть страницы:
   - `Back to Games`;
   - icon/cover;
   - title и description;
   - status, release year, genre и platforms;
   - `GameEmbed`.
4. Использовать `cover-land-en.png` как главный key art. `logo.png` можно добавить рядом с текстовым
   заголовком только если он улучшает композицию и не создает визуальное дублирование названия.
5. После playable-блока вывести Markdown body.
6. Вывести `My role` и `Technologies` из frontmatter без дублирования в body.
7. Сразу рядом с playable area вывести две разные команды:
   - обычную ссылку `Open game in new tab` на standalone GitHub Pages build;
   - `PokiBadgeLink` на официальную Poki page.
8. После основного описания вывести `GameMediaShowcase`, затем ссылку
   `Read the adaptive layout workshop`.
9. Скрывать отсутствующие optional sections.
10. Добавить page-specific title, description, canonical и cover как OG image.

Проверка:

- `/games/stickers-merge` существует после build;
- `/games/unknown` не генерируется и попадает в стандартный 404 flow;
- нет пустых metadata rows;
- Markdown styles не влияют на blog article styles и наоборот.

### Этап 8. Визуальная и responsive-проверка

Статус: не начат.

Проверяемые viewport:

- desktop: `1440 x 900`;
- laptop: `1280 x 720`;
- tablet portrait: `768 x 1024`;
- mobile portrait: `390 x 844`;
- минимальная ширина: `320 x 700`;
- mobile landscape: `844 x 390` для playable-состояния.

Работы:

1. Проверить header с тремя ссылками и отсутствие переносов/наложений.
2. Проверить размер единственной карточки и баланс пустого пространства.
3. Проверить, что hero не прячет карточку ниже первого экрана.
4. Проверить порядок detail content и удобство запуска игры.
5. Проверить icon, cover, iframe, Poki badge, gallery, video и text wrapping.
6. Проверить keyboard navigation и focus rings.
7. Проверить reduced motion.
8. Проверить отсутствие горизонтального overflow.
9. Проверить iframe resize и игровой UI во всех поддерживаемых ориентациях.
10. Проверить, что screenshot pairs одновременно демонстрируют landscape и portrait без слишком
    мелкого текста или чрезмерной высоты страницы.
11. Проверить ручной запуск video, poster, выбор source по ориентации и отсутствие autoplay/audio до
    действия пользователя.

Результат:

- набор screenshots для сравнения desktop/mobile;
- исправленные visual regressions до финальной сборки.

### Этап 9. Финальная техническая проверка

Статус: не начат.

Команды:

```sh
npm run build
```

`npm run preview` и browser-based visual QA выполняются только после отдельного явного разрешения,
как требуют workspace rules. Без него нужно проверить статический output и сообщить об ограничении
визуальной проверки.

Проверки:

1. Build завершается без schema и route errors.
2. В `dist/games/index.html` и `dist/games/stickers-merge/index.html` присутствуют страницы.
3. Все используемые изображения, SVG badge и video sources копируются и возвращают HTTP 200 в
   preview.
4. Canonical и Open Graph URL абсолютные и корректные.
5. `/`, `/about` и существующие articles визуально не регрессировали.
6. В console нет новых ошибок сайта или playable build.
7. Standalone, Poki и workshop links ведут на разные корректные адреса.
8. `git diff --check` не находит whitespace errors.

Локальный dev server или browser automation запускаются только на этапе реализации и только по
явному запросу пользователя, согласно workspace rules.

## 7. Порядок выполнения и зависимости

```text
Этап 0: ассеты и playable URL [выполнен] ────┐
                                             v
Этап 1: games schema -> Этап 2: content -> Этап 4: GameCard -> Этап 5: /games
                         │
Этап 3: layout/nav ──────┼────────────────────────────────────────────┐
                         v                                            v
                   Этап 6: embed/media/badge -----------------> Этап 7: detail page
                                                                       │
                                                                       v
                                                          Этапы 8–9: QA/build
```

Этап 0 завершен, поэтому Этапы 1–7 можно выполнять без внешних зависимостей. Финальная визуальная
проверка iframe остается частью Этапа 8.

## 8. Definition of Done

Первая итерация считается завершенной, когда:

- в header и footer есть `Games`;
- `/games` показывает одну качественно оформленную карточку Stickers Merge;
- `/games/stickers-merge` использует предоставленные icon/cover и при необходимости logo, а также
  содержит описание, технологии и роль автора;
- игра запускается в iframe с отдельного подтвержденного GitHub Pages URL;
- рядом с iframe есть отдельная прямая ссылка на standalone build;
- официальный темный badge `Play on Poki` ведет на
  `https://poki.com/en/g/stickers-merge` в новой вкладке;
- detail page показывает выбранные landscape/portrait screenshot pairs и promo video без autoplay;
- detail page ссылается на существующий adaptive layout workshop;
- desktop/mobile layouts и keyboard navigation проверены;
- metadata корректна;
- `npm run build` проходит;
- другие игры и post-MVP controls не добавлены.

Fallback без iframe остается частью общего компонента для будущих игр, но для Stickers Merge не
должен отображаться при штатной загрузке страницы.
