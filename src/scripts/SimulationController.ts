export class SimulationController {
	private current = 0;
	private readonly states: HTMLElement[];
	private readonly tabs: HTMLButtonElement[];
	constructor(private readonly root: HTMLElement) {
		this.states = Array.from(root.querySelectorAll<HTMLElement>('[data-simulation-state]'));
		this.tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-state-select]'));
		for (const [index, tab] of this.tabs.entries()) tab.addEventListener('click', () => this.show(index));
		root.querySelector('[data-simulation-next]')?.addEventListener('click', () => this.show(this.current + 1));
		root.querySelector('[data-simulation-reset]')?.addEventListener('click', () => this.show(0));
		this.show(0);
	}
	private show(index: number): void {
		this.current = Math.max(0, Math.min(index, this.states.length - 1));
		for (const [i, state] of this.states.entries()) state.hidden = i !== this.current;
		for (const [i, tab] of this.tabs.entries()) tab.setAttribute('aria-pressed', String(i === this.current));
		const next = this.root.querySelector<HTMLButtonElement>('[data-simulation-next]');
		if (next) next.disabled = this.current === this.states.length - 1;
		const counter = this.root.querySelector('[data-simulation-count]');
		if (counter) counter.textContent = `${this.current + 1} / ${this.states.length}`;
		const announcement = this.root.querySelector('[data-simulation-announcement]');
		if (announcement) announcement.textContent = this.states[this.current]?.querySelector('[data-state-note]')?.textContent ?? '';
	}
}
