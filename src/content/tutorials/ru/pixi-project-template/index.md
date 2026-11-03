---
locale: ru
translationKey: pixi-project-template/index
title: Шаг 1. Создание структуры
description: 'Шаг 1 руководства по созданию шаблона проекта PixiJS: создание структуры.'
seriesTitle: Создание шаблона проекта PixiJS
seriesDescription: Создание переиспользуемого шаблона PixiJS + JavaScript с загрузкой, сценами, спрайтами и понятной структурой приложения.
seriesSlug: pixi-project-template
step: 1
readingTime: 2 минуты чтения
steps:
  - step: 1
    slug: ''
    title: Создание структуры
  - step: 2
    slug: creating-the-canvas-element
    title: Создание элемента canvas
  - step: 3
    slug: creating-the-loader
    title: Создание загрузчика
  - step: 4
    slug: game-launch
    title: Запуск игры
  - step: 5
    slug: sprite-output
    title: Вывод спрайта
  - step: 6
    slug: scenes-manager
    title: Менеджер сцен
  - step: 7
    slug: useful-links
    title: Полезные ссылки
---

Цель этой статьи — разработать простой шаблон проекта, который станет основой будущих игр. Итоговый код шаблона доступен на [GitHub](https://github.com/gamedevland/pixi-project-template).

<a id="video-version" class="translation-anchor" aria-hidden="true"></a>

## Видеоверсия
<iframe width="560" height="315" src="https://www.youtube.com/embed/itT6L3LQ1cM" title="Видеоплеер YouTube" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<a id="step-by-step-guide-on-udemy" class="translation-anchor" aria-hidden="true"></a>

## Пошаговое руководство на Udemy
- [https://www.udemy.com/course/pixicourse/](https://www.udemy.com/course/pixicourse/)

<a id="template-functionality" class="translation-anchor" aria-hidden="true"></a>

## Возможности шаблона:
- Создание и запуск приложения
- Загрузка и отображение ресурсов
- Управление сценами, состояниями, анимациями, звуком и экраном

Возьмём пустую структуру проекта из [начальной ветки](https://github.com/bolotnikov/pixi-project-template/tree/initial) и изучим её.

<a id="11-document-template" class="translation-anchor" aria-hidden="true"></a>

### 1.1. Шаблон документа
<details>
  <summary>index.html</summary>

``` html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <style>
    body {
        background-color: #000;
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
    }
    canvas {
        position:absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
    }
  </style>
  <body>
  </body>
</html>
```

</details>HTML-шаблон будет содержать итоговый JavaScript-код после сборки игры. Зададим стили элементу canvas и оставим тег `body` пустым..


<a id="12-project-dependencies" class="translation-anchor" aria-hidden="true"></a>

### 1.2. Зависимости проекта
<details>
  <summary>package.json</summary>

``` javascript
{
  "name": "match3",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "webpack --config webpack/prod.js ",
    "start": "webpack-dev-server --config webpack/base.js --open"
  },
  "dependencies": {
    "gsap": "^3.10.4",
    "pixi.js": "^6.5.1"
  },
  "devDependencies": {
    "babel-loader": "^8.2.5",
    "clean-webpack-plugin": "^4.0.0",
    "file-loader": "^6.2.0",
    "html-webpack-plugin": "^5.5.0",
    "webpack-cli": "^4.10.0",
    "webpack-dev-server": "^4.9.3",
    "webpack-merge": "^5.8.0"
  }
}
```
</details>Конфигурация содержит настройки и зависимости проекта. Основные зависимости::

- [gsap](https://greensock.com/gsap/) для анимаций
- [pixi](https://pixijs.com/) для отрисовки
- [webpack](https://webpack.js.org/) и [babel](https://babeljs.io/) для сборки

<a id="13-project-structure" class="translation-anchor" aria-hidden="true"></a>

### 1.3. Структура проекта

* `webpack/` — сценарии сборки
* `src/scripts/system/` — общий системный код, одинаковый для всех игр
* `src/scripts/game/` — код самой игры, уникальный для каждого проекта
* `src/sounds/` — звуковые ресурсы
* `src/sprites/` — изображения


<a id="14-commands" class="translation-anchor" aria-hidden="true"></a>

### 1.4. Команды
Сначала установим зависимости из `package.json`

``` bash
npm i
```

В блоке scripts файла `package.json` есть два способа запуска webpack: build и start.

``` bash
npm start
```

Эта команда создаёт сборку для разработки и автоматически запускает проект в браузере через dev-server.

``` bash
npm run build
```

Эта команда создаёт сборку для продакшена и сохраняет её файлы в папке `dist/`.

Папка создаётся автоматически и очищается при каждом запуске команды, поэтому не сохраняйте в ней свои файлы.
