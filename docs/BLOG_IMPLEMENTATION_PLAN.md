# План реализации блога про HTML5 game development

## Цель

Собрать production-ready личный блог на Astro для публикации статей про разработку HTML5-игр. Первая версия должна дать:

- понятную контентную модель статей;
- масштабируемую структуру проекта;
- цельную визуальную систему с упором на читаемость;
- SEO-ready страницы статей и списков;
- удобный workflow для публикации новых материалов.

Этот план написан под текущее состояние репозитория: сейчас это минимальный Astro starter без архитектуры, заточенной под блог.

## Продуктовый scope

### Основная аудитория

- разработчики HTML5-игр;
- frontend-инженеры, которым интересны рендеринг, архитектура и производительность;
- технические читатели, которым нужны практические long-form статьи.

### Основные темы блога

- Phaser и PixiJS;
- архитектура HTML5-игр;
- рендеринг и performance;
- управление состоянием, сценами и UI;
- инструменты, дебаг, деплой, postmortem-разборы.

### Scope первой версии

На первом этапе нужно реализовать только то, что действительно нужно для публикации и поддержки статей:

- главная страница;
- страница со списком статей;
- страница отдельной статьи;
- страницы тегов;
- страница `about`;
- страница `404`;
- RSS feed;
- sitemap;
- SEO-метаданные и structured data;
- workflow для написания и публикации статей.

В первую версию не включать комментарии, поиск, CMS и мультиязычность.

## Информационная архитектура

### Маршруты

- `/` - главная страница
- `/articles` - все опубликованные статьи
- `/articles/[slug]` - страница статьи
- `/tags/[tag]` - статьи по тегу
- `/about` - страница об авторе
- `/rss.xml` - RSS-лента
- `/404` - страница не найдена

### Навигация

Верхняя навигация должна быть короткой и стабильной:

- Home
- Articles
- About

Опциональные вторичные ссылки:

- RSS
- GitHub
- Telegram или X, если это действительно нужно

## Контентная модель

Источником истины для метаданных и валидации статей должны быть Astro Content Collections.

### Схема статьи

Каждая статья должна содержать:

- `title`
- `description`
- `pubDate`
- `updatedDate`
- `draft`
- `tags`
- `heroImage`
- `heroImageAlt`
- `featured`
- `seoTitle`
- `canonicalUrl`

Рекомендуемые поля на вырост:

- `series`
- `seriesOrder`
- `ogImage`

### Правила для контента

- Хранить статьи в `src/content/articles/`.
- Одна статья = один файл.
- Использовать kebab-case для имен файлов и slug.
- Держать теги нормализованными и стабильными.
- Не добавлять произвольные поля мимо валидируемой схемы.

### Пример frontmatter статьи

```md
---
title: "Как организовать HTML5-игру без архитектурного хаоса"
description: "Практический подход к сценам, состоянию, UI и долгосрочной поддержке HTML5-игры."
pubDate: 2026-04-20
updatedDate: 2026-04-20
draft: false
tags: ["html5", "game-architecture", "phaser"]
heroImage: "/images/articles/how-to-structure-an-html5-game/hero.jpg"
heroImageAlt: "Diagram of HTML5 game architecture"
featured: true
seoTitle: "Как организовать архитектуру HTML5-игры"
canonicalUrl: "https://your-domain.com/articles/how-to-structure-an-html5-game"
---
```

## Рекомендуемая структура репозитория

