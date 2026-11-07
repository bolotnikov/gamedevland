import type { AcademyCourse } from './academyCourse';

/** Shared course metadata; public-facing text is translated through Locale. */
export const cyberUiCourse = {
  id: 'cyber-ui',
  title: 'Cyber UI Toolkit',
  description: 'Панели, кнопки, иконки и эффекты для PixiJS 8. Соберём интерфейс и подключим его к GameDevLand SDK.',
  sections: [{
    slug: 'interface',
    title: 'Интерфейс от панели до анимации',
    description: 'Установка, поверхности, состояния, время и жизненный цикл.',
    outcome: 'Соберём экран из процедурных панелей и кнопок. Добавим эффекты и передадим управление временем и вводом приложению.',
    prerequisites: 'Основы TypeScript, npm и PixiJS 8. Для последних уроков — компоненты и действия GameDevLand SDK.',
  }],
} as const satisfies AcademyCourse;
