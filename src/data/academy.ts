/** Planned sections stay in comments until they are ready to appear in the curriculum. */
export const javascriptCourse = {
	id: 'javascript',
	title: 'Advanced JavaScript',
	description: 'Углублённый курс JavaScript об устройстве движка, работе с памятью и асинхронном выполнении. Разбираем, что делает код и почему он работает именно так.',
	lessons: [
		{ slug: 'engine', title: 'Как работает JavaScript Engine', description: 'V8, parsing, AST, байткод, интерпретатор, JIT, Call Stack и Memory Heap.', available: true },
		/*
		{ slug: 'event-loop', title: 'Event Loop и browser runtime', description: 'Tasks, microtasks, async/await, rendering и бюджет кадра.', available: false },
		{ slug: 'execution-context', title: 'Execution Context, Scope и Hoisting', description: 'Lexical Environment, scope chain, var / let / const и TDZ.', available: false },
		{ slug: 'closures', title: 'Замыкания и время жизни данных', description: 'Захват окружения, фабрики, callbacks и удержание памяти.', available: false },
		{ slug: 'this', title: 'this и способы вызова функций', description: 'Binding, call / apply / bind, стрелки, классы и callbacks.', available: false },
		{ slug: 'prototypes', title: 'Прототипы и объектная модель', description: 'Prototype chain, свойства, классы и композиция.', available: false },
		{ slug: 'promises', title: 'Promises, async/await и отмена', description: 'Цепочки, ошибки, конкурентность, AbortSignal и async initialization.', available: false },
		{ slug: 'memory', title: 'Memory Management и Garbage Collection', description: 'Достижимость, поколения, утечки, heap snapshots и lifecycle.', available: false },
		{ slug: 'optimization', title: 'Оптимизация JavaScript в V8', description: 'Shapes, inline caches, специализация, deoptimization и измерения.', available: false },
		{ slug: 'browser', title: 'Браузер, Workers и границы runtime', description: 'DOM, rendering, изоляция, сообщения и организация тяжёлой работы.', available: false },
		{ slug: 'engineering', title: 'JavaScript Engineering Lab', description: 'Профилирование игровой сцены, поиск ошибок и техническое интервью.', available: false },
		*/
	],
} as const;