```text
src/
  components/
    article/
      ArticleCard.astro
      ArticleMeta.astro
      ArticleTagList.astro
      RelatedArticles.astro
      TableOfContents.astro
    common/
      Footer.astro
      Header.astro
      Navigation.astro
      SectionHeading.astro
    seo/
      HeadMeta.astro
      JsonLd.astro
    ui/
      Badge.astro
      Container.astro
      Prose.astro
  content/
    articles/
      first-post.mdx
    config.ts
  layouts/
    BaseLayout.astro
    ArticleLayout.astro
  pages/
    index.astro
    about.astro
    404.astro
    articles/
      index.astro
      [slug].astro
    tags/
      [tag].astro
    rss.xml.ts
  styles/
    global.css
    tokens.css
    prose.css
  utils/
    articles/
      getAllPublishedArticles.ts
      getFeaturedArticles.ts
      getRelatedArticles.ts
      getAllTags.ts
    seo/
      buildCanonicalUrl.ts
      buildPageMeta.ts
      buildArticleJsonLd.ts
    dates/
      formatDate.ts
public/
  favicon.svg
  robots.txt
  images/
    articles/
      first-post/
        hero.jpg
        og.jpg
```

## Дизайн-направление

### Цели дизайна

- в первую очередь поддерживать удобное чтение;
- сохранить узнаваемый характер, связанный с game development;
- не скатиться в безликий шаблонный техноблог;
- сделать страницы статей спокойнее, чем промо-страницы.

### Рекомендуемое визуальное направление

Подход: "технический editorial с деликатным характером game dev":

- нейтральный или слегка теплый фон;
- темный читаемый текст с хорошим контрастом;
- один яркий акцентный цвет, отсылающий к игровому UI или debug-визуалам;
- выразительная, но контролируемая типографика;
- аккуратно оформленные code blocks;
- сдержанные декоративные приемы вместо перегруженной gamer-эстетики.

### Какие design tokens определить в самом начале

Сначала задать токены, потом строить страницы:

- `--color-bg`
- `--color-surface`
- `--color-surface-strong`
- `--color-text`
- `--color-text-muted`
- `--color-accent`
- `--color-accent-soft`
- `--color-border`
- `--shadow-sm`
- `--shadow-md`
- `--radius-sm`
- `--radius-md`
- `--radius-lg`
- `--space-2`
- `--space-4`
- `--space-8`
- `--space-12`
- `--container-width`
- `--content-width`
- `--font-sans`
- `--font-display`
- `--font-mono`

### Правила типографики

- Держать ширину основного текста примерно в диапазоне `68ch`-`74ch`.
- Вынести стили article prose в отдельный `prose.css`.
- Визуально различать `h1`, `h2`, `h3`, blockquote, списки, `code` и `pre`.
- Проверить читабельность code blocks на desktop и mobile.
- Использовать комфортные вертикальные отступы между секциями.

### Основные композиции страниц

#### Главная

- короткое интро о блоге и авторе;
- выбранные или последние статьи;
- обзор тем / тегов;
- блок "с чего начать", если читатель попал впервые.

#### Страница статей

- простой хронологический список или карточки;
- заголовок, описание, дата, теги, намек на время чтения;
- без шумного UI фильтрации в первой версии.

#### Страница статьи

- заголовок;
- описание или лид;
- дата публикации и обновления;
- теги;
- hero image, если она есть;
- table of contents;
- тело статьи;
- блок related articles.

## Техническая архитектура

### Content pipeline

- Использовать Astro Content Collections со строгой schema validation.
- Исключать `draft: true` из production-списков и production-страниц.
- Централизовать выборки статей в `src/utils/articles/`.
- Не смешивать фильтрацию данных и рендеринг.

### Layout system

- `BaseLayout.astro` должен владеть HTML shell, метаданными, header, footer и общей структурой страницы.
- `ArticleLayout.astro` должен владеть article-specific presentation.
- Общие контентные блоки нужно держать в `components/article/` и `components/common/`.

### SEO

SEO нужно внедрять в первой production-итерации, а не оставлять "на потом":

- уникальные page titles и descriptions;
- canonical URLs;
- Open Graph metadata;
- structured data для статьи;
- sitemap generation;
- RSS generation;
- `robots.txt`.

### Работа с медиа

- Хранить медиа статей в `public/images/articles/<slug>/`.
- Ввести единый нейминг для `hero` и `og` assets.
- Не разбрасывать картинки статей по разным папкам.

## Workflow публикации

### Как добавлять новую статью

