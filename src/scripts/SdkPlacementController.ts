/** Bounded teaching trace of SceneFSM command-before-target ordering. */
export class SdkPlacementController {
	private stage = 0;
	private readonly button;
	private readonly state;
	private readonly status;
	private readonly log;
	private readonly choices;

	constructor(private readonly root: HTMLElement) {
		this.button = root.querySelector<HTMLButtonElement>('[data-fsm-advance]');
		this.state = root.querySelector<HTMLElement>('[data-fsm-state]');
		this.status = root.querySelector<HTMLElement>('[data-fsm-status]');
		this.log = root.querySelector<HTMLOListElement>('[data-fsm-log]');
		this.choices = root.querySelectorAll<HTMLInputElement>('input');
		this.button?.addEventListener('click', () => this.advance());
		root.querySelector('[data-fsm-previous]')?.addEventListener('click', () => this.rewind());
		root.querySelector('[data-fsm-reset]')?.addEventListener('click', () => this.reset());
		this.choices.forEach((choice) => choice.addEventListener('change', () => this.reset()));
	}

	private advance(): void {
		if (!this.button || !this.state || !this.status || !this.log || this.stage >= 4) return;
		const accepted = this.root.querySelector<HTMLInputElement>('input:checked')?.value === 'accepted';
		const result = accepted ? 'PlacementCompleted' : 'PlacementRejected';
		const stages = [
			{ state: 'playing', text: `PlaceBlockCommand вызывает Gameplay.place(). Сервис отправляет ${result}; событие ждёт в очереди.`, button: 'Завершить команду и применить target' },
			{ state: 'resolvingPlacement', text: 'Команда завершилась. Теперь FSM применяет target: resolvingPlacement.', button: `Обработать ${result}` },
			accepted
				? { state: 'checkingMoves', text: 'PlacementCompleted переводит FSM в checkingMoves. Entry-команда CheckBlockPuzzleMovesCommand отправляет MovesAvailable в очередь.', button: 'Обработать MovesAvailable' }
				: { state: 'playing', text: 'PlacementRejected возвращает FSM в playing. Поле не изменено.', button: 'Трассировка завершена' },
			{ state: 'playing', text: 'MovesAvailable возвращает FSM в playing. Можно принимать следующий ход.', button: 'Трассировка завершена' },
		];
		const step = stages[this.stage];
		if (!step) return;
		this.state.textContent = step.state;
		this.root.querySelectorAll<HTMLElement>('[data-fsm-node]').forEach((node) => node.classList.toggle('is-current', node.dataset['fsmNode'] === step.state));
		this.root.querySelectorAll<HTMLElement>('[data-fsm-code]').forEach((line) => line.classList.toggle('is-active', line.dataset['fsmCode'] === (this.stage === 0 ? 'command' : this.stage === 1 ? 'target' : '')));
		const queue = this.root.querySelector('[data-fsm-queue]');
		if (queue) queue.textContent = this.stage < 2 ? result : this.stage === 2 && accepted ? 'MovesAvailable' : 'нет событий';
		this.status.textContent = step.text;
		const item = document.createElement('li');
		item.textContent = step.text;
		this.log.append(item);
		this.button.textContent = step.button;
		this.stage++;
		if (!accepted && this.stage === 3) this.stage = 4;
		this.button.disabled = this.stage >= 4;
		const previous = this.root.querySelector<HTMLButtonElement>('[data-fsm-previous]');
		if (previous) previous.disabled = false;
		this.choices.forEach((choice) => { choice.disabled = this.stage > 0; });
	}

	private reset(): void {
		this.stage = 0;
		if (this.state) this.state.textContent = 'playing';
		this.root.querySelectorAll<HTMLElement>('[data-fsm-node]').forEach((node) => node.classList.toggle('is-current', node.dataset['fsmNode'] === 'playing'));
		this.root.querySelectorAll('[data-fsm-code]').forEach((line) => line.classList.remove('is-active'));
		const queue = this.root.querySelector('[data-fsm-queue]');
		if (queue) queue.textContent = 'нет событий';
		if (this.status) this.status.textContent = 'Команда ещё не запущена.';
		if (this.log) {
			const item = document.createElement('li');
			item.textContent = 'FSM ожидает PlacementRequested.';
			this.log.replaceChildren(item);
		}
		if (this.button) { this.button.disabled = false; this.button.textContent = 'Отправить PlacementRequested'; }
		this.choices.forEach((choice) => { choice.disabled = false; });
		const previous = this.root.querySelector<HTMLButtonElement>('[data-fsm-previous]');
		if (previous) previous.disabled = true;
	}

	private rewind(): void {
		const rejected = this.root.querySelector<HTMLInputElement>('input:checked')?.value === 'rejected';
		const target = this.stage === 4 && rejected ? 2 : Math.max(0, this.stage - 1);
		this.reset();
		for (let index = 0; index < target; index++) this.advance();
	}
}
