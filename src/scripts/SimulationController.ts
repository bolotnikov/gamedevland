export class SimulationController {
	private current = 0;
	private readonly states: HTMLElement[];
	private readonly tabs: HTMLButtonElement[];
	private readonly defaultNextLabel: string;
	constructor(private readonly root: HTMLElement) {
		this.states = Array.from(root.querySelectorAll<HTMLElement>('[data-simulation-state]'));
		this.tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-state-select]'));
		this.defaultNextLabel = root.querySelector('[data-simulation-next]')?.textContent ?? '';
		for (const [index, tab] of this.tabs.entries()) tab.addEventListener('click', () => this.show(index));
		root.querySelector('[data-simulation-next]')?.addEventListener('click', () => this.show(this.current + 1));
		root.querySelector('[data-simulation-reset]')?.addEventListener('click', () => this.show(0));
		root.querySelector('[data-simulation-previous]')?.addEventListener('click', () => this.show(this.current - 1));
		this.show(0);
	}
	private show(index: number): void {
		this.current = Math.max(0, Math.min(index, this.states.length - 1));
		for (const [i, state] of this.states.entries()) state.hidden = i !== this.current;
		for (const [i, tab] of this.tabs.entries()) tab.setAttribute('aria-pressed', String(i === this.current));
		const next = this.root.querySelector<HTMLButtonElement>('[data-simulation-next]');
		const currentState = this.states[this.current];
		if (next) {
			next.disabled = this.current === this.states.length - 1;
			next.textContent = currentState?.dataset['nextLabel'] ?? this.defaultNextLabel;
		}
		const previous = this.root.querySelector<HTMLButtonElement>('[data-simulation-previous]');
		if (previous) previous.disabled = this.current === 0;
		const counter = this.root.querySelector('[data-simulation-count]');
		if (counter) counter.textContent = currentState?.dataset['stateCounter'] ?? `${this.current + 1} / ${this.states.length}`;
		const announcement = this.root.querySelector('[data-simulation-announcement]');
		if (announcement) announcement.textContent = currentState?.querySelector('[data-state-note]')?.textContent ?? '';
	}
}