1. Создать новый `.mdx`-файл в `src/content/articles/`.
2. Заполнить валидируемый frontmatter.
3. Добавить hero и OG изображения в `public/images/articles/<slug>/`.
4. Написать статью с соблюдением принятой структуры заголовков и prose-стилей.
5. Проверить локальный рендер и метаданные.
6. Опубликовать, переключив `draft: false`.

### Рекомендуемый шаблон статьи

```mdx
---
title: "Заголовок статьи"
description: "Короткое описание статьи."
pubDate: 2026-04-20
updatedDate: 2026-04-20
draft: true
tags: ["html5", "phaser"]
heroImage: "/images/articles/article-slug/hero.jpg"
heroImageAlt: "Описание изображения"
featured: false
seoTitle: "SEO title"
canonicalUrl: "https://your-domain.com/articles/article-slug"
---

## Почему это важно

## В чем проблема

## Подход к решению

## Компромиссы и подводные камни

## Вывод
```

## Фазы реализации

### Phase 1 - убрать starter scaffolding

Цель: заменить стандартный Astro starter на чистую основу под блог.

Задачи:

- убрать использование starter-компонента `Welcome.astro`;
- заменить дефолтный title и базовые метаданные;
- создать стартовые папки для docs и content;
- сохранять рабочую сборку после каждого небольшого шага.

Результат:

- в репозитории больше нет поведения и контента стартового шаблона Astro.

### Phase 2 - собрать структурный каркас

Цель: заложить масштабируемую организацию layout, routing и data layer.

Задачи:

- создать `src/content/config.ts`;
- добавить `src/content/articles/`;
- добавить `BaseLayout.astro` и `ArticleLayout.astro`;
- добавить общие `header` / `footer` / `navigation` компоненты;
- создать `src/utils/articles/` и `src/utils/seo/`;
- создать маршруты для home, articles, article detail, tags, about и 404.

Результат:

- все главные маршруты существуют и рендерятся на общих layout-примитивах.

### Phase 3 - собрать визуальную систему

Цель: сначала определить токены и readable UI, а уже потом полировать детали.

Задачи:

- добавить `tokens.css`, `global.css` и `prose.css`;
- определить цветовую палитру, типографическую шкалу, spacing scale и контейнеры;
- оформить header, footer, article cards и prose-блоки;
- проверить, что desktop и mobile ведут себя чисто и предсказуемо.

Результат:

- сайт получает цельную визуальную систему с фокусом на чтение.

### Phase 4 - реализовать article rendering

Цель: сделать статьи полноценной production-фичей.

Задачи:

- реализовать выборку списка статей;
- реализовать `[slug].astro` на основе content collection entries;
- отрисовать метаданные, теги и article body;
- добавить TOC при необходимости;
- добавить логику related articles.

Результат:

- опубликованные статьи рендерятся из content-файлов без ручной привязки страниц.

### Phase 5 - добавить production SEO features

Цель: подготовить сайт к индексации и шарингу.

Задачи:

- централизовать генерацию метаданных;
- добавить Open Graph;
- добавить JSON-LD для статей;
- добавить маршрут RSS;
- подключить sitemap;
- добавить `robots.txt`;
- зафиксировать стабильный site URL в конфиге.

Результат:

- сайт готов к индексации и распространению контента.

### Phase 6 - добавить первый реальный контент

Цель: проверить архитектуру на настоящих статьях, а не на заглушках.

Задачи:

- добавить первую статью;
- добавить еще как минимум две draft-статьи, чтобы проверить UX списка и тегов;
- оценить, как макеты ведут себя с реальными заголовками, списками, code blocks и изображениями;
- подправить spacing и type scale на основе реального контента.

Результат:

- архитектура и дизайн проходят проверку на реальных статьях.

### Phase 7 - финальный production hardening

Цель: снизить риски перед запуском.

Задачи:

- проверить `npm run build`;
- проверить `npm run astro check`;
- проверить lint, если он настроен;
- проверить адаптив;
- проверить метаданные и canonical URLs;
- проверить битые ссылки и отсутствующие изображения;
- посмотреть базовые Lighthouse и accessibility-показатели.

