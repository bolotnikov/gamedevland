import { Locale } from '../i18n/Locale';

/** Illustrates the rules and event queue for one successful placement. */
export class SdkPlacementController {
	private stage = 0;
	private readonly locale = Locale.fromDocument();
	private readonly button;
	private readonly title;
	private readonly status;
	private readonly queue;

	constructor(private readonly root: HTMLElement) {
		this.button = root.querySelector<HTMLButtonElement>('[data-fsm-advance]');
		this.title = root.querySelector<HTMLElement>('[data-fsm-title]');
		this.status = root.querySelector<HTMLElement>('[data-fsm-status]');
		this.queue = root.querySelector<HTMLElement>('[data-fsm-queue]');
		this.button?.addEventListener('click', () => this.advance());
	}

	private advance(): void {
		if (!this.button || !this.title || !this.status || !this.queue) return;
		const steps = [
			{ state: 'playing', rule: 'placement', queue: 'PlacementCompleted', title: 'Команда размещает фигуру', text: 'PlacementRequested запускает PlaceBlockCommand. Сервис отправляет результат в очередь. Состояние пока остаётся playing.', button: 'Завершить команду' },
			{ state: 'resolvingPlacement', rule: '', queue: 'PlacementCompleted', title: 'FSM меняет состояние', text: 'Команда завершилась. FSM переходит в resolvingPlacement и готова обработать результат.', button: 'Найти правило' },
			{ state: 'resolvingPlacement', rule: 'completed', queue: 'нет', title: 'FSM обрабатывает результат', text: 'FSM берёт PlacementCompleted из очереди и находит правило перехода в checkingMoves.', button: 'Перейти к проверке' },
			{ state: 'checkingMoves', rule: 'check', queue: 'MovesAvailable', title: 'Проверка ходов', text: 'PlacementCompleted переводит FSM в checkingMoves. При входе команда проверяет доступные ходы и отправляет MovesAvailable в очередь.', button: 'Обработать проверку' },
			{ state: 'checkingMoves', rule: 'moves', queue: 'нет', title: 'FSM обрабатывает проверку', text: 'FSM берёт MovesAvailable из очереди и находит правило перехода в playing.', button: 'Продолжить игру' },
			{ state: 'playing', rule: '', queue: 'нет', title: 'Следующий ход', text: 'FSM возвращается в playing. Можно разместить следующую фигуру.', button: 'Начать заново' },
			{ state: 'playing', rule: '', queue: 'нет', title: 'Ожидание хода', text: 'FSM находится в playing и ждёт запроса на размещение.', button: 'Разместить фигуру' },
		];
		const step = steps[this.stage];
		if (!step) return;
		this.title.textContent = this.locale.t(step.title);
		this.status.textContent = this.locale.t(step.text);
		this.queue.textContent = step.queue === 'нет' ? this.locale.t('нет') : step.queue;
		this.button.textContent = this.locale.t(step.button);
		this.root.querySelectorAll<HTMLElement>('[data-fsm-node]').forEach((node) => {
			const current = node.dataset['fsmNode'] === step.state;
			node.classList.toggle('is-current', current);
			if (current) node.setAttribute('aria-current', 'step');
			else node.removeAttribute('aria-current');
		});
		this.root.querySelectorAll<HTMLElement>('[data-fsm-rule]').forEach((rule) => {
			rule.classList.toggle('is-active', rule.dataset['fsmRule'] === step.rule);
		});
		this.stage = (this.stage + 1) % steps.length;
	}
}
