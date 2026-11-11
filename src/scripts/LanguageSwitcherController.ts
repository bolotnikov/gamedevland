export class LanguageSwitcherController {
	constructor(private readonly root: HTMLDetailsElement) {
		const summary = root.querySelector('summary');
		if (!summary) throw new Error('Language switcher requires a summary.');
		document.addEventListener('click', (event) => {
			if (event.target instanceof Node && !root.contains(event.target)) root.open = false;
		});
		root.addEventListener('keydown', (event) => {
			if (event.key !== 'Escape' || !root.open) return;
			event.preventDefault();
			root.open = false;
			summary.focus();
		});
		root.addEventListener('focusout', (event) => {
			if (event.relatedTarget instanceof Node && !root.contains(event.relatedTarget)) root.open = false;
		});
		this.updateLinks();
		root.addEventListener('toggle', () => this.updateLinks());
		window.addEventListener('hashchange', () => this.updateLinks());
	}

	private updateLinks(): void {
		for (const link of this.root.querySelectorAll<HTMLAnchorElement>('[data-language-link]')) {
			const url = new URL(link.href);
			url.search = location.search;
			url.hash = location.hash;
			link.href = url.toString();
		}
	}
}
