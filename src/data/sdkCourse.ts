/** Published curriculum and upcoming sections. */
export const sdkCourse = {
	id: 'sdk',
	title: 'GameDevLand SDK',
	description: 'Универсальный SDK для HTML5-игр на TypeScript. Подключение к проекту, сцены, ресурсы, вёрстка и игровые системы.',
	release: 'sdk-2026-11-10',
	gameRevision: 'd1dd4e35b3df7d71fcc6a3eca9f5133773f51177',
	sections: [
		{ slug: 'foundations', published: true, title: 'Запуск и данные', description: 'Установка, конфигурация игры, загрузка ресурсов, проверка данных, сохранения и локализация.', outcome: 'Подключим SDK к проекту и разберём запуск игры. Проследим путь от файла ресурса до проверенных данных.', prerequisites: 'JavaScript, основы TypeScript и npm.' },
		{ slug: 'scene-flow', published: true, title: 'Архитектура игры на SDK', description: 'Жизненный цикл сцены, DI, события, FSM, команды, сервисы и правила игры.', outcome: 'Свяжем события, состояния и команды. Разберём, как сцена управляет игровым процессом, а сервисы хранят данные и применяют правила игры.', prerequisites: 'Первый раздел курса; понимание классов и Promise.' },
		{ slug: 'presentation', published: true, title: 'Вёрстка, ввод и эффекты', description: 'Вёрстка из JSON, нажатия и перетаскивание, анимация, звук, частицы и физика.', outcome: 'Соберём экран из JSON, обработаем нажатия и перетаскивание. Добавим анимацию, звук и частицы, а затем рассчитаем движение шара.', prerequisites: 'Первые два раздела и знакомство с PixiJS.' },
		{ slug: 'rendering', published: true, title: 'Режимы рендеринга', description: 'PixiJS, Three.js, совместная отрисовка, модели GLB и обновление камеры, мира и UI.', outcome: 'Выберем один из четырёх режимов отрисовки. Подключим 3D-модели и зададим порядок обновления камеры, мира и интерфейса.', prerequisites: 'Первые три раздела; знакомство с PixiJS или Three.js.' },
		{ slug: 'integrations', published: true, title: 'Игровые площадки и сборка', description: 'Выбор площадки, завершение загрузки, реклама с наградой и сборка для Poki.', outcome: 'Сообщим площадке, когда игра загрузилась, и выдадим награду за просмотр рекламы. Подготовим ZIP и отправим сборку в Poki.', prerequisites: 'Уметь запустить проект и открыть игровую сцену.' },
	],
} as const;
