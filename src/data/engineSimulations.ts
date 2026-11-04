import type { Locale } from '../i18n/Locale';
interface DiagramItem {
	label: string;
	detail: string;
	children?: string[];
	tone?: 'cyan' | 'violet' | 'green' | 'amber' | 'muted' | 'red';
}
interface DiagramColumn { label: string; items: DiagramItem[] }
interface SimulationState {
	label: string;
	note: string;
	columns: DiagramColumn[];
	output?: string;
	line?: number;
}
interface Simulation {
	title: string;
	hint: string;
	layout?: 'stack' | 'tree' | 'flow';
	code?: string[];
	states: SimulationState[];
}
const item = (label: string, detail: string, tone: DiagramItem['tone'] = 'cyan', children?: string[]): DiagramItem => ({ label, detail, tone, ...(children ? { children } : {}) });
const column = (label: string, ...items: DiagramItem[]): DiagramColumn => ({ label, items });
const state = (label: string, note: string, ...columns: DiagramColumn[]): SimulationState => ({ label, note, columns });

export const engineSimulations = {
	runtime: {
		title: 'Три уровня одной программы', hint: 'Рассмотрим границы ответственности каждого уровня.',
		states: [
			state('01 · Спецификация', 'ECMA-262 описывает результат программы, но не требует Ignition или TurboFan.', column('ПРАВИЛА', item('ECMAScript', 'Грамматика · значения · семантика')), column('РЕАЛИЗАЦИЯ', item('V8', 'Разбирает и исполняет JS', 'muted')), column('ОКРУЖЕНИЕ', item('Browser', 'DOM · canvas · timers', 'muted'))),
			state('02 · Движок', 'V8 реализует JavaScript и управляет памятью. DOM не является встроенным объектным деревом V8.', column('ПРАВИЛА', item('ECMAScript', 'Что программа означает', 'muted')), column('РЕАЛИЗАЦИЯ', item('V8', 'Parser · execution · GC', 'violet')), column('ОКРУЖЕНИЕ', item('Browser', 'Встраивает движок', 'muted'))),
			state('03 · Runtime', 'Браузер предоставляет API. Тело callback исполняет JS-движок, когда среда организует вызов.', column('ПРАВИЛА', item('ECMAScript', 'Язык', 'muted')), column('РЕАЛИЗАЦИЯ', item('V8', 'Исполняет callback', 'muted')), column('ОКРУЖЕНИЕ', item('Browser', 'setTimeout · fetch · canvas', 'green'))),
		],
	},
	pipeline: {
		title: 'От символов к исполнению', hint: 'Последовательно рассмотрим основные представления кода.', layout: 'flow',
		states: ['Source text', 'Tokens', 'AST', 'Bytecode', 'Execution'].map((name, index, names) => state(name, [
			'Текст описывает программу на языке JavaScript.', 'Scanner распознаёт элементы: имена, литералы, операторы.', 'Parser связывает элементы в синтаксическую структуру.', 'Генератор байткода подготавливает инструкции виртуальной машины.', 'Ignition исполняет байткод; JIT может подготовить машинный код для дальнейшего исполнения.',
		][index] ?? '', ...names.map((label, i) => column(String(i + 1).padStart(2, '0'), item(label, i === index ? 'Текущая стадия' : i < index ? 'Уже пройдена' : 'Впереди', i === index ? 'cyan' : 'muted'))))),
	},
	tokens: {
		title: 'Токены выражения const hp = 10;', hint: 'Каждый клик открывает следующий токен.',
		states: ['const', 'hp', '=', '10', ';'].map((token, index, tokens) => state(`Токен ${index + 1}`, `«${token}» — ${['ключевое слово объявления', 'идентификатор', 'пунктуатор присваивания', 'числовой литерал', 'пунктуатор завершения'][index]}. Значение hp пока не вычисляется.`, column('SCANNER OUTPUT', ...tokens.slice(0, index + 1).map((label, i) => item(label, ['Keyword', 'Identifier', 'Punctuator', 'NumericLiteral', 'Punctuator'][i] ?? '', i === index ? 'cyan' : 'muted'))))),
	},
	ast: {
		title: 'Одни числа. Два дерева.', hint: 'При изменении группировки меняются верхний оператор и результат.', layout: 'tree',
		states: [
			{ ...state('2 + 3 × 4', 'Корень — +. Справа сначала вычисляется 3 × 4, затем 2 + 12.', column('КОРЕНЬ', item('+', 'Сложение')), column('ЛЕВЫЙ ОПЕРАНД', item('2', 'Литерал', 'green')), column('ПРАВЫЙ ОПЕРАНД', item('×', 'Умножение', 'violet', ['3', '4']))), output: '2 + (3 × 4) = 14' },
			{ ...state('(2 + 3) × 4', 'Корень — ×. Слева сначала вычисляется 2 + 3, затем 5 × 4.', column('КОРЕНЬ', item('×', 'Умножение')), column('ЛЕВЫЙ ОПЕРАНД', item('+', 'Сложение', 'violet', ['2', '3'])), column('ПРАВЫЙ ОПЕРАНД', item('4', 'Литерал', 'green'))), output: '(2 + 3) × 4 = 20' },
		],
	},
	lazy: {
		title: 'Отложенная подготовка функций', hint: 'Два состояния иллюстрируют возможный lazy-путь функции.',
		states: [
			state('Старт игры', 'Подготовка функции редактора может быть отложена. Preparse всё же выполняет необходимую работу.', column('НУЖНО СЕЙЧАС', item('startGame()', 'Подготовка → выполнение', 'green')), column('ВОЗМОЖНО ПОЗЖЕ', item('openEditor()', 'Preparse → отложенная подготовка', 'amber'))),
			state('Открыли редактор', 'Когда функция действительно нужна, полная подготовка становится частью её пути к исполнению.', column('УЖЕ ИСПОЛЬЗОВАЛИ', item('startGame()', 'Игра работает', 'muted')), column('ПОНАДОБИЛОСЬ', item('openEditor()', 'Parse → bytecode → execution', 'violet'))),
		],
	},
	bytecode: {
		title: 'Мини-машина: add(2, 3)', hint: 'Учебный псевдобайткод. Это не реальные opcodes V8.',
		code: ['LOAD_ARGUMENT a', 'ADD_ARGUMENT b', 'RETURN'],
		states: [
			{ ...state('Начало', 'Аргументы доступны; аккумулятор ещё не содержит результат.', column('АРГУМЕНТЫ', item('a = 2', 'Первый аргумент'), item('b = 3', 'Второй аргумент')), column('ACCUMULATOR', item('—', 'Нет значения', 'muted'))), line: -1 },
			{ ...state('LOAD', 'Загружаем a в условный аккумулятор.', column('ИНСТРУКЦИЯ', item('LOAD a', 'Прочитать первый аргумент')), column('ACCUMULATOR', item('2', 'Загруженное значение', 'violet'))), line: 0 },
			{ ...state('ADD', 'В нашем числовом примере складываем 2 и 3.', column('ИНСТРУКЦИЯ', item('ADD b', 'Прибавить второй аргумент')), column('ACCUMULATOR', item('5', 'Результат сложения', 'violet'))), line: 1 },
			{ ...state('RETURN', 'Возвращаем результат вызывающему коду.', column('ИНСТРУКЦИЯ', item('RETURN', 'Завершить вызов')), column('RESULT', item('5', 'Возвращённое значение', 'green'))), line: 2, output: 'add(2, 3) → 5' },
		],
	},
	interpreter: {
		title: 'Цикл интерпретации', hint: 'Один учебный цикл обработки инструкции.',
		states: [
			state('Прочитать', 'Интерпретатор читает очередную инструкцию байткода.', column('BYTECODE', item('ADD b', 'Текущая инструкция')), column('IGNITION', item('Read', 'Узнать операцию', 'violet')), column('CPU', item('Native handlers', 'Исполняет код интерпретатора', 'muted'))),
			state('Выполнить', 'Обработчик выполняет операцию над текущими значениями.', column('BYTECODE', item('ADD b', 'Данные для интерпретатора', 'muted')), column('IGNITION', item('Dispatch → handler', 'Выбрать обработчик', 'violet')), column('CPU', item('2 + 3 → 5', 'Машинные инструкции обработчика', 'green'))),
			state('Продолжить', 'Обновляем состояние и переходим к следующей инструкции.', column('BYTECODE', item('RETURN', 'Следующая инструкция')), column('IGNITION', item('Next', 'Продолжить выполнение', 'violet')), column('CPU', item('Обработчик RETURN', 'Вернуть результат', 'green'))),
		],
	},
	jit: {
		title: 'Лестница исполнения V8', hint: 'Выбор вручную — для сравнения уровней, а не управления настоящим JIT.',
		states: [
			state('Ignition', 'Интерпретация байткода помогает быстро начать выполнение.', column('ПРЕДСТАВЛЕНИЕ', item('Bytecode', 'Компактные инструкции')), column('ИСПОЛНЕНИЕ', item('Ignition', 'Интерпретатор', 'violet'))),
			state('Sparkplug', 'Быстрая baseline-компиляция убирает часть расходов интерпретации.', column('ВХОД', item('Bytecode', 'Без полного повторного разбора')), column('ВЫХОД', item('Machine code', 'Быстро подготовленный нативный код', 'green'))),
			state('Maglev', 'Средний оптимизирующий уровень балансирует время компиляции и качество кода.', column('ВХОД', item('Bytecode + feedback', 'Наблюдения за выполнением')), column('ВЫХОД', item('Optimized code', 'Специализированный путь', 'violet'))),
			state('Верхний tier', 'Более дорогая оптимизация может окупиться на горячем коде. Состав pipeline зависит от версии V8.', column('ПОДГОТОВКА', item('TurboFan / Turboshaft', 'Оптимизирующая инфраструктура')), column('КОМПРОМИСС', item('Compile cost ↔ speed', 'Не каждому коду нужен этот уровень', 'amber'))),
		],
	},
	deopt: {
		title: 'Число или строка?', hint: 'Возможная история оптимизации; не обещание конкретного tiering V8.',
		states: [
			{ ...state('Числовые вызовы', 'Движок наблюдает числовые аргументы. Это обратная связь, а не изменение правил +.', column('INPUT', item('2, 3', 'Два числа')), column('FEEDBACK', item('Numbers', 'Наблюдаемый случай', 'violet'))), output: '5' },
			{ ...state('Специализация', 'Возможен специализированный числовой путь с проверкой предположений.', column('GUARD', item('Оба числа?', 'Проверка проходит', 'green')), column('FAST PATH', item('Numeric addition', 'Сохранить семантику +', 'violet'))), output: '5' },
			{ ...state('Пришла строка', 'Если числовое предположение перестало подходить, нужен другой путь; возможен deopt.', column('INPUT', item('"2", 3', 'Строка и число', 'amber')), column('FALLBACK', item('String concatenation', 'Корректность важнее специализации', 'green'))), output: '"23"' },
		],
	},
	stack: {
		title: 'Порядок вызовов и возвратов', hint: 'Проследим изменения верхнего кадра и соответствующей строки кода.', layout: 'stack',
		code: ['function damage() { return 10; }', 'function update() { return damage(); }', 'function start() { return update(); }', 'start();'],
		states: [
			['script'], ['script', 'start()'], ['script', 'start()', 'update()'], ['script', 'start()', 'update()', 'damage()'], ['script', 'start()', 'update()'], ['script', 'start()'], ['script'],
		].map((frames, index) => ({ ...state(['Готовы', 'Вызов start', 'Вызов update', 'Вызов damage', 'Возврат damage', 'Возврат update', 'Возврат start'][index] ?? '', ['Текущий скрипт готов вызвать start().', 'Сохраняем место возврата в script.', 'start() ждёт возврата update().', 'Верхний кадр — damage(). Вычисляем 10.', 'damage() снят со стека, update() получает 10.', 'update() снят со стека, start() получает 10.', 'Вложенные вызовы завершены, управление вернулось скрипту.'][index] ?? '', column('CALL STACK · ВЕРХ СВЕРХУ', ...frames.map((name, i) => item(name, i === frames.length - 1 ? 'Сейчас выполняется' : 'Ожидает возврата', i === frames.length - 1 ? 'cyan' : 'muted')))), line: [3, 2, 1, 0, 1, 2, 3][index] ?? -1, output: index >= 4 ? 'return 10' : '—' })),
	},
	frames: {
		title: 'Одна функция, разные вызовы', hint: 'Сравним параметры и результаты двух вызовов.',
		states: [3, 8].map((value) => ({ ...state(`double(${value})`, `Отдельный вызов получает value = ${value} и возвращает ${value * 2}. Предыдущий вызов не остаётся в стеке.`, column('CALL FRAME', item(`value = ${value}`, 'Параметр'), item(`result = ${value * 2}`, 'Локальное значение', 'violet')), column('CALLER', item(String(value * 2), 'Возвращённое значение', 'green'))), output: String(value * 2) })),
	},
	heap: {
		title: 'Два имени, один объект', hint: 'Добавим вторую ссылку и изменим свойство через неё.',
		states: [
			state('Создать player', 'Создали объект и сохранили значение в player.', column('BINDINGS', item('player → #1', 'Ссылка на объект')), column('HEAP', item('object #1', '{ hp: 100 }', 'violet'))),
			state('target = player', 'Копируется значение, идентифицирующее тот же объект; новый объект не создаётся.', column('BINDINGS', item('player → #1', 'Первое имя'), item('target → #1', 'Второе имя', 'green')), column('HEAP', item('object #1', '{ hp: 100 }', 'violet'))),
			state('target.hp = 80', 'Изменение объекта видно через обе ссылки.', column('BINDINGS', item('player → #1', 'player.hp === 80'), item('target → #1', 'target.hp === 80', 'green')), column('HEAP', item('object #1', '{ hp: 80 }', 'violet'))),
		],
	},
	references: {
		title: 'Удаление одной ссылки', hint: 'Присваивание null не удаляет объект, доступный из другого места.',
		states: [
			state('Общая идентичность', 'player и target ведут к одному объекту.', column('BINDINGS', item('player → #1', 'const binding'), item('target → #1', 'let binding', 'green')), column('HEAP', item('object #1', '{ hp: 100 }', 'violet'))),
			state('Мутация', 'const не запрещает изменение свойства объекта.', column('BINDINGS', item('player → #1', 'Связь сохраняется'), item('target → #1', 'target.hp = 50', 'green')), column('HEAP', item('object #1', '{ hp: 50 }', 'violet'))),
			state('target = null', 'Связь target разорвана. Через player объект всё ещё достижим.', column('BINDINGS', item('player → #1', 'Объект жив'), item('target = null', 'Больше не ведёт к #1', 'muted')), column('HEAP', item('object #1', '{ hp: 50 }', 'green'))),
		],
	},
	gc: {
		title: 'Граф достижимости', hint: 'Учебная маркировка. Настоящий GC браузера не вызывается.',
		states: [
			state('Исходный граф', 'Корень удерживает scene, scene удерживает player. temp уже недостижим.', column('ROOTS', item('root → scene', 'Живая связь')), column('HEAP', item('scene → player', 'Достижима', 'green'), item('player', 'Достижим', 'green'), item('temp', 'Нет пути от корня', 'amber'))),
			state('Разорвать root → scene', 'Без внешнего пути сцена и игрок стали кандидатами на сборку.', column('ROOTS', item('root → null', 'Связь удалена', 'muted')), column('HEAP', item('scene → player', 'Нет внешнего пути', 'amber'), item('player', 'Нет пути от корня', 'amber'), item('temp', 'Нет пути от корня', 'amber'))),
			state('Модель маркировки', 'Ни один из трёх объектов не достижим. Они могут быть освобождены; реальный момент выбирает движок.', column('ROOTS', item('root', 'По-прежнему жив')), column('КАНДИДАТЫ НА СБОРКУ', item('scene · player · temp', 'Недостижимые объекты', 'muted'))),
		],
	},
	leak: {
		title: 'Почему сцена ещё жива?', hint: 'Сравним цепочку удержания до и после очистки.', layout: 'flow',
		states: [
			state('Сцена закрыта', 'Callback всё ещё хранится в EventTarget и через окружение удерживает scene.', column('ДОЛГОЖИВУЩИЙ', item('window', 'EventTarget')), column('ПОДПИСКА', item('listener', 'Зарегистрированный callback', 'amber')), column('ОКРУЖЕНИЕ', item('scene', 'Данные сцены всё ещё достижимы', 'red'))),
			state('Вызван dispose', 'removeEventListener с тем же callback разрывает эту цепочку. Другие связи тоже нужно проверить.', column('ДОЛГОЖИВУЩИЙ', item('window', 'EventTarget')), column('ПОДПИСКА', item('удалена', 'Связь разорвана', 'green')), column('ОКРУЖЕНИЕ', item('scene', 'Если иных путей нет — кандидат на GC', 'muted'))),
		],
	},
	threads: {
		title: 'Кто может работать параллельно?', hint: 'Переключение ролей показывает распределение задач. Это схема, а не профиль потоков.',
		states: [
			state('Текущий JS', 'update() исполняется последовательно в своём agent; async не переносит его в другой поток.', column('MAIN JS', item('update()', 'Игровая логика')), column('BACKGROUND', item('Compilation / GC', 'Отдельные работы V8', 'muted'))),
			state('Фоновая работа V8', 'Часть работы может идти в фоне. Для некоторых операций всё ещё нужны синхронизация и паузы.', column('MAIN JS', item('update()', 'Пользовательский код', 'muted')), column('BACKGROUND', item('Compilation / GC', 'Не параллельная версия update()', 'violet'))),
			state('Web Worker', 'Для отдельного JS-исполнения приложение явно создаёт Worker и организует взаимодействие.', column('MAIN JS', item('postMessage ↔', 'Обмен сообщениями')), column('WORKER JS', item('generateMap()', 'Отдельный agent', 'green'))),
		],
	},
	performance: {
		title: 'Симптомы и диагностика', hint: 'Сценарии помогают выбрать инструмент; это не измеренные результаты.',
		states: [
			state('Медленный старт', 'Запишем Performance начиная с загрузки. Отдельно рассмотрим передачу данных, parse/compile и инициализацию.', column('СИМПТОМ', item('Долго до первого кадра', 'Startup', 'amber')), column('ПРОВЕРИТЬ', item('Network + Performance', 'Bundle · compile · init', 'cyan'))),
			state('Пропуски кадров', 'Найдём вызовы с высокими затратами на flame chart. Отдельно проверим rendering, прежде чем связывать задержки с JIT.', column('СИМПТОМ', item('Долгий update()', 'Steady-state execution', 'amber')), column('ПРОВЕРИТЬ', item('Performance recording', 'Call tree · frame timing', 'violet'))),
			state('Рост памяти', 'Повторим открытие и закрытие сцены, сравним snapshots и найдём retaining paths.', column('СИМПТОМ', item('Heap растёт между сценами', 'Lifecycle', 'amber')), column('ПРОВЕРИТЬ', item('Memory snapshots', 'Retainers · surviving objects', 'green'))),
		],
	},
	recap: {
		title: 'Пять опорных вопросов', hint: 'Рассмотрим каждый вопрос и сформулируем объяснение механизма своими словами.',
		states: [
			state('Кто задаёт правила?', 'ECMA-262 определяет наблюдаемую семантику языка.', column('LANGUAGE', item('ECMAScript', 'Что означает программа'))),
			state('Кто готовит код?', 'V8 строит внутренние представления; конкретные структуры зависят от реализации.', column('ENGINE', item('Source → AST → bytecode', 'Подготовка к исполнению', 'violet'))),
			state('Кто исполняет?', 'Интерпретатор и скомпилированные версии реализуют одну семантику.', column('EXECUTION', item('Ignition / JIT', 'Разные компромиссы времени и скорости', 'green'))),
			state('Где мы сейчас?', 'Стек контекстов помогает понять вложенность вызовов и возвраты.', column('CONTROL', item('Call Stack', 'Текущий вызов и продолжения', 'cyan'))),
			state('Почему объект жив?', 'Если есть путь от корня, объект остаётся достижимым.', column('LIFETIME', item('Heap graph → GC', 'Связи важнее намерений разработчика', 'amber'))),
		],
	},
} satisfies Record<string, Simulation>;

export type EngineSimulationId = keyof typeof engineSimulations;
export type { Simulation };

export class EngineSimulations {
 static get(id: EngineSimulationId, i18n: Locale): Simulation {
  const simulation: Simulation = engineSimulations[id];
  return {
   ...simulation, title: i18n.t(simulation.title), hint: i18n.t(simulation.hint),
   states: simulation.states.map((state) => ({ ...state, label: i18n.t(state.label), note: i18n.t(state.note),
    columns: state.columns.map((column) => ({ ...column, label: i18n.t(column.label),
     items: column.items.map((item) => ({ ...item, label: i18n.t(item.label), detail: i18n.t(item.detail) })),
    })),
   })),
  };
 }
}