Результат:

- готов стабильный кандидат на первый production release.

## Рекомендуемый порядок реализации

Делать именно в такой последовательности, чтобы не плодить переделки:

1. Очистить starter-файлы.
2. Создать конфиг content collections.
3. Создать base layouts и общий shell.
4. Построить архитектуру глобальных стилей.
5. Сделать маршруты списка статей и страницы статьи.
6. Сделать маршруты тегов.
7. Сделать главную и `about`.
8. Добавить SEO layer.
9. Добавить RSS, sitemap и robots.
10. Добавить первую статью и медиа для статьи.
11. Дошлифовать дизайн уже на реальном контенте.
12. Провести финальную проверку.

## Стартовый checklist по файлам

### Создать

- `src/content/config.ts`
- `src/content/articles/`
- `src/layouts/BaseLayout.astro`
- `src/layouts/ArticleLayout.astro`
- `src/components/common/Header.astro`
- `src/components/common/Footer.astro`
- `src/components/common/Navigation.astro`
- `src/components/article/ArticleCard.astro`
- `src/components/article/ArticleMeta.astro`
- `src/components/article/ArticleTagList.astro`
- `src/styles/tokens.css`
- `src/styles/global.css`
- `src/styles/prose.css`
- `src/pages/articles/index.astro`
- `src/pages/articles/[slug].astro`
- `src/pages/tags/[tag].astro`
- `src/pages/about.astro`
- `src/pages/404.astro`
- `src/pages/rss.xml.ts`
- `src/utils/articles/getAllPublishedArticles.ts`
- `src/utils/articles/getFeaturedArticles.ts`
- `src/utils/articles/getRelatedArticles.ts`
- `src/utils/articles/getAllTags.ts`
- `src/utils/seo/buildPageMeta.ts`
- `src/utils/seo/buildArticleJsonLd.ts`
- `public/images/articles/`
- `public/robots.txt`

### Заменить или переработать

- `src/pages/index.astro`
- `src/layouts/Layout.astro`
- `README.md`
- `astro.config.mjs`
- `package.json`

### Удалить, когда станет не нужно

- `src/components/Welcome.astro`
- starter-ассеты, которые не участвуют в финальном дизайне

## Рекомендуемые зависимости

Стек лучше держать маленьким. Добавлять только то, что реально усиливает блог:

- `@astrojs/mdx` для authoring статей в MDX;
- `@astrojs/rss` для генерации RSS;
- `@astrojs/sitemap` для генерации sitemap.

Подумать позже, если появится реальная необходимость:

- rehype или remark-плагины для heading links, TOC или поведения внешних ссылок;
- дополнительную настройку syntax highlighting, если базового решения окажется мало.

## Quality gates

Перед тем как считать сайт production-ready, нужно проверить:

- новая статья добавляется без изменения route-кода;
- невалидные метаданные статьи ломают сборку или development flow заранее;
- drafts не попадают в production;
- у всех страниц есть осмысленные метаданные;
- страницы статей хорошо читаются на mobile и desktop;
- теги корректно резолвятся;
- RSS и sitemap работают;
- в проекте не осталось placeholder-текстов и starter-ассетов.

## Рекомендация для первой статьи

Первую статью стоит использовать как проверку всей контентной цепочки. Хорошая тема для этого блога:

- "Как я проектирую архитектуру HTML5-игры для долгой поддержки"

Почему это хорошая первая статья:

- она напрямую попадает в тему блога;
- на ней удобно проверить заголовки, схемы, списки и code blocks;
- она хорошо проверяет и типографику, и оформление технического prose;
- она сразу задает практичный editorial tone блога.

## Рекомендуемый следующий шаг

Сначала реализовать `Phase 1`-`Phase 3`, затем добавить первую статью и уже по реальному контенту дорабатывать визуал и детали UX. Дизайн такого блога должен формироваться вокруг настоящих статей, а не вокруг placeholder-макетов.
